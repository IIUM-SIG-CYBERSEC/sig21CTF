#!/bin/bash

port=$1
curl localhost:$port 2>/dev/null
if [[ $? -ne 0 ]]; then
    /bin/bash /home/blackdracula/ctf/sig21CTF/LINUX/nodelogin/deploy.sh $port 2&>/dev/null
    exit
fi
