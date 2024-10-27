# Contributing to Color Conjure

First of all, thank you for considering contributing to Color Conjure! Your help is essential for keeping this project great and improving it even more.

## How Can I Contribute?

### 🐛 Reporting Bugs

If you find a bug, please [open an issue](https://github.com/utk09-NCL/color-palette-generator/issues/new?assignees=&labels=bug&template=feature_request.md&title=). Details in [README.md](README.md#-issue-reporting).

### 🌟 Feature Requests

Have an idea for a new feature? [open an issue](https://github.com/utk09-NCL/color-palette-generator/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=). Details in [README.md](README.md#-contributing).

### 🛠️ Submitting Changes

1. **Fork the Repository**

   Click the "Fork" button at the top-right corner of the repository to create your own copy.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/<your_username>/color-palette-generator.git

   cd color-palette-generator
   ```

3. **Create a Branch from main**

   ```bash
    # Update your main branch
    git checkout main # Switch to the main branch
    git pull origin main # Get the latest changes from the main branch

    # Create a new branch for your feature or fix using a descriptive name
    git checkout -b my-new-feature-branch

    # Update the dependencies in node_modules
    npm install
   ```

4. **Make Changes**

   - Make your changes to the codebase.
   - Ensure your code follows the style guidelines of this project.
   - Perform a self-review of your code.
   - Comment your code where necessary.
   - Make corresponding changes to the documentation if necessary.
   - Ensure your changes generate no new warnings or errors.

5. **Lint, Build and Test** - Before submitting your changes, make sure to run the following commands:

   - Run `npm run lint` to lint your code.
   - Run `npm run build` to ensure your changes build without errors (and check TypeScript errors).
   - Run `npm run test` to run the tests and check the coverage.
   - Run `npm run dev` to test your changes locally.

6. **Commit Your Changes** - Please follow the [Common types according to commitlint-config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) specification for your commit messages.

   ```bash
   git add .

   git commit -m "feat: my concise commit message"
   ```

7. **Push Your Changes**

   ```bash
   git push origin my-new-feature-branch
   ```

8. **Open a Pull Request**

   - Go to your fork on GitHub.
   - Click the "New Pull Request" button.
   - Select the main branch of the original repository as the base branch.
   - Select your branch as the compare branch.
   - Click "Create Pull Request".

9. **Wait for Review**

   Your pull request will be reviewed by the maintainers. Make sure to respond to any feedback given.

10. **Celebrate**

    🎉 Congratulations on your contribution! Thank you for making Color Conjure better! 🎉
