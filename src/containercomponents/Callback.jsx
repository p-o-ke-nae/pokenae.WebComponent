import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      console.log(code, state);

      if (code && state) {
        try {
          const response = await fetch('https://localhost:7133/api/authentication/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, state }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('auth_token', data.auth_token);
            window.location.href = `${state}`;
            // navigate('/');
          } else {
            console.error('Authentication failed');
          }
        } catch (error) {
          console.error('Error during authentication:', error);
        }
      }
    };

    fetchToken();
  }, []);

  return <div>Loading...</div>;
};

export default Callback;