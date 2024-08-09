FROM node:20 AS build
LABEL maintainer="Milkyano Developer <milkyanocreativemedia@gmail.com>"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY prisma ./prisma
RUN npm install prisma --save-dev
COPY . .
RUN npm install typescript
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=build /app/prisma ./prisma
RUN npm ci --only=production
EXPOSE 8800
CMD ["npm", "start"]
