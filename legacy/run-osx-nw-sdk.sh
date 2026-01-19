#!/bin/bash

APP_PATH="$HOME/.local/bin/nwjs-sdk-v0.14.7-osx-x64/nwjs.app"
EXEC_NAME="nwjs"  # Find the actual executable name

# Launch the app
"$APP_PATH/Contents/MacOS/$EXEC_NAME" &

# Get the PID
APP_PID=$!

# Wait for app to exit
wait $APP_PID