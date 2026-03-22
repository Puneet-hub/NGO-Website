'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen, Utensils, Home as HomeIcon, ArrowRight, Quote } from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const slides = [
  {
    tag: 'Every child deserves a future',
    title: 'Giving Orphaned\nChildren a Home',
    subtitle: 'We house, feed, and educate children who have no one — because every child deserves love, safety, and a chance to dream.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80',
    bg: '#7c3a1e',
    cta: 'Meet Our Children',
  },
  {
    tag: 'Education is the greatest gift',
    title: 'Learning Changes\nEverything',
    subtitle: 'From basic literacy to higher studies — we walk beside each child every step of the way, covering books, fees, and mentoring.',
    image: 'https://images.unsplash.com/photo-1526958097901-5e6d742d3371?w=1400&q=80',
    bg: '#1a3a4a',
    cta: 'Our Education Work',
  },
  {
    tag: 'No child goes to bed hungry',
    title: 'Three Meals,\nEvery Day',
    subtitle: 'Nutritious food is the foundation of everything. We provide daily meals so children can focus on growing, playing, and learning.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1400&q=80',
    bg: '#2d4a1a',
    cta: 'Support Our Mission',
  },
];

const stats = [
  { number: '240+', label: 'Children Supported', icon: <Heart size={22} /> },
  { number: '18', label: 'Years of Service', icon: <HomeIcon size={22} /> },
  { number: '95%', label: 'School Completion', icon: <BookOpen size={22} /> },
  { number: '3×', label: 'Daily Meals Provided', icon: <Utensils size={22} /> },
];

const programs = [
  {
    icon: <BookOpen size={28} />,
    title: 'Education Support',
    desc: 'School fees, books, uniforms, and dedicated tutors for every child in our care.',
    color: '#e8f4fd',
    accent: '#1565c0',
  },
  {
    icon: <Utensils size={28} />,
    title: 'Nutrition & Meals',
    desc: 'Three balanced meals daily, prepared with love in our own kitchen.',
    color: '#fdf3e8',
    accent: '#e65100',
  },
  {
    icon: <HomeIcon size={28} />,
    title: 'Safe Shelter',
    desc: 'A warm, secure home where children feel safe, valued, and never alone.',
    color: '#f0fdf4',
    accent: '#2e7d32',
  },
  {
    icon: <Heart size={28} />,
    title: 'Financial Aid',
    desc: 'Emergency support, medical care, and long-term financial stability for each child.',
    color: '#fdf0f5',
    accent: '#c2185b',
  },
];

const testimonials = [
  {
    quote: "Anjio gave me a family when I had none. Today I am in college because of their support and love.",
    name: "Ravi, 19",
    role: "Former resident, now pursuing Engineering",
    initials: "R",
    color: '#e8f4fd',
    textColor: '#1565c0',
  },
  {
    quote: "We sponsor two children through Anjio. Seeing them thrive has been the most meaningful thing we have ever done.",
    name: "Priya & Suresh Sharma",
    role: "Monthly donors since 2019",
    initials: "PS",
    color: '#fdf3e8',
    textColor: '#e65100',
  },
];

// ─── ANIMATED STAT ────────────────────────────────────────────────────────────

