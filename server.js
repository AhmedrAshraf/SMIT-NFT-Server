const express = require('express');
const dotenv = require('dotenv');
const emailService = require('./emailService');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SMIT NFT Server API' });
});

// Get all NFTs
app.get('/api/nfts', (req, res) => {
  res.json({
    nfts: [
      { id: 1, name: 'NFT #1', description: 'First NFT' },
      { id: 2, name: 'NFT #2', description: 'Second NFT' }
    ]
  });
});

// Get NFT by ID
app.get('/api/nfts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  res.json({
    id,
    name: `NFT #${id}`,
    description: `Description for NFT #${id}`
  });
});

// Create new NFT
app.post('/api/nfts', (req, res) => {
  const newNFT = req.body;
  res.status(201).json({
    message: 'NFT created successfully',
    nft: newNFT
  });
});

// Email routes
app.post('/api/email/send', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    const result = await emailService.sendEmail(to, subject, text, html);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/email/welcome', async (req, res) => {
  try {
    const { to, name } = req.body;
    const result = await emailService.sendWelcomeEmail(to, name);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/email/purchase-confirmation', async (req, res) => {
  try {
    const { to, nftName, price } = req.body;
    const result = await emailService.sendPurchaseConfirmation(to, nftName, price);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 