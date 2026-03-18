# Use a recent LTS Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Create a shell script to run migrations and start the app
RUN echo '#!/bin/bash' >> entrypoint.sh && echo 'npm run migration:run' >> entrypoint.sh && echo 'npm run start:dev' >> entrypoint.sh

# Make the script executable
RUN chmod +x entrypoint.sh

# Expose port for NestJS server in development mode
EXPOSE 3001

# Use the custom shell script to run migrations and start the app
CMD ["/bin/sh", "./entrypoint.sh"]