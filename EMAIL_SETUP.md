# 📧 Email Setup Complete! ✅

## ✨ What's Been Configured

Your contact form is now fully configured to send emails using **Resend** and **axios**!

### Files Created/Modified:
1. ✅ `src/pages/api/send-email.ts` - API endpoint that sends emails via Resend
2. ✅ `src/components/ContactForm.astro` - Contact form with validation and error handling
3. ✅ `.env` - Environment variables with your Resend API key
4. ✅ `.gitignore` - Ensures `.env` is never committed to git
5. ✅ `astro.config.mjs` - Updated to support API routes

---

## 🚀 How to Test It Right Now

### Step 1: Start the dev server
```bash
npm run dev
```

### Step 2: Open your browser
Navigate to your contact form (usually at `http://localhost:4321`)

### Step 3: Fill out the form
- **Name**: Your name
- **Email**: Your email address
- **Subject**: Test email
- **Phone**: (optional)
- **Message**: Test message

### Step 4: Click "Enviar"
You should see:
- Button changes to "Enviando..."
- Success message appears in green
- Email is sent to `info@profiber.com`

---

## ⚙️ Configuration

### Change Recipient Email
Open `src/pages/api/send-email.ts` and find line 51:

```typescript
to: ['info@profiber.com'], // ← Change this to your email!
```

### Change Sender Email (For Production)
Line 50:
```typescript
from: 'ProFiber <onboarding@resend.dev>', // ← For production, use your verified domain
```

**Note:** `onboarding@resend.dev` is Resend's test domain and works right away. For production, verify your own domain at https://resend.com/domains

---

## 🔐 Security Features

✅ **API Key in Environment Variables** - Never exposed to the client  
✅ **Server-side Processing** - Email sending happens on the server  
✅ **Input Validation** - Email format and required fields checked  
✅ **Error Handling** - Graceful error messages for users  
✅ **Gitignore Protection** - `.env` file is excluded from git  

---

## 📝 Form Fields Captured

Your email template includes all these fields:
- ✉️ Name (required)
- 📧 Email (required, validated)
- 📋 Subject (required)
- 📱 Phone (optional)
- 💬 Message (required)

---

## 🎨 User Experience Features

- **Loading State**: "Enviando..." appears while sending
- **Success Message**: Green notification when email is sent
- **Error Messages**: Red notification if something fails
- **Form Reset**: Clears automatically after success
- **Reply-to**: Emails have the customer's email as reply-to

---

## 🛠️ How It Works

1. **User fills form** → Data collected in ContactForm.astro
2. **Form submits** → JavaScript sends POST to `/api/send-email`
3. **API validates** → Checks required fields and email format
4. **Axios sends to Resend** → Makes POST request to `https://api.resend.com/emails`
5. **Email delivered** → Sent to your configured recipient
6. **User sees success** → Green confirmation message appears

---

## 🐛 Troubleshooting

### "Error al enviar el correo"
- ✅ Check that `.env` file exists with `RESEND_API_KEY=re_X2feMn2n_G5szouHCkY1XcmhPD3ZN8LPw`
- ✅ Restart dev server after creating `.env`
- ✅ Check browser console for errors

### Email not arriving
- ✅ Check spam folder
- ✅ Verify the `to` email address in `send-email.ts` line 51
- ✅ Check Resend dashboard for email logs: https://resend.com/emails

### API endpoint not found
- ✅ Make sure `astro.config.mjs` has `output: 'hybrid'`
- ✅ Restart dev server

---

## 🌐 Production Deployment

Before deploying:

### 1. Add environment variable to your host
**Vercel:**
```
Dashboard → Settings → Environment Variables → Add
RESEND_API_KEY = 
```

**Netlify:**
```
Site settings → Environment variables → Add variable
RESEND_API_KEY = 
```

### 2. Verify your domain (recommended)
1. Go to https://resend.com/domains
2. Add your domain
3. Add DNS records
4. Update `from` email in `send-email.ts`

### 3. Update recipient email
Change line 51 in `send-email.ts` to your actual business email

---

## 📚 API Reference

### Endpoint: `/api/send-email`
**Method:** POST  
**Content-Type:** application/json

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Interested in services",
  "phone": "555-1234",
  "message": "I would like to know more..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "¡Mensaje enviado exitosamente!",
  "data": { "id": "email_id" }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message in Spanish"
}
```

---

## 🎉 You're All Set!

Your contact form is ready to send emails securely using:
- ✅ **Axios** for HTTP requests
- ✅ **Resend** for email delivery
- ✅ **Environment variables** for security
- ✅ **Beautiful email templates** with your brand colors

Just run `npm run dev` and test it out! 🚀

