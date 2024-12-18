// src/config/translations.js
const faqData = {
  en: {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is RREF (Reduced Row Echelon Form)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RREF is a standardized form of a matrix where: 1) The first non-zero element in each row (leading coefficient) is 1, 2) Each column containing a leading 1 has zeros in all other entries, 3) Any rows of all zeros appear at the bottom, 4) Each leading 1 is to the right of all leading 1's in rows above it.",
      },
    },
    {
      "@type": "Question",
      name: "Why is RREF important in linear algebra?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RREF is crucial in linear algebra for several reasons: It simplifies solving systems of linear equations, helps in determining matrix rank, aids in finding null space and column space, and assists in matrix inversion and determinant computation.",
      },
    },
    {
      "@type": "Question",
      name: "How is RREF different from REF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While both are reduced forms, RREF is more standardized. In REF, leading non-zero entries can be any number, while in RREF they must be 1. RREF requires zeros above and below leading 1s, while REF only requires zeros below. RREF gives a unique form for each matrix, while REF may have multiple forms.",
      },
    },
    {
      "@type": "Question",
      name: "Can RREF be used to solve systems of equations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, RREF is particularly useful for solving systems of linear equations. The augmented matrix is converted to RREF, making it easy to read off the solution. Variables corresponding to columns without leading 1s are free variables.",
      },
    },
    {
      "@type": "Question",
      name: "What are the steps to calculate RREF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The steps are: 1) Find the leftmost non-zero column for a pivot, 2) Make the topmost non-zero entry 1 by dividing its row, 3) Make all other entries in that column 0 using row operations, 4) Repeat for the next column to the right, working only with rows below the current pivot row.",
      },
    },
  ],
},
  de: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Was ist die RREF (Reduzierte Zeilenstufenform)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die RREF ist eine standardisierte Form einer Matrix, bei der: 1) Das erste von null verschiedene Element jeder Zeile (führender Koeffizient) eine 1 ist, 2) Jede Spalte, die eine führende 1 enthält, in allen anderen Einträgen Nullen aufweist, 3) Zeilen mit ausschließlich Nullen unten erscheinen, 4) Jede führende 1 rechts von allen führenden 1en in den darüberliegenden Zeilen liegt.",
        },
      },
      {
        "@type": "Question",
        name: "Warum ist die RREF in der linearen Algebra wichtig?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die RREF ist in der linearen Algebra aus mehreren Gründen entscheidend: Sie vereinfacht das Lösen linearer Gleichungssysteme, hilft bei der Bestimmung des Rangs einer Matrix, unterstützt bei der Bestimmung des Null- und Spaltenraums und hilft bei der Matrixinversion und Determinantenberechnung.",
        },
      },
      {
        "@type": "Question",
        name: "Wie unterscheidet sich die RREF von der REF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Obwohl beide reduzierte Formen sind, ist die RREF standardisierter. In der REF können führende nicht-null Elemente beliebige Zahlen sein, während sie in der RREF 1 sein müssen. Die RREF erfordert Nullen ober- und unterhalb führender 1en, während die REF nur Nullen darunter verlangt. Die RREF liefert eine eindeutige Form für jede Matrix, während die REF mehrere Formen haben kann.",
        },
      },
      {
        "@type": "Question",
        name: "Kann die RREF verwendet werden, um Gleichungssysteme zu lösen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, die RREF ist besonders nützlich zum Lösen linearer Gleichungssysteme. Die erweiterte Matrix wird in die RREF umgewandelt, was das Ablesen der Lösung erleichtert. Variablen, die Spalten ohne führende 1en entsprechen, sind freie Variablen.",
        },
      },
      {
        "@type": "Question",
        name: "Welche Schritte sind zur Berechnung der RREF erforderlich?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die Schritte sind: 1) Finde die linkeste von null verschiedene Spalte für ein Pivot-Element, 2) Mache den obersten von null verschiedenen Eintrag durch Teilen der Zeile zu einer 1, 3) Setze alle anderen Einträge in dieser Spalte mit Zeilenoperationen auf 0, 4) Wiederhole dies für die nächste Spalte rechts, wobei nur Zeilen unterhalb der aktuellen Pivot-Zeile berücksichtigt werden.",
        },
      },
    ],
  },
}

