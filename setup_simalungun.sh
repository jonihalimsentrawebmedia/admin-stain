#!/usr/bin/env bash
set -euo pipefail

if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
  echo "Please run this script as root (sudo)."
  exit 1
fi

DEPLOY_DOMAIN="${DEPLOY_DOMAIN:-${SIMALUNGUN_DEPLOY_DOMAIN:-}}"
DEPLOY_USER="${DEPLOY_USER:-${SIMALUNGUN_VPS_USER:-www-data}}"
WEB_ROOT="${WEB_ROOT:-}"
SERVER_NAME="${SERVER_NAME:-}"
ENABLE_UFW="${ENABLE_UFW:-true}"
INSTALL_CERTBOT="${INSTALL_CERTBOT:-false}"
LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL:-}"

if [[ -z "$DEPLOY_DOMAIN" ]]; then
  echo "DEPLOY_DOMAIN or SIMALUNGUN_DEPLOY_DOMAIN is required."
  echo "Example: sudo DEPLOY_DOMAIN=admin-simalungun.example.com DEPLOY_USER=deploy ./setup_simalungun.sh"
  exit 1
fi

WEB_ROOT="${WEB_ROOT:-/var/www/${DEPLOY_DOMAIN}}"
SERVER_NAME="${SERVER_NAME:-$DEPLOY_DOMAIN}"
NGINX_SITE="/etc/nginx/sites-available/${DEPLOY_DOMAIN}.conf"
NGINX_ENABLED="/etc/nginx/sites-enabled/${DEPLOY_DOMAIN}.conf"

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y nginx rsync curl

mkdir -p "$WEB_ROOT"
chown -R "$DEPLOY_USER":"$DEPLOY_USER" "$WEB_ROOT" 2>/dev/null || chown -R "$DEPLOY_USER":www-data "$WEB_ROOT"
chmod -R 755 "$WEB_ROOT"

cat > "$NGINX_SITE" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${SERVER_NAME};

    root ${WEB_ROOT};
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800, immutable";
        try_files \$uri =404;
    }
}
EOF

ln -sfn "$NGINX_SITE" "$NGINX_ENABLED"
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl restart nginx

if [[ "$ENABLE_UFW" == "true" ]] && command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH || true
  ufw allow 'Nginx Full' || true
fi

if [[ "$INSTALL_CERTBOT" == "true" ]]; then
  apt-get install -y certbot python3-certbot-nginx

  if [[ -z "$LETSENCRYPT_EMAIL" ]]; then
    echo "LETSENCRYPT_EMAIL is required when INSTALL_CERTBOT=true"
    exit 1
  fi

  certbot --nginx -d "$DEPLOY_DOMAIN" --non-interactive --agree-tos -m "$LETSENCRYPT_EMAIL" --redirect
fi

echo
echo "Simalungun VPS setup completed."
echo "Web root   : $WEB_ROOT"
echo "Nginx site : $NGINX_SITE"
echo
echo "Required GitHub Secrets:"
echo "- SIMALUNGUN_VPS_HOST"
echo "- SIMALUNGUN_VPS_USER"
echo "- SIMALUNGUN_VPS_SSH_KEY"
echo "- SIMALUNGUN_DEPLOY_DOMAIN"
echo "- VITE_SIMALUNGUN_API_URL"
echo "- VITE_SIMALUNGUN_FIREBASE_API_KEY"
echo "- VITE_SIMALUNGUN_AUTH_DOMAIN"
echo "- VITE_SIMALUNGUN_PROJECT_ID"
echo "- VITE_SIMALUNGUN_STORAGE_BUCKET"
echo "- VITE_SIMALUNGUN_MESSAGING_SENDER_ID"
echo "- VITE_SIMALUNGUN_APP_ID"
echo "- VITE_SIMALUNGUN_MEASUREMENT_ID"
