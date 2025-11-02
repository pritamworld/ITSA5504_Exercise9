const express = require('express');

const app = express();

const orders = [
    { id: 1, item: 'Notebook', price: 4.99 },
    { id: 2, item: 'Pencil', price: 0.99 },
    { id: 3, item: 'Backpack', price: 24.5 }
];

app.get('/', (req, res) => {
    res.send("<h1>ITSA 5504 Exercise 9 - Orders API</h1>");
});

app.get('/orders', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.json(orders);
});


if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Orders API listening at http://localhost:${port}`));
}

// exported for tests/verification
module.exports = app; 