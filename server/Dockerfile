 # Create image based on the official Node 6 image from the dockerhub
FROM node:10

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

ENV MYSQL_HOST 127.0.0.1
ENV EXPRESS_HOST 8080

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Get all the code needed to run the app
COPY . /usr/src/app

# Install dependecies
RUN npm install
RUN npm rebuild bcrypt --update-binary

# Expose the port the app runs in
EXPOSE 8080

# Serve the app
CMD ["./wait-for-it.sh", "127.0.0.1:3306", "--","npm","run","prod"]
