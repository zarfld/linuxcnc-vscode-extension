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

### Expanded Error Handling and Validation
- Real-Time Error Checking: Real-time validation against common mistakes highlighted in the documentation, such as incorrect pin types, missing required functions (like `_update`), and misconfiguration of `addf` for real-time threads.
- Error Reporting for Invalid Combinations: Flagging mistakes and providing suggestions for fixing components that incorrectly mix real-time and userspace functionality.

### Enhanced Code Templates and Snippets
- Component Snippets Based on Examples: Predefined code snippets based on the examples provided in the latest documentation, including a full template for a basic HAL component and snippets for common HAL component patterns.
- Task Templates for HAL Components: Ready-to-use task templates for compiling and testing HAL components.

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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