function AnimatedStat({ number, label, icon }: { number: string; label: string; icon: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ textAlign: 'center', px: 2 }}>
        <Box sx={{ color: '#d4a843', mb: 1, display: 'flex', justifyContent: 'center' }}>{icon}</Box>
        <Typography sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, fontWeight: 800, color: '#fff', lineHeight: 1, fontFamily: "'Playfair Display', Georgia, serif" }}>
          {number}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', mt: 0.5, letterSpacing: 0.5, fontFamily: "'Nunito', sans-serif" }}>
          {label}
        </Typography>
      </Box>
    </motion.div>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const programsRef = useRef(null);
  const programsInView = useInView(programsRef, { once: true });

  const SLIDE_DURATION = 5000;

  useEffect(() => {
    setProgress(0);
    const step = 50;
    const increment = (step / SLIDE_DURATION) * 100;
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setCurrentSlide(prev => (prev + 1) % slides.length);
          return 0;
        }
        return p + increment;
      });
    }, step);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <Box sx={{ fontFamily: "'Lora', Georgia, serif", overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lora:wght@400;500&family=Nunito:wght@400;600;700&display=swap');
      `}</style>

      {/* ══ HERO SLIDER ═══════════════════════════════════════════════════════ */}
      <Box sx={{ height: '100vh', position: 'relative', overflow: 'hidden', minHeight: 560 }}>

        <AnimatePresence mode="wait">
          {slides.map((slide, index) =>
            index === currentSlide ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center top', backgroundColor: slide.bg }} />
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.45) 55%, rgba(10,10,10,0.12) 100%)' }} />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, rgba(180,100,20,0.22) 0%, transparent 100%)' }} />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
          <Container maxWidth="lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
              >
                {/* Tag */}
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, px: 2, py: 0.6, borderRadius: 20, border: '1px solid rgba(212,168,67,0.6)', bgcolor: 'rgba(212,168,67,0.12)', mb: 3 }}>
                  <Heart size={12} color="#d4a843" fill="#d4a843" />
                  <Typography sx={{ color: '#d4a843', fontSize: '0.78rem', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
                    {slides[currentSlide].tag}
                  </Typography>
                </Box>

                {/* Headline */}
                <Typography sx={{ color: '#fff', fontSize: { xs: '2.6rem', sm: '3.5rem', md: '5rem' }, fontWeight: 900, lineHeight: 1.08, mb: 3, fontFamily: "'Playfair Display', Georgia, serif", whiteSpace: 'pre-line', textShadow: '0 2px 20px rgba(0,0,0,0.4)', maxWidth: 680 }}>
                  {slides[currentSlide].title}
                </Typography>

                {/* Subtitle */}
                <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: { xs: '1rem', md: '1.15rem' }, maxWidth: 520, lineHeight: 1.75, mb: 5, fontFamily: "'Lora', Georgia, serif" }}>
                  {slides[currentSlide].subtitle}
                </Typography>

                {/* Buttons */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    href="/donate"
                    endIcon={<Heart size={16} fill="currentColor" />}
                    sx={{ bgcolor: '#d4a843', color: '#1a0a00', fontWeight: 700, fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', px: 3.5, py: 1.4, borderRadius: 2, textTransform: 'none', boxShadow: '0 4px 20px rgba(212,168,67,0.4)', '&:hover': { bgcolor: '#e0b84d' } }}
                  >
                    Donate Now
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    href="/services"
                    endIcon={<ArrowRight size={16} />}
                    sx={{ borderColor: 'rgba(255,255,255,0.55)', color: '#fff', fontWeight: 600, fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', px: 3.5, py: 1.4, borderRadius: 2, textTransform: 'none', backdropFilter: 'blur(6px)', bgcolor: 'rgba(255,255,255,0.07)', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.14)' } }}
                  >
                    {slides[currentSlide].cta}
                  </Button>
                </Box>
              </motion.div>
            </AnimatePresence>
          </Container>
        </Box>

        {/* Vertical nav dots */}
        <Box sx={{ position: 'absolute', right: { xs: 16, md: 40 }, top: '50%', transform: 'translateY(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
          {slides.map((_, i) => (
            <Box key={i} onClick={() => { setCurrentSlide(i); setProgress(0); }}
              sx={{ width: 4, height: i === currentSlide ? 40 : 20, borderRadius: 2, bgcolor: i === currentSlide ? '#d4a843' : 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'all 0.4s ease' }}
            />
          ))}
        </Box>

        {/* Progress bar */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, bgcolor: 'rgba(255,255,255,0.15)', zIndex: 3 }}>
          <Box sx={{ height: '100%', width: `${progress}%`, bgcolor: '#d4a843', transition: 'width 0.05s linear' }} />
        </Box>

        {/* Slide counter */}
        <Box sx={{ position: 'absolute', bottom: 24, right: { xs: 16, md: 40 }, zIndex: 3 }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontFamily: "'Nunito', sans-serif" }}>
            <Box component="span" sx={{ color: '#d4a843', fontWeight: 700 }}>{String(currentSlide + 1).padStart(2, '0')}</Box>
            {' / '}{String(slides.length).padStart(2, '0')}
          </Typography>
        </Box>
      </Box>

      {/* ══ STATS STRIP ═══════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: '#2c1a0e', py: { xs: 5, md: 6 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {stats.map((s, i) => (
              <Grid size={{ xs: 6, md: 3 }} key={i}>
                <AnimatedStat {...s} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══ ABOUT / MISSION ════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: '#fffbf5', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <Typography sx={{ color: '#d4a843', fontSize: '0.78rem', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif", fontWeight: 700, mb: 1.5 }}>
                  Who We Are
                </Typography>
                <Typography sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 800, fontFamily: "'Playfair Display', serif", lineHeight: 1.2, color: '#1a0a00', mb: 3 }}>
                  A Home Built on Love,<br />Not Pity
                </Typography>
                <Typography sx={{ color: '#5a3e28', lineHeight: 1.85, mb: 3, fontSize: '1.05rem' }}>
                  Anjio was founded with one belief — that every child, regardless of circumstance, deserves a safe home, a full meal, and a quality education. We work with orphaned and underprivileged children, walking beside them from childhood into adulthood.
                </Typography>
                <Typography sx={{ color: '#5a3e28', lineHeight: 1.85, mb: 4, fontSize: '1.05rem' }}>
                  We don't just meet immediate needs. We invest in each child's long-term future — covering school fees, vocational training, and emotional well-being.
                </Typography>
                <Button href="/about" endIcon={<ArrowRight size={16} />}
                  sx={{ color: '#d4a843', fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: 'none', fontSize: '1rem', p: 0, '&:hover': { bgcolor: 'transparent', color: '#b8882e' } }}>
                  Learn our full story
                </Button>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
                <Box sx={{ position: 'relative' }}>
                  <Box component="img"
                    src="https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=700&q=80"
                    alt="Children at Anjio"
                    sx={{ width: '100%', borderRadius: 4, display: 'block', objectFit: 'cover', height: 420 }}
                  />
                  <Box sx={{ position: 'absolute', bottom: -24, left: -20, bgcolor: '#d4a843', color: '#1a0a00', borderRadius: 3, px: 3, py: 2, boxShadow: '0 8px 32px rgba(212,168,67,0.35)' }}>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>18+</Typography>
                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>Years of Care</Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ══ PROGRAMS ══════════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: '#fff', py: { xs: 8, md: 12 } }} ref={programsRef}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography sx={{ color: '#d4a843', fontSize: '0.78rem', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif", fontWeight: 700, mb: 1.5 }}>
              What We Do
            </Typography>
            <Typography sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 800, fontFamily: "'Playfair Display', serif", color: '#1a0a00' }}>
              Our Programs
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {programs.map((p, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={programsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <Box sx={{ bgcolor: p.color, borderRadius: 4, p: 3.5, height: '100%', transition: 'transform 0.25s', '&:hover': { transform: 'translateY(-6px)' } }}>
                    <Box sx={{ color: p.accent, mb: 2 }}>{p.icon}</Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', mb: 1.5, fontFamily: "'Nunito', sans-serif", color: '#1a0a00' }}>{p.title}</Typography>
                    <Typography sx={{ color: '#5a3e28', fontSize: '0.9rem', lineHeight: 1.7 }}>{p.desc}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══ TESTIMONIALS ══════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: '#fffbf5', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography sx={{ color: '#d4a843', fontSize: '0.78rem', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif", fontWeight: 700, mb: 1.5 }}>
              Voices
            </Typography>
            <Typography sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 800, fontFamily: "'Playfair Display', serif", color: '#1a0a00' }}>
              Stories That Drive Us
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {testimonials.map((t, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={i}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}>
                  <Box sx={{ bgcolor: '#fff', borderRadius: 4, p: 4, height: '100%', boxShadow: '0 2px 24px rgba(180,100,20,0.08)' }}>
                    <Quote size={28} color="#d4a843" style={{ marginBottom: 16, opacity: 0.7 }} />
                    <Typography sx={{ fontStyle: 'italic', lineHeight: 1.8, color: '#3a2010', mb: 3, fontSize: '1rem', fontFamily: "'Lora', serif" }}>
                      "{t.quote}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 42, height: 42, borderRadius: '50%', bgcolor: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: t.textColor, fontFamily: "'Nunito', sans-serif" }}>{t.initials}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a0a00', fontFamily: "'Nunito', sans-serif" }}>{t.name}</Typography>
                        <Typography sx={{ fontSize: '0.78rem', color: '#8a6040' }}>{t.role}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══ DONATE CTA ════════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: '#2c1a0e', py: { xs: 8, md: 10 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.1)', top: -150, left: -100 }} />
        <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.08)', bottom: -120, right: -60 }} />
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <Heart size={36} color="#d4a843" fill="#d4a843" style={{ marginBottom: 16 }} />
          <Typography sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 800, fontFamily: "'Playfair Display', serif", color: '#fff', mb: 2 }}>
            Change a Child's Life Today
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 5, lineHeight: 1.8, fontSize: '1.05rem' }}>
            Even ₹101 a month provides nutritious meals for a child for a week. Your kindness, however small, creates a ripple that lasts a lifetime.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" href="/donate"
              sx={{ bgcolor: '#d4a843', color: '#1a0a00', fontWeight: 700, fontFamily: "'Nunito', sans-serif", fontSize: '1rem', px: 4, py: 1.5, borderRadius: 2, textTransform: 'none', boxShadow: '0 4px 20px rgba(212,168,67,0.35)', '&:hover': { bgcolor: '#e0b84d' } }}>
              Donate Now
            </Button>
            <Button variant="outlined" size="large" href="/contact"
              sx={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff', fontFamily: "'Nunito', sans-serif", fontSize: '1rem', px: 4, py: 1.5, borderRadius: 2, textTransform: 'none', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' } }}>
              Get Involved
            </Button>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}