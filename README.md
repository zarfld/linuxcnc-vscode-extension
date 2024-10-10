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
