import publicClient from "../client/public.client";
import privateClient from "../client/private.client";

const bookedSeatsEndPoints = {
  bookedSeatsByTitle: ({ title, showtimeDate, showtimeTime }) =>
    `booked-seats/${title}?showtimeDate=${showtimeDate}&showtimeTime=${showtimeTime}`,
  bookedSeats: "booked-seats",
};
3
const bookedSeatsApi = {
  getBookedSeatsByTitle: async ({ title, showtimeDate, showtimeTime }) => {
    try {
      const response = await publicClient.get(
        bookedSeatsEndPoints.bookedSeatsByTitle({
          title,
          showtimeDate,
          showtimeTime,
        })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  addBookedSeats: async ({
    showtimeDate,
    showtimeTime,
    seatNumbers,
    movieId,
    movieTitle,
  }) => {
    try {
      const response = await privateClient.post(
        bookedSeatsEndPoints.bookedSeats,
        {
          showtimeDate,
          showtimeTime,
          seatNumbers,
          movieId,
          movieTitle,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  deleteBookedSeats: async ({
    seatNumbers,
    showtimeDate,
    showtimeTime,
    movieTitle,
  }) => {
    try {
      const response = await privateClient.delete(
        bookedSeatsEndPoints.bookedSeats,
        {
          data: {
            seatNumbers,
            showtimeDate,
            showtimeTime,
            movieTitle,
          },
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default bookedSeatsApi;
