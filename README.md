# LinuxCNC HAL Component Integration VSCode Extension

## Overview

This VSCode extension aims to enhance the development workflow for LinuxCNC users working with HAL components (.comp files). It provides tools for:
- **Compilation**: Automating the process of compiling `.comp` files into LinuxCNC HAL components using the `halcompile` tool.
- **Debugging**: Simplifying the debugging process of HAL components using `halrun` and `gdb`.
- **Syntax Highlighting**: Custom syntax highlighting for `.comp` files, ensuring easy reading and code clarity.

## Features

### Dynamic Compilation
- A command to compile the currently active `.comp` file, dynamically detecting the file path and passing it to `halcompile`.
- Handles cases where no `.comp` file is open or if the file is invalid, providing appropriate error messages.

### Generic Debugging Configuration
- A debug task that automatically sets up `halrun` to load the appropriate `.so` file generated from the `.comp` file.

### Syntax Highlighting
- Syntax support for LinuxCNC `.comp` files, highlighting key elements like `component`, `pin`, and other related keywords.

### Enhanced Support for Component Directives and Options
- Support for advanced directives like `option`, allowing users to set attributes such as `userspace` or `no_auto_bind` directly in their `.comp` files.
- Autocomplete for `option` settings based on the available options (e.g., `userspace`, `no_auto_bind`, etc.).
- Syntax validation to ensure the `option` directive is used correctly and aligns with the latest HAL standards.
- Support for Conditional Compilation (`#ifdef`, `#ifndef`, and related preprocessor directives).

### Improved Function Handling and Scheduling
- Extended Autocompletion for HAL Functions: Autocomplete for function declarations, with templates for common functions like `_update`, `_reset`, and `_thread`.
- Thread Management Improvements: Autocomplete for thread-related commands such as `addf` and `setp`.
- Pin-to-thread relationship inspector to help users manage the relationship between HAL pins and threads within the editor.

### Real-Time and Userspace Component Support
- Automatic Detection of Real-Time vs. Userspace Components: Based on whether the `userspace` option is used, the extension automatically configures debugging and compilation tasks to work appropriately for each context.
- Improved Tasks for Userspace HAL: Specialized tasks that set the appropriate build flags and run environment for components marked as `userspace`.

### Parameter Definition and Autocompletion
- Extended Autocomplete for `param` Directive: Autocomplete for parameter types such as `float`, `s32`, and `u32`, along with their default values.
- Snippets for parameter definitions, making it easy to set up parameters in the `.comp` file.

### Pin Definition Enhancements
- Improved Pin Definitions: Autocomplete for pin types like `bit`, `float`, `s32`, etc., ensuring valid types are used for HAL components.
- Pin-to-parameter mapping suggestions, helping users connect pins with component parameters effectively.
- Autocomplete suggestions for pin types such as `bit`, `float`, `s32`, and `u32`.
- Predefined pin definition templates for common pin definitions, such as input pins, output pins, and various data types.

### Expanded Error Handling and Validation
- Real-Time Error Checking: Real-time validation against common mistakes highlighted in the documentation, such as incorrect pin types, missing required functions (like `_update`), and misconfiguration of `addf` for real-time threads.
- Error Reporting for Invalid Combinations: Flagging mistakes and providing suggestions for fixing components that incorrectly mix real-time and userspace functionality.

### Enhanced Code Templates and Snippets
- Component Snippets Based on Examples: Predefined code snippets based on the examples provided in the latest documentation, including a full template for a basic HAL component and snippets for common HAL component patterns.
- Task Templates for HAL Components: Ready-to-use task templates for compiling and testing HAL components.
- Predefined Snippets for Canonical Devices: Provide snippets for canonical devices such as step generators, encoders, PWM generators, and DACs. These snippets are based on canonical device usage examples from the documentation.

### Inline Documentation and Context-Sensitive Help
- Tooltips and Inline Docs: Tooltips for key HAL directives (e.g., `pin`, `param`, `function`, `option`) based on the most recent documentation.
- Context-Sensitive Links to Documentation: Links to the latest LinuxCNC HAL documentation based on the user's active file.

### Advanced Debugging and Runtime Monitoring
- HAL Component Status Monitoring: Real-time feedback on the status of running components, shown in a debugging panel where users can monitor the values of pins, parameters, and threads during runtime.
- Interactive Pin Monitoring: Allowing users to observe pin values in real-time and troubleshoot issues more effectively.
- Support for HAL Parameter Changes at Runtime: Allowing users to edit parameters directly from VSCode, pushing the changes live to the running HAL component, and offering parameter visualization to track and modify parameter values in a graphical interface.

### Dynamic Configuration Based on HAL Environment
- Adaptive Task Configuration: Automatically adjusting compilation and debugging tasks to match the detected HAL environment (real-time or userspace).
- Environment-Specific Tooling: Tooling designed to support either the preempt-RT or RTAI real-time kernels, ensuring compatibility with the HAL environment in which the user is working.

### Graphical Representation of HAL Signals
- A graphical view where users can see the relationships between pins, components, and signals. This helps users visualize their HAL configuration as they work.

