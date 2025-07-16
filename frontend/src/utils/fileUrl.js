// // utils/fileUrl.js

// export const getBackendBaseUrl = () =>
//   import.meta.env.MODE === 'development'
//     ? 'http://localhost:5000'
//     : 'https://hubx-3imk.onrender.com';

// export const getFileUrl = (relativePath) => `${getBackendBaseUrl()}${relativePath}`;


// src/utils/fileUrl.js

export const getBackendBaseUrl = () =>
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000'
    : 'https://hubx-3imk.onrender.com';

export const getFileUrl = (path) => {
  // ✅ Don't prepend again if it's already a full URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // ✅ Only prepend if it's a relative path like /uploads/xyz.png
  return `${getBackendBaseUrl()}${path}`;
};
