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



// UC7: Perform Array Operations

// UC7A: Calc total Wage using Array forEach or reduce method
const totalWageUsingReduce = wageDetailsDaily.dailyWageArray.reduce((total, day) => total + day.dailyWage, 0);
console.log("Total Employee Wage using reduce(): $" + totalWageUsingReduce);

// UC7B: Show the Day along with Daily Wage using Array map helper function
const dailyWagesOnly = wageDetailsDaily.dailyWageArray.map(day => day.dailyWage);
console.log("Daily Wages Array:", dailyWagesOnly);

// UC7C: Show Days when Full time wage of 160 were earned using filter function
const fullTimeWageDays = wageDetailsDaily.dailyWageArray.filter(day => day.workHours === 8);
console.log("Days with Full-Time Wages:", fullTimeWageDays);

// UC7D: Find the first occurrence when Full Time Wage was earned using find function
const firstPartTimeDay = wageDetailsDaily.dailyWageArray.find(day => day.workHours === 4);
console.log("First Day with 4 Hours Work:", firstPartTimeDay);

// UC7E: Check if Every Element of Full Time Wage is truly holding Full time wage
const allDaysWorked = wageDetailsDaily.dailyWageArray.every(day => day.dailyWage > 0);
console.log("Did Employee Work Every Day? ", allDaysWorked);

// UC7F: Check if there is any Part Time Wage
const anyAbsentDays = wageDetailsDaily.dailyWageArray.some(day => day.dailyWage === 0);
console.log("Was Employee Absent Any Day? ", anyAbsentDays);

// UC7G: Find the number of days the Employee Worked
const fullTimeDaysCount = wageDetailsDaily.dailyWageArray.reduce((count, day) => day.workHours === 8 ? count + 1 : count, 0);
console.log("Total Full-Time Workdays:", fullTimeDaysCount);



//UC8
const dailyWageMap = new Map();

wageDetailsDaily.dailyWageArray.forEach(day => {
    dailyWageMap.set(day.day, { dailyWage: day.dailyWage, totalWageSoFar: 0 });
});

let cumulativeWage = 0;
dailyWageMap.forEach((value, key) => {
    cumulativeWage += value.dailyWage;
    dailyWageMap.set(key, { dailyWage: value.dailyWage, totalWageSoFar: cumulativeWage });
});

console.log("Day-wise Wage Map:");
console.log([...dailyWageMap.entries()]);

//Method calls
console.log(checkEmployeeAttendance()); // UC1 : checks if Employee is present or absent
console.log("Employee Daily Wage: $" + calculateDailyWage());// UC2 : calculate daily employee wage
console.log("Employee Daily Wage: $" + calculatesDailyWage());// UC3 : refactored function to get work hours
console.log("Employee Monthly Wage (20 Days): $" + calculateMonthlyWage());// UC4: calculate monthly wage for 20 days
console.log(`Total Days Worked: ${wageDetails.totalDays}, Total Hours Worked: ${wageDetails.totalHours}`);// UC5: Calculate Wages till Max Days (20) or Max Hours (160) is Reached
console.log("Daily Wage Records:", wageDetailsDaily.dailyWageArray);// UC6: Store Daily Wages in an Array
console.log("Total Wage Computed Using Map: $" + cumulativeWage);// UC8: Store Day-wise Wage in a Map and Compute Total Wage Using Map