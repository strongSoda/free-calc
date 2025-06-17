# 🧮 Free Calculators Web App

An open-source, fast, responsive web app built with **Astro**, **React**, and **Tailwind CSS**, offering a suite of 20+ handy calculators—from GPA converters and RREF matrix tools to BMI, tip splitters, love meters, subnet, volume, and more.

🔗 **Live Site:** [rref-calculator.com/calculators](https://rref-calculator.com/calculators)

---

## 🚀 Features

- **20+ useful calculators** – GPA ↔ percentage, RREF matrix reducer, volume, subnet, BMI, tip, love meter, standard deviation, pregnancy, ZIP lookup, and more.
- **Step-by-step solutions** – some tools provide detailed breakdowns.
- **Fast, responsive UI** – powered by Tailwind CSS and Astro's optimized delivery.
- **100% free and privacy-friendly** – no signups, no hidden fees.
- **Modular structure** – easily add or modify calculator tools.

---

## 🧱 Tech Stack

| Purpose             | Tech Used         |
|---------------------|-------------------|
| Static Site Gen     | [Astro](https://astro.build) |
| Interactivity       | [React](https://reactjs.org) |
| Styling             | [Tailwind CSS](https://tailwindcss.com) |
| Deployment Ready    | Vercel, Netlify compatible |

---

## 📁 Project Structure

```
/
├── public/               # Static assets (icons, images)
├── src/
│   ├── components/
│   │   ├── calculators/  # Individual calculator components
│   │   └── ui/           # Reusable UI components
│   ├── layouts/          # App layout components
│   ├── pages/            # Astro page routes
│   └── styles/           # Tailwind and global CSS
├── astro.config.mjs      # Astro config
├── tailwind.config.cjs   # Tailwind config
├── package.json
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn

### Local Setup

```bash
git clone https://github.com/strongSoda/free-calc.git
cd free-calc
yarn
yarn dev
```

Visit `http://localhost:PORT` in your browser.

### Build for Production

```bash
yarn build
```

---

## ➕ Adding a New Calculator

1. Create a new file in `src/components/calculators/YourCalculator.jsx`
2. Implement your logic and UI using React
3. Add a route page in `src/pages/calculators/your-calculator.astro`
4. Link it in the footer or sitemap

---

## 📈 Future Enhancements

- [ x ] Dark mode support
- [ ] Unit tests for key calculators
- [ ] Offline PWA support
- [ ] Calculator history tracking
- [ ] Accessibility improvements

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repo
git checkout -b feat/your-feature
git commit -m "Add your feature"
git push origin feat/your-feature
# Open a Pull Request
```

Please include relevant screenshots or test cases.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Credits

- Inspired by [rref-calculator.com/calculators](https://rref-calculator.com/calculators)
- Built with ❤️ using Astro, React, and Tailwind

---

**Happy calculating!**
