console.log("Welcome to Employee Wage App!");

//UC1
const IS_PRESENT = 1; 

const checkEmployeeAttendance = () => {
    let empCheck = Math.floor(Math.random() * 2);
    return empCheck === IS_PRESENT ? "Employee is Present" : "Employee is Absent";
}


//UC2
const WAGE_PER_HOUR = 20;
const FULL_TIME_HOURS = 8;
const PART_TIME_HOURS = 4;
const EMPLOYEE_TYPE = {
    NONE: 0,
    PART_TIME: 1,
    FULL_TIME: 2
};

const getWorkHours = () => {
    let empType = Math.floor(Math.random() * 3); 

    switch (empType) {
        case EMPLOYEE_TYPE.FULL_TIME:
            return FULL_TIME_HOURS;
        case EMPLOYEE_TYPE.PART_TIME:
            return PART_TIME_HOURS;
        default:
            return 0;
    }
};

const calculateDailyWage = () => getWorkHours() * WAGE_PER_HOUR;

//UC3
const getWorkingHours = () => {
    let empType = Math.floor(Math.random() * 3); 

    switch (empType) {
        case EMPLOYEE_TYPE.FULL_TIME:
            return FULL_TIME_HOURS;
        case EMPLOYEE_TYPE.PART_TIME:
            return PART_TIME_HOURS;
        default:
            return 0;
    }
};

const calculatesDailyWage = () => getWorkingHours() * WAGE_PER_HOUR;

//Method calls
console.log(checkEmployeeAttendance()); // UC1 : checks if Employee is present or absent
console.log("Employee Daily Wage: $" + calculateDailyWage());// UC2 : calculate daily employee wage
console.log("Employee Daily Wage: $" + calculatesDailyWage());// UC2 : refactored function to get work hours