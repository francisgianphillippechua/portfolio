/* ============================================================
   FRANCIS CHUA — PORTFOLIO SCRIPT
   Plain JavaScript. No libraries, no build step.

   WHAT'S IN HERE
   1. Portfolio data   <- the only part you normally need to edit
   2. Rendering        (builds the cards, handles missing files)
   3. Filtering
   4. Modal / lightbox
   5. Mobile menu, scroll reveal, small extras
   ============================================================ */


/* ============================================================
   1. PORTFOLIO DATA — ADD YOUR PORTFOLIO ITEMS HERE
   ============================================================

   Every item is its own separate object with its own separate
   file path. Changing video-01 can never affect video-02.

   FILE NAMES
     Every file in this project sits in the SAME folder as index.html.
     No subfolders. A path is just the file name: "static-01.jpg".

   FIELDS
     id        unique name, no spaces           "video-01"
     type      "video" or "image"
     category  "video" | "static" | "social" | "ai"  (drives the filter buttons)
     src       the file path OR leave "" if you are using driveId
     driveId   Google Drive file ID (optional — see note below)
     poster    thumbnail shown before the video is opened
     title     shown under the item
     platform  shown under the title
     role      shown last, one short line

   GOOGLE DRIVE VIDEOS
     Your 5 videos currently play straight from Google Drive, so the
     site works today without uploading big MP4 files to GitHub.
     The Drive file must be shared as "Anyone with the link — Viewer".
     Later, when you compress your MP4s, just fill in `src` with
     "video-01.mp4" and delete the driveId line.
   ============================================================ */

const portfolioItems = [

  /* ---------- VIDEO ADS (vertical 9:16, playing from Google Drive) ---------- */
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
  },
  {
    id: "video-02",
    type: "video",
    category: "video",
    src: "",
    driveId: "1ElCLuwiWSG3pAmx2mXzIQrfuk_WarQJH",
    poster: "video-02-poster.jpg",
    title: "Video Ad 02",
    platform: "Meta / Video Ad",
    role: "Editing + Creative Production"
  },
  {
    id: "video-03",
    type: "video",
    category: "video",
    src: "",
    driveId: "10YLlAM_N2mr1uwxwKevxJ1tl8JFurk8v",
    poster: "video-03-poster.jpg",
    title: "Video Ad 03",
    platform: "Meta / Video Ad",
    role: "Editing + Creative Production"
  },
  {
    id: "video-04",
    type: "video",
    category: "video",
    src: "",
    driveId: "13y32_LxTKnPJxYS0p6rk08UI-m8ehmkt",
    poster: "video-04-poster.jpg",
    title: "Video Ad 04",
    platform: "Meta / Video Ad",
    role: "Editing + Creative Production"
  },
  {
    id: "video-05",
    type: "video",
    category: "video",
    src: "",
    driveId: "1wUR3kvufyEDEQgowXblmqveeMftCwK-j",
    poster: "video-05-poster.jpg",
    title: "Video Ad 05",
    platform: "Meta / Video Ad",
    role: "Editing + Creative Production"
  },

  /* ---------- STATIC ADS ---------- */
  {
    id: "static-01",
    type: "image",
    category: "static",
    src: "static-01.jpg",
    title: "Make Room For More",
    platform: "NOCO Design/Build — Meta / Static Ad",
    role: "Design + Creative Production"
  },
  {
    id: "static-02",
    type: "image",
    category: "static",
    src: "static-02.jpg",
    title: "Transform Your Backyard",
    platform: "NOCO Design/Build — Meta / Static Ad",
    role: "Design + Creative Production"
  },
  {
    id: "static-03",
    type: "image",
    category: "static",
    src: "static-03.jpg",
    title: "PowerCore Electric Logo",
    platform: "Brand / Logo Design",
    role: "Graphic Design"
  },

  /* ---------- SOCIAL CONTENT ---------- */
  {
    id: "social-01",
    type: "image",
    category: "social",
    src: "social-01.jpg",
    title: "Residential Solar Feature",
    platform: "Social Media / Image",
    role: "Content Production"
  },
  {
    id: "social-02",
    type: "image",
    category: "social",
    src: "social-02.jpg",
    title: "ADU Exterior Feature",
    platform: "NOCO Design/Build — Social Media / Image",
    role: "Content Production"
  },

  /* ---------- AI-ASSISTED CREATIVE ---------- */
  {
    id: "ai-video-01",
    type: "video",
    category: "ai",
    src: "ai-01.mp4",
    driveId: "",
    poster: "ai-01-poster.jpg",
    title: "Anaya Building Construction — Logo Animation",
    platform: "AI-Assisted Creative / Video",
    role: "Creative Direction + Editing"
  },
  {
    id: "ai-video-02",
    type: "video",
    category: "ai",
    src: "ai-02.mp4",
    driveId: "",
    poster: "ai-02-poster.jpg",
    title: "A1 Building Contractors — Logo Animation",
    platform: "AI-Assisted Creative / Video",
    role: "Creative Direction + Editing"
  }

  /* ADD MORE ITEMS HERE â copy a block above, put a comma after the block
     before it, and give the new one a unique id. */

];


