#!/bin/sh

ENV_FILE=/usr/share/nginx/html/env.js

rm $ENV_FILE
touch $ENV_FILE

echo "window.__env__ = {" >> $ENV_FILE

# loop over filtered appConfig vars prefixed for app
printenv | grep '^REACT_APP' | while IFS= read -r line; do
  # get the name and value of REACT_APP prefixed variables
  value=${line#*=}
  name=${line%%=*}

  echo "$name: \"$value\"," >> $ENV_FILE
done

echo "}" >> $ENV_FILE