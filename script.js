// Region Variable assignment
var timeArray = [
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM"
]

var taskArray = [];

$(document).ready(function () {
    getAndDisplayDate();
    
    createHourlyPlanDiv();


    // $("#task-details-dialog").on('show', prePopulateDataIfSaved());

    // function prePopulateDataIfSaved() {
    //     console.log("I'm here");
    // }
});

function getAndDisplayDate() {
    var currentDate = moment().format('dddd, MMMM Do YYYY');

    var dateH2Element = $("<h2>");
    dateH2Element.attr("class", "time-block");
    dateH2Element.text(currentDate);

    // get and display title date 
    $(".time-block").append(dateH2Element);
}

function createHourlyPlanDiv() {
    timeArray.forEach(time => {
        $(".time-schedule-div").append(getTimeTaskDiv(time));
    });

}

function getTimeTaskDiv(time) {
    // Create container div 
    var newTimeTaskDiv = $("<div>");
    newTimeTaskDiv.attr("class", "time-task-schedule");
    newTimeTaskDiv.attr("id", `time-task-${time}`);
    var divID = $(".time-task-schedule").attr("id");
    $(".time-task-schedule").on('click',function () {
        var id = $(this).attr("id");
        console.log(id);

        createAndDisplayTaskDetailsDialog($(this).attr("id"));
    });

    // Create time H6 to display time
    var titleH6 = $("<h6>");
    titleH6.attr("class", "time-schedule");
    titleH6.attr("id", `title${time}`);
    titleH6.text(time);

    newTimeTaskDiv.append(titleH6);

    // Creating new div to display title and tags 
    var taskDiv = $("<div>");
    taskDiv.attr("class", "task-schedule");

    // Creating new P tag to display title
    var titleP = $("<p>");
    titleP.value = "";

    taskDiv.append(titleP);
    newTimeTaskDiv.append(taskDiv);

    return newTimeTaskDiv;
}

function customClickListener(id) {
    $(`title${id}`).text(id);

    $("#task-details-dialog").show();

    console.log(id);
    // getSavedData(id)
    // var dialog = $("#task-details-dialog");
    // $("body").append(dialog);
}

function createAndDisplayTaskDetailsDialog(id) {
    // Creating a container div for details dialog 
    var taskDetailsDialog = $("<div>");
    taskDetailsDialog.attr("id", "task-details-dialog");

    // Creating a div to contain the title and hr of the details dialog 
    var divSection1 = $("<div>");
    divSection1.attr("id", "div-section-1");

    // Title of the dialog 
    var detailsTitle = $("<input>");
    detailsTitle.attr("id", "details-title");

    detailsTitle.attr("type", "text");
    detailsTitle.attr("placeholder", "Enter Title");

    // Hr separation after the title 
    var detailsHr1 = $("<hr>");
    detailsHr1.attr("class", "details-hr");

    // Display the time for which the task is created 
    var detailsTimeKey = $("<p>");
    detailsTimeKey.attr("id", "details-time-key");
    detailsTimeKey.text("");

    // Adding the title and hr to div 
    divSection1.append(detailsTitle);
    divSection1.append(detailsTimeKey);
    divSection1.append(detailsHr1);

    // Creating a div to contain the task description text area
    var divSection2 = $("<div>");
    divSection2.attr("id", "div-section-2");

    // Task description of the dialog 
    var detailsDesc = $("<TEXTAREA>");
    detailsDesc.attr("id", "details-desc");
    detailsDesc.attr("type", "text");
    detailsDesc.attr("rows", "15");
    detailsDesc.attr("cols", "95");
    detailsDesc.attr("placeholder", "Enter task description");

    // Adding the task desc to div 
    divSection2.append(detailsDesc);

    // Creating a div to contain the save and delete buttons
    var divSection3 = $("<div>");
    divSection3.attr("id", "div-section-3");

    // Hr separation after the desc
    var detailsHr2 = $("<hr>");
    detailsHr2.attr("class", "details-hr");

    var saveButton = addSaveButtonAndSaveEventListener(detailsTimeKey.text(), detailsTitle.val(), detailsDesc.val());

    var deleteButton = addDeleteButtonAndDeleteEventListener();

    divSection3.append(detailsHr2);
    divSection3.append(saveButton);
    divSection3.append(deleteButton);

    // Add the divs to the details dialog container div  
    taskDetailsDialog.append(divSection1);
    taskDetailsDialog.append(divSection2);
    taskDetailsDialog.append(divSection3);
    console.log("Dialog created");

    $("body").append(taskDetailsDialog);
}

function addSaveButtonAndSaveEventListener(timeKey, title, desc) {
    var saveButton = $("<button>");
    saveButton.attr("class", "saveBtn");
    saveButton.text("Save");
    saveButton.on('click', function saveFunction() {
        taskArray.push({ timeKey: `${timeKey}`, title: `${title}`, desc: `${desc}`, Category: "No Category", Priority: "Low" })

        console.log(taskArray);

        detailsTitle.val("");
        detailsDesc.val("");
        // $("#task-details-dialog").hide();
    });
    return saveButton;
}

function addDeleteButtonAndDeleteEventListener() {
    var deleteButton = $("<button>");
    deleteButton.attr("class", "saveBtn");
    deleteButton.text("Delete");
    deleteButton.on('click', function deleteFunction() {
        // taskArray.pop({ timeKey: `${detailsTimeKey.text()}` })

        // $("#task-details-dialog").hide();
    });
    return deleteButton;
}