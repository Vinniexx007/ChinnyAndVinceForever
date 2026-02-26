# Wedding Website Setup Guide

## Quick Start Checklist

- [ ] Install dependencies: `npm install`
- [ ] Add background music file
- [ ] Configure EmailJS
- [ ] Configure Stripe
- [ ] Add your photos
- [ ] Customize content
- [ ] Test locally
- [ ] Deploy

## Detailed Setup Steps

### 1. EmailJS Configuration

**Why**: To receive contact form submissions via email

**Steps**:
1. Go to https://www.emailjs.com/ and create a free account
2. Add an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
4. Copy your Service ID, Template ID, and Public Key
5. Open `src/pages/Contact.jsx` and replace:
   ```javascript
   'YOUR_SERVICE_ID' → your actual service ID
   'YOUR_TEMPLATE_ID' → your actual template ID
   'YOUR_PUBLIC_KEY' → your actual public key
   ```

### 2. Stripe Payment Configuration

**Why**: To accept monetary gifts from guests

**Steps**:
1. Go to https://stripe.com/ and create an account
2. Get your publishable key from Dashboard → Developers → API keys
3. Open `src/pages/Messages.jsx` and replace:
   ```javascript
   'pk_test_YOUR_STRIPE_KEY' → your actual publishable key
   ```

**Important**: For production, you need a backend to create payment intents securely. The current implementation is a demo.

**Backend Setup** (Phase 2):
- Create a serverless function (AWS Lambda, Vercel Functions, etc.)
- Implement `/create-payment-intent` endpoint
- Use Stripe's server-side SDK
- Return client secret to frontend

### 3. Background Music

**Steps**:
1. Obtain "Daughtry - Start of Something Good" (ensure you have rights)
2. Create folder: `public/music/`
3. Add file as: `public/music/start-of-something-good.mp3`

**Alternative**: Use a different song by updating `src/components/MusicPlayer.jsx`

### 4. Adding Your Photos

**Steps**:
1. Prepare your photos (recommended: 1200x800px, optimized for web)
2. Create folders in `public/`:
   - `public/images/story/`
   - `public/images/traditional/`
   - `public/images/white/`
   - `public/images/others/`
3. Add your photos to these folders
4. Update `src/pages/Gallery.jsx`:

```javascript
const galleries = [
  {
    id: 'story',
    title: 'Our Story So Far',
    description: 'The journey that brought us together',
    images: [
      { id: 1, url: '/images/story/photo1.jpg', caption: 'First Date' },
      { id: 2, url: '/images/story/photo2.jpg', caption: 'Our Adventure' },
      // Add more...
    ],
  },
  // Update other galleries...
];
```

### 5. Content Customization

**Home Page** (`src/pages/Home.jsx`):
- Update wedding date: `const weddingDate = new Date('2025-12-31T00:00:00');`
- Customize text and messaging

**About Page** (`src/pages/About.jsx`):
- Add your love story
- Add bride and groom names
- Add personal bios
- Replace emoji placeholders with actual photos if desired

**Contact Page** (`src/pages/Contact.jsx`):
- Update email address
- Update phone number
- Add venue details when confirmed

**Site Title** (`index.html`):
- Change `<title>` to your names

### 6. Color Customization

Edit `tailwind.config.js` to match your wedding colors:

```javascript
colors: {
  romantic: {
    50: '#fdf4f5',
    // ... customize these
    900: '#7d1b42',
  },
  floral: {
    50: '#faf5ff',
    // ... customize these
    900: '#581c87',
  }
}
```

### 7. Testing Locally

```bash
npm run dev
```

Test all features:
- [ ] Navigation works
- [ ] Countdown timer displays correctly
- [ ] Photo galleries expand/collapse
- [ ] Message form submits
- [ ] Contact form works (if EmailJS configured)
- [ ] Music player controls work
- [ ] Responsive on mobile

### 8. Deployment Options

**Vercel** (Recommended):
```bash
npm install -g vercel
vercel
```

**Netlify**:
1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `dist`

**AWS S3 + CloudFront**:
1. Build: `npm run build`
2. Upload `dist` folder to S3
3. Configure CloudFront distribution
4. Set up custom domain

## Phase 2: DynamoDB Integration

When you're ready to replace localStorage with DynamoDB:

1. **Create DynamoDB Table**:
   - Table name: `WeddingMessages`
   - Partition key: `id` (String)
   - Add GSI for sorting by timestamp

2. **Create API**:
   - Use AWS Lambda + API Gateway
   - Or use your preferred backend framework
   - Endpoints needed:
     - `POST /messages` - Create message
     - `GET /messages` - List messages

3. **Update Frontend**:
   - Replace localStorage calls in `src/pages/Messages.jsx`
   - Add API calls to your backend
   - Handle loading states and errors

4. **Security**:
   - Implement rate limiting
   - Add CAPTCHA to prevent spam
   - Sanitize user input
   - Set up CORS properly

## Troubleshooting

**Music doesn't play**:
- Check browser console for errors
- Ensure file path is correct
- Some browsers block autoplay - user must interact first

**Images don't load**:
- Check file paths are correct
- Ensure images are in `public` folder
- Check browser console for 404 errors

**EmailJS not working**:
- Verify all credentials are correct
- Check EmailJS dashboard for quota limits
- Look for errors in browser console

**Stripe payment fails**:
- Using test mode? Use test card: 4242 4242 4242 4242
- Check Stripe dashboard for errors
- Ensure publishable key is correct

## Need Help?

Check the browser console for error messages - they usually point to the issue.

## Next Steps

After setup:
1. Share the website URL with guests
2. Monitor messages and contact form submissions
3. Update content as wedding details are confirmed
4. Consider Phase 2 backend integration for better data management
