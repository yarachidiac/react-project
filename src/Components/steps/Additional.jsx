import { useStepperContext } from "../../contexts/StepperContext";
import Select from "react-select";
import { useEffect, useState } from "react";

export default function Additional({ setFormValid3, nextButtonClicked3, setAllData }) {
  const { userData, setUserData, childData } = useStepperContext();
  const [nationalitiesOptions, setNationalitiesOptions] = useState([]);
  const [jobsOptions, setJobsOptions] = useState([]);
  const [helpOptions, setHelpOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); //zedet hay


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nationalitiesResponse, jobsResponse, helpTypesResponse] = await Promise.all([
          fetch('https://pssapi.net:444/get_nationalities/'),
          fetch('https://pssapi.net:444/get_jobs/'),
          fetch('https://pssapi.net:444/get_helpTypes/'),
        ]);

        const nationalitiesData = await nationalitiesResponse.json();
        const jobsData = await jobsResponse.json();
        const helpTypesData = await helpTypesResponse.json();

        setNationalitiesOptions(nationalitiesData.Nationalities);
        setJobsOptions(jobsData.Jobs);
        setHelpOptions(helpTypesData.HelpTypes);
      } catch (error) {
        //console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
  
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
      userData["selectedNationality"] && userData["selectedJob"] && userData["makanAmal"] && userData["selectedHelpType"];
    setFormValid3(isValid);

    // If the form is valid, setAllData
    if (isValid) {
      //setAllData({ userData, childData });
      setAllData({
        userData:{
        ...userData,
        childData, 
      }
    });
    }
  }, [userData, setFormValid3, setAllData, childData]);

  // const selectedOption = (fieldName, options) => {
  //   return options.find((option) => option.value === userData[fieldName]);
  // };

  const handleMakan = (e) => {
      // Handling input fields
      const { name, value } = e.target;
      setUserData({
        ...userData,
        [name]: value,
      });
    
  };



  const handleChange = (selectedOption, fieldName) => {
    setUserData((prevUserData) =>({
      ...prevUserData,
      [fieldName]: selectedOption ? selectedOption : null,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };//zedet hay

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          الجنسية
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={nationalitiesOptions.map(option => ({
              value: option.Nationality,
              label: option.Nationality,
            }))}
            value={userData.selectedNationality}
            onChange={(selectedOption) =>
              handleChange(selectedOption, "selectedNationality")
            }
            isSearchable
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
        {renderValidationMessage("selectedNationality", "This field is required")}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          الوظيفة
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={jobsOptions.map(option => ({
              value: option.name,
              label: option.name,
            }))}
            value={userData.selectedJob}
            onChange={(selectedOption) =>
              handleChange(selectedOption, "selectedJob")
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
        {renderValidationMessage("selectedJob", "This field is required")}
      </div>


      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
           مكان العمل 
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleMakan}
            value={userData["makanAmal"]}
            name="makanAmal"
            placeholder="مكان العمل"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            type="text"
          />
        </div>
        {renderValidationMessage(
          "makanAmal",
          "This field is required"
        )}
      </div>


      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          نوع المساعدة
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <Select
            options={helpOptions.map(option => ({
              value: option.name,
              label: option.name,
            }))}
            value={userData.selectedHelpType}
            onChange={(selectedOption) =>
              handleChange(selectedOption, "selectedHelpType")
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
        {renderValidationMessage("selectedHelpType", "This field is required")}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          تحميل الملف (إختياري)
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full appearance-none outline-none text-gray-800"
          />
        </div>
        {selectedFile ? (
    <span className="text-green-500">تم اختيار الملف: {selectedFile.name}</span>
  ) : (
    <span className="text-green-500">قم باختيار الملف</span>
  )}
      </div>
    </div>
  );
}
