#!/bin/bash
#requires the following:
#download and install macports - http://www.macports.org/install.php (.pkg installer)
#Install ImageMagick though macports - sudo port install ImageMagick

#original test script
#https://gist.github.com/1732594

GIF_FILE=$1
ROOT_EXPORT_NAME=$2

convert $GIF_FILE -coalesce $ROOT_EXPORT_NAME%04d.png