import { createContext, useState } from "react";

const GlobalAlertContext = createContext();

export const GlobalAlertProvider = ({ children }) => {

  const [isSuccessActivated, setIsSuccessActivated] = useState(false);
  const [isErrorActivated, setIsErrorActivated] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <GlobalAlertContext.Provider value={{
      isSuccessActivated, 
      setIsSuccessActivated, 
      isErrorActivated, 
      setIsErrorActivated, 

      successMessage,
      setSuccessMessage,
      errorMessage,
      setErrorMessage
    }}>
      {children}
    </GlobalAlertContext.Provider>
  )

};

export default GlobalAlertContext;
