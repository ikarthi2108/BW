import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../screens/RegisterWorker/RegisterWorkerStyles';

const JobRoleDropdown = ({ jobTitle }) => {
  const [openJobRole, setOpenJobRole] = useState(false);
  const [jobRole, setJobRole] = useState(null);
  const [jobRoleOptions, setJobRoleOptions] = useState([]);

  useEffect(() => {
    // Define job roles based on the selected job title
    let roles = [];
    switch (jobTitle) {
      case 'household_services':
        roles = [
            { label: "Plumber", value: "Plumber" },
            { label: "Electrician", value: "Electrician" },
            { label: "Carpenter", value: "Carpenter" },
            { label: "AC Service", value: "AC Service" },
            { label: "Washing Machine Service", value: "Washing Machine Service" },
            { label: "TV Service", value: "TV Service" },
            { label: "Painters", value: "Painters" },
            { label: "Garden Maintainer", value: "Garden Maintainer" },
        ];
        break;
      case 'mechanics_vehicle_services':
        roles = [
            { label: "Auto Mechanic", value: "Auto Mechanic" },
            { label: "Two-Wheeler Mechanic", value: "Two-Wheeler Mechanic" },
            { label: "Car Mechanic", value: "Car Mechanic" },
            { label: "Lorry/Bus Mechanic", value: "Lorry/Bus Mechanic" },
           
        ];
        break;
//         Auto Mechanic
// Two-Wheeler Mechanic
// Car Mechanic
// Lorry/Bus Mechanic

        case 'construction_skilled_labor':
            roles = [
                { label: "Masons", value: "Masons" },
                { label: "Mason Helpers", value: "Mason Helpers" },
                { label: "Welders", value: "Welders" },
                { label: "Tiles Workers", value: "Tiles Workers" },
                { label: "Lathe Turners", value: "Lathe Turners" },
                { label: "CNC/VMC Operators", value: "CNC/VMC Operators" },
            ];
            break;
//             Masons
// Mason Helpers
// Welders
// Tiles Workers
// Lathe Turners
// CNC/VMC Operators

// Power Loom Weavers
// Auto Loom Weavers
// Spinning OE Workers
// Garment Workers
// Tailors

      case 'textile_weaving_industry':
          roles = [
            { label: "Power Loom Weavers", value: "Power Loom Weavers" },
            { label: " Auto Loom Weavers", value: " Auto Loom Weavers" },
            { label: "Spinning OE Workers", value: "Spinning OE Workers" },
            { label: "Garment Workers", value: "Garment Workers" },
            { label: "Tailors", value: "Tailors" },
          ];
          break;

//           Tea Master Suppliers
// Hotel Master Suppliers
          case 'hotel_catering_services':
              roles = [
                { label: "Tea Master Suppliers", value: "Tea Master Suppliers" },
                { label: "Hotel Master Suppliers", value: "Hotel Master Suppliers" },
              ];
              break;

//               Sales Girls/Women
// Sales Men/Boys

              case 'sales_retail':
                  roles = [
                    { label: "Sales Girls/Women", value: "Sales Girls/Women" },
            { label: "Sales Men/Boys", value: "Sales Men/Boys" },
                  ];
        break;

        
        case 'medical_hospital_services':
            roles = [
                { label: "Lab Technicians", value: "Lab Technicians" },
                { label: "Hospital Cleaners", value: "Hospital Cleaners" },
            ];
            break;

//             Security Guards
// Load Men
            case 'security_maintenance':
                roles = [
                    { label: "Security Guards", value: "Security Guards" },
                    { label: "Load Men", value: "Load Men" },
                    
                ];
                break;


                case 'logistics_delivery':
                    roles = [
                        { label: "Drivers", value: "Drivers" },
                        { label: "Delivery Boys (for all categories)", value: "Delivery Boys (for all categories)" },
                    
                    ];
                    break;

//                     Men's Beauticians
// Women's Beauticians
// Barbers

                    case 'beauty_grooming':
                        roles = [
                            { label: "Men's Beauticians", value: "Men's Beauticians" },
                            { label: "Women's Beauticians", value: "Women's Beauticians" },
                            { label: "Barbers", value: "Barbers" },
                           
           ];
           break;
//            Teachers (All subjects & levels)
// Sports Instructors

           case'teaching_education':
               roles = [
                { label: " Teachers (All subjects & levels)", value: " Teachers (All subjects & levels)" },
                { label: "Sports Instructors", value: "Sports Instructors" },
               
               ];
               break;


               case 'banking_office_jobs':
                   roles = [
                    { label: "Bank Staff", value: "Bank Staff" },
                   ];
                   break;     

//                    Masons
// Mason Helpers
// Welders
// Painters
// Load Men
// Garment Workers
// Tailors
// Hotel Workers (Tea Masters, Cooks, Suppliers)
// Security Guards
// Delivery Workers
// Construction Workers
                   case 'north_indian_workers':
                       roles = [
                        { label: "Masons", value: "Masons" },
            { label: "Mason Helpers", value: "Mason Helpers" },
            { label: "Welders", value: "Welders" },
            { label: "Painters", value: "Painters" },
            { label: "Load Men", value: "Load Men" },
            { label: "Garment Workers", value: "Garment Workers" },
            { label: "Tailors", value: "Tailors" },
            { label: "Hotel Workers (Tea Masters, Cooks, Suppliers)", value: "Hotel Workers (Tea Masters, Cooks, Suppliers)" },
            { label: "Tailors", value: "Tailors" },
            { label: "Hotel Workers (Tea Masters, Cooks, Suppliers)", value: "Hotel Workers (Tea Masters, Cooks, Suppliers)" },
            { label: "Security Guards", value: "Security Guards" },
            { label: "Delivery Workers", value: "Delivery Workers" },
            { label: "Construction Workers", value: "Construction Workers" },
        ];
                       break;    
                       
                    //    Village Field Workers
                    //    Farm Laborers
                       
                       case 'village_agricultural_workers':
                           roles = [
                            { label: "Village Field Workers", value: "Village Field Workers" },
                            { label: "Farm Laborers", value: "Farm Laborers" },
                            ];
                           break;        
      // Add more job titles and their roles here
      default:
        roles = [];
    }
    setJobRoleOptions(roles);
    setJobRole(null); // Reset job role when job title changes
  }, [jobTitle]);

  return (
    <View style={{ zIndex: 900 }}>
      <DropDownPicker
        open={openJobRole}
        value={jobRole}
        items={jobRoleOptions}
        setOpen={setOpenJobRole}
        setValue={setJobRole}
        placeholder="Select Job Role"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
    </View>
  );
};

export default JobRoleDropdown;
