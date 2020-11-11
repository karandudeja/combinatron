// the script to create the button effects, generate combinations etc.

console.log('CombinaTron by Karan Dudeja https://www.kdo.fyi/');

const bg = document.querySelector('#divBack');
const hT = document.querySelector('#tText');
const bT = document.querySelector('#bText');
const imgPlcVal = document.getElementById("imgPlc");
const hVal = document.getElementById("hDivider");

const btnAddColor = document.getElementById("addColorBtn");
const btnDelColor = document.getElementById("delColorBtn");
const colorListDiv = document.getElementById("colorsList");
const blankColorPickDiv = document.getElementById("colorsHolder");
const colorHolderDivText = document.getElementById("colorsHolderText");
const btnCombinatron = document.getElementById("btn-combinatron");
const renderIntro = document.getElementById("renderHereIntro");
const renderCombis = document.getElementById("renderHere");
const refreshTxt = document.getElementById("refText");
const inclElmTxt = document.getElementById("includeElementsText");
const inclColTxt = document.getElementById("includeColorsText");
const tSize = document.getElementById("titleSizes");
const pSize = document.getElementById("paraSizes");
const hSize = document.getElementById("horiSizes");
const sTxt = document.getElementById("smart-text");

let elements = 0;
let colorCount = 3;
let permuCount = colorCount * elements;
let colorArr = [];
let elementsArr = [];

let comboArr = [];
let myColorsArr = [];
var timerBtn;
var ratioRounded = 0;
var ratioRoundedBody = 0;
var ratioRoundedTitle = 0;

btnCombinatron.addEventListener('mouseover', ()=>{
    let btnCombinatronColorsArr = ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF'];
    let colorCounter = 0;
    if(btnCombinatron.disabled == false){
      timerBtn = setInterval(()=>{
          btnCombinatron.style.backgroundColor = btnCombinatronColorsArr[colorCounter];
          colorCounter++;
          if(colorCounter > btnCombinatronColorsArr.length-1){
              colorCounter = 0;
          }
      },200);
    }
});

btnCombinatron.addEventListener('mouseout', ()=>{
    clearInterval(timerBtn);
});

//background checkbox and Color checkings
bg.addEventListener('click', (event) => {
    //console.log('Background Chkbox clicked');
    checkStates();   
}, false);

//Title Text checkbox and Color checkings
hT.addEventListener('click', (event) => {
    //console.log('Title Text Chkbox clicked');
    checkStates();
    checkTitleState(); 
}, false);

//Body Text checkbox and Color checkings
bT.addEventListener('click', (event) => {
    //console.log('Paragraph Text Chkbox clicked');
    checkStates();
    checkParaState();  
}, false);

//Horizontal Divider Text checkbox and Color checkings
hVal.addEventListener('click', (event) => {
    //console.log('Horizontal Divider Chkbox clicked');
    checkStates();
    checkHoriState(); 
}, false);

//Image PlaceHolder checkbox and Color checkings
imgPlcVal.addEventListener('click', (event) => {
    //console.log('Image Placeholder Chkbox clicked');
    checkStates();   
}, false);

// making the color-input blocks
let colorCreatedCounter = -1; //was 0 earlier
let makeColsNumArr = [];
btnAddColor.addEventListener('click', (event) => {
  colorCreatedCounter++;
  checkStates();
  let newColor = createRandomColor();
  //console.log("newColor made is " + newColor);
  let colorPick = document.createElement("INPUT");
  colorPick.setAttribute('type', 'color');
  colorPick.setAttribute("id", "newColor"+colorCreatedCounter);
  colorPick.setAttribute("value", newColor);
  colorPick.setAttribute("class", "myColor");
  colorPick.style.display = "inline";
  colorPick.style.cursor = "pointer";
  colorPick.style.marginRight = "0.5em";
  blankColorPickDiv.appendChild(colorPick);
  makeColsNumArr.push(colorCreatedCounter);
  //console.log('makeColsNumArr has: ');
  //console.log(makeColsNumArr);
  return makeColsNumArr;
}, false);

function createRandomColor(){
  let colorArr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
  let colorString = "#";
  for(let i=0; i<6; i++){
    let randomColorIndex = Math.floor(Math.random() * colorArr.length);
    colorString+=colorArr[randomColorIndex];
  }
  return colorString;
}

// deleting the color-input blocks
btnDelColor.addEventListener('click', (event) => {
   let removeThis = document.getElementById(`newColor${makeColsNumArr.length-1}`);
   //console.log(removeThis);
   removeThis.remove();
   makeColsNumArr.pop();
   colorCreatedCounter--;
   checkStates();   
}, false);

