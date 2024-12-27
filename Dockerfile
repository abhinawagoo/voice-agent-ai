# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if they exist) first to take advantage of Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Install nodemon for development (only if needed for development environments)
RUN npm install -g nodemon

# Expose the port your app uses (3000 or the port you're using)
EXPOSE 3000

# Use a command that runs the app based on environment
# Run the application with nodemon for development (if environment is not production)
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then node server.js; else nodemon server.js; fi"]
