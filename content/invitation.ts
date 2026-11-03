// Everything a client changes lives here: names, date, schedule, venue, guestbook and media paths.

export const invitation = {
  groom: "A. Somasundaram",
  bride: "G. Narmadha",
  // "\n" forces a line break.
  inviteLine: "Together with their families you are invited to\nthe wedding of",
  // "\n" forces a line break.
  dateLabel: "Reception 15.11.2026\nWedding 16.11.2026 (6.00 AM to 7.30 AM)",
  // Reception begins at 6 p.m. in Chennai (India Standard Time).
  eventDate: "2026-11-15T18:00:00+05:30",

  // Shown above the tagline in Noto Serif Tamil; set to "" to hide.
  blessing: "",
  tagline: ["Two Souls", "One destiny", "A Lifetime blessed by God"],
  welcomeTitle: "Dear Friends and Family",
  // "\n" forces a line break.
  welcomeText: "Join us for an evening of love, laughter, blessings,\nand unforgettable memories as we begin our forever.",

  schedule: [
    {
      day: "Reception",
      date: "15.11.2026",
      events: [
        { time: "6 PM", label: "Guest Arrival" },
        { time: "7 PM", label: "Reception" },
        { time: "8 PM", label: "Dinner" },
        { time: "9 PM", label: "Dance DJ" },
      ],
    },
    {
      day: "Wedding",
      date: "16.11.2026",
      events: [{ time: "6.00 AM – 7.30 AM", label: "Wedding Ceremony" }],
    },
  ],

  venue: {
    name: "J.S. Mahal",
    // "\n" forces a line break.
    address: "179A, Kumaran Colony Main Road,\nVadapalani, Chennai - 26.",
    // Any Google Maps "Embed a map" src works here.
    mapEmbed:
      "https://www.google.com/maps?q=J.S.%20Mahal%2C%20179A%2C%20Kumaran%20Colony%20Main%20Road%2C%20Vadapalani%2C%20Chennai%20600026&output=embed",
  },

  guestbook: {
    // The wand button cycles through these to help guests start a wish.
    suggestions: [
      "Wishing you both a lifetime of love and happiness!",
      "இனிய திருமண நல்வாழ்த்துக்கள்!",
      "May your love grow stronger with each passing year.",
      "மணமக்கள் பல்லாண்டு காலம் மகிழ்ச்சியுடன் வாழ்க!",
      "Congratulations! Wishing you a beautiful journey together.",
    ],
  },

  closingTitle: "Hope to see you there!",
  closingNames: "Somasundaram Narmadha",

  gallery: [
    { src: "/NIVA5049.jpg.jpeg", alt: "Sharing a book together at a picnic", width: 4000, height: 6000 },
    { src: "/NIVA5057.jpg.jpeg", alt: "A reflection of the couple smiling in a picnic mirror", width: 6000, height: 4000 },
    { src: "/NIVA5185.jpg.jpeg", alt: "An embrace with a bright sunflower bouquet", width: 4000, height: 6000 },
    { src: "/NIVA5190.jpg.jpeg", alt: "Looking at each other during a sunflower picnic", width: 6000, height: 4000 },
    { src: "/NIVA5241.jpg.jpeg", alt: "The couple silhouetted against the golden sunset", width: 4000, height: 6000 },
    { src: "/NIVA5300.jpg.jpeg", alt: "A lakeside picnic with mountains in the background", width: 6000, height: 4000 },
  ],

  // The photos both pages use (the new ones are web-sized copies of public/NIVA4139, NIVA4362 and NIVA4177).
  // Gallery order: the pillars lead, the temple steps break up the picnic shots, and the sunset silhouette ends it.
  photoPage: {
    gallery: [
      { src: "/media/photo-pillars.webp", alt: "An embrace between tall stone pillars, with the temple tower behind", width: 1333, height: 2000 },
      { src: "/NIVA5190.jpg.jpeg", alt: "Looking at each other during a sunflower picnic", width: 6000, height: 4000 },
      { src: "/NIVA5185.jpg.jpeg", alt: "An embrace with a bright sunflower bouquet", width: 4000, height: 6000 },
      { src: "/NIVA5049.jpg.jpeg", alt: "Sharing a book together at a picnic", width: 4000, height: 6000 },
      { src: "/media/photo-steps.webp", alt: "Holding hands on the steps of a stone temple pavilion", width: 1333, height: 2000 },
      { src: "/NIVA5057.jpg.jpeg", alt: "A reflection of the couple smiling in a picnic mirror", width: 6000, height: 4000 },
      { src: "/NIVA5300.jpg.jpeg", alt: "A lakeside picnic with mountains in the background", width: 6000, height: 4000 },
      { src: "/media/photo-picnic-sunflowers.jpg", alt: "Smiling together with sunflowers and a book at a lakeside picnic", width: 1000, height: 1500 },
      { src: "/NIVA5241.jpg.jpeg", alt: "The couple silhouetted against the golden sunset", width: 4000, height: 6000 },
    ],
    closing: { src: "/media/closing-temple.webp", alt: "Standing close together beside an ancient temple", width: 1350, height: 1959 },
  },

  media: {
    // Drop your files in /public/media with these names. Missing videos are skipped gracefully.
    envelope: "/media/envelope.jpg",
    // envelope.jpg with the wax seal painted out, for under the lifted seal.
    envelopeClean: "/media/envelope-clean.jpg",
    // Gold monogram on a transparent background, shown on the envelope's wax seal.
    monogram: "/media/monogram.png",
    // The wax seal cut out of envelope.jpg (lifts off with the flap when the envelope opens).
    seal: "/media/seal.png",
    introVideo: "/media/intro.mp4",
    // Android / desktop get the MP3; iPhone / iPad get the AAC (.m4a) version.
    music: "/media/music.mp3",
    musicIos: "/media/music-ios.m4a",
    // The couple's photo behind the hero text (public/NIVA4299.jpg resized for the web).
    heroPhoto: "/media/hero-photo.webp",
    // Arch, swans and corner bouquets on transparency (built by scripts/prepare-art.ps1).
    heroScene: "/media/hero-scene.webp",
    // hero-scene split into the lake and two swans (built by scripts/make-swans.py) so the swans can swim.
    heroLake: "/media/hero-lake.webp",
    swanLeft: "/media/swan-left.png",
    swanRight: "/media/swan-right.png",
    closingPhoto: "/media/couple.jpg",
  },
};
