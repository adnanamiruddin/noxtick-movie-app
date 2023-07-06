import privateClient from "../client/private.client";

const userTicketEndPoints = {
  tickets: "user/tickets",
};

const userTicketApi = {
  getTickets: async () => {
    try {
      const response = await privateClient.get(userTicketEndPoints.tickets);
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
      const response = await privateClient.post(userTicketEndPoints.tickets, {
        showtimeDate,
        showtimeTime,
        seatNumbers,
        movieAgeRating,
        movieTicketPrice,
        movieTitle,
        moviePoster,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  cancelTicket: async ({ ticketId, password }) => {
    try {
      const response = await privateClient.delete(userTicketEndPoints.tickets, {
        data: {
          ticketId,
          password,
        },
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userTicketApi;
