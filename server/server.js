require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

console.log('🚀 Backend Starting...');

// ─── Nodemailer Transporter (Brevo SMTP) ─────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,  // a59871001@smtp-brevo.com
    pass: process.env.EMAIL_PASS,  // your Brevo SMTP key
  },
});

// Verify transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter error:', error.message);
  } else {
    console.log('✅ Email transporter ready — emails will be sent!');
  }
});

// ─── Services ─────────────────────────────────────────────────────────────────

const services = [
  {
    _id: '1',
    title: 'Web Development',
    description: 'Custom responsive websites',
    image: 'https://images.unsplash.com/photo-1469362102473-8622cfb973cd?w=400',
    details: 'React, Node.js, Full-stack MERN development with modern UI/UX...',
    category: 'Digital'
  },
  {
    _id: '2',
    title: 'Graphic Design',
    description: 'Brand identity & logos',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400',
    details: 'Professional logos, banners, business cards, complete branding packages...',
    category: 'Creative'
  },
  {
    _id: '3',
    title: 'Digital Marketing',
    description: 'SEO & Social Media',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    details: 'Google ranking, Instagram growth, Facebook ads, complete digital strategy...',
    category: 'Marketing'
  }
];

app.get('/api/services', (req, res) => {
  console.log('📊 Services requested');
  res.json(services);
});

app.get('/api/services/:id', (req, res) => {
  const service = services.find(s => s._id === req.params.id);
  res.json(service || {});
});

// ─── Contact Form ─────────────────────────────────────────────────────────────

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  console.log('📧 NEW CONTACT:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  const mailOptions = {
    from: `"Anjio Foundation Website" <${process.env.EMAIL_USER}>`,  // Brevo's own sender (compliant)
    replyTo: `"${name}" <${email}>`,   // hitting Reply goes directly to the person who contacted you
    to: process.env.EMAIL_TO,
    subject: `New Message from ${name} — Anjio Foundation`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0c97a; border-radius: 8px; overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #1e0f06, #3a1a08); padding: 28px 32px;">
          <h2 style="color: #d4a843; margin: 0; font-size: 22px;">New Contact Form Message</h2>
          <p style="color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 13px;">Anjio Foundation Website</p>
        </div>

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

          <div style="margin-top: 28px;">
            <a href="mailto:${email}?subject=Re: Your message to Anjio Foundation"
              style="display: inline-block; background: #d4a843; color: #1a0a00; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px;">
              Reply to ${name}
            </a>
          </div>
        </div>

        <div style="background: #fffbf5; padding: 16px 32px; border-top: 1px solid #f0e8d5;">
          <p style="color: #8a6040; font-size: 12px; margin: 0;">This message was sent via the contact form on your website.</p>
        </div>

      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to', process.env.EMAIL_TO);
    return res.status(200).json({ success: true, message: "Thank you! We'll reply within 24 hours." });
  } catch (error) {
    console.error('❌ Email error:', error.message);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

// ─── Start Server ─────────────────────────────────────────────────────────────

app.listen(5000, () => {
  console.log('✅ Backend: http://localhost:5000');
  console.log('✅ API ready - test: http://localhost:5000/api/services');
});