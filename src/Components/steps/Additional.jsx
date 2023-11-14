import { useStepperContext } from "../../contexts/StepperContext";
import Select from "react-select";
import { useEffect } from "react";

export default function Additional({ setFormValid3, nextButtonClicked3, setAllData }) {
  const { userData, setUserData, childData } = useStepperContext();

  // const validateForm = () => {
  //   const isUserDataValid =
  //     userData["الجنسية"] && userData["الوظيفة"] && userData["نوع المساعدة"];

  //   const isValid = isUserDataValid;

  //   // Set the form validity state
  //   setFormValid3(isValid);

  //   // Return the validation result
  //   return isValid;
  // };

   
  const renderValidationMessage = (fieldName, errorMessage) => {
    console.log(`${fieldName} value:`, userData[fieldName]);

    return (
      <span className="text-red-500">
        {nextButtonClicked3 &&
          (userData[fieldName] === "" || userData[fieldName] === undefined) && (
            <p>{errorMessage}</p>
          )}
      </span>
    );
  };

  useEffect(() => {
    // Validate the form and setFormValid3 in the effect hook
    const isValid =
      userData["الجنسية"] && userData["الوظيفة"] && userData["نوع المساعدة"];
    setFormValid3(isValid);

    // If the form is valid, setAllData
    if (isValid) {
      setAllData({ userData, childData });
    }
  }, [userData, setFormValid3, setAllData, childData]);

  const selectedOption = (fieldName, options) => {
    return options.find((option) => option.value === userData[fieldName]);
  };

  const handleChange = (selectedOption, fieldName) => {
    setUserData({
      ...userData,
      [fieldName]: selectedOption ? selectedOption.value : null,
    });
  };

  const nationalityOptions = [
    { value: "جنسية 1", label: "جنسية 1" },
    { value: "جنسية 2", label: "جنسية 2" },
    // Add more nationality options as needed
  ];

  const jobOptions = [
    { value: "وظيفة 1", label: "وظيفة 1" },
    { value: "وظيفة 2", label: "وظيفة 2" },
    // Add more job options as needed
  ];

  const assistanceOptions = [
    { value: "مساعدة 1", label: "مساعدة 1" },
    { value: "مساعدة 2", label: "مساعدة 2" },
    // Add more assistance options as needed
  ];

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          الجنسية
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={nationalityOptions}
            value={selectedOption("الجنسية", nationalityOptions)}
            onChange={(selectedOption) =>
              handleChange(selectedOption, "الجنسية")
            }
            isSearchable={false}
            placeholder="اختر الجنسية"
            className="w-full appearance-none outline-none text-gray-800"
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                boxShadow: "none", // Remove the box shadow
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "lightgray" : "white",
              }),
            }}
          />
        </div>
        {renderValidationMessage("الجنسية", "This field is required")}
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          الوظيفة
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={jobOptions}
            value={selectedOption("الوظيفة", jobOptions)}
            onChange={(selectedOption) =>
              handleChange(selectedOption, "الوظيفة")
            }
            isSearchable={false}
            placeholder="اختر الوظيفة"
            className="w-full appearance-none outline-none text-gray-800"
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                boxShadow: "none", // Remove the box shadow
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "lightgray" : "white",
              }),
            }}
          />
        </div>
        {renderValidationMessage("الوظيفة", "This field is required")}
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          نوع المساعدة
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={assistanceOptions}
            value={selectedOption("نوع المساعدة", assistanceOptions)}
            onChange={(selectedOption) =>
              handleChange(selectedOption, "نوع المساعدة")
            }
            isSearchable={false}
            placeholder="اختر نوع المساعدة"
            className="w-full appearance-none outline-none text-gray-800"
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                boxShadow: "none", // Remove the box shadow
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "lightgray" : "white",
              }),
            }}
          />
        </div>
        {renderValidationMessage("نوع المساعدة", "This field is required")}
      </div>
    </div>
  );
}
