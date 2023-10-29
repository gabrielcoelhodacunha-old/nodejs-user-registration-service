FROM node:20-alpine3.17

WORKDIR /usr/src/app

COPY . .

# RUN GPR_READ_TOKEN=`cat $GPR_READ_TOKEN_FILE` &&\
# # Install dependencies
#   npm ci &&\
# # Run tests
#   npm test &&\
# # Build
#   npm run build

CMD [ "npm", "start" ]