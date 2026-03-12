## devKick

**devKick** is a colorful, interactive CLI that runs quick checks and startup tasks for your Docker, web, and Python projects so you can get to coding faster.

### Getting Started

- **Install globally**:

```bash
npm install -g devkick
```

- **Run in your project** (from the project root):

```bash
devkick start
```

devKick is interactive – it will ask before running commands like `git pull`, `npm install`, `npm start`, `docker-compose up`, or `pip install`.

### What devKick does

- **Detects your project type**
  - Docker projects: based on `Dockerfile` or `docker-compose.yml`
  - Web/Node projects: based on `package.json`
  - Python projects: based on `requirements.txt` or `pyproject.toml`
  - If nothing is detected, it lets you choose (Docker / Web / Python).

- **Runs general environment checks**
  - Looks for a `.env` file and loads it if present.
  - Checks for Git and whether you’re inside a repo.
  - Warns about uncommitted changes and can optionally run `git pull`.

- **Runs project-specific helpers**
  - **Docker**
    - Checks whether Docker is installed.
    - Verifies the Docker daemon is reachable.
    - If `docker-compose.yml` exists, can run `docker-compose up -d`.
  - **Web (Node)**
    - Confirms Node.js is installed.
    - If `node_modules` is missing, can run `npm install`.
    - Can start your dev server via `npm start`.
  - **Python**
    - Checks for Python (`python3` or `python`).
    - If `requirements.txt` is present, can run `pip install -r requirements.txt`.
    - Prints a quick tip for creating a virtual env.

- **Optional editor launch**
  - If the `code` CLI is available, can open the project in VS Code (`code .`).

### Requirements

- Node.js **>= 14**
- A POSIX-style shell or terminal (macOS, Linux, WSL, or similar)
- For best results, run `devkick` **inside a Git repo** at your project root.

### Usage examples

- **Node/web app**:

```bash
cd my-web-app
devkick start
```

- **Docker project**:

```bash
cd my-docker-app
devkick start
```

- **Python project**:

```bash
cd my-python-app
devkick start
```

### Tips & Notes

- devKick **never runs heavy commands without asking first** – you stay in control.
- It cannot auto-start Docker Desktop; if Docker isn’t running, you’ll be prompted to start it manually.
- You can safely re-run `devkick start` as often as you like while you’re working on a project.

### Contributing & Support

- **Source code / issues**: `https://github.com/TheRiseCollection/dev-kick-plugin`
- **Homepage / info**: `https://www.therisecollection.co/portfolio/devkick`

Bug reports and pull requests are welcome.

### Changelog

- **1.0.6** – Improved README and npm metadata (homepage, repository, bugs) for better discoverability.
