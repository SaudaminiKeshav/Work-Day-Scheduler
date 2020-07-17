// Region Variable assignment
var timeArray = [
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM"
]

// Get current date and time 
var currentDate = moment().format('dddd, MMMM Do YYYY');
var currentTime = moment().format('h:mm A');

var timeDivColor = "";

$(document).ready(function () {
    getAndDisplayDate();

    createHourlyPlanDiv();
});

function getAndDisplayDate() {
    var date = $("#currentDay");
    date.attr("class", "time-block");
    date.text(currentDate);
}

function createHourlyPlanDiv() {
    // Create time H6 to display time
    var timeTitleH6 = $("<h6>");
    timeTitleH6.attr("class", "time-title");
    timeTitleH6.text("TIME");

    // Create time H6 to display time
    var taskTitleH6 = $("<h6>");
    taskTitleH6.attr("class", "task-title");
    taskTitleH6.text("TASK");

    var clickedTime = $("<p>");
    clickedTime.attr("class", "clicked-time");

    $(".time-schedule-div").append(timeTitleH6);
    $(".time-schedule-div").append(createTimeDiv());
    $(".task-schedule-div").append(taskTitleH6);
    $(".task-schedule-div").append(clickedTime);
    $(".task-schedule-div").append(createTaskDiv());
}

function createTimeDiv() {
    // Create container div 
    var newTimeDiv = $("<div>");
    newTimeDiv.attr("class", "time-schedule-div");

    newTimeDiv.append(getTimeDiv("08:00 AM"));
    newTimeDiv.append(getTimeDiv("09:00 AM"));
    newTimeDiv.append(getTimeDiv("10:00 AM"));
    newTimeDiv.append(getTimeDiv("11:00 AM"));
    newTimeDiv.append(getTimeDiv("12:00 PM"));
    newTimeDiv.append(getTimeDiv("01:00 PM"));
    newTimeDiv.append(getTimeDiv("02:00 PM"));
    newTimeDiv.append(getTimeDiv("03:00 PM"));
    newTimeDiv.append(getTimeDiv("04:00 PM"));
    newTimeDiv.append(getTimeDiv("05:00 PM"));
    newTimeDiv.append(getTimeDiv("06:00 PM"));

    return newTimeDiv;
}

function getTimeDiv(time) {
    // Create time H6 to display time
    var timeH6 = $("<h6>");
    timeH6.attr("class", "time-schedule");
    timeH6.attr("id", `title${time}`);
    timeH6.text(time);

    timeH6.on('click', function () {
        // $(this).attr("id")
        $(".clicked-time").text("TIME: " + time);
        $(".clicked-time").attr("style",  $(this).attr("style"));
    })
    colorCodeDivAsPerTheCurrentTime(time.toString(), timeH6);
    return timeH6;
}

//Function for color coding and adding locally saved tasks into their proper areas
function colorCodeDivAsPerTheCurrentTime(divTime, taskDiv) {

    var hour = moment().format('hh');
    var meredian = moment().format('A');
    var currentHour = hour + ":00 " + meredian;

    var newCurrentHour = "" + currentHour;
    var time = "" + divTime;

    console.log(parseInt(time));
    console.log(parseInt(newCurrentHour));

    console.log(time.includes("A"));

    if (parseInt(newCurrentHour) === parseInt(time)) {
        console.log("Matches");
        taskDiv.attr('style', 'background-color:#FD6F61');
    } else if ((parseInt(time) > parseInt(newCurrentHour)) && time.includes("A")) {
        console.log("Past");
        taskDiv.attr('style', 'background-color:#6BB9D1');
    } else if ((parseInt(time) > parseInt(newCurrentHour)) && parseInt(time) == 12) {
        console.log("Past");
        taskDiv.attr('style', 'background-color:#6BB9D1');
    } else if ((parseInt(time) < parseInt(newCurrentHour)) && time.includes("P")) {
        console.log("Future");
        taskDiv.attr('style', 'background-color:#77C499');
    } else if ((parseInt(time) < parseInt(newCurrentHour)) && time.includes("A")) {
        console.log("Past");
        taskDiv.attr('style', 'background-color:#6BB9D1');
    } else if (parseInt(time) > parseInt(newCurrentHour)) {
        console.log("Future");
        taskDiv.attr('style', 'background-color:#77C499');
    }

}

function createTaskDiv() {
    // Create container div 
    var newTaskDiv = $("<div>");
    newTaskDiv.attr("class", "task");

    var hrSeperator1 = $("<hr>");
    hrSeperator1.attr("class", "hr-separator");

    var taskTitle = $("<INPUT>");
    taskTitle.attr("class", "task-title-input");
    taskTitle.attr("placeholder", "Enter Title");

    var hrSeperator2 = $("<hr>");
    hrSeperator2.attr("class", "hr-separator-grey");

    // Task description of the dialog 
    var taskDesc = $("<TEXTAREA>");
    taskDesc.attr("id", "details-desc");
    taskDesc.attr("type", "text");
    taskDesc.attr("rows", "15");
    taskDesc.attr("cols", "95");
    taskDesc.attr("placeholder", "Enter Details");

    var saveButton = $("<button>");
    saveButton.attr("class", "saveBtn");
    saveButton.text("Save");

    var deleteButton = $("<button>");
    deleteButton.attr("class", "deleteBtn");
    deleteButton.text("Delete");


    newTaskDiv.append(hrSeperator1);
    newTaskDiv.append(taskTitle);
    newTaskDiv.append(hrSeperator2);
    newTaskDiv.append(taskDesc);
    newTaskDiv.append(saveButton);
    newTaskDiv.append(deleteButton);
    return newTaskDiv;
}