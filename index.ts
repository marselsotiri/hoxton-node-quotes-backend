import express from "express"
import cors from "cors"

type Quote = {
    id: number
    content: string
    author: string
}

const app = express()
const PORT = 4000


const quotes: Quote[] = [
    {
      id: 1,
      content: "When you have a dream, you've got to grab it and never let go.",
      author: "Carol Burnett"
    },
    {
      id: 2,
      content: "Nothing is impossible. The word itself says I'm possible!",
      author: "Audrey Hepburn"
    },
    {
      id: 3,
      content: "There is nothing impossible to they who will try.",
      author: "Alexander the Great"
    },
    {
      id: 4,
      content: "The bad news is time flies. The good news is you're the pilot.",
      author: "Michael Altshuler"
    },
    {
      id: 5,
      content: "Life has got all those twists and turns. You've got to hold on tight and off you go.",
      author: "Nicole Kidman"
    },
    {
      id: 6,
      content: "Keep your face always toward the sunshine, and shadows will fall behind you.",
      author: "Walt Whitman"
    },
    {
      id: 7,
      content: "Be courageous. Challenge orthodoxy. Stand up for what you believe in. When you are in your rocking chair talking to your grandchildren many years from now, be sure you have a good story to tell.",
      author: "Amal Clooney"
    },
    {
      id: 8,
      content: "You make a choice: continue living your life feeling muddled in this abyss of self-misunderstanding, or you find your identity independent of it. You draw your own box.",
      author: "Duchess Meghan"
    },
    {
      id: 9,
      content: "I just want you to know that if you are out there and you are being really hard on yourself right now for something that has happened … it’s normal. That is what is going to happen to you in life. No one gets through unscathed. We are all going to have a few scratches on us. Please be kind to yourselves and stand up for yourself, please.",
      author: "Taylor Swift"
    },
    {
      id: 10,
      content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
        id: 11,
        content: "You define your own life. Don't let other people write your script.",
        author: "Oprah Winfrey"
      },
      {
        id: 12,
        content: "You are never too old to set another goal or to dream a new dream.",
        author: "Malala Yousafzai"
      },
      {
        id: 13,
        content: "Stop here because I'm tired to copy paste...",
        author: "Marsel Sotiri"
      }
  ]
  
  app.use(
    cors({
      origin: "*"
    })
  );
  
  app.get("/", function (req, res) {
    res.send("Welcome in Node")
  })
  
  app.get("/quotes", function (req, res) {
    res.send(quotes)
  })

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })