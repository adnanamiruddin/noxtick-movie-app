import { Button, Typography, Box, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MovieSchedule = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  setShowSeats,
}) => {
  const navigate = useNavigate();

  const renderDates = () => {
    const dates = [];
    const currentDate = dayjs();

    for (let i = 0; i < 5; i++) {
      const date = currentDate.add(i, "day");
      const formattedDate = date.format("DD MMM");

      dates.push(
        <Button
          key={formattedDate}
          variant="contained"
          color={selectedDate === formattedDate ? "success" : "warning"}
          onClick={() => handleDateClick(formattedDate)}
          sx={{ margin: 1 }}
        >
          {formattedDate}
        </Button>
      );
    }

    return dates;
  };

  const renderTimes = () => {
    const times = ["11.40", "14.30", "17.15", "20.35"];
    const currentTime = new Date();
    const [selectedDay, selectedMonth] = selectedDate.split(" ");

    return times.map((time) => {
      const [selectedHour, selectedMinute] = time.split(".");
      const showtime = new Date();
      showtime.setDate(selectedDay);
      showtime.setMonth(monthNames.indexOf(selectedMonth));
      showtime.setHours(selectedHour);
      showtime.setMinutes(selectedMinute);

      const timeDifference =
        (showtime.getTime() - currentTime.getTime()) / (1000 * 60);
      const isTimePassed = timeDifference <= 10;

      return (
        <Button
          key={time}
          variant="contained"
          color={selectedTime === time ? "success" : "info"}
          onClick={() => handleTimeClick(time)}
          sx={{ margin: 1 }}
          disabled={isTimePassed}
        >
          {time}
        </Button>
      );
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("date", date);
    navigate({ search: searchParams.toString() });
  };

  const handleTimeClick = (time) => {
    setShowSeats(true);
    setSelectedTime(time);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("time", time);
    navigate({ search: searchParams.toString() });
  };

  return (
    <div>
      <Stack
        spacing={4}
        direction={{ xs: "column", md: "row" }}
        sx={{ justifyContent: "space-evenly" }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" fontWeight="600" gutterBottom>
            DATE
          </Typography>
          <Box>{renderDates()}</Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" fontWeight="600" gutterBottom>
            SHOW TIME
          </Typography>
          <Box>{renderTimes()}</Box>
        </Box>
      </Stack>

      <Stack spacing={2}></Stack>
    </div>
  );
};

export default MovieSchedule;
