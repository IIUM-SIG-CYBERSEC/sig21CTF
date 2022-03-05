#!/bin/bash

image_name="lin0001"
old_image=`docker ps | grep $image_name | awk '{print$1}'`
docker kill $old_image
docker build . -t $image_name
docker run -p 1337:1337 --expose=1337 -d $image_name

