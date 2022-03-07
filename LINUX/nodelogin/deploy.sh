#!/bin/bash

image_name="sig21ctf_nodeapp"
old_image=`docker ps | grep $image_name | awk '{print$1}'`
docker kill $old_image
# docker build /home/blackdracula/ctf/sig21CTF/LINUX/nodelogin -t $image_name
docker build /home/abuyusif/sig21CTF/LINUX/nodelogin -t $image_name
docker run --net=host -d $image_name:latest
