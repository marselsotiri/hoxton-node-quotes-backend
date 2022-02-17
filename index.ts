import express from "express"
import cors from "cors"
import { Quote, quotes } from "./recources/quotes"
import quoteRouter from './recources/quotes';
import authorRouter from './recources/authors';


const app = express()
const PORT = 4000
app.use(express.json());




app.use(
    cors({
        origin: "*"
    })
);

app.use('/quotes', quoteRouter);
app.use('/authors', authorRouter);

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

// app.get("/quotes", function (req, res) {
//     res.send(quotes)
// })

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
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})