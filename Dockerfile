# 1つ目のビルドステージ
FROM node:20.11.0-alpine as builder
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# 2つ目のビルドステージ
FROM node:20.11.0-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
RUN yarn global add serve
CMD ["serve", "-s", "build", "-l", "3000"]