### Interactive HAL Pin and Signal Monitoring
- A signal inspector allowing users to view, trace, and monitor the connections between HAL components and pins.
- Real-time updates of signal values, so users can interactively monitor and diagnose issues with their HAL setup within VSCode.

### Enhanced Signal and Net Management
- Autocomplete and syntax highlighting for defining and connecting signals using `net`.
- Suggestions for valid signal names based on existing pins and components in the HAL setup.
- Error detection for incorrect signal connections, ensuring that signals are correctly linked to pins or components of matching types.

### HAL Architecture Guidance and Thread Management Tools
- Predefined templates for common HAL architectures, such as motion control setups, spindle control, or I/O expansion.
- Component-based templates for adding predefined components (e.g., PID controllers, encoders) into the HAL configuration.
- HAL architecture validation to ensure that the overall architecture adheres to best practices.
- Advanced thread management tools, including thread configuration assistance and interactive thread assignment tools that visualize thread-to-function relationships.
- Validation for thread assignments, ensuring that real-time components are correctly assigned to real-time threads.

### Custom Function Support and Version-Specific Assistance
- Code snippets and templates for creating custom HAL functions, such as `_update` or `_reset`.
- Function timing and performance analysis tools to ensure custom functions are executed optimally within the HAL framework.
- Real-time function execution monitoring, helping users diagnose performance bottlenecks in their HAL configurations.
- HAL version compatibility tools, ensuring backward compatibility with older versions of LinuxCNC.
- Version-specific syntax highlighting and error checking, ensuring that older versions of LinuxCNC are properly supported.
- Migration tools to help users transition from older HAL setups to newer versions of LinuxCNC.

### Build Process Integration
- Custom Build Tasks: Predefined build tasks in the extension that align with LinuxCNC’s development build process.
  - Automatic setup of the autoconf/automake build system.
  - Running make and install commands from within VSCode.
  - Ensuring compatibility with different versions (e.g., 2.7, 2.8, devel) based on the project’s LinuxCNC version.

### Environment Setup Wizards
- Guided wizards to automate the creation of a LinuxCNC development environment.
  - Setting up compilers, libraries, and dependencies.
  - Configuring the correct kernel (e.g., real-time kernel) and debugging tools.
  - Ensuring that development targets align with either simulation mode or real-time mode.

### Version-Specific Build Configurations
- Support for Multiple Versions: Ensure the extension can switch between different build configurations for LinuxCNC versions (e.g., 2.7, 2.8, devel).
  - Each version might require specific build flags or dependencies that the extension should handle dynamically.

### Advanced Debugging Tools
- Integrated Debugging for Real-Time LinuxCNC: Integrate GDB or other real-time debugging tools directly into VSCode for easier diagnosis of real-time HAL components.
  - Automatic generation of GDB launch configurations for real-time processes.
- Enhanced Logging and Traceability: Features to easily enable or disable detailed logging, trace real-time events, and visualize system logs related to HAL components.
- Backtrace Generation for Crashes: Automatically generate and display backtraces when LinuxCNC crashes.

### HAL Component Testing Framework
- Unit Testing for HAL Components: Introduce a testing framework for HAL components, allowing users to write and run unit tests directly within VSCode.
  - Mocks or stubs for hardware interfaces.
  - Simulations to validate HAL component behavior without real hardware.
- Component Documentation Generator: Automatically generate documentation for custom HAL components based on their source code.
  - Extract information such as pins, parameters, and functions and generate Markdown or HTML documentation files.

### Interactive HAL Testing and Simulation
- Simulation Mode Setup: Create a feature where the extension sets up and runs LinuxCNC in simulation mode, allowing developers to test their components without real hardware.
  - Provide interactive feedback on the component's behavior in the simulated environment.

### Contextual Documentation and HAL API Autocompletion
- In-Editor Documentation Links: Provide direct links to specific sections of the developer manuals when users are working on relevant parts of their code.
- HAL API Autocompletion: Provide autocomplete and inline documentation for commonly used HAL functions, making it easier for developers to integrate HAL components and understand the API.

### Example Projects and Code Samples
- Built-in Example Projects: Provide example LinuxCNC projects based on the developer manuals. These could be loaded within VSCode as templates, allowing developers to quickly start building and testing their own components.

### Git Integration and Git Hooks for Build and Test Automation
- Git Version Control for HAL Components: Integrate Git support for version controlling LinuxCNC configurations, HAL components, and source code.
  - Provide direct links to the LinuxCNC GitHub repository for referencing upstream changes.
