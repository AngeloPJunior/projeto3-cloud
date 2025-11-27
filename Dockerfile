FROM node:20-alpine

WORKDIR /usr/src/app

# Copia apenas arquivos de manifesto para melhor cache
COPY package*.json ./

# Instala dependências
RUN npm install --production=false

# Copia o restante do projeto
COPY . .

# Define variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
