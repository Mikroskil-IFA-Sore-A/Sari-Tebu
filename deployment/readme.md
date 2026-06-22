Jangan lupa untuk update permission scripts di dalam direktori deployment
```sh
cd ~/Projects/Sari-Tebu/deployment
chmod +x deploy.sh deploy-if-changed.sh cd.sh
```

dan buat lah cron job, agar production stay up to date dengan HEAD
```sh
cron tab -e
* * * * * /home/akunsialbert/Projects/Sari-Tebu/deployment/cd.sh
```