import { Router } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import Busboy from 'busboy';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/upload  (protected)
router.post('/', requireAuth, (req, res) => {
  const bb = Busboy({ headers: req.headers });

  bb.on('file', (_field, stream) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'portfolio', resource_type: 'image' },
      (err, result) => {
        if (err) return res.status(500).json({ error: 'Cloudinary upload failed: ' + err.message });
        res.json({ url: result.secure_url });
      }
    );
    stream.pipe(uploadStream);
  });

  bb.on('error', (err) => res.status(500).json({ error: err.message }));
  req.pipe(bb);
});

export default router;
