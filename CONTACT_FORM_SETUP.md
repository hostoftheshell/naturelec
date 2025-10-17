# Contact Form Setup Guide

This document explains how the contact form works with Botpoison protection and Formspark integration.

## 📋 Overview

The contact form includes multiple layers of protection and a smooth user experience:

- ✅ **Botpoison** - Bot protection to prevent spam
- ✅ **Honeypot field** - Additional spam detection
- ✅ **Server-side validation** - All data validated on the server
- ✅ **Client-side validation** - Immediate feedback for users
- ✅ **Formspark integration** - Email delivery service
- ✅ **French localization** - All messages in French

## 🏗️ Architecture

```
┌─────────────────┐
│  Contact Form   │
│  (Client-side)  │
└────────┬────────┘
         │
         │ 1. User submits form
         │ 2. Client validation
         │ 3. Get Botpoison solution
         │
         ▼
┌─────────────────┐
│  /api/contact   │
│  (Server-side)  │
└────────┬────────┘
         │
         │ 4. Verify Botpoison
         │ 5. Check honeypot
         │ 6. Server validation
         │
         ▼
┌─────────────────┐
│   Formspark     │
│ (Email service) │
└─────────────────┘
         │
         │ 7. Send email
         │
         ▼
      ✓ Success
```

## 🔧 Configuration

### Required Environment Variables

Add these to your `.env` file:

```bash
# Botpoison - Bot protection
PUBLIC_BOTPOISON_PUBLIC_KEY=pk_your_public_key_here
BOTPOISON_SECRET_KEY=sk_your_secret_key_here

# Formspark - Email delivery
PUBLIC_FORMSPARK_FORM_ID=https://submit-form.com/your-form-id-here
```

### Getting Your Keys

