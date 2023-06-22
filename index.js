/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let employee = 
[
    {
        firstName: "",
        familyName: "",
        title: "",
        payPerHour: 0,
        timeInEvents: [],
        timeOutEvents: [],
    }
];

let timeInEvents = 
[
    {
        type: 'TimeIn',
        hour: 0,
        date: '',
    }
];

let timeOutEvents = 
[
    {
        type: 'TimeOut',
        hour: 0,
        date: '',
    }
];

function createEmployeeRecord(employeeArray)
{
    let employeeRecord = [...employee];
    
    employeeRecord.firstName     = employeeArray[0];
    employeeRecord.familyName    = employeeArray[1];
    employeeRecord.title         = employeeArray[2];
    employeeRecord.payPerHour    = employeeArray[3];
    employeeRecord.timeInEvents  = [];
    employeeRecord.timeOutEvents = [];
    
    return employeeRecord;
}

function createEmployeeRecords(employeeArrays)
{
    let employeeRecords = [];
    for(let i = 0; i < employeeArrays.length; i++)
    {
        let e = createEmployeeRecord(employeeArrays[i]);

        employeeRecords.push(e);
    }

    return employeeRecords;
}

function createTimeInEvent(e)
{  
    let dateTimeStr = e.split(' ');

    let timeIn = [...timeInEvents];
    timeIn.type = 'TimeIn';
    timeIn.hour = (Number(dateTimeStr[1]));
    timeIn.date = dateTimeStr[0];

    this.timeInEvents.push(timeIn);

    return this;
}

function createTimeOutEvent(e)
{  
    let dateTimeStr = e.split(' ');

    let timeout = [...timeOutEvents];
    timeout.type = 'TimeOut';
    timeout.hour = (Number(dateTimeStr[1]));
    timeout.date = dateTimeStr[0];

    this.timeOutEvents.push(timeout);

    return this;
}

function hoursWorkedOnDate(e)
{
    let startTime = 0;
    let endTime = 0;

    // Get start time on date
    for(let i = 0; i < this.timeInEvents.length; i++)
    {
        if (this.timeInEvents[i].date != e)
            continue;

        startTime = this.timeInEvents[i].hour;
        break;
    }

    // Get end time on given date
    for(let i = 0; i < this.timeOutEvents.length; i++)
    {
        if (this.timeOutEvents[i].date != e)
            continue;

        endTime = this.timeOutEvents[i].hour;
        break;
    }

    return ((Math.abs(endTime -startTime))/100);
}

function wagesEarnedOnDate(e)
{   
    let hoursWorked = hoursWorkedOnDate.call(this, e);

    return (hoursWorked * this.payPerHour);
}

function findEmployeeByFirstName(collection, firstNameString)
{
    for(let i = 0; i < collection.length; i++)
    {
        if (collection[i].firstName != firstNameString)
            continue;

        return collection[i];
    }

    return null;
}

function calculatePayroll(employeeRecords)
{
    let grandTotal = 0;

    for(let i = 0; i < employeeRecords.length; i++)
    {
        for(let a = 0; a < employeeRecords[i].timeInEvents.length; a++)
        {
            grandTotal += wagesEarnedOnDate.call(employeeRecords[i], employeeRecords[i].timeInEvents[a].date);
        }
    }

    return grandTotal
}