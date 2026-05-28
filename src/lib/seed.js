import bcrypt from 'bcryptjs';
import { User, Home, About, Experience, Project, Study, Cert } from './models.js';

export async function seedIfEmpty() {
  if (!(await User.findOne({ username: 'admin' }))) {
    const hash = await bcrypt.hash('admin123', 10);
    await User.create({ username: 'admin', password: hash });
    console.log('✅ Default admin created (user: admin, pass: admin123)');
  }

  if (!(await Home.findOne())) {
    await Home.create({
      name: 'Alex Chen',
      tagline: 'Building Digital Worlds with Code.',
      description: "I'm a Full-Stack Web Developer who turns complex ideas into clean, fast, and beautiful digital experiences.",
      statusBadge: 'Available for work',
      yearsExp: '4+', projectsDone: '32', happyClients: '18',
      availableForWork: true,
      badges: ['React.js', 'Node.js', 'UI/UX Design'],
    });
  }

  if (!(await About.findOne())) {
    await About.create({
      bio1: "I'm a passionate web developer with 4+ years of experience crafting modern web applications.",
      bio2: 'I care deeply about developer experience, accessibility, and performance.',
      name: 'Alex Chen', role: 'Full-Stack Developer',
      location: 'San Francisco, CA', availability: 'Open to work',
      skills: ['React','Next.js','TypeScript','Node.js','PostgreSQL','MongoDB','GraphQL','Docker','AWS','Tailwind CSS','Git / CI','Figma'],
    });
  }

  if (!(await Experience.findOne())) {
    await Experience.insertMany([
      { date: '2023 — Present', company: 'Luminary Labs', role: 'Senior Frontend Engineer',
        desc: 'Leading frontend architecture for a SaaS platform serving 50K+ users.', tags: ['React','TypeScript','Storybook','Vite'], order: 0 },
      { date: '2021 — 2023', company: 'Stackwave Agency', role: 'Full-Stack Developer',
        desc: 'Delivered 12+ client projects end-to-end.', tags: ['Node.js','Next.js','PostgreSQL','Stripe'], order: 1 },
      { date: '2020 — 2021', company: 'Pixel & Co.', role: 'Junior Web Developer',
        desc: 'Built responsive landing pages and web apps for startups.', tags: ['Vue.js','SCSS','Figma','WordPress'], order: 2 },
    ]);
  }

  if (!(await Project.findOne())) {
    await Project.insertMany([
      { num: '01', icon: '🛒', name: 'ShopFlow E-Commerce', desc: 'Full-featured online store with real-time inventory and Stripe checkout.', stack: ['Next.js','Prisma','Stripe'], href: '#', order: 0 },
      { num: '02', icon: '📊', name: 'DataPulse Dashboard', desc: 'Real-time analytics dashboard for SaaS metrics.', stack: ['React','D3.js','Node.js'], href: '#', order: 1 },
      { num: '03', icon: '💬', name: 'Conversa Chat App', desc: 'End-to-end encrypted messaging with real-time rooms.', stack: ['Socket.io','React','MongoDB'], href: '#', order: 2 },
    ]);
  }

  if (!(await Study.findOne())) {
    await Study.create({ year: '2016 — 2020', degree: 'B.Sc. Computer Science', school: 'UC Berkeley', detail: 'Majored in Software Systems. GPA: 3.8.', order: 0 });
  }

  if (!(await Cert.findOne())) {
    await Cert.insertMany([
      { icon: '☁️', name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services · 2023', order: 0 },
      { icon: '⚛️', name: 'Meta Front-End Developer Certificate', issuer: 'Meta / Coursera · 2022', order: 1 },
      { icon: '🔒', name: 'Google Cybersecurity Certificate', issuer: 'Google / Coursera · 2022', order: 2 },
    ]);
  }
}