/* ============================================================
   2. RENDERING
   ============================================================ */

const grid       = document.getElementById("workGrid");
const emptyNote  = document.getElementById("workEmpty");

/** Google Drive helpers */
const driveEmbed     = id => "https://drive.google.com/file/d/" + id + "/preview";
const driveThumbnail = id => "https://drive.google.com/thumbnail?id=" + id + "&sz=w1000";

/** Builds the light-grey "replace me" box shown when a file is missing. */
function buildPlaceholder(item) {
  const box = document.createElement("div");
  box.className = "placeholder";

  const title = document.createElement("span");
  title.className = "placeholder__title";
  title.textContent = item.title;

  const hint = document.createElement("span");
  hint.className = "placeholder__hint";
  hint.textContent = "Replace with your work";

  box.append(title, hint);
  return box;
}

/**
 * Loads an image, trying each path in order.
 * If every path fails, the placeholder is shown instead — never a broken image.
 */
function loadImage(sources, alt, mount, item, onSuccess) {
  const paths = sources.filter(Boolean);
  let index = 0;

  const img = document.createElement("img");
  img.alt = alt;
  img.loading = "lazy";
  img.decoding = "async";

  img.addEventListener("error", () => {
    index += 1;
    if (index < paths.length) {
      img.src = paths[index];
    } else {
      img.remove();
      mount.classList.add("card__media--empty");
      mount.append(buildPlaceholder(item));
    }
  });

  if (typeof onSuccess === "function") {
    img.addEventListener("load", onSuccess);
  }

  if (paths.length === 0) {
    mount.classList.add("card__media--empty");
    mount.append(buildPlaceholder(item));
    return null;
  }

  img.src = paths[0];
  mount.append(img);
  return img;
}

/** Builds one complete card for one portfolio item. */
function buildCard(item) {
  const card = document.createElement("article");
  card.className = "card reveal";
  card.dataset.category = item.category;
  card.dataset.id = item.id;

  // --- media (a button, so it is clickable AND keyboard accessible) ---
  const media = document.createElement("button");
  media.type = "button";
  media.className = "card__media";
  media.setAttribute("aria-label", "Open " + item.title);

  if (item.type === "video") {
    media.classList.add("card__media--vertical");

    // Poster first: your own thumbnail, then the Drive thumbnail, then placeholder.
    const posterSources = [item.poster];
    if (item.driveId) posterSources.push(driveThumbnail(item.driveId));

    loadImage(posterSources, item.title + " thumbnail", media, item, () => {
      const play = document.createElement("span");
      play.className = "card__play";
      media.append(play);
    });

  } else {
    media.classList.add("card__media--natural");
    loadImage([item.src], item.title, media, item);
  }

  media.addEventListener("click", () => openModal(item));

  // --- caption: title / category / role ---
  const caption = document.createElement("div");
  caption.className = "card__caption";

  const title = document.createElement("h3");
  title.className = "card__title";
  title.textContent = item.title;

  const meta = document.createElement("p");
  meta.className = "card__meta";
  meta.textContent = item.platform;

  const role = document.createElement("p");
  role.className = "card__role";
  role.textContent = item.role;

  caption.append(title, meta, role);
  card.append(media, caption);
  return card;
}

/** Draws the given items into the grid. */
function renderGrid(items) {
  grid.innerHTML = "";
  items.forEach(item => grid.append(buildCard(item)));
  emptyNote.hidden = items.length > 0;
  observeReveals();
}

