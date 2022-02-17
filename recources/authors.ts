import { Router } from 'express';
import { quotes } from './quotes';

const router = Router();

export type Author = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    image: string;
};


export let authors: Author[] = [
    {
        id: Math.random(),
        firstName: "Carol",
        lastName: "Burnett",
        age: 88,
        image: "https://www.hollywoodreporter.com/wp-content/uploads/2020/03/carol_burnett.jpg"
    },
    {
        id: Math.random(),
        firstName: "Audrey",
        lastName: "Hepburn",
        age: 63,
        image: "https://www.biography.com/.image/t_share/MTc5OTk1NTMxMTYwODU1ODk2/audrey-hepburn-gettyimages-517443052.jpg"
    },
    {
        id: Math.random(),
        firstName: "Alexander",
        lastName: "the Great",
        age: 32,
        image: "https://www.shenyunperformingarts.org/data/image/original/2021/02/20/fbc73ee8f22e7cbf9e2b7883ce7516bb.png"
    },
    {
        id: Math.random(),
        firstName: "Michael",
        lastName: "Altshuler",
        age: 65,
        image: "https://everipedia-storage.s3-accelerate.amazonaws.com/ProfilePics/6666696530416654350.png"
    },
    {
        id: Math.random(),
        firstName: "Nicole",
        lastName: "Kidman",
        age: 54,
        image: "https://www.biography.com/.image/t_share/MTQ3OTg0NzkzODkwNDY0OTIz/nicole_kidman_photo_stuart_c_wilson_getty_images_693045658_profile.jpg"
    },
    {
        id: Math.random(),
        firstName: "Walt",
        lastName: "Whitman",
        age: 72,
        image: "https://waltwhitmaninitiative.org/wp-content/uploads/2019/03/colorized_whitman_small_0.jpg"
    },
    {
        id: Math.random(),
        firstName: "Amal",
        lastName: "Clooney",
        age: 44,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Amal_Clooney_in_London_-_2018_%2841999192931%29_%28cropped%29.jpg/1200px-Amal_Clooney_in_London_-_2018_%2841999192931%29_%28cropped%29.jpg"
    },
    {
        id: Math.random(),
        firstName: "Duchess",
        lastName: "Meghan",
        age: 40,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Meghan_Markle_-_2018_%28cropped%29.jpg"
    },
    {
        id: Math.random(),
        firstName: "Taylor",
        lastName: "Swift",
        age: 32,
        image: "https://yourwikis.com/wp-content/uploads/2019/08/56737357_402182283948368_321374300448644229_n.jpg"
    },
    {
        id: Math.random(),
        firstName: "Winston",
        lastName: "Churchill",
        age: 90,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Sir_Winston_Churchill_-_19086236948.jpg"
    },
    {
        id: Math.random(),
        firstName: "Oprah",
        lastName: "Winfrey",
        age: 68,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Oprah_in_2014.jpg"
    },
    {
        id: Math.random(),
        firstName: "Malala",
        lastName: "Yousafzai",
        age: 24,
        image: "https://bio.illibraio.it/images/2843670213438_92_300_0_75.jpg"
    },
    {
        id: Math.random(),
        firstName: "Marsel",
        lastName: "Sotiri",
        age: 29,
        image: "https://marselsotiri.net/wp-content/uploads/2021/07/Marsel-Sotiri-683x1024.png"
    }
]

router.get('/', (req, res) => {
    const authorsCopy = JSON.parse(JSON.stringify(authors));

    for (const author of authorsCopy) {
        const authorQuotes = quotes.filter((quote) => quote.authorId === author.id);
        author.quotes = authorQuotes;
    }

    res.send(authorsCopy);
});

router.post('/', (req, res) => {
    const errors = [];

    if (typeof req.body.firstName !== 'string')
        errors.push('firstName is missing or not a string');
    if (typeof req.body.lastName !== 'string')
        errors.push('lastName is missing or not a string');
    if (typeof req.body.age !== 'number')
        errors.push('age is missing or not a number');
    if (typeof req.body.image !== 'string')
        errors.push('image is missing or not a string');

    if (errors.length === 0) {
        const author: Author = {
            id: Math.random(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            image: req.body.image,
        };

        authors = [...authors, author];

        res.send(author);
    } else {
        res.status(400).send({ errors: errors });
    }
});

export default router;