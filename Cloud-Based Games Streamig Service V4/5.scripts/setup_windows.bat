@echo off
echo Configuring Moonlight for our server...
echo Server IP: 192.168.1.100
echo Port: 47984
echo.
echo Creating configuration file...
echo {"server_ip": "192.168.32.225", "server_port": 47990} > "%APPDATA%\Moonlight\config.json"
echo Configuration completed! You can now open Moonlight and connect to the server.
pause