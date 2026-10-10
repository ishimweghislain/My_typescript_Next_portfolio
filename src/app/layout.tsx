import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ghislain.dev'),
  title: {
    default: 'Ishimwe Ghislain — Full Stack Developer & Software Engineer | Portfolio',
    template: '%s | Ishimwe Ghislain',
  },
  description:
    'Official portfolio of Ishimwe Ghislain, an experienced Full Stack Developer & Software Engineer based in Rwanda. Shipping production platforms across fintech, e-commerce, and education with Next.js, TypeScript, Laravel, Flutter, PostgreSQL, and Docker.',
  keywords: [
    'Ishimwe Ghislain',
    'ishimwe ghislain',
    'Ghislain Ishimwe',
    'ghislain ishimwe',
    'Ishimwe Ghislain portfolio',
    'Ishimwe Ghislain CV',
    'Ishimwe Ghislain resume',
    'Ishimwe Ghislain developer',
    'Ishimwe Ghislain software engineer',
    'Ishimwe Ghislain Rwanda',
    'Ishimwe Ghislain Kigali',
    'Ishimwe Ghislain Kamonyi',
    'Full Stack Developer Rwanda',
    'Software Engineer Kigali Rwanda',
    'Fullstack Software Ltd',
    'ImboniHub',
    'LoanMS',
    'Fullstack Domains',
    'Next.js developer Rwanda',
    'TypeScript engineer',
    'Laravel developer Rwanda',
    'Flutter mobile developer',
    'PostgreSQL database architect',
    'Docker DevOps engineer',
  ],
  authors: [{ name: 'Ishimwe Ghislain', url: 'https://ghislain.dev' }],
  creator: 'Ishimwe Ghislain',
  publisher: 'Ishimwe Ghislain',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ishimwe Ghislain — Full Stack Developer & Software Engineer',
    description:
      'Official portfolio of Ishimwe Ghislain. Full Stack Developer & Software Engineer in Rwanda building production systems in Next.js, TypeScript, Laravel, Flutter, PostgreSQL, and Docker.',
    url: 'https://ghislain.dev',
    siteName: 'Ishimwe Ghislain Portfolio',
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: '/images/me.jpeg',
        width: 800,
        height: 800,
        alt: 'Ishimwe Ghislain — Full Stack Developer & Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ishimwe Ghislain — Full Stack Developer & Software Engineer',
    description:
      'Official portfolio of Ishimwe Ghislain. Full Stack Developer in Rwanda building production systems with Next.js, Laravel, Flutter, and PostgreSQL.',
    images: ['/images/me.jpeg'],
    creator: '@ghislain_ishimwe',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': 'https://ghislain.dev/#webpage',
      url: 'https://ghislain.dev',
      name: 'Ishimwe Ghislain — Portfolio & Curriculum Vitae',
      description: 'Official portfolio and software engineering showcase of Ishimwe Ghislain.',
      inLanguage: 'en-US',
      mainEntity: {
        '@id': 'https://ghislain.dev/#person',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://ghislain.dev/#person',
      name: 'Ishimwe Ghislain',
      alternateName: ['Ghislain Ishimwe', 'Ishimwe G.'],
      jobTitle: 'Full Stack Developer & Software Engineer',
      telephone: '+250781262526',
      email: 'ishimweghislain82@gmail.com',
      url: 'https://ghislain.dev',
      image: 'https://ghislain.dev/images/me.jpeg',
      description:
        'Senior-minded Full Stack Developer based in Kamonyi/Kigali, Rwanda. Specializing in Next.js, TypeScript, Node.js, Laravel, Flutter, PostgreSQL, and Docker.',
      sameAs: [
        'https://github.com/ishimweghislain',
        'https://www.linkedin.com/in/ishimwe-ghislain-b26ba6288',
        'https://instagram.com/ghislain_ishimwe',
        'https://wa.me/250781262526',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kamonyi',
        addressRegion: 'Southern Province / Kigali',
        addressCountry: 'Rwanda',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Fullstack Software Ltd',
      },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Adventist University of Central Africa (AUCA)',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Saint Kizito',
        },
      ],
      knowsAbout: [
        'Next.js',
        'TypeScript',
        'JavaScript',
        'React',
        'Node.js',
        'NestJS',
        'Laravel',
        'PostgreSQL',
        'MySQL',
        'Flutter',
        'Docker',
        'Nginx',
        'CI/CD',
        'Fintech Systems',
        'Web Application Development',
        'REST APIs',
        'Software Architecture',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://ghislain.dev/#website',
      url: 'https://ghislain.dev',
      name: 'Ishimwe Ghislain',
      description: 'Official portfolio and engineering projects of Ishimwe Ghislain',
      publisher: {
        '@id': 'https://ghislain.dev/#person',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash: set data-theme before paint, defaulting to dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}else if(t==='system'){var mq=window.matchMedia('(prefers-color-scheme: dark)');document.documentElement.setAttribute('data-theme',mq.matches?'dark':'light');}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
        {/* JSON-LD Structured Data Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
