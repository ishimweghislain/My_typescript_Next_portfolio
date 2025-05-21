# ISHIMWE GHISLAIN Portfolio

A modern portfolio website showcasing my skills, projects, and services as a fullstack developer, software engineer, graphic designer, and content creator.

## Features

- Modern design with interactive elements
- Responsive layout for all devices
- Animated technology icons with rotating borders
- Contact form with email integration
- Web3 integration
- Snow effect background

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Three.js
- Framer Motion
- EmailJS
- Web3.js

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ishimweghislain/ishimwe_ghislain_portfolio.git
cd ishimwe_ghislain_portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Setting Up Email Functionality

The contact form uses EmailJS to send emails. To set it up:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create a new email template with the following template variables:
   - `from_name`: Sender's name
   - `from_email`: Sender's email
   - `subject`: Email subject
   - `message`: Email message
   - `to_name`: Your name
   - `to_email`: Your email address
   - `reply_to`: Sender's email for replies

4. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

Replace the placeholder values with your actual EmailJS credentials.

## Deployment

This project is configured for continuous deployment to both GitHub Pages and Netlify.

### GitHub Pages Deployment

The portfolio is automatically deployed to GitHub Pages using GitHub Actions whenever changes are pushed to the main branch. The deployment workflow:

1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Builds the Next.js application with static export
5. Deploys to GitHub Pages

You can view the deployed site at: https://ishimweghislain.github.io/ishimwe_ghislain_portfolio/

### Netlify Deployment

The portfolio is also configured for continuous deployment to Netlify:

1. The repository is connected to Netlify
2. Netlify automatically builds and deploys the site when changes are pushed to the main branch
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

You can view the Netlify deployment at your custom Netlify URL.

## Contact

- Email: ishimweghislain82@gmail.com
- Phone: +250 781262526
- Location: Kamonyi, Ruyenzi, Rwanda

## Social Media

- LinkedIn: [ishimweghislain](https://linkedin.com/in/ishimweghislain)
- Twitter: [ishimweghislain](https://twitter.com/ishimweghislain)
- Instagram: [ghislain_ishimwe](https://instagram.com/ghislain_ishimwe)
- GitHub: [ishimweghislain](https://github.com/ishimweghislain)
- WhatsApp: [+250 781262526](https://wa.me/250781262526)
