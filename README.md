# What is "react_ssr"

This package is created "from sratch" using [this article](https://dev.to/alekseiberezkin/setting-up-react-typescript-app-without-create-react-app-oph)

It supports react server side rendering was following these articles:
 - [initial rendering](https://www.digitalocean.com/community/tutorials/react-server-side-rendering)
 - [enabled styles for styled components](https://styled-components.com/docs/advanced#server-side-rendering)

It is containerized using Docker and depends on IP_LOCATOR_HOST, see more [here](https://hub.docker.com/repository/docker/xtonyx/sypex-geo):
- `docker network create -d bridge ad_manager_network`
- `docker network connect ad_manager_network sypex-geo`
- `docker build . -t 'xtonyx/ad_manager:v1.0.5'`
- `docker rm -f ad_manager`
- `docker run -d --restart=unless-stopped --net=ad_manager_network -p 8080:3000 -v ~/docker/ad_manager/data:/opt/react-app/server/data:rw -e 'IP_LOCATOR_HOST=http://sypex-geo:16001' -e 'GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID' -e 'GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET' -e 'AUTHORIZED_EMAILS=AUTHORIZED_EMAILS' --name ad_manager xtonyx/ad_manager:v1.0.5`

Reverse proxy configuration
- https://www.icescrum.com/documentation/reverse-proxy/

NPM scripts description:
- `npm run build:ui` builds static UI files *(into **./dist/** directory)*
- `npm run build:server` builds JS files for Node web server  *(into **./server/dist/** directory)* (that renders react application from **./dist/index.html** file)
- `npm run server` starts Node web server (that is built by `npm run build:server`)
- `npm run start:ui` starts webpack web server for UI development and troubleshooting only
- `npm run storybook` starts [storybook.js](https://storybook.js.org/) for better react component development experience
- `npm run docker:run_clean` cleans existing local docker image and container, builds local docker image, runs local docker container
