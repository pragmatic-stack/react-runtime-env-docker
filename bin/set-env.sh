#!/bin/bash

OUTPUT_FILE=./env.js

rm $OUTPUT_FILE
touch $OUTPUT_FILE

echo "window.__env__ = {" >> $OUTPUT_FILE

# loop over filtered env vars prefixed for app
printenv | grep '^REACT_APP' | while IFS= read -r line; do
  # get the name and value of REACT_APP prefixed variables
  value=${line#*=}
  name=${line%%=*}

  echo "$name: \"$value\"," >> $OUTPUT_FILE
done

echo "}" >> $OUTPUT_FILE

cat $OUTPUT_FILE