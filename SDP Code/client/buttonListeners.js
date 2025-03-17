var gifImages = ['/images/latest.jpg'];
var aniIndex = 0;
var intervalID;
var sector = "Full%20Disk";
var type = "01";
var timeStep = 1;
var numImages = 12;

function animationLoop(){
  intervalID = setInterval(function(){
    document.getElementById('image').src = gifImages[aniIndex]; //set image to next frame
    aniIndex = aniIndex + timeStep; //increase frame number
    if(aniIndex >= gifImages.length){ //if animation frame exceeds length of image array, reset to start
      aniIndex = Math.max(gifImages.length - (numImages * timeStep), 0); //reset to beginning
    }
  }, 83.333) //miliseconds between each frame
}

async function startAnimation(){
  gifImages = await getFiles("http://localhost:3000/filepath?sector=" + sector + "&type=" + type);
  //console.log(gifImages)
  aniIndex = Math.max(gifImages.length - (numImages * timeStep), 0); //set to frame 0
  clearInterval(intervalID) //stop any running animation loop processes
  animationLoop() //start animation
}

function pauseAnimation(){
  clearInterval(intervalID) //stop any running animation loop processes
}

function resumeAnimation(){
  clearInterval(intervalID) //stop any running animation loop processes
  animationLoop() //start animation loop
}

