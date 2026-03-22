import { useState } from 'react';
import {
  Container, Typography, Box, Button, Chip,
  CircularProgress, Grid, Modal, IconButton, TextField, Paper,
} from '@mui/material';
import { ArrowLeft, X, MessageCircle, ChevronDown, Heart, Users, BookOpen, Stethoscope, Phone, CheckCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import useServices, { Service } from '../hooks/useServices';

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<string, { icon: React.ReactNode; color: string; accent: string; tagline: string }> = {
  'Nari Sashaktikaran': {
    icon: <Users size={28} />,
    color: '#fdf0f5',
    accent: '#c2185b',
    tagline: 'Empowering women through skill, confidence, and independence.',
  },
  'Bal Kalyan': {
    icon: <Heart size={28} />,
    color: '#fdf3e8',
    accent: '#e65100',
    tagline: 'Nurturing children with love, safety, and opportunity.',
  },
  'Shiksha Seva': {
    icon: <BookOpen size={28} />,
    color: '#e8f4fd',
    accent: '#1565c0',
    tagline: 'Quality education for every child, regardless of background.',
  },
  'Swasthya Seva': {
    icon: <Stethoscope size={28} />,
    color: '#f0fdf4',
    accent: '#2e7d32',
    tagline: 'Free healthcare and wellness support for underprivileged communities.',
  },
};

function getCategoryConfig(cat: string) {
  return CATEGORY_CONFIG[cat] ?? {
    icon: <Heart size={28} />,
    color: '#f5f5f5',
    accent: '#5a3e28',
    tagline: 'Supporting communities with care and dedication.',
  };
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, accent, onSelect }: { service: Service; accent: string; onSelect: (s: Service) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      style={{ height: '100%' }}
    >
      <Box
        onClick={() => onSelect(service)}
        sx={{
          height: '100%', bgcolor: '#fff', borderRadius: 3,
          border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden',
          cursor: 'pointer', display: 'flex', flexDirection: 'column',
          transition: 'box-shadow 0.25s',
          '&:hover': { boxShadow: '0 8px 32px rgba(0,0,0,0.1)' },
        }}
      >
        {service.image && (
          <Box component="img" src={service.image} alt={service.title}
            sx={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
          />
        )}
        <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#1a0a00', mb: 1 }}>
            {service.title}
          </Typography>
          <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.85rem', color: '#5a3e28', lineHeight: 1.65, flex: 1, mb: 2 }}>
            {service.description}
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: "'Nunito', sans-serif", color: accent }}>
            Learn more →
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}

// ─── Category Section (accordion) ────────────────────────────────────────────

