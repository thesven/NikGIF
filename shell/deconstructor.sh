#!/bin/bash

DIR_NAME=$1
RAW_FILE_LOC=$2

mkdir finished-packages/$DIR_NAME
convert $RAW_FILE_LOC -coalesce finished-packages/$DIR_NAME/frame\_%04d.png
cd finished-packages
tar -czf $DIR_NAME.tar.gz $DIR_NAME
rm -rf $DIR_NAME
rm -rf $RAW_FILE_LOC
echo finished-packages/$DIR_NAME.tar.gz