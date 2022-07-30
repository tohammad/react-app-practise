import React, { useState, useEffect } from 'react';
import Toast from '../../components/common/Toast/Toast';

export const ToastContext = React.createContext({});
const ToastProvider = ({ children }) => {
  const [displayToast, setDisplayToast] = useState(null);
  const [timeoutInfo, setTimeoutInfo] = useState(null);

  const showToast = (toast) => {
    setDisplayToast(toast);
    setTimeoutInfo(
      setTimeout(() => {
        setDisplayToast(null);
        setTimeoutInfo(null);
      }, 5000)
    );
  };

  const handleClose = () => {
    setDisplayToast(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutInfo) {
        clearTimeout(timeoutInfo);
      }
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{
        displayToast,
        setDisplayToast,
        showToast,
      }}
    >
      {displayToast && <Toast toast={displayToast} handleClose={handleClose} />}
      {children}
    </ToastContext.Provider>
  );
};
export default ToastProvider;
