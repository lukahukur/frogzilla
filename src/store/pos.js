import { create } from "zustand";
export const pages = {
  welcome: {
    name: "welcome",
    coords: [-2.19146121074683, 1.24673481524538, -0.79880155505091],
    lookAt: [-7, 2, -4],
    zoom: 5,
  },
  about: {
    name: "about",
    coords: [3.2903, 5.211, 2.1305],
    lookAt: [4.1998, 5.6205, 2.2013], //
    zoom: 4,
  },
  tokenomics: {
    name: "tokenomics",
    coords: [-5.9577, 3.2071, 3.6197],
    lookAt: [0, 4, 1],
    zoom: 4,
  },
  "Join the Voyage": {
    name: "Join the Voyage",
    coords: [-12.7632, 1, 0.2507],
    lookAt: [0, 2, 1],
    zoom: 9,
  },
  "Connect with Us": {
    name: "Connect with Us",
    coords: [-3.70009613, 0.5, -3.233346441739],
    lookAt: [1, 2, 2],
    zoom: 5.5,
  },
};

export const useStore = create((set) => ({
  position: {
    coords: [0, 1, 0],
    lookAt: [-2.7356018811516105, 1.2021616742506412, -14.490978198466104],
    zoom: 1,
  },
  changePosition: (coords) => set((state) => ({ position: coords })),
}));
