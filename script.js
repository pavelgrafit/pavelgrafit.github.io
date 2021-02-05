var audio, context, analyser, src, array, logo;

let counter = 0;
let whatArray = 0;
let copyWhatArray = new Array();
let styleArray = new Array();
let checkBool = false;
let rectangles = new Array();

logo = document.getElementById("logo").style;
jaw = document.getElementById("jaw").style;
audio = document.getElementById("audio");
button = document.getElementById("button");

document.getElementById("bass__body").style.height = document.getElementById("home").style.height + 
document.getElementById("home").style.paddingTop + document.getElementById("home").style.paddingBottom - 
document.getElementById("header__body").style.height;

oldUserWidth = document.documentElement.clientWidth;
let newUserWidth;


for (let i = 1; i < 19; i++) {
    copyWhatArray.push(document.getElementById(("text__" + i.toString())).textContent);
}

for (let i = 1; i < 17; i++) {
    rectangles.push(document.getElementById(("rect__" + i.toString())).style);
}

for (let i = 1; i < 19; i++) {
    styleArray.push(document.getElementById(("text__" + i.toString())).style);
}

button.onclick = function(){
    if(!context){
        preparation();
    }
    if(audio.paused){
        audio.play();
        loop();
        button.value = "Stop a Magic";
    }else{
        audio.pause();
        button.value = "Start a Magic";
        window.requestAnimationFrame(pause);
    }
}

audio.onended = function() {
    button.value = "Start a Magic";
    window.requestAnimationFrame(end);
};

function pause() {
    logo.transform = "scale(1)";
    jaw.transform = "rotate(0deg)";
    for (let i = 0; i < 18; i++) {
        styleArray[i].opacity = 0;
    }
    for (let i = 0; i < 16; i++) {
        rectangles[i].height = "0px";
    }
}

function end() {
    logo.transform = "scale(1)";
    for (let i = 0; i < 18; i++) {
        styleArray[i].opacity = 0;
    }
    for (let i = 0; i < 16; i++) {
        rectangles[i].height = "0px";
    }
    counter = 0;
    whatArray= 0;
}

function preparation(){
    var AudioContext = window.AudioContext // Default
      || window.webkitAudioContext;// Safari and old versions of Chrome
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}


function loop(){
    if(!audio.paused){
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    if ((array[0]/160 > 1) && (array[0]/160 < 1.4)) 
    {
    	logo.transform = "scale(" + (array[0]/160).toString() + ")";
    }
    else {
    	logo.transform = "scale(1)";
    } 

    /*if ((array[0]/160 > 1) && (array[0]/160 < 1.4)) 
    {
        jaw.transform = "rotate(" + (-array[0]/10).toString() + "deg)";
    }
    else {
        jaw.transform = "rotate(0deg)";
    } */
    jaw.transform = "rotate(" + (-array[700]/10).toString() + "deg)";

    newUserWidth = document.documentElement.clientWidth;

    if (newUserWidth != oldUserWidth) {
        for(let i = 0; i < 16; i++) {
            styleArray[i].opacity = 0;
        }
        oldUserWidth = newUserWidth;
    }



    counter++;

    for (let i = 0; i < 16; i++) {
        let heightHelp = 0;
        for (let j = 0; j < 64; j++) {
            heightHelp = heightHelp + array[j + 64 * i];
        }
        if (document.documentElement.clientWidth > 829) 
        {
            heightHelp = 2 * heightHelp / 64 / 6;
        }
        else {
            heightHelp = heightHelp / 64 / 6;
        }
        
        rectangles[i].height = heightHelp.toString() + "px";
        }


    if (newUserWidth > 829) {
        if (counter < 250)
        {
            if (counter < 100)
            {
                styleArray[whatArray].opacity = counter/99;    
            }
            if ((counter < 150) && (counter > 99))
            {
                styleArray[whatArray].opacity = 1;
            }
            if (counter > 149) {
                styleArray[whatArray].opacity = 1 - (counter - 150)/99;   
            }
            
        }
        else {
            counter = 0;
            whatArray++;
            if (whatArray > 17) {
                whatArray = 0;
            }
        }
    }
    else {
        if (counter < 250)
        {
            if (counter < 100)
            {
                if (!checkBool) {
                    styleArray[3].opacity = counter/99;   
                    document.getElementById("text__4").innerHTML = copyWhatArray[whatArray];
                }
                else {
                    styleArray[12].opacity = counter/99;    
                    document.getElementById("text__13").innerHTML = copyWhatArray[whatArray];   
                }
            }
            if ((counter < 150) && (counter > 99))
            {
                if (!checkBool) {
                    styleArray[3].opacity = 1;   
                    document.getElementById("text__4").innerHTML = copyWhatArray[whatArray];
                }
                else {
                    styleArray[12].opacity = 1;   
                    document.getElementById("text__13").innerHTML = copyWhatArray[whatArray];   
                }
            }
            if (counter > 149) {   
                if (!checkBool) {
                    styleArray[3].opacity = 1 - (counter - 150)/99;   
                    document.getElementById("text__4").innerHTML = copyWhatArray[whatArray];
                }
                else {
                    styleArray[12].opacity = 1 - (counter - 150)/99;   
                    document.getElementById("text__13").innerHTML = copyWhatArray[whatArray];   
                }
            }
        }
        else {
            counter = 0;
            whatArray++;
            if (whatArray > 17) {
                whatArray = 0;
            }
            checkBool = !checkBool;
        }
    }
}

