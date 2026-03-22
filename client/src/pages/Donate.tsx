'use client';

import { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Button, Grid,
  List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import { Heart, Stethoscope, BookOpen, Hammer, Users, ShieldCheck, Star } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

// ─── CONFIG — update these ────────────────────────────────────────────────────
const UPI_ID = 'yourname@upi';
const PAYEE_NAME = 'Anjio Foundation';

const AMOUNTS = [101, 501, 1001, 2001];

const CAUSES = [
  { icon: <BookOpen size={18} />, label: 'School fees, books & uniforms for children', color: '#1565c0' },
  { icon: <Stethoscope size={18} />, label: 'Free healthcare and medical camps', color: '#2e7d32' },
  { icon: <Hammer size={18} />, label: 'Skill development & vocational training', color: '#e65100' },
  { icon: <Users size={18} />, label: 'Community welfare and shelter support', color: '#c2185b' },
];

const IMPACT = [
  { amount: '₹101', impact: 'Feeds a child for a week' },
  { amount: '₹501', impact: 'Buys school books for a child' },
  { amount: '₹1001', impact: 'Covers a month of tuition' },
  { amount: '₹2001', impact: 'Sponsors a medical check-up camp' },
];

function buildUpiUri(amount: number) {
  return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR`;
}

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number>(501);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const upiUri = buildUpiUri(selectedAmount);

  return (
    <Box sx={{ bgcolor: '#fffbf5', minHeight: '100vh', fontFamily: "'Lora', serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:wght@400;500&family=Nunito:wght@400;600;700&display=swap');
      `}</style>

      {/* ══ HERO BAND ══════════════════════════════════════════════════════════ */}
      <Box
        sx={{
          pt: { xs: 16, md: 18 },
          pb: { xs: 7, md: 9 },
          background: 'linear-gradient(135deg, #1e0f06 0%, #3a1a08 60%, #2c1a0e 100%)',
          position: 'relative', overflow: 'hidden', textAlign: 'center',
        }}
      >
        <Box sx={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.08)', top: -200, right: -150, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.06)', bottom: -100, left: -80, pointerEvents: 'none' }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart size={48} color="#d4a843" fill="#d4a843" />
              </motion.div>
            </Box>
            <Typography sx={{ color: '#d4a843', fontSize: '0.78rem', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif", fontWeight: 700, mb: 1.5 }}>
              Make a Difference
            </Typography>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: { xs: '2.2rem', md: '3.4rem' }, color: '#fff', lineHeight: 1.1, mb: 2 }}>
              Support Anjio's Mission
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: "'Lora', serif", maxWidth: 500, mx: 'auto' }}>
              Every rupee you give directly shelters, feeds, and educates a child who has no one else.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* ══ IMPACT STRIP ═══════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: '#2c1a0e', py: 3 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', gap: { xs: 3, md: 6 }, overflowX: 'auto', justifyContent: { md: 'center' }, pb: { xs: 1, md: 0 } }}>
            {IMPACT.map((item, i) => (
              <Box key={i} sx={{ textAlign: 'center', flexShrink: 0 }}>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', color: '#d4a843', lineHeight: 1 }}>
                  {item.amount}
                </Typography>
                <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', mt: 0.4, whiteSpace: 'nowrap' }}>
                  {item.impact}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ══ MAIN CONTENT ═══════════════════════════════════════════════════════ */}
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
        <Grid container spacing={5} alignItems="flex-start">

          {/* ── QR + Amount selector ── */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Box sx={{ bgcolor: '#fff', borderRadius: 4, border: '1px solid rgba(212,168,67,0.2)', p: { xs: 3, md: 4 }, boxShadow: '0 4px 40px rgba(180,100,20,0.08)' }}>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.5rem', color: '#1a0a00', mb: 0.5 }}>
                  Choose Your Gift
                </Typography>
                <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.88rem', color: '#8a6040', mb: 3.5 }}>
                  Select an amount — the QR code updates automatically.
                </Typography>

                {/* Amount buttons */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5, mb: 4 }}>
                  {AMOUNTS.map((amt) => {
                    const active = selectedAmount === amt;
                    return (
                      <Button
                        key={amt}
                        onClick={() => setSelectedAmount(amt)}
                        variant={active ? 'contained' : 'outlined'}
                        size="large"
                        sx={{
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          textTransform: 'none',
                          borderRadius: 2,
                          py: 1.4,
                          ...(active
                            ? { bgcolor: '#d4a843', color: '#1a0a00', borderColor: '#d4a843', boxShadow: '0 4px 16px rgba(212,168,67,0.35)', '&:hover': { bgcolor: '#e0b84d' } }
                            : { borderColor: 'rgba(212,168,67,0.4)', color: '#5a3e28', '&:hover': { borderColor: '#d4a843', bgcolor: 'rgba(212,168,67,0.06)' } }
                          ),
                        }}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </Button>
                    );
                  })}
                </Box>

                {/* QR Code */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ p: 2.5, bgcolor: '#fff', borderRadius: 3, border: '2px solid rgba(212,168,67,0.35)', boxShadow: '0 4px 24px rgba(212,168,67,0.12)', mb: 2 }}>
                    <QRCodeSVG value={upiUri} size={190} level="H" includeMargin={false} />
                  </Box>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, px: 2.5, py: 0.8, borderRadius: 20, bgcolor: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.3)' }}>
                    <Heart size={13} color="#d4a843" fill="#d4a843" />
                    <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: '#8a5e1a' }}>
                      Donating ₹{selectedAmount.toLocaleString('en-IN')}
                    </Typography>
                  </Box>
                </Box>

                <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.82rem', color: '#8a6040', textAlign: 'center', mb: 3 }}>
                  Scan with PhonePe · Google Pay · Paytm · Any UPI app
                </Typography>

                {isMobile ? (
                  <Button
                    variant="contained" fullWidth size="large" href={upiUri}
                    sx={{ bgcolor: '#d4a843', color: '#1a0a00', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '1rem', textTransform: 'none', py: 1.5, borderRadius: 2, boxShadow: '0 4px 16px rgba(212,168,67,0.3)', '&:hover': { bgcolor: '#e0b84d' } }}
                  >
                    Pay ₹{selectedAmount.toLocaleString('en-IN')} via UPI App
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, bgcolor: '#f5f5f0', borderRadius: 2, py: 1.2, px: 2 }}>
                    <ShieldCheck size={14} color="#8a6040" />
                    <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.78rem', color: '#8a6040' }}>
                      UPI deep links open automatically on mobile devices
                    </Typography>
                  </Box>
                )}
              </Box>
            </motion.div>
          </Grid>

          {/* ── Why donate + trust badges ── */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>

              <Box sx={{ bgcolor: '#fff', borderRadius: 4, border: '1px solid rgba(212,168,67,0.2)', p: { xs: 3, md: 4 }, mb: 3, boxShadow: '0 4px 40px rgba(180,100,20,0.06)' }}>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.5rem', color: '#1a0a00', mb: 0.5 }}>
                  Where Your Money Goes
                </Typography>
                <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.88rem', color: '#8a6040', mb: 3 }}>
                  100% reaches the children — no admin cuts.
                </Typography>

                <List disablePadding>
                  {CAUSES.map(({ icon, label, color }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <ListItem disableGutters sx={{ py: 1, borderBottom: i < CAUSES.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                        <ListItemIcon sx={{ minWidth: 38 }}>
                          <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
                            {icon}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={label}
                          primaryTypographyProps={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.92rem', color: '#3a2010', fontWeight: 600 }}
                        />
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </Box>

              {/* Trust badges */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { icon: <ShieldCheck size={20} />, title: 'Registered NGO', desc: 'Legally registered under Indian law' },
                  { icon: <Star size={20} />, title: '100% Transparent', desc: 'Annual reports published publicly' },
                  { icon: <Heart size={20} />, title: '18 Years of Service', desc: '240+ children supported since 2006' },
                ].map((badge, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#fff', borderRadius: 3, border: '1px solid rgba(212,168,67,0.15)', px: 2.5, py: 1.8 }}>
                    <Box sx={{ color: '#d4a843', flexShrink: 0 }}>{badge.icon}</Box>
                    <Box>
                      <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#1a0a00' }}>{badge.title}</Typography>
                      <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem', color: '#8a6040' }}>{badge.desc}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* ══ BOTTOM CTA ═════════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: '#2c1a0e', py: { xs: 7, md: 8 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.08)', top: -120, left: -80, pointerEvents: 'none' }} />
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: { xs: '1.7rem', md: '2.2rem' }, color: '#fff', mb: 2 }}>
            Can't donate right now?
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.65)', mb: 4, lineHeight: 1.8, fontFamily: "'Lora', serif" }}>
            Share Anjio's story with someone who can. Every share helps a child find support.
          </Typography>
          <Button
            variant="outlined" size="large"
            href="https://wa.me/?text=Please support Anjio Foundation — they care for orphaned children in Rajasthan."
            target="_blank"
            sx={{ borderColor: 'rgba(212,168,67,0.5)', color: '#d4a843', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.95rem', textTransform: 'none', px: 4, py: 1.4, borderRadius: 2, '&:hover': { borderColor: '#d4a843', bgcolor: 'rgba(212,168,67,0.08)' } }}
          >
            Share on WhatsApp
          </Button>
        </Container>
      </Box>

    </Box>
  );
}