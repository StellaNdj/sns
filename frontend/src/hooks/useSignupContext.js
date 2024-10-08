import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, email, password, username) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({firstName, lastName, email, password, username})
    });

    const json = await response.json();

    if(!response.ok) {
      setLoading(false);
      setError(json.error);
    };

    if(response.ok) {
      localStorage.setItem('user', JSON.stringify(json))

      dispatch({type: 'LOGIN', payload: json});

      setLoading(false);
    }
  }

  return { signup, loading, error };

}