// function checkStates; to check when to enable or disable the Activate CombinaTron Button
function checkStates(){
    if(colorCreatedCounter >= 0){
        btnDelColor.disabled = false;
        btnAddColor.disabled = false;
        colorHolderDivText.style.display = "none";
    }
    if(colorCreatedCounter < 0){
        btnDelColor.disabled = true;
        btnAddColor.disabled = false;
        colorHolderDivText.style.display = "block";
    }
    if(colorCreatedCounter > 4){
        btnAddColor.disabled = true;
    }
    if(colorCreatedCounter >= 1 && bg.checked == true){
        if(hT.checked == true || bT.checked == true || imgPlcVal.checked == true || hVal.checked == true){
            btnCombinatron.disabled = false;
        }
        else{
            btnCombinatron.disabled = true;
        }
    }
    if(colorCreatedCounter < 1 && bg.checked == true){
        if(hT.checked == true || bT.checked == true || imgPlcVal.checked == true || hVal.checked == true){
            btnCombinatron.disabled = true;
        }
    }
    if(bg.checked == false){
        btnCombinatron.disabled = true;
    }

    switch(colorCreatedCounter){
      case -1:
        sTxt.innerText = " add at least 2";
        break;
      case 0:
        sTxt.innerText = " add one more";
        break;
      case 1:
        sTxt.innerText = " good, more?";
        break;
      case 2:
        sTxt.innerText = "  yeah, more?";
        break;
      case 3:
        sTxt.innerText = " looks good!";
        break;
      case 4:
        sTxt.innerText = " much to handle";
        break;
      case 5:
        sTxt.innerText = " can't take further!";
        break;
    }
}

//checking when to activate the dropdown for sizes of headings
function checkTitleState(){
  if(hT.checked == true){
    tSize.disabled = false;
  }
  else{
    tSize.disabled = true;
  }
}

//checking when to activate the dropdown for sizes of paragraph text
function checkParaState(){
  if(bT.checked == true){
    pSize.disabled = false;
  }
  else{
    pSize.disabled = true;
  }
}

//checking when to activate the dropdown for sizes of horizontal slider
function checkHoriState(){
  if(hVal.checked == true){
    hSize.disabled = false;
  }
  else{
    hSize.disabled = true;
  }
}

//event on refresh text button
refreshTxt.addEventListener('click', (e) => {
  location.reload();
});


// event on the Activate Combinatron button
btnCombinatron.addEventListener('click', (e) => {
    e.preventDefault();
   
    if(bg.checked){
        elements++;
        elementsArr.push('bgSlct');
    }
    if(hT.checked){
        elements++;
        elementsArr.push('htSlct');
    }
    if(bT.checked){
        elements++;
        elementsArr.push('btSlct');
    }
    if(hVal.checked){
        elements++;
        elementsArr.push('hDvdrSlct');
    }

    //as on 25 July 2020
    let myColorsClassList = document.getElementsByClassName("myColor");
    for(let i = 0; i < myColorsClassList.length; i++){
	    myColorsArr.push(myColorsClassList[i].value);
    }
    //console.log(myColorsArr);

    //as of 24 July 2020
    //testArr = makeColsNumArr;
    //L = colorCreatedCounter;
    //Len = testArr.length;
    //console.log(`colorCreatedCounter Value is ${colorCreatedCounter}`);
    //console.log(`makeColorsNumArray is ${makeColsNumArr}`);
    //printPermutations(testArr, Len, L);
    //make2DArrays(permutationArr, L);

    let myColorsNumArray = makeColsNumArr;
    let arrLen = myColorsNumArray.length;
    //let myColsNum = colorCreatedCounter; //earlier had a '+ 1'
    let myColsNum = elements; //earlier it was the above
    //console.log(`printPermutations Fn is getting, myColsNumArray: ${myColorsNumArray} arrLen: ${arrLen} and myColsNum: ${myColsNum}`);
    printPermutations(myColorsNumArray, arrLen, myColsNum);
    //make2DArrays(myColsNumArray, myColsNum);
    //console.log('permutationArr is ' + permutationArr);
    //let ColorsPermuArray = cleaned2Darr(permutationArr, myColsNum);
    //console.log(ColorsPermuArray);
    //renderColorDivs(ColorsPermuArray);

    //as on 5 Oct 2020
    //console.log('all 2D arrays made are:');
    //console.log(make2DArrays(permutationArr, myColsNum));
    //console.log('all 2D arrays, now SORTED and CLEANED are:');
    //console.log(required2Darr(permutationArr, myColsNum));
    let ColorsPermuArray = required2Darr(permutationArr, myColsNum);
    //console.log(ColorsPermuArray);
    renderColorDivs(ColorsPermuArray);
});

//rendering the colored div-blocks as per the permutations
let combiInnerDiv;

