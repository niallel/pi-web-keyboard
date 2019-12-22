#!/bin/bash
cd /sys/kernel/config/usb_gadget/
mkdir -p pi-web-keyboard
cd pi-web-keyboard
echo 0x1d6b > idVendor # Linux Foundation
echo 0x0104 > idProduct # Multifunction Composite Gadget
echo 0x0100 > bcdDevice # v1.0.0
echo 0x0200 > bcdUSB # USB2
mkdir -p strings/0x409
echo "f0f0f0f0f0f0f0f0" > strings/0x409/serialnumber
echo "RaspberryPi" > strings/0x409/manufacturer
echo "Pi Web Keyboard" > strings/0x409/product
mkdir -p configs/c.1/strings/0x409
echo "Config 1: ECM network" > configs/c.1/strings/0x409/configuration
echo 250 > configs/c.1/MaxPower

# Add functions here

# Keyboard
mkdir -p functions/hid.usb0
echo 1 > functions/hid.usb0/protocol
echo 1 > functions/hid.usb0/subclass
echo 8 > functions/hid.usb0/report_length
echo -ne \\x05\\x01\\x09\\x06\\xA1\\x01\\x05\\x08\\x19\\x01\\x29\\x03\\x15\\x00\\x25\\x01\\x75\\x01\\x95\\x03\\x91\\x02\\x95\\x05\\x91\\x01\\x05\\x07\\x19\\xE0\\x29\\xE7\\x95\\x08\\x81\\x02\\x75\\x08\\x95\\x01\\x81\\x01\\x19\\x00\\x29\\x91\\x26\\xFF\\x00\\x95\\x06\\x81\\x00\\xC0 > functions/hid.usb0/report_desc
ln -s functions/hid.usb0 configs/c.1/

# Consumer Device
mkdir -p functions/hid.usb1
echo 1 > functions/hid.usb1/protocol
echo 1 > functions/hid.usb1/subclass
echo 8 > functions/hid.usb1/report_length
echo -ne \\x05\\x01\\x09\\x02\\xA1\\x01\\x85\\x03\\x05\\x09\\x19\\x01\\x29\\x05\\x15\\x00\\x25\\x01\\x95\\x05\\x75\\x01\\x81\\x02\\x95\\x01\\x75\\x03\\x81\\x03\\x05\\x01\\x09\\x01\\xA1\\x00\\x09\\x30\\x09\\x31\\x09\\x38\\x15\\x81\\x25\\x7F\\x75\\x08\\x95\\x03\\x81\\x06\\xC0\\x09\\x3C\\x15\\x00\\x25\\x01\\x75\\x01\\x95\\x01\\xB1\\x22\\x95\\x07\\xB1\\x01\\xC0\\x05\\x0C\\x09\\x01\\xA1\\x01\\x85\\x01\\x19\\x00\\x2A\\x3C\\x02\\x15\\x00\\x26\\x3C\\x02\\x95\\x01\\x75\\x10\\x81\\x00\\xC0\\x05\\x01\\x09\\x80\\xA1\\x01\\x85\\x02\\x19\\x81\\x29\\x83\\x25\\x01\\x75\\x01\\x95\\x03\\x81\\x02\\x95\\x05\\x81\\x01\\xC0\\x06\\xFF\\x00\\x09\\xC7\\xA1\\x01\\x85\\xBC\\x09\\xC4\\x15\\x00\\x26\\xFF\\x00\\x75\\x08\\x95\\x07\\xB1\\x02\\xC0 > functions/hid.usb1/report_desc
ln -s functions/hid.usb1 configs/c.1/

# End functions

ls /sys/class/udc > UDC
