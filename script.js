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
taskArray.push({ title: "Title", Category: "No Category", Priority: "Low" });
// End region 

var taskDetails = $("<div>");
taskDetails.attr("class", "task-deatils");

// Region Add date 
$(".time-block").append(getH2DateElement(createAndDisplayDate()));
createHourlyPlanDiv();

// End region 

function createAndDisplayDate() {
    return moment().format('dddd, MMMM Do YYYY');
}

function createHourlyPlanDiv() {
    timeArray.forEach(time => {
        $(".time-schedule-div").append(getTimeTaskDiv(getTimeBlockElement(time), getTaskBlockElement("Title")));
    });

}

function getTimeTaskDiv(time, task) {
    var newTimeTaskDiv = $("<div>");
    newTimeTaskDiv.attr("class", "TimeTaskDivElement");
    newTimeTaskDiv.append(time);
    newTimeTaskDiv.append(task);
    return newTimeTaskDiv;
}

function getH2DateElement(text) {
    var newH2 = $("<h2>");
    newH2.attr("class", "time-block");
    newH2.text(text);
    return newH2;
}

function getTimeBlockElement(time) {
    var newh6 = $("<h6>");
    newh6.attr("class", "time-schedule");
    newh6.text(time);
    return newh6;
}

function getTaskBlockElement(title) {
    var titleElement = getPElement(title)
    var newDiv = $("<div>");
    newDiv.attr("class", "task-schedule");
    newDiv.attr("id", "task-element")
   

    addTaskClickListener();
    return newDiv;
}

function getPElement(text) {
    var newP = $("<p>");
    newP.text(text);
    return newP;
}




function addTaskClickListener() {
    $("#task-element").on('click', function(){
        $("body").append(taskDetails)
    })


    console.log(taskArray);

}