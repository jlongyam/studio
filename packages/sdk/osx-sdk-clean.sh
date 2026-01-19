SDK_PATH="$HOME/.local/bin/nwjs-sdk-v0.107.0-osx-arm64/nwjs.app/Contents/Resources/app.nw/"
directory_exists() {
    local dir="$1"
    [[ -d "$dir" ]]
}
if
if [[ -d "$SDK_PATH" ]]; then
  echo "exists"
fi