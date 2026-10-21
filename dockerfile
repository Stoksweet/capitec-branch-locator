FROM node:20-alpine

WORKDIR /app

# Install dependency files
COPY package*.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Expose the default Ionic serve port
EXPOSE 8100

# Run ionic serve bound to all network interfaces (0.0.0.0)
CMD ["npx", "ionic", "serve", "--host", "0.0.0.0", "--port", "8100", "--no-open"]