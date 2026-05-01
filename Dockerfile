FROM node:18-alpine

WORKDIR /app

# Copy only essential files to keep image lightweight
COPY package.json ./
RUN npm install --production

COPY server.js logic.js index.html app.js ./

# Expose port and start
EXPOSE 3000
CMD ["npm", "start"]
