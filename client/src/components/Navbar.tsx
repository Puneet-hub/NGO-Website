import { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Box, Button, Container,
  IconButton, Drawer, List, ListItem, ListItemButton,
  ListItemText, Typography, Divider,
} from '@mui/material';
import { Menu, X, Heart } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = !isHome || scrolled;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Nunito:wght@400;600;700&display=swap');
      `}</style>

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: isSolid ? '#1e0f06' : 'transparent',
          borderBottom: isSolid ? '1px solid rgba(212,168,67,0.15)' : 'none',
          backdropFilter: isSolid ? 'blur(12px)' : 'none',
          transition: 'background-color 0.4s ease, border 0.4s ease, backdrop-filter 0.4s ease',
          boxShadow: isSolid ? '0 2px 24px rgba(0,0,0,0.25)' : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: { xs: 64, md: 72 }, justifyContent: 'space-between' }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Box sx={{ width: 38, height: 38, borderRadius: '50%', bgcolor: '#d4a843', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Heart size={18} color="#1e0f06" fill="#1e0f06" />
              </Box>
              <Box>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.25rem', color: '#fff', lineHeight: 1.1, letterSpacing: 0.5 }}>
                  Anjio
                </Typography>
                <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.65rem', color: '#d4a843', letterSpacing: 1.5, textTransform: 'uppercase', lineHeight: 1 }}>
                  Foundation
                </Typography>
              </Box>
            </Link>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Button
                    key={link.path}
                    component={Link}
                    to={link.path}
                    sx={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: active ? 700 : 600,
                      fontSize: '0.9rem',
                      color: active ? '#d4a843' : 'rgba(255,255,255,0.85)',
                      textTransform: 'none',
                      px: 1.8, py: 0.8,
                      borderRadius: 2,
                      position: 'relative',
                      '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.07)' },
                      '&::after': active ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 20, height: 2,
                        borderRadius: 1,
                        bgcolor: '#d4a843',
                      } : {},
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}

              {/* Donate CTA */}
              <Button
                component={Link}
                to="/donate"
                startIcon={<Heart size={14} fill="currentColor" />}
                sx={{
                  ml: 1.5,
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  bgcolor: '#d4a843',
                  color: '#1e0f06',
                  px: 2.5, py: 0.9,
                  borderRadius: 2,
                  boxShadow: '0 2px 12px rgba(212,168,67,0.35)',
                  '&:hover': { bgcolor: '#e0b84d', boxShadow: '0 4px 18px rgba(212,168,67,0.5)' },
                }}
              >
                Donate
              </Button>
            </Box>

            {/* Mobile hamburger */}
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }}>
              <Menu size={24} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, bgcolor: '#1e0f06', borderLeft: '1px solid rgba(212,168,67,0.2)' } }}
      >
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.25 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {/* Drawer header */}
              <Box sx={{ px: 3, py: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#d4a843', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={15} color="#1e0f06" fill="#1e0f06" />
                  </Box>
                  <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                    Anjio
                  </Typography>
                </Box>
                <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#fff' } }}>
                  <X size={20} />
                </IconButton>
              </Box>

              <Divider sx={{ borderColor: 'rgba(212,168,67,0.15)' }} />

              {/* Nav links */}
              <List sx={{ px: 1.5, pt: 2, flex: 1 }}>
                {NAV_LINKS.map((link, i) => {
                  const active = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <ListItem disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                          component={Link}
                          to={link.path}
                          onClick={() => setDrawerOpen(false)}
                          sx={{
                            borderRadius: 2, px: 2,
                            bgcolor: active ? 'rgba(212,168,67,0.12)' : 'transparent',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
                          }}
                        >
                          <ListItemText
                            primary={link.label}
                            primaryTypographyProps={{
                              fontFamily: "'Nunito', sans-serif",
                              fontWeight: active ? 700 : 600,
                              color: active ? '#d4a843' : 'rgba(255,255,255,0.85)',
                              fontSize: '1rem',
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </motion.div>
                  );
                })}
              </List>

              {/* Donate button */}
              <Box sx={{ px: 2.5, pb: 4 }}>
                <Button
                  component={Link}
                  to="/donate"
                  onClick={() => setDrawerOpen(false)}
                  fullWidth
                  startIcon={<Heart size={15} fill="currentColor" />}
                  sx={{
                    bgcolor: '#d4a843', color: '#1e0f06',
                    fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                    fontSize: '0.95rem', textTransform: 'none',
                    py: 1.3, borderRadius: 2,
                    '&:hover': { bgcolor: '#e0b84d' },
                  }}
                >
                  Donate Now
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Drawer>
    </>
  );
}