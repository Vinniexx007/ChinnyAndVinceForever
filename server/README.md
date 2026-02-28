# Wedding Messages Server

A simple Node.js server to store wedding messages in a local JSON file.

## Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## Files Created

- `messages.json` - Stores all goodwill messages with contact details
- `donations.json` - Stores all donations with donor names and amounts

## How It Works

- Messages are stored in `server/messages.json`
- Donations are stored in `server/donations.json`
- Both files persist between sessions
- You can open these files in any text editor to view all data
- The server provides endpoints for both messages and donations

## Viewing Data

Simply open the JSON files in any text editor:
- `server/messages.json` - All goodwill messages with names, emails, phones
- `server/donations.json` - All donations with donor names and amounts

**What's Public vs Private:**

Public (displayed on website):
- Message names and content
- Donor names and amounts

Private (only in JSON files):
- Email addresses
- Phone numbers

## Running Both Server and Website

You'll need two terminal windows:

Terminal 1 (Server):
```bash
cd server
npm start
```

Terminal 2 (Website):
```bash
npm run dev
```

## Backup

To backup your data, simply copy both JSON files to a safe location:
- `messages.json`
- `donations.json`
