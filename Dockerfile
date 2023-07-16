FROM docker.io/zenika/alpine-chrome:with-node

LABEL fly_launch_runtime="Node.js"

USER root
RUN npm i -g pnpm
USER chrome

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser
WORKDIR /usr/src/app
COPY --chown=chrome package.json pnpm-lock.yaml ./
RUN pnpm install
COPY --chown=chrome . ./
EXPOSE 3000
CMD ["node", "build"]