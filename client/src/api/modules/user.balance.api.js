import privateClient from "../client/private.client";

const userBalanceEndPoints = {
  balance: "user/balance",
};

const userBalanceApi = {
  getBalance: async () => {
    try {
      const response = await privateClient.get(userBalanceEndPoints.balance);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  topup: async ({ amount, password }) => {
    try {
      const response = await privateClient.post(userBalanceEndPoints.balance, {
        amount,
        password
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  withdraw: async ({ amount, password }) => {
    try {
      const response = await privateClient.put(userBalanceEndPoints.balance, {
        amount,
        password,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userBalanceApi;
