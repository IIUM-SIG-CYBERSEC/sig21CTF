#!/bin/bash

# docker kill $(docker ps -q) 2>/dev/null
image_name="sig21ctf_nodeapp"
docker build . -t $image_name
docker run --net=host -d $image_name:latest
# container=`docker ps | grep $image_name | awk '{print$1}'| tail -n 1`
# echo $container
# docker exec -it $container /bin/bash
