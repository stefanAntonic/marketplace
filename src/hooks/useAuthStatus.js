import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [chekingStatus, setChekingStatus] = useState(true);
  const _isMounted = useRef(true)
  useEffect(() => {
    if (_isMounted) {
        const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        
      }
      setChekingStatus(false);

    });
        
    }
    return () => {
        _isMounted.current = false;
    }
  },[_isMounted]);

  return {loggedIn, chekingStatus}
};
