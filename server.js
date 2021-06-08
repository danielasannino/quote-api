const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement,
    createElement,
    getIndexById,
    updateElement
} = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

//GET random quote
app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.status(200).send({ quote: randomQuote });
});

//GET all quotes from one author

app.get('/api/quotes', (req, res, next) => {
    const quoteSearch = req.query.person;
    if (quoteSearch) {
        const authorFilter = quotes.filter(quote => quote.person.toLowerCase() === quoteSearch.toLowerCase());
        res.status(200).send({ quotes: authorFilter });
    } else {
        res.status(200).send({ quotes: quotes })
    }
});

//POST new quote

app.post('/api/quotes', (req, res, next) => {
    const newQuote = { quote: req.query.quote, person: req.query.person }
    if (newQuote.quote && newQuote.person) {
        quotes.push(newQuote)
        res.status(201).send({ quote: newQuote });
    } else {
        res.status(404).send();
    }
});