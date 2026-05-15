//commands to deploy a static webiste
# Connect to EC2
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@YOUR_PUBLIC_IP

# Update Ubuntu
sudo apt update
sudo apt upgrade -y

# Install Apache
sudo apt install apache2 -y

# Start and Enable Apache
sudo systemctl start apache2
sudo systemctl enable apache2

# Go to Apache Website Directory
cd /var/www/html

# Remove Default Apache Page
sudo rm index.html

# Create Website Files
sudo nano index.html
sudo nano style.css
sudo nano script.js

# Restart Apache
sudo systemctl restart apache2

# Check Apache Status
sudo systemctl status apache2
