#!/bin/bash
set -e

# Update system
dnf update -y

# Install Node.js 20
dnf install -y nodejs ruby wget

# Install CodeDeploy agent (region-specific)
cd /tmp
wget https://aws-codedeploy-${region}.s3.${region}.amazonaws.com/latest/install
chmod +x install
./install auto
systemctl enable codedeploy-agent
systemctl start codedeploy-agent

# Prepare app directory
mkdir -p /opt/foodies
chown ec2-user:ec2-user /opt/foodies

# Install nginx for serving React build (optional - for production)
dnf install -y nginx
systemctl enable nginx