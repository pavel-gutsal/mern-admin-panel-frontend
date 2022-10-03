import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Error } from '../types/Error';

const URL = 'http://localhost:8000/signin';
interface Creds {
  password: string;
  email: string;
}
/*eslint-disable*/
export const useSignInForm = () => {
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState<null | Error>(null);

  const SignIn = async (credentials: Creds) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    };

    const response = await fetch(URL, options);
    const data = await response.json();

    console.log(data);

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

  return { SignIn, error };
};
