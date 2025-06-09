import "./App.css";
import { Stack, Input, useMediaQuery, useTheme } from "@mui/material";
import PrayerCard from "./components/PrayerCard";
import MainCard from "./components/MainCard";
import PrayerCardMb from "./components/PrayerCardMb";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const PrayerComponent = isMobile ? PrayerCardMb : PrayerCard;
  const [city, setCity] = useState("Tunisia");
  const [nextPrayerIndex, setNextPrayerIndex] = useState(1);
  const [remainingTime, setRemainingTime] = useState("");
  const [timings, setTimings] = useState({
    Fajr: "--:--",
    Sunrise: "--:--",
    Dhuhr: "--:--",
    Asr: "--:--",
    Sunset: "--:--",
    Maghrib: "--:--",
    Isha: "--:--",
  });
  const [isNextPrayer, setIsNextPrayer] = useState({
    Fajr: false,
    Dhuhr: true,
    Asr: false,
    Maghrib: false,
    Isha: false,
  });
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=`
    );
    setTimings(response.data.data.timings);
  };
  useEffect(() => {
    getTimings();
  }, [city]);
  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timings]);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCity(event.target.value);
      event.target.value = "";
    }
  };
  const updatePrayerByIndex = (index) => {
    // 1. Obtenir les clés de l'objet nextPrayer
    const prayerKeys = Object.keys(isNextPrayer); // ["Fajr", "Dhuhr", "Asr", "Sunset", "Isha"]

    // 2. Créer un nouvel objet où toutes les prières sont à false
    const updatedPrayers = {};
    prayerKeys.forEach((key) => {
      updatedPrayers[key] = false;
    });

    // 3. Mettre uniquement la prière correspondant à l'index à true
    const prayerToUpdate = prayerKeys[index]; // Si index=1 → "Dhuhr"
    if (prayerToUpdate) {
      updatedPrayers[prayerToUpdate] = true;
    }

    // 4. Mettre à jour l'état
    setIsNextPrayer(updatedPrayers);
  };
  const setupCountdownTimer = () => {
    const momentNow = moment();
    let prayerIndex = 1;
    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }

    setNextPrayerIndex(prayerIndex);
    updatePrayerByIndex(prayerIndex);
    // now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDiffernce = midnightDiff + fajrToMidnightDiff;

      remainingTime = totalDiffernce;
    }

    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(
      `${durationRemainingTime
        .seconds()
        .toString()
        .padStart(2, "0")} : ${durationRemainingTime
        .minutes()
        .toString()
        .padStart(2, "0")} : ${durationRemainingTime.hours()}`
    );
  };
  return (
    <Stack alignItems="center" spacing={0} marginTop={2}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          color: "#0b111d",
        }}
      >
        <Input
          title="Search City"
          type="text"
          placeholder="Search City"
          onKeyDown={handleKeyDown}
          disableUnderline={true}
          sx={{
            "& input": { textAlign: "center" },
            fontWeight: "bold",
            borderTopRightRadius: "32px",
            borderTopLeftRadius: "32px",
            backgroundColor: theme.palette.background.secondary,
            color: theme.palette.text.secondary,
            padding: "8px 24px",
            width: "100%",
          }}
        />
      </div>

      <MainCard
        city={city}
        nextPrayer={
          prayersArray[nextPrayerIndex].displayName + " بعد " + remainingTime
        }
        sunrise={timings.Sunrise}
        sunset={timings.Sunset}
      />

      <Stack
        alignItems="center"
        direction={{ xs: "column", sm: "column", md: "row" }}
        sx={{
          width: { xs: "90%", sm: "90%", md: "auto" },
        }}
        gap={isMobile ? 1 : 3}
      >
        <PrayerComponent
          prayerName={"الفجر"}
          prayerTime={timings.Fajr}
          am={"AM"}
          offset={"+20"}
          isNextPrayer={isNextPrayer.Fajr}
        />
        <PrayerComponent
          prayerName={"الظهر"}
          prayerTime={timings.Dhuhr}
          am={"PM"}
          offset={"1:00"}
          suffix={"PM"}
          isNextPrayer={isNextPrayer.Dhuhr}
        />
        <PrayerComponent
          prayerName={"العصر"}
          prayerTime={timings.Asr}
          am={"PM"}
          offset={"+15"}
          isNextPrayer={isNextPrayer.Asr}
        />
        <PrayerComponent
          prayerName={"المغرب"}
          prayerTime={timings.Maghrib}
          am={"PM"}
          offset={"+7"}
          isNextPrayer={isNextPrayer.Maghrib}
        />
        <PrayerComponent
          prayerName={"العشاء"}
          prayerTime={timings.Isha}
          am={"PM"}
          offset={"+15"}
          isNextPrayer={isNextPrayer.Isha}
        />
      </Stack>
    </Stack>
  );
}

export default App;
