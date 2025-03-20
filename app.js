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
const dailyHourMap = new Map();

wageDetailsDaily.dailyWageArray.forEach(day => {
    dailyWageMap.set(day.day, { dailyWage: day.dailyWage, totalWageSoFar: 0 });
    dailyHourMap.set(day.day, day.workHours); 
});

let cumulativeWage = 0;
dailyWageMap.forEach((value, key) => {
    cumulativeWage += value.dailyWage;
    dailyWageMap.set(key, { dailyWage: value.dailyWage, totalWageSoFar: cumulativeWage });
});

console.log("Day-wise Wage Map:", [...dailyWageMap.entries()]);
console.log("Day-wise Hour Map:", [...dailyHourMap.entries()]);




//UC9

// UC9a: Calculate total wage and total hours worked using arrow functions
const totalWageFromMap = [...dailyWageMap.values()].reduce((sum, day) => sum + day.dailyWage, 0);
const totalHoursFromMap = [...dailyHourMap.values()].reduce((sum, hours) => sum + hours, 0);

console.log(`Total Wage (Using Map): $${totalWageFromMap}, Total Hours Worked: ${totalHoursFromMap}`);

// UC9b: Categorize Full Working Days, Part-time Days, and No Working Days
const fullWorkingDays = [...dailyHourMap.entries()]
    .filter(([day, hours]) => hours === FULL_TIME_HOURS)
    .map(([day, hours]) => day);

const partWorkingDays = [...dailyHourMap.entries()]
    .filter(([day, hours]) => hours === PART_TIME_HOURS)
    .map(([day, hours]) => day);

const noWorkingDays = [...dailyHourMap.entries()]
    .filter(([day, hours]) => hours === 0)
    .map(([day, hours]) => day);



//UC10
const employeeDailyRecords = [];

const calculateWageWithObjects = () => {
    let totalWage = 0;
    let totalHours = 0;
    let totalDays = 0;

    while (totalDays < MAX_WORKING_DAYS && totalHours < MAX_WORKING_HOURS) {
        let empType = Math.floor(Math.random() * 3);
        let workHours = getWorkHours(empType);

        if (totalHours + workHours > MAX_WORKING_HOURS) {
            workHours = MAX_WORKING_HOURS - totalHours;
        }

        let dailyWage = workHours * WAGE_PER_HOUR;

        let dailyRecord = {
            day: totalDays + 1,
            workHours: workHours,
            dailyWage: dailyWage
        };

        employeeDailyRecords.push(dailyRecord);

        totalHours += workHours;
        totalWage += dailyWage;
        totalDays++;
    }

    return {
        totalWage: totalWage,
        totalDays: totalDays,
        totalHours: totalHours,
        dailyRecords: employeeDailyRecords
    };
};

const wageDetailsWithObjects = calculateWageWithObjects();



//UC11

// UC11a: Calc total Wage and total hours worked
const totalWageArrow = employeeDailyRecords.reduce((total, day) => total + day.dailyWage, 0);
const totalHoursArrow = employeeDailyRecords.reduce((total, day) => total + day.workHours, 0);

console.log(`Total Wage: $${totalWageArrow}, Total Hours Worked: ${totalHoursArrow}`);

// UC11b: Show the full workings days using foreach
console.log("Full Working Days:");
employeeDailyRecords.forEach(day => {
    if (day.workHours === FULL_TIME_HOURS) console.log(`Day ${day.day}`);
});

// UC11c: Show Part working days using Map by reducing to String Array
const partWorkingDaysStringArray = employeeDailyRecords
    .filter(day => day.workHours === PART_TIME_HOURS)
    .map(day => `Day ${day.day}`);

console.log("Part-Time Working Days:", partWorkingDaysStringArray);

// UC11d: No working days only using Map function
const noWorkingDaysArray = employeeDailyRecords
    .filter(day => day.workHours === 0)
    .map(day => `Day ${day.day}`);

console.log("No Working Days:", noWorkingDaysArray);