function CategorySection({ category, services, onSelect }: { category: string; services: Service[]; onSelect: (s: Service) => void }) {
  const [open, setOpen] = useState(false);
  const cfg = getCategoryConfig(category);

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        onClick={() => setOpen((p) => !p)}
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          bgcolor: cfg.color, border: `1px solid ${cfg.accent}22`,
          borderRadius: open ? '16px 16px 0 0' : 3,
          px: { xs: 2.5, md: 4 }, py: 2.5, cursor: 'pointer',
          transition: 'all 0.25s',
          '&:hover': { boxShadow: `0 4px 20px ${cfg.accent}18` },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 52, height: 52, borderRadius: '50%', bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: cfg.accent, boxShadow: `0 2px 12px ${cfg.accent}25`, flexShrink: 0 }}>
            {cfg.icon}
          </Box>
          <Box>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.35rem' }, color: '#1a0a00', lineHeight: 1.2 }}>
              {category}
            </Typography>
            <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.82rem', color: '#5a3e28', mt: 0.3 }}>
              {cfg.tagline}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
          <Chip
            label={`${services.length} ${services.length === 1 ? 'service' : 'services'}`}
            size="small"
            sx={{ bgcolor: cfg.accent, color: '#fff', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.75rem' }}
          />
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={22} color={cfg.accent} />
          </motion.div>
        </Box>
      </Box>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <Box
              sx={{
                bgcolor: `${cfg.color}99`,
                border: `1px solid ${cfg.accent}22`,
                borderTop: 'none',
                borderRadius: '0 0 16px 16px',
                p: { xs: 2.5, md: 3.5 },
              }}
            >
              <Grid container spacing={2.5}>
                {services.map((svc) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={svc._id}>
                    <ServiceCard service={svc} accent={cfg.accent} onSelect={onSelect} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

// ─── Service Detail Modal ─────────────────────────────────────────────────────

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const cfg = getCategoryConfig(service.category ?? '');

  return (
    <Modal open onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '95vw', sm: '80vw', md: 620 }, maxHeight: '90vh', bgcolor: '#fffbf5', borderRadius: 4, overflowY: 'auto', outline: 'none' }}>
        {service.image ? (
          <Box sx={{ position: 'relative' }}>
            <Box component="img" src={service.image} alt={service.title}
              sx={{ width: '100%', height: 240, objectFit: 'cover', display: 'block', borderRadius: '16px 16px 0 0' }}
            />
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,5,0,0.5) 0%, transparent 60%)', borderRadius: '16px 16px 0 0' }} />
            <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(0,0,0,0.45)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' }, width: 36, height: 36 }}>
              <X size={18} />
            </IconButton>
            <Chip label={service.category} size="small"
              sx={{ position: 'absolute', bottom: 16, left: 20, bgcolor: cfg.accent, color: '#fff', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.75rem' }}
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <IconButton onClick={onClose} sx={{ color: '#5a3e28' }}><X size={20} /></IconButton>
          </Box>
        )}

        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.9rem' }, color: '#1a0a00', mb: 2, lineHeight: 1.2 }}>
            {service.title}
          </Typography>
          <Typography sx={{ fontFamily: "'Lora', serif", fontSize: '1rem', color: '#5a3e28', lineHeight: 1.85, mb: 4 }}>
            {service.details || service.description}
          </Typography>
          <Button
            variant="contained" fullWidth size="large"
            startIcon={<MessageCircle size={18} />}
            href={`https://wa.me/919876543210?text=Hi! I'd like to know more about "${service.title}".`}
            target="_blank"
            sx={{ bgcolor: '#d4a843', color: '#1a0a00', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '1rem', textTransform: 'none', py: 1.4, borderRadius: 2, boxShadow: '0 4px 16px rgba(212,168,67,0.3)', '&:hover': { bgcolor: '#e0b84d' } }}
          >
            Ask on WhatsApp
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

// ─── Get In Touch Section ─────────────────────────────────────────────────────

function GetInTouch() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      alert('Error sending message. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ bgcolor: '#fffbf5', py: { xs: 8, md: 12 }, borderTop: '1px solid rgba(212,168,67,0.15)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="flex-start">

          {/* Left — CTA + contact buttons */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Typography sx={{ color: '#d4a843', fontSize: '0.78rem', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif", fontWeight: 700, mb: 1.5 }}>
                Reach Out
              </Typography>
              <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, color: '#1a0a00', lineHeight: 1.2, mb: 3 }}>
                Let's Talk About How You Can Help
              </Typography>
              <Typography sx={{ color: '#5a3e28', lineHeight: 1.85, mb: 5, fontSize: '1rem', fontFamily: "'Lora', serif" }}>
                Whether you want to volunteer, donate, sponsor a child, or simply learn more — we'd love to hear from you. Every conversation leads to a better future for our children.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  href="tel:+919876543210"
                  startIcon={<Phone size={18} />}
                  sx={{ bgcolor: '#d4a843', color: '#1a0a00', fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: 'none', fontSize: '1rem', py: 1.4, borderRadius: 2, boxShadow: '0 4px 16px rgba(212,168,67,0.3)', '&:hover': { bgcolor: '#e0b84d' }, justifyContent: 'flex-start', px: 3 }}
                >
                  Call Us: +91 98765 43210
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="https://wa.me/919876543210"
                  target="_blank"
                  startIcon={<MessageCircle size={18} />}
                  sx={{ borderColor: '#d4a843', color: '#d4a843', fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: 'none', fontSize: '1rem', py: 1.4, borderRadius: 2, '&:hover': { bgcolor: 'rgba(212,168,67,0.07)', borderColor: '#c49030' }, justifyContent: 'flex-start', px: 3 }}
                >
                  WhatsApp Us
                </Button>
              </Box>

              <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {['100% transparent with every donation', 'Registered NGO under Indian law', 'Volunteers welcome anytime'].map((pt) => (
                  <Box key={pt} sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <CheckCircle size={16} color="#d4a843" />
                    <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', color: '#5a3e28' }}>{pt}</Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Right — Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Paper
                elevation={0}
                sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '1px solid rgba(212,168,67,0.2)', bgcolor: '#fff', boxShadow: '0 4px 40px rgba(180,100,20,0.08)' }}
              >
                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.6rem', color: '#1a0a00', mb: 0.5 }}>
                  Get In Touch
                </Typography>
                <Typography sx={{ fontFamily: "'Nunito', sans-serif", color: '#8a6040', fontSize: '0.9rem', mb: 3.5 }}>
                  We usually respond within 24 hours.
                </Typography>

                {success ? (
                  <Box sx={{ py: 5, textAlign: 'center' }}>
                    <CheckCircle size={48} color="#d4a843" style={{ marginBottom: 16 }} />
                    <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.3rem', color: '#1a0a00', mb: 1 }}>
                      Message Received!
                    </Typography>
                    <Typography sx={{ fontFamily: "'Nunito', sans-serif", color: '#5a3e28' }}>
                      Thank you for reaching out. We'll get back to you soon. 🙏
                    </Typography>
                  </Box>
                ) : (
                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth label="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      sx={{ mb: 2.5 }} required
                    />
                    <TextField
                      fullWidth label="Email Address" type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      sx={{ mb: 2.5 }} required
                    />
                    <TextField
                      fullWidth label="Your Message" multiline rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      sx={{ mb: 3 }} required
                    />
                    <Button
                      type="submit" variant="contained" fullWidth
                      disabled={loading} size="large"
                      sx={{ bgcolor: '#d4a843', color: '#1a0a00', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '1rem', textTransform: 'none', py: 1.5, borderRadius: 2, boxShadow: '0 4px 16px rgba(212,168,67,0.3)', '&:hover': { bgcolor: '#e0b84d' }, '&:disabled': { bgcolor: 'rgba(212,168,67,0.4)', color: '#1a0a00' } }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Box>
                )}
              </Paper>
            </motion.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { services, loading } = useServices();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const directService = id ? services.find((s) => s._id === id) : null;
  if (id && !loading && directService) {
    return <ServiceDirectView service={directService} onBack={() => navigate('/services')} />;
  }

  const grouped = services.reduce<Record<string, Service[]>>((acc, svc) => {
    const cat = svc.category ?? 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(svc);
    return acc;
  }, {});

  const knownOrder = ['Nari Sashaktikaran', 'Bal Kalyan', 'Shiksha Seva', 'Swasthya Seva'];
  const sortedCategories = [
    ...knownOrder.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !knownOrder.includes(c)),
  ];

  return (
    <Box sx={{ bgcolor: '#fffbf5', minHeight: '100vh', fontFamily: "'Lora', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:wght@400;500&family=Nunito:wght@400;600;700&display=swap');
      `}</style>

      {/* Hero band */}
      <Box sx={{ pt: { xs: 16, md: 18 }, pb: { xs: 7, md: 9 }, background: 'linear-gradient(135deg, #1e0f06 0%, #3a1a08 60%, #2c1a0e 100%)', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', width: 450, height: 450, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.07)', top: -180, right: -120, pointerEvents: 'none' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Typography sx={{ color: '#d4a843', fontSize: '0.78rem', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif", fontWeight: 700, mb: 1.5 }}>
              What We Do
            </Typography>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: { xs: '2.4rem', md: '3.5rem' }, color: '#fff', lineHeight: 1.1, mb: 2.5, maxWidth: 620 }}>
              Our Programmes & Services
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 520, lineHeight: 1.8, fontFamily: "'Lora', serif" }}>
              Four core programmes — each focused on a different pillar of support for children and communities across Rajasthan. Click any category to explore.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Categories */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        {loading && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <CircularProgress sx={{ color: '#d4a843' }} />
            <Typography sx={{ mt: 2, fontFamily: "'Nunito', sans-serif", color: '#5a3e28' }}>Loading programmes...</Typography>
          </Box>
        )}

        {!loading && sortedCategories.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ fontFamily: "'Nunito', sans-serif", color: '#8a6040' }}>No services found. Check back soon.</Typography>
          </Box>
        )}

        {!loading && sortedCategories.map((cat) => (
          <CategorySection key={cat} category={cat} services={grouped[cat]} onSelect={setSelectedService} />
        ))}
      </Container>

      {/* Get In Touch */}
      <GetInTouch />

      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </Box>
  );
}

// ─── Direct URL view (/services/:id) ─────────────────────────────────────────

function ServiceDirectView({ service, onBack }: { service: Service; onBack: () => void }) {
  const cfg = getCategoryConfig(service.category ?? '');
  return (
    <Box sx={{ bgcolor: '#fffbf5', minHeight: '100vh', pt: { xs: 12, md: 14 } }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Button onClick={onBack} startIcon={<ArrowLeft size={18} />}
          sx={{ color: '#d4a843', fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: 'none', mb: 4, p: 0, '&:hover': { bgcolor: 'transparent', color: '#b8882e' } }}>
          Back to Services
        </Button>
        {service.image && (
          <Box component="img" src={service.image} alt={service.title}
            sx={{ width: '100%', maxHeight: 380, objectFit: 'cover', borderRadius: 4, mb: 4, display: 'block' }}
          />
        )}
        <Chip label={service.category} size="small" sx={{ bgcolor: cfg.accent, color: '#fff', fontFamily: "'Nunito', sans-serif", fontWeight: 700, mb: 2 }} />
        <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: { xs: '2rem', md: '2.8rem' }, color: '#1a0a00', mb: 3, lineHeight: 1.2 }}>
          {service.title}
        </Typography>
        <Typography sx={{ fontFamily: "'Lora', serif", fontSize: '1.05rem', color: '#5a3e28', lineHeight: 1.9, mb: 5 }}>
          {service.details || service.description}
        </Typography>
        <Button variant="contained" size="large" startIcon={<MessageCircle size={18} />}
          href={`https://wa.me/919876543210?text=Hi! Interested in "${service.title}"`}
          target="_blank"
          sx={{ bgcolor: '#d4a843', color: '#1a0a00', fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: 'none', px: 4, py: 1.4, borderRadius: 2, '&:hover': { bgcolor: '#e0b84d' } }}>
          Ask on WhatsApp
        </Button>
      </Container>
    </Box>
  );
}