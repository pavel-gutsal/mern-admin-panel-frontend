import { useState } from 'react';
import { Error } from '../types/Error';
import { User } from '../types/User';

const URL = 'http://localhost:8000/users';

export const useGetAllUsers = () => {
  const [error, setError] = useState<null | Error>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const getAllUsers = async (currentUser: User) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentUser),
    };

    const response = await fetch(URL, options);
    const data = await response.json();

    try {
      if (!response.ok) {
        setError(data);
      }

      setAllUsers(data.filter((el: User) => el.email !== currentUser.email));
    } catch (err) {
      console.log(err);
    }
  };

  return { getAllUsers, error, allUsers };
};
