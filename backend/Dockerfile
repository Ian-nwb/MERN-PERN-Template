# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the port your Express app listens on (e.g., 5000)
EXPOSE 5000

# Command to run your backend
CMD ["npm", "start"]