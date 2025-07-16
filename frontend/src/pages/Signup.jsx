
// // // import React, { useState } from 'react';
// // // import axios from '../axios';

// // // function Signup() {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     mobile: '',
// // //     password: '',
// // //   });

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const validate = () => {
// // //     const { name, email, mobile, password } = formData;
// // //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // //     const mobileRegex = /^[0-9]{10}$/;

// // //     if (!name.trim()) return 'Name is required';
// // //     if (!emailRegex.test(email)) return 'Invalid email format';
// // //     if (!mobileRegex.test(mobile)) return 'Mobile must be 10 digits';
// // //     if (password.length < 6) return 'Password must be at least 6 characters';

// // //     return null;
// // //   };

// // //   const handleSignup = async (e) => {
// // //     e.preventDefault();
// // //     const error = validate();
// // //     if (error) return alert(error);

// // //     try {
// // //       const res = await axios.post('/auth/signup', formData);
// // //       alert(res.data.message);
// // //     } catch (err) {
// // //       alert(err.response?.data?.message || 'Signup failed');
// // //     }
// // //   };

// // //   return (
// // //     <form onSubmit={handleSignup}>
// // //       <h2>Signup</h2>
// // //       <input name="name" placeholder="Name" onChange={handleChange} required />
// // //       <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
// // //       <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
// // //       <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
// // //       <button type="submit">Sign Up</button>
// // //     </form>
// // //   );
// // // }

// // // export default Signup;


// // import React, { useState } from 'react';
// // import axios from '../axios';
// // import styles from './Signup.module.css'; // ✅ import the CSS module

// // function Signup() {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     mobile: '',
// //     password: '',
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const validate = () => {
// //     const { name, email, mobile, password } = formData;
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     const mobileRegex = /^[0-9]{10}$/;

// //     if (!name.trim()) return 'Name is required';
// //     if (!emailRegex.test(email)) return 'Invalid email format';
// //     if (!mobileRegex.test(mobile)) return 'Mobile must be 10 digits';
// //     if (password.length < 6) return 'Password must be at least 6 characters';

// //     return null;
// //   };

// //   const handleSignup = async (e) => {
// //     e.preventDefault();
// //     const error = validate();
// //     if (error) return alert(error);

// //     try {
// //       const res = await axios.post('/auth/signup', formData);
// //       alert(res.data.message);
// //     } catch (err) {
// //       alert(err.response?.data?.message || 'Signup failed');
// //     }
// //   };

// //   return (
// //     <div className={styles.container}>
// //       <form className={styles.form} onSubmit={handleSignup}>
// //         <h2>Signup</h2>
// //         <input name="name" placeholder="Name" onChange={handleChange} required />
// //         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
// //         <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
// //         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
// //         <button type="submit">Sign Up</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Signup;

// import React, { useState } from 'react';
// import axios from '../axios';
// import { Link } from 'react-router-dom';
// import styles from './Signup.module.css'; // make sure the CSS module is there

// function Signup() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const { name, email, mobile, password } = formData;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const mobileRegex = /^[0-9]{10}$/;

//     if (!name.trim()) return 'Name is required';
//     if (!emailRegex.test(email)) return 'Invalid email format';
//     if (!mobileRegex.test(mobile)) return 'Mobile must be 10 digits';
//     if (password.length < 6) return 'Password must be at least 6 characters';

//     return null;
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const error = validate();
//     if (error) return alert(error);

//     try {
//       const res = await axios.post('/auth/signup', formData);
//       alert(res.data.message);
//     } catch (err) {
//       alert(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form className={styles.form} onSubmit={handleSignup}>
//         <h2>Signup</h2>
//         <input name="name" placeholder="Name" onChange={handleChange} required />
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//         <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Sign Up</button>
//         <p style={{ marginTop: '1rem', textAlign: 'center' }}>
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Signup;
import React, { useState } from 'react';
import axios from '../axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'; // your custom CSS module

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, mobile, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!name.trim()) return 'Name is required';
    if (!emailRegex.test(email)) return 'Invalid email format';
    if (!mobileRegex.test(mobile)) return 'Mobile must be 10 digits';
    if (password.length < 6) return 'Password must be at least 6 characters';

    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return alert(error);

    try {
      const res = await axios.post('/auth/signup', formData);
      alert(res.data.message || 'Signup successful! Please login.');
      navigate('/login'); // Redirect after success ✅
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSignup}>
        <h2>Signup</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
