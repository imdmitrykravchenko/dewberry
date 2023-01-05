#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
DOMAIN_NAME=$1
# Specify where we will install
SSL_DIR=$SCRIPT_DIR/certs

# Set our CSR variables
SUBJ="
C=US
ST=CityName
O=
localityName=$DOMAIN_NAME
commonName=$DOMAIN_NAME.local
organizationalUnitName=$DOMAIN_NAME
emailAddress=
"

DNS="DNS:$DOMAIN_NAME.local"

# Create our SSL directory
# in case it doesn't exist
mkdir -p "$SSL_DIR"
echo -n "$DNS" | tr "\n" ","

## Generate our Private Key, CSR and Certificate
#openssl req -x509 -nodes -days 365 -subj "$(echo -n "$SUBJ" | tr "\n" "/")" \
#  -newkey rsa:2048 -keyout "$SSL_DIR/ssl.key" -out "$SSL_DIR/ssl.crt"
# lake
openssl req -x509 -nodes -newkey rsa:2048 -keyout $SSL_DIR/ssl.key -out $SSL_DIR/ssl.crt -days 365 -subj "/C=US/ST=Oregon/L=Portland/O=Company Name/OU=Org/CN=$DOMAIN_NAME.local"