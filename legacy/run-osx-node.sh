#!/bin/bash

LOCAL_NODE="$HOME/.local/bin/node-v5.12.0-darwin-x64/bin/node"

if [ -n "$1" ]; then
  $LOCAL_NODE $1
fi