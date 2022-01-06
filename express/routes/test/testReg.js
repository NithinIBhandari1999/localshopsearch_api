const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const replaceAll = (str, match, replacement) => {
    return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
};

const a = replaceAll('Kaju Katali Kaju Katali Kaju Katali Kaju Katali Kaju Katali Kaju Katali', ' ', '-');

console.log({
    a
});