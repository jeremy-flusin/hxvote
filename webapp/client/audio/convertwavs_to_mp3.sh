#!/bin/bash

for i in *.wav; do
 if [ -e "$i" ]; then
   file=`basename "$i" .wav`
   lame -h -b 256 "$i" "$file.mp3"
 fi
done
