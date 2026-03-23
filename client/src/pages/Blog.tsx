import { useState } from 'react';
import {
  Container, Typography, Box, Button, Chip, Grid, Modal,
  IconButton, TextField, InputAdornment,
} from '@mui/material';
import { X, Search, Calendar, User, ArrowRight, BookOpen, Heart, Users, Stethoscope, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
  featured: boolean;
}

interface CatCfg {
  icon: React.ReactNode;
  color: string;
  bg: string;
}

// ─── Static blog data ─────────────────────────────────────────────────────────

const BLOG_POSTS: BlogPost[] = [
  {
    _id: '1',
    title: "How Vocational Training Changed Sunita's Life",
    excerpt: 'After joining our tailoring programme, Sunita went from earning nothing to running her own boutique in Jaipur. Here is her story of courage and transformation.',
    content: `Sunita Devi, a 28-year-old woman from the outskirts of Jaipur, had never held a needle professionally before she walked into our Nari Sashaktikaran centre two years ago. Today, she runs a small boutique employing three other women from her neighbourhood.\n\nWhen she first came to us, Sunita was barely able to cover basic household expenses. Our six-month vocational training programme taught her not only the craft of stitching and design, but also the basics of running a micro-enterprise — accounting, sourcing fabric, and understanding local markets.\n\n"I never thought I could own something," she told us during a recent visit. "Now I am the one giving work to others."\n\nSunita's story is one of over 340 women we have trained in the past three years. Each one carries the same quiet determination — to be seen, to be heard, and to build something of her own.`,
    category: 'Nari Sashaktikaran',
    author: 'Priya Sharma',
    date: 'March 12, 2025',
    image: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=800&q=80',
    readTime: '4 min read',
    featured: true,
  },
  {
    _id: '2',
    title: '200 Children Received Free Notebooks This Winter',
    excerpt: 'Our annual stationery drive reached 200 children across 6 villages this December. A small gesture that makes a big difference when school reopens.',
    content: `Every December, our Bal Kalyan team fans out across six villages in Rajasthan's Dausa and Alwar districts, carrying bundles of notebooks, pencils, geometry boxes, and school bags. This year, we reached 200 children — the highest number since the drive began in 2019.\n\nThe children who receive these kits are often the first in their families to attend school regularly. For many, the lack of basic stationery is a real barrier — not just to learning, but to the dignity of showing up with the same tools as their peers.\n\nThis year's drive was made possible by 43 individual donors and a generous corporate contribution from a Jaipur-based textile company. We are deeply grateful.\n\nIf you would like to sponsor a stationery kit for next year's drive (just ₹350 per child), please reach out to us on WhatsApp.`,
    category: 'Bal Kalyan',
    author: 'Ramesh Verma',
    date: 'January 5, 2025',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    readTime: '3 min read',
    featured: false,
  },
  {
    _id: '3',
    title: 'Our Mobile Health Clinic Completed 1,000 Consultations',
    excerpt: "Since its launch last monsoon, our mobile clinic has visited 18 villages and provided free healthcare to over a thousand patients. Here's what we learned.",
    content: `Launched in August 2024, our Swasthya Seva mobile clinic was designed with a simple premise: bring qualified healthcare to communities that have none.\n\nIn nine months, the clinic — a converted van staffed by one doctor, one nurse, and a community health worker — has visited 18 villages and completed its 1,000th consultation. Conditions treated range from anaemia and seasonal fever to chronic hypertension and early-stage cataracts.\n\nWhat surprised us most was the demand for mental health conversations. Nearly 1 in 5 patients, unprompted, brought up stress, anxiety, or sleep disturbances. We are now working to formally include mental wellness in every clinic visit.\n\nOur doctor, Dr. Anjali Meena, says it best: "People here are not ignorant about their health. They just have never had someone come to them with the time and the tools to help."`,
    category: 'Swasthya Seva',
    author: 'Dr. Anjali Meena',
    date: 'April 2, 2025',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    readTime: '5 min read',
    featured: true,
  },
  {
    _id: '4',
    title: 'Why We Teach Girls to Code in Grade 5',
    excerpt: 'Introducing basic digital literacy at age 10 is one of the most impactful interventions we have made. The results three years in are remarkable.',
    content: `Three years ago, we introduced a basic digital literacy module into our Shiksha Seva curriculum for Grade 5 girls. The idea was simple: remove the intimidation of technology before it sets in.\n\nThe results have been striking. Girls who went through the programme in Class 5 are twice as likely to enrol in computer science electives in Class 9 compared to peers from schools without the programme.\n\nBut the more interesting finding is attitudinal. Girls who learned basic coding early show greater confidence in problem-solving across all subjects — maths, science, and even language arts. They have a word for it in class: "debug karo" — just debug it.\n\nWe now run the digital literacy module in 11 schools and are looking for partners to help us expand to 25 more. Each school module costs approximately ₹18,000 per year — a small investment for a generation-defining shift.`,
    category: 'Shiksha Seva',
    author: 'Kavita Joshi',
    date: 'February 20, 2025',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    readTime: '4 min read',
    featured: false,
  },
  {
    _id: '5',
    title: 'A Day in the Life of Our Community Volunteer',
    excerpt: 'Meet Dinesh — a retired schoolteacher who now spends his mornings helping children with homework at our Jaipur learning centre.',
    content: `Dinesh Kumar Sharma retired after 32 years of teaching Hindi at a government school in Jaipur. He expected to rest. Instead, within six months, he was back in a classroom — this time, as a volunteer at our Shiksha Seva learning centre.\n\n"I could not sit at home," he says with a laugh. "These children need someone who has time. I have time."\n\nDinesh comes in every morning from 8 to 11. He helps children from Classes 3 to 7 with reading comprehension, mental maths, and — his particular passion — handwriting. He believes a clean hand reveals a clear mind.\n\nOver the past year, 23 children he has worked with have shown measurable improvement in reading fluency scores. But he measures success differently: "When a child who was afraid of reading reads a full paragraph aloud without stopping — that is my result."\n\nWe are always looking for more Dineshs. If you would like to volunteer, please write to us.`,
    category: 'Shiksha Seva',
    author: 'Meera Gupta',
    date: 'March 28, 2025',
    image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&q=80',
    readTime: '3 min read',
    featured: false,
  },
  {
    _id: '6',
    title: 'Breaking the Cycle: Nutrition Workshops for New Mothers',
    excerpt: 'Malnutrition in children often starts before birth. Our new workshop series is helping young mothers in rural Rajasthan make informed choices.',
    content: `Malnutrition does not begin at the dinner table. It begins in the months before a child is born, in the decisions — often uninformed — that young mothers make about their own diet during pregnancy.\n\nOur Swasthya Seva team launched the "Swasth Maa, Swasth Baccha" workshop series in January 2025. Over six weeks, groups of 15–20 women — most in their first or second trimester — meet with a trained nutritionist and a local ASHA worker to discuss practical, affordable nutrition.\n\nThe sessions are deliberately grounded in local food. No quinoa, no expensive supplements. Just guidance on how to use the dals, greens, millets, and seasonal vegetables already available in the local market to meet pregnancy nutrition needs.\n\nIn the first cohort of 60 women, birth-weight outcomes at partner hospitals showed a 12% improvement compared to the district average. We are expanding the programme to three more blocks this year.`,
    category: 'Swasthya Seva',
    author: 'Dr. Anjali Meena',
    date: 'April 15, 2025',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    readTime: '4 min read',
    featured: false,
  },
];