function renderColorDivs(arr){
  let madeByJs = document.createElement("h3");
  madeByJs.innerHTML = "made with 💜 by Combinatorial 🔣Algorithms";
  renderIntro.appendChild(madeByJs);

  //activate tooltips with jQuery when rendering
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  let combinationNumber = 0;
  for(let i=0; i < arr.length; i++){
    let combiOuterDiv = document.createElement("div");
    combiOuterDiv.setAttribute("class", "col-sm-6 col-md-4 col-lg-3 m-0 p-2");
    
    combiInnerDiv = document.createElement("div");
    //combiInnerDiv.style.flex = "1 0 150px";
    //combiInnerDiv.style.margin = "1em";
    combiInnerDiv.style.padding = "2em";
    combiInnerDiv.style.border = "none";
    combiInnerDiv.style.borderRadius = "0.4rem";
    combiInnerDiv.style.minHeight = "21rem";
    combiInnerDiv.style.boxShadow = "0 2px 8px 0 rgba(0, 0, 0, 0.2)";

    combinationNumber = i+1;
    
    let combiHeading, combiBody, combiDvdr, combiImg;

    if(hT.checked==true){
        combiHeading = document.createElement(`${tSize.value}`);
        // if(i < 9 ){
        //   combiHeading.innerHTML = "Title Text: 0"+Number(i+1);
        // }
        // else{
        //   combiHeading.innerHTML = "Title Text: "+Number(i+1);
        // }
        combiHeading.innerHTML = "Title Text";
        combiHeading.setAttribute("class", "mb-3");
    }
    if(bT.checked==true){
        combiBody = document.createElement("p");
        combiBody.style.fontSize = `${pSize.value}`;
        combiBody.innerHTML = "Dummy Dummy Dummy Text. Sometimes on the internet, you can find awful examples of placeholder text.<br/><br/> Like this one used here, in a tiny design experiment by Karan Dudeja.";
    }
    if(hVal.checked==true){
        combiDvdr = document.createElement("div");
        combiDvdr.style.width = `${hSize.value}`;
        combiDvdr.style.height = "0.3em";
        combiDvdr.style.marginBottom = "1.1em";
    }
    if(imgPlcVal.checked==true){
        combiImg = document.createElement("div");
        //combiImg.src = "https://picsum.photos/200/300";
        combiImg.innerHTML = "<svg width='1.0625em' height='1em' viewBox='0 0 17 16' class='bi bi-image' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14.002 2h-12a1 1 0 0 0-1 1v9l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15.002 9.5V3a1 1 0 0 0-1-1zm-12-1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm4 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'/></svg>";
        combiImg.style.color = "#dddddd";
        combiImg.style.opacity = "0.3";
        combiImg.style.fontSize = "1.5em";
        combiImg.style.display = "flex";
        combiImg.style.justifyContent = "center";
        combiImg.style.alignItems = "center";
        combiImg.style.width = "100%";
        combiImg.style.height = "6em";
        combiImg.style.backgroundColor = "rgb(170,170,170)";
        combiImg.style.borderRadius = "0.2em";
        combiImg.style.marginBottom = "1.2em";
    }
    

    //case 1: Background & Image
    if(hT.checked==false && bT.checked==false && hVal.checked==false && imgPlcVal.checked==true){
      //console.log('////////////////////// iteration Number ' + i);
      //sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]]);
        for(let j=0; j < arr[i].length; j++){
            combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
            //console.log('coloring BG only with Image Placeholder');
        }
        //combiInnerDiv.appendChild(combiDvdr);
        //combiInnerDiv.appendChild(combiHeading);
        combiInnerDiv.appendChild(combiImg);
        //combiInnerDiv.appendChild(combiBody);
        combiOuterDiv.appendChild(combiInnerDiv);
    }

    //case 2: Background & Horizontal Ruler
    if(hT.checked==false && bT.checked==false && hVal.checked==true && imgPlcVal.checked==false){
        
        for(let j=0; j < arr[i].length; j++){
            combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
            combiDvdr.style.backgroundColor = myColorsArr[arr[i][1]];
            //console.log('coloring BG and Horizontal Divider ONLY');
        }
        combiInnerDiv.appendChild(combiDvdr);
        //combiInnerDiv.appendChild(combiHeading);
        //combiInnerDiv.appendChild(combiImg);
        //combiInnerDiv.appendChild(combiBody);
        combiOuterDiv.appendChild(combiInnerDiv);

        //NO NEED TO SHOW CONTRAST CHECKER
        //let contrastVal = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]]);
        //makeContrastIndicator(contrastVal, combinationNumber);
    }

    //case 3: Background & Horizontal Divider & Image
    if(hT.checked==false && bT.checked==false && hVal.checked==true && imgPlcVal.checked==true){
        
        for(let j=0; j < arr[i].length; j++){
            combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
            combiDvdr.style.backgroundColor = myColorsArr[arr[i][1]];
            //console.log('coloring BG only with Image Placeholder');
        }
        combiInnerDiv.appendChild(combiDvdr);
        //combiInnerDiv.appendChild(combiHeading);
        combiInnerDiv.appendChild(combiImg);
        //combiInnerDiv.appendChild(combiBody);
        combiOuterDiv.appendChild(combiInnerDiv);

        //NO NEED TO SHOW CONTRAST CHECKER
        //let contrastVal = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]]);
        //makeContrastIndicator(contrastVal, combinationNumber);
    }

    //case 4: Background & Body 
    if(hT.checked==false && bT.checked==true && hVal.checked==false && imgPlcVal.checked==false){
      
      for(let j=0; j < arr[i].length; j++){
          combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
          //combiHeading.style.color = myColorsArr[arr[i][1]];
          combiBody.style.color = myColorsArr[arr[i][1]];
          //console.log('coloring BG and ParaText ONLY');
      }
      //combiInnerDiv.appendChild(combiDvdr);
      //combiInnerDiv.appendChild(combiHeading);
      //combiInnerDiv.appendChild(combiImg);
      combiInnerDiv.appendChild(combiBody);
      combiOuterDiv.appendChild(combiInnerDiv);

      let contrastVal = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]], pSize.value);
      makeContrastIndicator(contrastVal, combinationNumber);
    }

    //case 5: Background & Heading 
    if(hT.checked==true && bT.checked==false && hVal.checked==false && imgPlcVal.checked==false){
      
      for(let j=0; j < arr[i].length; j++){
          combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
          combiHeading.style.color = myColorsArr[arr[i][1]];
          //combiBody.style.color = myColorsArr[arr[i][1]];
          //console.log('coloring BG and Heading ONLY');
      }
      //combiInnerDiv.appendChild(combiDvdr);
      combiInnerDiv.appendChild(combiHeading);
      //combiInnerDiv.appendChild(combiImg);
      //combiInnerDiv.appendChild(combiBody);
      combiOuterDiv.appendChild(combiInnerDiv);

      let contrastVal = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]], tSize.value);
      makeContrastIndicator(contrastVal, combinationNumber);
    }
    
    //case 6: Background & Heading & Body 
    if(hT.checked==true && bT.checked==true && hVal.checked==false && imgPlcVal.checked==false){
          
        for(let j=0; j < arr[i].length; j++){
            combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
            combiHeading.style.color = myColorsArr[arr[i][1]];
            combiBody.style.color = myColorsArr[arr[i][2]];
            //console.log('coloring BG, Heading and Para ONLY');
        }
        //combiInnerDiv.appendChild(combiDvdr);
        combiInnerDiv.appendChild(combiHeading);
        //combiInnerDiv.appendChild(combiImg);
        combiInnerDiv.appendChild(combiBody);
        combiOuterDiv.appendChild(combiInnerDiv);

        //let contrastVal = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]], 1, 1);
        let contrastValTitle = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]], tSize.value);
        let contrastValBody = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][2]], pSize.value);
        if(contrastValTitle == true && contrastValBody == true){
          makeContrastIndicator(true, combinationNumber);
        }
        if((contrastValTitle == true && contrastValBody == false) || (contrastValTitle == false && contrastValBody == true)){
          makeContrastIndicator(false, combinationNumber);
        }
        if(contrastValTitle == false && contrastValBody == false){
          makeContrastIndicator(false, combinationNumber);
        }
        //makeContrastIndicator(contrastVal, combinationNumber);
    }

    //case 7: Background & Heading & Body & Horizontal Divider
    if(hT.checked==true && bT.checked==true && hVal.checked==true && imgPlcVal.checked==false){
        
        for(let j=0; j < arr[i].length; j++){
            combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
            combiHeading.style.color = myColorsArr[arr[i][1]];
            combiBody.style.color = myColorsArr[arr[i][2]];
            combiDvdr.style.backgroundColor = myColorsArr[arr[i][3]];
            //console.log('coloring BG, Heading, Para and Horizontal Divider');
        }
        combiInnerDiv.appendChild(combiDvdr);
        combiInnerDiv.appendChild(combiHeading);
        //combiInnerDiv.appendChild(combiImg);
        combiInnerDiv.appendChild(combiBody);
        combiOuterDiv.appendChild(combiInnerDiv);

        let contrastValTitle = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]], tSize.value);
        let contrastValBody = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][2]], pSize.value);
        if(contrastValTitle == true && contrastValBody == true){
          makeContrastIndicator(true, combinationNumber);
        }
        if((contrastValTitle == true && contrastValBody == false) || (contrastValTitle == false && contrastValBody == true)){
          makeContrastIndicator(false, combinationNumber);
        }
        if(contrastValTitle == false && contrastValBody == false){
          makeContrastIndicator(false, combinationNumber);
        }
    }

    //case 8: Background & Heading & Horizontal Divider
    if(hT.checked==true && bT.checked==false && hVal.checked==true && imgPlcVal.checked==false){
       
      for(let j=0; j < arr[i].length; j++){
          combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
          combiHeading.style.color = myColorsArr[arr[i][1]];
          combiDvdr.style.backgroundColor = myColorsArr[arr[i][2]];
          //console.log('coloring BG, Heading and Horizontal Divider');
      }
      combiInnerDiv.appendChild(combiDvdr);
      combiInnerDiv.appendChild(combiHeading);
      //combiInnerDiv.appendChild(combiImg);
      //combiInnerDiv.appendChild(combiBody);
      combiOuterDiv.appendChild(combiInnerDiv);

      let contrastVal = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]], tSize.value);
      makeContrastIndicator(contrastVal, combinationNumber);
    }

    //case 9: Background & Heading & Horizontal Divider & Image
    if(hT.checked==true && bT.checked==false && hVal.checked==true && imgPlcVal.checked==true){
       
      for(let j=0; j < arr[i].length; j++){
          combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
          combiHeading.style.color = myColorsArr[arr[i][1]];
          combiDvdr.style.backgroundColor = myColorsArr[arr[i][2]];
          //console.log('coloring BG, Heading, Horizontal Divider and Image');
      }
      combiInnerDiv.appendChild(combiDvdr);
      combiInnerDiv.appendChild(combiHeading);
      combiInnerDiv.appendChild(combiImg);
      //combiInnerDiv.appendChild(combiBody);
      combiOuterDiv.appendChild(combiInnerDiv);

      let contrastVal = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]], tSize.value);
      makeContrastIndicator(contrastVal, combinationNumber);
    }

    //case 10: Background & Body & Horizontal Divider
    if(hT.checked==false && bT.checked==true && hVal.checked==true && imgPlcVal.checked==false){

      for(let j=0; j < arr[i].length; j++){
          combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
          combiDvdr.style.backgroundColor = myColorsArr[arr[i][1]];
          combiBody.style.color = myColorsArr[arr[i][2]];
          //console.log('coloring BG, Body and Horizontal Divider');
      }
      combiInnerDiv.appendChild(combiDvdr);
      //combiInnerDiv.appendChild(combiHeading);
      //combiInnerDiv.appendChild(combiImg);
      combiInnerDiv.appendChild(combiBody);
      combiOuterDiv.appendChild(combiInnerDiv);

      let contrastVal = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][2]], pSize.value);
      makeContrastIndicator(contrastVal, combinationNumber);
    }

    //case 11: Background & Body & Horizontal Divider & Image
    if(hT.checked==false && bT.checked==true && hVal.checked==true && imgPlcVal.checked==true){
       
      for(let j=0; j < arr[i].length; j++){
          combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
          combiBody.style.color = myColorsArr[arr[i][1]];
          combiDvdr.style.backgroundColor = myColorsArr[arr[i][2]];
          //console.log('coloring BG, Body, Horizontal Divider and Image');
      }
      combiInnerDiv.appendChild(combiDvdr);
      //combiInnerDiv.appendChild(combiHeading);
      combiInnerDiv.appendChild(combiImg);
      combiInnerDiv.appendChild(combiBody);
      combiOuterDiv.appendChild(combiInnerDiv);

      let contrastVal = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]], pSize.value);
      makeContrastIndicator(contrastVal, combinationNumber);
    }

    //case 12: Background & Heading & Body & Image
    if(hT.checked==true && bT.checked==true && hVal.checked==false && imgPlcVal.checked==true){
      
        for(let j=0; j < arr[i].length; j++){
            combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
            combiHeading.style.color = myColorsArr[arr[i][1]];
            combiBody.style.color = myColorsArr[arr[i][2]];
            //console.log('coloring BG, Heading, Para');
        }
        //combiInnerDiv.appendChild(combiDvdr);
        combiInnerDiv.appendChild(combiHeading);
        combiInnerDiv.appendChild(combiImg);
        combiInnerDiv.appendChild(combiBody);
        combiOuterDiv.appendChild(combiInnerDiv);

        let contrastValTitle = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]], tSize.value);
        let contrastValBody = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][2]], pSize.value);
        if(contrastValTitle == true && contrastValBody == true){
          makeContrastIndicator(true, combinationNumber);
        }
        if((contrastValTitle == true && contrastValBody == false) || (contrastValTitle == false && contrastValBody == true)){
          makeContrastIndicator(false, combinationNumber);
        }
        if(contrastValTitle == false && contrastValBody == false){
          makeContrastIndicator(false, combinationNumber);
        }
    }

    //case 13: Background & Heading & Image
    if(hT.checked==true && bT.checked==false && hVal.checked==false && imgPlcVal.checked==true){
      
      for(let j=0; j < arr[i].length; j++){
          combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
          combiHeading.style.color = myColorsArr[arr[i][1]];
          //console.log('coloring BG and Heading');
      }
      //combiInnerDiv.appendChild(combiDvdr);
      combiInnerDiv.appendChild(combiHeading);
      combiInnerDiv.appendChild(combiImg);
      //combiInnerDiv.appendChild(combiBody);
      combiOuterDiv.appendChild(combiInnerDiv);

      let contrastVal = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][2]], tSize.value);
      makeContrastIndicator(contrastVal, combinationNumber);
    }

    //case 14: Background & Body & Image
    if(hT.checked==false && bT.checked==true && hVal.checked==false && imgPlcVal.checked==true){

      for(let j=0; j < arr[i].length; j++){
          combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
          combiBody.style.color = myColorsArr[arr[i][1]];
          //console.log('coloring BG, Heading, Para');
      }
      //combiInnerDiv.appendChild(combiDvdr);
      //combiInnerDiv.appendChild(combiHeading);
      combiInnerDiv.appendChild(combiImg);
      combiInnerDiv.appendChild(combiBody);
      combiOuterDiv.appendChild(combiInnerDiv);

      let contrastVal = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]], pSize.value);
      makeContrastIndicator(contrastVal, combinationNumber);
  }

    //case 15: Background & Heading & Body & Horizontal Divider & Image
    if(hT.checked==true && bT.checked==true && hVal.checked==true && imgPlcVal.checked==true){

        for(let j=0; j < arr[i].length; j++){
            combiInnerDiv.style.backgroundColor = myColorsArr[arr[i][0]];
            combiHeading.style.color = myColorsArr[arr[i][1]];
            combiBody.style.color = myColorsArr[arr[i][2]];
            combiDvdr.style.backgroundColor = myColorsArr[arr[i][3]];
            //console.log('coloring BG, Heading, Para and Horizontal Divider and Image');
        }
        combiInnerDiv.appendChild(combiDvdr);
        combiInnerDiv.appendChild(combiHeading);
        combiInnerDiv.appendChild(combiImg);
        combiInnerDiv.appendChild(combiBody);
        combiOuterDiv.appendChild(combiInnerDiv);

        let contrastValTitle = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][1]], tSize.value);
        let contrastValBody = sendValuesForContrastCheck(myColorsArr[arr[i][0]], myColorsArr[arr[i][2]], pSize.value);
        if(contrastValTitle == true && contrastValBody == true){
          makeContrastIndicator(true, combinationNumber);
        }
        if((contrastValTitle == true && contrastValBody == false) || (contrastValTitle == false && contrastValBody == true)){
          makeContrastIndicator(false, combinationNumber);
        }
        if(contrastValTitle == false && contrastValBody == false){
          makeContrastIndicator(false, combinationNumber);
        }
    }

    renderCombis.appendChild(combiOuterDiv);
  }

  //disable things
  refreshTxt.style.visibility = "visible";
  bg.disabled = true;
  bT.disabled = true;
  hT.disabled = true;
  imgPlcVal.disabled = true;
  hVal.disabled = true;
  btnAddColor.disabled = true;
  btnDelColor.disabled = true;
  btnCombinatron.disabled = true;
  tSize.disabled = true;
  pSize.disabled = true;
  hSize.disabled = true;
  clearInterval(timerBtn);
  inclElmTxt.setAttribute("class", "text-muted");
  inclColTxt.setAttribute("class", "text-muted");

  //window.scrollBy(0, 100);
  window.scrollBy({
    top: 270,
    left: 0,
    behavior: 'smooth'
  });
}


