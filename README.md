# bpannone.github.io
Personal Website

A modern static website built with TypeScript and Tailwind CSS, designed to be hosted on GitHub Pages.

## Tech Stack

- **TypeScript** 
- **Tailwind CSS** 
- **Docker** - Optional local development environment

## Development Environment
**Note:** Docker is optional and only used for local development. Build locally and deploy manually to GitHub Pages.
### Prerequisites

- **Docker** and **Docker Compose**


### Docker Development

**Start:**
```bash
docker-compose up
```

**Stop:**
```bash
docker-compose down
```

View at `http://localhost:8080`

### Development Workflow

- Edit files in `src/`
- Rebuild container to see changes: `docker-compose up --build`

### Deploying to GitHub Pages

Merge `develop` branch into `main` - GitHub Pages automatically deploys from root.

