import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const leftSideSeats = [
  [1, 2, 3, 4],
  [9, 10, 11, 12],
  [17, 18, 19, 20],
  [25, 26, 27, 28],
  [33, 34, 35, 36],
  [41, 42, 43, 44],
  [49, 50, 51, 52],
  [57, 58, 59, 60],
];

const rightSideSeats = [
  [5, 6, 7, 8],
  [13, 14, 15, 16],
  [21, 22, 23, 24],
  [29, 30, 31, 32],
  [37, 38, 39, 40],
  [45, 46, 47, 48],
  [53, 54, 55, 56],
  [61, 62, 63, 64],
];

const MovieSeats = ({ selectedSeats, setSelectedSeats, handleSeatClick }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "end", md: "center" },
          marginBottom: { xs: "1rem", md: "3.5rem" },
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "100%",
            color: themeMode === "light" ? "#fff" : "#000",
            backgroundColor: themeMode === "light" ? "#000" : "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: 500,
          }}
        >
          Studio Screen
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left Side Studio START */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            fontWeight="500"
            sx={{
              display: { xs: "inline-block", md: "none", marginBottom: "10px" },
            }}
          >
            Left Side Studio
          </Typography>
          {leftSideSeats.map((row, rowIndex) => (
            <Grid container key={rowIndex} spacing={1} marginBottom={1}>
              {row.map((seatNumber) => {
                const isSelected = selectedSeats.includes(seatNumber);
                const isMaxSelection = selectedSeats.length >= 6;

                return (
                  <Grid item key={seatNumber} xs={3}>
                    <Button
                      variant="contained"
                      color={isSelected ? "success" : "info"}
                      onClick={() => handleSeatClick(seatNumber)}
                      sx={{
                        width: "100%",
                        height: "100%",
                        pointerEvents:
                          isMaxSelection && !isSelected ? "none" : "auto",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: isSelected ? "#fff" : "#000",
                          fontWeight: "bold",
                        }}
                      >
                        {seatNumber}
                      </Typography>
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Grid>
        {/* Left Side Studio END */}

        {/* Right Side Studio START */}
        <Grid item xs={12} md={6} sx={{ marginTop: { xs: "1.5rem", md: 0 } }}>
          <Box
            display="flex"
            justifyContent="center"
            marginBottom="4rem"
            sx={{ display: { xs: "inline", md: "none" } }}
          >
            <Box
              sx={{
                width: "80%",
                height: "max-content",
                color: themeMode === "light" ? "#fff" : "#000",
                backgroundColor: themeMode === "light" ? "#000" : "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                fontWeight: 500,
              }}
            >
              Studio Screen
            </Box>
          </Box>
          <Typography
            variant="h5"
            fontWeight="500"
            marginTop="1rem"
            sx={{
              display: { xs: "inline-block", md: "none", marginBottom: "10px" },
            }}
          >
            Right Side Studio
          </Typography>
          {rightSideSeats.map((row, rowIndex) => (
            <Grid container key={rowIndex} spacing={1}>
              {row.map((seatNumber) => {
                const isSelected = selectedSeats.includes(seatNumber);
                const isMaxSelection = selectedSeats.length >= 6;

                return (
                  <Grid item key={seatNumber} xs={3} marginBottom={1}>
                    <Button
                      variant="contained"
                      color={isSelected ? "success" : "info"}
                      onClick={() => handleSeatClick(seatNumber)}
                      sx={{
                        width: "100%",
                        height: "100%",
                        pointerEvents:
                          isMaxSelection && !isSelected ? "none" : "auto",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: isSelected ? "#fff" : "#000",
                          fontWeight: "bold",
                        }}
                      >
                        {seatNumber}
                      </Typography>
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Grid>
        {/* Right Side Studio END */}
      </Grid>
    </div>
  );
};

export default MovieSeats;
