let userInput = prompt('Enter a number between 1 and 10:');

let number = Number(userInput);

while (
    !/^[1-9]\d{0,1}$/.test(userInput) ||
    isNaN(number) ||
    number < 1 ||
    number > 10
) {
    userInput = prompt('Invalid input! Enter a number between 1 and 10:');
    number = Number(userInput);
}

let idiom;
switch (number) {
    case 1:
        idiom = 'Back to square 1';
        break;
    case 2:
        idiom = 'Goody 2-shoes';
        break;
    case 3:
        idiom = "Two's company, three's a crowd";
        break;
    case 4:
        idiom = 'Counting sheep';
        break;
    case 5:
        idiom = 'Take five';
        break;
    case 6:
        idiom = "Two's company, three's a crowd";
        break;
    case 7:
        idiom = 'Seventh heaven';
        break;
    case 8:
        idiom = 'Behind the eight-ball';
        break;
    case 9:
        idiom = 'Counting sheep';
        break;
    case 10:
        idiom = 'Cheaper by the dozen';
        break;
}

alert(idiom);
