#!/usr/bin/env bash
set -euo pipefail

# =========================
# STIKES Sehati VPS setup
# =========================
# Jalankan:
#   chmod +x setup.sh
#   sudo ./setup.sh
#
# Optional override:
#   sudo DEPLOY_USER=syamil LETSENCRYPT_EMAIL=mail@domain.com ./setup.sh

DEPLOY_USER="${DEPLOY_USER:-${SUDO_USER:-$USER}}"
DEPLOY_HOME="$(eval echo "~$DEPLOY_USER")"

ADMIN_DOMAIN="${ADMIN_DOMAIN:-admin-website.stikessehati.ac.id}"
PERPUS_DOMAIN="${PERPUS_DOMAIN:-perpustakaan.stikessehati.ac.id}"
MAIN_DOMAIN="${MAIN_DOMAIN:-stikessehati.ac.id}"

ADMIN_WEB_ROOT="${ADMIN_WEB_ROOT:-/var/www/$ADMIN_DOMAIN}"
PERPUS_APP_DIR="${PERPUS_APP_DIR:-$DEPLOY_HOME/apps/$PERPUS_DOMAIN}"
MAIN_APP_DIR="${MAIN_APP_DIR:-$DEPLOY_HOME/apps/$MAIN_DOMAIN}"

PERPUS_PM2_NAME="${PERPUS_PM2_NAME:-perpustakaan-stikessehati}"
MAIN_PM2_NAME="${MAIN_PM2_NAME:-stikessehati-main}"

PERPUS_PORT="${PERPUS_PORT:-3101}"
MAIN_PORT="${MAIN_PORT:-3100}"

LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL:-}"
ENABLE_SSL="${ENABLE_SSL:-yes}"

if [ "$EUID" -ne 0 ]; then
  echo "Jalankan script ini pakai sudo/root"
  exit 1
fi

if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  echo "User $DEPLOY_USER tidak ditemukan"
  exit 1
fi

apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y \
  nginx \
  curl \
  git \
  rsync \
  unzip \
  build-essential \
  ca-certificates \
  gnupg \
  ufw

mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
  | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
chmod 644 /etc/apt/keyrings/nodesource.gpg

echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" \
  > /etc/apt/sources.list.d/nodesource.list

apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs
npm install -g pm2 pnpm yarn

NODE_BIN_DIR="$(dirname "$(command -v node)")"
PM2_BIN="$(command -v pm2)"

mkdir -p "$ADMIN_WEB_ROOT" "$PERPUS_APP_DIR/current" "$MAIN_APP_DIR/current"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$ADMIN_WEB_ROOT" "$PERPUS_APP_DIR" "$MAIN_APP_DIR"

