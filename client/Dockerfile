# Use a lighter version of Node as a parent image
#FROM mhart/alpine-node:8.11.4
# Set the working directory to /client
#WORKDIR /client
# copy package.json into the container at /client
#COPY package*.json /client/
# install dependencies
#RUN npm install
# Copy the current directory contents into the container at /client
#COPY . /client/
# Make port 3000 available to the world outside this container
#EXPOSE 3000
# Run the app when the container launches
#CMD ["npm", "start"]

FROM node:carbon
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
#To bundle your app’s source code inside the Docker image, use the COPY instruction:
COPY . .
#Your app binds to port 3000 so you’ll use the EXPOSE instruction to have it mapped by the docker daemon:
EXPOSE 8080
CMD [ "npm", "start" ]