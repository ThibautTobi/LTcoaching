
# Etape 1 : BUILD ( compilation de l'app )
# telecharge une image avec la version 20 de node.js et version linux légére.
FROM node:20-alpine AS builder

# Dossier de travail dans le container
WORKDIR /app

# Copier uniquement les fichiers nécessaires aux dépendances
COPY package*.json ./

# Installer dépendances (inclut devDependencies nécessaire pour build)
RUN npm install

# Copier tout le projet dans Docker ( sauf les fichier dans .dockerignore )
COPY . .

# Build Next.js (inclut next-sitemap via postbuild pour généré le sitemap ) et génére le .next/
RUN npm run build


# Etape 2 : PRODUCTION ( execution de l'app )
# creation d'une nouvelle image sans les fichier inutile en pro et les dependance dev.
FROM node:20-alpine

WORKDIR /app

# Variable d'environnement production
ENV NODE_ENV=production

# Sécurité : création utilisateur non-root
# créé un groupe : app et un user : app
# "USER app" = lance l'app avec cette utilisateur 
RUN addgroup -S app && adduser -S app -G app

# Copier uniquement le build standalone ( la version optimisé)
# copie serveur Node et dependances utiles
COPY --from=builder /app/.next/standalone ./
# copie les fichier statique ( css,js,images )
COPY --from=builder /app/.next/static ./.next/static

# Exposer le port par default localhost:3000
EXPOSE 3000

# Utiliser user sécurisé
USER app

# Lancer app
# version plus rapide
CMD ["node", "server.js"]
#version classique
#CMD ["npm", "start"]