# FROM node:14.17-slim

# RUN npm install -g @angular/cli 
# # Setup work directory
# WORKDIR /app
# COPY . /app

# # Avoid warning fsevents incompatible platform
# RUN rm -rf package-lock.json
# RUN npm install --unsafe-perm

# # Build
# RUN ng build
# CMD [ "npm" ," run" , "start" ]

FROM node:14.15.0 as builder

ADD package.json yarn.lock /ng-app/

WORKDIR /ng-app

COPY . /ng-app

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN yarn install

# COPY . .

# RUN cd sdk && yarn install && yarn build:staging && cd ..

RUN yarn build:staging

CMD [ "npm" ," run" , "start" ]

# FROM nginx:1.19.5-alpine

# ## Copy our default nginx config
# COPY nginx/default.conf /etc/nginx/conf.d/

# ## Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*

# ## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
# COPY --from=builder /ng-app/dist/text2speech /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]
