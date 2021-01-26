var audio, context, analyser, src, array, logo;

let counter = 0;
let whatArray = 0;
let copyWhatArray = 0;
let styleArray = new Array();
let isEnded = 0;
let checkBool = false;

console.log( document.documentElement.clientWidth );

textArray = new Array();
copyWhatArray = new Array();

for (let i = 1; i < 19; i++) {
    textArray.push(document.getElementById(("text__" + i.toString())).innerHTML);
    copyWhatArray.push(document.getElementById(("text__" + i.toString())).textContent);
}

logo = document.getElementById("logo").style;

audio = document.getElementById("audio");

button = document.getElementById("button");

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
    }
}

audio.onended = function() {
    button.value = "Start a Magic";
    isEnded = 1;
    window.requestAnimationFrame(end);
};

function end() {
    if (isEnded) {
        for (let i = 0; i < 18; i++) {
            styleArray[i].opacity = 0;
        }
    }
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



function replace3() {
    textArray[3] = copyWhatArray[whatArray];
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

    counter++;
    
    


    if (document.documentElement.clientWidth > 829) {
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
            textArray[3] = "hueta";
            textArray[12] = "hui";
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

