# Francis Chua — Portfolio Website

A single-page portfolio built with plain HTML, CSS, and JavaScript.
No frameworks, no npm, no build step.

**Every file lives in one folder.** There are no subfolders, so uploading to
GitHub is a single drag — select everything, drop it in, done.

---

## 1. What every file does

| File | What it's for |
|---|---|
| `index.html` | All the text on the page: headline, about, email, phone, LinkedIn. |
| `styles.css` | All the design: colours, spacing, fonts, responsive layout. |
| `script.js` | Your portfolio list, the filters, the popup, the mobile menu. |
| `README.md` | This guide. Visitors never see it. |
| `.gitignore` | Tells GitHub to skip junk files like `.DS_Store`. |
| `profile.jpg` | Your photo in the hero section. |
| `static-01.jpg` … | Your static ad creative. |
| `social-01.jpg` … | Your social media content. |
| `ai-01.mp4`, `ai-02.mp4` | AI-assisted logo animations. |
| `ai-01-poster.jpg` | The still image shown before `ai-01.mp4` is played. |

**The one rule:** file names must match exactly, including lowercase.
`Static-01.JPG` is not the same as `static-01.jpg` once it's on GitHub Pages.

---

## 2. What's already in the site

| Slot | Shows as |
|---|---|
| Video ads 01–05 | Your five vertical video ads (playing from Google Drive) |
| `static-01.jpg` | Make Room For More |
| `static-02.jpg` | Transform Your Backyard |
| `static-03.jpg` | PowerCore Electric logo |
| `social-01.jpg` | Residential solar feature |
| `social-02.jpg` | ADU exterior feature |
| `ai-01.mp4` | Anaya Building Construction logo animation |
| `ai-02.mp4` | A1 Building Contractors logo animation |

Empty slots (static 04–06, social 03, AI 03–04, video 06) show a grey
"replace with your work" box. Fill them, or delete their block in `script.js`
to hide them.

---

## 3. Your Google Drive videos — do this first

Your five video ads play from Google Drive so you don't have to upload large
MP4 files. **Each one must be shared publicly or visitors see "you need access":**

1. Open the video in Google Drive.
2. Click **Share**.
3. Under *General access*, change **Restricted** to **Anyone with the link**.
4. Role: **Viewer**. Click **Done**.

Do this for all five. Then open your site and click each video to check.

To swap in a different Drive video, replace the `driveId` value in `script.js`.
The ID is the long code in the middle of a Drive link:

```
https://drive.google.com/file/d/14OZCXW7h7dYO3lO920FRD3MJ2iY2KddA/view
                                 └──────────── this part ────────────┘
```

---

## 4. How to replace your profile photo

Crop a vertical photo (roughly 4:5, e.g. 960 × 1200), name it exactly
`profile.jpg`, and upload it over the old one. If the file is ever missing,
the site shows a clean grey box instead of a broken image.

---

## 5. How to add or change a video

Open `script.js`. At the top is `const portfolioItems = [ ... ]`. Each video
looks like this:

```js
{
  id: "video-01",
  type: "video",
  category: "video",
  src: "",
  driveId: "14OZCXW7h7dYO3lO920FRD3MJ2iY2KddA",
  poster: "video-01-poster.jpg",
  title: "Video Ad 01",
  platform: "Meta / Video Ad",
  role: "Editing + Creative Production"
}
```

**To use a local MP4 instead of Drive** (better — faster, no Drive player):

```js
src: "video-01.mp4",
driveId: "",
```

Then upload `video-01.mp4` to the repo. Compress it first — see section 11.

**Thumbnails:** export one frame as a JPG, name it `video-01-poster.jpg`,
upload it. Without one, the site falls back to Google's Drive thumbnail, then
to the grey placeholder.

---

## 6. How to add or change static ads

Name your images `static-01.jpg` through `static-06.jpg` and upload them.
Any shape works — 1:1, 4:5, 9:16. The layout keeps each at its natural height
instead of cropping everything into identical rectangles.

Social content uses `social-01.jpg`, `social-02.jpg`. AI imagery uses
`ai-image-01.jpg`, `ai-image-02.jpg`.

---

## 7. How to change titles and captions

In `script.js`, edit these three lines on any item:

```js
title: "Home Improvement Ad",
platform: "Meta / Video Ad",
role: "Editing + Creative Production"
```

One short line each. That's all the caption shows.

