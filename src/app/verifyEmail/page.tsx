'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const VerifyEmail = () => {
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post('/api/users/verifyEmail', { token });
      console.log('VerifyEmail success');
      setVerified(true);
      setError(false);
    } catch (error: any) {
      console.log('VerifyEmail failed');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');

    // const { query } = router;
    // const urlToken = query.token;
    // setToken((urlToken as string) || '');
  }, []);

  if (verified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Email verified</h1>
        <Link href="/login">
          <button
            className="p-2 border border-gray-300
      rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center
  justify-center min-h-screen py-2"
    >
      <h1 className="text-4xl">{loading ? 'Processing' : 'Verify Email'}</h1>
      <h2>{token}</h2>
      <button
        disabled={loading || verified}
        className="p-2 border border-gray-300
      rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={verifyUserEmail}
      >
        {verified ? 'Verified' : 'Verify'}
      </button>
      {error && <p className="text-red-500">Error verifying email</p>}
    </div>
  );
};

export default VerifyEmail;
