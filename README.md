# DevKick

1.0.2 Public - https://www.npmjs.com/package/devkick

**DevKick** is a colorful, interactive command-line tool designed to help developers kickstart their projects with ease. Whether you're working with Docker, web apps, or Python, DevKick checks your environment, suggests fixes, and runs startup tasks—all from your terminal.

## Features

**Project Detection**: Automatically identifies your project type (Docker, Web, Python) based on files like `Dockerfile`, `package.json`, or `requirements.txt`.

**Environment Checks**: Ensures tools like Git, Node.js, Docker, or Python are installed and ready.

**Startup Tasks**: Offers to install dependencies, pull Git updates, start Docker Compose, launch web servers, and more.

**Colorful Output**: Vibrant terminal feedback with green checkmarks (✓), red crosses (✗), and blue prompts.

**Interactive**: Prompts you to confirm actions like running commands or opening your editor.

**Cross-Platform**: Works on Linux, macOS, and Windows (with minor manual steps for some features).

## Installation
Install `devkick` globally via npm:
```bash
npm install -g devkick
```

## Run devkick
```bash
devkick start
```
