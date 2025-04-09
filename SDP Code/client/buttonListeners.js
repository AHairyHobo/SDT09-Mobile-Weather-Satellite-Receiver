var gifImages = []; //array of all images for current sector and image type, index 0 is oldest image
var aniIndex = 0;
var emwinIndex = 0;
var intervalID;
var sector = "Full%20Disk";
var type = "01";
var timeStep = 1;
var numImages = 12;
var usr_location = "CLE";
const audio = new Audio("/images/website_files/alert_tone.mp3")

function animationLoop() {
  intervalID = setInterval(function () {
    document.getElementById('image').src = gifImages[aniIndex]; //set image to next frame
    document.getElementById("image_date").innerText = extractDate(gifImages[aniIndex]);
    aniIndex = aniIndex + timeStep; //increase frame number
    if (aniIndex >= gifImages.length) { //if animation frame exceeds length of image array, reset to start
      //set first frame to index length of array minus total number of frames needed for animation loop, or 0. 
      // Animation will then loop from middle of array to the end
      aniIndex = Math.max(gifImages.length - (numImages * timeStep), 0);
    }
  }, 83.333) //miliseconds between each frame
}

async function startAnimation() {
  gifImages = await getFiles("http://localhost:3000/filepath?sector=" + sector + "&type=" + type);
  //console.log(gifImages)

  //set first frame to index length of array minus total number of frames needed for animation loop, or 0. 
  // Animation will then loop from middle of array to the end
  aniIndex = Math.max(gifImages.length - (numImages * timeStep), 0);
  clearInterval(intervalID) //stop any running animation loop processes
  animationLoop() //start animation
}

function pauseAnimation() {
  clearInterval(intervalID) //stop any running animation loop processes
}

function resumeAnimation() {
  clearInterval(intervalID) //stop any running animation loop processes
  animationLoop() //start animation loop
}

/*Get path to correct latest image*/
function imagePath() {
  var sectorString = "";
  var typeString = "";
  var sectorText = document.getElementById(id = "sectorButton").innerText
  var typeText = document.getElementById(id = "imageTypeButton").innerText
  if (typeText == "IR Band 1") typeString = "01/";
  if (typeText == "IR Band 2") typeString = "02/";
  if (typeText == "IR Band 3") typeString = "03/";
  if (typeText == "IR Band 4") typeString = "04/";
  if (typeText == "IR Band 5") typeString = "05/";
  if (typeText == "IR Band 6") typeString = "06/";
  if (typeText == "IR Band 7") typeString = "07/";
  if (typeText == "IR Band 8") typeString = "08/";
  if (typeText == "IR Band 9") typeString = "09/";
  if (typeText == "IR Band 10") typeString = "10/";
  if (typeText == "IR Band 11") typeString = "11/";
  if (typeText == "IR Band 12") typeString = "12/";
  if (typeText == "IR Band 13") typeString = "13/";
  if (typeText == "IR Band 14") typeString = "14/";
  if (typeText == "IR Band 15") typeString = "15/";
  if (typeText == "IR Band 16") typeString = "16/";
  if (typeText == "GeoColor") typeString = "GeoColor/";
  if (typeText == "Day Cloud") typeString = "DayCloud/";
  if (typeText == "Simple Water Vapor") typeString = "SimpleWaterVapor/";
  if (sectorText == "Continental U.S.") sectorString = "Conus/";
  if (sectorText == "Full Disk") sectorString = "Full Disk/";
  if (sectorText == "Meso M1") sectorString = "Meso/M1/";
  if (sectorText == "Meso M2") sectorString = "Meso/M2/";
  if (sectorString == "" || typeString == "") {
    sectorString = "";
    typeString = "";
  }
  return "/images/" + sectorString + typeString + "latest.jpg";
}

async function getFiles(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const respText = await response.text();
    const tempList = respText.split(',');
    const returnedList = tempList.filter(element => !element.includes('latest.jpg'))
    returnedList.sort();
    //console.log(returnedList);
    return returnedList;
  } catch (error) {
    console.error(error.message);
  }
}

