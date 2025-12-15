# bpannone.github.io
Personal Website

A static website built with HTML, CSS, and JavaScript, designed to be hosted on GitHub Pages.

## Development Environment

This project uses Docker for the development environment with nginx serving static files.

### Prerequisites
- Docker
- Docker Compose

### Getting Started

1. **Start the development server:**
   ```bash
   docker-compose up
   ```

2. **View the development website:**
   Open your browser and navigate to `http://localhost:8080`

3. **Stop the development server:**
   ```bash
   docker-compose down
   ```

### Development Workflow

The website files are mounted as a volume, so changes to your HTML/CSS/JS files will be reflected immediately (you may need to refresh your browser).

### Project Structure

- `index.html` - Main HTML file (served by both Docker and GitHub Pages)
- `js/` - JavaScript files
  - `js/main.js` - Main JavaScript file

**Note:** Files are stored in the root directory and work for both Docker development and GitHub Pages deployment.

### Deploying to GitHub Pages

Simply commit and push your changes:
```bash
git add .
git commit -m "Update website"
git push
```

GitHub Pages will automatically deploy the files from the root directory.

### Building for Production (Docker)

To build the Docker image:
```bash
docker build -t bpannone-website .
```

To run the built image:
```bash
docker run -p 8080:80 bpannone-website
```
