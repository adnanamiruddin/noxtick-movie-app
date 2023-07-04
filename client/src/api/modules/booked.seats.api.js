import publicClient from "../client/public.client";

const bookedSeatsEndPoints = {
  bookedSeatsByTitle: ({ title }) => `booked-seats/${title}`,
  addBookedSeats: "booked-seats",
  deleteBookedSeats: ({ id }) => `booked-seats/${id}`,
};

const bookedSeatsApi = {
  getBookedSeatsByTitle: async ({ title }) => {
    try {
      const response = await publicClient.get(
        bookedSeatsEndPoints.bookedSeatsByTitle({ title })
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
      const response = await publicClient.post(
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
      const response = await publicClient.delete(
        bookedSeatsEndPoints.deleteBookedSeats({ id })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default bookedSeatsApi;
