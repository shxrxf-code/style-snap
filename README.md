# Style Snap - Social + Fashion Fusion App

A modern, scalable mobile/web application that combines social media features with fashion styling, enabling high user traffic and subscription-based monetization.

## 🎯 Features

### Core Features
- **User Profiles**: Sign-up/login via email, social accounts with profile customization (bio, style tags, wardrobe uploads)
- **Social Feed**: Infinite scroll of outfits, looks, and style posts with like, comment, share, and follow functionality
- **AI Styling**: Outfit recommendations based on user wardrobe/photos with seasonal lookbooks and personalized style drops
- **Community**: Groups for style niches (streetwear, formal, casual, inclusive fashion) with challenges and private messaging
- **Subscription Model**: Free tier (browse, post, basic AI styling) and Premium tier (advanced AI styling, exclusive discounts, seasonal lookbooks, ad-free)

### Additional Features
- **Gamification**: Badges, streaks, and leaderboards for engagement
- **Image Processing**: Auto-cropping and background removal for outfit posts
- **Trending Hashtags**: Curated collections and viral content discovery

## 🎨 UI/UX

- **Modern & Minimalist Design**: Clean typography (Sans-serif, bold headings)
- **Solid Color Strategy**: High-contrast black background with neon pink (#FF2E63) and electric blue (#08D9D6) accents
- **Color Palette**:
  - Background: #000000 (black)
  - Secondary: #0A0A0A (dark gray)
  - Primary text: #FFFFFF (white)
  - Secondary text: #9CA3AF (gray)
  - Accent: #FF2E63 (neon pink)
  - Secondary accent: #08D9D6 (electric blue)
- **User-Friendly Navigation**: Bottom navigation bar (Feed, Explore, Post, Profile, Premium)
- **Stunning Visuals**: High-quality image rendering with dynamic transitions

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 with React 19
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT with bcrypt
- **Payment**: Stripe integration
- **File Upload**: Multer

### Cloud & Infrastructure
- **Hosting**: AWS / Azure / Firebase (ready for deployment)
- **Payment Gateway**: Stripe

## 📁 Project Structure

```
Style Snap/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Next.js app router pages
│   │   │   ├── page.tsx    # Home/Feed page
│   │   │   ├── profile/    # User profile page
│   │   │   ├── explore/    # Explore page
│   │   │   ├── post/       # Post creation page
│   │   │   ├── premium/    # Premium subscription page
│   │   │   ├── ai-styling/ # AI styling recommendations
│   │   │   ├── community/  # Community features
│   │   │   └── achievements/ # Gamification features
│   │   ├── components/     # Reusable components
│   │   │   └── Navigation.tsx
│   │   └── lib/           # Utility functions
│   │       └── utils.ts
│   ├── package.json
│   └── tsconfig.json
│
└── backend/                 # Express backend API
    ├── src/
    │   ├── routes/        # API routes
    │   │   ├── auth.ts    # Authentication endpoints
    │   │   ├── subscription.ts # Stripe subscription endpoints
    │   │   └── upload.ts  # Image upload endpoints
    │   ├── middleware/    # Express middleware
    │   │   └── auth.ts    # JWT authentication
    │   ├── db/           # Database configuration
    │   │   ├── connection.ts
    │   │   └── schema.sql
    │   └── index.ts      # Main server file
    ├── package.json
    └── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Stripe account (for payments)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

The backend will run on `http://localhost:5000`

### Environment Variables

#### Backend (.env)
```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/stylesnap
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
FRONTEND_URL=http://localhost:3000
```

### Database Setup

Run the schema SQL file to create all necessary tables:

```bash
psql -U your_user -d stylesnap -f backend/src/db/schema.sql
```

## 📱 Pages & Features

### Available Pages
- **/** - Social feed with posts, likes, comments
- **/profile** - User profile with wardrobe management
- **/explore** - Discover trending content and categories
- **/post** - Create new outfit posts
- **/premium** - Subscription plans and pricing
- **/ai-styling** - AI-powered outfit recommendations
- **/community** - Groups and challenges
- **/achievements** - Badges, streaks, and leaderboards

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/social` - Social media login

#### Subscriptions
- `POST /api/subscription/create-checkout-session` - Create Stripe checkout
- `GET /api/subscription/status` - Get subscription status
- `POST /api/subscription/cancel` - Cancel subscription
- `POST /api/subscription/webhook` - Stripe webhook handler

#### Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images

## 💳 Subscription Plans

- **Free Tier**: Browse, post, basic AI styling
- **Monthly**: $9.99/month - Full premium features
- **Yearly**: $79.99/year (20% savings)
- **Student**: $4.99/month (50% discount with valid ID)

## 🎯 Growth & Traffic Strategy

- **Viral Loops**: Share outfits on Instagram/TikTok with embedded links
- **Gamification**: Badges, streaks, and leaderboards for engagement
- **Influencer Partnerships**: Early adoption by fashion creators
- **Referral Rewards**: Free premium days for inviting friends

## 🛡 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled for cross-origin requests
- Stripe webhook signature verification
- Input validation and sanitization

## 📝 Development Notes

- The app uses a modern, minimalist design with neon pink/blue accents
- All pages are mobile-first responsive
- Image processing endpoints are ready for integration with background removal APIs (remove.bg, Cloudinary AI, etc.)
- The database schema includes all necessary tables for the full feature set

## 🚧 Future Enhancements

- Real-time messaging with WebSocket
- Advanced AI styling with OpenAI API integration
- Video content support
- AR try-on features
- Expanded social integrations

## 📄 License

This project is proprietary and confidential.

---

Built with ❤️ for fashion enthusiasts
