#!/bin/bash
# Script to generate PWA icons from SVG
# Requires: imagemagick or inkscape

ICON_SVG="icons/icon.svg"
ICON_DIR="icons"

# Check if we have the tools
if command -v convert &> /dev/null; then
    echo "Using ImageMagick to generate icons..."

    # Generate PNG icons at different sizes
    convert -background none "$ICON_SVG" -resize 72x72 "$ICON_DIR/icon-72x72.png"
    convert -background none "$ICON_SVG" -resize 96x96 "$ICON_DIR/icon-96x96.png"
    convert -background none "$ICON_SVG" -resize 128x128 "$ICON_DIR/icon-128x128.png"
    convert -background none "$ICON_SVG" -resize 144x144 "$ICON_DIR/icon-144x144.png"
    convert -background none "$ICON_SVG" -resize 152x152 "$ICON_DIR/icon-152x152.png"
    convert -background none "$ICON_SVG" -resize 192x192 "$ICON_DIR/icon-192x192.png"
    convert -background none "$ICON_SVG" -resize 384x384 "$ICON_DIR/icon-384x384.png"
    convert -background none "$ICON_SVG" -resize 512x512 "$ICON_DIR/icon-512x512.png"

    echo "Icons generated successfully!"

elif command -v inkscape &> /dev/null; then
    echo "Using Inkscape to generate icons..."

    inkscape "$ICON_SVG" --export-type="png" --export-filename="$ICON_DIR/icon-72x72.png" -w 72 -h 72
    inkscape "$ICON_SVG" --export-type="png" --export-filename="$ICON_DIR/icon-96x96.png" -w 96 -h 96
    inkscape "$ICON_SVG" --export-type="png" --export-filename="$ICON_DIR/icon-128x128.png" -w 128 -h 128
    inkscape "$ICON_SVG" --export-type="png" --export-filename="$ICON_DIR/icon-144x144.png" -w 144 -h 144
    inkscape "$ICON_SVG" --export-type="png" --export-filename="$ICON_DIR/icon-152x152.png" -w 152 -h 152
    inkscape "$ICON_SVG" --export-type="png" --export-filename="$ICON_DIR/icon-192x192.png" -w 192 -h 192
    inkscape "$ICON_SVG" --export-type="png" --export-filename="$ICON_DIR/icon-384x384.png" -w 384 -h 384
    inkscape "$ICON_SVG" --export-type="png" --export-filename="$ICON_DIR/icon-512x512.png" -w 512 -h 512

    echo "Icons generated successfully!"
else
    echo "ERROR: Neither ImageMagick nor Inkscape found!"
    echo "Please install one of them:"
    echo "  - ImageMagick: sudo pacman -S imagemagick"
    echo "  - Inkscape: sudo pacman -S inkscape"
    exit 1
fi
