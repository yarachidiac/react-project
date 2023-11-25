import React, { createContext, useContext, useState } from "react";

const StepperContext = createContext({
  userData: {
    // Other initial values...
    "child number": 0,
  },
  setUserData: null,
  childData: [],
  setChildData: null,
});

export function UseContextProvider({ children }) {
  const [userData, setUserData] = useState({
    // Other initial values...
    "child number": 0,
  });
  const [childData, setChildData] = useState([]);

  return (
    <StepperContext.Provider
      value={{ userData, setUserData, childData, setChildData }}
    >
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const { userData, setUserData, childData, setChildData } =
    useContext(StepperContext);
  // console.log("userData in useStepperContext:", userData);

  return { userData, setUserData, childData, setChildData };
}
