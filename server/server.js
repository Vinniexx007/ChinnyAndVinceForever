import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

app.use(cors());
app.use(express.json());

// Initialize messages file if it doesn't exist
async function initMessagesFile() {
  try {
    await fs.access(MESSAGES_FILE);
  } catch {
    await fs.writeFile(MESSAGES_FILE, JSON.stringify([], null, 2));
  }
}

// Get all messages
app.get('/api/messages', async (req, res) => {
  try {
    const data = await fs.readFile(MESSAGES_FILE, 'utf-8');
    const messages = JSON.parse(data);
    res.json(messages);
  } catch (error) {
    console.error('Error reading messages:', error);
    res.status(500).json({ error: 'Failed to read messages' });
  }
});

// Add a new message
app.post('/api/messages', async (req, res) => {
  try {
    const newMessage = {
      id: Date.now(),
      ...req.body,
      timestamp: new Date().toISOString(),
    };

    const data = await fs.readFile(MESSAGES_FILE, 'utf-8');
    const messages = JSON.parse(data);
    messages.unshift(newMessage); // Add to beginning

    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    res.json(newMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Add a new donation
app.post('/api/donations', async (req, res) => {
  try {
    const newDonation = {
      id: Date.now(),
      name: req.body.isAnonymous ? 'Anonymous' : req.body.donorName,
      amount: req.body.amount,
      isAnonymous: req.body.isAnonymous,
      timestamp: new Date().toISOString(),
    };

    const DONATIONS_FILE = path.join(__dirname, 'donations.json');
    
    // Initialize donations file if it doesn't exist
    try {
      await fs.access(DONATIONS_FILE);
    } catch {
      await fs.writeFile(DONATIONS_FILE, JSON.stringify([], null, 2));
    }

    const data = await fs.readFile(DONATIONS_FILE, 'utf-8');
    const donations = JSON.parse(data);
    donations.unshift(newDonation); // Add to beginning

    await fs.writeFile(DONATIONS_FILE, JSON.stringify(donations, null, 2));
    res.json(newDonation);
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ error: 'Failed to save donation' });
  }
});

// Get all donations
app.get('/api/donations', async (req, res) => {
  try {
    const DONATIONS_FILE = path.join(__dirname, 'donations.json');
    
    try {
      await fs.access(DONATIONS_FILE);
    } catch {
      await fs.writeFile(DONATIONS_FILE, JSON.stringify([], null, 2));
    }

    const data = await fs.readFile(DONATIONS_FILE, 'utf-8');
    const donations = JSON.parse(data);
    res.json(donations);
  } catch (error) {
    console.error('Error reading donations:', error);
    res.status(500).json({ error: 'Failed to read donations' });
  }
});

// Start server
initMessagesFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Messages stored in: ${MESSAGES_FILE}`);
  });
});
