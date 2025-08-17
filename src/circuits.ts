export const circuitNames = [
  "01helterskelter",
  "02wonderhill",
  "03edgeoftheearth",
  "04outofblue",
  "05phantommile",
  "06brightestnite",
  "07heavenandhell",
  "08shootinghoops",
] as const;

// length = miles
// Real Racing Roots '99

export const circuitData = {
  "01helterskelter": {
    id: "01helterskelter",
    laps: 2,
    length: 3262,
    name: "Helter Skelter",
    country: "JPN",
    location: "Yokohama, Japan",
    date: "1 May 1999, 11:30",
    bgm: [
      {
        name: "Pearl Blue Soul",
        link: "06-Pearl+Blue+Soul.mp3",
      },
    ],
  },
  "02wonderhill": {
    id: "02wonderhill",
    laps: 2,
    length: 4178,
    name: "Wonder hill",
    country: "JPN",
    date: "15 May 1999, 17:30",
    bgm: [
      {
        name: "Revlimit Funk",
        link: "13-Revlimit+Funk.mp3",
      },
      {
        name: "Naked Glow",
        link: "07-Naked+Glow.mp3",
      },
    ],
    location: "Fukuoka, Japan",
  },
  "03edgeoftheearth": {
    id: "03edgeoftheearth",
    laps: 3,
    length: 3540,
    name: "Edge of the earth",
    country: "USA",
    date: "1 Jul 1999, 20:45",
    bgm: [
      {
        name: "Burnin' Rubber",
        link: "12-Burnin'+Rubber.mp3",
      },
      {
        name: "Your Vibe",
        link: "08-Your+Vibe.mp3",
      },
      {
        name: "Naked Glow",
        link: "07-Naked+Glow.mp3",
      },
      {
        name: "The Objective",
        link: "16-The+Objective.mp3",
      },
    ],
    location: "New York, USA",
  },
  "04outofblue": {
    id: "04outofblue",
    laps: 3,
    length: 3477,
    name: "Out of blue",
    country: "JPN",
    date: "15 Jul 1999, 06:30",
    bgm: [
      {
        name: "Quiet Curves",
        link: "14-Quiet+Curves.mp3",
      },
      {
        name: "Lucid Rhythms",
        link: "09-Lucid+Rhythms.mp3",
      },
    ],
    location: "Yokohama, Japan",
  },
  "05phantommile": {
    id: "05phantommile",
    laps: 3,
    length: 1882,
    name: "Phantom mile",
    country: "JPN",
    date: "24 Sep 1999, 12:00",
    bgm: [
      {
        name: "Motor Species",
        link: "15-Motor+Species.mp3",
      },
    ],
    location: "Yokohama, Japan",
  },
  "06brightestnite": {
    id: "06brightestnite",
    laps: 3,
    length: 3667,
    name: "Brightest nite",
    country: "USA",
    date: "22 Oct 1999, 21:45",
    bgm: [
      {
        name: "Your Vibe",
        link: "08-Your+Vibe.mp3",
      },
      {
        name: "The Objective",
        link: "16-The+Objective.mp3",
      },
      {
        name: "Revlimit Funk",
        link: "13-Revlimit+Funk.mp3",
      },
    ],
    location: "New York, USA",
  },
  "07heavenandhell": {
    id: "07heavenandhell",
    laps: 3,
    length: 4035,
    name: "Heaven and hell",
    country: "JPN",
    date: "26 Nov 1999, 15:00",
    bgm: [
      {
        name: "Move Me",
        link: "17-Move+Me.mp3",
      },
      {
        name: "The Ride",
        link: "18-The+Ride.mp3",
      },
    ],
    location: "Fukuoka, Japan",
  },
  "08shootinghoops": {
    id: "08shootinghoops",
    laps: 6,
    length: 2473,
    name: "Shooting hoops",
    country: "USA",
    date: "31 Dec 1999, 23:45",
    bgm: [
      {
        name: "Movin' in Circles",
        link: "19-Movin'+in+Circles.mp3",
      },
    ],
    location: "Los Angeles, USA,",
  },
} as const;
