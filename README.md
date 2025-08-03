# 117SECOPS - Cybersecurity Portfolio Website

A modern, interactive portfolio website showcasing cybersecurity projects, skills, and experience. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Interactive Terminal Mode**: Command-line interface for navigating the site
- **Project Showcase**: Detailed project documentation with inline image galleries
- **Responsive Design**: Mobile-first design with dark/light theme support
- **Static Export**: Optimized for static hosting with proper routing
- **SEO Optimized**: Meta tags, structured data, and performance optimized

## Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives
- **Content**: Markdown with custom renderer
- **Deployment**: Static export with Apache .htaccess

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 117secops
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

1. Generate project data and build:
```bash
npm run build
```

2. The static files will be generated in the `out/` directory.

3. Upload the contents of `out/` to your web server.

## Project Structure

```
117secops/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   └── ...                # Feature-specific components
├── content/               # Markdown content
│   ├── projects/          # Project documentation
│   └── blog/              # Blog posts
├── lib/                   # Utility functions
├── public/                # Static assets
│   ├── data/              # Generated JSON data
│   └── images/            # Image assets
├── scripts/               # Build scripts
└── styles/                # Global styles
```

## Key Components

- **TerminalInterface**: Interactive command-line interface
- **BlogContentRenderer**: Custom markdown renderer with inline components
- **InlineGallery**: Image carousel component for project documentation
- **ProjectDataGenerator**: Script to generate static project data

## Customization

### Adding Projects

1. Create a markdown file in `content/projects/`
2. Use the frontmatter format:
```yaml
---
title: "Project Title"
description: "Project description"
date: "2025-01-01"
category: "blue" # or "red", "Infrastructure"
tags: ["tag1", "tag2"]
image: "/path/to/image.jpg"
---
```

3. Run `npm run build` to regenerate project data

### Terminal Commands

Add new commands in `components/terminal-interface.tsx`:
```typescript
{
  name: "command",
  description: "Command description",
  action: () => "Command output"
}
```

## Deployment

The site is configured for static hosting with Apache. The `.htaccess` file handles:

- URL rewriting for SPA routing
- Gzip compression
- Caching headers
- CORS configuration

## License

This project is licensed under the MIT License.

## Contact

- **Website**: [117secops.com](https://117secops.com)
- **LinkedIn**: [Samson Otori](https://www.linkedin.com/in/otori-samson/)
