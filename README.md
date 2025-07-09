# Slice N Share - Landing Page

A modern, responsive landing page for Slice N Share, built with Next.js and React.

## Features

- 🎮 **Gaming Focused Design** - Tailored for the gaming community
- 📱 **Responsive Layout** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Next.js for optimal speed
- 🎨 **Modern UI** - Clean, professional design with smooth animations
- 🔧 **Custom Design System** - Consistent styling across components

## Tech Stack

- **Framework**: Next.js 15.3.5
- **UI Library**: React 19
- **Styling**: Custom CSS with design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Development**: ESLint, PostCSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd slice-n-share
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── components/     # React components
│   ├── globals.css     # Global styles and design system
│   ├── layout.js       # Root layout
│   └── page.js         # Home page
public/
├── Logo/              # Brand assets
├── Streamers/         # Streamer images
├── Contact/           # Contact section assets
└── Hero_Video/        # Hero video assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Design System

The project uses a custom design system with:
- Consistent color palette
- Typography scale
- Spacing system
- Component patterns

All styles are centralized in `src/app/globals.css` for maintainability.

## Deployment

The project is optimized for deployment on Vercel, but can be deployed to any platform that supports Next.js.

## Contributing

1. Follow the existing code style
2. Use the established design system
3. Test on multiple devices
4. Update documentation as needed

## License

[Your License Here]