//code as per https://www.geeksforgeeks.org/print-all-the-permutation-of-length-l-using-the-elements-of-an-array-iterative/?ref=rp
//This code is contributed by Mohit Kumar

//driver code
let testArr = [];
let Len = testArr.length;
let L = 1;
let permutationArr = [];

function convertToLengthBase(n, arr, Len, L){
	for (let i = 0; i < L; i++){
		// Print the ith element of sequence 
    permutationArr.push(arr[n % Len]);
    //n /= Len;
    n = Math.floor(n/Len);
  }
}

// Print all the permuataions 
function printPermutations(arr, Len, L) 
{ 
    // There can be (len)^l permutations 
    for(let i = 0;  i < Math.pow(Len, L); i++)  
    { 
        // Convert i to len th base 
        convertToLengthBase(i, arr, Len, L);  
    } 
} 

// function call  will make Len to-power-of L permutations
//printPermutations(testArr, Len, L);

function make2DArrays(a, l){
  let new2Darr = []; //new2Darr[i] = new Array(l)

  for(let i=0; i < (a.length/l) ; i++){
    new2Darr[i] = new Array(l);
  }

  for(let i=0; i < a.length; i++){
    new2Darr[Math.floor(i/l)][i%l] = a[i];
  }

  return new2Darr;
}


