LABEL fly_launch_runtime="Node.js"

FROM zenika/alpine-chrome:with-node
RUN npm i -g pnpm

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser
WORKDIR /usr/src/app
COPY --chown=chrome package.json pnpm-lock.json ./
RUN pnpm install
COPY --chown=chrome . ./
ENTRYPOINT ["tini", "--"]
CMD ["node", "build"]