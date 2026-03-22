import { Box, Container, Typography, Grid, Button, Divider, IconButton } from '@mui/material';
import { Heart, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1e0f06" />
      </svg>
    ),
  },
];

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Services', path: '/services' },
  { label: 'Donate Now', path: '/donate' },
  { label: 'Contact', path: '/contact' },
];

const CONTACT_INFO = [
  { icon: <MapPin size={15} />, text: '123 Seva Marg, Jaipur, Rajasthan 302001' },
  { icon: <Phone size={15} />, text: '+91 98765 43210' },
  { icon: <Mail size={15} />, text: 'hello@anjio.org' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#110800',
        borderTop: '1px solid rgba(212,168,67,0.15)',
        pt: { xs: 8, md: 10 },
        pb: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Nunito:wght@400;600;700&display=swap');
      `}</style>

      {/* Decorative circles */}
      <Box sx={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.06)', top: -200, right: -150, pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.05)', bottom: 80, left: -100, pointerEvents: 'none' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 5, md: 4 }}>

          {/* Column 1 — Logo + tagline + social */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#d4a843', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Heart size={20} color="#1e0f06" fill="#1e0f06" />
              </Box>
              <Box>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.4rem', color: '#fff', lineHeight: 1.1 }}>
                  Anjio
                </Typography>
                <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.65rem', color: '#d4a843', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                  Foundation
                </Typography>
              </Box>
            </Link>

            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', lineHeight: 1.8, mb: 3, fontFamily: "'Nunito', sans-serif", maxWidth: 300 }}>
              Every child deserves love, safety, and a future. We care for orphaned and underprivileged children — providing shelter, food, and education since 2006.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {SOCIAL_LINKS.map((s) => (
                <IconButton
                  key={s.label}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  sx={{
                    width: 38, height: 38,
                    color: 'rgba(255,255,255,0.55)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 2,
                    '&:hover': { color: '#d4a843', borderColor: 'rgba(212,168,67,0.4)', bgcolor: 'rgba(212,168,67,0.08)' },
                    transition: 'all 0.2s',
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Column 2 — Quick Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: 1.5, textTransform: 'uppercase', color: '#d4a843', mb: 2.5 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {QUICK_LINKS.map((link) => (
                <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                  <Typography
                    sx={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.6)',
                      display: 'flex', alignItems: 'center', gap: 0.5,
                      transition: 'color 0.2s',
                      '&:hover': { color: '#d4a843' },
                    }}
                  >
                    <ArrowRight size={12} />
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Column 3 — Contact */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: 1.5, textTransform: 'uppercase', color: '#d4a843', mb: 2.5 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {CONTACT_INFO.map((item, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 1.2, alignItems: 'flex-start' }}>
                  <Box sx={{ color: '#d4a843', mt: 0.2, flexShrink: 0 }}>{item.icon}</Box>
                  <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Column 4 — Donate CTA */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ bgcolor: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: 3, p: 3 }}>
              <Heart size={28} color="#d4a843" fill="#d4a843" style={{ marginBottom: 12 }} />
              <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.15rem', color: '#fff', mb: 1.2, lineHeight: 1.3 }}>
                Make a Difference Today
              </Typography>
              <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, mb: 2.5 }}>
                ₹101 feeds a child for a week. Your generosity changes lives.
              </Typography>
              <Button
                component={Link}
                to="/donate"
                fullWidth
                sx={{ bgcolor: '#d4a843', color: '#1e0f06', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.9rem', textTransform: 'none', py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#e0b84d' } }}
              >
                Donate Now
              </Button>
            </Box>
          </Grid>

        </Grid>

        {/* Bottom bar */}
        <Divider sx={{ borderColor: 'rgba(212,168,67,0.12)', mt: 6, mb: 0 }} />
        <Box sx={{ py: 2.5, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} Anjio Foundation. All rights reserved.
          </Typography>
          <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            Made with <Heart size={11} color="#d4a843" fill="#d4a843" /> for children who deserve better
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}