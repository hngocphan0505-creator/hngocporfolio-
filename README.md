# Modern Neo-Brutalist Portfolio Website

A premium, highly interactive personal portfolio website designed with a modern neo-brutalist aesthetic. It features vibrant HSL tailormade colors, bold typography, glassmorphism, responsive grid layouts, custom project detail modals, and smooth animations.

## Key Features
- **Responsive Navigation & Mobile Drawer**: Seamless transitions and responsive layout optimized for all device sizes.
- **Neo-Brutalist Card Layouts**: Distinctive typography, thick borders, and offset shadows for an authentic brutalist vibe.
- **Dynamic Projects & Achievements Grid**: Powered by client-side data configuration (`portfolio-data.js` and `script.js`).
- **Interactive Modals**: Detailed popups for each project and award highlighting case details, role responsibilities, skill chips, metrics, and visual evidence.
- **Vercel Web Analytics Support**: Native analytics tracking ready to measure pageviews and interactions.

---

## How to Run Locally

Since this is a fully static website built using HTML, CSS, and vanilla JS, running it locally is extremely simple:

1. **Clone the repository** (or download the source files).
2. **Open the project folder**:
   ```bash
   cd portfolio-website
   ```
3. **Run a local server** (Optional but recommended for loading images and scripts cleanly without CORS or file path issues):
   - Using **VS Code Live Server**: Open the folder in VS Code, click "Go Live" at the bottom right.
   - Using **Python**:
     ```bash
     python -m http.server 8000
     ```
     Then open `http://localhost:8000` in your browser.
   - Using **Node.js (`npx`)**:
     ```bash
     npx serve
     ```
     Then open `http://localhost:3000` in your browser.

---

## How to Deploy on Vercel

Vercel is the ideal platform for hosting this static site. You can deploy it for free in less than a minute:

### Option 1: Deploy via Vercel Git Integration (Recommended)
1. Push your local repository to GitHub.
2. Sign in to your [Vercel Dashboard](https://vercel.com).
3. Click **Add New** > **Project**.
4. Import your GitHub repository.
5. Vercel will auto-detect it as a static project. Keep all default configurations (no build steps needed) and click **Deploy**.

### Option 2: Deploy via Vercel CLI
If you prefer terminal-based deployment:
1. Install Vercel globally:
   ```bash
   npm install -g vercel
   ```
2. Log in and deploy:
   ```bash
   vercel
   ```
3. Follow the terminal prompts to link and deploy your site.

### Enabling Web Analytics on Vercel
1. Go to your project page in the **Vercel Dashboard**.
2. Click on the **Analytics** tab at the top.
3. Click **Enable** to turn on Web Analytics.
4. The website already contains the script tracking block in `index.html`:
   ```html
   <script defer src="/_vercel/insights/script.js"></script>
   ```
   Vercel will automatically start tracking pageviews and user insights once enabled!
