// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   withCredentials: true, // if you plan to use cookies/sessions later
// });

// export default instance;

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hubx-3imk.onrender.com/api',
});

export default instance;
