# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if they exist)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon for development (this is needed for local development)
RUN npm install -g nodemon

# Copy the rest of the application files
COPY . .

# Expose the port your app uses (3000 or the port you're using)
EXPOSE 3000

# Run the application with nodemon for development
CMD ["nodemon", "server.js"]
