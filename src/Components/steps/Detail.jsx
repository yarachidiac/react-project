import { useStepperContext } from "../../contexts/StepperContext";
import Select from "react-select";
import { useEffect } from "react";

export default function Detail({ setFormValid2, nextButtonClicked2 }) {
  const { userData, setUserData } = useStepperContext();

  const validateForm = () => {
    const isUserDataValid =
      userData["رقم السجل"] &&
      userData["مكان السجل"] &&
      userData["منطقة السكن أو العمل"] &&
      userData["المحافظة"] &&
      userData["القضاء"] &&
      userData["المحلة"];

    const isValid = isUserDataValid;

    // Set the form validity state
    setFormValid2(isValid);

    // Return the validation result
    return isValid;
  };

  const renderValidationMessage = (fieldName, errorMessage) => {
    // console.log(`${fieldName} value:`, userData[fieldName]);

    return (
      <span className="text-red-500">
        {nextButtonClicked2 &&
          (userData[fieldName] === "" || userData[fieldName] === undefined) && (
            <p>{errorMessage}</p>
          )}
      </span>
    );
  };

  useEffect(() => {
    validateForm();
  }, [userData]);

  const handleChange = (e, selectedOption, fieldName) => {
    if (e && e.target) {
      // Handling input fields
      const { name, value } = e.target;
      setUserData({
        ...userData,
        [name]: value,
      });
    } else if (selectedOption) {
      // Handling Select components
      setUserData({
        ...userData,
        [fieldName]: selectedOption.value,
      });
    }
  };


  const kada2Options = [
    { value: "kada21", label: "قضاء 1" },
    { value: "kada22", label: "قضاء 2" },
    // Add more kada2 options as needed
  ];


  const mouhafazatOptions = [
    {
      kada2: "kada21",
      mouhafazat: [
        { value: "محافظة 1", label: "محافظة 1" },
        { value: "محافظة 2", label: "محافظة 2" },
        // Add more mouhafazat options as needed
      ],
    },
    {
      kada2: "kada22",
      mouhafazat: [
        { value: "محافظة 3", label: "محافظة 3" },
        { value: "محافظة 4", label: "محافظة 4" },
        // Add more mouhafazat options as needed
      ],
    },
    // Add more kada2 options as needed
  ];

  const options1 = [
    { value: "مكان السجل 1", label: "مكان السجل 1" },
    { value: "مكان السجل 2", label: "مكان السجل 2" },
  ];

  // const options2 = [
  //   { value: "قضاء 1", label: "قضاء 1" },
  //   { value: "قضاء 2", label: "قضاء 2" },
  // ];

  // const options3 = [
  //   { value: "محافظة 1", label: "محافظة 1" },
  //   { value: "محافظة 2", label: "محافظة 2" },
  // ];

  const options4 = [
    { value: "المحلة 1", label: "المحلة 1" },
    { value: "المحلة 2", label: "المحلة 2" },
    // Add more options as needed
  ];
console.log("selectedKada2:", userData["selectedKada2"]);


  // Function to get mouhafazat options based on selected kada2
  const getMouhafazatOptions = (selectedKada2) => {
    console.log("mouhafazatOptions:", mouhafazatOptions[0].kada2);

    const selectedOptions = mouhafazatOptions.find(
      (option) => option.kada2 === selectedKada2
    );
    console.log("selectedOptions", selectedOptions);
    return selectedOptions ? selectedOptions.mouhafazat : [];
  };

  console.log(
    "mouhafazatOptions:",
    getMouhafazatOptions(userData["selectedKada2"])
  );



  // Modify selectedOption to accept options as a parameter
  const selectedOption = (fieldName, options) => {
    const option = options.find(
      (option) => option.value === userData[fieldName]
    );
    // console.log(`Selected option for ${fieldName}:`, option);
    // console.log("fieldName:", fieldName);
    // console.log("userData:", userData);
    return option;
  };

  return (
    <div className="flex flex-col">
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          رقم السجل
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["رقم السجل"] || ""}
            name="رقم السجل"
            placeholder="رقم السجل"
            type="text"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none rtl-input"
          />
        </div>
        {renderValidationMessage("رقم السجل", "This field is required")}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          مكان السجل
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={options1}
            value={selectedOption("مكان السجل", options1)}
            onChange={(selectedOption) =>
              handleChange(null, selectedOption, "مكان السجل")
            }
            isSearchable={false}
            placeholder="اختر مكان السجل"
            className="w-full appearance-none outline-none text-gray-800"
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                boxShadow: "none",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "lightgray" : "white",
              }),
            }}
          />
        </div>
        {renderValidationMessage("مكان السجل", "This field is required")}
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          منطقة السكن أو العمل
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["منطقة السكن أو العمل"] || ""}
            name="منطقة السكن أو العمل"
            placeholder="منطقة السكن أو العمل"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {renderValidationMessage(
          "منطقة السكن أو العمل",
          "This field is required"
        )}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          القضاء
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={kada2Options}
            value={selectedOption("selectedKada2", kada2Options)}
            onChange={(selectedOption) =>
              handleChange(null, selectedOption, "selectedKada2")
            }
            isSearchable={false}
            placeholder="اختر القضاء"
            className="w-full appearance-none outline-none text-gray-800"
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                boxShadow: "none",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "lightgray" : "white",
              }),
            }}
          />
        </div>
        {renderValidationMessage("القضاء", "This field is required")}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          المحافظة
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={getMouhafazatOptions(userData["selectedKada2"])}
            value={selectedOption(
              "selectedMouhafaza",
              getMouhafazatOptions(userData["selectedKada2"])
            )}
            onChange={(selectedOption) =>
              handleChange(null, selectedOption, "selectedMouhafaza")
            }
            isSearchable={false}
            placeholder="اختر المحافظة"
            className="w-full appearance-none outline-none text-gray-800"
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                boxShadow: "none",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "lightgray" : "white",
              }),
            }}
          />
        </div>
        {renderValidationMessage("المحافظة", "This field is required")}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          المحلة
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={options4}
            value={selectedOption("المحلة", options4)}
            onChange={(selectedOption) =>
              handleChange(null, selectedOption, "المحلة")
            }
            isSearchable
            placeholder="اختر المحلة"
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
        {renderValidationMessage("المحلة", "This field is required")}
      </div>
    </div>
  );
}
