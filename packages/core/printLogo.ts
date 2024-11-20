export default function () {
  if (PROD) {
    const logo = String.raw`
____________________________________________
 _____            __     ___               
|_   _|__  _   _  \ \   / (_) _____      __
  | |/ _ \| | | |  \ \ / /| |/ _ \ \ /\ / /
  | | (_) | |_| |   \ V / | |  __/\ V  V / 
  |_|\___/ \__, |    \_/  |_|\___| \_/\_/  
           |___/                           
____________________________________________
`;

    const rainbowStyle = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowStyle);
    console.info(`https://github.com/wo4188/toy-view`);
  } else if (DEV) {
    console.log("[ToyView]: dev mode...");
  }
}
