#!/usr/bin/env node
const { program } = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
// Helper to run shell commands
const runCommand = (cmd, silent = false) => {
  try {
    const output = execSync(cmd, { stdio: silent ? "pipe" : "inherit" });
    return silent ? output.toString().trim() : true;
  } catch (error) {
    return false;
  }
};
// Check if a tool is installed
const checkTool = (tool) => runCommand(`which ${tool}`, true) || runCommand(`where ${tool}`, true);
// Custom chalk styles
const success = chalk.green.bold;
const error = chalk.red.bold;
const warning = chalk.yellow;
const info = chalk.cyan;
const highlight = chalk.magenta.bold;
const promptStyle = chalk.blue;
// Main CLI command
program
  .command("start")
  .description("Run startup checks for your project")
  .action(async () => {
    console.log(highlight("🚀 Starting DevKick checks..."));
    // Detect project type
    let projectType;
    if (fs.existsSync("Dockerfile") || fs.existsSync("docker-compose.yml")) {
      projectType = "Docker";
    } else if (fs.existsSync("package.json")) {
      projectType = "Web";
    } else if (fs.existsSync("requirements.txt") || fs.existsSync("pyproject.toml")) {
      projectType = "Python";
    } else {
      const { type } = await inquirer.prompt([
        {
          type: "list",
          name: "type",
          message: warning("Couldn’t detect project type. What are you working on?"),
          choices: ["Docker", "Web", "Python"],
        },
      ]);
      projectType = type;
    }
    console.log(info(`Detected project: ${highlight(projectType)}`));
    // General checks
    if (fs.existsSync(".env")) {
      console.log(success("✓ Found .env file at ") + chalk.white(path.resolve(".env")));
      dotenv.config(); // Load env vars silently
    }
    if (checkTool("git")) {
      if (runCommand("git rev-parse --is-inside-work-tree", true)) {
        console.log(success("✓ Git repository detected"));
        if (runCommand("git status --porcelain", true)) {
          console.log(warning("  Uncommitted changes detected."));
        }
        const { pull } = await inquirer.prompt([
          { type: "confirm", name: "pull", message: promptStyle("  Pull updates from remote?") },
        ]);
        if (pull) runCommand("git pull");
      } else {
        console.log(warning("No Git repository found."));
      }
    } else {
      console.log(error("✗ Git not installed"));
    }
    // Project-specific checks
    if (projectType === "Docker") {
      if (checkTool("docker")) {
        if (runCommand("docker info", true)) {
          console.log(success("✓ Docker daemon is running"));
        } else {
          const { start } = await inquirer.prompt([
            { type: "confirm", name: "start", message: warning("Docker daemon not running. Start it?") },
          ]);
          if (start) {
            console.log(info("Please start Docker manually (e.g., Docker Desktop on Windows/Mac)."));
          }
        }
        if (fs.existsSync("docker-compose.yml")) {
          const { compose } = await inquirer.prompt([
            { type: "confirm", name: "compose", message: promptStyle("Run docker-compose up?") },
          ]);
          if (compose) runCommand("docker-compose up -d");
        }
      } else {
        console.log(error("✗ Docker not installed"));
      }
    }
    if (projectType === "Web") {
      if (checkTool("node")) {
        console.log(success("✓ Node.js installed"));
        if (fs.existsSync("package.json")) {
          if (!fs.existsSync("node_modules")) {
            const { install } = await inquirer.prompt([
              { type: "confirm", name: "install", message: promptStyle("Install dependencies?") },
            ]);
            if (install) runCommand("npm install");
          }
          const { start } = await inquirer.prompt([
            { type: "confirm", name: "start", message: promptStyle("Start the dev server?") },
          ]);
          if (start) runCommand("npm start");
        } else {
          console.log(error("✗ No package.json found"));
        }
      } else {
        console.log(error("✗ Node.js not installed"));
      }
    }
    if (projectType === "Python") {
      if (checkTool("python3") || checkTool("python")) {
        console.log(success("✓ Python installed"));
        if (fs.existsSync("requirements.txt")) {
          const { install } = await inquirer.prompt([
            { type: "confirm", name: "install", message: promptStyle("Install Python dependencies?") },
          ]);
          if (install) runCommand("pip install -r requirements.txt");
        }
        console.log(info("For virtual env, run: ") + chalk.white("python3 -m venv .venv && source .venv/bin/activate"));
      } else {
        console.log(error("✗ Python not installed"));
      }
    }
    // Final utility
    if (checkTool("code")) {
      const { open } = await inquirer.prompt([
        { type: "confirm", name: "open", message: promptStyle("Open project in VS Code?") },
      ]);
      if (open) runCommand("code .");
    }
    console.log(success("✓ DevKick complete! Ready to code."));
  });
program.parse(process.argv);

