#!/bin/sh
# Entrypoint script to handle permissions for cross-platform compatibility

NGINX_USER="${NGINX_USER:-nginx}"

if [ "$NGINX_USER" = "root" ]; then
    echo "Running nginx as root (configured via NGINX_USER env var)"
    sed -i 's/^user nginx;/user root;/' /etc/nginx/nginx.conf
else
    chown -R nginx:nginx /usr/share/nginx/html 2>/dev/null || true
    chmod -R 755 /usr/share/nginx/html 2>/dev/null || true
    
    if [ -f /usr/share/nginx/html/index.html ]; then
        PERM_TEST_FAILED=true
        if command -v su-exec >/dev/null 2>&1; then
            if su-exec nginx test -r /usr/share/nginx/html/index.html 2>/dev/null; then
                PERM_TEST_FAILED=false
            fi
        else
            if su nginx -c "test -r /usr/share/nginx/html/index.html" 2>/dev/null; then
                PERM_TEST_FAILED=false
            fi
        fi
        
        if [ "$PERM_TEST_FAILED" = "true" ]; then
            echo "Warning: nginx user cannot read files. Running as root for compatibility."
            sed -i 's/^user nginx;/user root;/' /etc/nginx/nginx.conf
        fi
    fi
fi

exec nginx -g "daemon off;"

