import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStatus, setToastStatus] = useState(""); // 'success' or 'error'
  const [toastVisible, setToastVisible] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  const showToast = (message, status) => {
    setToastMessage(message);
    setToastStatus(status);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastMessage("");
    setToastStatus("");
    setToastVisible(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        showLoader,
        hideLoader,
        toastMessage,
        toastStatus,
        toastVisible,
        showToast,
        hideToast,
      }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
