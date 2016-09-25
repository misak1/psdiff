```
npm install -g node-dev
npm install express-generator -g
express myapp
cd myapp && npm install
DEBUG=myapp:* node-dev ./bin/www
```

multer（ファイルの受け付け）

http://localhost:3000/fileupload