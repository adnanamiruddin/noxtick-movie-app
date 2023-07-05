import publicClient from "../client/public.client";
import privateClient from "../client/private.client"

const bookedSeatsEndPoints = {
  bookedSeatsByTitle: ({ title, showtimeDate, showtimeTime }) =>
    `booked-seats/${title}?showtimeDate=${showtimeDate}&showtimeTime=${showtimeTime}`,
  addBookedSeats: "booked-seats",
  deleteBookedSeats: ({ id }) => `booked-seats/${id}`,
};

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
        bookedSeatsEndPoints.addBookedSeats,
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

  deleteBookedSeats: async ({ id }) => {
    try {
      const response = await privateClient.delete(
        bookedSeatsEndPoints.deleteBookedSeats({ id })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default bookedSeatsApi;
