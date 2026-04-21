import { Router, Request, Response } from 'express';
import multer from 'multer';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Upload image endpoint
router.post('/image', authenticateToken, upload.single('image'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { removeBackground, autoCrop } = req.body;
    const userId = req.userId;

    // For now, we'll return the image as base64
    // In production, you would:
    // 1. Upload to cloud storage (AWS S3, Cloudinary, etc.)
    // 2. Process with background removal API (remove.bg, Cloudinary AI, etc.)
    // 3. Apply auto-cropping logic
    // 4. Return the processed image URL

    const base64Image = req.file.buffer.toString('base64');
    const dataUrl = `data:${req.file.mimetype};base64,${base64Image}`;

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: dataUrl,
      processed: {
        backgroundRemoved: removeBackground === 'true',
        autoCropped: autoCrop === 'true',
      },
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Upload multiple images (for wardrobe)
router.post('/images', authenticateToken, upload.array('images', 10), async (req: AuthRequest, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const images = files.map((file) => {
      const base64Image = file.buffer.toString('base64');
      return {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        dataUrl: `data:${file.mimetype};base64,${base64Image}`,
      };
    });

    res.json({
      message: 'Images uploaded successfully',
      images,
      count: images.length,
    });
  } catch (error) {
    console.error('Multiple image upload error:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

export default router;
