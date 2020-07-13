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
// taskArray.push({ timeKey: "4:00 AM", title: "Task 1", Category: "No Category", Priority: "Low" });
// taskArray.push({ timeKey: "5:00 AM", title: "Task 2", Category: "No Category", Priority: "High" });
// taskArray.push({ timeKey: "6:00 AM", title: "Task 3", Category: "No Category", Priority: "Low" });

var timeKey = [];
// Creating a div for details dialog 
var taskDetailsDialog = $("<div>");
taskDetailsDialog.attr("class", "task-details-dialog");

// End region 

$(document).ready(function () {
    getAndDisplayDate();
    createAndDisplayTaskDetailsDialog();
});

function getAndDisplayDate() {
    // get and display title date 
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
        $(".time-schedule-div").append(getTimeTaskDiv(getTimeBlockElement(time), getTaskBlockElement(time)));
    });

}



function createAndDisplayTaskDetailsDialog() {

    // Creating a div to contain the title and hr of the details dialog 
    var divSection1 = $("<div>");
    divSection1.attr("id", "div-section-1");

    // Title of the dialog 
    var detailsTitle = $("<input>");
    detailsTitle.attr("class", "details-title");
    detailsTitle.attr("type", "text");
    detailsTitle.attr("placeholder", "Enter Title");
    detailsTitle.on('input', function () {
        // console.log(detailsTitle.val());
    });


    // Hr separation after the title 
    var detailsHr1 = $("<hr>");
    detailsHr1.attr("class", "details-hr");

    // Display the time for which the task is created 
    var detailsTimeKey = $("<p>");
    detailsTimeKey.attr("id", "details-timekey");
    detailsTimeKey.text("timekey");

    // Adding the title and hr to div 
    divSection1.append(detailsTitle);
    divSection1.append(detailsTimeKey);
    divSection1.append(detailsHr1);

    // Creating a div to contain the task description text area
    var divSection2 = $("<div>");
    divSection2.attr("id", "div-section-2");

    // Title of the dialog 
    var detailsDesc = $("<TEXTAREA>");
    detailsDesc.attr("class", "details-desc");
    detailsDesc.attr("type", "text");
    detailsDesc.attr("rows", "15");
    detailsDesc.attr("cols", "95");
    detailsDesc.attr("placeholder", "Enter task description");
    detailsDesc.on('input', function () {
        // console.log(detailsDesc.val());
    });

    // Adding the title and hr to div 
    divSection2.append(detailsDesc);

    // Creating a div to contain the save and delete buttons
    var divSection3 = $("<div>");
    divSection3.attr("id", "div-section-3");

    // Hr separation after the title 
    var detailsHr2 = $("<hr>");
    detailsHr2.attr("class", "details-hr");

    var saveButton = $("<button>");
    saveButton.attr("class", "saveBtn");
    saveButton.text("Save");
    saveButton.on('click', function saveFunction() {
        taskArray.push({ timeKey: `${detailsTimeKey.text()}`, title: `${detailsTitle.val()}`, desc: `${detailsDesc.val()}`, Category: "No Category", Priority: "Low" })

        console.log(taskArray);

        detailsTitle.val("");
        detailsDesc.val("");
        $(".task-details-dialog").hide();
    });

    var deleteButton = $("<button>");
    deleteButton.attr("class", "saveBtn");
    deleteButton.text("Delete");
    deleteButton.on('click', function deleteFunction() {
        $(".task-details-dialog").hide();
    });

    divSection3.append(detailsHr2);
    divSection3.append(saveButton);
    divSection3.append(deleteButton);

    // Add the first div dection to the details dialog div 
    taskDetailsDialog.append(divSection1);
    taskDetailsDialog.append(divSection2);
    taskDetailsDialog.append(divSection3);
}

// getTimeKey(time) 

function getTimeKey(time) {
    taskArray.find(obj => {

        if (obj.timeKey == time) {
            console.log(obj.timeKey);
            timeKey.push(`${obj.timeKey}`);
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
    newh6.attr("id", `${time}`);
    newh6.text(time);
    return newh6;
}

function getTaskBlockElement(time) {

    var titleElement = getPElement();

    // Creating new div to display title and tags 
    var newDiv = $("<div>");
    newDiv.attr("class", "task-schedule");
    newDiv.attr("id", `${time}`);
    newDiv.append(titleElement);

    // Adding click listener to the task div 
    addTaskClickListener(time);
    return newDiv;
}

function getPElement() {
    var newP = $("<p>");
    newP.value = "Title";
    return newP;
}

function addTaskClickListener(time) {
    $(".task-schedule").on('click', function () {
        console.log($(this).attr('id'));
        $("body").append(taskDetailsDialog);
        $(".task-details-dialog").show()
        $("#details-timekey").text($(this).attr('id'));
    })
}

// var title = "";
// taskArray.find(obj => {

//     if(obj.timeKey == timeKey){
//         title = obj.title;
//     }else{
//         title = "";
//     }
// })

