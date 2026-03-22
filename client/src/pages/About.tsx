import { useState, useRef } from 'react';
import {
  Container, Typography, Box, Button, Paper,
  TextField, Grid, MenuItem,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import {
  Phone, MessageCircle, Heart, Users,
  BookOpen, Award, CheckCircle,
  Sparkles, Mail, User, ArrowRight,
} from 'lucide-react';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const VALUES = [
  { icon: <Heart size={22} />, title: 'Compassion', desc: 'Every decision we make is driven by love for the children in our care.' },
  { icon: <Award size={22} />, title: 'Integrity', desc: 'We are transparent with donors, partners, and the communities we serve.' },
  { icon: <Users size={22} />, title: 'Community', desc: 'We believe it takes a village — families, volunteers, and donors together.' },
  { icon: <BookOpen size={22} />, title: 'Education', desc: 'We treat learning as the most powerful tool for breaking the cycle of poverty.' },
];

const MILESTONES = [
  { year: '2006', event: 'Anjio Foundation established with 8 children' },
  { year: '2010', event: 'Opened our first dedicated shelter home' },
  { year: '2015', event: 'Launched full-time education programme' },
  { year: '2019', event: 'Reached 100+ children supported milestone' },
  { year: '2023', event: '240+ children, 3 shelter homes across Rajasthan' },
];

const TEAM = [
  { name: 'Sunita Devi', role: 'Founder & Director', initials: 'SD', color: '#fdf3e8', text: '#e65100' },
  { name: 'Ramesh Kumar', role: 'Education Head', initials: 'RK', color: '#e8f4fd', text: '#1565c0' },
  { name: 'Priya Sharma', role: 'Child Welfare Officer', initials: 'PS', color: '#f0fdf4', text: '#2e7d32' },
];

const COMMUNITY_PERKS = [
  { icon: <Heart size={18} />, text: 'Monthly updates on the children you support' },
  { icon: <BookOpen size={18} />, text: 'Behind-the-scenes stories from our shelter homes' },
  { icon: <Award size={18} />, text: 'Early access to fundraising events & campaigns' },
  { icon: <Users size={18} />, text: 'Volunteer opportunities sent directly to you' },
];

// ─── SECTION LABEL ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ color: '#d4a843', fontSize: '0.78rem', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif", fontWeight: 700, mb: 1.5 }}>
      {children}
    </Typography>
  );
}

// ─── JOIN OUR COMMUNITY SECTION ───────────────────────────────────────────────