/* The first render happens at the very bottom of this file,
   once the scroll-reveal helper below has been set up. */


/* ============================================================
   3. FILTERING — instant, no page reload
   ============================================================ */

const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.filter;

    filterButtons.forEach(other => {
      const active = other === button;
      other.classList.toggle("is-active", active);
      other.setAttribute("aria-pressed", String(active));
    });

    const items = value === "all"
      ? portfolioItems
      : portfolioItems.filter(item => item.category === value);

    renderGrid(items);
  });
});


/* ============================================================
   4. MODAL / LIGHTBOX
   Videos and images share one modal. Only one video can play at a time
   because the stage is emptied every time the modal opens or closes.
   ============================================================ */

const modal        = document.getElementById("modal");
const modalStage   = document.getElementById("modalStage");
const modalCaption = document.getElementById("modalCaption");
const modalClose   = document.getElementById("modalClose");

let lastFocused = null;

function openModal(item) {
  modalStage.innerHTML = "";

  if (item.type === "video" && item.driveId) {
    // Google Drive player
    const frame = document.createElement("iframe");
    frame.src = driveEmbed(item.driveId);
    frame.title = item.title;
    frame.allow = "autoplay; fullscreen";
    frame.setAttribute("allowfullscreen", "");
    modalStage.append(frame);

  } else if (item.type === "video") {
    // Local MP4 player
    const video = document.createElement("video");
    video.src = item.src;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    if (item.poster) video.poster = item.poster;
    modalStage.append(video);
    video.play().catch(() => { /* browser blocked autoplay — controls still work */ });

  } else {
    // Full image
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title;
    modalStage.append(img);
  }

  modalCaption.textContent = item.title + " — " + item.platform;

  lastFocused = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("is-locked");
  modalClose.focus();
}

function closeModal() {
  // Emptying the stage removes the <video> / <iframe>, which stops playback.
  const video = modalStage.querySelector("video");
  if (video) video.pause();
  modalStage.innerHTML = "";

  modal.hidden = true;
  document.body.classList.remove("is-locked");
  if (lastFocused) lastFocused.focus();
}

modalClose.addEventListener("click", closeModal);

// Clicking the dark area outside the media closes the modal
modal.addEventListener("click", event => {
  if (event.target.hasAttribute("data-close")) closeModal();
});

document.addEventListener("keydown", event => {
  if (modal.hidden) return;

  if (event.key === "Escape") {
    closeModal();
    return;
  }

  // Keep Tab looping inside the modal (Escape always gets you out)
  if (event.key === "Tab") {
    const focusable = [modalClose].concat(
      Array.from(modalStage.querySelectorAll("video, iframe, a, button"))
    );
    if (focusable.length < 2) {
      event.preventDefault();
      modalClose.focus();
      return;
    }

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});


/* ============================================================
   5. MOBILE MENU, PROFILE PHOTO FALLBACK, REVEAL, YEAR
   ============================================================ */

/* --- Hamburger menu --- */
const navToggle = document.getElementById("navToggle");
const navMenu   = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

// Tapping a link closes the menu
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  });
});

/* --- Profile photo: show a neutral box if the file isn't there yet --- */
const portraitImg = document.getElementById("portraitImg");
const portraitBox = document.getElementById("portraitBox");

function showPortraitPlaceholder() {
  portraitImg.remove();
  portraitBox.classList.add("is-empty");
}

portraitImg.addEventListener("error", showPortraitPlaceholder);

// The image may have already failed before this script ran
if (portraitImg.complete && portraitImg.naturalWidth === 0) {
  showPortraitPlaceholder();
}

/* --- Subtle fade-up on scroll --- */
const reduceMotion = typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let revealObserver = null;
if ("IntersectionObserver" in window && !reduceMotion) {
  revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
}

function observeReveals() {
  const targets = document.querySelectorAll(".reveal:not(.is-in)");
  if (!revealObserver) {
    targets.forEach(el => el.classList.add("is-in"));
    return;
  }
  targets.forEach(el => revealObserver.observe(el));
}

// Sections fade in too
document.querySelectorAll(".section__head, .services, .about, .exp").forEach(el => {
  el.classList.add("reveal");
});
observeReveals();

/* --- Footer year --- */
document.getElementById("year").textContent = new Date().getFullYear();

/* --- First paint of the portfolio grid --- */
renderGrid(portfolioItems);
