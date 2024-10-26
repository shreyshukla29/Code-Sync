import  { useState } from 'react';
import SignupForm from './../component/SignupFom';
import LoginForm from './../component/LoginForm';
import Layout from './../layout/Layout';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (data) => {
    console.log(data);
    alert("Account created/logged in. Now generating a room...");
    generateRoom();
  };
  const generateRoom = () => {
    const roomId = Math.random().toString(36).substr(2, 9);
    alert(`Room created! Your room ID is: ${roomId}`); 
  };
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center mt-4">
      {isLogin ? (
        <LoginForm onSwitch={handleSwitch} onSubmit={handleSubmit} />
      ) : (
        <SignupForm onSwitch={handleSwitch} onSubmit={handleSubmit} />
      )}
    </div>
      </Layout>
  );
};

export default AuthPage;
