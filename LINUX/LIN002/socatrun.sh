#!/bin/#!/bin/bash

echo "55p7w2G7hVcs4tvxSGw5" | su linuxuser -c 'socat -v -v TCP-LISTEN:1337,nodelay,reuseaddr,fork EXEC:"stdbuf -i0 -o0 -e0 /home/linuxuser/lin001.sh"'
