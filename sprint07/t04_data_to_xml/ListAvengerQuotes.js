const fs = require('fs');
const AvengerQuote = require('./AvengerQuote');
const Comment = require('./Comment');

class ListAvengerQuotes {
    constructor(list = []) {
        this.list = list;
    }

    toXML(fileName = 'avenger_quote.xml') {
        let xml = '<avengerQuotes>\n';

        this.list.forEach((q) => {
            xml += `  <quote>\n`;
            xml += `    <id>${q.id}</id>\n`;
            xml += `    <author>${q.author}</author>\n`;
            xml += `    <text>${q.quote}</text>\n`;
            xml += `    <photos>\n`;
            q.photo.forEach((photo) => {
                xml += `      <photo>${photo}</photo>\n`;
            });
            xml += `    </photos>\n`;
            xml += `    <publishDate>${q.publishDate}</publishDate>\n`;
            xml += `    <comments>\n`;
            q.comments.forEach((c) => {
                xml += `      <comment>\n`;
                xml += `        <date>${c.date}</date>\n`;
                xml += `        <text>${c.comment}</text>\n`;
                xml += `      </comment>\n`;
            });
            xml += `    </comments>\n`;
            xml += `  </quote>\n`;
        });

        xml += '</avengerQuotes>';
        fs.writeFileSync(fileName, xml);
    }

    fromXML(fileName = 'avenger_quote.xml') {
        const data = fs.readFileSync(fileName, 'utf8');
        const quotes = [];

        const quoteRegex = /<quote>([\s\S]*?)<\/quote>/g;
        let quoteMatch;
        while ((quoteMatch = quoteRegex.exec(data)) !== null) {
            const quoteContent = quoteMatch[1];

            const id = this._getTagValue(quoteContent, 'id');
            const author = this._getTagValue(quoteContent, 'author');
            const text = this._getTagValue(quoteContent, 'text');
            const publishDate = this._getTagValue(quoteContent, 'publishDate');

            const photos = [];
            const photoRegex = /<photo>(.*?)<\/photo>/g;
            let photoMatch;
            while ((photoMatch = photoRegex.exec(quoteContent)) !== null) {
                photos.push(photoMatch[1]);
            }

            const comments = [];
            const commentRegex = /<comment>([\s\S]*?)<\/comment>/g;
            let commentMatch;
            while ((commentMatch = commentRegex.exec(quoteContent)) !== null) {
                const commentContent = commentMatch[1];
                const date = this._getTagValue(commentContent, 'date');
                const commentText = this._getTagValue(commentContent, 'text');
                comments.push(new Comment(date, commentText));
            }

            quotes.push(
                new AvengerQuote(
                    id,
                    author,
                    text,
                    photos,
                    publishDate,
                    comments
                )
            );
        }

        this.list = quotes;
    }

    _getTagValue(str, tag) {
        const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`);
        const match = regex.exec(str);
        return match ? match[1] : '';
    }
}

module.exports = ListAvengerQuotes;
