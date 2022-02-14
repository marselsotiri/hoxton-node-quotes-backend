import express from "express"
import cors from "cors"

type Quote = {
    id: number
    content: string
    firstName: string
    lastName: string
    age: number
    image: string
}

const app = express()
const PORT = 4000


const quotes: Quote[] = [
    {
        id: Math.random(),
        content: "When you have a dream, you've got to grab it and never let go.",
        firstName: "Carol",
        lastName: "Burnett",
        age: 88,
        image: "https://www.hollywoodreporter.com/wp-content/uploads/2020/03/carol_burnett.jpg"
    },
    {
        id: Math.random(),
        content: "Nothing is impossible. The word itself says I'm possible!",
        firstName: "Audrey",
        lastName: "Hepburn",
        age: 63,
        image: "https://www.biography.com/.image/t_share/MTc5OTk1NTMxMTYwODU1ODk2/audrey-hepburn-gettyimages-517443052.jpg"
    },
    {
        id: Math.random(),
        content: "There is nothing impossible to they who will try.",
        firstName: "Alexander",
        lastName: "the Great",
        age: 32,
        image: "https://www.shenyunperformingarts.org/data/image/original/2021/02/20/fbc73ee8f22e7cbf9e2b7883ce7516bb.png"
    },
    {
        id: Math.random(),
        content: "The bad news is time flies. The good news is you're the pilot.",
        firstName: "Michael",
        lastName: "Altshuler",
        age: 65 ,
        image: "https://everipedia-storage.s3-accelerate.amazonaws.com/ProfilePics/6666696530416654350.png"
    },
    {
        id: Math.random(),
        content: "Life has got all those twists and turns. You've got to hold on tight and off you go.",
        firstName: "Nicole",
        lastName: "Kidman",
        age: 54,
        image: "https://www.biography.com/.image/t_share/MTQ3OTg0NzkzODkwNDY0OTIz/nicole_kidman_photo_stuart_c_wilson_getty_images_693045658_profile.jpg"
    },
    {
        id: Math.random(),
        content: "Keep your face always toward the sunshine, and shadows will fall behind you.",
        firstName: "Walt",
        lastName: "Whitman",
        age: 72,
        image: "https://waltwhitmaninitiative.org/wp-content/uploads/2019/03/colorized_whitman_small_0.jpg"
    },
    {
        id: Math.random(),
        content: "Be courageous. Challenge orthodoxy. Stand up for what you believe in. When you are in your rocking chair talking to your grandchildren many years from now, be sure you have a good story to tell.",
        firstName: "Amal",
        lastName: "Clooney",
        age: 44,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Amal_Clooney_in_London_-_2018_%2841999192931%29_%28cropped%29.jpg/1200px-Amal_Clooney_in_London_-_2018_%2841999192931%29_%28cropped%29.jpg"
    },
    {
        id: Math.random(),
        content: "You make a choice: continue living your life feeling muddled in this abyss of self-misunderstanding, or you find your identity independent of it. You draw your own box.",
        firstName: "Duchess",
        lastName: "Meghan",
        age: 40,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Meghan_Markle_-_2018_%28cropped%29.jpg"
    },
    {
        id: Math.random(),
        content: "I just want you to know that if you are out there and you are being really hard on yourself right now for something that has happened … it’s normal. That is what is going to happen to you in life. No one gets through unscathed. We are all going to have a few scratches on us. Please be kind to yourselves and stand up for yourself, please.",
        firstName: "Taylor",
        lastName: "Swift",
        age: 32,
        image: "https://yourwikis.com/wp-content/uploads/2019/08/56737357_402182283948368_321374300448644229_n.jpg"
    },
    {
        id: Math.random(),
        content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        firstName: "Winston",
        lastName: "Churchill",
        age: 90,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Sir_Winston_Churchill_-_19086236948.jpg"
    },
    {
        id: Math.random(),
        content: "You define your own life. Don't let other people write your script.",
        firstName: "Oprah",
        lastName: "Winfrey",
        age: 68,
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Oprah_in_2014.jpg"
    },
    {
        id: Math.random(),
        content: "You are never too old to set another goal or to dream a new dream.",
        firstName: "Malala",
        lastName: "Yousafzai",
        age: 24,
        image: "https://bio.illibraio.it/images/2843670213438_92_300_0_75.jpg"
    },
    {
        id: Math.random(),
        content: "Stop here because I'm tired to copy paste...",
        firstName: "Marsel",
        lastName: "Sotiri",
        age: 29,
        image: "https://marselsotiri.net/wp-content/uploads/2021/07/Marsel-Sotiri-683x1024.png"
    }
]

app.use(
    cors({
        origin: "*"
    })
);

app.get("/", function (req, res) {
    res.send(`
  <h1>Welcome to our quotes API!</h1>
  <p>Here are some endpoints you can use:</p>
  <ul>
    <li><a href="/quotes">/quotes</a></li>
    <li><a href="/randomQuote">/randomQuote</a></li>
  </ul>
 `)
})

app.get("/quotes", function (req, res) {
    res.send(quotes)
})

app.get('/randomQuote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const quote = quotes[randomIndex]
    res.send(quote)
})

app.get("/search", function (req, res) {
    const filters = req.query
    const filterByUsers = quotes.filter(quote => {
        let isValid = true
        for (const key in filters) {
            const quoteKey = key as keyof Quote
            console.log(quoteKey, quote[quoteKey], filters[quoteKey]);
            isValid = isValid && quote[quoteKey] == filters[quoteKey]
        }
        return isValid
    })
    res.send(filterByUsers)
})

app.get("/quotes/:id", (req, res) => {
    const id = Number(req.params.id);
    const match = quotes.find((quote) => quote.id === id);
    if (match) {
      res.send(match);
    } else {
      res.status(404).send({ error: "Quote not found." });
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})