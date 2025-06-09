import { Stack, useTheme } from "@mui/material";
import "../App.css";

function PrayerCard({
  prayerName,
  prayerTime,
  offset,
  am,
  suffix,
  isNextPrayer,
}) {
  const theme = useTheme();
  return (
    <Stack
      // className={isNextPrayer ? "shockwaveAnimation" : ""}
      sx={{
        borderRadius: "38px",
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.primary,
        boxShadow: isNextPrayer
          ? "0px 3px 4px 0px #f0b429"
          : "0px 3px 4px 0px #01579b",
        padding: "0px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        /* animation */
        // border: isNextPrayer ? "1px solid #f0b429" : "none",
        // animation: isNextPrayer
        //   ? "pulse 2s infinite, wiggle 3s infinite"
        //   : "none",
        // transform: isNextPrayer ? "rotate(-1deg)" : "none",
        // transition: "all 0.3s ease",
        // background: isNextPrayer
        //   ? `linear-gradient(135deg, ${theme.palette.background.primary} 0%, #f0b42922 50%, ${theme.palette.background.primary} 100%)`
        //   : theme.palette.background.primary,
        // "@keyframes pulse": {
        //   "0%": { boxShadow: "0 0 0 0px rgba(240, 180, 41, 0.4)" },
        //   "70%": { boxShadow: "0 0 0 8px rgba(240, 180, 41, 0)" },
        //   "100%": { boxShadow: "0 0 0 0px rgba(240, 180, 41, 0)" },
        // },
        // "@keyframes wiggle": {
        //   "0%, 100%": { transform: "rotate(-1deg)" },
        //   "50%": { transform: "rotate(1deg)" },
        // },
      }}
    >
      <Stack
        sx={{
          borderRadius: "32px",
          backgroundColor: theme.palette.background.secondary,
          color: theme.palette.secondary.main,
          padding: "8px 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "1em",
            color: theme.palette.text.primary,
            margin: "2px",
          }}
        >
          {prayerName}
        </h1>
        <h1 style={{ fontSize: "1.5em", fontWeight: "800", margin: "2px" }}>
          {prayerTime}
          <sup style={{ fontSize: "0.7em" }}>{am}</sup>
        </h1>
      </Stack>
      <h3 style={{ margin: "6px" }}>
        {offset}
        {suffix && <sup style={{ fontSize: "0.7em" }}>{suffix}</sup>}
      </h3>
    </Stack>
  );
}

export default PrayerCard;
