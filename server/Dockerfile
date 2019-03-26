# Use a lighter version of Node as a parent image
FROM node:9-slim

WORKDIR /app
COPY package.json /app

# Set the working directory to /server
#WORKDIR /server

# copy package.json into the container at /server
#COPY package*.json /server/

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /server
#COPY . ./server

# Make port 5000 available to the world outside this container
#EXPOSE 5000

COPY . /app

# Run the app when the container launches
CMD ["npm", "start"]

#docker build -t node-docker-tutorial .       '.' specifies path
#docker run -d -p 9000:5000 node-docker-tutorial