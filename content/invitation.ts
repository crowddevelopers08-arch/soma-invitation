// Everything a client changes lives here: names, date, schedule, venue, RSVP and media paths.

export const invitation = {
  groom: "A. Somasundaram",
  bride: "G. Narmadha",
  dateLabel: "15.11.2026",
  // Reception begins at 6 p.m. in Chennai (India Standard Time).
  eventDate: "2026-11-15T18:00:00+05:30",

  // Shown above the tagline in Noto Naskh Arabic; set to "" to hide.
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  tagline: ["Two Souls", "One destiny", "A Lifetime written by Allah"],
  welcomeTitle: "Dear Friends and Family",
  // "\n" forces a line break.
  welcomeText: "Join us for an evening of love,\nlaughter, duas, and unforgettable\nmemories as we begin our forever.",

  schedule: [
    { time: "6 PM", label: "Guest Arrival" },
    { time: "7 PM", label: "Nikkah Ceremony" },
    { time: "8 PM", label: "Mocktail Hour" },
    { time: "9 PM", label: "Dinner" },
    { time: "10 PM", label: "Dance" },
  ],

  venue: {
    name: "J.S. Mahal",
    // "\n" forces a line break.
    address: "179A, Kumaran Colony Main Road,\nVadapalani, Chennai - 26.",
    // Any Google Maps "Embed a map" src works here.
    mapEmbed:
      "https://www.google.com/maps?q=J.S.%20Mahal%2C%20179A%2C%20Kumaran%20Colony%20Main%20Road%2C%20Vadapalani%2C%20Chennai%20600026&output=embed",
  },

  // "\n" forces a line break.
  dressCode: "We kindly ask guests to avoid deep\nred and maroon attire for the\ncelebration.",
  giftNote: "Kindly, no boxed gifts please.",

  rsvp: {
    intro: "To help us prepare for a joyful celebration,\nkindly confirm your attendance.",
    deadline: "Please RSVP before November 15",
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

  media: {
    // Drop your files in /public/media with these names. Missing videos are skipped gracefully.
    envelope: "/media/envelope.jpg",
    // Gold monogram on a transparent background, shown on the envelope's wax seal.
    monogram: "/media/monogram.png",
    introVideo: "/media/intro.mp4",
    // Android / desktop get the MP3; iPhone / iPad get the AAC (.m4a) version.
    music: "/media/music.mp3",
    musicIos: "/media/music-ios.m4a",
    // Arch, swans and corner bouquets on transparency (built by scripts/prepare-art.ps1).
    heroScene: "/media/hero-scene.webp",
    // Dress code / gifts paper with its corner florals (built by scripts/prepare-art.ps1).
    dressCard: "/media/dress-card.webp",
    closingPhoto: "/media/couple.jpg",
  },
};
