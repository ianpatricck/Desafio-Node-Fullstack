#!/bin/sh

sleep 5
npx prisma migrate dev

sleep 5
npx prisma db seed

exec "$@"
