import { Button, Typography, Box, Stack } from "@mui/material";
import dayjs from "dayjs";

const MovieSchedule = ({selectedDate, setSelectedDate, selectedTime, setSelectedTime}) => {

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

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
    const times = ["12.30", "15.10", "18.15", "21.00"];

    return times.map((time) => (
      <Button
        key={time}
        variant="contained"
        color={selectedTime === time ? "success" : "info"}
        onClick={() => handleTimeClick(time)}
        sx={{ margin: 1 }}
      >
        {time}
      </Button>
    ));
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
