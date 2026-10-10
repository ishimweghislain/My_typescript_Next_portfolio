import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function generateCV() {
  console.log('Generating Ishimwe Ghislain CV PDF...');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ishimwe Ghislain - Curriculum Vitae</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #16181F;
      background: #FFFFFF;
      font-size: 10.5pt;
      line-height: 1.5;
      padding: 24px 32px;
    }

    .mono {
      font-family: 'JetBrains Mono', monospace;
    }

    .header {
      border-bottom: 2px solid #16181F;
      padding-bottom: 14px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .name-block h1 {
      font-size: 24pt;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #16181F;
      line-height: 1.1;
    }

    .name-block .title {
      font-size: 12pt;
      font-weight: 600;
      color: #3B6000;
      margin-top: 3px;
    }

    .contact-block {
      text-align: right;
      font-size: 8.5pt;
      color: #4A5060;
      line-height: 1.5;
    }

    .contact-block a {
      color: #16181F;
      text-decoration: none;
      font-weight: 500;
    }

    .section {
      margin-bottom: 14px;
    }

    .section-title {
      font-size: 9.5pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #16181F;
      border-bottom: 1px solid #DADDE4;
      padding-bottom: 3px;
      margin-bottom: 8px;
    }

    .summary-text {
      font-size: 9pt;
      color: #2D313E;
      line-height: 1.55;
    }

    .exp-item {
      margin-bottom: 10px;
    }

    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }

    .exp-role {
      font-size: 10pt;
      font-weight: 700;
      color: #16181F;
    }

    .exp-company {
      font-size: 9.5pt;
      font-weight: 600;
      color: #3B6000;
    }

    .exp-date {
      font-size: 8.5pt;
      color: #5A6070;
      font-family: 'JetBrains Mono', monospace;
    }

    .bullet-list {
      list-style-type: disc;
      padding-left: 18px;
      margin-top: 4px;
    }

    .bullet-list li {
      font-size: 8.8pt;
      color: #343845;
      margin-bottom: 3px;
      line-height: 1.45;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 6px 12px;
      font-size: 8.8pt;
    }

    .skills-cat {
      font-weight: 700;
      color: #16181F;
      text-transform: uppercase;
      font-size: 7.8pt;
      letter-spacing: 0.04em;
    }

    .skills-val {
      color: #343845;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 14px;
    }

    .project-card {
      background: #F8F9FA;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      padding: 8px 10px;
    }

    .project-name {
      font-weight: 700;
      font-size: 9pt;
      color: #16181F;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .project-cat {
      font-size: 7.2pt;
      color: #3B6000;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
    }

    .project-desc {
      font-size: 8pt;
      color: #4B5263;
      margin: 3px 0 4px;
      line-height: 1.35;
    }

    .project-tech {
      font-size: 7.2pt;
      color: #6B7280;
      font-family: 'JetBrains Mono', monospace;
    }

    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    .edu-item {
      margin-bottom: 6px;
    }

    .edu-degree {
      font-weight: 700;
      font-size: 9pt;
      color: #16181F;
    }

    .edu-school {
      font-size: 8.5pt;
      color: #4A5060;
    }

    .edu-date {
      font-size: 7.8pt;
      color: #6B7280;
      font-family: 'JetBrains Mono', monospace;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header">
    <div class="name-block">
      <h1>ISHIMWE GHISLAIN</h1>
      <div class="title mono">FULL STACK DEVELOPER &amp; SOFTWARE ENGINEER</div>
    </div>
    <div class="contact-block">
      <div>Kamonyi / Kigali, Rwanda</div>
      <div><strong>Tel / WhatsApp:</strong> +250 781 262 526</div>
      <div><strong>Email:</strong> ishimweghislain82@gmail.com</div>
      <div><strong>Portfolio:</strong> https://ghislain.dev</div>
      <div><strong>GitHub:</strong> github.com/ishimweghislain</div>
      <div><strong>LinkedIn:</strong> linkedin.com/in/ishimwe-ghislain-b26ba6288</div>
    </div>
  </div>

  <!-- SUMMARY -->
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p class="summary-text">
      Senior-minded Full Stack Developer with extensive production experience designing, building, and deploying mission-critical platforms across fintech, micro-lending, e-commerce, education, and media. Proven expertise delivering end-to-end solutions: relational database design, scalable REST/GraphQL APIs (Node.js, NestJS, Laravel), high-performance modern web apps (Next.js 15, TypeScript), native-feel mobile applications (Flutter), and containerized deployments (Docker, Nginx, CI/CD). Passionate about robust architecture, clean code, and building high-impact tech for Rwanda and global remote teams.
    </p>
  </div>

  <!-- EXPERIENCE -->
  <div class="section">
    <div class="section-title">Work Experience</div>
    
    <div class="exp-item">
      <div class="exp-header">
        <div>
          <span class="exp-role">Full Stack Developer &amp; Technical Trainer</span>
          <span> &bull; </span>
          <span class="exp-company">Fullstack Software Ltd</span>
        </div>
        <div class="exp-date">2024 &ndash; Present | Kigali, Rwanda</div>
      </div>
      <ul class="bullet-list">
        <li>Engineered and shipped 14+ client and enterprise production platforms spanning fintech, property management, and e-commerce.</li>
        <li>Architected multi-tier lending engines (LoanMS, InstaCash, CBFinance) handling loan requests, underwriting calculations, amortization schedules, and payment disbursements.</li>
        <li>Built and integrated Rwandan telecom payment gateways (MTN MoMo, Airtel Money API) for automated real-time transaction processing.</li>
        <li>Managed cloud infrastructure, Linux VPS instances, Docker container stacks, Nginx reverse proxies, SSL certificates, and CI/CD pipelines.</li>
        <li>Trained and mentored 50+ students in full-stack web engineering, database architecture, and software engineering best practices.</li>
      </ul>
    </div>
  </div>

  <!-- TECHNICAL SKILLS -->
  <div class="section">
    <div class="section-title">Technical Competencies</div>
    <div class="skills-grid">
      <div class="skills-cat mono">Languages:</div>
      <div class="skills-val">TypeScript, JavaScript (ES6+), PHP, Dart, Python, SQL, HTML5, CSS3</div>

      <div class="skills-cat mono">Frontend:</div>
      <div class="skills-val">Next.js 15 (App Router), React 19, Tailwind CSS v4, Framer Motion, Redux Toolkit, PWA</div>

      <div class="skills-cat mono">Backend:</div>
      <div class="skills-val">Node.js, NestJS, Express.js, Laravel 11, REST APIs, GraphQL, Microservices</div>

      <div class="skills-cat mono">Databases:</div>
      <div class="skills-val">PostgreSQL, MySQL, Redis, Supabase, Prisma ORM, TypeORM, Eloquent</div>

      <div class="skills-cat mono">Mobile:</div>
      <div class="skills-val">Flutter, Dart, Cross-Platform Android/iOS, State Management (Bloc / Provider)</div>

      <div class="skills-cat mono">DevOps &amp; Cloud:</div>
      <div class="skills-val">Docker, Docker Compose, Linux / Ubuntu VPS, Nginx, CI/CD Actions, Vercel, Netlify, Git</div>

      <div class="skills-cat mono">Integrations:</div>
      <div class="skills-val">MTN MoMo API, Airtel Money, SMTP / Nodemailer, Webhooks, Stripe, EmailJS</div>
    </div>
  </div>

  <!-- KEY PRODUCTION PROJECTS -->
  <div class="section">
    <div class="section-title">Selected Production Projects</div>
    <div class="projects-grid">
      <div class="project-card">
        <div class="project-name">
          <span>ImboniHub</span>
          <span class="project-cat">Media &amp; Publishing</span>
        </div>
        <div class="project-desc">Journalism and creator publishing platform with automated editorial workflows and custom CMS.</div>
        <div class="project-tech">Next.js &bull; TypeScript &bull; Tailwind &bull; PostgreSQL</div>
      </div>

      <div class="project-card">
        <div class="project-name">
          <span>Fullstack Domains</span>
          <span class="project-cat">Infrastructure &amp; SaaS</span>
        </div>
        <div class="project-desc">Domain registration, automated DNS provisioning, and hosting management portal for Rwandan businesses.</div>
        <div class="project-tech">Next.js &bull; Node.js &bull; DNS APIs &bull; MoMo API</div>
      </div>

      <div class="project-card">
        <div class="project-name">
          <span>LoanMS Platform</span>
          <span class="project-cat">Fintech &amp; Lending</span>
        </div>
        <div class="project-desc">Microfinance lifecycle automation suite with borrower risk scoring, schedule calculations, and ledgers.</div>
        <div class="project-tech">Laravel &bull; PostgreSQL &bull; React &bull; Tailwind</div>
      </div>

      <div class="project-card">
        <div class="project-name">
          <span>InstaCash Lending</span>
          <span class="project-cat">Fintech &amp; Payments</span>
        </div>
        <div class="project-desc">Rapid micro-lending web application with real-time disbursement and automated SMS alerts.</div>
        <div class="project-tech">NestJS &bull; Next.js &bull; MoMo &bull; Docker</div>
      </div>
    </div>
  </div>

  <!-- EDUCATION, AWARDS & LANGUAGES -->
  <div class="section">
    <div class="two-col">
      <div>
        <div class="section-title">Education</div>
        <div class="edu-item">
          <div class="edu-degree">BSc in Software Engineering</div>
          <div class="edu-school">Adventist University of Central Africa (AUCA)</div>
          <div class="edu-date">In Progress &bull; Kigali, Rwanda</div>
        </div>
        <div class="edu-item" style="margin-top: 6px;">
          <div class="edu-degree">Secondary Education Diploma</div>
          <div class="edu-school">Saint Kizito</div>
          <div class="edu-date">Completed &bull; Rwanda</div>
        </div>
      </div>

      <div>
        <div class="section-title">Awards &amp; Languages</div>
        <div style="margin-bottom: 8px;">
          <div style="font-weight: 700; font-size: 9pt; color: #16181F;">4th Place &ndash; Hack With Me Hackathon</div>
          <div style="font-size: 8.5pt; color: #4A5060;">National Software Hackathon Recognition</div>
        </div>
        <div style="margin-top: 8px;">
          <div style="font-weight: 700; font-size: 8.5pt; color: #16181F; margin-bottom: 2px;">Languages:</div>
          <div style="font-size: 8.5pt; color: #343845;">
            &bull; <strong>Kinyarwanda:</strong> Native<br>
            &bull; <strong>English:</strong> Professional Working Proficiency<br>
            &bull; <strong>French:</strong> Intermediate
          </div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
`;

  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge' });
  } catch {
    browser = await chromium.launch({ channel: 'chrome' });
  }
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });

  const outputPath = path.resolve('public', 'Ishimwe_Ghislain_CV.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      right: '12mm',
      bottom: '10mm',
      left: '12mm',
    },
  });

  await browser.close();
  console.log(`CV PDF successfully generated at: ${outputPath}`);
}

generateCV().catch((err) => {
  console.error('Failed to generate CV PDF:', err);
  process.exit(1);
});