cat > "$ADMIN_WEB_ROOT/index.html" <<HTML
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>$ADMIN_DOMAIN</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0; display:flex; min-height:100vh; align-items:center; justify-content:center; margin:0; }
    .box { max-width: 700px; padding: 24px; border: 1px solid #334155; border-radius: 12px; background:#111827; }
    code { background:#1e293b; padding:2px 6px; border-radius:6px; }
  </style>
</head>
<body>
  <div class="box">
    <h1>$ADMIN_DOMAIN siap</h1>
    <p>Server sudah siap. Tunggu GitHub Actions deploy pertama ke <code>$ADMIN_WEB_ROOT</code>.</p>
  </div>
</body>
</html>
HTML

cat > /etc/systemd/system/pm2-$DEPLOY_USER.service <<SERVICE
[Unit]
Description=PM2 process manager for $DEPLOY_USER
Documentation=https://pm2.keymetrics.io/
After=network.target

[Service]
Type=forking
User=$DEPLOY_USER
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
Environment=PATH=$NODE_BIN_DIR:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
Environment=PM2_HOME=$DEPLOY_HOME/.pm2
PIDFile=$DEPLOY_HOME/.pm2/pm2.pid
Restart=on-failure
ExecStart=$PM2_BIN resurrect
ExecReload=$PM2_BIN reload all
ExecStop=$PM2_BIN kill

[Install]
WantedBy=multi-user.target
SERVICE

cat > /etc/nginx/sites-available/$ADMIN_DOMAIN.conf <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $ADMIN_DOMAIN;

    root $ADMIN_WEB_ROOT;
    index index.html;

    access_log /var/log/nginx/$ADMIN_DOMAIN.access.log;
    error_log /var/log/nginx/$ADMIN_DOMAIN.error.log;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
NGINX

cat > /etc/nginx/sites-available/$PERPUS_DOMAIN.conf <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $PERPUS_DOMAIN;

    access_log /var/log/nginx/$PERPUS_DOMAIN.access.log;
    error_log /var/log/nginx/$PERPUS_DOMAIN.error.log;

    location / {
        proxy_pass http://127.0.0.1:$PERPUS_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

cat > /etc/nginx/sites-available/$MAIN_DOMAIN.conf <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $MAIN_DOMAIN;

    access_log /var/log/nginx/$MAIN_DOMAIN.access.log;
    error_log /var/log/nginx/$MAIN_DOMAIN.error.log;

    location / {
        proxy_pass http://127.0.0.1:$MAIN_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/$ADMIN_DOMAIN.conf /etc/nginx/sites-enabled/$ADMIN_DOMAIN.conf
ln -sf /etc/nginx/sites-available/$PERPUS_DOMAIN.conf /etc/nginx/sites-enabled/$PERPUS_DOMAIN.conf
ln -sf /etc/nginx/sites-available/$MAIN_DOMAIN.conf /etc/nginx/sites-enabled/$MAIN_DOMAIN.conf

nginx -t
systemctl daemon-reload
systemctl enable nginx
systemctl restart nginx
systemctl enable pm2-$DEPLOY_USER
systemctl restart pm2-$DEPLOY_USER || true

if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH || true
  ufw allow 'Nginx Full' || true
fi

if [ "$ENABLE_SSL" = "yes" ]; then
  DEBIAN_FRONTEND=noninteractive apt-get install -y certbot python3-certbot-nginx

  if [ -z "$LETSENCRYPT_EMAIL" ]; then
    echo "WARNING: LETSENCRYPT_EMAIL belum diisi, SSL belum dibuat."
    echo "Jalankan ulang dengan: sudo LETSENCRYPT_EMAIL=mail@domain.com ./setup.sh"
  else
    certbot --nginx --non-interactive --agree-tos --redirect -m "$LETSENCRYPT_EMAIL" \
      -d "$ADMIN_DOMAIN" \
      -d "$PERPUS_DOMAIN" \
      -d "$MAIN_DOMAIN"
  fi
fi

sudo -u "$DEPLOY_USER" bash -lc '
  set -euo pipefail
  pm2 save || true
'

cat <<INFO

Setup selesai.

Domain:
- $ADMIN_DOMAIN   -> static dir: $ADMIN_WEB_ROOT
- $PERPUS_DOMAIN  -> pm2: $PERPUS_PM2_NAME, app: $PERPUS_APP_DIR/current, port: $PERPUS_PORT
- $MAIN_DOMAIN    -> pm2: $MAIN_PM2_NAME, app: $MAIN_APP_DIR/current, port: $MAIN_PORT

Set GitHub Secrets per repo:

[admin-website.stikessehati.ac.id]
- STIKESSEHATI_VPS_HOST=<ip/domain vps>
- STIKESSEHATI_VPS_USER=$DEPLOY_USER
- STIKESSEHATI_VPS_SSH_KEY=<private key>
- STIKESSEHATI_DEPLOY_DOMAIN=$ADMIN_DOMAIN
- STIKESSEHATI_VITE_API_URL=<api url>
- VITE_FIREBASE_API_KEY=<value>
- VITE_AUTH_DOMAIN=<value>
- VITE_PROJECT_ID=<value>
- VITE_STORAGE_BUCKET=<value>
- VITE_MESSAGING_SENDER_ID=<value>
- VITE_APP_ID=<value>
- VITE_MEASUREMENT_ID=<value>

[perpustakaan.stikessehati.ac.id]
- STIKESSEHATI_VPS_HOST=<ip/domain vps>
- STIKESSEHATI_VPS_USER=$DEPLOY_USER
- STIKESSEHATI_VPS_SSH_KEY=<private key>
- STIKESSEHATI_NEXT_PUBLIC_API_URL=<api public>
- STIKESSEHATI_API_URL=<api internal>

[stikessehati.ac.id]
- STIKESSEHATI_VPS_HOST=<ip/domain vps>
- STIKESSEHATI_VPS_USER=$DEPLOY_USER
- STIKESSEHATI_VPS_SSH_KEY=<private key>
- STIKESSEHATI_NEXT_PUBLIC_API_URL=<api public>
- STIKESSEHATI_API_URL=<api internal>

Catatan penting:
1. DNS ketiga domain harus sudah mengarah ke VPS ini.
2. Public key dari pasangan STIKESSEHATI_VPS_SSH_KEY harus masuk ke: $DEPLOY_HOME/.ssh/authorized_keys
3. Untuk SSL aktif, jalankan script dengan email valid:
   sudo LETSENCRYPT_EMAIL=mail@domain.com ./setup.sh
4. Setelah secrets diisi, jalankan GitHub Actions deploy masing-masing repo.

INFO
