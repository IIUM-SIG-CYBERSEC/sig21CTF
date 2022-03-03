#!/bin/bash

echo "VLRn8Hq97J4VzVZUZkM6" | su root -c cron
socat -v -v TCP-LISTEN:1337,nodelay,reuseaddr,fork EXEC:"stdbuf -i0 -o0 -e0 /home/linuxuser/lin001.sh"