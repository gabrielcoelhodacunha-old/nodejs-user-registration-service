FROM node:20-alpine3.17 as base
ENV APP_DIR=/usr/src/app
WORKDIR $APP_DIR

FROM base as install
ENV GPR_READ_TOKEN_FILE=/run/secrets/gpr_read_token
COPY . .
RUN --mount=type=secret,id=gpr_read_token,required\
  GPR_READ_TOKEN=`cat $GPR_READ_TOKEN_FILE` npm ci

FROM install as build
RUN npm run build

FROM base as installed
COPY --from=build $APP_DIR/node_modules ./node_modules
COPY --from=build $APP_DIR/dist ./dist
COPY --from=build $APP_DIR/package.json .

FROM base as app
COPY --from=installed $APP_DIR .
CMD ["npm", "start"]