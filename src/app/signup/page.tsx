'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUp = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('SignUp success', response.data);

      toast.success('SignUp success');
      router.push('/login');
    } catch (error: any) {
      console.log('SignUp failed');
      toast.error(error.message);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div
      className="flex flex-col items-center
  justify-center min-h-screen py-2"
    >
      <h1>{loading ? 'Processing' : 'SignUp'}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        onClick={onSignup}
        className="p-2 border border-gray-300
      rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={buttonDisabled}
      >
        Signup
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
};

export default SignUp;
