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


### Deploying to GitHub Pages

Merge `develop` branch into `main` - GitHub Pages automatically deploys from root.

