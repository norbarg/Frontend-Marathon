const http = require('http');
const fs = require('fs');
const AvengerQuote = require('./AvengerQuote');
const Comment = require('./Comment');
const ListAvengerQuotes = require('./ListAvengerQuotes');

const quotes = new ListAvengerQuotes([
    new AvengerQuote(
        6206,
        'Tony Stark',
        'I know I said no more surprises, but I gotta say, I was really hoping to pull off one last one.',
        [
            'https://ficquotes.com/images/quotes/tony-stark-iron-man-avengers-endgame-607.jpg',
        ],
        '17-09-2019',
        [new Comment('2019-09-29', 'My first favourite quote of Tony Stark.')]
    ),
    new AvengerQuote(
        2937,
        'Bruce Banner',
        "That's my secret, captain: I'm always angry.",
        ['https://ficquotes.com/images/quotes/bruce-banner-avengers-261.jpg'],
        '17-09-2019',
        [new Comment('2019-09-29', 'My first favourite quote of Bruce Banner.')]
    ),
    new AvengerQuote(
        1992,
        'Tony Stark',
        'Following is not really my style.',
        ['https://ficquotes.com/images/quotes/bruce-banner-avengers-261.jpg'],
        '17-09-2019',
        [new Comment('2019-09-29', 'My first favourite quote of Bruce Banner.')]
    ),
]);

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        quotes.toXML('avenger_quote.xml');

        const quotesFromXML = new ListAvengerQuotes();
        quotesFromXML.fromXML('avenger_quote.xml');

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        res.end(`
            <html>
            <head>
                <title>Avenger Quote to XML</title>
                <style>
                    
                        .column {
                        gap: 20px;
                        display: flex;
                        flex: 1;
                        border: 1px solid #000;
                        padding: 10px;
                    }
                    
                </style>
            </head>
            <body>
                <h1>Avenger Quote to XML</h1><br><br>
                <div class="column">
                    <div class="column">
                        <strong>To XML</strong><br><br>
                        <pre>${dump(quotes)}</pre>
                    </div>
                    <div class="column">
                        <strong>From XML</strong><br><br>
                        <pre>${dump(quotesFromXML)}</pre>
                    </div>
                </div>
            </body>
            </html>
        `);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

function dump(obj, indent = '') {
    if (obj instanceof ListAvengerQuotes) {
        return (
            `${indent}ListAvengerQuotes Object\n${indent}(\n${indent}    [_list:protected] => Array\n${indent}    (\n` +
            obj.list
                .map(
                    (q, i) =>
                        `${indent}        [${i}] => ${dump(
                            q,
                            indent + '        '
                        )}`
                )
                .join('\n') +
            `\n${indent}    )\n${indent})`
        );
    }
    if (obj instanceof AvengerQuote) {
        return (
            `${indent}AvengerQuote Object\n${indent}(\n` +
            `${indent}    [id:protected] => ${obj.id}\n` +
            `${indent}    [author:protected] => ${obj.author}\n` +
            `${indent}    [quote:protected] => ${obj.quote}\n` +
            `${indent}    [photo:protected] => Array\n${indent}    (\n` +
            obj.photo
                .map((p, i) => `${indent}        [${i}] => ${p}`)
                .join('\n') +
            `\n${indent}    )\n` +
            `${indent}    [publishDate:protected] => ${obj.publishDate}\n` +
            `${indent}    [comments:protected] => Array\n${indent}    (\n` +
            obj.comments
                .map(
                    (c, i) =>
                        `${indent}        [${i}] => ${dump(
                            c,
                            indent + '        '
                        )}`
                )
                .join('\n') +
            `\n${indent}    )\n${indent})`
        );
    }
    if (obj instanceof Comment) {
        return (
            `${indent}Comment Object\n${indent}(\n` +
            `${indent}    [date:protected] => ${obj.date}\n` +
            `${indent}    [comment:protected] => ${obj.comment}\n${indent})`
        );
    }
    return '';
}
