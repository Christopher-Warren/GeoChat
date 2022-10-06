export const layout = {
  paddingHorizontal: 15,
};

export const getAvatarUri = (id) => {
  return `https://avatars.dicebear.com/api/bottts/:${id}.png?colors=amber,blue,cyan,deepOrange,deepPurple,green,indigo,lightBlue,lightGreen,lime,orange,pink,purple,red,teal,yellow&primaryColorLevel=400&colorful=true`;
};

export const appFonts = {
  signika: "signika",

  signika_bold: "signika_bold",
  signika_light: "signika_light",

  roboto_slab: "roboto_slab",
  roboto_slab_bold: "roboto_slab_bold",
  roboto_slab_light: "roboto_slab_light",
};

export const colors = {
  themeBackground: "#0A0A0A",
  primaryText: "#ffffff",
  secondaryText: "#C2C2C2",
  primaryBackground: "#2c2c2c",
  primaryBackgroundPressed: "#474747",
  primaryAccent: "#5EE87E",
  border: "#2c2c2c",
  inactiveTab: "#525252",
  green: "#3DA466",
  red: "#D9594C",
};

// Font: Signika

export const fontSize = {
  xsmall: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 30,
  "3xl": 42,
};

export const iconSize = {
  large: {
    height: 50,
    width: 50,
  },
};

export const borderRadius = {
  small: 8,
  medium: 10,
  large: 12,
  xlarge: 15,
};
