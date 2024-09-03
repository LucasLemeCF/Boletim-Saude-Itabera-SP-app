FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET="OFsQ6wuWlBCetNwuME5qus2Zocu23bF0W9d3dZo5hGk="

EXPOSE 3000

CMD ["npm", "start"]