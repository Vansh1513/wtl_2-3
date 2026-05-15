//commands to deploy a static webiste
chmod 400 your-key.pem

ssh -i your-key.pem ubuntu@YOUR_PUBLIC_IP

sudo apt update
sudo apt upgrade -y

sudo apt install apache2 -y

sudo systemctl start apache2
sudo systemctl enable apache2

cd /var/www/html

sudo rm index.html

sudo nano index.html
sudo nano style.css
sudo nano script.js

sudo systemctl restart apache2
sudo systemctl status apache2


//dynamic
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

source ~/.bashrc

nvm install 20

git clone https://github.com/prathameshc123/blog-app.git

cd blog-app

cd server
npm install

cd ..
cd client
npm install
npm run build

cd ..
cd server/
nano .env

npm install -g pm2

pm2 start server.js --name "blog-api"

pm2 save

pm2 startup

sudo apt update
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default

sudo nginx -t

sudo systemctl restart nginx

sudo chmod -R 755 /home/ubuntu
sudo chmod -R 755 /home/ubuntu/blog-app
sudo chmod -R 755 /home/ubuntu/blog-app/client
sudo chmod -R 755 /home/ubuntu/blog-app/client/dist

sudo systemctl restart nginx

config->
server {
    listen 80;
    server_name 13.232.252.114;

    # Frontend (Static Files)
    location / {
        root /home/ubuntu/blog-app/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API (Proxy)
    location /api {
        proxy_pass http://localhost:5000;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