---

## 8. How to add a new portfolio item

Copy a whole `{ ... }` block, paste it before the closing `]`, put a comma
between the blocks, and **give it a new unique `id`**.

Every item is its own separate object with its own separate file path.
Changing `video-01` can never affect `video-02`. That's deliberate.

The `category` value controls which filter it appears under:

| value | filter button |
|---|---|
| `"video"` | Video ads |
| `"static"` | Static ads |
| `"social"` | Social content |
| `"ai"` | AI-assisted |

Use exactly those lowercase words, or the item only shows under "All".

---

## 9. How to update your LinkedIn URL and resume

**LinkedIn:** open `index.html`, search for `REPLACE THE #`, and change
`href="#"` to your profile URL.

**Resume:** name your PDF exactly `Francis-Chua-Resume.pdf` and upload it.
Both resume buttons already point there.

---

## 10. How to test on your computer

Double-click `index.html`. It opens in your browser and everything works.

---

## 11. Publishing with GitHub Pages

**A. Create the repository**
1. github.com → **+** (top right) → **New repository**.
2. Name: `portfolio`. Visibility: **Public** (Pages needs public on a free account).
3. Don't tick "Add a README". Click **Create repository**.

**B. Upload — the part that trips people up**

Open the project folder in Finder so you see the files themselves, *not* the
folder containing them. Press **Cmd + A** to select all, then drag them onto
the GitHub upload area.

Do **not** drag the folder. Drag what's inside it. Because this project has no
subfolders, you never have to make GitHub build a folder structure.

Type `Add portfolio site` at the bottom and click **Commit changes**.

Your repo file list should now start with `index.html`, `script.js`,
`styles.css` and the images — no folder above them.

**C. Turn on Pages**
1. **Settings** tab → **Pages** in the left sidebar.
2. Source: **Deploy from a branch**.
3. Branch: **main**. Folder: **/ (root)**. Click **Save**.

**D. Open it**
Wait 1–3 minutes, refresh the Pages screen, and your link appears:

```
https://YOUR-USERNAME.github.io/portfolio/
```

**E. Changing something later**
Open the file on GitHub, click the pencil icon, edit, **Commit changes**.
Live in about a minute. Hard-refresh with `Cmd + Shift + R` if you don't
see it.

> `.gitignore` starts with a dot, so Finder hides it. Press
> **Cmd + Shift + .** to reveal hidden files if you want to include it.
> The site works fine without it.

---

## 12. Important: GitHub file size limits for video

- GitHub **blocks** any single file over **100 MB**.
- It **warns** above **50 MB**.
- Keep the whole repo under roughly **1 GB**.
- GitHub Pages has a soft bandwidth limit near **100 GB per month**, and video
  burns through it fast.

A raw 30-second 1080p CapCut export is often 60–150 MB. Six of those will break
your repo or make the site painfully slow on phones.

**Compress before uploading. Aim under 10 MB per video.** Export settings:

- Resolution **1080 × 1920** (don't go higher for social ads)
- Frame rate **30 fps**
- Bitrate **3–5 Mbps**
- Format **MP4 / H.264**

HandBrake (free desktop app) does this well.

**If a video still won't fit:**

1. **Google Drive** — what your five ads use now. Free, but shows Drive's player
   and needs link sharing on.
2. **YouTube unlisted** — won't appear in search, plays from a link. Most
   reliable for big files.
3. **Vimeo** — cleaner player, free tier has upload limits.
4. **Cloudflare R2 / Bunny.net** — real video hosting, a few dollars a month.
   Overkill unless you're getting serious traffic.

The two AI logo animations are only ~1.7 MB each, so they're hosted right in the
repo and play in your own frame. That always looks more professional than an
embedded player — worth compressing your other videos to match.

---

## 13. Troubleshooting

| Problem | Fix |
|---|---|
| Grey "replace with your work" box | File name doesn't match. Check spelling and lowercase. |
| Video says "You need access" | Drive sharing is still Restricted. See section 3. |
| Site loads as plain unstyled text | `styles.css` didn't upload, or it's inside a folder. |
| 404 page | `index.html` isn't at the repo root, or Pages isn't enabled yet. |
| Filters and popup do nothing | `script.js` is missing. |
| Changes don't show | Wait a minute, then hard-refresh (`Cmd + Shift + R`). |

---

© Francis Gian Phillippe Chua
