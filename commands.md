# Commands

sudo su

## Keyboard

Clear Command 00 00 00 00 00 00 00 00
echo -ne \\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00 > /dev/hidg0

Menu Button 00 00 65 00 00 00 00 00
echo -ne \\x00\\x00\\x65\\x00\\x00\\x00\\x00\\x00 > /dev/hidg0

## Mouse
Clear Command 03 00 00 00 00
echo -ne \\x03\\x00\\x00\\x00\\x00 > /dev/hidg1

Left Button 03 01 00 00 00
echo -ne \\x03\\x01\\x00\\x00\\x00 > /dev/hidg1

Right Button 03 02 00 00 00
echo -ne \\x03\\x02\\x00\\x00\\x00 > /dev/hidg1

Mouse Move 03 00 [x -127 to 127] [y -127 to 127] [wheel -127 to 127]

## Consumer
Clear Command 01 00 00
echo -ne \\x01\\x00\\x00 > /dev/hidg1

Play 01 CD 00
echo -ne \\x01\\xcd\\x00 > /dev/hidg1

Stop 01 B7 00
echo -ne \\x01\\xb7\\x00 > /dev/hidg1

Rewind 01 B6 00
echo -ne \\x01\\xb6\\x00 > /dev/hidg1

Fast Forward 01 B5 00
echo -ne \\x01\\xb5\\x00 > /dev/hidg1

Home Button 01 23 02
echo -ne \\x01\\x23\\x02 > /dev/hidg1

Mute 01 E2 00
echo -ne \\x01\\xe2\\x00 > /dev/hidg1

Vol Up 01 E9 00
echo -ne \\x01\\xe9\\x00 > /dev/hidg1

Vol Down 01 EA 00
echo -ne \\x01\\xea\\x00 > /dev/hidg1

