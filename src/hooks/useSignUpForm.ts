import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { NewUser } from '../types/NewUser';
import { Error } from '../types/Error';

const URL = 'http://localhost:8000/newUser';

export const useSignUpForm = () => {
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState<null | Error>(null);
  const SignUp = async (newUser: NewUser) => {
    setError(null);

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    };

    const response = await fetch(URL, options);
    const data = await response.json();

    try {
      if (!response.ok) {
        setError(data);
        return 'ERROR';
      }

      setUser(data);
      return 'OK';
    } catch (err) {
      console.log(err);
      return 'ERROR';
    }
  };
  return { SignUp, error };
};
