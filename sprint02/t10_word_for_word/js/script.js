function addWords(obj, wrds) {
    let wordsArray = obj.words.split(' ').filter((w) => w);
    let newWords = wrds.split(' ').filter((w) => w);

    wordsArray = wordsArray.filter(
        (word, index, self) => self.indexOf(word) === index
    );

    newWords.forEach((word) => {
        if (!wordsArray.includes(word)) {
            wordsArray.push(word);
        }
    });

    obj.words = wordsArray.join(' ');
}

function removeWords(obj, wrds) {
    let wordsArray = obj.words.split(' ').filter((w) => w);
    let removeList = wrds.split(' ').filter((w) => w);

    obj.words = wordsArray
        .filter((word) => !removeList.includes(word))
        .join(' ');
}

function changeWords(obj, oldWrds, newWrds) {
    let wordsArray = obj.words.split(' ').filter((w) => w);
    let oldWords = oldWrds.split(' ').filter((w) => w);
    let newWords = newWrds.split(' ').filter((w) => w);

    let result = [];

    wordsArray.forEach((word) => {
        if (!oldWords.includes(word)) {
            result.push(word);
        }
    });

    newWords.forEach((word) => {
        if (!result.includes(word)) {
            result.push(word);
        }
    });

    obj.words = result.join(' ');
}
