# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the app
COPY . .

# Expose backend port
EXPOSE 5000

# Run the app
CMD ["node", "server.js"]
