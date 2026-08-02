# MeetingIQ

MeetingIQ is a professional, AI-powered meeting intelligence platform that transforms raw audio recordings into structured, actionable insights. By leveraging OpenAI's Whisper for high-fidelity transcription and Google Gemini for deep semantic analysis, MeetingIQ generates executive summaries, tracks action items, and evaluates project risks—all presented in a beautiful, responsive dashboard.

---

## Features
- **High-Fidelity Transcription:** Fast and accurate audio transcription using OpenAI's Whisper.
- **AI-Powered Analysis:** Leverages Google Gemini to extract executive summaries, action items, deadlines, and project risks.
- **Professional Exports:** Download your generated reports directly as native PDFs, Markdown files, or Plain Text.
- **Beautiful Dashboard:** A clean, dynamic, glassmorphic UI built with React and TailwindCSS.
- **Privacy First:** Uploaded audio files are securely processed and immediately deleted from the server upon completion.

---

## Tech Stack
**Frontend:**
- React (Vite)
- TypeScript
- TailwindCSS
- jsPDF (for native PDF generation)

**Backend:**
- Python 3.11
- FastAPI
- OpenAI Whisper
- Google GenAI SDK (Gemini)

---

## Project Structure
```text
MeetingIQ/
├── frontend/             # React/Vite SPA
│   ├── src/
│   │   ├── components/   # UI Components (Dashboard, Uploader, etc.)
│   │   ├── services/     # API Integration
│   │   └── types/        # TypeScript Interfaces
│   └── Dockerfile
├── backend/              # FastAPI Server
│   ├── app/
│   │   ├── api/          # Route definitions
│   │   ├── services/     # Whisper & Gemini integrations
│   │   └── utils/        # File validation
│   └── Dockerfile
├── docker-compose.yml    # Container orchestration
├── run.sh                # Local Developer Launcher (macOS/Linux)
├── stop.sh               # Local Developer Stopper (macOS/Linux)
└── run.bat               # Local Developer Launcher (Windows)
```

---

## Prerequisites
Before running MeetingIQ locally, ensure you have the following installed:
- **Python 3.9+**
- **Node.js 20+** and **npm**
- **FFmpeg** (Required by Whisper for audio decoding)

*Note: The included `run.sh` script will automatically check for these dependencies.*

---

## Environment Variables
The application requires API keys and configuration to run.

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory (you can copy `.env.example`):
```env
GEMINI_API_KEY=your_gemini_api_key_here
ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend/` directory (you can copy `.env.example`):
```env
VITE_API_URL=http://localhost:8000
```

---

## Local Setup (Fastest)

MeetingIQ includes intelligent, cross-platform launcher scripts to automate the local development environment. These scripts automatically create virtual environments, install dependencies, and boot both servers.

### macOS & Linux
```bash
# Start the application
./run.sh

# Stop the application
./stop.sh
```

### Windows
```cmd
# Start the application
run.bat

# Stop the application
stop.bat
```

---

## Docker Setup (Production Ready)

MeetingIQ is fully containerized for seamless deployment.

1. Ensure your `.env` files are configured.
2. Run Docker Compose:
```bash
docker compose up --build
```
3. To stop and remove the containers:
```bash
docker compose down
```

*Note: The frontend will be available at `http://localhost:8080` when using Docker Compose. Ensure you add `http://localhost:8080` to your `ALLOWED_ORIGINS` in the backend `.env` file.*

---

## Troubleshooting

### FFmpeg Not Found Error
If the backend fails during transcription with a `FileNotFoundError` related to `ffmpeg`, it means the FFmpeg binary is missing from your system PATH.
- **macOS:** `brew install ffmpeg`
- **Ubuntu/Debian:** `sudo apt update && sudo apt install ffmpeg`
- **Windows:** `winget install Gyan.FFmpeg`

### Out of Memory (OOM) Errors
Whisper relies on PyTorch, which can consume ~1GB of RAM when loading the `base` model. Ensure your machine or Docker engine has at least 2GB of allocated memory.

### Docker Build Stalls (PyTorch Download)
MeetingIQ includes full Docker support for production deployment. However, on some Apple Silicon/macOS Docker environments, the initial `docker compose build` may stall while downloading the large PyTorch CPU wheel. This appears to be an environment-specific Docker networking issue rather than a flaw in the project.
As a workaround, developers can use the provided native startup scripts (`run.sh`, `run.bat`, `run.ps1`) to run the application locally without Docker.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
