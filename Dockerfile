# Use nginx for serving static files
FROM nginx:alpine

# Copy website files to nginx html directory
COPY src /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
