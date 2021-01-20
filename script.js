var audio, context, analyser, src, array, logo;

logo = document.getElementById("logo").style;

audio = document.getElementById("audio");

button = document.getElementById("button");


/*if(!context){
    preparation();
}

if(!audio.paused)
{
	loop();
}*/

button.onclick = function(){
    if(!context){
        preparation();
    }
    if(audio.paused){
        audio.play();
        loop();
    }else{
        audio.pause();
    }
    if(button.value = "Start a Magic")
    {
    	button.value = "Stop a Magic"
    }
    else {
    	button.value = "Start a Magic"
    }
}

function preparation(){
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

/*    logo.height = (array[40])+"px";
    logo.width =  (array[40])+"px";*/
    if ((array[40]/150 > 1) && (array[40]/150 < 1.4)) 
    {
    	logo.transform = "scale(" + (array[40]/150).toString() + ")";
    }
    else {
    	logo.transform = "scale(1)";
    } 
}