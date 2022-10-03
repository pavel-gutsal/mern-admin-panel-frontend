import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { EditedUser } from '../types/EditedUser';
import { Error } from '../types/Error';
import { User } from '../types/User';

const URL = 'http://localhost:8000/';

export const usePatchUser = () => {
  const { setUser, user } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState<null | User>(null);
  const [error, setError] = useState<null | Error>(null);
  const patchUser = async (editedUser: EditedUser) => {
    setUpdatedUser(null);
    setError(null);
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editedUser, user }),
    };

    const response = await fetch(URL, options);
    const data = await response.json();

    console.log(response);

    try {
      if (!response.ok) {
        setError(data);
        return 'ERROR';
      }

      if (user) {
        // eslint-disable-next-line no-underscore-dangle
        if (user._id === editedUser.id) {
          setUser(data);
        } else {
          setUpdatedUser(data);
        }
      }

      return 'OK';
    } catch (err) {
      console.log(err);
      return 'ERROR';
    }
  };
  return { patchUser, error, updatedUser };
};
