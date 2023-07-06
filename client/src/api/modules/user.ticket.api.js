import privateClient from "../client/private.client";

const userTicketEndPoints = {
  ticket: "user/my-tickets",
  bookTickets: "user/book-tickets",
  cancelTicket: ({ ticketId }) => `user/cancel-tickets/${ticketId}`,
};

const userTicketApi = {
  getTickets: async () => {
    try {
      const response = await privateClient.get(userTicketEndPoints.ticket);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  bookTickets: async ({
    showtimeDate,
    showtimeTime,
    seatNumbers,
    movieAgeRating,
    movieTicketPrice,
    movieTitle,
    moviePoster,
  }) => {
    try {
      const response = await privateClient.post(
        userTicketEndPoints.bookTickets,
        {
          showtimeDate,
          showtimeTime,
          seatNumbers,
          movieAgeRating,
          movieTicketPrice,
          movieTitle,
          moviePoster,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  cancelTicket: async ({ ticketId }) => {
    try {
      const response = await privateClient.delete(
        userTicketEndPoints.cancelTicket({ ticketId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userTicketApi;
