#!/bin/bash

image_name="lin001"
old_image=`docker ps | grep $image_name | awk '{print$1}' 2>/dev/null`

if [[ $1 == "kill" ]]; then
    docker kill $old_image
    exit
fi

docker kill $old_image 2>/dev/null
docker build . -t $image_name

for (( i = 0; i < 1; i++ )); do
    docker run -p 133$i:1337 --expose=133$i -d $image_name
done

