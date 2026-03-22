// ─── Install dependencies first ───────────────────────────────────────────────
// npm install nodemailer dotenv

// ─── .env file (create this in your backend root) ────────────────────────────
// EMAIL_USER=your_gmail@gmail.com
// EMAIL_PASS=your_app_password       ← NOT your normal Gmail password (see steps below)
// EMAIL_TO=where_you_want_to_receive@gmail.com

// ─── routes/contact.js ───────────────────────────────────────────────────────

const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const mailOptions = {
    from: `"Anjio Foundation Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `New Message from ${name} — Anjio Foundation`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0c97a; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e0f06, #3a1a08); padding: 28px 32px;">
          <h2 style="color: #d4a843; margin: 0; font-size: 22px;">New Contact Form Message</h2>
          <p style="color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 13px;">Anjio Foundation Website</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d5; width: 100px;">
                <strong style="color: #8a6040; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Name</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d5;">
                <span style="color: #1a0a00; font-size: 15px;">${name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d5;">
                <strong style="color: #8a6040; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d5;">
                <a href="mailto:${email}" style="color: #d4a843; font-size: 15px;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; vertical-align: top;">
                <strong style="color: #8a6040; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Message</strong>
              </td>
              <td style="padding: 10px 0;">
                <p style="color: #1a0a00; font-size: 15px; line-height: 1.7; margin: 0;">${message}</p>
              </td>
            </tr>
          </table>

          <!-- Reply button -->
          <div style="margin-top: 28px;">
            <a href="mailto:${email}?subject=Re: Your message to Anjio Foundation"
              style="display: inline-block; background: #d4a843; color: #1a0a00; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px;">
              Reply to ${name}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #fffbf5; padding: 16px 32px; border-top: 1px solid #f0e8d5;">
          <p style="color: #8a6040; font-size: 12px; margin: 0;">This message was sent via the contact form on your website.</p>
        </div>

      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

module.exports = router;


// ─── In your main server.js / index.js, register the route ───────────────────
//
//   const contactRoute = require('./routes/contact');
//   app.use('/api/contact', contactRoute);
//
// ─────────────────────────────────────────────────────────────────────────────