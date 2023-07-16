# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.16.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

ARG PNPM_VERSION=8.6.2
RUN npm install -g pnpm@$PNPM_VERSION


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential 

# Install node modules
COPY --link .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copy application code
COPY --link . .

# Build application
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod


# Final stage for app image
FROM base

# Install chrome stable from sources, then remove it. Why? The
# npm install of `puppeteer` brings its own bundle chromium build,
# and puppeteer releases are only guaranteed to work with that version.
#
# But the bundled chromium implicitly needs a bunch of shared libs on
# the host. It's a little tedious to find and maintain that list; but
# the official apt distro of `google-chrome-stable` should bring the right
# set along. So do that, but immediately uninstall (to free up layer space).
#
# This is a little brittle, since the puppeteer chrome could in theory diverge
# from the official apt chrome's shared lib deps. But it works..
RUN apt-get update \
  && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && apt-get remove google-chrome-stable -y \
  && rm -rf /var/lib/apt/lists/*

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "build" ]
