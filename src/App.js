import { useState } from "react";
import Stepper from "./Components/Stepper";

import Account from "./Components/steps/Account";
import Detail from "./Components/steps/Detail";
import Complete from "./Components/steps/Complete";
import StepperControl from "./Components/StepperControl";
import {
  UseContextProvider,
  useStepperContext,
} from "./contexts/StepperContext";
import "./App.css";
import Additional from "./Components/steps/Additional";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [FormValid1, setFormValid1] = useState(false);
  const [FormValid2, setFormValid2] = useState(false);
    const [FormValid3, setFormValid3] = useState(false);

  const [nextButtonClicked1, setNextButtonClicked1] = useState(false);
  const [nextButtonClicked2, setNextButtonClicked2] = useState(false);
  const [nextButtonClicked3, setNextButtonClicked3] = useState(false);
  // ... (repeat for each step)
  const [allData, setAllData] = useState({ userData: {}, childData: {} });

  const steps = ["معلومات الحساب", "تفاصيل شخصية", "إضافي", "اكتمال"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <Account
            setFormValid1={setFormValid1}
            nextButtonClicked1={nextButtonClicked1}
          />
        );
      case 2:
        return (
          <Detail
            setFormValid2={setFormValid2}
            nextButtonClicked2={nextButtonClicked2}
          />
        );
      case 3:
        return (
          <Additional
            setFormValid3={setFormValid3}
            nextButtonClicked3={nextButtonClicked3}
            setAllData={setAllData}
          />
        );
      case 4:
        return <Complete />;
      default:
    }
  };

  const handleSubmit = () => {
    // Access userData and childData here and perform your logic
      console.log("Submitting data:", allData);

  }


  const handleClick = (direction) => {
    let newStep = currentStep;

    if(direction === "next"){
      // Validate for Step 1
      if (currentStep === 1) {
        if (!FormValid1) {
          setNextButtonClicked1(true);
          return;
        }
      }

      // Validate for Step 2
      if (currentStep === 2) {
        if (!FormValid2) {
          setNextButtonClicked2(true);
          return;
        }
      }
      // Validate for Step 3
      if (currentStep === 3) {
        if (!FormValid3) {
          setNextButtonClicked3(true);
          return;
        }
        handleSubmit();
      }
    }
    // Add more validations for other steps if needed

    direction === "next" ? newStep++ : newStep--;

    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2 stepper-container">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>

      {/* navigation button */}

      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
}

export default App;
