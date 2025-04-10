// Set
const guestList = new Set();
guestList.add('Batman');
guestList.add('Robin');
guestList.add('Flash');
guestList.add('Red Hood');
guestList.add('Joker');

console.log(guestList.has('Batman') ? 'Yes' : 'Batman isn`t invited');
console.log(guestList.has('Robin') ? 'Yes' : 'Robin isn`t invited');
guestList.delete('Robin');
console.log(guestList.has('Robin') ? 'Yes' : 'Robin isn`t invited');

// Map
const menu = new Map();
menu.set('Pasta', 12);
menu.set('Pizza', 15);
menu.set('Salad', 10);
menu.set('Govno', 10);
menu.set('Kebab', 10);

menu.forEach((price, dish) => console.log(`${dish}: $${price}`));

// WeakMap
const bankVault = new WeakMap();
const box1 = {},
    box2 = {},
    box3 = {},
    box4 = {},
    box5 = {};

bankVault.set(box1, { credentials: '1234', contents: 'Gold' });
bankVault.set(box2, { credentials: '5678', contents: 'Diamonds' });
bankVault.set(box3, { credentials: '5478', contents: 'Diamonds' });
bankVault.set(box4, { credentials: '5578', contents: 'Diamonds' });
bankVault.set(box5, { credentials: '5378', contents: 'Diamonds' });

const getContents = (box, credentials) => {
    const data = bankVault.get(box);
    return data && data.credentials === credentials
        ? data.contents
        : 'Access Denied';
};

console.log('Vault access:', getContents(box1, '1234'));
console.log('Vault access:', getContents(box1, '0000'));

// WeakSet
const coinCollection = new WeakSet();
const coins = {
    coin1: { country: 'France', year: 1897 },
    coin2: { country: 'Japan', year: 2000 },
    coin3: { country: 'UK', year: 1994 },
    coin4: { country: 'China', year: 1732 },
    coin5: { country: 'Germany', year: 1942 },
};

Object.values(coins).forEach((coin) => coinCollection.add(coin));

console.log(
    coinCollection.has(coins.coin1) ? 'Coin1 exists' : 'Coin1 not found'
);
console.log(
    coinCollection.has(coins.coin3) ? 'Coin2 exists' : 'Coin2 not found'
);

Object.values(coins).forEach((coin) => {
    console.log(`Country: ${coin.country}, Year: ${coin.year}`);
});
