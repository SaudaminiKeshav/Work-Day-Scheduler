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

var currentDate = moment().format('dddd, MMMM Do YYYY');
let currentTime = moment().format('h:mm A');
// currentTime = "10:00 AM";

var taskArray = [];

var WorkDayNote = [];

$(document).ready(function () {
    getAndDisplayDate();

    createHourlyPlanDiv();

    createLocalStorage();

    // colorCodeDivAsPerTheCurrentTime();
});

function getAndDisplayDate() {

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
    newTimeTaskDiv.attr("id", `${time}`);
    var divID = $(".time-task-schedule").attr("id");
    $(".time-task-schedule").on('click', function () {
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
    taskDiv.attr("id", `${time}`);

    colorCodeDivAsPerTheCurrentTime(time.toString(),taskDiv);


    // Creating new P tag to display title
    var titleP = $("<p>");
    titleP.value = "";

    taskDiv.append(titleP);
    newTimeTaskDiv.append(taskDiv);

    return newTimeTaskDiv;
}

// function customClickListener(id) {
//     $(`title${id}`).text(id);

//     $("#task-details-dialog").show();

//     console.log(id);
//     // getSavedData(id)
//     // var dialog = $("#task-details-dialog");
//     // $("body").append(dialog);
// }

function createAndDisplayTaskDetailsDialog(id) {
    // Creating a container div for details dialog 
    var taskDetailsDialog = $("<div>");
    taskDetailsDialog.attr("class", "task-details-dialog");

    // Creating a div to contain the title and hr of the details dialog 
    var divSection1 = $("<div>");
    divSection1.attr("id", "div-section-1");

    // Title of the dialog 
    var detailsTitle = $("<input>");
    detailsTitle.attr("id", "details-title");

    detailsTitle.attr("type", "text");
    detailsTitle.attr("placeholder", "Enter Title");


    for (var i = 0; i < taskArray.length; i++) {
        if (taskArray[i].key == id) {
            detailsTitle.val(taskArray[i].title);
        }
    }

    // Hr separation after the title 
    var detailsHr1 = $("<hr>");
    detailsHr1.attr("class", "details-hr");

    // Display the time for which the task is created 
    var detailsTimeKey = $("<p>");
    detailsTimeKey.attr("id", "details-time-key");
    detailsTimeKey.text("Time: " + id);

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

    for (var i = 0; i < taskArray.length; i++) {
        if (taskArray[i].key == id) {
            detailsDesc.val(taskArray[i].desc);
        }
    }

    // Adding the task desc to div 
    divSection2.append(detailsDesc);

    // Creating a div to contain the save and delete buttons
    var divSection3 = $("<div>");
    divSection3.attr("id", "div-section-3");

    // Hr separation after the desc
    var detailsHr2 = $("<hr>");
    detailsHr2.attr("class", "details-hr");

    var saveButton = addSaveButtonAndSaveEventListener(id, detailsTimeKey.text(), detailsTitle, detailsDesc);

    var deleteButton = addDeleteButtonAndDeleteEventListener(id);

    divSection3.append(detailsHr2);
    divSection3.append(saveButton);
    divSection3.append(deleteButton);

    // Add the divs to the details dialog container div  
    taskDetailsDialog.append(divSection1);
    taskDetailsDialog.append(divSection2);
    taskDetailsDialog.append(divSection3);

    $("body").append(taskDetailsDialog);
}

function addSaveButtonAndSaveEventListener(id, timeKey, title, desc) {
    var saveButton = $("<button>");
    saveButton.attr("class", "saveBtn");
    saveButton.text("Save");
    saveButton.on('click', function saveFunction() {


        if (taskArray.length == 0) {
            taskArray.push({ key: id, timeKey: `${timeKey}`, title: `${title.val()}`, desc: `${desc.val()}`, Category: "No Category", Priority: "Low" })
        } else {
            for (var i = 0; i < taskArray.length; i++) {
                if (taskArray[i].key != id) {
                    taskArray.push({ key: id, timeKey: `${timeKey}`, title: `${title.val()}`, desc: `${desc.val()}`, Category: "No Category", Priority: "Low" });
                } else if (taskArray[i].key == id) {
                    console.log("got an entry already");
                    taskArray.pop(taskArray[i]);
                    taskArray.push({ key: id, timeKey: `${timeKey}`, title: `${title.val()}`, desc: `${desc.val()}`, Category: "No Category", Priority: "Low" })
                }
            }
        }


        WorkDayNote = JSON.parse(localStorage.getItem('WorkDayNote'));

        if (WorkDayNote.length == 0) {
            WorkDayNote.push({ key: id, timeKey: `${timeKey}`, title: `${title.val()}`, desc: `${desc.val()}`, Category: "No Category", Priority: "Low" })
        } else {
            for (var i = 0; i < WorkDayNote.length; i++) {
                if (WorkDayNote[i].key != id) {
                    WorkDayNote.push({ key: id, timeKey: `${timeKey}`, title: `${title.val()}`, desc: `${desc.val()}`, Category: "No Category", Priority: "Low" });
                } else if (WorkDayNote[i].key == id) {
                    WorkDayNote.pop(WorkDayNote[i]);
                    WorkDayNote.push({ key: id, timeKey: `${timeKey}`, title: `${title.val()}`, desc: `${desc.val()}`, Category: "No Category", Priority: "Low" })
                    localStorage.setItem(`WorkDayNote`, JSON.stringify(WorkDayNote));
                }
            }
        }
        localStorage.setItem(`WorkDayNote`, JSON.stringify(WorkDayNote));


        console.log(taskArray);

        $("#details-time-key").text = timeKey;
        title.val("");
        desc.val("");
        $(".task-details-dialog").hide();
    });
    return saveButton;
}

function addDeleteButtonAndDeleteEventListener(id) {
    var deleteButton = $("<button>");
    deleteButton.attr("class", "saveBtn");
    deleteButton.text("Delete");
    deleteButton.on('click', function deleteFunction() {

        if (taskArray.length != 0) {
            for (var i = 0; i < taskArray.length; i++) {
                if (taskArray[i].key == id) {
                    taskArray.pop(taskArray[i].key);
                }
            }
        }

        WorkDayNote = JSON.parse(localStorage.getItem('WorkDayNote'));

        if (WorkDayNote.length != 0) {
            for (var i = 0; i < WorkDayNote.length; i++) {
                if (WorkDayNote[i].key == id) {
                    WorkDayNote.pop(WorkDayNote[i].key);
                    localStorage.setItem(`WorkDayNote`, JSON.stringify(WorkDayNote));
                }
            }
        }
        localStorage.setItem(`WorkDayNote`, JSON.stringify(WorkDayNote));

        $(".task-details-dialog").hide();

    });
    return deleteButton;
}

function getTitleData(timeID) {
    WorkDayNote = JSON.parse(localStorage.getItem('WorkDayNote'));

    for (var i = 0; i < WorkDayNote.length; i++) {

        var rtemp = WorkDayNote.hasOwnProperty("time");
        console.log(rtemp);
    }

    // console.log(timeID);
    // console.log(note.time);
    // if (note.time == timeID) {
    //     console.log(timeID);
    //     console.log(note.time);
    //     $("#details-title").value = note.title.text;
    // }

}


function createLocalStorage() {
    localStorage.setItem('WorkDayNote', JSON.stringify(taskArray));
}


// function colorCodeDivAsPerTheCurrentTime(time) {

// currentTime = "10:00 am";
// if (time != undefined && currentTime != undefined) {
//     var formattedHour = (time.toString()).split(':');
//     var divHour = formattedHour[0].toString();
//     var divPost = formattedHour[1].toString();


//     // if (formattedHour[1].toLowerCase().includes("am")) {
//     //     console.log("am");
//     // } else if (formattedHour[1].toLowerCase().includes("pm")) {
//     //     console.log("pm");
//     // }

//     var formattedcurrentTimeHour = (currentTime.toString()).split(':');
//     var currentHour = formattedcurrentTimeHour[0].toString();
//     var currentPost = formattedcurrentTimeHour[1].toString();

//     if (divHour == currentHour && (divPost.toLowerCase().substr(3, 5) == currentPost.toLowerCase().substr(3, 5))) {
//         console.log("matches");
//         return "matches";
//     }
// }



// if (time == currentTime) {
//     console.log("Matches");
// }
// if(currentHour.includes('am')){
//     console.log("Morning");
//     $(".task-schedule").addClass(".")
// }else if(currentHour.includes('pm')){
//     console.log("Night");
// }
// }

//Function for color coding and adding locally saved tasks into their proper areas
function colorCodeDivAsPerTheCurrentTime(divTime, taskDiv) {

    var hour = moment().format('hh');
    var meredian = moment().format('A');
    var currentHour = hour + ":00 " + meredian;
    //currentHour.toString();
    //divTime.toString()
    var newCurrentHour = ""+currentHour;
    var newDivTime = ""+divTime;

        if(parseInt(newCurrentHour) === parseInt(newDivTime)){
           
            taskDiv.attr('style',  'background-color:#FD6F61');
        }else if( (parseInt(newDivTime)< parseInt(newCurrentHour)) && newDivTime.includes("P")){
            taskDiv.attr('style',  'background-color:#77C499');
        }else if(parseInt(newDivTime) < parseInt(newCurrentHour)){
            taskDiv.attr('style',  'background-color:#6BB9D1');
        }else if(parseInt(newDivTime)> parseInt(newCurrentHour)){
            taskDiv.attr('style',  'background-color:#77C499');
        }
}