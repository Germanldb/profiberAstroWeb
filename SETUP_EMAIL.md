# 📧 Email Configuration with Resend - Setup Guide

## 🚀 Quick Setup Steps

### 1. Install Required Package
```bash
npm install axios
```

**Note:** We're using axios to make HTTP requests to Resend's API. This is simpler and you don't need the Resend SDK!

### 2. Create Environment File
Create a `.env` file in the root of your project:

```env
# Resend API Key - Keep this secure and never commit to git
RESEND_API_KEY=re_X2feMn2n_G5szouHCkY1XcmhPD3ZN8LPw
```

**⚠️ IMPORTANT:** Make sure `.env` is in your `.gitignore` file (already added).

### 3. Configure Your Email Settings

Open `src/pages/api/send-email.ts` and update these fields:

```typescript
// Line 50-51: Update with your verified Resend domain and recipient email
from: 'ProFiber <noreply@yourdomain.com>', // Replace with your verified domain
to: ['your-email@profiber.com'], // Replace with your actual email
```

**Current settings (for testing):**
- `from`: Uses `onboarding@resend.dev` (Resend's test domain)
- `to`: Set to `info@profiber.com` (update this to your real email!)

### 4. Verify Your Domain in Resend (Optional but Recommended)

For production use, you should verify your domain in Resend:

1. Go to https://resend.com/domains
2. Add your domain
3. Add the DNS records they provide
4. Update the `from` field in the API with your verified domain

**Note:** For testing, you can use `onboarding@resend.dev` (already configured).

### 5. Update Astro Config

Make sure your `astro.config.mjs` has output mode set to `server` or `hybrid`:

```javascript
export default defineConfig({
  output: 'server', // or 'hybrid'
  // ... rest of config
});
```

## 🔒 Security Features Implemented

✅ **Environment Variables**: API key stored securely in `.env` file  
✅ **Gitignore**: `.env` file excluded from version control  
✅ **Server-side Processing**: Email sending happens on the server, not client  
✅ **Input Validation**: Email format and required fields validated  
✅ **Error Handling**: Comprehensive error handling with user-friendly messages  
✅ **XSS Protection**: Input sanitization through proper HTML escaping  

## 📋 Form Fields Captured

The contact form captures and sends the following data:

- **Name** (required)
- **Email** (required, validated)
- **Subject** (required)
- **Phone** (optional)
- **Message** (required)

## 🎨 User Experience Features

- **Loading State**: Button shows "Enviando..." while processing
- **Success Message**: Green notification on successful submission
- **Error Messages**: Red notification with specific error details
- **Form Reset**: Automatically clears form after successful submission
- **Auto-scroll**: Scrolls to success/error message
- **Auto-hide**: Success message disappears after 5 seconds

## 🧪 Testing

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Navigate to your contact form
3. Fill out the form and submit
4. Check your configured email address for the message

## 📝 Email Template

The email sent includes:
- Styled HTML with your brand colors
- All form fields formatted nicely
- Reply-to set to customer's email for easy responses
- Professional footer

## 🐛 Troubleshooting

### "Error al enviar el correo"
- Check that your `RESEND_API_KEY` is correct in `.env`
- Verify the API key is active in your Resend dashboard
- Check console for detailed error messages

### "Error de conexión"
- Ensure your dev server is running
- Check browser console for network errors
- Verify `/api/send-email` endpoint is accessible

### Emails not arriving
- Check spam folder
- Verify the `to` email address in `send-email.ts`
- For production, make sure your domain is verified in Resend

## 🌐 Production Deployment

Before deploying to production:

1. **Add environment variable to your hosting platform:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - Other: Add `RESEND_API_KEY` to your platform's env vars

2. **Verify your domain in Resend** for better deliverability

3. **Update the recipient email** in `send-email.ts`

4. **Test thoroughly** before going live

## 📚 Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Astro API Routes](https://docs.astro.build/en/core-concepts/endpoints/)
- [Environment Variables in Astro](https://docs.astro.build/en/guides/environment-variables/)

---

✨ Your contact form is now ready to send emails securely with Resend!

