/* eslint-disable semi */

import AsyncStorage from '@react-native-async-storage/async-storage';

class fetchClient {
  static get(baseUrl, endpoint, token, any, headers) {
    return new Promise((resolve, reject) => {
      fetch(baseUrl + endpoint, {
        body: JSON.stringify(any),
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          ...headers,
        },
      })
        .then(async response => {
          if (response.status === 401) {
            // handle for unauthorized
            AsyncStorage.multiRemove(['login-data'], () => {
              console.log('token clear all');
            });
          }
          if (response.ok) {
            resolve(response.json());
          } else {
            reject(await response.json());
          }
        })
        .catch(async error => {
          console.log(error);
          reject(await error.json());
        });
    });
  }
  static post(baseUrl, endpoint, payload, token, headers) {
    return new Promise((resolve, reject) => {
      console.log(`${baseUrl}${endpoint} request-> ${JSON.stringify(payload)}`);
      fetch(baseUrl + endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          ...headers,
        },
      })
        .then(async response => {
          if (response.status === 401) {
            // handle for unauthorized
            AsyncStorage.multiRemove(['login-data'], () => {
              console.log('token clear all');
            });
          }
          if (response.ok) {
            resolve(await response.json());
          } else {
            reject(await response.json());
          }
        })
        .catch(async error => {
          console.log(error);
          reject(await error.json());
        });
    });
  }
  static put(baseUrl, endpoint, payload, token, headers) {
    return new Promise((resolve, reject) => {
      fetch(baseUrl + endpoint, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          ...headers,
        },
      })
        .then(async response => {
          if (response.status === 401) {
            // handle for unauthorized
            AsyncStorage.multiRemove(['login-data'], () => {
              console.log('token clear all');
            });
          }
          if (!response.ok) {
            response
              .json()
              .then(error => {
                reject(error);
              })
              .catch(async err => {
                console.log(err);
                reject('Unknown error occurred', await err.json());
              });
          }
          resolve(await response.json());
        })
        .catch(async error => {
          console.log(error);
          reject(await error.json());
        });
    });
  }
  static patch(baseUrl, endpoint, payload, token, headers) {
    return new Promise((resolve, reject) => {
      fetch(baseUrl + endpoint, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          ...headers,
        },
      })
        .then(async response => {
          if (response.ok) {
            resolve(response);
          } else {
            if (response.status === 401) {
              // handle for unauthorized
              AsyncStorage.multiRemove(['login-data'], () => {
                console.log('token clear all');
              });
            }
            let err = new Error('HTTP status code: ' + response.status);
            err.response = response;
            err.status = response.status;
            throw err;
          }
        })
        .catch(async error => {
          reject(error);
        });
    });
  }
  static delete(baseUrl, endpoint, payload, token, headers) {
    return new Promise((resolve, reject) => {
      const url = baseUrl + endpoint;
      console.log(`${url} request-> ${JSON.stringify(payload)}`);
      fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          ...headers,
        },
      })
        .then(async response => {
          if (response.status === 401) {
            // handle for unauthorized
            AsyncStorage.multiRemove(['login-data'], () => {
              console.log('token clear all');
            });
          }
          if (!response.ok) {
            response
              .json()
              .then(async error => {
                reject(await error.json());
              })
              .catch(async err => {
                console.log(err);
                reject('Unknown error occurred', await err.json());
              });
          }
          resolve(await response.json());
        })
        .catch(async error => {
          console.log(error);
          reject(await error.json());
        });
    });
  }
}

export default fetchClient;
