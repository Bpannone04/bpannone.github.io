# bpannone.github.io
Personal Website

## Development Environment

This project uses Docker for the development environment.

### Prerequisites
- Docker
- Docker Compose

### Getting Started

1. **Start the development server:**
   ```bash
   docker-compose up
   ```

2. **View your website:**
   Open your browser and navigate to `http://localhost:8080`

3. **Stop the development server:**
   ```bash
   docker-compose down
   ```

### Development Workflow

The website files are mounted as a volume, so changes to your HTML/CSS/JS files will be reflected immediately (you may need to refresh your browser).

### Building for Production

To build the Docker image:
```bash
docker build -t bpannone-website .
```

To run the built image:
```bash
docker run -p 8080:80 bpannone-website
```
