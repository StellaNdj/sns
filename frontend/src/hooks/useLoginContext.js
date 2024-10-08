import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const logURL = `${process.env.REACT_APP_BACKEND_URL}/api/user/login`;
  console.log(logURL);


  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });

    const json = await response.json();

    if(!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if(response.ok) {
      // Set user to localStorage
      localStorage.setItem('user', JSON.stringify(json));

      // Update the authContext
      dispatch({type: 'LOGIN', payload: json});

      setLoading(false);
    }
  }

  return { login, loading, error };
}
