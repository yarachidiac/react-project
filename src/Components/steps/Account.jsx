import { useStepperContext } from "../../contexts/StepperContext";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";

export default function Account({ setFormValid1, nextButtonClicked1 }) {
  const { userData, setUserData, childData, setChildData } =
    useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "عدد الأولاد") {
    const numericValue = value ? parseInt(value, 10) : 0;
      setChildData(Array(numericValue).fill({})); // Reset the childData array
      setUserData({ ...userData, [name]: numericValue });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleDateChange = (date) => {
  setUserData({ ...userData, "تاريخ الميلاد": date });
};
  const handleChildInputChange = (e, index, property) => {
    const { value } = e.target;
    const updatedChildData = [...childData];
    updatedChildData[index] = { ...updatedChildData[index], [property]: value };
    setChildData(updatedChildData);
  };

  const validateForm = () => {
    const isUserDataValid =
      userData["اسمك"] &&
      userData["العائلة"] &&
      userData["اسم الأب"] &&
      userData["اسم الأم"] &&
      userData["الجنس"] &&
      userData["تاريخ الميلاد"];
    

    const isChildDataValid = childData.every(
      (child) =>
        child["اسم الولد"] && child["جنس الولد"] && child["الحالة الاجتماعية"]
      // Add more conditions for childData fields as needed
    );

    const isValid = isUserDataValid && isChildDataValid;

    // Set the form validity state
    setFormValid1(isValid);

    // Return the validation result
    return isValid;
  };

  const renderValidationMessage = (fieldName, errorMessage, index) => {
    console.log("childData:", childData);
    console.log("index:", index);

    const isChildField = index !== undefined;

    return (
      <span className="text-red-500">
        {nextButtonClicked1 &&
          ((isChildField && childData[index]?.[fieldName] === undefined) ||
            (!isChildField &&
              (userData[fieldName] === "" ||
                userData[fieldName] === undefined))) && <p>{errorMessage}</p>}
      </span>
    );
  };

  useEffect(() => {
    validateForm();
  }, [userData, childData]);

  const renderChildInputs = () => {
    const childInputs = [];
    for (let i = 0; i < userData["عدد الأولاد"]; i++) {
      childInputs.push(
        <div key={i}>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              اسم الولد
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <input
                onChange={(e) => handleChildInputChange(e, i, "اسم الولد")}
                value={childData[i]?.["اسم الولد"] || ""}
                name={`child-${i}-اسم الولد`} // Use unique names for each child input
                placeholder="اسم الولد"
                required
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
            {renderValidationMessage("اسم الولد", "This field is required", i)}
          </div>

          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              جنس الولد
            </div>
            <div className="my-2 flex">
              <div>
                <label>
                  <input
                    type="radio"
                    name={`child-${i}-جنس الولد`}
                    value="ذكر"
                    onChange={(e) => handleChildInputChange(e, i, "جنس الولد")}
                    checked={childData[i]?.["جنس الولد"] === "ذكر"}
                    className="rtl-input mx-1"
                    required
                  />
                  ذكر
                </label>
              </div>
              <div className="mx-10">
                <label>
                  <input
                    type="radio"
                    name={`child-${i}-جنس الولد`}
                    value="أنثى"
                    onChange={(e) => handleChildInputChange(e, i, "جنس الولد")}
                    checked={childData[i]?.["جنس الولد"] === "أنثى"}
                    className="rtl-input mx-1"
                    required
                  />
                  أنثى
                </label>
              </div>
            </div>
            {renderValidationMessage("جنس الولد", "This field is required", i)}
          </div>

          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              الحالة الاجتماعية
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <input
                onChange={(e) =>
                  handleChildInputChange(e, i, "الحالة الاجتماعية")
                }
                value={childData[i]?.["الحالة الاجتماعية"] || ""}
                name={`child-${i}-الحالة الاجتماعية`}
                placeholder="الحالة الاجتماعية"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                required
              />
            </div>
            {renderValidationMessage(
              "الحالة الاجتماعية",
              "This field is required",
              i
            )}
          </div>
        </div>
      );
    }
    return childInputs;
  };

  return (
    <div className="flex flex-col">
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          اسمك
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["اسمك"] || ""}
            name="اسمك"
            placeholder="اسمك"
            required
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none "
          />
        </div>
        {renderValidationMessage("اسمك", "This field is required")}
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          العائلة
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["العائلة"] || ""}
            name="العائلة"
            placeholder="العائلة"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none "
            required
          />
        </div>
        {renderValidationMessage("العائلة", "This field is required")}
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          اسم الأب
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["اسم الأب"] || ""}
            name="اسم الأب"
            placeholder="اسم الأب"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none "
            required
          />
        </div>
        {renderValidationMessage("اسم الأب", "This field is required")}
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          اسم الأم
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["اسم الأم"] || ""}
            name="اسم الأم"
            placeholder="اسم الأم"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none "
            required
          />
        </div>
        {renderValidationMessage("اسم الأم", "This field is required")}
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          الجنس
        </div>
        <div className="my-2 flex">
          <div>
            <label>
              <input
                type="radio"
                name="الجنس"
                value="ذكر"
                onChange={handleChange}
                checked={userData["الجنس"] === "ذكر"}
                className="rtl-input mx-1"
                required
              />
              ذكر
            </label>
          </div>
          <div className="mx-10">
            <label>
              <input
                type="radio"
                name="الجنس"
                value="أنثى"
                onChange={handleChange}
                checked={userData["الجنس"] === "أنثى"}
                className="rtl-input mx-1"
                required
              />
              أنثى
            </label>
          </div>
        </div>
        {renderValidationMessage("الجنس", "This field is required")}
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          تاريخ الميلاد
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1 relative">
          <DatePicker
            selected={userData["تاريخ الميلاد"]}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="w-full appearance-none p-1 pl-8 text-gray-800 outline-none"
            style={{ paddingRight: "30px" }} // Adjust the paddingRight to accommodate the icon
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FontAwesomeIcon icon={faCalendar} />
          </div>
        </div>
        {renderValidationMessage("تاريخ الميلاد", "This field is required")}
      </div>

      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          عدد الأولاد
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["عدد الأولاد"] || 0}
            name="عدد الأولاد"
            placeholder="عدد الأولاد"
            type="number"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            required
            max={10}
            min={0}
            onKeyDown={(e) => {
              // Prevent any input by the user
              e.preventDefault();
            }}
          />
        </div>
        {renderValidationMessage("عدد الأولاد", "This field is required")}
      </div>
      {renderChildInputs()}
    </div>
  );
}
