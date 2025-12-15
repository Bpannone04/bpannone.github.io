# bpannone.github.io
Personal Website

A modern static website built with TypeScript and Tailwind CSS, designed to be hosted on GitHub Pages.

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Docker** - Optional local development environment (not used for deployment)

## Development Environment

**Note:** Docker is optional and only used for local development. Build locally and deploy manually to GitHub Pages.

### Prerequisites

- **Node.js** (v20 or higher) - For local development
- **Docker** - For containerized development
- **Docker Compose** - For orchestrating services

### Local Development (Without Docker)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Start development server with watch mode:**
   ```bash
   npm run dev
   ```

4. **View the development website:**
   Open `dist/index.html` in your browser, or use a local server:
   ```bash
   npx serve dist
   ```

### Docker Development

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

- Source files are in the `src/` directory
- TypeScript files: `src/ts/`
- CSS files: `src/css/`
- HTML files: `src/`
- Built files are output to `dist/` directory

For Docker development, rebuild the container after making changes:
```bash
docker-compose up --build
```

### Project Structure

```
.
├── src/                    # Source files
│   ├── ts/                # TypeScript source files
│   │   └── main.ts
│   ├── css/               # CSS source files
│   │   └── input.css      # Tailwind CSS input
│   └── index.html         # Main HTML file
├── dist/                  # Built files (generated)
│   ├── css/
│   │   └── styles.css     # Compiled Tailwind CSS
│   ├── js/
│   │   └── main.js        # Compiled TypeScript
│   └── index.html
├── package.json           # Node.js dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── Dockerfile             # Production Docker image
```

### Building for Production

To build the project locally:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploying to GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Copy the contents of `dist/` to your repository root (or configure GitHub Pages to serve from `dist/`)

3. Commit and push:
   ```bash
   git add .
   git commit -m "Update website"
   git push
   ```

**Note:** Since you're working in a develop branch, merge to main when ready to deploy.

### Docker (Local Development Only)

Docker is optional and only for local development/testing. It's not used for deployment:

To build and run locally with Docker:
```bash
docker-compose up --build
```

This will build your site and serve it at `http://localhost:8080` for local testing only.
