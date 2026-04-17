# Stage 1: Build
FROM node:20-alpine3.19 AS builder

# Встановлюємо необхідні бібліотеки для Prisma (openssl)
RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json yarn.lock ./
# Копіюємо папку prisma (там лежить schema.prisma)
COPY prisma ./prisma/

RUN yarn install --frozen-lockfile

COPY . .

# Генеруємо Prisma Client
RUN yarn prisma generate

# Білдимо проект
RUN yarn build

# Stage 2: Runner
FROM node:20-alpine AS runner

# Важливо встановити openssl і тут, щоб Prisma працювала в рантаймі
RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=10000

EXPOSE 10000

# Запускаємо міграції (опціонально) і старт
# Якщо базу вже розгорнуто, краще просто node dist/main
CMD ["sh", "-c", "yarn prisma db push && node dist/main"]