1. **Botpoison Keys**
   - Sign up at [botpoison.com](https://botpoison.com)
   - Create a project
   - Copy your public and secret keys

2. **Formspark Form ID**
   - Sign up at [formspark.io](https://formspark.io)
   - Create a new form
   - Copy the form submission URL

## 📝 Form Fields

The contact form includes the following fields:

| Field                | Type     | Required | Validation                |
| -------------------- | -------- | -------- | ------------------------- |
| **Nom et prénom**    | Text     | ✅ Yes   | Min 2 characters          |
| **Email**            | Email    | ✅ Yes   | Valid email format        |
| **Téléphone**        | Tel      | ❌ No    | 10 digits if provided     |
| **Motif de contact** | Select   | ✅ Yes   | One of predefined options |
| **Message**          | Textarea | ✅ Yes   | Min 10 characters         |
| **Consentement**     | Checkbox | ✅ Yes   | Must be checked           |

### Contact Reasons (Motifs)

- `demande-de-devis` - Demande de devis
- `installation-electrique` - Installation électrique
- `mise-en-conformite` - Mise en conformité
- `conseils-et-aide` - Conseils et aide
- `autre` - Autre

## 🔒 Security Features

### 1. Botpoison Protection

**How it works:**

- When user submits form, a challenge is generated
- Solution is included in the request
- Server verifies the solution before processing
- Invalid solutions are rejected with 403 status

**Benefits:**

- Prevents automated bot submissions
- No CAPTCHA needed (better UX)
- Invisible to legitimate users

### 2. Honeypot Field

**How it works:**

- Hidden field `_gotcha` added to form
- Bots often fill all fields automatically
- If filled, submission is rejected

**Implementation:**

```html
<input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off" />
```

### 3. Server-Side Validation

All form data is validated on the server in `/api/contact.ts`:

- Field presence checks
- Format validation (email, phone)
- Length requirements
- Allowed values verification
- Consent confirmation

## 🎨 User Experience

### Loading States

When form is submitting:

- Submit button disabled
- Button text changes to "Envoi en cours..."
- All form fields disabled
- User cannot modify or resubmit

### Success State

On successful submission:

- ✅ Green success message appears
- Form is reset to empty
- Success message auto-hides after 10 seconds
- Page scrolls to message

### Error States

If submission fails:

- ⚠️ Red error message appears
- Specific error message shown
- Form data preserved (user doesn't lose work)
- User can correct and resubmit

### Validation Errors

Client-side validation provides immediate feedback:

- Red error messages appear under invalid fields
- Errors clear when user corrects the field
- Form cannot be submitted until all errors fixed

## 🔌 API Endpoint

### POST /api/contact

Handles form submissions with full validation and bot protection.

**Request Body:**

```json
{
  "fullName": "Jean-Michel Dupont",
  "email": "jmdupont@example.com",
  "phone": "0612345678",
  "reason": "demande-de-devis",
  "message": "Je souhaiterais obtenir un devis...",
  "consent": true,
  "_botpoison": "solution_token_here",
  "_gotcha": ""
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Message envoyé avec succès!"
}
```

**Error Responses:**

**400 - Validation Error:**

```json
{
  "success": false,
  "error": "Données du formulaire invalides",
  "validationErrors": ["Le nom et prénom sont requis"]
}
```

**403 - Bot Detection:**

```json
{
  "success": false,
  "error": "Échec de la vérification anti-bot. Veuillez réessayer."
}
```

**500 - Server Error:**

```json
{
  "success": false,
  "error": "Une erreur interne est survenue."
}
```

## 🧪 Testing

### Test the Form Locally

1. **Start dev server:**

   ```bash
   npm run dev
   ```

2. **Navigate to contact page**

3. **Fill out and submit form**

4. **Check browser console** for:
   - Form submission logs
   - Botpoison solution generation
   - API response

5. **Check server logs** for:
   - Botpoison verification status
   - Formspark submission status

### Test Botpoison Protection

**Test valid submission:**

```javascript
// In browser console
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    fullName: "Test User",
    email: "test@example.com",
    reason: "autre",
    message: "Test message with valid data",
    consent: true,
    _botpoison: "valid_solution_here",
  }),
});
console.log(await response.json());
```

**Test without bot protection (should fail):**

```javascript
// Missing _botpoison field
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    fullName: "Test User",
    email: "test@example.com",
    reason: "autre",
    message: "Test message",
    consent: true,
  }),
});
// Should return 403 error
```

### Test Honeypot Protection

```javascript
// With honeypot filled (should be rejected)
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    fullName: "Bot",
    email: "bot@example.com",
    reason: "autre",
    message: "Spam message",
    consent: true,
    _gotcha: "I am a bot",
    _botpoison: "any_value",
  }),
});
// Should return 400 error
```

## 🚨 Troubleshooting

### Form Doesn't Submit

**Check:**

1. Environment variables are set correctly
2. Botpoison is configured (see `BOTPOISON_SETUP.md`)
3. Browser console for JavaScript errors
4. Network tab for failed requests

### Bot Verification Fails

**Possible causes:**

- Botpoison keys not configured
- Public key incorrect
- Secret key incorrect
- No internet connection
- Botpoison service down

**Solution:**

1. Verify `.env` has correct keys
2. Check `PUBLIC_BOTPOISON_PUBLIC_KEY` starts with `pk_`
3. Check `BOTPOISON_SECRET_KEY` starts with `sk_`
4. Restart dev server after changing `.env`

### Formspark Doesn't Send Email

**Check:**

1. `PUBLIC_FORMSPARK_FORM_ID` is set correctly
2. Formspark form is active
3. Email settings configured in Formspark dashboard
4. Check spam folder for emails

### Validation Errors Persist

**If client-side validation errors don't clear:**

- Check browser console for JavaScript errors
- Ensure form fields have correct `name` attributes
- Verify error elements have correct `data-error` attributes

## 📱 Mobile Compatibility

The form is fully responsive and includes:

- Touch-friendly input sizes
- Mobile-optimized keyboard types
- Proper viewport scaling
- Accessible labels and error messages

## ♿ Accessibility

The form follows accessibility best practices:

- Labels properly associated with inputs
- Required fields clearly marked
- Error messages announced to screen readers
- Focus management
- Keyboard navigation support
- ARIA attributes for status messages

## 🔄 Astro View Transitions

The form properly handles Astro's View Transitions:

```javascript
// Re-initialize on page navigation
document.addEventListener("astro:after-swap", handleFormSubmit);
```

This ensures the form works correctly when users navigate using View Transitions.

## 📊 Form Data Flow

1. **User fills form** → Client-side validation runs
2. **User clicks submit** → Form validated again
3. **Get Botpoison solution** → Challenge generated
4. **Submit to /api/contact** → Server receives data
5. **Verify bot protection** → Solution validated
6. **Check honeypot** → Ensure not spam
7. **Validate data** → Server-side validation
8. **Forward to Formspark** → Email sent
9. **Return success** → User sees confirmation

## 🎯 Best Practices

### Do's ✅

- Always validate on both client and server
- Use Botpoison for every submission
- Keep error messages user-friendly (French)
- Log suspicious activity
- Test form regularly
- Monitor Formspark delivery rates

### Don'ts ❌

- Don't skip server-side validation
- Don't trust client-side data
- Don't expose secret keys
- Don't disable bot protection
- Don't remove honeypot field
- Don't hardcode form endpoint

## 🔗 Related Documentation

- [BOTPOISON_SETUP.md](./BOTPOISON_SETUP.md) - Complete Botpoison guide
- [BOTPOISON_MIGRATION.md](./BOTPOISON_MIGRATION.md) - Migration guide
- [src/js/README.md](./src/js/README.md) - JavaScript utilities

## 📞 Support

For issues:

1. Check this documentation
2. Review browser console errors
3. Check server logs
4. Test with `npm run dev`
5. Verify all environment variables
6. Consult Botpoison/Formspark documentation

---

**Last Updated:** 2024  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
