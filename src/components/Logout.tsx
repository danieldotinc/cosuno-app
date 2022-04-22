import React from 'react';

import auth from '../services/authService';

const Logout: React.FC = () => {
  auth.logout();

  window.location.href = '/login';

  return null;
};

export default Logout;
