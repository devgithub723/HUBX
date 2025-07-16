

// import React, { useState } from 'react';
// import axios from '../axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [formData, setFormData] = useState({
//     identifier: '',
//     password: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const { identifier, password } = formData;
//     if (!identifier.trim()) return 'Email or mobile is required';
//     if (password.length < 6) return 'Password must be at least 6 characters';
//     return null;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const error = validate();
//     if (error) return alert(error);

//     try {
//       const res = await axios.post('/auth/login', formData);
//       const userId = res.data.user.id;
//       alert('Login successful!');
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('userId', userId);
//       navigate('/chat');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input
//         name="identifier"
//         placeholder="Email or Mobile"
//         onChange={handleChange}
//         required
//         autoComplete="username"
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         onChange={handleChange}
//         required
//         autoComplete="current-password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Login.module.css'; // ✅ reuse the same CSS module

function Login() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { identifier, password } = formData;
    if (!identifier.trim()) return 'Email or mobile is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return alert(error);

    try {
      const res = await axios.post('/auth/login', formData);
      const userId = res.data.user.id;
      alert('Login successful!');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', userId);
      navigate('/chat');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          name="identifier"
          placeholder="Email or Mobile"
          onChange={handleChange}
          required
          autoComplete="username"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
