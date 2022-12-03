FROM node:18-alpine

RUN npm i -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm i

COPY . .

CMD ["node", "--expose-gc", "--unhandled-rejections=warn", "disc.js"]
