# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Expose the port React runs on (usually 3000 or 5173 for Vite)
EXPOSE 3000

# Command to run your frontend development server
CMD ["npm", "start"]