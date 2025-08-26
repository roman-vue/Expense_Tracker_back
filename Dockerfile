from node:19

WORKDIR /app

copy package.json ./
run npm install --force --legacy-peer-deps
copy . .

EXPOSE 3000

CMD [ "npm", "start" ]