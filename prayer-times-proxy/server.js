import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.get('/api/prayer-times', async (req, res) => {
  try {
    const response = await fetch('https://mawaqit.net/fr/el-fath-bruxelles');
    const text = await response.text();
    res.send(text);
  } catch (error) {
    res.status(500).send('Error fetching prayer times');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
