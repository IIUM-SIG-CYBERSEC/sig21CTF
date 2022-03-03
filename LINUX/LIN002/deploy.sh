#!/bin/bash

# docker kill $(docker ps -q) 2>/dev/null
image_name="lin0001"
docker build . -t $image_name
docker run -p 1337:1337 --expose=1337 -d $image_name

# container=`docker ps | grep $image_name | awk '{print$1}'| tail -n 1`
# echo $container
# docker exec -it $container /bin/bash