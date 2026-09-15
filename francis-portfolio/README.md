# Francis Chua — Portfolio Website

A single-page portfolio site built with plain HTML, CSS, and JavaScript.
No frameworks, no npm, no build step. Upload the files to GitHub, turn on
GitHub Pages, and it works.

---

## 1. What every file does

| File | What it's for |
|---|---|
| `index.html` | All the text and structure of the page. Edit your headline, about text, email, phone, LinkedIn link here. |
| `styles.css` | All the design: colours, spacing, fonts, responsive layout. |
| `script.js` | Your **portfolio list**, the filter buttons, the video/image popup, and the mobile menu. |
| `README.md` | This guide. Visitors never see it. |
| `.gitignore` | Tells GitHub to ignore junk files like `.DS_Store`. |
| `assets/images/` | Your profile photo, static ads, social images, AI images. |
| `assets/videos/` | Your MP4 video ads (see the file-size warning in section 11). |
| `assets/thumbnails/` | The still image shown before a video is opened. |
| `assets/resume/` | Your resume PDF. |

**The one rule:** file names must match exactly, including lowercase letters.
`Static-01.JPG` is *not* the same as `static-01.jpg` on GitHub Pages.

---

## 1b. What's already in the site

These files are already in place — the site is not empty:

| Slot | File | Shows as |
|---|---|---|
| Video ads 01–05 | Google Drive | Your five vertical video ads |
| Static ad 01 | `images/static-01.jpg` | Make Room For More |
| Static ad 02 | `images/static-02.jpg` | Transform Your Backyard |
| Static ad 03 | `images/static-03.jpg` | PowerCore Electric logo |
| Social 01 | `images/social-01.jpg` | Residential solar feature |
| Social 02 | `images/social-02.jpg` | ADU exterior feature |
| AI-assisted 01 | `videos/ai-01.mp4` | Anaya Building Construction logo animation |
| AI-assisted 02 | `videos/ai-02.mp4` | A1 Building Contractors logo animation |

The remaining slots (static 04–06, social 03, AI 03–04, video 06) show grey
"replace with your work" boxes until you drop files in. To hide one instead of
filling it, delete its `{ ... }` block from `script.js`.

The two AI logo animations are 1.6 MB each, so they live in the repo as real
MP4 files — no Drive needed for those.

---

## 2. How to replace your profile image

1. Crop your photo to a vertical shape (portrait, roughly 4:5 — for example 1200 × 1500 pixels).
2. Save it as `francis-profile.jpg`.
3. Put it in `assets/images/`, replacing the old one.

Until the file exists, the site shows a clean grey box instead of a broken image. Nothing crashes.

---

## 3. How to add or change videos

Open `script.js`. At the top you'll find `const portfolioItems = [ ... ]`.
Each video looks like this:

```js
{
  id: "video-01",
  type: "video",
  category: "video",
  src: "",
  driveId: "14OZCXW7h7dYO3lO920FRD3MJ2iY2KddA",
  poster: "assets/thumbnails/video-01.jpg",
  title: "Video Ad 01",
  platform: "Meta / Video Ad",
  role: "Editing + Creative Production"
}
```

### Right now: your 5 videos play from Google Drive

Your five videos are already wired up using their Google Drive IDs, so the site
works immediately without uploading large MP4 files.

**Each Drive video must be shared publicly or it will show a "no access" screen:**

1. Open the video in Google Drive.
2. Click **Share**.
3. Under *General access*, change **Restricted** to **Anyone with the link**.
4. Role: **Viewer**. Click **Done**.

Do this for all five videos. Then open your site and click each one to confirm it plays.

The Drive ID is the long code in the middle of a Drive link:

```
https://drive.google.com/file/d/14OZCXW7h7dYO3lO920FRD3MJ2iY2KddA/view
                                 └──────────── this part ────────────┘
```

To swap in a different Drive video, replace the `driveId` value.

### Later: switching a video to a local MP4 file

When you've compressed your videos (section 11), do this instead:

1. Name the file `video-01.mp4` and put it in `assets/videos/`.
2. In `script.js`, change that item to:

```js
src: "assets/videos/video-01.mp4",
driveId: "",
```

Local files load faster and look cleaner than the Drive player. Do it when you can.

### Video thumbnails

Export one frame of each video as a JPG, name it `video-01.jpg`, and put it in
`assets/thumbnails/`. If you skip this, the site falls back to Google's Drive
thumbnail, and if that fails too, it shows a grey "replace with your work" box.

### Adding a 7th video

Copy an entire `{ ... }` block, paste it before the closing `]`, put a comma
between items, and **give it a new unique `id`** like `"video-07"`.

Every item is its own separate object with its own separate file path.
Changing `video-01` can never affect `video-02`. That's by design.

---

## 4. How to add or change static ads

Save your images as `static-01.jpg` through `static-06.jpg` in `assets/images/`.
They can be any shape — 1:1, 4:5, or 9:16. The layout keeps each one at its
natural height instead of cropping everything into identical rectangles.

To add more, copy a static block in `script.js` and give it a new `id`
(`"static-07"`) and a new `src` (`"assets/images/static-07.jpg"`).

Same for social content (`social-01.jpg`) and AI-assisted work (`ai-01.jpg`).

