# Contributing to OmniBrain SDK

First off, thank you for considering contributing to OmniBrain SDK! It's people like you that make OmniBrain such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include code samples and stack traces if applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful to most OmniBrain SDK users

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.

## Development Process

1. Clone the repository:
   ```bash
   git clone https://github.com/omnibrainAI/omnibrain-sdk.git
   cd omnibrain-sdk
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Make your changes and test:
   ```bash
   npm run test
   npm run lint
   ```

5. Build the project:
   ```bash
   npm run build
   ```

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 🚱 `:non-potable_water:` when plugging memory leaks
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * 💚 `:green_heart:` when fixing the CI build
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies

### TypeScript Styleguide

* Use TypeScript for all new code
* Follow the existing code style
* Use meaningful variable names
* Document complex algorithms
* Add JSDoc comments for public APIs
* Use strong typing - avoid `any` when possible
* Use interfaces over types when possible
* Keep functions small and focused
* Use early returns to reduce nesting

### Documentation Styleguide

* Use [Markdown](https://guides.github.com/features/mastering-markdown/)
* Reference methods and classes in backticks: \`methodName()\`
* Use code blocks with language specification:
    ```typescript
    function example(): void {
      // code here
    }
    ```
* Keep line length to a maximum of 80 characters
* Use descriptive link texts: ✓ `[Contributing Guide](CONTRIBUTING.md)` instead of ✗ `[click here](CONTRIBUTING.md)`

## Project Structure

```
omnibrain-sdk/
├── src/                    # Source code
│   └── sdk/               # SDK implementation
│       ├── index.ts       # Main entry point
│       └── types.ts       # TypeScript types
├── examples/              # Example implementations
│   ├── basic-website/    # Basic website example
│   ├── full-stack-app/   # Full-stack application example
│   ├── social-campaign/  # Social media campaign example
│   └── custom-agents/    # Custom agent configuration example
├── tests/                # Test files
├── docs/                 # Documentation
└── package.json          # Project manifest
```

## Testing

We use Jest for testing. Please ensure all new features include appropriate tests:

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test -- --coverage

# Run specific test file
npm run test -- path/to/test-file.test.ts
```

## Documentation

* Use JSDoc comments for functions and classes
* Update the README.md if needed
* Add examples for new features
* Keep the API documentation up to date

## Questions?

Feel free to contact us if you have any questions. You can reach us at:

* [Discord Community](https://discord.gg/omnibrain)
* [GitHub Issues](https://github.com/omnibrainAI/omnibrain-sdk/issues)
* [Documentation](https://docs.omnibrain.fun)

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
