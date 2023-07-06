import privateClient from "../client/private.client";

const userBalanceEndPoints = {
  balance: "user/balance/balance",
  topup: "user/balance/topup",
  withdraw: "user/balance/withdraw",
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
      const response = await privateClient.post(userBalanceEndPoints.topup, {
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
      const response = await privateClient.post(userBalanceEndPoints.withdraw, {
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
