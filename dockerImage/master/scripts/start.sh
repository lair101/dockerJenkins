#!/usr/bin/env bash

mkdir -p ~/jenkins-data

chmod -R 755 ~/jenkins-data

cd ..

docker build -f Dockerfile -t jenkins:v1 .

docker run -d --name jenkins-master \
           --restart always \
           -p 80:8080 -p 50000:50000 \
           -v ~/jenkins-data:/var/jenkins_home \
           jenkins:v1
