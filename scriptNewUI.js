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

var taskArray = [];

// Get current date and time 
var currentDate = moment().format('dddd, MMMM Do YYYY');
var currentTime = moment().format('h:mm A');

var timeDivColor = "";
let timeID = 0;

var clickedTime = $("<p>");
clickedTime.attr("class", "clicked-time");

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
    timeH6.attr("id", `${time}`);
    timeH6.text(time);

    timeH6.on('click', function () {
        // $(this).attr("id")
        $(".clicked-time").text(time);
        $(".clicked-time").attr("id", `${time}`);
        $(".clicked-time").attr("style", $(this).attr("style"));
        $(".clicked-time").trigger('contentchanged');
        $(".task").replaceWith(createTaskDiv(time));
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

    if (parseInt(newCurrentHour) === parseInt(time)) {
        taskDiv.attr('style', 'background-color:#FD6F61');
    } else if ((parseInt(time) > parseInt(newCurrentHour)) && time.includes("A")) {
        taskDiv.attr('style', 'background-color:#6BB9D1');
    } else if ((parseInt(time) > parseInt(newCurrentHour)) && parseInt(time) == 12) {
        taskDiv.attr('style', 'background-color:#6BB9D1');
    } else if ((parseInt(time) < parseInt(newCurrentHour)) && time.includes("P")) {
        taskDiv.attr('style', 'background-color:#6BB9D1');
    } else if ((parseInt(time) < parseInt(newCurrentHour)) && time.includes("A")) {
        taskDiv.attr('style', 'background-color:#6BB9D1');
    } else if (parseInt(time) > parseInt(newCurrentHour)) {
        taskDiv.attr('style', 'background-color:#77C499');
    }
}

function createTaskDiv(time) {
    // Create container div 
    var newTaskDiv = $("<div>");
    newTaskDiv.attr("class", "task");

    var hrSeperator1 = $("<hr>");
    hrSeperator1.attr("class", "hr-separator");

    var taskTitle = $("<INPUT>");
    taskTitle.attr("class", "task-title-input");
    taskTitle.attr("id", time);
    taskTitle.attr("placeholder", "Enter Title");

    var titleText = getTitleFromLocalStorage(time);
 
    taskTitle.attr("value", titleText);

    var hrSeperator2 = $("<hr>");
    hrSeperator2.attr("class", "hr-separator-grey");

    // Task description of the dialog 
    var taskDesc = $("<TEXTAREA>");
    taskDesc.attr("id", "details-desc");
    taskDesc.attr("type", "text");
    taskDesc.attr("rows", "15");
    taskDesc.attr("cols", "95");
    taskDesc.attr("placeholder", "Enter Details");

    var descText = getDescFromLocalStorage(time);
    taskDesc.val(descText);

    var saveButton = $("<button>");
    saveButton.attr("class", "saveBtn");
    saveButton.text("Save");

    saveButton.click(function () {

        if (localStorage.getItem('WorkDayNote') === null) {

            // Add content to taskArray and set the item to local storage 
            taskArray.push({ key: time, title: `${taskTitle.val()}`, desc: `${taskDesc.val()}` })
            // Create a new array in local storage if doesn't exist 
            localStorage.setItem('WorkDayNote', JSON.stringify(taskArray));

        } else {
            // Else fetch the existing array from local storage 
            WorkDayNote = JSON.parse(localStorage.getItem('WorkDayNote'));

            if ((WorkDayNote.length == 0 && taskArray.length == 0)) {
                // Add content to taskArray and set the item to local storage 
                taskArray.push({ key: time, title: `${taskTitle.val()}`, desc: `${taskDesc.val()}` })
                // Create a new array in local storage if doesn't exist 
                localStorage.setItem('WorkDayNote', JSON.stringify(taskArray));
            }

            // If the array existing and is empty, push an object onto the array 
            else if (WorkDayNote.length != 0 && taskArray.length != 0) {
                for (var i = 0; i < taskArray.length; i++) {
                    if (taskArray[i].key == time) {
                        taskArray.splice(i, 1);
                    }
                }
                taskArray.push({ key: time, title: `${taskTitle.val()}`, desc: `${taskDesc.val()}` });
                localStorage.setItem('WorkDayNote', JSON.stringify(taskArray));
                console.log(WorkDayNote);
            }
        }
    });

    var deleteButton = $("<button>");
    deleteButton.attr("class", "deleteBtn");
    deleteButton.text("Delete");
    deleteButton.click(function () {

        taskTitle.val("");
        taskDesc.val("");

        if (localStorage.getItem('WorkDayNote') != null) {
            // Else fetch the existing array from local storage 
            WorkDayNote = JSON.parse(localStorage.getItem('WorkDayNote'));

            // If the array existing and is empty, push an object onto the array 
            if (WorkDayNote.length != 0 && taskArray.length != 0) {
                for (var i = 0; i < taskArray.length; i++) {
                    if (taskArray[i].key == time) {
                        taskArray.splice(i, 1);
                    }
                }

                localStorage.setItem('WorkDayNote', JSON.stringify(taskArray));
                console.log(WorkDayNote);
            }
            localStorage.setItem('WorkDayNote', JSON.stringify(taskArray));

        }
    })

    newTaskDiv.append(hrSeperator1);
    newTaskDiv.append(taskTitle);
    newTaskDiv.append(hrSeperator2);
    newTaskDiv.append(taskDesc);
    newTaskDiv.append(saveButton);
    newTaskDiv.append(deleteButton);
    return newTaskDiv;
}

function getTitleFromLocalStorage(time) {
    if (localStorage.getItem('WorkDayNote') != null) {
        // Else fetch the existing array from local storage 
        WorkDayNote = JSON.parse(localStorage.getItem('WorkDayNote'));

        taskArray = WorkDayNote;
        // If the array existing and is empty, push an object onto the array 
        if (taskArray.length != 0) {
            for (var i = 0; i < taskArray.length; i++) {
                if (taskArray[i].key == time) {
                    console.log( taskArray[i].title);
                    return taskArray[i].title;
                }
            }
        }
    }
}

function getDescFromLocalStorage(time){
    console.log("Here");
    if (localStorage.getItem('WorkDayNote') != null) {
        // Else fetch the existing array from local storage 
        WorkDayNote = JSON.parse(localStorage.getItem('WorkDayNote'));

        taskArray = WorkDayNote;
        // If the array existing and is empty, push an object onto the array 
        if (taskArray.length != 0) {
            for (var i = 0; i < taskArray.length; i++) {
                if (taskArray[i].key == time) {
                    console.log( taskArray[i].desc);
                    return taskArray[i].desc;
                }
            }
        }
    }
}