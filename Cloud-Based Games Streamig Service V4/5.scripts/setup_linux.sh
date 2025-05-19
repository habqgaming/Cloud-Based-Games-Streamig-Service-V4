#!/bin/bash
echo "Configuring Moonlight for our server..."
echo "Server IP: 192.168.32.225"
echo "Port: 47990"

# Create the configuration directory if it doesn't exist
mkdir -p ~/.moonlight

# Create or overwrite the configuration file
echo '{"server_ip": "192.168.32.225", "server_port": 47990}' > ~/.moonlight/config.json

echo "Configuration completed! You can now open Moonlight and connect to the server."