async function getLocation() {
  try {
    const response = await fetch("http://localhost:3000/get_loc");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const respText = await response.text();
    return respText;
  } catch (error) {
    console.error(error.message);
  }
}

async function sendLocation(location) {
  try {
    const response = await fetch("http://localhost:3000/send_loc?location=" + location);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const respText = await response.text();
    return respText;
  } catch (error) {
    console.error(error.message);
  }
}

async function getEmwin(indexString) {
  try {
    const response = await fetch("http://localhost:3000/get_emwin?index=" + indexString);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const respText = await response.text();
    //console.log(returnedList);
    if (respText.toLowerCase().includes("tornado watch") ||
      respText.toLowerCase().includes("tornado warning") ||
      respText.toLowerCase().includes("severe thunderstorm watch") ||
      respText.toLowerCase().includes("severe thunderstorm warning") ||
      respText.toLowerCase().includes("flash flood watch") ||
      respText.toLowerCase().includes("flash flood warning") ||
      respText.toLowerCase().includes("blizzard warning") ||
      respText.toLowerCase().includes("winter storm warning") ||
      respText.toLowerCase().includes("high wind warning")) {
      console.log("ALERT!")
      var playPromise = audio.play();
      // In browsers that don’t yet support this functionality,
      // playPromise won’t be defined.
      if (playPromise !== undefined) {
        playPromise.then(function () {
          // Automatic playback started!
        }).catch(function (error) {
          document.getElementsByClassName("popup")[0].classList.toggle("popupShow");
        });
      }
    }
    return respText;
  } catch (error) {
    console.error(error.message);
  }
}

function playAlert() {
  audio.play();
  document.getElementsByClassName("popup")[0].classList.toggle("popupShow");
}

