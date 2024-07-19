FROM node

# Set the working directory inside the container
WORKDIR /home/app

# Copy the package.json and package-lock.json first for better caching
COPY package*.json ./

# Install the dependencies inside the container
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Command to run the application
CMD ["node", "server.js"]

# Dockerfile always starts with an image

# with RUN command you can execute any linux commands
# It runs in the cintainer environment

# COPY executes in the host. It means copy file from host(soutce) to the container(destination)

# It execute an entry point linux command. It translates to node server.js
# you can have multiple RUN but you can have one CMD command.