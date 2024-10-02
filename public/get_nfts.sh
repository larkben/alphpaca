#!/bin/bash

# Create the directory if it doesn't exist
mkdir -p nfts

# Base URL for the images
base_url="https://moqv5ehl7i6in6cy5pkivk4fnyh4mbc7u2q72xk6ivymmj3ptvgq.arweave.net/Y6FekOv6PIb4WOvUiquFbg_GBF-mof1dXkVwxidvnU0"

# Loop through the range of images
for i in {0..332}; do
    # Construct the full URL for the current image
    image_url="${base_url}/${i}.png"
    
    # Download the image and save it in the nfts directory
    wget -O "nfts/${i}.png" "$image_url"
done

echo "Download complete!"