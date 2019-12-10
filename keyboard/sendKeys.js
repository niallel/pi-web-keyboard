const fs = require('fs');

const keyTable = require('./keyTable');

function sendKeys(keys) {

    const result = parseCommand(keys);

    const buf = Buffer.from(result.command, 'hex');
    
    try {
        fs.statSync('/dev/hidg0');
        fs.writeFileSync('/dev/hidg0', buf, {flag: 'r+'});

        // write the release keys command
        if(!result.hold) {
            fs.writeFileSync('/dev/hidg0',Buffer.from('0000000000000000', 'hex'), {flag: 'r+'});
        }
    } catch (error) {
        return({
            status: false,
            message: error.message,
            error: error
        });
    }
    
    return(result);
}

module.exports = sendKeys;

function parseCommand(keys) {
    
    if(!Array.isArray(keys)) {
        return false;
    }

    let modifierKeys = 0x0;
    const standardKeys = ['00','00','00','00','00','00'];
    let keyIndex = 0;
    const keysMatched = [];
    const keysNotMatched = [];
    let holdKey = false;

    for(let i=0; i < keys.length; i++) {

        const key = (keys[i].length > 1 ? keys[i].toUpperCase() : keys[i]);
        
        if(key === 'HOLD') { // don't release the keyboard after pressing
            holdKey = true;
            keysMatched.push(key)
            continue;
        }

        if (keyTable[key]) {
            keysMatched.push(key)
         
            if(keyTable[key].type === 'standard') {
                standardKeys[keyIndex++] = keyTable[key].value;
                if(keyTable[key].shift) {
                    modifierKeys = modifierKeys | keyTable.SHIFT.value;
                }
            } else if(keyTable[key].type === 'control') {
                modifierKeys = modifierKeys | keyTable[key].value;
            }

        } else {
            keysNotMatched.push(key);
        }

    }

    // Put the modified keys in two digit hex string
    const modifierKeysText = (modifierKeys < 0x10 ? '0' + modifierKeys.toString(16).toUpperCase() : modifierKeys.toString(16));

    return({
        command:`${modifierKeysText}00${standardKeys[0]}${standardKeys[1]}${standardKeys[2]}${standardKeys[3]}${standardKeys[4]}${standardKeys[5]}`,
        keysMatched: keysMatched,
        keysNotMatched: keysNotMatched,
        hold: holdKey
    });
}


