import { useStepperContext } from "../../contexts/StepperContext";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import ar from 'date-fns/locale/ar';
import validator from 'validator' 

export default function Account({ setFormValid1, nextButtonClicked1 }) {
  const { userData, setUserData, childData, setChildData } =
    useStepperContext();
  const currentYear = new Date().getFullYear();
  const [numberInputError, setNumberInputError] = useState("");

  // const validatePhoneNumber = (number) => {
  //   const isValidPhoneNumber = validator.isMobilePhone(number)
  //   return (isValidPhoneNumber)
  //  }
  
    const socialStatusOptions = [
      { value: 'أعزب', label: 'أعزب/عزباء' },
      { value: 'متزوج', label: 'متزوج/متزوجة' },
      { value: 'مطلّق', label: 'مطلّق/مطلّقة' },
      { value: 'ارمل', label: 'ارمل/ ارملة' },
      // Add more social status options as needed
    ];

    const convertToEnglishNumerals = (arabicNumerals) => {
      const arabicToEnglishMap = {
        '٠': '0',
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
      };
    
      return arabicNumerals.split('').map(char => arabicToEnglishMap[char] || char).join('');
    };
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      let updatedValue;

      if (name === "child number") {

    if (/^[0-9\u0660-\u0669]*$/.test(value)) {
      // Convert Arabic numerals to English numerals
          const englishNumerals = convertToEnglishNumerals(value);
          updatedValue = Math.min(parseInt(englishNumerals, 10) || 0, 20);
         

          updatedValue = Math.max(updatedValue, 0);

        }else{
          updatedValue = "";
        }
        
      } else if (name === "phone") {
        //console.log("Phone Number Value:", value); // Add this line to log the phone number
        // Check if the entered value is a number
        if (/^[0-9\u0660-\u0669]*$/.test(value)) {
          //updatedValue = convertToEnglishNumerals(value);
          updatedValue = value;

          setNumberInputError("");
        } else {
          updatedValue = userData[name];
          setNumberInputError("يرجى إدخال رقم هاتف صحيح.");
        }
      } else {
        updatedValue = value;
      }
    
      setUserData({ ...userData, [name]: updatedValue });
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
    let isUserDataValid =
      userData["اسمك"] &&
      userData["العائلة"] &&
      userData["اسم الأب"] &&
      userData["اسم الأم"] &&
      userData["الجنس"] &&
      userData["الحالة الاجتماعية"] &&
      userData["phone"] &&
      userData["تاريخ الميلاد"];

      if (userData["الحالة الاجتماعية"] === "متزوج") {
        isUserDataValid =
          isUserDataValid &&
          userData["spouse name"]; 
      }
    

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
    //console.log("childData:", childData);
    //console.log("index:", index);

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
    for (let i = 0; i < userData["child number"]; i++) {
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

          <div className="w-full mx-2 flex-1">
  <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
    الحالة الاجتماعية
  </div>
  <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
    <Select
      options={socialStatusOptions}
      isSearchable = {false}
      onChange={(selectedOption) =>
        handleChildInputChange(
          { target: { name: `child-${i}-الحالة الاجتماعية`, value: selectedOption.value } },
          i,
          "الحالة الاجتماعية"
        )
      }
      value={socialStatusOptions.find(
        (option) => option.value === childData[i]?.["الحالة الاجتماعية"]
      )}
      placeholder="الحالة الاجتماعية"
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
  {renderValidationMessage("الحالة الاجتماعية", "This field is required", i)}
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
          الاسم
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["اسمك"] || ""}
            name="اسمك"
            placeholder="الاسم"
            required
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none "
            type="text"
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
      رقم الهاتف 
    </div>
    <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
      <input
        onChange={handleChange}
        value={userData["phone"] || ""}
        name="phone"
        placeholder="رقم الهاتف"
        type="text"
        className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
        pattern="[0-9]*" 
      />
    </div>
    {renderValidationMessage("phone", "This field is required")}
    {numberInputError && (
          <span className="text-red-500">{numberInputError}</span>
        )}
  </div>

      <div className="mx-2 w-full flex-1">
  <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
    تاريخ الميلاد
  </div>
  <div className="my-2 flex items-center rounded border border-gray-200 bg-white p-1 relative">
    <div className="flex items-center">
      <FontAwesomeIcon icon={faCalendar} className="text-gray-500 mr-2" />
      <DatePicker
        selected={userData["تاريخ الميلاد"]}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        className="w-full appearance-none p-1 pl-8 text-gray-800 outline-none"
        style={{ paddingRight: "30px"}}
        locale={ar} 
        showYearDropdown
        scrollableYearDropdown
       yearDropdownItemNumber={80} // Adjust the number of years to display
       maxDate={new Date()} // Set maximum date to the last day of the current year

      />
    </div>
  </div>
  {renderValidationMessage("تاريخ الميلاد", "This field is required")}
</div>

<div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          الحالة الاجتماعية
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={socialStatusOptions}
            isSearchable = {false}
            onChange={(selectedOption) =>
              setUserData({ ...userData, ["الحالة الاجتماعية"]: selectedOption.value })
            }
            value={socialStatusOptions.find(
              (option) => option.value === userData["الحالة الاجتماعية"]
            )}
            placeholder="الحالة الاجتماعية"
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
        {renderValidationMessage("الحالة الاجتماعية", "This field is required")}
      </div>


        <div>
        {userData["الحالة الاجتماعية"] === "متزوج" && (
        <div className="mx-2 w-full flex-1">
  <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
    اسم الشريك
  </div>
  <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
    <input
      onChange={handleChange}
      value={userData["spouse name"] || ""}
      name="spouse name"
      placeholder="اسم الشريك"
      type="text"
      className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
    />
  </div>
  {renderValidationMessage("spouse name", "This field is required")}
</div>
        )}

{(userData["الحالة الاجتماعية"] === "مطلّق" || userData["الحالة الاجتماعية"] === "متزوج" || userData["الحالة الاجتماعية"] === "ارمل") && (

<div className="mx-2 w-full flex-1">
  <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
    عدد الأولاد
  </div>
  <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
    <input
      onChange={handleChange}
      value={userData["child number"] === 0 ? "" : userData["child number"]}
      name="child number"
      placeholder="0"
      type="text"
      className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
      required
      pattern="[0-9]*"  // Allow both English and Arabic numerals
      maxLength={2}  // Set a maximum length if needed
      //lang="ar"  // Set the language to Arabic
    />
  </div>
</div>
)}
      </div>

      {(userData["الحالة الاجتماعية"] === "مطلّق" || userData["الحالة الاجتماعية"] === "متزوج" || userData["الحالة الاجتماعية"] === "ارمل") && (
      <div>
      {renderChildInputs()}
      </div>
      )}

    </div>
  );
}
