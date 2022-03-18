#!/bin/bash

for (( i = 3001, j = 0; i< 3010; i++, j++ )); do
    curl localhost:$i >/dev/null 2>&1
    if [[ $? -ne 0 ]]; then
	echo -ne $i:
        docker run --net=host --expose=$i -d sig21ctf_nodeapp_$j:latest
    fi
done
for (( i = 1331; i < 1340; i++ )); do
    nc -z localhost $i
    if [[ $? -ne 0 ]]; then
        docker run -p $i:1337 --expose=$i -d lin001:latest
    fi
done

