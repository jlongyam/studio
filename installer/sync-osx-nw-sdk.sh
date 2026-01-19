#!/bin/bash

LOCAL_NW_SDK="$HOME/.local/bin/nwjs-sdk-v0.14.7-osx-x64/nwjs.app/Contents/Resources/app.nw/"
PROJECT="./temp/project/nw/"

rsync -avh --delete $PROJECT $LOCAL_NW_SDK