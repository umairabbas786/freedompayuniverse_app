import NetInfo from '@react-native-community/netinfo';

export const baseUrl = 'https://freedompayuniverse.com/apis';

export const isConnectedToInternet = () => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        resolve(state.isConnected);
      })
      .catch(e => reject(e));
  });
};
