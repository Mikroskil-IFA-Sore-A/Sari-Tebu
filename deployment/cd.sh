#!/usr/bin/env bash

LOCK_FILE="/home/akunsialbert/Projects/Sari-Tebu/sari-tebu.lock"
cd /home/akunsialbert/Projects/Sari-Tebu
flock -n $LOCK_FILE ./deployment/deploy-if-changed.sh >> /home/akunsialbert/Projects/deployment.log 2>&1