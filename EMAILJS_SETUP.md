# EmailJS Setup Instructions for Contact Form

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email

## Step 2: Set up Email Service

1. Go to Email Services in your dashboard
2. Add a new service (Gmail, Outlook, etc.)
3. Connect your email account and verify

## Step 3: Create Email Template

1. Go to Email Templates
2. Create a new template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Message content
   - `{{to_email}}` - Your email (sharmashivram2006@gmail.com)

Template example:

```
Subject: {{subject}}

Hi Shiv Ram,

You have a new message from your portfolio website:

From: {{from_name}} ({{from_email}})

Message:
{{message}}

Best regards,
Portfolio Contact Form
```

## Step 4: Get Your Keys

1. Copy your Service ID
2. Copy your Template ID
3. Copy your Public Key

## Step 5: Update the Code

Replace these placeholders in your HTML file:

- `YOUR_PUBLIC_KEY` → Your EmailJS Public Key
- `YOUR_SERVICE_ID` → Your Email Service ID
- `YOUR_TEMPLATE_ID` → Your Email Template ID
- `YOUR_PHONE_NUMBER` → Your WhatsApp number (with country code, no +)

## Step 6: WhatsApp Setup

For WhatsApp integration, you have two options:

### Option A: Direct WhatsApp Link (Current Implementation)

- Just add your phone number in the code
- Messages will open WhatsApp Web or app

### Option B: WhatsApp Business API (Advanced)

- Requires WhatsApp Business API setup
- More complex but better for business use

## Step 7: Test the Form

1. Fill out the contact form on your website
2. Submit it
3. Check your email for the message
4. Check if WhatsApp opens with the message

## Security Notes

- Never expose your EmailJS Private Key in client-side code
- The Public Key is safe to use in frontend code
- Consider adding reCAPTCHA for spam protection</content>
  <parameter name="filePath">c:\Users\sharm\Desktop\Portfolio\EMAILJS_SETUP.md
