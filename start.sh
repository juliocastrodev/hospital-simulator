#!/bin/sh

cd hospital-lib
yarn
yarn build:prod

cd ../hospital-be
yarn
yarn start &
SERVER=$!

cd ../hospital-fe
yarn
yarn start &
FRONT=$!

wait $SERVER $FRONT


