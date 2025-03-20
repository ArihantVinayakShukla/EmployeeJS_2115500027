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

//UC4
const WORKING_DAYS_PER_MONTH = 20;

const calculateMonthlyWage = () => {
    let totalWage = 0;
    for (let day = 1; day <= WORKING_DAYS_PER_MONTH; day++) {
        totalWage += calculatesDailyWage();
    }
    return totalWage;
};

//UC5
const MAX_WORKING_DAYS = 20;  
const MAX_WORKING_HOURS = 160;

const calculateConditionalWage = () => {
    let totalWage = 0;
    let totalHours = 0;
    let totalDays = 0;

    while (totalDays < MAX_WORKING_DAYS && totalHours < MAX_WORKING_HOURS) {
        let empType = Math.floor(Math.random() * 3); 
        let workHours = getWorkHours(empType);

        
        if (totalHours + workHours > MAX_WORKING_HOURS) {
            workHours = MAX_WORKING_HOURS - totalHours; 
        }

        totalHours += workHours;
        totalWage += workHours * WAGE_PER_HOUR;
        totalDays++;
    }

    return {
        totalWage: totalWage,
        totalDays: totalDays,
        totalHours: totalHours
    };
};

const wageDetails = calculateConditionalWage();

//UC6
const calculateWageWithDailyRecords = () => {
    let totalWage = 0;
    let totalHours = 0;
    let totalDays = 0;
    let dailyWageArray = [];

    while (totalDays < MAX_WORKING_DAYS && totalHours < MAX_WORKING_HOURS) {
        let empType = Math.floor(Math.random() * 3); 
        let workHours = getWorkHours(empType);

        if (totalHours + workHours > MAX_WORKING_HOURS) {
            workHours = MAX_WORKING_HOURS - totalHours; 
        }

        let dailyWage = workHours * WAGE_PER_HOUR;
        dailyWageArray.push({ day: totalDays + 1, workHours: workHours, dailyWage: dailyWage });

        totalHours += workHours;
        totalWage += dailyWage;
        totalDays++;
    }

    return {
        totalWage: totalWage,
        totalDays: totalDays,
        totalHours: totalHours,
        dailyWageArray: dailyWageArray
    };
};
const wageDetailsDaily = calculateWageWithDailyRecords();

//Method calls
console.log(checkEmployeeAttendance()); // UC1 : checks if Employee is present or absent
console.log("Employee Daily Wage: $" + calculateDailyWage());// UC2 : calculate daily employee wage
console.log("Employee Daily Wage: $" + calculatesDailyWage());// UC3 : refactored function to get work hours
console.log("Employee Monthly Wage (20 Days): $" + calculateMonthlyWage());// UC4: calculate monthly wage for 20 days
console.log(`Total Days Worked: ${wageDetails.totalDays}, Total Hours Worked: ${wageDetails.totalHours}`);// UC5: Calculate Wages till Max Days (20) or Max Hours (160) is Reached
console.log("Daily Wage Records:", wageDetailsDaily.dailyWageArray);// UC6: Store Daily Wages in an Array