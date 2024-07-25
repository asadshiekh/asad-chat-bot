import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  const url = `https://${process.env.RAPIDAPI_HOST}/gpt4`;
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': process.env.RAPIDAPI_HOST,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      web_access: false
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    // Customize the result to indicate that this is "Asad Bot"
    const customResult = {
      ...result,
      botIdentity: "Asad Chat Bot"
    };

    res.json(customResult);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

// localport12

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
