1. Download Dependencies
```
npm install
```

2. Setup kredential postgres sesuai dengan .env
```
psql -c "CREATE ROLE admin WITH PASSWORD 'admin' CREATEDB CREATEROLE;"
psql -c "CREATE DATABASE sari_tebu;"
psql -c "GRANT ALL PRIVILEGES ON DATABASE sari_tebu TO admin;"
psql -U admin -d sari_tebu
\l (pastikan database 'sari_tebu' tertera pada tabel tsb)
```

3. Run migrations
```
npm run migrate up
```
