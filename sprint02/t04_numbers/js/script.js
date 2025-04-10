let beginRange = prompt('Enter the beginning of the range:');
let endRange = prompt('Enter the end of the range:');

function checkDivision(beginRange, endRange) {
    beginRange = String(beginRange).trim().match(/^\d+$/) ? beginRange * 1 : 1;
    endRange = String(endRange).trim().match(/^\d+$/) ? endRange * 1 : 100;

    for (let i = beginRange; i <= endRange; i++) {
        let description = '';

        if (i % 2 === 0) {
            description += `${i} is even`;
        }
        if (i % 3 === 0) {
            description += description
                ? `, is a multiple of 3`
                : `${i} is a multiple of 3`;
        }
        if (i % 10 === 0) {
            description += description
                ? `, is a multiple of 10`
                : `${i} is a multiple of 10`;
        }

        console.log(description || `${i} -`);
    }
}

checkDivision(beginRange, endRange);
