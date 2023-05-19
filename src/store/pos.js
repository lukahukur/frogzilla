import { create } from "zustand";

export const pages = {
  welcome: {
    id: 0,
    name: "Welcome",
    coords: [-1.58, 1.1, -0.24],
    lookAt: [-7, 2, -4],
    zoom: 5,
    text: "Leap into the meme madness with FrogZilla! Our token is all about laughter, memes, and a wild crypto ride.",
  },
  about: {
    id: 1,
    name: "About",
    coords: [2.1903, 4.9, 1.8305],
    lookAt: [9, 6, 2], //
    zoom: 5,
    text: "FrogZilla: a meme token with zero utility and infinite fun. Join our whimsical adventure in the crypto universe.",
  },
  tokenomics: {
    id: 2,
    name: "Tokenomics",
    coords: [-5.9977, 2.8071, 3.3197],
    lookAt: [0, 4, 1],
    zoom: 4,
    text:
      "Total Supply: 1 Quadrillion FrogZilla tokens\n" +
      "Distribution: 60% Burned, 30% for Liquidity, 10% for Community\n" +
      "Transaction Tax: 5% (4% to holders, 1% to community events)",
  },
  "Join the Voyage": {
    id: 3,
    name: "Join the Voyage",
    coords: [-11.3, 1, -1],
    lookAt: [-1, 2, 6],
    zoom: 9,
    text: "Hop aboard the FrogZilla boat! We're here for the laughs, camaraderie, and shared meme madness.",
  },
  "Connect with Us": {
    id: 4,
    name: "Connect with Us",
    coords: [-3.59009613, 0.52, -2.833346441739],
    lookAt: [1, 2, 2],
    zoom: 5,
    text: "Stay updated on our wild ride. Follow us on [social media logos/links here] and join the FrogZilla family!",
  },
};

let pageNum = 0;
let lastPage = Object.keys(pages).length;

export const useStore = create((set) => ({
  position: {
    id: -1,
    coords: [-3, 1, -4],
    lookAt: [-2.7356018811516105, 1.2021616742506412, -14.490978198466104],
    zoom: 0,
  },
  changePosition: (coords) => set((state) => ({ position: coords })),
}));

export const PageText = [
  "Leap into the meme madness with FrogZilla! Our token is all about laughter, memes, and a wild crypto ride.",
];