function cleaned2Darr(arr, Num){
  let dirty = make2DArrays(arr, Num);
  let clean = [];
  let tempArr = []; 
  for(let item of dirty){
    tempArr.push([...new Set(item)]);
  }
  for(let items of tempArr){
    if(items.length === Num){
      clean.push(items);
    }
  }
  return clean;
}


//as on 5 Oct 2020, making a new function to delete from 2 arrays
function required2Darr(arr, Num){
  let allValuesArr = make2DArrays(arr, Num);
  let requiredArr = [];
  let xTempArr = allValuesArr.sort(sortFunction);
  
  for(let i = xTempArr.length-1 ; i >= 0 ; i--){
    for(let j = 1 ; j < xTempArr[i].length ; j++){
      if(xTempArr[i][j] === xTempArr[i][0]){
        xTempArr.splice(i, 1);
        break;
      }
    }
  }

  requiredArr = xTempArr;
  return requiredArr;
}

function sortFunction(a, b) {
  if (a[0] === b[0]) {
      return 0;
  }
  else {
      return (a[0] < b[0]) ? -1 : 1;
  }
}


// as on 26 Oct 2020
// adding contrast checker functionality
let bG, fG;

let sendValuesForContrastCheck = (bGin, fGin, textVal) => {
    //console.log('/////// running contrast checker ///////');
    bG = bGin;
    fG = fGin;
    //console.log(`Background color is ${bG}`);
    //console.log(`Foreground color is ${fG}`);

    // Get RGBA
    let backgroundR = hexToRgb(bG).r;
    let backgroundG = hexToRgb(bG).g;
    let backgroundB = hexToRgb(bG).b;
    let backgroundColorRgba = ["" + backgroundR + "","" + backgroundG + "","" + backgroundB + "","1"];

    let foregroundR = hexToRgb(fG).r;
    let foregroundG = hexToRgb(fG).g;
    let foregroundB = hexToRgb(fG).b;
    let foregroundColorRgba = ["" + foregroundR + "","" + foregroundG + "","" + foregroundB + "","0"];

    //console.log(`Background color RGB is ${backgroundColorRgba}`);
    //console.log(`Foreground color RGB is ${foregroundColorRgba}`);

    let backgroundLuma = luma(backgroundColorRgba);
    let foregroundLuma = luma(foregroundColorRgba);

    //console.log(`Background color Relative Luminance is ${backgroundLuma}`);
    //console.log(`Foreground color Relative Luminance is ${foregroundLuma}`);

    function checkContrast() {
        foregroundLuma = foregroundLuma + 0.05;
        backgroundLuma = backgroundLuma + 0.05;
    
        if (backgroundLuma < foregroundLuma) {
          return foregroundLuma / backgroundLuma;
        } else {
          return backgroundLuma / foregroundLuma;
        }
    }

    var ratio = checkContrast();
    //console.log(`Contrast ratio is ${ratio}`);

    ratioRounded = ratio.toFixed(2);

    function checkRating(value) {
        if (ratioRounded > value) {
          return true;
        }
        else {
          return false;
        }
    }
    
    var aaHeadline = checkRating(3); //check this for h1,h2 ... check this for h3,h4 
    var aaaHeadline = checkRating(4.5); //check this for h5,h6
    var aaLargeText = checkRating(3); //check this for 18px and 20px
    var aaText = checkRating(4.5); // check this for 14px and 16px
    var aaaText = checkRating(7); // 
    var aaComponent = checkRating(3);

    // let bodyTextContrastValue = false;
    // let titleTextContrastValue = false;
    // let bodyTextSize = 0;
    // let titleTextSize = 0;

    if(textVal == 'h1' || textVal == 'h2'){
      ratioRoundedTitle = ratioRounded;
      return aaHeadline;
    }
    else if(textVal == 'h3' || textVal == 'h4'){
      ratioRoundedTitle = ratioRounded;
      return aaHeadline;
    }
    else if(textVal == 'h5' || textVal == 'h6'){
      ratioRoundedTitle = ratioRounded;
      return aaaHeadline;
    }
    else if(textVal == '14px' || textVal == '16px'){
      ratioRoundedBody = ratioRounded;
      return aaText;
    }
    else if(textVal == '18px' || textVal == '20px'){
      ratioRoundedBody = ratioRounded;
      return aaLargeText;
    }


    //console.log("Contrast: " + ratio);
    // console.log("Rounded Contrast: " + ratioRounded);
    // console.log("AA Headline: " + aaHeadline);
    // console.log("AAA Headline: " + aaaHeadline);
    // console.log("AA Text: " + aaText);
    // console.log("AAA Text: " + aaaText);
    // console.log("AA Component: " + aaComponent);
    //console.log("Foreground Luma: " + foregroundLuma);
    //console.log("Background Luma: " + backgroundLuma);
  
    // if(aaText == false){
    //     show_results.innerHTML = "Bad";
    //     show_results.style.color = '#e60000';
    // }
    // else{
    //     show_results.innerHTML = "Good";
    //     show_results.style.color = "teal";
    // }
    // // show_results_div.appendChild(show_results);
    // // combiInnerDiv.appendChild(show_results_div);
    // //resultsDiv.appendChild(show_ratio);
    // //resultsDiv.appendChild(show_results);
    // console.log(ratioRounded + "/1");
    //return aaText;
};

