console.log("Welcome to Employee Wage App!");

//UC1
const IS_PRESENT = 1; 

const checkEmployeeAttendance = () => {
    let empCheck = Math.floor(Math.random() * 2);
    return empCheck === IS_PRESENT ? "Employee is Present" : "Employee is Absent";
}


//Method calls
console.log(checkEmployeeAttendance()); // checks if Employee is present or absent