FROM node:23-alpine

# Set working directory to the subproject folder
WORKDIR /app/branch-locator

# Copy package.json first to leverage Docker layer caching
COPY branch-locator/package.json ./

# Angular & IOnic CLI install
RUN npm install -g @angular/cli
RUN npm install -g @ionic/cli

# Install dependencies using npm install (since package-lock.json isn't present)
RUN npm install

# Copy the rest of the branch-locator source code into the container
COPY branch-locator/ .

# Expose the Ionic dev server port
EXPOSE 8100

# Run ionic serve bound to all network interfaces
ENTRYPOINT ["ionic", "serve", "--host", "0.0.0.0"]