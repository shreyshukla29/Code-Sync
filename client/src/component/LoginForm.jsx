/* eslint-disable react/prop-types */
import { useState } from 'react';

const LoginForm = ({ onSwitch, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-3xl font-semibold text-white mb-6">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2" htmlFor="email">
          Username
          </label>
          <input
            className="w-full px-3 py-2 text-gray-900 rounded-lg"
            type="email"
            id="email"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 text-gray-900 rounded-lg"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-gray-400">
        Don’t have an account?{' '}
        <button onClick={onSwitch} className="text-blue-400 hover:underline">
          Sign up here
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
