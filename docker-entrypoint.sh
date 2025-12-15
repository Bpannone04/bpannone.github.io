#!/bin/sh
# Entrypoint script to handle permissions for cross-platform compatibility
# This ensures nginx can read files on both Mac and Windows Docker environments

# Allow override via environment variable (set NGINX_USER=root in docker-compose for Mac)
NGINX_USER="${NGINX_USER:-nginx}"

if [ "$NGINX_USER" = "root" ]; then
    echo "Running nginx as root (configured via NGINX_USER env var)"
    sed -i 's/^user nginx;/user root;/' /etc/nginx/nginx.conf
else
    # Try to fix permissions for nginx user
    # On Mac, this often fails due to volume mount restrictions
    # On Windows, Docker Desktop typically handles this fine
    chown -R nginx:nginx /usr/share/nginx/html 2>/dev/null || true
    chmod -R 755 /usr/share/nginx/html 2>/dev/null || true
    
    # Test if nginx can read files - if not, fall back to root
    if [ -f /usr/share/nginx/html/index.html ]; then
        # Use a simple test: try to cat as nginx user via su
        if ! su nginx -s /bin/sh -c "test -r /usr/share/nginx/html/index.html" 2>/dev/null; then
            echo "Warning: nginx user cannot read files. Running as root for compatibility."
            sed -i 's/^user nginx;/user root;/' /etc/nginx/nginx.conf
        fi
    fi
fi

# Start nginx
exec nginx -g "daemon off;"
