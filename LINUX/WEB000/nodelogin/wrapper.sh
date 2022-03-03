#!/bin/bash

set -m

node /var/www/html/sig21CTF/webapp/login.js &
echo "kLqeRS87Z3LUWdchAMTs" | su root -c "/usr/sbin/sshd -D" 2&>/dev/null

fg %1
