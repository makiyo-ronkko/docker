# load the Node.js image
FROM node:21-alpine

WORKDIR /app

# copy/cache the package and config-related files to the image
COPY package*.json .
COPY *config.js .

# install dependencies
RUN npm install

# copy the rest of the files to the image
COPY . .

# expose the port 5173
EXPOSE 5173

# define a HOST variable to the environment
ENV HOST=0.0.0.0

# define the command that is used to run the image
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0"]
# enforce that the application is run so that it can be accessed from outside the container