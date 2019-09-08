import axios from 'axios';
import { AsyncStorage } from 'react-native';

const axiosUtil = () => {
  const getToken = async () => {
    let token = null;
    await AsyncStorage.getItem('token', (error, result) => {
      if (!error) {
        token = result;
      }
    });
    return token;
  };

  const setTokenToHeader = async () => {
    let token = null;
    token = await getToken();
    return {
      headers: {
        'X-AUTH-TOKEN': token,
      },
    };
  };

  return {
    get: async url => {
      try {
        const header = await setTokenToHeader();
        const { data } = await axios.get(url, header);
        return data;
      } catch (err) {
        const msg = err.response.data.message;
        alert(msg);
        throw new Exception();
      }
    },

    post: async (url, body = {}, header = null) => {
      try {
        if (!header) {
          header = await setTokenToHeader();
        }
        const { data } = await axios.post(url, body, header);
        return true;
      } catch (err) {
        const msg = err.response.data.message;
        alert(msg);
        return false;
      }
    },

    login: async (url, body = {}) => {
      try {
        const response = await axios.post(url, body);
        const newToken = response.headers['x-auth-token'];
        await AsyncStorage.setItem('token', newToken);
        return response.data;
      } catch (err) {
        const error = err;
        const msg = err.response.data.message;
        alert(msg);
        return false;
      }
    },

    put: async (url, body = {}) => {
      try {
        const header = await setTokenToHeader();
        const { data } = await axios.put(url, body, header);
        return true;
      } catch (err) {
        const msg = err.response.data.message;
        alert(msg);
        return false;
      }
    },

    deleteItem: async url => {
      try {
        const header = await setTokenToHeader();
        await axios.delete(url, header);
        return true;
      } catch (err) {
        const msg = err.response.data.message;
        alert(msg);
        return false;
      }
    },
  };
};
export default axiosUtil();