const CATEGORIES = ['All', 'Nari Sashaktikaran', 'Bal Kalyan', 'Shiksha Seva', 'Swasthya Seva'];

const CATEGORY_CONFIG: Record<string, CatCfg> = {
  'Nari Sashaktikaran': { icon: <Users size={14} />, color: '#c2185b', bg: '#fdf0f5' },
  'Bal Kalyan':         { icon: <Heart size={14} />, color: '#e65100', bg: '#fdf3e8' },
  'Shiksha Seva':       { icon: <BookOpen size={14} />, color: '#1565c0', bg: '#e8f4fd' },
  'Swasthya Seva':      { icon: <Stethoscope size={14} />, color: '#2e7d32', bg: '#f0fdf4' },
};

function getCatCfg(cat: string): CatCfg {
  return CATEGORY_CONFIG[cat] ?? { icon: <Heart size={14} />, color: '#5a3e28', bg: '#f5f5f5' };
}

// ─── Category Chip ────────────────────────────────────────────────────────────

function CatChip({ category, size = 'small' as 'small' | 'medium' }: { category: string; size?: 'small' | 'medium' }) {
  const cfg = getCatCfg(category);
  return (
    <Chip
      icon={<span style={{ color: cfg.color, display: 'flex', alignItems: 'center', paddingLeft: 6 }}>{cfg.icon}</span>}
      label={category}
      size={size}
      sx={{
        bgcolor: cfg.bg,
        color: cfg.color,
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 700,
        fontSize: size === 'small' ? '0.72rem' : '0.8rem',
        border: `1px solid ${cfg.color}22`,
        '& .MuiChip-icon': { ml: 0 },
      }}
    />
  );
}

