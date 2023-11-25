import { useStepperContext } from "../../contexts/StepperContext";
import Select from "react-select";
import { useEffect, useState } from "react";

export default function Detail({ setFormValid2, nextButtonClicked2 }) {
  const { userData, setUserData } = useStepperContext();
  const [kadaOptions, setKadaOptions] = useState([]);
  const [mouhafazatOptions, setMouhafazatOptions] = useState([]);
  const [makanSejelOptions, setMakanSejelOptions] = useState([]);
  const [mahalaOptions, setMahalaOptions] = useState([]);
  const [numberInputError, setNumberInputError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pssapi.net:444/get_kada');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        //console.log(data.kada);
        setKadaOptions(data.kada);
      } catch (error) {
        //console.error('Error fetching kada data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchMouhafazat = async () => {
      try {
        const response = await fetch('https://pssapi.net:444/get_mohafazat');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        //console.log(data.Mohafazat);
        setMouhafazatOptions(data.Mohafazat);
      } catch (error) {
        //console.error('Error fetching Mohafazat data:', error);
      }
    };

    fetchMouhafazat();
  }, []);


  // useEffect(() => {
  //   const fetchSejelFLocation = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/get_sejelLocations/');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       //console.log(data.Sejel);
  //       setMakanSejelOptions(data.Sejel);
  //     } catch (error) {
  //       //console.error('Error fetching Sejel data:', error);
  //     }
  //   };

  //   fetchSejelLocation();
  // }, []);

  useEffect(() => {
    const fetchMahala = async () => {
      try {
        const response = await fetch('https://pssapi.net:444/get_mahalaLocations/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        //console.log(data.Mahala);
        setMahalaOptions(data.Mahala);
      } catch (error) {
        //console.error('Error fetching Mahala data:', error);
      }
    };

    fetchMahala();
  }, []);


  const validateForm = () => {
    const isUserDataValid =
      userData["رقم السجل"] &&
      userData["sejel"] &&
      userData["esem chare3"] &&
      userData["esem mabna"] &&
      userData["tabek"] &&
      userData["koreb"] &&
      userData["selectedMouhafaza"] &&
      userData["selectedKada2"] &&
      userData["selectedMahala"];

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
          (userData[fieldName] === null || userData[fieldName] === undefined) && (
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

      // Apply specific logic based on the field name
      let updatedValue;
      if (name === "رقم السجل" || name === "tabek") {
        // Check if the entered value is a number
        if (/^[0-9\u0660-\u0669]*$/.test(value)) {
          updatedValue = value;
          // Clear the number input error message
          setNumberInputError("");
        } else {
          // Set an error message for non-numeric input
          updatedValue = userData[name];
          setNumberInputError("يرجى إدخال قيمة رقمية.");
        }
      } else {
        updatedValue = value;
      }

      setUserData({
        ...userData,
        [name]: updatedValue,
      });
    } else if (selectedOption) {
      // Handling Select components
      setUserData({
        ...userData,
        [fieldName]: selectedOption,
      });
    }
  };


  const handleKadaChange = selectedOption => {
    // Replace setSelectedKada with setUserData
    setUserData({
      ...userData,
      selectedKada2: selectedOption,
      selectedMouhafaza: null,
      selectedMahala: null,
    });

  };

  const handleMouhafazaChange = selectedOption => {
    // Replace setSelectedKada with setUserData
    setUserData({
      ...userData,
      selectedMouhafaza: selectedOption,
      selectedMahala: null,
    });
  };
 

//console.log("selectedKada2:", userData["selectedKada2"]);

//console.log("selectedMouhafaza id:", userData.selectedMouhafaza?.id);

    
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
            pattern="[0-9]*" 

          />
        </div>
        {renderValidationMessage("رقم السجل", "This field is required")}
        {numberInputError && (
          <span className="text-red-500">{numberInputError}</span>
        )}
      </div>
      {/* <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          مكان السجل
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={makanSejelOptions.map(option => ({
              value: option.name,
              label: option.name,
            }))}
            value={userData["selectedMakanSejel"]}
            onChange={(selectedOption) =>
              handleChange(null, selectedOption, "selectedMakanSejel")
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
        {renderValidationMessage("selectedMakanSejel", "This field is required")}
      </div> */}

   <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
         مكان السجل
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["sejel"] || ""}
            name="sejel"
            placeholder="مكان السجل"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {renderValidationMessage(
          "sejel",
          "This field is required"
        )}
      </div>



      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
           اسم الشارع  
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["esem chare3"] || ""}
            name="esem chare3"
            placeholder="اسم الشارع"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {renderValidationMessage(
          "esem chare3",
          "This field is required"
        )}
      </div>


      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
           اسم المبنى  
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["esem mabna"] || ""}
            name="esem mabna"
            placeholder="اسم المبنى"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {renderValidationMessage(
          "esem mabna",
          "This field is required"
        )}
      </div>


      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
           الطابق 
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["tabek"] || ""}
            name="tabek"
            placeholder="الطابق"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            pattern="[0-9]*" 
            maxLength={2} 
          />
        </div>
        {numberInputError && (
          <span className="text-red-500">{numberInputError}</span>
        )}
        {renderValidationMessage(
          "tabek",
          "This field is required"
        )}
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
             قرب من
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["koreb"] || ""}
            name="koreb"
            placeholder="قرب من"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {renderValidationMessage(
          "koreb",
          "This field is required"
        )}
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        
        المحافظة
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={kadaOptions.map(option => ({
              value: option.name,
              label: option.name,
              id: option.id
            }))}
            value={userData.selectedKada2}
            onChange={(selectedOption) =>
              handleKadaChange(selectedOption, "selectedKada2")
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
        {renderValidationMessage("selectedKada2", "This field is required")}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        القضاء
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={mouhafazatOptions
              .filter(mouhafazat => mouhafazat.kadaa_id === userData.selectedKada2?.id) // Filter options based on selected kada
              .map(option => ({
                id: option.id,
                value: option.name,
                label: option.name,
              }))
            }
            value={userData.selectedMouhafaza}
            onChange={(selectedOption) =>
              handleMouhafazaChange(selectedOption)
            }
            isSearchable={false}
            placeholder="اختر القضاء"

            className="w-full appearance-none outline-none text-gray-800"
            styles={{
              placeholder: (provided) => ({
                ...provided,
                opacity: 1, // Set opacity to 1 to ensure full visibility
              }),
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
        {renderValidationMessage("selectedMouhafaza", "This field is required")}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          المحلة
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
             options={mahalaOptions.filter(mahala => mahala.province_id === userData.selectedMouhafaza?.id)
              .map(option => ({
              value: option.name,
              label: option.name,
            }))}
            value={userData.selectedMahala}

             onChange={(selectedOption) =>
               handleChange(null, selectedOption, "selectedMahala")
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
        {renderValidationMessage("selectedMahala", "This field is required")}
      </div>
    </div>
  );
}
