# LifeServer

> A lightweight **Electron-based local development server** with **live reload**, automatic port fallback, and a simple desktop interface.

LifeServer is a desktop application that lets you serve any local website with automatic browser refresh using **Server-Sent Events (SSE)**. It was originally built after VS Code's Live Server stopped working for me, but became a way to learn how development servers, HTTP, file watching, and Electron work under the hood.

Supports **Windows**, **Linux**, and **macOS**.

---

## Downloads

Download the latest version from the **Releases** page.

### Available Builds

-  Windows Installer (`.exe`)
-  Linux AppImage (`.AppImage`)
-  macOS (currently no build available)

 **Latest Release**

https://github.com/Rohan-KV-2806/LifeServer/releases/latest

---

## Features

- 🚀 One-click Start/Stop server
- 🔄 Live Reload using Server-Sent Events (SSE)
- 🌐 Custom host binding (`localhost`, `127.0.0.1`, `0.0.0.0`, or any valid interface)
- 🔢 Automatic port fallback if the selected port is already in use
- 📁 Serve any local directory
- 📄 MIME type detection for HTML, CSS, JavaScript, JSON, images, fonts, SVG, and more
- 📝 Built-in server status and error logging
- 🖥 Cross-platform desktop application (Electron)

---


## Project Structure

```text
LifeServer/
├── index.js              # Electron main process & HTTP server
├── preload.js            # Secure IPC bridge
├── package.json          # Project configuration
├── README.md
├── renderer/
│   ├── index.html        # User interface
│   ├── renderer.js       # UI logic
│   └── style.css         # Styling
└── node_modules/
```

---

## 🛠 Tech Stack

| Component | Technology |
|------------|------------|
| Runtime | Node.js |
| Desktop Application | Electron |
| HTTP Server | Node.js `http` |
| Live Reload | Server-Sent Events (SSE) |
| File Watching | `fs.watch()` |
| Frontend | HTML, CSS, Vanilla JavaScript |

No external web server frameworks are used. The server is built entirely with Node.js core modules.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm

### Installation

```bash
git clone https://github.com/Rohan-KV-2806/LifeServer.git

cd LifeServer

npm install
```

### Run

```bash
npm start
```

---

## 📖 Usage

1. Launch LifeServer.
2. Choose the **directory** you want to serve.
3. Select the **host**.

   Examples:

   - `localhost`
   - `127.0.0.1`
   - `0.0.0.0`

4. Choose a **port** (default: **5500**).
5. Click **Start Server**.
6. Open the generated URL.
7. Edit your files and watch the browser refresh automatically.
8. Click **Stop Server** when finished.

---

## How It Works

LifeServer combines several Node.js technologies to provide a lightweight development experience.

- Electron provides the desktop application.
- Node.js hosts the HTTP server.
- `fs.watch()` monitors project files.
- Server-Sent Events (SSE) notify connected browsers when files change.
- Browsers automatically reload without requiring extensions or external tools.

---

## Why I Built This

While learning HTML, CSS, and JavaScript, I encountered issues with VS Code's Live Server extension.

Rather than searching for another alternative, I decided to build one myself.

The project became an opportunity to learn:

- Electron
- HTTP servers
- File systems
- File watching
- Server-Sent Events
- Desktop application development
- Inter-process communication (IPC)

---


## AI Usage

AI tools were used as development assistants throughout the project.

They were primarily used for:

- Learning Electron and Node.js concepts
- Debugging issues
- Improving CSS
- Proofreading documentation

All application architecture, implementation, integration, testing, and final decisions were completed by me.

---

## Author

**Rohan**

GitHub: https://github.com/Rohan-KV-2806