/*Get path to correct latest image*/
function imagePath() {
  var sectorString = "";
  var typeString = "";
  var sectorText = document.getElementById( id="sectorButton").innerText
  var typeText = document.getElementById( id="imageTypeButton").innerText
  if(typeText == "IR Band 1") typeString = "01/";
  if(typeText == "IR Band 2") typeString = "02/";
  if(typeText == "IR Band 3") typeString = "03/";
  if(typeText == "IR Band 4") typeString = "04/";
  if(typeText == "IR Band 5") typeString = "05/";
  if(typeText == "IR Band 6") typeString = "06/";
  if(typeText == "IR Band 7") typeString = "07/";
  if(typeText == "IR Band 8") typeString = "08/";
  if(typeText == "IR Band 9") typeString = "09/";
  if(typeText == "IR Band 10") typeString = "10/";
  if(typeText == "IR Band 11") typeString = "11/";
  if(typeText == "IR Band 12") typeString = "12/";
  if(typeText == "IR Band 13") typeString = "13/";
  if(typeText == "IR Band 14") typeString = "14/";
  if(typeText == "IR Band 15") typeString = "15/";
  if(typeText == "IR Band 16") typeString = "16/";
  if(typeText == "GeoColor") typeString = "GeoColor/";
  if(sectorText == "Continental U.S.") sectorString = "Conus/";
  if(sectorText == "Full Disk") sectorString = "Full Disk/";
  if(sectorText == "Meso M1") sectorString = "Meso/M1/";
  if(sectorText == "Meso M2") sectorString = "Meso/M2/";
  if(sectorString == "" || typeString == "") {
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

/*Options for sector selection*/
function sectorFunc(buttonNum) {
  var dropButt = document.getElementById("sectorButton");
  var text;
  clearInterval(intervalID);
  switch(buttonNum){
    case 1:
      text = document.getElementById( id="sector1Button").innerText;
      sector = "Conus"
      break;
    case 2:
      text = document.getElementById( id="sector2Button").innerText;
      sector = "Full%20Disk";
      break;
    case 3:
      text = document.getElementById( id="sector3Button").innerText;
      sector = "Meso/M1"
      break;
    case 4:
      text = document.getElementById( id="sector4Button").innerText;
      sector = "Meso/M2";
      break;
    case 5:
      text = document.getElementById( id="sector5Button").innerText;
      break;
    case 6:
      text = document.getElementById( id="sector6Button").innerText;
      break;
    case 7:
      text = document.getElementById( id="sector7Button").innerText;
      break;
    case 8:
      text = document.getElementById( id="sector8Button").innerText;
      break;
    case 9:
      text = document.getElementById( id="sector9Button").innerText;
      break;
    case 10:
      text = document.getElementById( id="sector10Button").innerText;
      break;
    case 11:
      text = document.getElementById( id="sector11Button").innerText;
      break;
    case 12:
      text = document.getElementById( id="sector12Button").innerText;
      break;  
    case 13:
      text = document.getElementById( id="sector13Button").innerText;
      break;
    case 14:
      text = document.getElementById( id="sector14Button").innerText;
      break; 
    case 15:
      text = document.getElementById( id="sector15Button").innerText;
      break; 
    case 16:
      text = document.getElementById( id="sector16Button").innerText;
      break;
    case 17:
      text = document.getElementById( id="sector17Button").innerText;
      break; 
    case 18:
      text = document.getElementById( id="sector18Button").innerText;
      break; 
    case 19:
      text = document.getElementById( id="sector19Button").innerText;
      break; 
    case 20:
      text = document.getElementById( id="sector20Button").innerText;
      break; 
    case 21:
      text = document.getElementById( id="sector21Button").innerText;
      break;
    case 22:
      text = document.getElementById( id="sector22Button").innerText;
      break; 
    case 23:
      text = document.getElementById( id="sector23Button").innerText;
      break; 
    case 24:
      text = document.getElementById( id="sector24Button").innerText;
      break; 
  }
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}

/*Options for image type selection*/
function typeFunc(buttonNum) {
  var dropButt = document.getElementById("imageTypeButton");
  var text;
  clearInterval(intervalID)
  console.log(buttonNum);
  switch(buttonNum){
    case 1:
      text = document.getElementById( id="type1Button").innerText;
      type = "01";
      break;
    case 2:
      text = document.getElementById( id="type2Button").innerText;
      type = "02";
      break;
    case 3:
      text = document.getElementById( id="type3Button").innerText;
      type = "03";
      break;
    case 4:
      text = document.getElementById( id="type4Button").innerText;
      type = "04";
      break;
    case 5:
      text = document.getElementById( id="type5Button").innerText;
      type = "05";
      break;
    case 6:
      text = document.getElementById( id="type6Button").innerText;
      type = "06";
      break;
    case 7:
      text = document.getElementById( id="type7Button").innerText;
      type = "07";
      break;
    case 8:
      text = document.getElementById( id="type8Button").innerText;
      type = "08";
      break;
    case 9:
      text = document.getElementById( id="type9Button").innerText;
      type = "09";
      break;
    case 10:
      text = document.getElementById( id="type10Button").innerText;
      type = "10";
      break;
    case 11:
      text = document.getElementById( id="type11Button").innerText;
      type = "11";
      break;
    case 12:
      text = document.getElementById( id="type12Button").innerText;
      type = "12";
      break;  
    case 13:
      text = document.getElementById( id="type13Button").innerText;
      type = "13";
      break;
    case 14:
      text = document.getElementById( id="type14Button").innerText;
      type = "14";
      break; 
    case 15:
      text = document.getElementById( id="type15Button").innerText;
      type = "15";
      break; 
    case 16:
      text = document.getElementById( id="type16Button").innerText;
      type = "16";
      break;
    case 17:
      text = document.getElementById( id="type17Button").innerText;
      type = "GeoColor";
      break; 
    case 18:
      text = document.getElementById( id="type18Button").innerText;
      break; 
    case 19:
      text = document.getElementById( id="type19Button").innerText;
      break; 
    case 20:
      text = document.getElementById( id="type20Button").innerText;
      break; 
    case 21:
      text = document.getElementById( id="type21Button").innerText;
      break;
    case 22:
      text = document.getElementById( id="type22Button").innerText;
      break; 
    case 23:
      text = document.getElementById( id="type23Button").innerText;
      break; 
    case 24:
      text = document.getElementById( id="type24Button").innerText;
      break; 
  }
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}

/*Options for number of images selection*/
function num(buttonNum) {
  var dropButt = document.getElementById("numImagesButton");
  var text;
  console.log(buttonNum);
  switch(buttonNum){
    case 1:
      text = document.getElementById( id="num1Button").innerText;
      break;
    case 2:
      text = document.getElementById( id="num2Button").innerText;
      break;
    case 3:
      text = document.getElementById( id="num3Button").innerText;
      break;
    case 4:
      text = document.getElementById( id="num4Button").innerText;
      break;
    case 5:
      text = document.getElementById( id="num5Button").innerText;
      break;
    case 6:
      text = document.getElementById( id="num6Button").innerText;
      break;
    case 7:
      text = document.getElementById( id="num7Button").innerText;
      break;
    case 8:
      text = document.getElementById( id="num8Button").innerText;
      break;
    case 9:
      text = document.getElementById( id="num9Button").innerText;
      break;
    case 10:
      text = document.getElementById( id="num10Button").innerText;
      break;
    case 11:
      text = document.getElementById( id="num11Button").innerText;
      break;
    case 12:
      text = document.getElementById( id="num12Button").innerText;
      break;  
  }
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    numImages = parseInt(text);
  }
}

/*Options for selecting the time step*/
function step(buttonNum) {
  var dropButt = document.getElementById("timeStepButton");
  var text;
  console.log(buttonNum);
  switch(buttonNum){
    case 1:
      text = document.getElementById( id="step1Button").innerText;
      timeStep = 1;
      break;
    case 2:
      text = document.getElementById( id="step2Button").innerText;
      timeStep = 2;
      break;
    case 3:
      text = document.getElementById( id="step3Button").innerText;
      timeStep = 3;
      break;
    case 4:
      text = document.getElementById( id="step4Button").innerText;
      timeStep = 4;
      break;
    case 5:
      text = document.getElementById( id="step5Button").innerText;
      timeStep = 5;
      break;
    case 6:
      text = document.getElementById( id="step6Button").innerText;
      timeStep = 6;
      break; 
  }
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
  }
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