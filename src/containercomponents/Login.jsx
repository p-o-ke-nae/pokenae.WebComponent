import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ログイン状態を確認
    const token = localStorage.getItem('auth_token');
    if (token) {
      console.log(`token:${token}`);
      setIsLoggedIn(true);
    }
  }, []);

  // const handleLogin = () => {
  //   const clientId = '805729941904-h95ej9999oqro2i98q138tiduioamuk9.apps.googleusercontent.com';
  //   const redirectUri = 'http://localhost:3001/callback';
  //   const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
  //   const responseType = 'code';
  //   // const state = Math.random().toString(36).substring(2); // ランダムなstateを生成
  //   const state = encodeURIComponent(window.location.href);
  //   localStorage.setItem('oauth_state', state); // stateをローカルストレージに保存

  //   const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}&test=mylink`;

  //   window.location.href = authUrl;
  // };

  const handleLogin = () => {
    const params = new URLSearchParams({
      client_id: '805729941904-h95ej9999oqro2i98q138tiduioamuk9.apps.googleusercontent.com', //'805729941904-bkvplvrqn8g2hflp6lhki9jckv5c8plb.apps.googleusercontent.com',//'805729941904-h95ej9999oqro2i98q138tiduioamuk9.apps.googleusercontent.com',
      redirect_uri: 'http://localhost:3001/callback', // フロントエンドのコールバック
      response_type: 'code',
      scope: 'openid email profile', //openid email profile spreadsheets.readonly
      state: window.location.pathname, // 認証後に戻したいパスをstateに入れる例
      //prompt: 'select_account',
      access_type: 'offline', // オフラインアクセスを要求
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <button className="login-button" onClick={handleLogout}>ログアウト</button>
      ) : (
        <button className="login-button" onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default Login;
