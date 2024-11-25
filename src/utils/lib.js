export function handleErrForm(json) {
    let mes = '';

    for (let key in json.message) {
        mes += `${key}: ${json.message[key].join(', ')}\n\n`;
    }

    return mes;
}