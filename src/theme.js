// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0b111d", // Fond sombre principal
      light: "#1a2533", // Cartes secondaires
      contrastText: "#f1ece5", // Texte clair
      // main: "rgba(14,20,28,0.8)", // Fond sombre principal
      // light: "rgba(12,31,40,0.8)", // Cartes secondaires
    },
    secondary: {
      main: "#f0b429", // Jaune doré - accents
      contrastText: "#0b111d", // Texte sombre
    },
    background: {
      primary: "rgba(26, 37, 51, 0.7)", // Arrière-plan semi-transparent
      secondary: "rgba(11, 17, 29, 0.7)", // Arrière-plan semi-transparent
      default: "#0b111d",
    },
    text: {
      primary: "#f1ece5", // Texte principal
      secondary: "#01579b", // Bleu pour textes secondaires
    },
    border: {
      main: "#f29c1f", // Orange pour bordures
    },
  },
  shadows: {
    prayerActive: "0px 3px 4px 0px #f0b429",
    prayerInactive: "0px 3px 4px 0px #01579b",
    mobileCard: "-3px 0px 4px 0px #01579b",
  },
});

export default theme;
