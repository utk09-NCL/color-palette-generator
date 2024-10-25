# Color Conjure 🎨

[![Netlify Status](https://api.netlify.com/api/v1/badges/77b1cc7e-418c-4dc4-9ee0-bd8f985968f5/deploy-status)](https://app.netlify.com/sites/color-conjure/deploys)

Color Conjure is an open-source color palette generator that helps designers and developers create accessible and consistent color schemes for their projects. Generate shades, check color contrasts, and export colors in various formats with ease.

## 🚀 Demo

Check out the live application: [Color Conjure on Netlify](https://color-conjure.netlify.app/)

Please note that this is a work in progress, and some features may not be fully functional.

❗️PLEASE NOTE ❗️ - We use [Seline](https://seline.so) for tracking user interactions and improving the application. _Seline is a simple, lightweight, cookieless, private website analytics tool._

## ✨ Features

- **Color Shade Generation:** Generate a range of shades from a base color.
- **Contrast Checker:** Ensure text is readable against background colors by checking contrast ratios.
- **Export Options:** Export generated colors in multiple formats like HEX, HSL, CSS variables, Tailwind CSS configurations, etc.
- **Accessibility Compliance:** Verify color combinations against [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) guidelines [AA](https://www.w3.org/WAI/WCAG2AA-Conformance) and [AAA](https://www.w3.org/WAI/WCAG2AAA-Conformance) standards.
- **Interactive Color Manipulation:** Adjust colors using HEX, RGB, and HSL inputs with previews.

## 🧰 Tools & Libraries

- **[react](https://react.dev/)**
- **[chroma-js](https://gka.github.io/chroma.js/)**
- **[@tanstack/react-table](https://tanstack.com/table/latest)**
- **[react-hot-toast](https://react-hot-toast.com/)**
- **[react-router-dom](https://reactrouter.com/en/main)**
- **[@headlessui/react](https://headlessui.com/)**
- **[clsx](https://github.com/lukeed/clsx)**
- **[vite](https://vitejs.dev/)**
- **[tailwindcss](https://tailwindcss.com/)**
- **[eslint](https://eslint.org/)**
- **[prettier](https://prettier.io/)**
- **[husky](https://typicode.github.io/husky)**
- **[commitlint](https://commitlint.js.org/)**
- **[lint-staged](https://github.com/lint-staged/lint-staged)**
- **[vitest](https://vitest.dev/)**
- **[jsdom](https://github.com/jsdom/jsdom)**
- **[@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)**
- **[@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)**
- **[@vitest/coverage-istanbul](https://vitest.dev/guide/coverage.html#coverage-providers)**
- **[react-icons](https://www.npmjs.com/package/react-icons)**

## 🛠️ Installation

### Prerequisites

- Node.js (v20 or higher)
- npm (v9 or higher)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/utk09-NCL/color-palette-generator.git

   cd color-palette-generator
   ```

2. **Fresh Install Dependencies**

   ```bash
   npm run bootstrap-dev
   ```

3. **Start the Development Server**

   ```bash
    npm run dev
   ```

4. **Open the Application**

   The application should open automatically in your default browser. If not, visit [http://localhost:5173](http://localhost:5173) to view the application.

5. **Build for Production**

   To build the application for production, run:

   ```bash
   npm run build && npm run preview
   ```

   The optimized files will be in the `dist` directory.

## 📝 Usage

1. **Generate Color Shades**

   - Enter a base color in HEX, RGB, or HSL format.
   - Click on the "Generate Shades" button to create a range of 11 colors, from 50, 100, 200, ..., 900, 950 shades.

2. **Check Color Contrast**

   - Click on the "Check Colour Contrast" button to verify the contrast ratio between the text and background colors.
   - The contrast ratio is displayed along with the WCAG compliance level (AA or AAA), and the columns are sortable.

3. **Export Colors**

   - Click on the "Export Colors" button to view the export options.
   - Choose from range of formats like HEX, HSL, CSS variables, and Tailwind CSS configurations.
   - Click on the "Copy Code" button to copy the color values to the clipboard.
   - If you add more than one color set/section, then you can "Export All Colors to JSON" and "Export All Colors to HEX".

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing (Code and Design)

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md)
file for guidelines on how to contribute to this project. Please note that by participating in this project, you agree to abide by the terms of the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

You can even contribute by creating designs for the project. Check the [DESIGN.md](./design/DESIGN.md) file for more information.

## 🐛 Issue Reporting

If you find any bugs or issues, please open an issue on the GitHub repository and provide as much information as possible.

- [ISSUE TRACKER](https://github.com/utk09-NCL/color-palette-generator/issues)
- [NEW ISSUE](https://github.com/utk09-NCL/color-palette-generator/issues/new/choose)
- [ISSUE TEMPLATE](.github/ISSUE_TEMPLATE/BUG_REPORT.md)

## 🆕 Feature Requests

If you have any feature requests or suggestions, please open an issue on the GitHub repository and provide as much information as possible, we would love to hear your ideas! Follow the [FEATURE REQUEST TEMPLATE](.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md) template.

## ❤️ Code of Conduct

Please read the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file for details on our code of conduct.
TL;DR: Be Nice, Be Respectful, Be Inclusive.

## 🌟 Show Your Support

If you like this project, give it a ⭐️ on GitHub and share it with your friends!

## 📧 Contact Me?

If you have any queries or want to discuss this project or just tech, find my contact details on my [Personal Website]: utk09[dot]com

## Thanks in advance for all your contributions! 🌟

## 👥 Our Contributors

A big shoutout to all the contributors who have helped (and are helping) in building this project.

[![Contributors](https://contrib.rocks/image?repo=utk09-NCL/color-palette-generator)](https://github.com/utk09-NCL/color-palette-generator/graphs/contributors)

### Author

- [utk09-NCL](https://github.com/utk09-NCL)
