#!/bin/bash
# create account for the teams
touch passwd_file
# root_passwd="Zz2@[z=GREfS{Wq-"
for (( i = 1; i < 13; i++ )); do
 #   sudo useradd -g ctf-users -s /bin/bash -m group-$i
 PASS=`cat /dev/urandom | tr -dc '[:alpha:]' | fold -w ${1:-20} | head -n 1`
 echo group-$i:$PASS >> passwd_file
 echo $PASS; sleep 2s
 echo group-$i:$PASS | chpasswd
 sudo chmod g-xrw /home/group-$i
done

