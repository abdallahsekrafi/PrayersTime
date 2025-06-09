import { Stack, useTheme } from "@mui/material";
import "../App.css";
function PrayerCardMb({
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
        borderRadius: "30px",
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.primary,
        boxShadow: isNextPrayer
          ? "-3px 0px 4px 0px #f0b429"
          : "-3px 0px 4px 0px #01579b",
        padding: "0 0 0 6px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        gap: "3",
      }}
    >
      <Stack
        sx={{
          borderRadius: "24px",
          backgroundColor: theme.palette.background.secondary,
          color: theme.palette.secondary.main,
          padding: "0px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          textAlign: "center",
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
        <h1
          style={{ fontSize: "1.5em", fontWeight: "800", margin: "2px 16px" }}
        >
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

export default PrayerCardMb;
