import { Stack, Box, useMediaQuery, useTheme } from "@mui/material";
import { useState, useEffect } from "react";

function MainCard({ city, nextPrayer, sunrise, sunset }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Formatage de l'heure
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);

      // Formatage de la date
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setCurrentDate(now.toLocaleDateString("ar-TN", options));
    };

    // Mise à jour immédiate
    updateDateTime();

    // Mise à jour toutes les secondes
    const intervalId = setInterval(updateDateTime, 1000);

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, []);
  return (
    <Stack
      sx={{
        borderRadius: "38px",
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.primary,
        boxShadow: "0px 3px 4px 0px #f0b429",
        padding: isMobile ? "0px 8px" : "0px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginBottom: "24px",
      }}
    >
      <Stack
        sx={{
          borderRadius: "32px",
          backgroundColor: theme.palette.background.secondary,
          color: theme.palette.secondary.main,
          // boxShadow: "0px -3px 4px 0px #f0b429",
          padding: isMobile ? "8px 8px" : "8px 24px",
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
            fontSize: "1.8em",
            color: theme.palette.text.secondary,
            margin: "2px",
          }}
        >
          {city}
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
            color: "#0b111d",
            width: "100%",
            gap: "8px",
          }}
        >
          <Box
            flexDirection={"column"}
            alignItems={"center"}
            display={"flex"}
            alignContent={"center"}
            sx={{
              "& > * + *": {
                mt: 0,
              },
            }}
          >
            <img width={"48px"} src="/sunrise.svg" alt="Sunrise image" />
            <h1
              style={{
                fontSize: "1em",
                color: theme.palette.text.primary,
                padding: "2px 6px",
                backgroundColor: theme.palette.background.primary,
                borderRadius: "8px",
                border: "1px solid #f29c1fff",
              }}
            >
              {sunrise}
            </h1>
          </Box>
          <div style={{ alignContent: "center" }}>
            <h1
              style={{
                fontSize: "1.2em",
                color: theme.palette.text.primary,
                margin: "2px",
                textAlign: "center",
              }}
            >
              {currentDate}
            </h1>
          </div>
          <Box
            flexDirection={"column"}
            alignItems={"center"}
            display={"flex"}
            alignContent={"center"}
            sx={{
              "& > * + *": {
                mt: 0,
              },
            }}
          >
            <img width={"48px"} src="/sunset.svg" alt="Sunset image" />
            <h1
              style={{
                fontSize: "1em",
                color: theme.palette.text.primary,
                padding: "2px 6px",
                backgroundColor: theme.palette.background.primary,
                borderRadius: "8px",
                border: "1px solid #f29c1fff",
              }}
            >
              {sunset}
            </h1>
          </Box>
        </div>
        <h1 style={{ fontSize: "1.5em", fontWeight: "800", margin: "2px" }}>
          {currentTime}
        </h1>
      </Stack>
      <h3>{nextPrayer}</h3>
    </Stack>
  );
}

export default MainCard;
