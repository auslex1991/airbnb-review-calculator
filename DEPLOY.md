# Deploying to Vercel — Step by Step

---

## Part 1 — Install the tools you need (one-time)

### 1a. Install Node.js
Node.js is required to run and build the app.

1. Go to https://nodejs.org
2. Download the **LTS** version (the button on the left)
3. Run the installer and click through with all defaults
4. To verify it worked, open **Terminal** (Mac) or **Command Prompt** (Windows) and type:
   ```
   node --version
   ```
   You should see something like `v20.11.0`.

### 1b. Install Git
Git is used to upload your code to GitHub.

- **Mac**: Open Terminal and type `git --version`. If it's not installed, macOS will prompt you to install it automatically.
- **Windows**: Download from https://git-scm.com/download/win and install with all defaults.

To verify: type `git --version` in Terminal / Command Prompt. You should see a version number.

---

## Part 2 — Create a GitHub account (one-time)

1. Go to https://github.com
2. Click **Sign up** and create a free account
3. Verify your email address

---

## Part 3 — Upload your code to GitHub

### 3a. Create a new repository on GitHub
1. Go to https://github.com/new
2. Name it something like `airbnb-review-calculator`
3. Leave everything else as default (Public, no README)
4. Click **Create repository**
5. Leave this page open — you'll need the URL shown on it

### 3b. Open Terminal / Command Prompt
- **Mac**: Press `Cmd + Space`, type `Terminal`, press Enter
- **Windows**: Press `Windows key`, type `cmd`, press Enter

### 3c. Navigate to your project folder
Type the following, replacing the path with where your project folder actually is:

**Mac:**
```bash
cd ~/Desktop/airbnb-review-calculator
```
(or wherever you saved it — you can drag the folder into Terminal to auto-fill the path)

**Windows:**
```bash
cd C:\Users\YourName\Desktop\airbnb-review-calculator
```

### 3d. Run these commands one at a time
Copy and paste each line, pressing Enter after each:

```bash
git init
```
```bash
git add .
```
```bash
git commit -m "Initial commit"
```
```bash
git branch -M main
```

Now add your GitHub repo URL. Replace `YOUR_USERNAME` with your actual GitHub username:
```bash
git remote add origin https://github.com/YOUR_USERNAME/airbnb-review-calculator.git
```

Finally, push the code:
```bash
git push -u origin main
```

You'll be prompted to log in to GitHub. If it asks for a password, you may need to use a **Personal Access Token** instead — see: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

Once done, refresh your GitHub page — you should see all your files there.

---

## Part 4 — Deploy on Vercel (free)

1. Go to https://vercel.com and click **Sign Up**
2. Choose **Continue with GitHub** — this connects your GitHub account
3. Once logged in, click **Add New… → Project**
4. You'll see a list of your GitHub repos. Find `airbnb-review-calculator` and click **Import**
5. Vercel will auto-detect that it's a Next.js project
6. You don't need to change any settings — just click **Deploy**
7. Wait about 60 seconds while it builds
8. 🎉 Your site is live! Vercel will show you the URL (e.g. `https://airbnb-review-calculator.vercel.app`)

---

## Part 5 — Update your site's SEO URLs

Now that you have your real URL, update two lines in `app/layout.jsx`:

1. Open the file `app/layout.jsx` in any text editor (Notepad, TextEdit, VS Code, etc.)
2. Find this line (around line 22):
   ```js
   metadataBase: new URL('https://your-domain.vercel.app'),
   ```
   Change it to your actual URL, e.g.:
   ```js
   metadataBase: new URL('https://airbnb-review-calculator.vercel.app'),
   ```
3. Find this line (around line 40):
   ```js
   canonical: 'https://your-domain.vercel.app',
   ```
   Change it to match.
4. Save the file, then run these commands in Terminal to push the update:
   ```bash
   git add .
   git commit -m "Update SEO URLs"
   git push
   ```
   Vercel will automatically redeploy within about 30 seconds.

---

## Making edits in the future

Every time you want to update the site:
1. Edit the files (see table below)
2. In Terminal, run:
   ```bash
   git add .
   git commit -m "Describe what you changed"
   git push
   ```
3. Vercel auto-deploys — your live site updates in ~30 seconds

| What to change | File to edit |
|---|---|
| Calculator logic / formula | `components/Calculator.jsx` |
| Page title, description, keywords | `app/layout.jsx` → `metadata` object |
| Hero text, FAQ content, tips | `app/page.jsx` |
| Colors | `tailwind.config.js` → `colors` section |
| Button / input styles | `app/globals.css` |

---

## Optional: Use a custom domain

If you own a domain (e.g. `airbnbreviewcalculator.com`):

1. In Vercel, go to your project → **Settings → Domains**
2. Add your domain and follow the DNS instructions
3. Vercel handles SSL (the padlock) automatically — no extra setup needed
