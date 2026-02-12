# Bolonda Family Website

A modern family website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS 4**. This site serves as the digital home for the Bolonda family — showcasing family members, experiences, blog articles, services, and a photo gallery.

## Features

- **Home** — Hero section with highlights of family, services, and blog posts
- **About Us** — Family story, values, and member profiles
- **Experiences** — A timeline of family milestones and adventures
- **Blog & Articles** — Posts and articles written by family members
- **Services** — Professional services offered by each family member
- **Gallery** — Filterable photo gallery with lightbox viewer
- **Contact** — Contact form and info section

## Tech Stack

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS 4](https://tailwindcss.com/) — Utility-first CSS framework
- Static export enabled for GitHub Pages deployment

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server (not for static export)
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout with Navbar & Footer
│   ├── globals.css         # Global styles
│   ├── about/page.tsx      # About Us page
│   ├── experiences/page.tsx # Experiences page
│   ├── blog/
│   │   ├── page.tsx        # Blog listing page
│   │   └── [id]/page.tsx   # Individual blog post page
│   ├── services/page.tsx   # Services page
│   ├── gallery/page.tsx    # Gallery page
│   └── contact/page.tsx    # Contact page
├── components/             # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── SectionHeading.tsx
│   ├── FamilyCard.tsx
│   ├── ServiceCard.tsx
│   ├── BlogCard.tsx
│   ├── ExperienceCard.tsx
│   ├── GalleryGrid.tsx
│   └── Icons.tsx
└── lib/
    └── data.ts             # Sample family data (replace with your own)
public/
└── images/                 # Add your family photos here
    ├── family/
    ├── blog/
    ├── experiences/
    └── gallery/
```

## Adding Your Content

1. **Family Data** — Edit `src/lib/data.ts` to replace sample data with your real family members, services, blog posts, experiences, and gallery images.
2. **Photos** — Add images to the `public/images/` subfolders and update the paths in `data.ts`.
3. **Contact Info** — Update email, phone, and location in `src/components/Footer.tsx` and `src/app/contact/page.tsx`.

## Deploying to GitHub Pages

This project is pre-configured for GitHub Pages deployment:

1. Push your code to the `main` branch on GitHub.
2. Go to your repository **Settings → Pages**.
3. Under **Source**, select **GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) will automatically build and deploy on every push to `main`.

> **Note:** If your repository is at `github.com/username/bolonda-main` (not a user/org site), uncomment the `basePath` line in `next.config.ts` and set it to `/bolonda-main`.

## License

This project is private and intended for the Bolonda family. All rights reserved.
