# Wedding Website

A beautiful, interactive wedding website built with React, featuring romantic floral designs and smooth animations.

## Features

- **Home Page**: Save the date section with countdown timer
- **About Us**: Tell your love story
- **Photo Gallery**: Expandable sections for different photo collections
  - Our Story So Far
  - Traditional Wedding
  White Wedding
  - Other Memories
- **Goodwill Messages**: Guest book with payment integration
- **Contact Form**: EmailJS integration for inquiries
- **Background Music**: Daughtry - Start of Something Good
- **Responsive Design**: Works beautifully on all devices

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure EmailJS (Contact Form)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Get your credentials
5. Update `src/pages/Contact.jsx`:
   - Replace `YOUR_SERVICE_ID`
   - Replace `YOUR_TEMPLATE_ID`
   - Replace `YOUR_PUBLIC_KEY`

### 3. Configure Stripe (Payment Integration)

1. Sign up at [Stripe](https://stripe.com/)
2. Get your publishable key from the dashboard
3. Update `src/pages/Messages.jsx`:
   - Replace `pk_test_YOUR_STRIPE_KEY` with your actual key
4. For production, you'll need to set up a backend to create payment intents

### 4. Add Background Music

1. Download "Daughtry - Start of Something Good" (ensure you have rights to use it)
2. Create a `public/music` folder
3. Add the audio file as `start-of-something-good.mp3`

### 5. Add Your Photos

Replace the placeholder images in `src/pages/Gallery.jsx` with your actual photos:

```javascript
images: [
  { id: 1, url: '/path/to/your/photo.jpg', caption: 'Your caption' },
  // ... more images
]
```

### 6. Customize Content

Update the following files with your personal information:

- `src/pages/Home.jsx`: Wedding date, names
- `src/pages/About.jsx`: Your love story, names, bios
- `src/pages/Contact.jsx`: Contact information, venue details
- `index.html`: Page title

### 7. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your website.

### 8. Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready to deploy.

## Phase 2: DynamoDB Integration

To integrate with DynamoDB for storing messages:

1. Set up AWS account and DynamoDB table
2. Create an API (AWS Lambda + API Gateway or your preferred backend)
3. Update `src/pages/Messages.jsx` to call your API instead of using localStorage
4. Implement proper authentication and security

## Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  romantic: { /* your colors */ },
  floral: { /* your colors */ }
}
```

### Fonts

The site uses:
- Playfair Display (serif) for headings
- Montserrat (sans-serif) for body text

Change these in `index.html` and `tailwind.config.js`.

## Deployment

You can deploy this site to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## Support

For questions or issues, please contact the developer.

## License

Private - All rights reserved
