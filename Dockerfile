# Use PHP-FPM as base
FROM php:8-fpm-alpine

# Install nginx
RUN apk add --no-cache nginx supervisor

# Copy website files to nginx html directory
COPY . /var/www/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Create necessary directories
RUN mkdir -p /var/log/supervisor && \
    chown -R www-data:www-data /var/www/html && \
    chown -R www-data:www-data /var/log/supervisor

# Expose port 80
EXPOSE 80

# Start supervisor to manage both nginx and php-fpm
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
