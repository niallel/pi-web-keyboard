const fs = require('fs');

function sendKeys(keys) {

    const result = parseCommand(keys);

    const buf = Buffer.from(result.command, 'hex');
    // fs.writeFileSync('/dev/hidg0', buf, {flag: 'r+'});

    // write the release keys command
    // fs.writeFileSync('/dev/hidg0',Buffer.from('0000000000000000', 'hex'), {flag: 'r+'});
    
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

    for(let i=0; i < keys.length; i++) {

        const key = (keys[i].length > 1 ? keys[i].toUpperCase() : keys[i]);

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
        keysNotMatched: keysNotMatched
    });
}

const keyTable = {
    'a':  {value: '04', type: 'standard', shift: false},
    'b':  {value: '05', type: 'standard', shift: false},
    'c':  {value: '06', type: 'standard', shift: false},
    'd':  {value: '07', type: 'standard', shift: false},
    'e':  {value: '08', type: 'standard', shift: false},
    'f':  {value: '09', type: 'standard', shift: false},
    'g':  {value: '0A', type: 'standard', shift: false},
    'h':  {value: '0B', type: 'standard', shift: false},
    'i':  {value: '0C', type: 'standard', shift: false},
    'j':  {value: '0D', type: 'standard', shift: false},
    'k':  {value: '0E', type: 'standard', shift: false},
    'l':  {value: '0F', type: 'standard', shift: false},
    'm':  {value: '10', type: 'standard', shift: false},
    'n':  {value: '11', type: 'standard', shift: false},
    'o':  {value: '12', type: 'standard', shift: false},
    'p':  {value: '13', type: 'standard', shift: false},
    'q':  {value: '14', type: 'standard', shift: false},
    'r':  {value: '15', type: 'standard', shift: false},
    's':  {value: '16', type: 'standard', shift: false},
    't':  {value: '17', type: 'standard', shift: false},
    'u':  {value: '18', type: 'standard', shift: false},
    'v':  {value: '19', type: 'standard', shift: false},
    'w':  {value: '1A', type: 'standard', shift: false},
    'x':  {value: '1B', type: 'standard', shift: false},
    'y':  {value: '1C', type: 'standard', shift: false},
    'z':  {value: '1D', type: 'standard', shift: false},
    '1':  {value: '1E', type: 'standard', shift: false},
    '2':  {value: '1F', type: 'standard', shift: false},
    '3':  {value: '20', type: 'standard', shift: false},
    '4':  {value: '21', type: 'standard', shift: false},
    '5':  {value: '22', type: 'standard', shift: false},
    '6':  {value: '23', type: 'standard', shift: false},
    '7':  {value: '24', type: 'standard', shift: false},
    '8':  {value: '25', type: 'standard', shift: false},
    '9':  {value: '26', type: 'standard', shift: false},
    '0':  {value: '27', type: 'standard', shift: false},
    'A':  {value: '04', type: 'standard', shift: true},
    'B':  {value: '05', type: 'standard', shift: true},
    'C':  {value: '06', type: 'standard', shift: true},
    'D':  {value: '07', type: 'standard', shift: true},
    'E':  {value: '08', type: 'standard', shift: true},
    'F':  {value: '09', type: 'standard', shift: true},
    'G':  {value: '0A', type: 'standard', shift: true},
    'H':  {value: '0B', type: 'standard', shift: true},
    'I':  {value: '0C', type: 'standard', shift: true},
    'J':  {value: '0D', type: 'standard', shift: true},
    'K':  {value: '0E', type: 'standard', shift: true},
    'L':  {value: '0F', type: 'standard', shift: true},
    'M':  {value: '10', type: 'standard', shift: true},
    'N':  {value: '11', type: 'standard', shift: true},
    'O':  {value: '12', type: 'standard', shift: true},
    'P':  {value: '13', type: 'standard', shift: true},
    'Q':  {value: '14', type: 'standard', shift: true},
    'R':  {value: '15', type: 'standard', shift: true},
    'S':  {value: '16', type: 'standard', shift: true},
    'T':  {value: '17', type: 'standard', shift: true},
    'U':  {value: '18', type: 'standard', shift: true},
    'V':  {value: '19', type: 'standard', shift: true},
    'W':  {value: '1A', type: 'standard', shift: true},
    'X':  {value: '1B', type: 'standard', shift: true},
    'Y':  {value: '1C', type: 'standard', shift: true},
    'Z':  {value: '1D', type: 'standard', shift: true},

    '1':  {value: '1E', type: 'standard', shift: false},
    '2':  {value: '1F', type: 'standard', shift: false},
    '3':  {value: '20', type: 'standard', shift: false},
    '4':  {value: '21', type: 'standard', shift: false},
    '5':  {value: '22', type: 'standard', shift: false},
    '6':  {value: '23', type: 'standard', shift: false},
    '7':  {value: '24', type: 'standard', shift: false},
    '8':  {value: '25', type: 'standard', shift: false},
    '9':  {value: '26', type: 'standard', shift: false},
    '0':  {value: '27', type: 'standard', shift: false},
    '!':  {value: '1E', type: 'standard', shift: true},
    '@':  {value: '1F', type: 'standard', shift: true},
    '#':  {value: '20', type: 'standard', shift: true},
    '$':  {value: '21', type: 'standard', shift: true},
    '%':  {value: '22', type: 'standard', shift: true},
    '^':  {value: '23', type: 'standard', shift: true},
    '&':  {value: '24', type: 'standard', shift: true},
    '*':  {value: '25', type: 'standard', shift: true},
    '(':  {value: '26', type: 'standard', shift: true},
    ')':  {value: '27', type: 'standard', shift: true},

    'ENTER':  {value: '28', type: 'standard', shift: false},
    'RETURN':  {value: '28', type: 'standard', shift: false},
    'ESCAPE':  {value: '29', type: 'standard', shift: false},
    'DELETE':  {value: '2A', type: 'standard', shift: false},
    'DEL':  {value: '2A', type: 'standard', shift: false},
    'BACKSPACE':  {value: '2A', type: 'standard', shift: false},
    'TAB':  {value: '2B', type: 'standard', shift: false},
    ' ':  {value: '2C', type: 'standard', shift: false},
    'SPACE':  {value: '2C', type: 'standard', shift: false},
    'SPACEBAR':  {value: '2C', type: 'standard', shift: false},
    '-':  {value: '2D', type: 'standard', shift: false},
    '_':  {value: '2D', type: 'standard', shift: true},
    '=':  {value: '2E', type: 'standard', shift: false},
    '+':  {value: '2E', type: 'standard', shift: true},
    '[':  {value: '2F', type: 'standard', shift: false},
    '{':  {value: '2F', type: 'standard', shift: true},
    ']':  {value: '30', type: 'standard', shift: false},
    '}':  {value: '30', type: 'standard', shift: true},
    '\\':  {value: '31', type: 'standard', shift: false},
    '|':  {value: '31', type: 'standard', shift: true},
    ';':  {value: '33', type: 'standard', shift: false},
    ':':  {value: '33', type: 'standard', shift: true},
    '\'':  {value: '34', type: 'standard', shift: false},
    '"':  {value: '34', type: 'standard', shift: true},
    '`':  {value: '35', type: 'standard', shift: false},
    '~':  {value: '35', type: 'standard', shift: true},
    ',':  {value: '36', type: 'standard', shift: false},
    '<':  {value: '36', type: 'standard', shift: true},
    '.':  {value: '37', type: 'standard', shift: false},
    '>':  {value: '37', type: 'standard', shift: true},
    '/':  {value: '38', type: 'standard', shift: false},
    '?':  {value: '38', type: 'standard', shift: true},
    'CAPSLOCK':  {value: '39', type: 'standard', shift: false},
    'CAPS':  {value: '39', type: 'standard', shift: false},
    'F1':  {value: '3A', type: 'standard', shift: false},
    'F2':  {value: '3B', type: 'standard', shift: false},
    'F3':  {value: '3C', type: 'standard', shift: false},
    'F4':  {value: '3D', type: 'standard', shift: false},
    'F5':  {value: '3E', type: 'standard', shift: false},
    'F6':  {value: '3F', type: 'standard', shift: false},
    'F7':  {value: '40', type: 'standard', shift: false},
    'F8':  {value: '41', type: 'standard', shift: false},
    'F9':  {value: '42', type: 'standard', shift: false},
    'F10':  {value: '43', type: 'standard', shift: false},
    'F11':  {value: '44', type: 'standard', shift: false},
    'F12':  {value: '45', type: 'standard', shift: false},
    'PRINT':  {value: '46', type: 'standard', shift: false},
    'PRINTSCREEN':  {value: '46', type: 'standard', shift: false},
    'SCROLL':  {value: '47', type: 'standard', shift: false},
    'SCROLLLOCK':  {value: '47', type: 'standard', shift: false},
    'PAUSE':  {value: '48', type: 'standard', shift: false},
    'INSERT':  {value: '49', type: 'standard', shift: false},
    'HOME':  {value: '4A', type: 'standard', shift: false},
    'PAGEUP':  {value: '4B', type: 'standard', shift: false},
    'DELETEFORWARD':  {value: '4C', type: 'standard', shift: false},
    'END':  {value: '4D', type: 'standard', shift: false},
    'PAGEDOWN':  {value: '4E', type: 'standard', shift: false},
    'RIGHT':  {value: '4F', type: 'standard', shift: false},
    'RIGHTARROW':  {value: '4F', type: 'standard', shift: false},
    'LEFT':  {value: '50', type: 'standard', shift: false},
    'LEFTARROW':  {value: '50', type: 'standard', shift: false},
    'DOWN':  {value: '51', type: 'standard', shift: false},
    'DOWNARROW':  {value: '51', type: 'standard', shift: false},
    'UP':  {value: '52', type: 'standard', shift: false},
    'UPARROW':  {value: '52', type: 'standard', shift: false},
    // 'NUMLOCK':  {value: '53', type: 'standard', shift: false},
    // 'CLEAR':  {value: '53', type: 'standard', shift: true},

    'APPLICATION':  {value: '65', type: 'standard', shift: false},
    'POWER':  {value: '66', type: 'standard', shift: false},

    'F13':  {value: '68', type: 'standard', shift: false},
    'F14':  {value: '69', type: 'standard', shift: false},
    'F15':  {value: '6A', type: 'standard', shift: false},
    'F16':  {value: '6B', type: 'standard', shift: false},
    'F17':  {value: '6C', type: 'standard', shift: false},
    'F18':  {value: '6D', type: 'standard', shift: false},
    'F19':  {value: '6E', type: 'standard', shift: false},
    'F20':  {value: '6F', type: 'standard', shift: false},
    'F21':  {value: '70', type: 'standard', shift: false},
    'F22':  {value: '71', type: 'standard', shift: false},
    'F23':  {value: '72', type: 'standard', shift: false},
    'F24':  {value: '73', type: 'standard', shift: false},
    'EXECUTE':  {value: '74', type: 'standard', shift: false},
    'HELP':  {value: '75', type: 'standard', shift: false},
    'MENU':  {value: '76', type: 'standard', shift: false},
    'SELECT':  {value: '77', type: 'standard', shift: false},
    'STOP':  {value: '78', type: 'standard', shift: false},
    'AGAIN':  {value: '79', type: 'standard', shift: false},
    'UNDO':  {value: '7A', type: 'standard', shift: false},
    'CUT':  {value: '7B', type: 'standard', shift: false},
    'COPY':  {value: '7C', type: 'standard', shift: false},
    'PASTE':  {value: '7D', type: 'standard', shift: false},
    'FIND':  {value: '7E', type: 'standard', shift: false},
    'MUTE':  {value: '7F', type: 'standard', shift: false},
    'VOLUMEUP':  {value: '80', type: 'standard', shift: false},
    'VOLUMEDOWN':  {value: '81', type: 'standard', shift: false},

    'ALTERASE':  {value: '99', type: 'standard', shift: false},
    'SYSREQ':  {value: '9A', type: 'standard', shift: false},
    'CANCEL':  {value: '9B', type: 'standard', shift: false},
    'CLEAR':  {value: '9C', type: 'standard', shift: false},
    'PRIOR':  {value: '9D', type: 'standard', shift: false},
    // 'RETURN':  {value: '9E', type: 'standard', shift: false},
    'SEPARATOR':  {value: '9F', type: 'standard', shift: false},
    'OUT':  {value: 'A0', type: 'standard', shift: false},
    'OPER':  {value: 'A1', type: 'standard', shift: false},
    'CLEARAGAIN':  {value: 'A2', type: 'standard', shift: false},
    'CRSEL':  {value: 'A3', type: 'standard', shift: false},
    'EXSEL':  {value: 'A4', type: 'standard', shift: false},

    'CONTROL':  {value: 0x01, type: 'control', shift: false},
    'SHIFT':  {value: 0x02, type: 'control', shift: false},
    'ALT':  {value: 0x04, type: 'control', shift: false},
    'GUI':  {value: 0x08, type: 'control', shift: false},

    'RIGHTCONTROL':  {value: 0x10, type: 'control', shift: false},
    'RIGHTSHIFT':  {value: 0x20, type: 'control', shift: false},
    'RIGHTALT':  {value: 0x40, type: 'control', shift: false},
    'RIGHTGUI':  {value: 0x80, type: 'control', shift: false},

    'LEFTCONTROL':  {value: 0x01, type: 'control', shift: false},
    'LEFTSHIFT':  {value: 0x02, type: 'control', shift: false},
    'LEFTALT':  {value: 0x04, type: 'control', shift: false},
    'LEFTGUI':  {value: 0x08, type: 'control', shift: false}

};