function JoinCommunity() {
  const [joinData, setJoinData] = useState({ name: '', email: '', interest: '' });
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinLoading(true);
    try {
      await axios.post('http://localhost:5000/api/community', joinData);
      setJoinSuccess(true);
      setJoinData({ name: '', email: '', interest: '' });
    } catch {
      alert('Something went wrong. Please try again.');
    }
    setJoinLoading(false);
  };

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #1e0f06 0%, #2c1a0e 50%, #3a1a08 100%)',
      }}
    >
      {/* Decorative background circles */}
      <Box sx={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.07)', top: -250, right: -200, pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.05)', bottom: -120, left: -80, pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', bgcolor: 'rgba(212,168,67,0.04)', top: 80, left: '15%', pointerEvents: 'none' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">

          {/* ── Left: Copy + Perks ── */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Icon badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'rgba(212,168,67,0.12)',
                  border: '1px solid rgba(212,168,67,0.25)',
                  borderRadius: 10,
                  px: 2,
                  py: 0.8,
                  mb: 3,
                }}
              >
                <Sparkles size={14} color="#d4a843" />
                <Typography sx={{ color: '#d4a843', fontSize: '0.75rem', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                  Be Part of the Change
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  color: '#fff',
                  lineHeight: 1.1,
                  mb: 2.5,
                }}
              >
                Join Our
                <Box component="span" sx={{ color: '#d4a843', display: 'block' }}>
                  Community
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.85,
                  mb: 5,
                  fontSize: '1rem',
                  fontFamily: "'Lora', serif",
                }}
              >
                Over <strong style={{ color: '#d4a843' }}>2,000 kind hearts</strong> already walk alongside our children every month. Join them — it takes just a name and an email.
              </Typography>

              {/* Perks list */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {COMMUNITY_PERKS.map((perk, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.8 }}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 2,
                          bgcolor: 'rgba(212,168,67,0.12)',
                          border: '1px solid rgba(212,168,67,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#d4a843',
                          flexShrink: 0,
                          mt: 0.2,
                        }}
                      >
                        {perk.icon}
                      </Box>
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.75)',
                          fontSize: '0.93rem',
                          fontFamily: "'Nunito', sans-serif",
                          lineHeight: 1.6,
                          pt: 0.6,
                        }}
                      >
                        {perk.text}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>

              {/* Social proof */}
              <Box sx={{ mt: 5, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex' }}>
                  {['#fdf3e8', '#e8f4fd', '#f0fdf4', '#fdf3e8'].map((bg, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        bgcolor: bg,
                        border: '2px solid rgba(30,15,6,0.6)',
                        ml: i === 0 ? 0 : -1.2,
                      }}
                    />
                  ))}
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', fontFamily: "'Nunito', sans-serif" }}>
                  Join <strong style={{ color: 'rgba(255,255,255,0.85)' }}>2,000+</strong> supporters already in our community
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* ── Right: Form ── */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3.5, md: 5 },
                  borderRadius: 5,
                  bgcolor: 'rgba(255,251,245,0.04)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212,168,67,0.2)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
                }}
              >
                {joinSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Box sx={{ py: 6, textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 72,
                          height: 72,
                          borderRadius: '50%',
                          bgcolor: 'rgba(212,168,67,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                        }}
                      >
                        <CheckCircle size={36} color="#d4a843" />
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          fontSize: '1.6rem',
                          color: '#fff',
                          mb: 1.5,
                        }}
                      >
                        Welcome to the Family! 🙏
                      </Typography>
                      <Typography sx={{ fontFamily: "'Nunito', sans-serif", color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                        You're now part of our community. Watch your inbox — our next update will reach you soon.
                      </Typography>
                    </Box>
                  </motion.div>
                ) : (
                  <>
                    <Typography
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        color: '#fff',
                        mb: 0.5,
                      }}
                    >
                      Sign Up — It's Free
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Nunito', sans-serif",
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: '0.88rem',
                        mb: 4,
                      }}
                    >
                      No spam, ever. Unsubscribe at any time.
                    </Typography>

                    <Box component="form" onSubmit={handleJoinSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                      {/* Name field */}
                      <Box sx={{ position: 'relative' }}>
                        <Box sx={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(212,168,67,0.6)', zIndex: 1, pointerEvents: 'none' }}>
                          <User size={16} />
                        </Box>
                        <TextField
                          fullWidth
                          placeholder="Your full name"
                          value={joinData.name}
                          onChange={(e) => setJoinData({ ...joinData, name: e.target.value })}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(255,255,255,0.05)',
                              borderRadius: 2.5,
                              pl: 2.5,
                              '& fieldset': { borderColor: 'rgba(212,168,67,0.2)' },
                              '&:hover fieldset': { borderColor: 'rgba(212,168,67,0.4)' },
                              '&.Mui-focused fieldset': { borderColor: '#d4a843' },
                            },
                            '& input': {
                              color: '#fff',
                              fontFamily: "'Nunito', sans-serif",
                              fontSize: '0.95rem',
                              pl: 2,
                              '&::placeholder': { color: 'rgba(255,255,255,0.3)' },
                            },
                          }}
                        />
                      </Box>

                      {/* Email field */}
                      <Box sx={{ position: 'relative' }}>
                        <Box sx={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(212,168,67,0.6)', zIndex: 1, pointerEvents: 'none' }}>
                          <Mail size={16} />
                        </Box>
                        <TextField
                          fullWidth
                          type="email"
                          placeholder="Your email address"
                          value={joinData.email}
                          onChange={(e) => setJoinData({ ...joinData, email: e.target.value })}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(255,255,255,0.05)',
                              borderRadius: 2.5,
                              pl: 2.5,
                              '& fieldset': { borderColor: 'rgba(212,168,67,0.2)' },
                              '&:hover fieldset': { borderColor: 'rgba(212,168,67,0.4)' },
                              '&.Mui-focused fieldset': { borderColor: '#d4a843' },
                            },
                            '& input': {
                              color: '#fff',
                              fontFamily: "'Nunito', sans-serif",
                              fontSize: '0.95rem',
                              pl: 2,
                              '&::placeholder': { color: 'rgba(255,255,255,0.3)' },
                            },
                          }}
                        />
                      </Box>

                      {/* Interest dropdown */}
                      <TextField
                        fullWidth
                        select
                        value={joinData.interest}
                        onChange={(e) => setJoinData({ ...joinData, interest: e.target.value })}
                        SelectProps={{
                          displayEmpty: true,
                          renderValue: (val: unknown) =>
                            val ? (
                              <span style={{ color: '#fff', fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem' }}>
                                {{ volunteer: 'Volunteer at a shelter home', donate: 'Make a donation', sponsor: "Sponsor a child's education", awareness: 'Spread awareness', other: 'Just staying informed' }[val as string]}
                              </span>
                            ) : (
                              <span style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem' }}>
                                How would you like to help?
                              </span>
                            ),
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                bgcolor: '#2c1a0e',
                                border: '1px solid rgba(212,168,67,0.25)',
                                borderRadius: 2,
                                mt: 0.5,
                                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                                '& .MuiMenuItem-root': {
                                  fontFamily: "'Nunito', sans-serif",
                                  fontSize: '0.93rem',
                                  color: 'rgba(255,255,255,0.75)',
                                  py: 1.2,
                                  px: 2.5,
                                  '&:hover': { bgcolor: 'rgba(212,168,67,0.12)', color: '#fff' },
                                  '&.Mui-selected': { bgcolor: 'rgba(212,168,67,0.18)', color: '#d4a843', '&:hover': { bgcolor: 'rgba(212,168,67,0.22)' } },
                                },
                              },
                            },
                          },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            bgcolor: 'rgba(255,255,255,0.05)',
                            borderRadius: 2.5,
                            '& fieldset': { borderColor: 'rgba(212,168,67,0.2)' },
                            '&:hover fieldset': { borderColor: 'rgba(212,168,67,0.4)' },
                            '&.Mui-focused fieldset': { borderColor: '#d4a843' },
                          },
                          '& .MuiSelect-icon': { color: 'rgba(212,168,67,0.6)' },
                        }}
                      >
                        <MenuItem value="volunteer">Volunteer at a shelter home</MenuItem>
                        <MenuItem value="donate">Make a donation</MenuItem>
                        <MenuItem value="sponsor">Sponsor a child's education</MenuItem>
                        <MenuItem value="awareness">Spread awareness</MenuItem>
                        <MenuItem value="other">Just staying informed</MenuItem>
                      </TextField>

                      {/* Submit button */}
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={joinLoading}
                        size="large"
                        endIcon={!joinLoading && <ArrowRight size={18} />}
                        sx={{
                          mt: 0.5,
                          bgcolor: '#d4a843',
                          color: '#1a0a00',
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: 800,
                          fontSize: '1rem',
                          textTransform: 'none',
                          py: 1.7,
                          borderRadius: 2.5,
                          boxShadow: '0 6px 24px rgba(212,168,67,0.35)',
                          transition: 'all 0.25s',
                          '&:hover': {
                            bgcolor: '#e0b84d',
                            boxShadow: '0 8px 32px rgba(212,168,67,0.5)',
                            transform: 'translateY(-1px)',
                          },
                          '&:disabled': { bgcolor: 'rgba(212,168,67,0.35)', color: 'rgba(26,10,0,0.6)' },
                        }}
                      >
                        {joinLoading ? 'Joining...' : 'Join Our Community'}
                      </Button>

                      {/* Privacy note */}
                      <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', fontFamily: "'Nunito', sans-serif" }}>
                        🔒 We respect your privacy. No spam, ever.
                      </Typography>
                    </Box>
                  </>
                )}
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function About() {
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true });

  return (
    <Box sx={{ fontFamily: "'Lora', Georgia, serif", bgcolor: '#fffbf5' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lora:wght@400;500&family=Nunito:wght@400;600;700&display=swap');
      `}</style>

      {/* ══ HERO BAND ═══════════════════════════════════════════════════════════ */}
      <Box
        sx={{
          pt: { xs: 16, md: 18 },
          pb: { xs: 8, md: 10 },
          background: 'linear-gradient(135deg, #1e0f06 0%, #3a1a08 60%, #2c1a0e 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.08)', top: -200, right: -150, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.06)', bottom: -80, left: -60, pointerEvents: 'none' }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <SectionLabel>Our Story</SectionLabel>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: { xs: '2.4rem', md: '3.8rem' }, color: '#fff', lineHeight: 1.1, mb: 3, maxWidth: 680 }}>
              18 Years of Caring for Children Who Have No One
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 560, lineHeight: 1.8, fontFamily: "'Lora', serif" }}>
              Anjio Foundation was born from a simple belief — that no child should be denied love, shelter, food, or education simply because of the circumstances they were born into.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* ══ MISSION + IMAGE ═════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: '#fffbf5', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <SectionLabel>Who We Are</SectionLabel>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, color: '#1a0a00', lineHeight: 1.2, mb: 3 }}>
                  A Home Built on Love, Not Pity
                </Typography>
                <Typography sx={{ color: '#5a3e28', lineHeight: 1.85, mb: 2.5, fontSize: '1rem' }}>
                  Founded in 2006 in Jaipur, Rajasthan, Anjio Foundation started with just 8 orphaned children and a rented room. Today we run 3 shelter homes caring for 240+ children across Rajasthan.
                </Typography>
                <Typography sx={{ color: '#5a3e28', lineHeight: 1.85, mb: 4, fontSize: '1rem' }}>
                  We don't just meet immediate needs — we invest in each child's long-term future, covering schooling, vocational training, healthcare, and emotional well-being until they are ready to stand independently.
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  {[{ n: '240+', l: 'Children' }, { n: '18', l: 'Years' }, { n: '3', l: 'Homes' }, { n: '95%', l: 'School rate' }].map((s) => (
                    <Box key={s.l} sx={{ textAlign: 'center' }}>
                      <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: '1.8rem', color: '#d4a843', lineHeight: 1 }}>{s.n}</Typography>
                      <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.78rem', color: '#8a6040', textTransform: 'uppercase', letterSpacing: 1 }}>{s.l}</Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
                <Box sx={{ position: 'relative' }}>
                  <Box component="img" src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80" alt="Anjio children" sx={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 4, display: 'block' }} />
                  <Box sx={{ position: 'absolute', bottom: -20, right: -16, bgcolor: '#d4a843', color: '#1a0a00', borderRadius: 3, px: 3, py: 2, boxShadow: '0 8px 32px rgba(212,168,67,0.4)' }}>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>2006</Typography>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>Est. in Jaipur</Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ══ VALUES ══════════════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: '#fff', py: { xs: 8, md: 10 } }} ref={valuesRef}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <SectionLabel>What Guides Us</SectionLabel>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, color: '#1a0a00' }}>
              Our Core Values
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {VALUES.map((v, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <Box sx={{ bgcolor: '#fffbf5', border: '1px solid rgba(212,168,67,0.2)', borderRadius: 4, p: 3.5, height: '100%', transition: 'transform 0.25s, box-shadow 0.25s', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 8px 32px rgba(180,100,20,0.1)' } }}>
                    <Box sx={{ width: 46, height: 46, borderRadius: 2, bgcolor: 'rgba(212,168,67,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4a843', mb: 2 }}>
                      {v.icon}
                    </Box>
                    <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#1a0a00', mb: 1 }}>{v.title}</Typography>
                    <Typography sx={{ color: '#5a3e28', fontSize: '0.88rem', lineHeight: 1.7 }}>{v.desc}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══ TIMELINE ════════════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: '#fffbf5', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <SectionLabel>Our Journey</SectionLabel>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, color: '#1a0a00' }}>
              Milestones
            </Typography>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ position: 'absolute', left: { xs: 18, md: '50%' }, top: 0, bottom: 0, width: 2, bgcolor: 'rgba(212,168,67,0.25)', transform: { md: 'translateX(-50%)' } }} />
            {MILESTONES.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: i % 2 === 0 ? 'row' : 'row-reverse' }, alignItems: 'center', mb: 4, gap: { xs: 3, md: 0 } }}>
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: { md: i % 2 === 0 ? 'flex-end' : 'flex-start' }, pl: { xs: 2, md: i % 2 === 0 ? 0 : 4 }, pr: { md: i % 2 === 0 ? 4 : 0 } }}>
                    <Box sx={{ bgcolor: '#fff', border: '1px solid rgba(212,168,67,0.2)', borderRadius: 3, px: 3, py: 2, maxWidth: 280, boxShadow: '0 2px 16px rgba(180,100,20,0.06)' }}>
                      <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.2rem', color: '#d4a843', mb: 0.5 }}>{m.year}</Typography>
                      <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', color: '#5a3e28', lineHeight: 1.6 }}>{m.event}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, width: 16, height: 16, borderRadius: '50%', bgcolor: '#d4a843', border: '3px solid #fffbf5', boxShadow: '0 0 0 2px #d4a843', zIndex: 1, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }} />
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ══ TEAM ════════════════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: '#fff', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <SectionLabel>The People</SectionLabel>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, color: '#1a0a00' }}>
              Our Team
            </Typography>
          </Box>
          <Grid container spacing={3} justifyContent="center">
            {TEAM.map((t, i) => (
              <Grid size={{ xs: 12, sm: 4, md: 4 }} key={i}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <Box sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, border: '3px solid rgba(212,168,67,0.25)' }}>
                      <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.3rem', color: t.text }}>{t.initials}</Typography>
                    </Box>
                    <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#1a0a00', mb: 0.3 }}>{t.name}</Typography>
                    <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.83rem', color: '#8a6040' }}>{t.role}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══ JOIN OUR COMMUNITY ══════════════════════════════════════════════════ */}
      <JoinCommunity />

    </Box>
  );
}