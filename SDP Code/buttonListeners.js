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
  if(typeText == "IR Band 11") typeString = "1/";
  if(typeText == "IR Band 12") typeString = "12/";
  if(typeText == "IR Band 13") typeString = "13/";
  if(typeText == "IR Band 14") typeString = "14/";
  if(typeText == "IR Band 15") typeString = "15/";
  if(typeText == "IR Band 16") typeString = "16/";
  if(sectorText == "Continental U.S.") sectorString = "Conus/";
  if(sectorText == "Full Disk") sectorString = "Full Disk/";
  if(sectorText == "M1") sectorString = "Meso/M1/";
  if(sectorText == "M2") sectorString = "Meso/M2/";
  if(sectorString == "" || typeString == "") {
    sectorString = "";
    typeString = "";
  }
  return "../Sample Images/" + sectorString + typeString + "latest.jpg";
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
function sector1() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector1Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector2() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector2Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector3() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector3Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector4() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector4Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector5() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector5Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector6() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector6Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector7() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector7Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector8() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector8Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector9() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector9Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector10() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector10Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector11() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector11Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector12() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector12Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector13() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector13Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector14() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector14Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector15() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector15Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector16() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector16Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector17() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector17Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector18() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector18Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector19() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector19Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector20() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector20Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector21() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector21Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector22() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector22Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector23() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector23Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function sector24() {
  var dropButt = document.getElementById("sectorButton");
  var text = document.getElementById( id="sector24Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}

/*Options for image type selection*/
function type1() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type1Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type2() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type2Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type3() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type3Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type4() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type4Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type5() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type5Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type6() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type6Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type7() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type7Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type8() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type8Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type9() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type9Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type10() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type10Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type11() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type11Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type12() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type12Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type13() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type13Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type14() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type14Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type15() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type15Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type16() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type16Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type17() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type17Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type18() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type18Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type19() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type19Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type20() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type20Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type21() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type21Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type22() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type22Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type23() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type23Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function type24() {
  var dropButt = document.getElementById("imageTypeButton");
  var text = document.getElementById( id="type24Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}

/*Options for number of images selection*/
function num1() {
  var dropButt = document.getElementById("numImagesButton");
  var text = document.getElementById( id="num1Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function num2() {
  var dropButt = document.getElementById("numImagesButton");
  var text = document.getElementById( id="num2Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function num3() {
  var dropButt = document.getElementById("numImagesButton");
  var text = document.getElementById( id="num3Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function num4() {
  var dropButt = document.getElementById("numImagesButton");
  var text = document.getElementById( id="num4Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function num5() {
  var dropButt = document.getElementById("numImagesButton");
  var text = document.getElementById( id="num5Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function num6() {
  var dropButt = document.getElementById("numImagesButton");
  var text = document.getElementById( id="num6Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function num7() {
  var dropButt = document.getElementById("numImagesButton");
  var text = document.getElementById( id="num7Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function num8() {
  var dropButt = document.getElementById("numImagesButton");
  var text = document.getElementById( id="num8Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function num9() {
  var dropButt = document.getElementById("numImagesButton");
  var text = document.getElementById( id="num9Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function num10() {
  var dropButt = document.getElementById("numImagesButton");
  var text = document.getElementById( id="num10Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function num11() {
  var dropButt = document.getElementById("numImagesButton");
  var text = document.getElementById( id="num11Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function num12() {
  var dropButt = document.getElementById("numImagesButton");
  var text = document.getElementById( id="num12Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}

/*Options for selecting the time step*/
function step1() {
  var dropButt = document.getElementById("timeStepButton");
  var text = document.getElementById( id="step1Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function step2() {
  var dropButt = document.getElementById("timeStepButton");
  var text = document.getElementById( id="step2Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function step3() {
  var dropButt = document.getElementById("timeStepButton");
  var text = document.getElementById( id="step3Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function step4() {
  var dropButt = document.getElementById("timeStepButton");
  var text = document.getElementById( id="step4Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function step5() {
  var dropButt = document.getElementById("timeStepButton");
  var text = document.getElementById( id="step5Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
  }
}
function step6() {
  var dropButt = document.getElementById("timeStepButton");
  var text = document.getElementById( id="step6Button").innerText
  if(dropButt.innerText != text) {
    dropButt.innerText = text;
    document.getElementById(id = "image").src = imagePath();
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