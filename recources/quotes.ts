import { json, Router } from "express";
import { Author, authors } from "./authors";


const router = Router();


export type Quote = {
    id: number;
    content: string;
    authorId: number;
};

export let quotes: Quote[] = [
    {
        id: Math.random(),
        content: "When you have a dream, you've got to grab it and never let go.",
        authorId: authors[0].id,
    },
    {
        id: Math.random(),
        content: "Nothing is impossible. The word itself says I'm possible!",
        authorId: authors[1].id,
    },
    {
        id: Math.random(),
        content: "There is nothing impossible to they who will try.",
        authorId: authors[2].id,
    },
    {
        id: Math.random(),
        content: "The bad news is time flies. The good news is you're the pilot.",
        authorId: authors[3].id,
    },
    {
        id: Math.random(),
        content: "Life has got all those twists and turns. You've got to hold on tight and off you go.",
        authorId: authors[4].id,
    },
    {
        id: Math.random(),
        content: "Keep your face always toward the sunshine, and shadows will fall behind you.",
        authorId: authors[5].id,
    },
    {
        id: Math.random(),
        content: "Be courageous. Challenge orthodoxy. Stand up for what you believe in. When you are in your rocking chair talking to your grandchildren many years from now, be sure you have a good story to tell.",
        authorId: authors[6].id,
    },
    {
        id: Math.random(),
        content: "You make a choice: continue living your life feeling muddled in this abyss of self-misunderstanding, or you find your identity independent of it. You draw your own box.",
        authorId: authors[7].id,
    },
    {
        id: Math.random(),
        content: "I just want you to know that if you are out there and you are being really hard on yourself right now for something that has happened … it’s normal. That is what is going to happen to you in life. No one gets through unscathed. We are all going to have a few scratches on us. Please be kind to yourselves and stand up for yourself, please.",
        authorId: authors[8].id,
    },
    {
        id: Math.random(),
        content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        authorId: authors[9].id,
    },
    {
        id: Math.random(),
        content: "You define your own life. Don't let other people write your script.",
        authorId: authors[10].id,
    },
    {
        id: Math.random(),
        content: "You are never too old to set another goal or to dream a new dream.",
        authorId: authors[11].id,
    },
    {
        id: Math.random(),
        content: "Stop here because I'm tired to copy paste...",
        authorId: authors[12].id,
    }
]


// Quote ENDPOINTS
router.get('/', (req, res) => {
    // search here is a *query*
    const search = req.query.search;
    const age = req.query.age;
    // const idFrom = Number(req.query.idFrom)
    // const idTo = Number(req.query.idTo)

    let quotesToSend: Quote[] = JSON.parse(JSON.stringify(quotes));

    if (typeof search === 'string') {
        console.log('Filtering quotes with search:', search);
        quotesToSend = quotesToSend.filter(
            (quote) => {
                const authorOfQuote = authors.find(author => author.id === quote.authorId);
                if(!authorOfQuote) return;
          
                return authorOfQuote.firstName.toUpperCase().includes(search.toUpperCase()) ||
                  authorOfQuote.lastName.toUpperCase().includes(search.toUpperCase())
              }
        );
    }

    if (typeof age === "number") {
        quotesToSend = quotesToSend.filter(
            (quote) => {
            const authorAge = authors.find(author => author.id === quote.authorId);
            if(!authorAge) return;
            return authorAge.age === age
            }
        );
    }


    for (const quote of quotesToSend) {
        const author = authors.find((author) => author.id === quote.authorId);
        //@ts-ignore
        quote.author = author;
    }

    // if (typeof idFrom === 'number' && !Number.isNaN(idFrom)) {
    //   quotesToSend = quotesToSend.filter(quote => quote.id >= idFrom)
    // }

    res.send(quotesToSend);
});


router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const match = quotes.find((quote) => quote.id === id);

    if (match) {
        res.send(match);
    } else {
        res.status(404).send({ error: 'Quote not found' });
    }
});

router.post('/', (req, res) => {
    const errors = [];

    // for (const key in req.body) {}

    if (typeof req.body.quote !== 'string')
        errors.push('quote is missing or not a string');
    if (typeof req.body.authorId !== 'number')
        errors.push('authorId is missing or not a number');
    // if (typeof req.body.firstName !== 'string')
    //   errors.push('firstName is missing or not a string')
    // if (typeof req.body.lastName !== 'string')
    //   errors.push('lastName is missing or not a string')
    // if (typeof req.body.age !== 'number')
    //   errors.push('age is missing or not a number')
    // if (typeof req.body.image !== 'string')
    //   errors.push('image is missing or not a string')

    if (errors.length === 0) {
        const quote: Quote = {
            id: Math.random(),
            content: req.body.content,
            authorId: req.body.authorId,
        };

        quotes = [...quotes, quote];

        res.send(quote);
    } else {
        res.status(400).send({ errors: errors });
    }
});

router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { quote, authorId } = req.body;

    const match = quotes.find((quote) => quote.id === id);

    if (match) {
        if (typeof quote === 'string') match.content = quote;
        if (typeof authorId === 'number') match.authorId = authorId;
        // if (typeof firstName === 'string') match.firstName = firstName
        // if (typeof lastName === 'string') match.lastName = lastName
        // if (typeof age === 'number') match.age = age
        // if (typeof image === 'string') match.image = image
        res.send(match);
    } else {
        res.status(404).send({ error: 'No quote found with that id.' });
    }
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const match = quotes.find((quote) => quote.id === id);

    if (match) {
        quotes = quotes.filter((quote) => quote.id !== id);
        res.send({ message: 'Quote deleted successfully.' });
    } else {
        res.status(404).send({ error: 'Quote not found.' });
    }
});

export default router;
