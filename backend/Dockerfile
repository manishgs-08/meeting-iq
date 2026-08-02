FROM python:3.11-slim

WORKDIR /app

# Install system dependencies (ffmpeg required by whisper)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install PyTorch CPU first to guarantee we don't pull massive CUDA packages
# Use a high timeout because the wheel is large (~150MB)
RUN pip install --no-cache-dir --default-timeout=1000 \
    torch torchaudio \
    --index-url https://download.pytorch.org/whl/cpu

# Install application dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port and run the app
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