const generateFaqHtml = (lang) => {
  const faqs = faqData[lang].mainEntity.map((faq) => (
              `<details class="group">
                <summary class="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-surface-light-hover dark:bg-surface-dark">
                  <span class="font-display font-medium">${faq.name}</span>
                  <span class="transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <div class="p-4 text-content-light-dimmed dark:text-content-dark-dimmed">
                  ${faq.acceptedAnswer.text}
                </div>
              </details>`
              )
            )  
    return faqs.join('')
       
}

export const languages = {
  en: {
    code: 'en',
    name: 'English',
    localName: 'English',
    translations: {
      title: 'RREF Calculator - Calculate Reduced Row Echelon Form',
      description: 'Calculate the Reduced Row Echelon Form (RREF) of a matrix with our easy-to-use online calculator. Step-by-step explanations included.',
      keywords: 'RREF, Reduced Row Echelon Form, matrix calculator, linear algebra',
      calculator: {
        title: 'RREF Calculator',
        intro: 'Enter your matrix below to calculate its Reduced Row Echelon Form (RREF).',
        rows: 'Rows',
        columns: 'Columns',
        createMatrix: 'Create Matrix',
        calculate: 'Calculate RREF',
        sizeWarning: 'Large matrices may take longer to compute and might require scrolling. Please be patient.',
        result: 'Result: Reduced Row Echelon Form (RREF)',
        stepByStep: 'Step-by-step Solution',
        finalMatrix: 'Final RREF Matrix',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          About RREF Calculator
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Welcome to our RREF (Reduced Row Echelon Form) Calculator, a
            powerful tool designed to simplify complex matrix operations. This
            calculator helps students, educators, and professionals quickly
            compute the Reduced Row Echelon Form of any matrix, providing
            step-by-step solutions for better understanding.
          </p>

          <h3>What You Can Do with Our RREF Calculator?</h3>
          <ul>
            <li>Input matrices of various sizes (no fixed upper limit)</li>
            <li>Calculate the RREF of your input matrix</li>
            <li>View detailed, step-by-step solutions</li>
            <li>Understand the process of reaching RREF</li>
            <li>Verify your manual calculations</li>
            <li>Learn about matrix operations and linear algebra concepts</li>
          </ul>

          <h3>How the RREF Calculator Works?</h3>
          <ol>
            <li>
              <strong>Input Your Matrix:</strong> Enter the dimensions and values
              of your matrix using the provided interface.
            </li>
            <li>
              <strong>Initiate Calculation:</strong> Click the "Calculate RREF" button
              to start the process.
            </li>
            <li>
              <strong>Algorithm Execution:</strong> Our calculator applies Gaussian
              elimination with back-substitution to transform the matrix.
            </li>
            <li>
              <strong>Step-by-Step Display:</strong> Each operation is shown with
              a clear explanation and the resulting matrix.
            </li>
            <li>
              <strong>Final Result:</strong> The RREF of your input matrix is displayed,
              along with all intermediate steps.
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Applications of RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            The Reduced Row Echelon Form (RREF) is a powerful tool in linear
            algebra with numerous practical applications across various fields.
          </p>

          <h3>Common Applications</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Solving Systems of Linear Equations
              </h4>
              <p>
                Convert the augmented matrix to RREF to find solutions
                efficiently.
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Determining Matrix Rank
              </h4>
              <p>Count non-zero rows in RREF to find matrix rank.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Finding Matrix Inverses
              </h4>
              <p>Use RREF with augmented identity matrix to find inverses.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Computing Null Space
              </h4>
              <p>Find solutions to homogeneous systems using RREF.</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Frequently Asked Questions
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('en')}
        </div>
      </section>
      `,
      faqData: faqData.en
    }
  },
  de: {
    code: 'de',
    name: 'Deutsch',
    localName: 'Deutsch',
    translations: {
      title: 'RREF-Rechner - Berechnen Sie die reduzierte Zeilenstufenform',
      description: 'Berechnen Sie die reduzierte Zeilenstufenform (RREF) einer Matrix mit unserem benutzerfreundlichen Online-Rechner. Schritt-für-Schritt-Erklärungen inklusive.',
      keywords: 'RREF, reduzierte Zeilenstufenform, Matrixrechner, lineare Algebra',
      calculator: {
        title: 'RREF-Rechner',
        intro: 'Geben Sie Ihre Matrix unten ein, um ihre reduzierte Zeilenstufenform (RREF) zu berechnen.',
        rows: 'Zeilen',
        columns: 'Spalten',
        createMatrix: 'Matrix erstellen',
        calculate: 'RREF berechnen',
        sizeWarning: 'Große Matrizen können länger zur Berechnung benötigen und erfordern möglicherweise ein Scrollen. Bitte haben Sie Geduld.',
        result: 'Ergebnis: Reduzierte Zeilenstufenform (RREF)',
        stepByStep: 'Schritt-für-Schritt-Lösung',
        finalMatrix: 'Endgültige RREF-Matrix',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Über den RREF-Rechner
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Willkommen bei unserem RREF-Rechner (Reduced Row Echelon Form), einem
            leistungsstarken Tool, das komplexe Matrixoperationen vereinfacht. Dieser
            Rechner hilft Studenten, Lehrern und Fachleuten, die reduzierte Zeilenstufenform
            jeder Matrix schnell zu berechnen und bietet Schritt-für-Schritt-Lösungen für ein besseres Verständnis.
          </p>

          <h3>Was können Sie mit unserem RREF-Rechner tun?</h3>
          <ul>
            <li>Matrizen unterschiedlicher Größe eingeben (keine feste Obergrenze)</li>
            <li>Die reduzierte Zeilenstufenform Ihrer Matrix berechnen</li>
            <li>Detaillierte Schritt-für-Schritt-Lösungen anzeigen</li>
            <li>Den Prozess zur Erreichung der RREF verstehen</li>
            <li>Manuelle Berechnungen überprüfen</li>
            <li>Mehr über Matrixoperationen und lineare Algebra lernen</li>
          </ul>

          <h3>Wie funktioniert der RREF-Rechner?</h3>
          <ol>
            <li>
              <strong>Matrix eingeben:</strong> Geben Sie die Dimensionen und Werte Ihrer Matrix mit der bereitgestellten Oberfläche ein.
            </li>
            <li>
              <strong>Berechnung starten:</strong> Klicken Sie auf die Schaltfläche "RREF berechnen",
              um den Prozess zu starten.
            </li>
            <li>
              <strong>Algorithmusausführung:</strong> Unser Rechner verwendet das Gaußsche Eliminationsverfahren
              mit Rückwärts-Substitution, um die Matrix zu transformieren.
            </li>
            <li>
              <strong>Schritt-für-Schritt-Anzeige:</strong> Jede Operation wird mit einer klaren
              Erklärung und der resultierenden Matrix angezeigt.
            </li>
            <li>
              <strong>Endergebnis:</strong> Die reduzierte Zeilenstufenform Ihrer Eingabematrix wird
              zusammen mit allen Zwischenschritten angezeigt.
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Anwendungen der RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Die reduzierte Zeilenstufenform (RREF) ist ein leistungsstarkes Werkzeug in der
            linearen Algebra mit zahlreichen praktischen Anwendungen in verschiedenen Bereichen.
          </p>

          <h3>Häufige Anwendungen</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Lösung von linearen Gleichungssystemen
              </h4>
              <p>
                Wandeln Sie die erweiterte Matrix in RREF um, um Lösungen effizient zu finden.
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Bestimmung des Matrixrangs
              </h4>
              <p>Zählen Sie die Nicht-Null-Zeilen in der RREF, um den Rang der Matrix zu bestimmen.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Finden von Matrixinversen
              </h4>
              <p>Verwenden Sie RREF mit einer erweiterten Einheitsmatrix, um Inverse zu finden.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Berechnung des Nullraums
              </h4>
              <p>Finden Sie Lösungen für homogene Systeme mit RREF.</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Häufig gestellte Fragen
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('de')}
        </div>
      </section>
      `,
      faqData: faqData.de
    }
  },
};

// Add more translations following this pattern:

// Spanish (es)
// French (fr)
// Hindi (hi)
// Indonesian (id)
// Italian (it)
// Japanese (ja)
// Korean (ko)
// Dutch (nl)
// Polish (pl)
// Portuguese (pt)
// Russian (ru)
// Turkish (tr)
// Vietnamese (vi)
// Chinese (zh)
