#! /bin/sh
yum update -y

amazon-linux-extras install docker -y

service docker start

usermod -a -G docker ec2-user

chkconfig docker on

# Pull the url_shortner Docker image
docker pull adeshkedlaya2003/url:v12

# Map the port to 80->8000 and Run the Immage 
docker run -d -p 80:8000 --name url-container adeshkedlaya2003/url:v12
