# downloads an Alpine Linux based Docker image as the starting point for image
FROM denoland/deno:alpine-1.37.0

# create a folder app to the image, setting that as the current working directory
WORKDIR /app

# the file containing the dependencies is copied to the image after which the dependencies are cached
COPY deps.js .

# copy all the files from the image to the folder, exporting the port 8000 from the image
# and start the command for running the image
# the base image includes deno as entrypoint
# after CMD are passed to the deno excutable
RUN deno cache deps.js

COPY . .

EXPOSE 8000

# translate deno run --allow-net --unstable --watch app-run.js
# --allow-env allows to access to the PGHOST environmental variable
CMD [ "run", "--allow-net", "--allow-env", "--allow-read", "--watch", "--unstable", "app-run.js" ]