---

## 5. How to change titles and captions

In `script.js`, edit these three lines on any item:

```js
title: "Home Improvement Ad",
platform: "Meta / Video Ad",
role: "Editing + Creative Production"
```

Keep them short — one line each. That's all the caption shows.

---

## 6. How the categories and filters work

The `category` field controls which filter button an item appears under:

| `category` value | Filter button |
|---|---|
| `"video"` | Video ads |
| `"static"` | Static ads |
| `"social"` | Social content |
| `"ai"` | AI-assisted |

Use exactly these lowercase words. A typo means the item only shows under "All".

---

## 7. How to update your LinkedIn URL

Open `index.html` and search for `REPLACE THE #`. You'll find:

```html
<a class="btn btn--line-invert" href="#" target="_blank" rel="noopener">LinkedIn</a>
```

Change `href="#"` to your profile, for example
`href="https://www.linkedin.com/in/francis-chua/"`.

---

## 8. How to replace your resume

Save your PDF as exactly `Francis-Chua-Resume.pdf` and put it in `assets/resume/`.
Both resume buttons (hero and contact) already point there. No code change needed.

---

## 9. How to test the website on your computer

Easiest way: double-click `index.html`. It opens in your browser and everything works.

If you want it to behave exactly like the live site, run a tiny local server.
Open Terminal (Mac) or Command Prompt (Windows) in the project folder and type:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser. Press `Ctrl + C` to stop.

---

## 10. How to publish with GitHub Pages

Step by step, assuming you've never used GitHub.

**A. Make an account**
Go to github.com and sign up. Verify your email.

**B. Create the repository**
1. Click the **+** at the top right → **New repository**.
2. Repository name: `francis-portfolio` (any name works, lowercase, no spaces).
3. Set it to **Public**. GitHub Pages needs public on a free account.
4. Do **not** tick "Add a README" — you already have one.
5. Click **Create repository**.

**C. Upload the files**
1. On the new empty repo page, click **uploading an existing file**.
2. Drag in `index.html`, `styles.css`, `script.js`, `README.md`, `.gitignore`
   **and the whole `assets` folder**.
3. Wait for every file to finish uploading.
4. At the bottom, in *Commit changes*, type `Add portfolio site`.
5. Click **Commit changes**.

**D. Turn on GitHub Pages**
1. Click the **Settings** tab of your repository.
2. In the left sidebar, click **Pages**.
3. Under *Build and deployment* → *Source*, choose **Deploy from a branch**.
4. Branch: **main**. Folder: **/ (root)**.
5. Click **Save**.

**E. Wait and open it**
Give it 1–3 minutes, then refresh the Pages settings screen. Your link appears at the top:

```
https://YOUR-USERNAME.github.io/francis-portfolio/
```

That's your live site. Send that link with job applications.

**F. Changing something later**
Open the file in GitHub, click the pencil icon, edit, scroll down, **Commit changes**.
The live site updates in about a minute. Hard-refresh your browser
(`Ctrl + Shift + R`, or `Cmd + Shift + R` on Mac) if you don't see the change.

---

## 11. Important: GitHub file size limits for videos

**Please read this before uploading MP4 files.**

- GitHub **blocks** any single file larger than **100 MB**.
- It **warns** you above **50 MB**.
- A whole repository should realistically stay under about **1 GB**.
- GitHub Pages has a soft bandwidth limit of roughly **100 GB per month**, and
  video eats that fast.

A raw 30-second 1080p export from CapCut can easily be 60–150 MB. Six of those
will break your repository or make the site painfully slow on mobile.

**Compress before uploading. Target under 10 MB per video.**

In CapCut or your editor, export with:
- Resolution: **1080 × 1920** (don't go higher for social ads)
- Frame rate: **30 fps**
- Bitrate: **3–5 Mbps**
- Format: **MP4 / H.264**

Free tools that work well: HandBrake (desktop), or any "compress MP4" web tool
for one-off files.

**If your videos still can't live on GitHub, your options are:**

1. **Keep using Google Drive** — what the site does now. Free, no limits, but the
   player shows Drive's interface and needs the file shared with "Anyone with the link".
2. **YouTube unlisted** — upload as *Unlisted*, so it won't appear in search but
   plays from a link. Most reliable for large videos.
3. **Vimeo** — cleaner, more professional player. The free tier has upload limits.
4. **Cloudflare R2 / Bunny.net** — proper video hosting, a few dollars a month.
   Overkill unless you're getting real traffic.

Whatever you choose, keep short compressed MP4s locally where you can. A video
that plays instantly in your own frame always looks more professional than an
embedded player.

---

## 12. Quick troubleshooting

| Problem | Fix |
|---|---|
| Image shows a grey "replace with your work" box | File name or folder doesn't match. Check spelling and lowercase. |
| Video shows "You need access" | Drive sharing is still Restricted. See section 3. |
| Site looks unstyled | `styles.css` wasn't uploaded, or it's inside a folder instead of next to `index.html`. |
| Changes don't appear | Wait a minute, then hard-refresh (`Ctrl/Cmd + Shift + R`). |
| Nothing filters, popup won't open | `script.js` is missing. Check it uploaded to the root folder. |

---

© Francis Gian Phillippe Chua
