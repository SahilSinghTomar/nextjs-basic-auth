'use client';

import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState('nothing');

  const getUserDetails = async () => {
    try {
      const res = await axios.post('/api/users/aboutme');
      console.log(res.data);
      setData(res.data.user._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logged out successfully!');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div
      className="flex flex-col items-center
  justify-center min-h-screen py-2"
    >
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data === 'nothing' ? (
          'Nothing'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white
      font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="bg-green-500 mt-4 hover:bg-green-700 text-white
      font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
};

export default Profile;