// Hex to RGB
function hexToRgb(hex) {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

function luma(rgbaColor) {
    for (let i = 0; i < 3; i++) {
      let rgb = rgbaColor[i];
      rgb /= 255;
      rgb = rgb < .03928 ? rgb / 12.92 : Math.pow((rgb + .055) / 1.055, 2.4);
      rgbaColor[i] = rgb;
    }
    return .2126 * rgbaColor[0] + .7152 * rgbaColor[1] + 0.0722 * rgbaColor[2];
}


function makeContrastIndicator(score, combiNumb){
    let show_results_div = document.createElement('div');
    show_results_div.style.padding = '0.3em 0.55em';
    show_results_div.style.border = '1px solid #444444';
    show_results_div.style.borderRadius = '0.25em';
    // show_results_div.style.backgroundColor = '#ffffff';
    show_results_div.style.position = 'absolute';
    show_results_div.style.right = '1em';
    show_results_div.style.bottom = '1em';
    show_results_div.style.cursor = 'pointer';
    show_results_div.style.opacity = '0.4';
    show_results_div.setAttribute("class", "test");
    show_results_div.setAttribute("data-toggle", "tooltip");
    show_results_div.setAttribute("data-placement", "top");
    let contrastText = "Contrast Ratio: ";
    ratioRounded += "/1";
    //BodyText only
    if(bT.checked == true && hT.checked == false){
      show_results_div.setAttribute("title", contrastText+ "Body Text = "+ratioRoundedBody+"/1");
    }
    if(bT.checked == false && hT.checked == true){
      show_results_div.setAttribute("title", contrastText+ "Title Text = "+ratioRoundedTitle+"/1");
    }
    if(bT.checked == true && hT.checked == true){
      show_results_div.setAttribute("title", contrastText+ "Title Text = "+ratioRoundedTitle+"/1" + ", Body Text = "+ratioRoundedBody+"/1");
    }
    //(if)Title only
    //(if)Title and Body
    //show_results_div.setAttribute("title", contrastText+ratioRounded);
    //$('[data-toggle="tooltip"]').css("backgroundColor","#f00"); 
    //$('.tooltip-inner.tooltip.top').css("backgroundColor","#f00"); 
    let show_results = document.createElement('p');
    show_results.style.margin = '0';
    show_results.style.fontWeight = '600';
    show_results.style.fontSize = '0.8em';
    show_results.style.cursor = 'pointer';
    show_results.style.backgroundColor = "transparent";
    show_results.style.color = 'white';

    let show_results_num = document.createElement('span');
    show_results_num.style.textDecoration = 'underline';
    let show_results_sign = document.createElement('span');
    show_results_sign.style.color = 'white';

    //when results are BAD
    if(score == false){
      //show_results.innerHTML = combiNumb + ':<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-hand-thumbs-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="nonzero" d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28v1c.563 0 .901.272 1.066.56.086.15.121.3.121.416 0 .12-.035.165-.04.17l-.354.353.353.354c.202.202.407.512.505.805.104.312.043.44-.005.488l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.415-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.353.352.373.714.267 1.021-.122.35-.396.593-.571.651-.653.218-1.447.224-2.11.164a8.907 8.907 0 0 1-1.094-.17l-.014-.004H9.62a.5.5 0 0 0-.595.643 8.34 8.34 0 0 1 .145 4.725c-.03.112-.128.215-.288.255l-.262.066c-.306.076-.642-.156-.667-.519-.075-1.081-.239-2.15-.482-2.85-.174-.502-.603-1.267-1.238-1.977C5.597 8.926 4.715 8.23 3.62 7.93 3.226 7.823 3 7.534 3 7.28V3.279c0-.26.22-.515.553-.55 1.293-.138 1.936-.53 2.491-.869l.04-.024c.27-.165.495-.296.776-.393.277-.096.63-.163 1.14-.163h3.5v-1H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/></svg>';
      show_results_num.innerText = combiNumb;
      show_results_sign.innerHTML = ' : <svg width="1em" height="1em" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-down" class="svg-inline--fa fa-thumbs-down fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z"></path></svg>';
      show_results_div.style.backgroundColor = '#bf212f';
    }
    //when results are GOOD
    else{
      //show_results.innerHTML = combiNumb + ':<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-hand-thumbs-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="nonzero" d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/></svg>';
      show_results_num.innerText = combiNumb;
      show_results_sign.innerHTML = ' : <svg width="1em" height="1em" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-up" class="svg-inline--fa fa-thumbs-up fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"></path></svg>';
      show_results_div.style.backgroundColor = '#006f3c';
    }
    show_results.appendChild(show_results_num);
    show_results.appendChild(show_results_sign);
    show_results_div.appendChild(show_results);
    combiInnerDiv.appendChild(show_results_div);

    show_results_div.addEventListener('mouseover', ()=>{
      show_results_div.style.opacity = '1.0';
      show_results_div.style.transition= "opacity 0.2s ease-in";
    });
  
    show_results_div.addEventListener('mouseout', ()=>{
      show_results_div.style.opacity = '0.6';
      show_results_div.style.transition= "opacity 0.2s ease-out";
    });
}



////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////


// // recursively prints combinations of a linked list of valid digits
// // for an N digit combination
// // https://medium.com/@edatrero_34414/print-all-permutation-of-an-n-digit-combination-lock-ca19615dedae
// // Runtime complexity is O(a1 * a2 * a3 ... * an), where ai is of the number of valid digits of the ith digit
// function printCombinations( prefix, node ){
//   if(!node.next){
//     node.digits.map(function(n){
//         if(Number(prefix) !== n){
//           console.log(prefix + n);
//           comboArr.push(prefix + n);
//         }
//           //console.log(prefix + n);
//     })
//   } 
//   else {
//     node.digits.map(function(n){
//       printCombinations(prefix + n, node.next);
//     })
//   }
// }

// let digit1_bG = { digits: [0,1,2], next: null };
// let digit2_hText = { digits: [0,1,2], next: null };
// let digit3_bText = { digits: [0,1,2], next: null };

// digit1_bG.next = digit2_hText;
// digit2_hText.next = null;


// function makeDivs(){
//   // let splitVals = comboArr.split('');
//   // console.log(splitVals);

//     for(let i=0; i<comboArr.length; i++){
//       let btn = document.createElement("BUTTON");
//       btn.innerHTML = "Made by JS";
//       btn.style.width = '200px';
//       btn.style.height = '60px';
//       btn.style.borderRadius = '50px';
//       btn.style.border = 'none';
//       btn.style.margin = '2em';
//       let btnBgColor = colorArr[Number(comboArr[i].charAt(0))];
//       let btnTextColor = colorArr[Number(comboArr[i].charAt(1))];
//       btn.style.backgroundColor = btnBgColor;
//       //console.log(colorArr[Number(comboArr[1].charAt(1))]);
//       btn.style.color = btnTextColor;
//       document.body.appendChild(btn);
//     }
// }


// //code as per the LeetCode Permutations for an array of values
// //https://www.youtube.com/watch?v=KukNnoN-SoY
// let leetCodePermutations = (nums, set=[], answers=[]) => {
//   if(!nums.length){
//     answers.push([...set]);
//   }
//   for(let i=0; i < nums.length; i++){
//       const newNums = nums.filter((n, index) => index !== i);
//       set.push(nums[i]);
//       leetCodePermutations(newNums, set, answers);
//       set.pop();
//   }
//   return answers;
// }


// ///////////////////////////
// /////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////



// // there's the 'no. of places' and 'possible values in those places'
// // as per the above 2 loops?
// // or 2 loops for the above + loops(equal to the numbers of places)?
// // [[0,1,2],[0,1,3],[0,2,3],[0,2,1],]



// // let firstColor = colorArr[i];
// //     let remainingColors = colorArr.slice(0, i) + colorArr.slice(i + 1, colorArr.length);
// //     for (let permutation of findPermutations(remainingColors)){
// //         permutationsArray.push(firstColor + permutation) 
// //     }



// let div1 = new Map();
// div1.set('bg','white');
// div1.set('headTxt','black');
// div1.set('bodyTxt','black');
// div1.set('btn','red');

// //console.log(div1);

// /* i need to have  a data-structure like this
// div1 = {
//     bg : "white",
//     heading : "black",
//     body : "black",
//     button : "red"
// }
// div2 = {
//     bg : "white",
//     heading : "red",
//     body : "red",
//     button : "black"
// }
// div3 = {
//     bg : "black",
//     heading : "red",
//     body : "red",
//     button : "white"
// }
// div4 = {
//     bg : "black",
//     heading : "white",
//     body : "white",
//     button : "red"
// }
// ... etc.

// the algo should produce a sequence like
// 1,2,2,3
// 1,3,3,2
// 2,1,1,3
// 2,3,3,1
// 3,1,1,2
// 3,2,2,1
// */
