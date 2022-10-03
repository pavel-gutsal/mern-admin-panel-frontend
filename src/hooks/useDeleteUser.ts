import { useState, useContext } from 'react';
import { Error } from '../types/Error';
import { AuthContext } from '../context/authContext';

const URL = 'http://localhost:8000/';

export const useDeleteUser = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState<null | Error>(null);

  const deleteUser = async (id: string) => {
    const object = {
      id,
      user,
    };

    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object),
    };

    const response = await fetch(URL, options);
    const data = await response.json();

    console.log(data);

    try {
      if (!response.ok) {
        setError(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { deleteUser, error };
};
