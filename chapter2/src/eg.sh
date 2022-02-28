#!/bin/bash


# Make sure only root can run our script
if(( $EUID != 0 )); then
   echo "This sript must be run as root"
   echo $EUID
   exit
fi


FILE="app.js"

if [ ! -e $FILE ]; then
   echo "app.js not  Exists"
   exit
fi

FILE="Dockerfile"
if [ ! -e $FILE ]; then
   echo "Dockerfile not Exists"
   exit
fi


docker build -t kubia .

echo "docker run"
docker run --name kubia-container -p 9090:9090 -d kubia

sleep 3s

curl localhost:9090
echo "Curl 9090"

docker stop kubia-container
echo "Stop kubia Container"



echo "docker remove container"
docker rm kubia-container