- Git Hooks for Build and Test Automation: Add Git hooks to automatically run tests and compile HAL components before each commit, ensuring code quality.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run compile` to compile the extension.
4. Open the project in VSCode.
5. Press `F5` to open a new VSCode window with the extension loaded.

## Usage

### Compilation Command
- Open a `.comp` file in the editor.
- Press `Ctrl+Shift+P` to open the command palette.
- Type `Compile .comp File` and press `Enter`.

### Debugging Command
- Open a `.comp` file in the editor.
- Press `Ctrl+Shift+P` to open the command palette.
- Type `Debug .comp File` and press `Enter`.

## Troubleshooting

- Ensure that `halcompile` and `halrun` are installed and available in your system's PATH.
- Check the VSCode terminal for error messages if the compilation or debugging commands fail.
- Ensure all dependencies in `package.json` are correctly listed.
- Verify that the `@vscode/test-electron` package is properly installed and accessible.
- Run `npm cache clean --force` and then `npm install` to resolve any caching issues.
- Ensure that the `uuid` dependency is updated to version 7 or higher.
- Ensure that the `rimraf` dependency is updated to version 4 or higher.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## CI Pipeline Setup Using GitHub Actions

To set up a CI pipeline for your VSCode extension repository using GitHub Actions, follow these steps:

### Key Tasks for CI Pipeline

1. **Code Checkout and Environment Setup**
   - **Task**: Checkout the code from the GitHub repository and set up the environment (Node.js, npm, TypeScript).
   - **Goal**: Ensure that the build environment is ready for compiling and testing the extension.
   - **GitHub Action**: `actions/checkout@v2`, `actions/setup-node@v2`.

2. **Dependency Installation**
   - **Task**: Install the required npm dependencies as defined in the `package.json`.
   - **Goal**: Ensure all the necessary libraries and tools are available for building the VSCode extension.
   - **GitHub Action**: `npm install`.

3. **Code Linting and Formatting Check**
   - **Task**: Run linting and code formatting checks using a tool like **ESLint** or **Prettier**.
   - **Goal**: Ensure that the code follows the project's style guidelines and is free from syntax errors.
   - **GitHub Action**: `npm run lint`.

4. **TypeScript Compilation (if applicable)**
   - **Task**: Compile the TypeScript source code (if the extension uses TypeScript) to ensure the code can be successfully transpiled to JavaScript.
   - **Goal**: Verify that the code compiles correctly.
   - **GitHub Action**: `npm run compile` (assuming `tsc` or a similar command is configured in the `package.json`).

5. **Unit Testing**
   - **Task**: Run unit tests for the extension to ensure that its functionality is correct. Use a testing framework like **Mocha** or **Jest**.
   - **Goal**: Validate that the code works as expected and that any new changes do not introduce bugs.
   - **GitHub Action**: `npm test` or `npm run test`.

6. **VSCode Extension Packaging**
   - **Task**: Package the VSCode extension using the **vsce** (Visual Studio Code Extension Manager) tool.
   - **Goal**: Create a `.vsix` file for the VSCode extension that can be installed or uploaded to the marketplace.
   - **GitHub Action**: `vsce package`.

7. **Artifact Upload (for `.vsix` file)**
   - **Task**: Upload the generated `.vsix` file as an artifact of the CI process, so it can be downloaded and tested later.
   - **Goal**: Make the packaged VSCode extension available for download.
   - **GitHub Action**: `actions/upload-artifact@v2`.

8. **Optional: Version Bumping**
   - **Task**: Automatically bump the version number in `package.json` for each successful build based on predefined rules (e.g., patch, minor, major).
   - **Goal**: Ensure that each new release has an updated version number, especially if publishing automatically.
   - **GitHub Action**: Use tools like `standard-version` or a custom script to bump versions.

9. **Optional: Automated Publishing to VSCode Marketplace**
   - **Task**: Publish the extension to the **Visual Studio Code Marketplace** using the **vsce** tool and a Personal Access Token (PAT) from Azure DevOps.
   - **Goal**: Automatically deploy new versions of the extension to the marketplace after successful builds.
   - **GitHub Action**: `vsce publish`.

10. **Optional: Automated Changelog Generation**
    - **Task**: Automatically generate or update the changelog based on commit history.
    - **Goal**: Keep track of changes and improvements to the extension with each release.
    - **GitHub Action**: Use tools like `conventional-changelog` or `auto-changelog`.

### Explanation of Tasks:
- **Checkout code**: Retrieves the current state of the repository.
- **Node.js setup**: Prepares the environment to run Node.js applications.
- **Install dependencies**: Installs the dependencies defined in `package.json`.
- **Linting**: Runs ESLint to ensure code quality.
- **Compilation**: Compiles TypeScript into JavaScript (if applicable).
- **Testing**: Runs unit tests to validate functionality.
- **Packaging**: Uses `vsce` to package the extension into a `.vsix` file.
- **Artifact upload**: Makes the packaged `.vsix` file available for download.
- **Publishing**: (Optional) Publishes the extension to the VSCode Marketplace if a PAT is provided.

### Key Tools Used:
- **GitHub Actions**: For running CI tasks on GitHub-hosted runners.
- **Node.js and npm**: For managing dependencies, compiling, and testing.
- **ESLint**: For linting the codebase.
- **Mocha/Jest**: For running unit tests.
- **vsce**: For packaging and publishing the VSCode extension.

### Conclusion:
By configuring GitHub Actions as described, you can automate the **CI pipeline** for your VSCode extension without needing a self-hosted runner. This process handles **build, test, package**, and optionally **publish** tasks, ensuring that your extension is correctly built and tested with each commit or pull request.
