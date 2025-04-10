const houseMixin = {
    wordReplace(oldWord, newWord) {
        this.description = this.description.replace(oldWord, newWord);
    },

    wordInsertAfter(targetWord, newWord) {
        let words = this.description.split(' ');
        let newDescription = [];
        for (let i = 0; i < words.length; i++) {
            newDescription.push(words[i]);
            if (words[i] === targetWord) {
                newDescription.push(newWord);
            }
        }
        this.description = newDescription.join(' ');
    },

    wordDelete(wordToDelete) {
        this.description = this.description.replace(wordToDelete, '');
    },

    wordEncrypt() {
        this.description = this.description.replace(
            /[a-zA-Z]/g,
            function (char) {
                const base = char <= 'Z' ? 65 : 97;
                return String.fromCharCode(
                    ((char.charCodeAt(0) - base + 13) % 26) + base
                );
            }
        );
    },

    wordDecrypt() {
        this.wordEncrypt();
    },
};
