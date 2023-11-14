import { useStepperContext } from "../contexts/StepperContext";

export default function StepperControl({ handleClick, currentStep, steps }) {
  const { userData, childData } = useStepperContext();


  return (
    <div className="container mt-4 mb-8 flex justify-around">
      {currentStep !== 1 && (
        <button
          onClick={() => handleClick()}
          className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white`}
        >
          رجوع
        </button>
      )}
      <button
        onClick={() => {
          handleClick("next");
        }}
        className="cursor-pointer rounded-lg bg-green-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
      >
        {currentStep === steps.length - 1 ? "تأكيد" : "التالي"}
      </button>
    </div>
  );
}
