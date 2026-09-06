// src/utils/expression.js
// A small, dependency-free math expression parser/evaluator.
// Supports: + - * / ^, parentheses, implicit multiplication (2x, 3sin(t)),
// variables, and the usual function library. Compiles to a closure so
// numerical integration can call it millions of times cheaply.

const FUNCTIONS = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  exp: Math.exp,
  ln: Math.log,
  log: Math.log10,
  log10: Math.log10,
  log2: Math.log2,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  abs: Math.abs,
  sign: Math.sign,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
};

const BINARY_FUNCTIONS = { pow: Math.pow, atan2: Math.atan2, min: Math.min, max: Math.max };
const CONSTANTS = { pi: Math.PI, e: Math.E, PI: Math.PI, tau: Math.PI * 2 };

const isDigit = (ch) => ch >= "0" && ch <= "9";
const isAlpha = (ch) => /[a-zA-Z_]/.test(ch);

export const tokenize = (input) => {
  const src = String(input).replace(/\s+/g, "");
  const tokens = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (isDigit(ch) || (ch === "." && isDigit(src[i + 1]))) {
      let j = i;
      while (j < src.length && (isDigit(src[j]) || src[j] === ".")) j++;
      if (src[j] === "e" || src[j] === "E") {
        // scientific notation only when followed by digits/sign+digits
        let k = j + 1;
        if (src[k] === "+" || src[k] === "-") k++;
        if (isDigit(src[k])) {
          while (k < src.length && isDigit(src[k])) k++;
          j = k;
        }
      }
      tokens.push({ type: "number", value: parseFloat(src.slice(i, j)) });
      i = j;
    } else if (isAlpha(ch)) {
      let j = i;
      while (j < src.length && /[a-zA-Z_0-9]/.test(src[j])) j++;
      let name = src.slice(i, j);
      // Greedily match the longest known function/constant, otherwise treat
      // the run as separate single-letter variables ("xy" -> x*y).
      if (FUNCTIONS[name] || BINARY_FUNCTIONS[name] || CONSTANTS[name] || name.length === 1) {
        tokens.push({ type: "name", value: name });
        i = j;
      } else {
        let matched = null;
        for (let len = name.length; len >= 2; len--) {
          const head = name.slice(0, len);
          if (FUNCTIONS[head] || BINARY_FUNCTIONS[head] || CONSTANTS[head]) {
            matched = head;
            break;
          }
        }
        if (matched) {
          tokens.push({ type: "name", value: matched });
          i += matched.length;
        } else {
          tokens.push({ type: "name", value: name[0] });
          i += 1;
        }
      }
    } else if ("+-*/^%(),".includes(ch)) {
      tokens.push({ type: "op", value: ch });
      i++;
    } else if (ch === "[") { tokens.push({ type: "op", value: "(" }); i++; }
    else if (ch === "]") { tokens.push({ type: "op", value: ")" }); i++; }
    else {
      throw new Error(`Unexpected character "${ch}" in expression`);
    }
  }
  return tokens;
};

/**
 * Recursive-descent parser producing an AST.
 * expr    := term (('+'|'-') term)*
 * term    := unary (('*'|'/'|implicit) unary)*
 * unary   := ('-'|'+') unary | power
 * power   := atom ('^' unary)?     (right associative)
 */
export const parse = (input) => {
  const tokens = tokenize(input);
  let pos = 0;
  const peek = () => tokens[pos];
  const eat = (value) => {
    const t = tokens[pos];
    if (!t || t.value !== value) throw new Error(`Expected "${value}" in expression`);
    pos++;
    return t;
  };

  const parseExpression = () => {
    let node = parseTerm();
    while (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "-")) {
      const op = tokens[pos++].value;
      node = { type: "binary", op, left: node, right: parseTerm() };
    }
    return node;
  };

  const startsAtom = () => {
    const t = peek();
    if (!t) return false;
    if (t.type === "number" || t.type === "name") return true;
    return t.type === "op" && t.value === "(";
  };

  const parseTerm = () => {
    let node = parseUnary();
    for (;;) {
      const t = peek();
      if (t && t.type === "op" && (t.value === "*" || t.value === "/" || t.value === "%")) {
        pos++;
        node = { type: "binary", op: t.value, left: node, right: parseUnary() };
      } else if (startsAtom()) {
        // implicit multiplication: 2x, 3(x+1), x y
        node = { type: "binary", op: "*", left: node, right: parseUnary() };
      } else break;
    }
    return node;
  };

  const parseUnary = () => {
    const t = peek();
    if (t && t.type === "op" && (t.value === "-" || t.value === "+")) {
      pos++;
      const operand = parseUnary();
      return t.value === "-" ? { type: "unary", op: "-", operand } : operand;
    }
    return parsePower();
  };

  const parsePower = () => {
    const base = parseAtom();
    const t = peek();
    if (t && t.type === "op" && t.value === "^") {
      pos++;
      return { type: "binary", op: "^", left: base, right: parseUnary() };
    }
    return base;
  };

  const parseAtom = () => {
    const t = peek();
    if (!t) throw new Error("Unexpected end of expression");
    if (t.type === "number") {
      pos++;
      return { type: "number", value: t.value };
    }
    if (t.type === "name") {
      pos++;
      const name = t.value;
      const next = peek();
      if (next && next.type === "op" && next.value === "(") {
        if (FUNCTIONS[name] || BINARY_FUNCTIONS[name]) {
          eat("(");
          const args = [parseExpression()];
          while (peek() && peek().value === ",") {
            pos++;
            args.push(parseExpression());
          }
          eat(")");
          return { type: "call", name, args };
        }
        // variable followed by parentheses -> implicit multiplication
        return { type: "variable", name };
      }
      if (CONSTANTS[name] !== undefined) return { type: "number", value: CONSTANTS[name] };
      if (FUNCTIONS[name]) {
        // allow "sin x" without parentheses
        return { type: "call", name, args: [parseUnary()] };
      }
      return { type: "variable", name };
    }
    if (t.type === "op" && t.value === "(") {
      eat("(");
      const node = parseExpression();
      eat(")");
      return node;
    }
    throw new Error(`Unexpected token "${t.value}" in expression`);
  };

  const ast = parseExpression();
  if (pos < tokens.length) throw new Error(`Unexpected "${tokens[pos].value}" in expression`);
  return ast;
};

