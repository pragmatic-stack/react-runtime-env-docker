#!/bin/sh

# Define the output of the javascript env file
ENV_JS_FILE=/usr/share/nginx/html/env.js

# Cleanup existing files and create a empty one
if [ -f $ENV_JS_FILE ]; then
  rm $ENV_JS_FILE
fi

touch $ENV_JS_FILE

# Define the whitelist of strings, separated by whitespace
whitelist="REACT_APP BROWSER VITE"

# Get the environment variables of the container
env_vars=$(printenv)

# Initialize the __env__ object
echo "window.__env__ = {" > $ENV_JS_FILE

# Loop through the whitelist
for item in $whitelist; do
    # Extract all environment variables that match the string from the whitelist
    echo "$env_vars" | grep "^$item" > /tmp/env_var.txt

    while read -r line; do

        # Split the environment variable into a key-value pair
        key=${line%=*}
        value=${line#*=}

        # Add the key-value pair to the __env__ object
        echo "  $key: '$value'," >> $ENV_JS_FILE
    done < /tmp/env_var.txt

    rm -f /tmp/env_var.txt
done

# Close the __env__ object
echo "};" >> $ENV_JS_FILE