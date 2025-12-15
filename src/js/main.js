// Main JavaScript file for https://bpannone.com

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Check if we're in development environment
    checkDevelopmentEnvironment();
    
    // Add your JavaScript code here
});

function checkDevelopmentEnvironment() {
    // Check if we're running on localhost:8080 (development)
    // Production will be on bpannone.github.io (GitHub Pages)
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    // Show banner if on localhost with port 8080 (Docker dev environment)
    // Port 8080 is explicitly mapped in docker-compose.yml for development
    const isDevelopment = (hostname === 'localhost' || hostname === '127.0.0.1') && 
                          port === '8080';
    
    if (isDevelopment) {
        showDevelopmentBanner();
    }
}

function showDevelopmentBanner() {
    // Create development banner
    const banner = document.createElement('div');
    banner.id = 'dev-banner';
    banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ff9800;
        color: white;
        text-align: center;
        padding: 8px;
        font-weight: bold;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `;
    banner.textContent = 'DEVELOPMENT ENVIRONMENT NOT PRODUCTION';
    document.body.insertBefore(banner, document.body.firstChild);
    
    // Adjust body padding to account for banner
    document.body.style.paddingTop = '40px';
}

