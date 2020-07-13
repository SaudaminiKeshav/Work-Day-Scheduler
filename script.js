// Region Variable assignment
var timeArray = [
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM"
]

var taskArray = [];
taskArray.push({ timeKey: "4:00 AM", title: "Task 1", Category: "No Category", Priority: "Low" });
taskArray.push({ timeKey: "5:00 AM", title: "Task 2", Category: "No Category", Priority: "High" });
taskArray.push({ timeKey: "6:00 AM", title: "Task 3", Category: "No Category", Priority: "Low" });

var timeKey = "";
 // Creating a div for details dialog 
 var taskDetailsDialog = $("<div>");
 taskDetailsDialog.attr("class", "task-details-dialog");

// End region 

$(document).ready(function () {
    getAndDisplayDate();
    createAndDisplayTaskDetailsDialog();

});

function createAndDisplayTaskDetailsDialog() {
   
    // Creating a div to contain the title and hr of the details dialog 
    var divSection1 = $("<div>");
    divSection1.attr("id", "div-section-1");

    // Title of the dialog 
    var detailsTitle = $("<h5>");
    detailsTitle.attr("class", "details-title");

    // Hr separation after the title 
    var detailsHr = $("<hr>");
    detailsHr.attr("class", "details-hr");

    // Adding the title and hr to div 
    divSection1.append(detailsTitle);
    divSection1.append(detailsHr);

    // Add the first div dection to the details dialog div 
    taskDetailsDialog.append(divSection1);
}


function getAndDisplayDate() {
    // get and display date 
    $(".time-block").append(getH2DateElement(createAndDisplayDate()));
   
    createHourlyPlanDiv();
}

function getH2DateElement(text) {
    var newH2 = $("<h2>");
    newH2.attr("class", "time-block");
    newH2.text(text);
    return newH2;
}

function createAndDisplayDate() {
    return moment().format('dddd, MMMM Do YYYY');
}

function createHourlyPlanDiv() {
    timeArray.forEach(time => {
        $(".time-schedule-div").append(getTimeTaskDiv(getTimeBlockElement(time), getTaskBlockElement(getTaskObject(time))));
    });

}

function getTaskObject(time){
    taskArray.find(obj => {
       
        if(obj.timeKey == time){
            console.log(obj.timeKey);
            timeKey = `${obj.timeKey}`;
        }else{
            timeKey = "";
        }
    })
}

function getTimeTaskDiv(time, task) {
    var newTimeTaskDiv = $("<div>");
    newTimeTaskDiv.attr("class", "TimeTaskDivElement");
    newTimeTaskDiv.append(time);
    newTimeTaskDiv.append(task);
    return newTimeTaskDiv;
}

function getTimeBlockElement(time) {
    var newh6 = $("<h6>");
    newh6.attr("class", "time-schedule");
    newh6.text(time);
    return newh6;
}

function getTaskBlockElement() {
    console.log(timeKey);

    var titleElement = getPElement()

    // Creating new div to display title and tags 
    var newDiv = $("<div>");
    newDiv.attr("class", "task-schedule");
    newDiv.attr("id", "task-element")
    newDiv.append(titleElement);

    // Adding click listener to the task div 
    addTaskClickListener();
    return newDiv;
}

function getPElement() {
    var title = "";
    taskArray.find(obj => {
       
        if(obj.timeKey == timeKey){
            title = obj.title;
        }else{
            title = "";
        }
    })

    var newP = $("<p>");
    newP.text(title);
    return newP;
}

function addTaskClickListener() {
    $(".task-schedule").on('click', function () {
        $("body").append(taskDetailsDialog)
    })
}