import { Router } from 'express';
import { Home, About, Experience, Project, Study, Cert } from '../lib/models.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// ── Helper: single-document GET + PUT ────────────────────────────────────
function singleDoc(Model) {
  const r = Router();
  r.get('/', async (req, res) => {
    try { res.json(await Model.findOne().lean()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });
  r.put('/', requireAuth, async (req, res) => {
    try {
      const doc = await Model.findOne();
      const updated = doc
        ? await Model.findByIdAndUpdate(doc._id, req.body, { new: true })
        : await Model.create(req.body);
      res.json(updated);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });
  return r;
}

// ── Helper: list + CRUD ───────────────────────────────────────────────────
function crudDocs(Model, extras = {}) {
  const r = Router();

  r.get('/', async (req, res) => {
    try { res.json(await Model.find().sort({ order: 1 }).lean()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });

  r.post('/', requireAuth, async (req, res) => {
    try {
      const count = await Model.countDocuments();
      const data = { ...req.body, order: count, ...extras.onCreate?.(count) };
      res.json((await Model.create(data)).toObject());
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  r.put('/:id', requireAuth, async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!doc) return res.status(404).json({ error: 'Not found' });
      res.json(doc.toObject());
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  r.delete('/:id', requireAuth, async (req, res) => {
    try {
      await Model.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  return r;
}

// ── Mount routes ──────────────────────────────────────────────────────────
router.use('/home',        singleDoc(Home));
router.use('/about',       singleDoc(About));
router.use('/experiences', crudDocs(Experience));
router.use('/projects',    crudDocs(Project, {
  onCreate: (count) => ({ num: String(count + 1).padStart(2, '0') }),
}));
router.use('/study',       crudDocs(Study));
router.use('/certs',       crudDocs(Cert));

export default router;