// ─── Featured Post Card ───────────────────────────────────────────────────────

function FeaturedCard({ post, onClick }: { post: BlogPost; onClick: (p: BlogPost) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <Box
        onClick={() => onClick(post)}
        sx={{
          cursor: 'pointer',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(212,168,67,0.15)',
          bgcolor: '#fff',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          transition: 'box-shadow 0.25s',
          '&:hover': { boxShadow: '0 12px 48px rgba(90,62,40,0.12)' },
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src={post.image}
          alt={post.title}
          sx={{
            width: { xs: '100%', md: 380 },
            height: { xs: 220, md: 'auto' },
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
        {/* Content */}
        <Box sx={{ p: { xs: 3, md: 4.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Chip
              label="Featured"
              size="small"
              sx={{ bgcolor: '#d4a843', color: '#1a0a00', fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '0.72rem' }}
            />
            <CatChip category={post.category} />
          </Box>
          <Typography
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: { xs: '1.4rem', md: '1.8rem' },
              color: '#1a0a00',
              lineHeight: 1.25,
              mb: 1.5,
            }}
          >
            {post.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Lora', serif",
              fontSize: '0.95rem',
              color: '#5a3e28',
              lineHeight: 1.75,
              mb: 3,
            }}
          >
            {post.excerpt}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <User size={13} color="#8a6040" />
              <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem', color: '#8a6040' }}>{post.author}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <Calendar size={13} color="#8a6040" />
              <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem', color: '#8a6040' }}>{post.date}</Typography>
            </Box>
            <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem', color: '#8a6040' }}>{post.readTime}</Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#d4a843', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Read story <ArrowRight size={15} />
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

// ─── Regular Post Card ────────────────────────────────────────────────────────

function BlogCard({ post, onClick, index }: { post: BlogPost; onClick: (p: BlogPost) => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -5 }}
      style={{ height: '100%' }}
    >
      <Box
        onClick={() => onClick(post)}
        sx={{
          height: '100%',
          bgcolor: '#fff',
          borderRadius: 3,
          border: '1px solid rgba(0,0,0,0.07)',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          transition: 'box-shadow 0.25s',
          '&:hover': { boxShadow: '0 8px 32px rgba(90,62,40,0.1)' },
        }}
      >
        {post.image && (
          <Box
            component="img"
            src={post.image}
            alt={post.title}
            sx={{ width: '100%', height: 190, objectFit: 'cover', display: 'block' }}
          />
        )}
        <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 1.5 }}>
            <CatChip category={post.category} />
          </Box>
          <Typography
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: '1.05rem',
              color: '#1a0a00',
              lineHeight: 1.35,
              mb: 1,
            }}
          >
            {post.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: '0.85rem',
              color: '#5a3e28',
              lineHeight: 1.65,
              flex: 1,
              mb: 2,
            }}
          >
            {post.excerpt}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <Calendar size={12} color="#8a6040" />
              <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.76rem', color: '#8a6040' }}>{post.date}</Typography>
            </Box>
            <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.8rem', color: '#d4a843' }}>
              Read →
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

// ─── Blog Post Modal ──────────────────────────────────────────────────────────

function BlogModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '96vw', sm: '82vw', md: 700 },
          maxHeight: '92vh',
          bgcolor: '#fffbf5',
          borderRadius: 4,
          overflowY: 'auto',
          outline: 'none',
        }}
      >
        {/* Hero Image */}
        {post.image && (
          <Box sx={{ position: 'relative' }}>
            <Box
              component="img"
              src={post.image}
              alt={post.title}
              sx={{ width: '100%', height: 260, objectFit: 'cover', display: 'block', borderRadius: '16px 16px 0 0' }}
            />
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,5,0,0.55) 0%, transparent 55%)', borderRadius: '16px 16px 0 0' }} />
            <IconButton
              onClick={onClose}
              sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(0,0,0,0.45)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' }, width: 36, height: 36 }}
            >
              <X size={18} />
            </IconButton>
            <Box sx={{ position: 'absolute', bottom: 16, left: 20 }}>
              <CatChip category={post.category} />
            </Box>
          </Box>
        )}

        {/* Body */}
        <Box sx={{ p: { xs: 3, md: 4.5 } }}>
          <Typography
            sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' }, color: '#1a0a00', lineHeight: 1.25, mb: 2 }}
          >
            {post.title}
          </Typography>

          {/* Meta */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap', mb: 3, pb: 3, borderBottom: '1px solid rgba(212,168,67,0.15)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <User size={13} color="#8a6040" />
              <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.82rem', color: '#8a6040' }}>{post.author}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <Calendar size={13} color="#8a6040" />
              <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.82rem', color: '#8a6040' }}>{post.date}</Typography>
            </Box>
            <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.82rem', color: '#8a6040' }}>{post.readTime}</Typography>
          </Box>

          {/* Content */}
          {post.content.split('\n\n').map((para: string, i: number) => (
            <Typography
              key={i}
              sx={{ fontFamily: "'Lora', serif", fontSize: '1rem', color: '#3d2800', lineHeight: 1.9, mb: 2.5 }}
            >
              {para}
            </Typography>
          ))}

          {/* Footer CTA */}
          <Box
            sx={{
              mt: 4, p: 3, borderRadius: 3,
              background: 'linear-gradient(135deg, #1e0f06 0%, #3a1a08 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2,
            }}
          >
            <Box>
              <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', fontSize: '1.05rem', mb: 0.3 }}>
                Want to support this work?
              </Typography>
              <Typography sx={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>
                Every rupee makes a difference.
              </Typography>
            </Box>
            <Button
              variant="contained"
              href="https://wa.me/919876543210"
              target="_blank"
              sx={{ bgcolor: '#d4a843', color: '#1a0a00', fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: 'none', px: 3, py: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#e0b84d' }, flexShrink: 0 }}
            >
              Get in touch
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filtered = BLOG_POSTS.filter((post) => {
    const matchCat = activeCategory === 'All' || post.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.author.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const featured = filtered.filter((p) => p.featured);
  const regular  = filtered.filter((p) => !p.featured);

  return (
    <Box sx={{ bgcolor: '#fffbf5', minHeight: '100vh', fontFamily: "'Lora', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Lora:wght@400;500&family=Nunito:wght@400;600;700;800&display=swap');
      `}</style>

      {/* ── Hero ── */}
      <Box
        sx={{
          pt: { xs: 16, md: 18 },
          pb: { xs: 7, md: 9 },
          background: 'linear-gradient(135deg, #1e0f06 0%, #3a1a08 60%, #2c1a0e 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.07)', top: -200, right: -150, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.05)', bottom: -100, left: -80, pointerEvents: 'none' }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Typography
              sx={{ color: '#d4a843', fontSize: '0.78rem', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif", fontWeight: 700, mb: 1.5 }}
            >
              Stories & Updates
            </Typography>
            <Typography
              sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: { xs: '2.4rem', md: '3.5rem' }, color: '#fff', lineHeight: 1.1, mb: 2.5, maxWidth: 620 }}
            >
              Our Blog
            </Typography>
            <Typography
              sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 520, lineHeight: 1.8, fontFamily: "'Lora', serif", mb: 5 }}
            >
              Real stories from the ground. Updates from our programmes. Voices of the people we work with and for.
            </Typography>

            {/* Search bar */}
            <Box sx={{ maxWidth: 480 }}>
              <TextField
                fullWidth
                placeholder="Search stories, people, topics…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} color="rgba(255,255,255,0.5)" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.08)',
                    borderRadius: 2,
                    color: '#fff',
                    fontFamily: "'Nunito', sans-serif",
                    '& fieldset': { borderColor: 'rgba(212,168,67,0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(212,168,67,0.6)' },
                    '&.Mui-focused fieldset': { borderColor: '#d4a843' },
                  },
                  '& input::placeholder': { color: 'rgba(255,255,255,0.4)', fontFamily: "'Nunito', sans-serif" },
                }}
              />
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ── Category Filter ── */}
      <Box sx={{ borderBottom: '1px solid rgba(212,168,67,0.12)', bgcolor: '#fff', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 16px rgba(90,62,40,0.06)' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', gap: 0.5, overflowX: 'auto', py: 1.5, '&::-webkit-scrollbar': { display: 'none' } }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const cfg = getCatCfg(cat);
              return (
                <Button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  sx={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    textTransform: 'none',
                    px: 2.2,
                    py: 0.8,
                    borderRadius: 2,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    color: isActive ? (cat === 'All' ? '#1a0a00' : cfg.color) : '#8a6040',
                    bgcolor: isActive ? (cat === 'All' ? '#d4a843' : cfg.bg) : 'transparent',
                    border: isActive ? `1px solid ${cat === 'All' ? '#d4a843' : cfg.color + '33'}` : '1px solid transparent',
                    '&:hover': {
                      bgcolor: cat === 'All' ? 'rgba(212,168,67,0.1)' : cfg.bg,
                      color: cat === 'All' ? '#d4a843' : cfg.color,
                    },
                  }}
                >
                  {cat}
                </Button>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* ── Content ── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>

        {/* No results */}
        {filtered.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 12 }}>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#1a0a00', mb: 1 }}>
              No stories found
            </Typography>
            <Typography sx={{ fontFamily: "'Nunito', sans-serif", color: '#8a6040', mb: 3 }}>
              Try a different search or category.
            </Typography>
            <Button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              sx={{ color: '#d4a843', fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: 'none' }}
            >
              Clear filters
            </Button>
          </Box>
        )}

        {/* Featured Posts */}
        {featured.length > 0 && (
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography
              sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.3rem', color: '#1a0a00', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Box component="span" sx={{ width: 4, height: 24, bgcolor: '#d4a843', borderRadius: 1, display: 'inline-block' }} />
              Featured Stories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {featured.map((post) => (
                <FeaturedCard key={post._id} post={post} onClick={setSelectedPost} />
              ))}
            </Box>
          </Box>
        )}

        {/* Regular Posts */}
        {regular.length > 0 && (
          <Box>
            {featured.length > 0 && (
              <Typography
                sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.3rem', color: '#1a0a00', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Box component="span" sx={{ width: 4, height: 24, bgcolor: 'rgba(212,168,67,0.4)', borderRadius: 1, display: 'inline-block' }} />
                More Stories
              </Typography>
            )}
            <Grid container spacing={3}>
              {regular.map((post, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post._id}>
                  <BlogCard post={post} onClick={setSelectedPost} index={i} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* CTA band */}
        {filtered.length > 0 && (
          <Box
            sx={{
              mt: { xs: 8, md: 12 },
              p: { xs: 4, md: 5 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, #1e0f06 0%, #3a1a08 100%)',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <Box>
              <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#fff', fontSize: { xs: '1.4rem', md: '1.8rem' }, lineHeight: 1.3 }}>
                Every story here is a life changed.
              </Typography>
              <Typography sx={{ fontFamily: "'Lora', serif", color: 'rgba(255,255,255,0.65)', mt: 1, fontSize: '0.95rem' }}>
                Help us write more of them.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexShrink: 0 }}>
              <Button
                variant="contained"
                href="https://wa.me/919876543210"
                target="_blank"
                sx={{ bgcolor: '#d4a843', color: '#1a0a00', fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: 'none', px: 3.5, py: 1.3, borderRadius: 2, '&:hover': { bgcolor: '#e0b84d' } }}
              >
                Volunteer with us
              </Button>
              <Button
                variant="outlined"
                href="/services"
                sx={{ borderColor: 'rgba(212,168,67,0.5)', color: '#d4a843', fontFamily: "'Nunito', sans-serif", fontWeight: 700, textTransform: 'none', px: 3.5, py: 1.3, borderRadius: 2, '&:hover': { borderColor: '#d4a843', bgcolor: 'rgba(212,168,67,0.07)' } }}
                endIcon={<ChevronRight size={16} />}
              >
                Our programmes
              </Button>
            </Box>
          </Box>
        )}
      </Container>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>
    </Box>
  );
}