export const evaluateNode = (node, scope) => {
  switch (node.type) {
    case "number":
      return node.value;
    case "variable": {
      if (node.name in scope) return scope[node.name];
      if (CONSTANTS[node.name] !== undefined) return CONSTANTS[node.name];
      throw new Error(`Unknown variable "${node.name}"`);
    }
    case "unary":
      return -evaluateNode(node.operand, scope);
    case "binary": {
      const a = evaluateNode(node.left, scope);
      const b = evaluateNode(node.right, scope);
      switch (node.op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        case "%": return a % b;
        case "^": return Math.pow(a, b);
        default: throw new Error(`Unknown operator ${node.op}`);
      }
    }
    case "call": {
      const args = node.args.map((a) => evaluateNode(a, scope));
      if (FUNCTIONS[node.name]) return FUNCTIONS[node.name](...args);
      if (BINARY_FUNCTIONS[node.name]) return BINARY_FUNCTIONS[node.name](...args);
      throw new Error(`Unknown function "${node.name}"`);
    }
    default:
      throw new Error("Malformed expression");
  }
};

/** Compile an expression string into (scope) => number. */
export const compile = (input) => {
  const ast = parse(input);
  const fn = (scope) => evaluateNode(ast, scope);
  fn.ast = ast;
  fn.source = String(input);
  return fn;
};

/** Convenience: compile against a fixed, ordered variable list. */
export const compileVars = (input, vars) => {
  const fn = compile(input);
  const call = (...values) => {
    const scope = {};
    vars.forEach((v, i) => { scope[v] = values[i]; });
    return fn(scope);
  };
  call.ast = fn.ast;
  call.source = fn.source;
  return call;
};

export const variablesUsed = (node, found = new Set()) => {
  if (!node) return found;
  if (node.type === "variable") found.add(node.name);
  if (node.type === "unary") variablesUsed(node.operand, found);
  if (node.type === "binary") {
    variablesUsed(node.left, found);
    variablesUsed(node.right, found);
  }
  if (node.type === "call") node.args.forEach((a) => variablesUsed(a, found));
  return found;
};

/** Pretty LaTeX rendering of a parsed expression. */
export const toLatex = (node) => {
  const wrap = (n, parent) => {
    const s = toLatex(n);
    const needs =
      (n.type === "binary" && ["+", "-"].includes(n.op) && ["*", "/", "^"].includes(parent)) ||
      (n.type === "unary" && parent !== "+");
    return needs ? `\\left(${s}\\right)` : s;
  };
  switch (node.type) {
    case "number": {
      const v = node.value;
      if (Math.abs(v - Math.PI) < 1e-12) return "\\pi";
      return String(parseFloat(v.toFixed(10)));
    }
    case "variable":
      return node.name.length > 1 ? `\\mathrm{${node.name}}` : node.name;
    case "unary":
      return `-${wrap(node.operand, "*")}`;
    case "binary": {
      if (node.op === "/") return `\\frac{${toLatex(node.left)}}{${toLatex(node.right)}}`;
      if (node.op === "*") return `${wrap(node.left, "*")} \\cdot ${wrap(node.right, "*")}`;
      if (node.op === "^") return `${wrap(node.left, "^")}^{${toLatex(node.right)}}`;
      return `${toLatex(node.left)} ${node.op} ${toLatex(node.right)}`;
    }
    case "call": {
      const args = node.args.map((a) => toLatex(a)).join(", ");
      if (node.name === "sqrt") return `\\sqrt{${args}}`;
      if (node.name === "abs") return `\\left|${args}\\right|`;
      if (node.name === "ln") return `\\ln\\left(${args}\\right)`;
      return `\\${node.name}\\left(${args}\\right)`;
    }
    default:
      return "";
  }
};

export const latexOf = (input) => {
  try {
    return toLatex(parse(input));
  } catch {
    return String(input);
  }
};
