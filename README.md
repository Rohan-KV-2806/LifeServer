# LifeServer

A simple **Electron-based** local development server with **live reload** (SSE) and a clean GUI. Built because VS Code's Live Server wasn't working properly — so I made my own!

---

## Features

- **One-click Start/Stop** — Launch and kill the server from a simple UI
- **Live Reload** — Save a file, browser auto-refreshes via Server-Sent Events
- **Auto Port Fallback** — If your port is taken, it tries the next one
- **Custom Port & Directory** — Serve any folder on any port
- **MIME-Type Support** — Serves HTML, CSS, JS, images, fonts, JSON, and more
- **Error Logging** — Server status and errors shown right in the UI

---

## Project Structure

```
LifeServer/
├── index.js              # Main process (Electron) — HTTP server + live reload
├── preload.js            # Bridges IPC between main & renderer
├── package.json          # Project config & dependencies
├── README.md             # You're here!
├── renderer/
│   ├── index.html        # The GUI layout
│   ├── renderer.js       # Renderer logic — button handlers, status updates
│   └── style.css         # Styling for the UI
└── node_modules/         # Dependencies (Electron)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js |
| **Desktop Shell** | [Electron](https://www.electronjs.org/) |
| **HTTP Server** | Node.js built-in `http` module |
| **Live Reload** | SSE (Server-Sent Events) |
| **File Watching** | `fs.watch` (recursive) |
| **Frontend** | HTML, CSS, Vanilla JavaScript |

No external server dependencies — everything is powered by Node.js core modules.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repo
git clone https://github.com/Rohan-KV-2806/LifeServer.git
cd LifeServer

# Install dependencies
npm install
```

### Usage

```bash
npm start
```

1. Enter a **port** (default: `5500`)
2. Enter a **directory path** to serve (e.g. `.` for current folder, or an absolute path like `D:\Projects\Online-Gallery`)
3. Click **▶ Start Server**
4. Open the displayed URL in your browser
5. Edit files — the browser auto-reloads!
6. Click **⏹ Stop Server** when done

---

## Why I Built This

I was learning HTML, CSS, and JavaScript while building a webpage, and VS Code's Live Server extension stopped working properly. Instead of wrestling with it, I decided to build my own and learned about Electron, HTTP servers, file watching, and real-time browser communication along the way!

---

##  Author

**Rohan** ([@Rohan-KV-2806](https://github.com/Rohan-KV-2806))

## AI Usage

I used AI tools to assist in building this project:

    DeepSeek — helped create and improve the CSS, and debug errors.
    DeepL — helped correct grammar and polish the writing in the README.
    Qwen — helped me learn Node.js and Electron throughout development.