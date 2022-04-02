# What is "react_ssr"

This package is created "from sratch" using [this article](https://dev.to/alekseiberezkin/setting-up-react-typescript-app-without-create-react-app-oph)

It supports react server side rendering was following these articles:
 - [initial rendering](https://www.digitalocean.com/community/tutorials/react-server-side-rendering)
 - [enabled styles for styled components](https://styled-components.com/docs/advanced#server-side-rendering)

It is containerized using Docker:
- `docker build . -t 'xtonyx/ad_manager'`
- `docker run -d -p 4000:3000 --name ad_manager xtonyx/ad_manager`

Reverse proxy configuration
 - https://www.icescrum.com/documentation/reverse-proxy/

NPM scripts description:
- `npm run build:ui` builds static UI files *(into **./dist/** directory)*
- `npm run build:server` builds JS files for Node web server  *(into **./server/dist/** directory)* (that renders react application from **./dist/index.html** file)
- `npm run server` starts Node web server (that is built by `npm run build:server`)
- `npm run start:ui` starts webpack web server for UI development and troubleshooting only
- `npm run storybook` starts [storybook.js](https://storybook.js.org/) for better react component development experience
- `npm run docker:run_clean` cleans existing local docker image and container, builds local docker image, runs local docker container
