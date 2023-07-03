import publicClient from "../client/public.client";
import privateClient from "../client/private.client";

const userEndPoints = {
  signup: "user/signup",
  signin: "user/signin",
  info: "user/info",
};

const userApi = {
  signup: async ({ username, displayName, age, password, confirmPassword }) => {
    try {
      const response = await publicClient.post(userEndPoints.signup, {
        username,
        displayName,
        age,
        password,
        confirmPassword,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  signin: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndPoints.signin, {
        username,
        password,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndPoints.info);
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userApi;
