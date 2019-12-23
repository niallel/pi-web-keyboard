const fs = require('fs');

function sendConsumer(keys) {

    const result = parseCommand(keys);

    const buf = Buffer.from(result.command, 'hex');
    
    try {
        fs.statSync('/dev/hidg1');
        fs.writeFileSync('/dev/hidg1', buf, {flag: 'r+'});

        // write the release keys command
        if(!result.hold) {
            fs.writeFileSync('/dev/hidg1',Buffer.from('010000', 'hex'), {flag: 'r+'});
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

module.exports = sendConsumer;

function parseCommand(keys) {
    
    if(!Array.isArray(keys) || keys.length > 2) {
        return false;
    }

    let command = '0000';
    const keysMatched = [];
    const keysNotMatched = [];
    let holdKey = false;

    for(let i=0; i < keys.length; i++) {

        switch(keys[i].toUpperCase()) {

            case 'RELEASE':
                command = "0000";
                keysMatched.push(keys[i]);
                break;

            case 'HOLD':  // don't release the keyboard after pressing
                holdKey = true;
                keysMatched.push(keys[i]);
                break;

            case 'PLAY':
                command = "CD00";
                keysMatched.push(keys[i]);
                break;

            case 'STOP':
                command = "B700";
                keysMatched.push(keys[i]);
                break;

            case 'REWIND':
                command = "B600";
                keysMatched.push(keys[i]);
                break;

            case 'FORWARD':
                command = "B500";
                keysMatched.push(keys[i]);
                break;

            case 'HOME':
                command = "2302";
                keysMatched.push(keys[i]);
                break;

            case 'MUTE':
                command = "E200";
                keysMatched.push(keys[i]);
                break;

            case 'VOLUP':
                command = "E900";
                keysMatched.push(keys[i]);
                break;

            case 'VOLDOWN':
                command = "EA00";
                keysMatched.push(keys[i]);
                break;

            default:
                keysNotMatched.push(keys[i]);
        }

    }

    return({
        command:`01${command}`,
        keysMatched: keysMatched,
        keysNotMatched: keysNotMatched,
        hold: holdKey
    });
}