//UC11
class EmployeePayroll {
    constructor(id, name, salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    getDetails = () => `ID: ${this.id}, Name: ${this.name}, Salary: $${this.salary}`;
}

const employeePayrollData = [
    new EmployeePayroll(1, "Arihant Vinayak Shukla", 5000),
    new EmployeePayroll(2, "Dhruv Kushwah", 7000),
    new EmployeePayroll(3, "Yuvraj Srivastava", 6000),
    new EmployeePayroll(4, "Shivansh Pathak", 8000),
    new EmployeePayroll(4, "Aman Bajpai", 10000),
];



//UC12

class EmployeesPayroll {
    constructor(id, name, salary, gender, startDate) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.gender = gender;
        this.startDate = new Date(startDate); // Convert to Date object
    }

    // Method to get Employee Details
    getDetails = () => `ID: ${this.id}, Name: ${this.name}, Gender: ${this.gender}, Salary: $${this.salary}, Start Date: ${this.startDate.toDateString()}`;
}

const employeesPayrollData = [
    new EmployeesPayroll(1, "John Doe", 5000, "M", "2023-01-15"),
    new EmployeesPayroll(2, "Jane Smith", 7000, "F", "2022-03-20"),
    new EmployeesPayroll(3, "Alice Johnson", 6000, "F", "2021-06-25"),
    new EmployeesPayroll(4, "Bob Brown", 8000, "M", "2020-12-10"),
];



//UC13
class EmployeePayrolls {
    constructor(id, name, salary, gender, startDate) {
        try {
            this.id = id;
            this.name = this.validateName(name);
            this.salary = salary;
            this.gender = gender;
            this.startDate = new Date(startDate);
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }

    
    validateName = (name) => {
        const namePattern = /^[A-Z][a-zA-Z]{2,}$/;
        if (!namePattern.test(name)) {
            throw new Error("Invalid Name: Name must start with a capital letter and be at least 3 characters long.");
        }
        return name;
    };

    getDetails = () => `ID: ${this.id}, Name: ${this.name}, Gender: ${this.gender}, Salary: $${this.salary}, Start Date: ${this.startDate.toDateString()}`;
}

const employees = [
    new EmployeePayrolls(1, "John", 5000, "M", "2023-01-15"),
    new EmployeePayrolls(2, "jane", 7000, "F", "2022-03-20"),
    new EmployeePayrolls(3, "Al", 6000, "F", "2021-06-25"),  
    new EmployeePayrolls(4, "Alice", 8000, "F", "2020-12-10") 
];


//Method calls
console.log(checkEmployeeAttendance()); // UC1 : checks if Employee is present or absent

console.log("Employee Daily Wage: $" + calculateDailyWage());// UC2 : calculate daily employee wage

console.log("Employee Daily Wage: $" + calculatesDailyWage());// UC3 : refactored function to get work hours

console.log("Employee Monthly Wage (20 Days): $" + calculateMonthlyWage());// UC4: calculate monthly wage for 20 days

console.log(`Total Days Worked: ${wageDetails.totalDays}, Total Hours Worked: ${wageDetails.totalHours}`);// UC5: Calculate Wages till Max Days (20) or Max Hours (160) is Reached

console.log("Daily Wage Records:", wageDetailsDaily.dailyWageArray);// UC6: Store Daily Wages in an Array

console.log("Total Wage Computed Using Map: $" + cumulativeWage);// UC8: Store Day-wise Wage in a Map and Compute Total Wage Using Map


console.log("Full Working Days:", fullWorkingDays);// UC9: Operations using Arrow Functions
console.log("Part-Time Working Days:", partWorkingDays);// UC9: Operations using Arrow Functions
console.log("No Working Days:", noWorkingDays);// UC9: Operations using Arrow Functions

console.log("Employee Daily Records:", wageDetailsWithObjects.dailyRecords);// UC10: Store Day, Hours Worked, and Wage Earned in a single object


console.log("Employee Payroll Data:");// UC11: Employee payroll data creation
employeePayrollData.forEach(employee => console.log(employee.getDetails()));// UC11: Employee payroll data creation


console.log("Extended Employee Payroll Data:");// UC12: Extend Employee Payroll Data
employeesPayrollData.forEach(employee => console.log(employee.getDetails()));// UC12: Extend Employee Payroll Data


console.log("\nValid Employees:");// UC13: Validate Employee Name Using Regex and Try-Catch
employees.forEach(employee => {// UC13: Validate Employee Name Using Regex and Try-Catch
    if (employee.name) console.log(employee.getDetails());// UC13: Validate Employee Name Using Regex and Try-Catch
});// UC13: Validate Employee Name Using Regex and Try-Catch




