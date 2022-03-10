#!/bin/bash

old_image=`docker ps | grep sig21ctf_nodeapp | awk '{print$1}'`

if [[ $1 == "kill" ]]; then
    docker kill $old_image 2>/dev/null
    exit
fi
docker kill $old_image 2>/dev/null

#image_name="sig21ctf_nodeapp_3000"
## docker build /home/abuyusif/sig21CTF/LINUX/nodelogin -t $image_name
#docker build /home/blackdracula/ctf/sig21CTF/LINUX/nodelogin -t $image_name
#docker run --net=host --expose=3000 -d $image_name:latest
for (( i = 0; i < 9; i++ )); do
    image_name="sig21ctf_nodeapp_$i"
    let new_port=$i+1
    let new_js_port=300$i+1
    let new_ssh_port=222$i+1
    sed -i "1i const port = $new_js_port" login.js # sometimes i'm smart
    sed -i "40i RUN sed -i 's/#Port 22/Port $new_ssh_port/g' /etc/ssh/sshd_config" Dockerfile
#   docker build /home/abuyusif/sig21CTF/LINUX/nodelogin -t "sig21ctf_nodeapp_$i"
    docker build /home/blackdracula/ctf/sig21CTF/LINUX/nodelogin -t "sig21ctf_nodeapp_$i" -q
    docker run --net=host --expose=300$new_port -d sig21ctf_nodeapp_$i:latest
    sed -i "1d" login.js
    sed -i "40d" Dockerfile
done