function extractDate(filename) {
  const juliandate = filename.split('_')[3].slice(1);
  const year = juliandate.slice(0,4); 
  var day = juliandate.slice(4,7);
  const hour = juliandate.slice(7,9);
  const minute = juliandate.slice(9,11);
  const second = juliandate.slice(11,13);

  if (day > 334) {
    month = "December";
    day = day - 334;
  }
  else if (day > 304) {
    month = "November";
    day = day - 304;
  }
  else if (day > 273) {
    month = "October";
    day = day - 273;
  }
  else if (day > 243) {
    month = "September";
    day = day - 243;
  }
  else if (day > 212) {
    month = "August";
    day = day - 212;
  }
  else if (day > 181) {
    month = "July";
    day = day - 181;
  }
  else if (day > 151) {
    month = "June";
    day = day - 151;
  }
  else if (day > 120) {
    month = "May";
    day = day - 120;
  }
  else if (day > 90) {
    month = "April";
    day = day - 90;
  }
  else if (day > 59) {
    month = "March";
    day = day - 59;
  }
  else if (day > 31) {
    month = "February";
    day = day - 31;
  }
  else {
    month = "January";
  }


  return month + " " + day + " " + year + "   " + hour + ":" + minute + ":" + second;
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function sectorDropdownClick() {
  document.getElementById("sectorDropdown").classList.toggle("show");
}
function imageTypeDropdownClick() {
  document.getElementById("imageTypeDropdown").classList.toggle("show");
}
function numImagesDropdownClick() {
  document.getElementById("numImagesDropdown").classList.toggle("show");
}
function timeStepDropdownClick() {
  document.getElementById("timeStepDropdown").classList.toggle("show");
}
function alaskaRegionDropdownClick() {
  document.getElementById("alaskaRegionDropdown").classList.toggle("show");
}
function centralRegionDropdownClick() {
  document.getElementById("centralRegionDropdown").classList.toggle("show");
}
function easternRegionDropdownClick() {
  document.getElementById("easternRegionDropdown").classList.toggle("show");
}
function pacificRegionDropdownClick() {
  document.getElementById("pacificRegionDropdown").classList.toggle("show");
}
function southernRegionDropdownClick() {
  document.getElementById("southernRegionDropdown").classList.toggle("show");
}
function westernRegionDropdownClick() {
  document.getElementById("westernRegionDropdown").classList.toggle("show");
}

/*Options for sector selection*/
async function sectorFunc(buttonNum) {
  var dropButt = document.getElementById("sectorButton");
  var text;
  clearInterval(intervalID);
  switch (buttonNum) {
    case 1:
      text = document.getElementById(id = "sector1Button").innerText;
      sector = "Conus"
      break;
    case 2:
      text = document.getElementById(id = "sector2Button").innerText;
      sector = "Full%20Disk";
      break;
    case 3:
      text = document.getElementById(id = "sector3Button").innerText;
      sector = "Meso/M1"
      break;
    case 4:
      text = document.getElementById(id = "sector4Button").innerText;
      sector = "Meso/M2";
      break;
  }
  if (dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
    gifImages = await getFiles("http://localhost:3000/filepath?sector=" + sector + "&type=" + type);
    document.getElementById("image_date").innerText = extractDate(gifImages[gifImages.length - 1]);
  }
}

/*Options for image type selection*/
async function typeFunc(buttonNum) {
  var dropButt = document.getElementById("imageTypeButton");
  var text;
  clearInterval(intervalID)
  console.log(buttonNum);
  switch (buttonNum) {
    case 1:
      text = document.getElementById(id = "type1Button").innerText;
      type = "01";
      break;
    case 2:
      text = document.getElementById(id = "type2Button").innerText;
      type = "02";
      break;
    case 3:
      text = document.getElementById(id = "type3Button").innerText;
      type = "03";
      break;
    case 4:
      text = document.getElementById(id = "type4Button").innerText;
      type = "04";
      break;
    case 5:
      text = document.getElementById(id = "type5Button").innerText;
      type = "05";
      break;
    case 6:
      text = document.getElementById(id = "type6Button").innerText;
      type = "06";
      break;
    case 7:
      text = document.getElementById(id = "type7Button").innerText;
      type = "07";
      break;
    case 8:
      text = document.getElementById(id = "type8Button").innerText;
      type = "08";
      break;
    case 9:
      text = document.getElementById(id = "type9Button").innerText;
      type = "09";
      break;
    case 10:
      text = document.getElementById(id = "type10Button").innerText;
      type = "10";
      break;
    case 11:
      text = document.getElementById(id = "type11Button").innerText;
      type = "11";
      break;
    case 12:
      text = document.getElementById(id = "type12Button").innerText;
      type = "12";
      break;
    case 13:
      text = document.getElementById(id = "type13Button").innerText;
      type = "13";
      break;
    case 14:
      text = document.getElementById(id = "type14Button").innerText;
      type = "14";
      break;
    case 15:
      text = document.getElementById(id = "type15Button").innerText;
      type = "15";
      break;
    case 16:
      text = document.getElementById(id = "type16Button").innerText;
      type = "16";
      break;
    case 17:
      text = document.getElementById(id = "type17Button").innerText;
      type = "GeoColor";
      break;
    case 18:
      text = document.getElementById(id = "type18Button").innerText;
      type = "DayCloud";
      break;
    case 19:
      text = document.getElementById(id = "type19Button").innerText;
      type = "SimpleWaterVapor";
      break;
  }
  if (dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
    gifImages = await getFiles("http://localhost:3000/filepath?sector=" + sector + "&type=" + type);
    document.getElementById("image_date").innerText = extractDate(gifImages[gifImages.length - 1]);
  }
}

/*Options for number of images selection*/
function num(buttonNum) {
  var dropButt = document.getElementById("numImagesButton");
  var text;
  console.log(buttonNum);
  switch (buttonNum) {
    case 1:
      text = document.getElementById(id = "num1Button").innerText;
      break;
    case 2:
      text = document.getElementById(id = "num2Button").innerText;
      break;
    case 3:
      text = document.getElementById(id = "num3Button").innerText;
      break;
    case 4:
      text = document.getElementById(id = "num4Button").innerText;
      break;
    case 5:
      text = document.getElementById(id = "num5Button").innerText;
      break;
    case 6:
      text = document.getElementById(id = "num6Button").innerText;
      break;
    case 7:
      text = document.getElementById(id = "num7Button").innerText;
      break;
    case 8:
      text = document.getElementById(id = "num8Button").innerText;
      break;
    case 9:
      text = document.getElementById(id = "num9Button").innerText;
      break;
    case 10:
      text = document.getElementById(id = "num10Button").innerText;
      break;
    case 11:
      text = document.getElementById(id = "num11Button").innerText;
      break;
    case 12:
      text = document.getElementById(id = "num12Button").innerText;
      break;
  }
  if (dropButt.innerText != text) {
    dropButt.innerText = text;
    numImages = parseInt(text);
  }
}

/*Options for selecting the time step*/
function step(buttonNum) {
  var dropButt = document.getElementById("timeStepButton");
  var text;
  console.log(buttonNum);
  switch (buttonNum) {
    case 1:
      text = document.getElementById(id = "step1Button").innerText;
      timeStep = 1;
      break;
    case 2:
      text = document.getElementById(id = "step2Button").innerText;
      timeStep = 2;
      break;
    case 3:
      text = document.getElementById(id = "step3Button").innerText;
      timeStep = 3;
      break;
    case 4:
      text = document.getElementById(id = "step4Button").innerText;
      timeStep = 4;
      break;
    case 5:
      text = document.getElementById(id = "step5Button").innerText;
      timeStep = 5;
      break;
    case 6:
      text = document.getElementById(id = "step6Button").innerText;
      timeStep = 6;
      break;
  }
  if (dropButt.innerText != text) {
    dropButt.innerText = text;
  }
}

//Called when users location is changed, function changes html text displaying current location, and informs server of change
async function regionName(reg) {
  document.getElementsByClassName("currentLocationText")[0].innerText = "Current Location for Weather Alerts: " + reg;
  usr_location = reg;
  await sendLocation(reg)
}

async function prevEmwin() {
  const emwinText = await getEmwin("prev");
  const element = document.getElementById("emwin_content")
  if (element != null && emwinText != "") {
    element.innerText = emwinText;
  }
}

async function nextEmwin() {
  const emwinText = await getEmwin("next");
  const element = document.getElementById("emwin_content")
  if (element != null && emwinText != "") {
    element.innerText = emwinText;
  }
}

function prevImage(amount) {
  aniIndex -= amount;
  if (aniIndex < 0) {
    aniIndex = gifImages.length + aniIndex;
    document.getElementById("image")
  }
  document.getElementById(id = "image").src = gifImages[aniIndex];
  document.getElementById("image_date").innerText = extractDate(gifImages[aniIndex]);
}

function nextImage(amount) {
  aniIndex += amount;
  if (aniIndex >= gifImages.length) {
    aniIndex = aniIndex - gifImages.length;
  }
  document.getElementById(id = "image").src = gifImages[aniIndex];
  document.getElementById("image_date").innerText = extractDate(gifImages[aniIndex]);
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//On page load get users location from server and changes html that displays it
window.onload = async function () {
  //get current location from server
  usr_location = await getLocation();
  var element = document.getElementsByClassName("currentLocationText")
  if (element.length > 0) {
    element[0].innerText = "Current Location for Weather Alerts: " + usr_location;
  }

  //get text of emwin file
  emwinText = await getEmwin("curr");
  element = document.getElementById("emwin_content")
  if (element != null && emwinText != "") {
    element.innerText = emwinText;
  }

  //get list of images for current sector and type and set to most recent image
  gifImages = await getFiles("http://localhost:3000/filepath?sector=" + sector + "&type=" + type);
  document.getElementById("image_date").innerText = extractDate(gifImages[gifImages.length - 1]); //display date time for most recent image
  aniIndex = gifImages.length - 1;

  //Refreshes page after 5 minutes, in case there is new data to display
  setTimeout(function () {

    window.location.href = window.location.href;
  }, 300000);
}