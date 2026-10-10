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
  title: 'Ishimwe Ghislain | Full Stack Developer',
  description:
    'Full Stack Developer in Kamonyi, Rwanda. Production platforms across fintech, e-commerce and education.',
  keywords: [
    'Ishimwe Ghislain',
    'Full Stack Developer',
    'Rwanda',
    'Kigali',
    'Kamonyi',
    'Next.js',
    'TypeScript',
    'Node.js',
    'NestJS',
    'Laravel',
    'PostgreSQL',
    'Flutter',
    'DevOps',
    'Docker',
    'Software Engineer',
  ],
  authors: [{ name: 'Ishimwe Ghislain', url: 'https://ghislain.dev' }],
  creator: 'Ishimwe Ghislain',
  publisher: 'Ishimwe Ghislain',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ishimwe Ghislain | Full Stack Developer',
    description:
      'Full Stack Developer in Kamonyi, Rwanda. Production platforms across fintech, e-commerce and education.',
    url: 'https://ghislain.dev',
    siteName: 'Ishimwe Ghislain Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/me.jpeg',
        width: 800,
        height: 800,
        alt: 'Ishimwe Ghislain — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ishimwe Ghislain | Full Stack Developer',
    description:
      'Full Stack Developer in Kamonyi, Rwanda. Production platforms across fintech, e-commerce and education.',
    images: ['/images/me.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ishimwe Ghislain',
  jobTitle: 'Full Stack Developer',
  url: 'https://ghislain.dev',
  image: 'https://ghislain.dev/images/me.jpeg',
  description:
    'Full Stack Developer in Kamonyi, Rwanda. Production platforms across fintech, e-commerce and education.',
  sameAs: [
    'https://github.com/ishimweghislain',
    'https://www.linkedin.com/in/ishimwe-ghislain-b26ba6288',
    'https://instagram.com/ghislain_ishimwe',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kamonyi',
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
    'PostgreSQL',
    'Laravel',
    'NestJS',
    'Flutter',
    'Docker',
    'CI/CD',
    'Fintech',
    'Web Development',
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
        {/* JSON-LD Person structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
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
