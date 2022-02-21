import Database from "better-sqlite3";

const db = new Database('./data.db', {
    verbose: console.log
})

let authors = [
    {
        id: 1,
        firstName: "Carol",
        lastName: "Burnett",
        age: 88,
        image: "https://www.hollywoodreporter.com/wp-content/uploads/2020/03/carol_burnett.jpg"
    },
    {
        id: 2,
        firstName: "Audrey",
        lastName: "Hepburn",
        age: 63,
        image: "https://www.biography.com/.image/t_share/MTc5OTk1NTMxMTYwODU1ODk2/audrey-hepburn-gettyimages-517443052.jpg"
    },
    {
        id: 3,
        firstName: "Alexander",
        lastName: "the Great",
        age: 32,
        image: "https://www.shenyunperformingarts.org/data/image/original/2021/02/20/fbc73ee8f22e7cbf9e2b7883ce7516bb.png"
    },
    {
        id: 4,
        firstName: "Michael",
        lastName: "Altshuler",
        age: 65,
        image: "https://everipedia-storage.s3-accelerate.amazonaws.com/ProfilePics/6666696530416654350.png"
    },
    {
        id: 5,
        firstName: "Nicole",
        lastName: "Kidman",
        age: 54,
        image: "https://www.biography.com/.image/t_share/MTQ3OTg0NzkzODkwNDY0OTIz/nicole_kidman_photo_stuart_c_wilson_getty_images_693045658_profile.jpg"
    },
    {
        id: 6,
        firstName: "Walt",
        lastName: "Whitman",
        age: 72,
        image: "https://waltwhitmaninitiative.org/wp-content/uploads/2019/03/colorized_whitman_small_0.jpg"
    },
    {
        id: 7,
        firstName: "Amal",
        lastName: "Clooney",
        age: 44,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Amal_Clooney_in_London_-_2018_%2841999192931%29_%28cropped%29.jpg/1200px-Amal_Clooney_in_London_-_2018_%2841999192931%29_%28cropped%29.jpg"
    },
    {
        id: 8,
        firstName: "Duchess",
        lastName: "Meghan",
        age: 40,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Meghan_Markle_-_2018_%28cropped%29.jpg"
    },
    {
        id: 9,
        firstName: "Taylor",
        lastName: "Swift",
        age: 32,
        image: "https://yourwikis.com/wp-content/uploads/2019/08/56737357_402182283948368_321374300448644229_n.jpg"
    },
    {
        id: 10,
        firstName: "Winston",
        lastName: "Churchill",
        age: 90,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Sir_Winston_Churchill_-_19086236948.jpg"
    },
    {
        id: 11,
        firstName: "Oprah",
        lastName: "Winfrey",
        age: 68,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Oprah_in_2014.jpg"
    },
    {
        id: 12,
        firstName: "Malala",
        lastName: "Yousafzai",
        age: 24,
        image: "https://bio.illibraio.it/images/2843670213438_92_300_0_75.jpg"
    },
    {
        id: 13,
        firstName: "Marsel",
        lastName: "Sotiri",
        age: 29,
        image: "https://marselsotiri.net/wp-content/uploads/2021/07/Marsel-Sotiri-683x1024.png"
    }
]


let quotes = [
    {
        id: 1,
        content: "When you have a dream, you've got to grab it and never let go.",
        authorId: 1,
    },
    {
        id: 2,
        content: "Nothing is impossible. The word itself says I'm possible!",
        authorId: 2,
    },
    {
        id: 3,
        content: "There is nothing impossible to they who will try.",
        authorId: 3,
    },
    {
        id: 4,
        content: "The bad news is time flies. The good news is you're the pilot.",
        authorId: 4,
    },
    {
        id: 5,
        content: "Life has got all those twists and turns. You've got to hold on tight and off you go.",
        authorId: 5,
    },
    {
        id: 6,
        content: "Keep your face always toward the sunshine, and shadows will fall behind you.",
        authorId: 6,
    },
    {
        id: 7,
        content: "Be courageous. Challenge orthodoxy. Stand up for what you believe in. When you are in your rocking chair talking to your grandchildren many years from now, be sure you have a good story to tell.",
        authorId: 7,
    },
    {
        id: 8,
        content: "You make a choice: continue living your life feeling muddled in this abyss of self-misunderstanding, or you find your identity independent of it. You draw your own box.",
        authorId: 8,
    },
    {
        id: 9,
        content: "I just want you to know that if you are out there and you are being really hard on yourself right now for something that has happened … it’s normal. That is what is going to happen to you in life. No one gets through unscathed. We are all going to have a few scratches on us. Please be kind to yourselves and stand up for yourself, please.",
        authorId: 9,
    },
    {
        id: 10,
        content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        authorId: 10,
    },
    {
        id: 11,
        content: "You define your own life. Don't let other people write your script.",
        authorId: 11,
    },
    {
        id: 12,
        content: "You are never too old to set another goal or to dream a new dream.",
        authorId: 12,
    },
    {
        id: 13,
        content: "Stop here because I'm tired to copy paste...",
        authorId: 13,
    }
]

const dropTableAuthors = db.prepare('DROP TABLE authors;');
dropTableAuthors.run();

const dropTableQuotes = db.prepare(`DROP TABLE quotes;`)
dropTableQuotes.run();

const createAuthors = db.prepare(`
CREATE TABLE  IF NOT EXISTS authors(
    id INTEGER,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    age TEXT,
    image NUMBER,
    PRIMARY KEY (id)
);
`)

createAuthors.run()

const createQuotes = db.prepare(`
CREATE TABLE  IF NOT EXISTS quotes(
    id INTEGER,
    text TEXT NOT NULL,
    author_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
);
`)

createQuotes.run()

const createAuthor = db.prepare(`
INSERT INTO authors(firstName,lastName,image,age ) VALUES (?,?,?,?);
`)

const deleteAllAuthors = db.prepare(`
DELETE FROM authors;
`);

const createQuote = db.prepare(`
INSERT INTO quotes(text,author_id) VALUES (?,?);
`)

const deleteAllQuotes = db.prepare(`
DELETE FROM quotes;
`);

deleteAllAuthors.run();
deleteAllQuotes.run();

for (const author of authors) {
    createAuthor.run(author.firstName, author.lastName, author.image, author.age);
}

for (const quote of quotes) {
    createQuote.run(quote.content, quote.authorId);
}