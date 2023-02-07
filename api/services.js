import axios from 'axios';

export const postComment = comment => {
  return new Promise((resolve, reject) => {
    axios
      .post('/endpoint', {comment})
      .then(({data}) => resolve(data))
      .catch(err => reject(err));
  });
};
