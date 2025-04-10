let firstName = prompt('Enter your first name');
let secondName = prompt('Enter your second name');

if (
    !isNaN(firstName) ||
    !isNaN(secondName) ||
    firstName == '' ||
    secondName == ''
) {
    alert('Wrong input');
    console.log('Wrong input');
} else {
    firstName = firstName
        .toLocaleLowerCase()
        .replace(/^./, (firstChar) => firstChar.toUpperCase());
    secondName = secondName
        .toLocaleLowerCase()
        .replace(/^./, (firstChar) => firstChar.toUpperCase());

    console.log('Greeting ' + firstName + ' ' + secondName);
    alert('Greeting ' + firstName + ' ' + secondName);
}
