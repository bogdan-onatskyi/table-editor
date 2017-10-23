export function askUser(message, value = '') {
    return prompt(message, value); // TODO: rewrite to modal dialog
}

export function arrayToCSV(objArray) {
    let str = '';

    for (let i = 0; i < objArray.length; i++) {
        let line = '';
        for (let index in objArray[i]) {
            if (line !== '') line += ',';

            line += objArray[i][index];
        }
        str += line + '\r\n';
    }

    return str;
}