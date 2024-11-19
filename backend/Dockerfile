# Use Node.js 18 as the base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Set environment variables
ENV NODE_ENV=production \
    PORT=8080

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]