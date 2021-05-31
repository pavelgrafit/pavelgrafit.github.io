var signalFreq = document.getElementById("signalFreq");
var signalHtmlGain = document.getElementById("signalGain");
var signalHtmlType = document.getElementById("signalType");

var filterHtmlFreq = document.getElementById("filterFreq");
var filterHtmlGain = document.getElementById("filterGain");
var filterHtmlQ = document.getElementById("filterQ");
var filterHtmlType = document.getElementById("filterType");

var audioCtx;
var oscillator;
var signalGain;
var analyserArray = [];

audioCtx = new (window.AudioContext || window.webkitAudioContext)();
for (let i = 0; i < 2; i++) {
    analyserArray.push(audioCtx.createAnalyser());
    analyserArray[i].fftSize = 256;
}


var freqValueArr = [];
var QValueArr = [];
var gainValueArr = [];
freqValueArr.push(document.getElementById('freqValue__0'));
QValueArr.push(document.getElementById('QValue__0'));
gainValueArr.push(document.getElementById('gainValue__0'));

var filtersType = [];
var filtersFreq = [];
var filtersGain = [];
var filtersQ = [];
filtersType.push(document.getElementById('filterType__0'));
filtersFreq.push(document.getElementById('filterFreq__0'));
filtersGain.push(document.getElementById('filterGain__0'));
filtersQ.push(document.getElementById('filterQ__0'));

let filters = [];
filters.push(audioCtx.createBiquadFilter());
filters[0].type = filtersType[0].value; 
filters[0].frequency.value = filtersFreq[0].value;
filters[0].gain.value = filtersGain[0].value;
filters[0].Q.value = filtersQ[0].value / 1000;
filtersGain[0].disabled = false;
filtersQ[0].disabled = true;





let htmlFilters = document.getElementById('filters');
let filterArray = [];
filterArray.push(document.getElementById('filter__0'));

addFilter = document.getElementById('addFilter');
addFilter.onclick = function() {
    
    filterArray.push(document.createElement('div'));
    filterArray[filterArray.length - 1].className = 'filter__settings';
    filterArray[filterArray.length - 1].id = "filter__" + (filterArray.length - 1).toString();
    filterArray[filterArray.length - 1].innerHTML = 
    "<div class=filter__settings__item>" +
        "<label for=filterType>Тип</label>" +
        "<select name=filterType id=filterType__" + (filterArray.length - 1).toString() + " size=1>" +
            "<option value=lowpass>Lowpass</option>" +
            "<option value=highpass>Highpass</option>" +
            "<option value=bandpass>Bandpass</option>" +
            "<option value=lowshelf selected>Lowshelf</option>" +
            "<option value=highshelf>Highshelf</option>" +
            "<option value=peaking>Peaking</option>" +
            "<option value=notch>Notch</option>" +
        "</select>" +
    "</div>" +
    "<div class=filter__settings__item>" +
        "<label for=signalFreq>Частота</label>" +
        "<p class=value id=freqValue__" + (filterArray.length - 1).toString() + ">Значение: 50</p>" +
        "<input type=range name=filter__freq id=filterFreq__" + (filterArray.length - 1).toString() + " min=0 max=1000 value=50>" +
        "<div class=range>" +
            "<p>0</p>" +
            "<p>1000</p>" +
        "</div>" +
    "</div>" +
    "<div class=filter__settings__item>" +
        "<label for=filterQ>Добротность</label>" +
        "<p class=value id=QValue__" + (filterArray.length - 1).toString() + ">Значение: 0.001</p>" +
        "<input type=range name=filter__Q id=filterQ__" + (filterArray.length - 1).toString() + " min=1 max=10000 value=1>" +
        "<div class=range>" +
            "<p>0.001</p>" +
            "<p>10</p>" +
        "</div>" +
    "</div>" +
    "<div class=filter__settings__item>" +
        "<label for=signalGain>Коэффициент усиления</label>" +
        "<p class=value id=gainValue__" + (filterArray.length - 1).toString() + ">Значение: 0</p>" +
        "<input type=range name=filter__gain id=filterGain__" + (filterArray.length - 1).toString() + " min=-40 max=40 value=0>" +
        "<div class=range>" +
            "<p>-40</p>" +
            "<p>40</p>" +
        "</div>" +
    "</div>";


























    htmlFilters.append(filterArray[filterArray.length - 1]);

    filtersType.push(document.getElementById('filterType__' + (filterArray.length - 1).toString()));
    filtersFreq.push(document.getElementById('filterFreq__' + (filterArray.length - 1).toString()));
    filtersGain.push(document.getElementById('filterGain__' + (filterArray.length - 1).toString()));
    filtersQ.push(document.getElementById('filterQ__' + (filterArray.length - 1).toString()));
    
    filters.push(audioCtx.createBiquadFilter());
    filters[filters.length - 1].type = filtersType[filters.length - 1].value; 
    filters[filters.length - 1].frequency.value = filtersFreq[filters.length - 1].value;
    filters[filters.length - 1].gain.value = filtersGain[filters.length - 1].value;
    filters[filters.length - 1].Q.value = filtersQ[filters.length - 1].value / 10000;

    filterListener();

    if (filters.length == 1) {
        analyserArray[0].disconnect(analyserArray[1]);
        analyserArray[0].connect(filters[filters.length - 1]);
        filters[filters.length - 1].connect(analyserArray[1])
    } else {
        filters[filters.length - 2].disconnect(analyserArray[1]);
        filters[filters.length - 2].connect(filters[filters.length - 1]);
        filters[filters.length - 1].connect(analyserArray[1]);
    }
    filtersGain[filters.length - 1].disabled = false;
    filtersQ[filters.length - 1].disabled = true;

    freqValueArr.push(document.getElementById('freqValue__' + (filterArray.length - 1).toString()));
    QValueArr.push(document.getElementById('QValue__' + (filterArray.length - 1).toString()));
    gainValueArr.push(document.getElementById('gainValue__' + (filterArray.length - 1).toString()));
    
}




deleteFilter = document.getElementById('deleteFilter');
deleteFilter.onclick = function() {
    if (filters.length > 0) {
        if (filters.length == 1) {
            analyserArray[0].disconnect(filters[filters.length - 1]);
            filters[filters.length - 1].disconnect(analyserArray[1]);
            analyserArray[0].connect(analyserArray[1]);
        } else {
            filters[filters.length - 2].disconnect(filters[filters.length - 1]);
            filters[filters.length - 1].disconnect(analyserArray[1]);
            filters[filters.length - 2].connect(analyserArray[1]);
        }

        filterArray[filterArray.length - 1].remove();
        filterArray.pop();
        filtersType.pop();
        filtersFreq.pop();
        filtersGain.pop();
        filtersQ.pop();
        filters.pop();
    }
}




var descrHelp = document.getElementById("descrHelp");
freqHelp = document.getElementById("freqHelp");
gainHelp = document.getElementById("gainHelp");
QHelp = document.getElementById("QHelp");

function changeHelp(type) {
    switch(type) {
        case 'lowpass':
            descrHelp.innerHTML = 'Стандартный резонансный фильтр нижних частот второго порядка со спадом 12 дБ/октава. Частоты ниже частоты среза проходят, а частоты выше — ослабляются';
            freqHelp.innerHTML = 'Частота среза';
            gainHelp.innerHTML = 'Не используется';
            QHelp.innerHTML = 'Величина пика около частоты среза. Чем больше значение, тем больше пик';
            break;
        case 'highpass':
            descrHelp.innerHTML = 'Стандартный резонансный фильтр верхних частот второго порядка со спадом 12 дБ/октава. Частоты ниже частоты среза ослабляются, а частоты выше — проходят';
            freqHelp.innerHTML = 'Частота среза';
            gainHelp.innerHTML = 'Не используется';
            QHelp.innerHTML = 'Величина пика около частоты среза. Чем больше значение, тем больше пик';
            break;
        case 'bandpass':
            descrHelp.innerHTML = 'Стандартный полосовой фильтр второго порядка. Частоты вне заданного диапазона частот ослабляются, а частоты внутри — проходят';
            freqHelp.innerHTML = 'Центр диапазона частот';
            gainHelp.innerHTML = 'Не используется';
            QHelp.innerHTML = 'Ширина полосы частот. Чем больше значение, тем меньше полоса частот';
            break;
        case 'lowshelf':
            descrHelp.innerHTML = 'Стандартный низкочастотный шельфовый фильтр второго порядка. Частоты ниже заданной частоты получают усиление или ослабление, а частоты выше — не изменяются';
            freqHelp.innerHTML = 'Верхний предел частот, получающих усиление или ослабление';
            gainHelp.innerHTML = 'Применяемое усиление (ослабление при отрицательном значении) в дБ';
            QHelp.innerHTML = 'Не используется';
            break;
        case 'highshelf':
            descrHelp.innerHTML = 'Стандартный высокочастотный шельфовый фильтр второго порядка. Частоты выше заданной частоты получают усиление или ослабление, а частоты ниже — не изменяются';
            freqHelp.innerHTML = 'Нижний предел частот, получающих усиление или ослабление.';
            gainHelp.innerHTML = 'Применяемое усиление (ослабление при отрицательном значении) в дБ';
            QHelp.innerHTML = 'Не используется';
            break;
        case 'peaking':
            descrHelp.innerHTML = 'Частоты внутри диапазона получают усиление или ослабление, а частоты за его пределами — не изменяются';
            freqHelp.innerHTML = 'Центр диапазона частот, получающих усиление или ослабление';
            gainHelp.innerHTML = 'Применяемое усиление (ослабление при отрицательном значении) в дБ';
            QHelp.innerHTML = 'Ширина полосы частот. Чем больше значение, тем меньше полоса частот';
            break;
        case 'notch':
            descrHelp.innerHTML = 'Стандартный режекторный фильтр. Частоты вне заданного диапазона частот проходят, а частоты внутри него — ослабляются';
            freqHelp.innerHTML = 'Центр диапазона частот';
            gainHelp.innerHTML = 'Не используется';
            QHelp.innerHTML = 'Ширина полосы частот. Чем больше значение, тем меньше полоса частот';
            break; 
    }
}

manualFilter = document.getElementById("manualFilter");
manualFilter.addEventListener('input', (e) => {
    changeHelp(e.target.value);
})

var achievTracker = [];
achievTracker.push("lowshelf");
var achievCount = document.getElementById('achievCount');

function filterListener() {

    filtersType.forEach((element, index) => {
        element.addEventListener('input', (e) => {
            filters[index].type = e.target.value;
            if ((filters[index].type == 'lowshelf') || (filters[index].type == 'highshelf')) {
                filtersGain[index].disabled = false;
                filtersQ[index].disabled = true;
            } else if (filters[index].type == 'peaking') {
                filtersGain[index].disabled = false;
                filtersQ[index].disabled = false;
            } else {
                filtersGain[index].disabled = true;
                filtersQ[index].disabled = false;
            }
            filters[index].Q.value = 0.001;
            filtersQ[index].value = 0.001;
            QValueArr[index].innerHTML = "Значение: 0.001";
            filters[index].gain.value = 0;
            filtersGain[index].value = 0;
            gainValueArr[index].innerHTML = "Значение: 0";
            filters[index].frequency.value = 50;
            filtersFreq[index].value = 50;
            freqValueArr[index].innerHTML = "Значение: 50";

            if (!achievTracker.includes(filters[index].type))
            {
                achievTracker.push(filters[index].type);
                achievCount.innerHTML = "Прогресс: " + achievTracker.length + ' из 7';
            }
            if (achievTracker.length == 7) {
                activatePopup();
            }
        })
    })

    filtersQ.forEach((element, index) => {
        element.addEventListener('input', (e) => {
            filters[index].Q.value = e.target.value / 1000;
            QValueArr[index].innerHTML = "Значение: " + e.target.value / 1000;
        })
    })

    filtersGain.forEach((element, index) => {
        element.addEventListener('input', (e) => {
            filters[index].gain.value = e.target.value;
            gainValueArr[index].innerHTML = "Значение: " + e.target.value;

        })
    })

    filtersFreq.forEach((element, index) => {
        element.addEventListener('input', (e) => {
            filters[index].frequency.value = e.target.value;
            freqValueArr[index].innerHTML = "Значение: " + e.target.value;
        })
    })

}

filterListener();






oscillator = audioCtx.createOscillator();
oscillator.type = signalHtmlType.value;
oscillator.frequency.value = signalFreq.value;

signalGain = audioCtx.createGain();
signalGain.gain.value = signalHtmlGain.value / 100;




// CONNECTION
oscillator.start();
//oscillator.connect(signalGain);
signalGain.connect(analyserArray[0]);
analyserArray[0].connect(filters[0]);
filters[0].connect(analyserArray[1]);
analyserArray[1].connect(audioCtx.destination);









var oscilloscope = document.getElementById('oscilloscope');
var equalizer = document.getElementById('equalizer');
var mainSettings = document.getElementById('main__settings');
var musicSettings = document.getElementById('music__settings');

oscilloscope.onclick = function() {
    if (!oscilloscope.classList.contains('active')) {
        oscilloscope.classList.toggle('active');
        equalizer.classList.toggle('active');
    }
    musicSettings.style.display = 'none';
    mainSettings.style.display = 'flex';
    if (signalHtmlType.value == 'custom') {
        customSettings.style.display = 'flex';
    }
    musicToOscil();
    for (let i = 0; i < 4; i++) {
        fillCanvas(i);
        //drawGrid(i);
        //drawCoord(i);
    }
}

equalizer.onclick = function() {
    if (!equalizer.classList.contains('active')) {
        oscilloscope.classList.toggle('active');
        equalizer.classList.toggle('active');
    }
    mainSettings.style.display = 'none';
    musicSettings.style.display = 'flex';
    if (signalHtmlType.value == 'custom') {
        customSettings.style.display = 'none';
    }
    oscilToMusic();
    for (let i = 0; i < 4; i++) {
        fillCanvas(i);
        //drawGrid(i);
        //drawCoord(i);
    }
}

var audioButton, audio, src, newAudio;

audio = document.getElementById("audio");
audio.volume = 0.5;


var audioFile = document.getElementById("audioFile");
var fileName = document.getElementById('fileName');

src = audioCtx.createMediaElementSource(document.getElementById("audio"));


var colorCount = document.getElementById("colorCount");
var changeColor = document.getElementById("changeColor");
var logo = document.getElementById("logo");
changeColor.onclick = function () {
    logo.style.backgroundColor = "#EF6213";
}

audioFile.addEventListener("input", (e) => {
    
    colorCount.innerHTML = "Прогресс: 1 из 1";
    changeColor.style.display = "block";

    fileName.innerHTML = e.target.files[0].name;

    newAudio = URL.createObjectURL(document.getElementById("audioFile").files[0]);
    audio.src = newAudio;
    
    button.value = "Start a Magic";
    timerArray.forEach((element) => {
        clearInterval(element);
    })

    for (let i = 0; i < 4; i++) {
        fillCanvas(i);
    }

    buttonText.innerHTML = "Запустить";
    buttonImg.src = "images/play icon.svg";
    clearInterval(audioInterval);
})




var currentDuration = document.getElementById('currentDuration');
var audioDuration = document.getElementById('audioDuration');
var durationValue = document.getElementById('durationValue');

audio.addEventListener('loadedmetadata', function() {
    if (parseInt(audio.duration - 60 * parseInt(audio.duration/60)) > 9) {
        durationValue.innerHTML = parseInt(audio.duration/60) + ":" + parseInt(audio.duration - 60 * parseInt(audio.duration/60));
    } else {
        durationValue.innerHTML = parseInt(audio.duration/60) + ":0" + parseInt(audio.duration - 60 * parseInt(audio.duration/60));
    }
    
    audioDuration.max = parseInt(audio.duration);
});

audioDuration.addEventListener("input", (e) => {
    if (parseInt(e.target.value - 60 * parseInt(e.target.value/60)) > 9) {
        currentDuration.innerHTML = "Значение: " + parseInt(e.target.value/60) + ":" + parseInt(e.target.value - 60 * parseInt(e.target.value/60));
    }
    else {
        currentDuration.innerHTML = "Значение: " + parseInt(e.target.value/60) + ":0" + parseInt(e.target.value - 60 * parseInt(e.target.value/60));
    }
    audio.currentTime = e.target.value;
});

function changeAudioTime() {
    if (parseInt(audio.currentTime - 60 * parseInt(audio.currentTime/60)) > 9) {
        currentDuration.innerHTML = "Значение: " + parseInt(audio.currentTime/60) + ":" + parseInt(audio.currentTime - 60 * parseInt(audio.currentTime/60));
    }
    else {
        currentDuration.innerHTML = "Значение: " + parseInt(audio.currentTime/60) + ":0" + parseInt(audio.currentTime - 60 * parseInt(audio.currentTime/60));
    }
    audioDuration.value = parseInt(audio.currentTime);
}



var startConnection = false;

function oscilToMusic() {
    /*if (!startConnection) {
        startConnection = true;
    } else {
        signalGain.disconnect(analyserArray[0]);    
    }*/
    
    signalGain.disconnect(analyserArray[0]);    

    src.connect(analyserArray[0]);
    buttonText.innerHTML = "Запустить";
    buttonImg.src = "images/play icon.svg";
}

signalGain.disconnect(analyserArray[0]);    
src.connect(analyserArray[0]);

function musicToOscil() {
    src.disconnect(analyserArray[0]);

    oscillator.connect(signalGain);
    signalGain.connect(analyserArray[0]);
    buttonText.innerHTML = "Запустить";
    buttonImg.src = "images/play icon.svg";
    audio.pause();
    oscillator.disconnect(signalGain);
    clearInterval(audioInterval);
}






var audioVolume = document.getElementById("audioVolume");


var button = document.getElementById("button");
var buttonText = document.getElementById("buttonText");
var buttonImg = document.getElementById("buttonImg");
var timerArray = [];
var audioInterval;

button.onclick = function(){
    if(buttonText.innerHTML === "Запустить"){
        buttonText.innerHTML = "Остановить";
        buttonImg.src = "images/pause icon.svg";

        if (!oscilloscope.classList.contains('active')) {
            audio.play();
            audioInterval = setInterval(changeAudioTime, 50);
        } else {
            //analyserArray[1].connect(audioCtx.destination);
            oscillator.connect(signalGain);
        }

        

        timerArray.push(setInterval(drawWaveform, 5, 0, 0));
        timerArray.push(setInterval(drawFFT, 5, 2, 0));
        timerArray.push(setInterval(drawWaveform, 5, 1, 1));
        timerArray.push(setInterval(drawFFT, 5, 3, 1));

    }else{
        buttonText.innerHTML = "Запустить";
        buttonImg.src = "images/play icon.svg";
        

        if (!oscilloscope.classList.contains('active')) {
            audio.pause();
            clearInterval(audioInterval);
        } else {
            oscillator.disconnect(signalGain);
        }

        timerArray.forEach((element) => {
            clearInterval(element);
        })

        
    }
}


audio.onended = function() {
    buttonText.innerHTML = "Запустить";
    buttonImg.src = "images/play icon.svg";
    timerArray.forEach((element) => {
        clearInterval(element);
    })
    clearInterval(audioInterval);
    currentDuration.innerHTML = "Значение: 0:00";
    audioDuration.value = 0;
}
















var volumeValue = document.getElementById("volumeValue");
var freqValue = document.getElementById("freqValue");
var gainValue = document.getElementById("gainValue");

audioVolume.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
    volumeValue.innerHTML = "Значение: " + e.target.value;
})

signalFreq.addEventListener('input', (e) => {
    oscillator.frequency.value = e.target.value;
    freqValue.innerHTML = "Значение: " + e.target.value;
});

signalHtmlGain.addEventListener('input', (e) => {
    signalGain.gain.value = e.target.value / 100;
    gainValue.innerHTML = "Значение: " + e.target.value;
});



var customSettings = document.getElementById('custom__settings');

signalHtmlType.addEventListener('input', (e) => {
    
    if (e.target.value === "custom")
    {
        customSound();
        customSettings.style.display = 'flex';

    } else {
        oscillator.type = e.target.value;
        customSettings.style.display = 'none';
    }
});






// CUSTOM SIGNAL
var a0 = document.getElementById("a0");
var an = document.getElementById("an");
var bn = document.getElementById("bn");
var n = document.getElementById("n");
nValue = document.getElementById("nValue");
var realCoeffs;
var imagCoeffs;
var wave;

function customSound () {
   
    realCoeffs = new Float32Array(n.value);
    imagCoeffs = new Float32Array(n.value);

    realCoeffs[0] = math.evaluate(a0.value);
    for (var i = 1; i < n.value; i++) {
        imagCoeffs[i] = math.evaluate(bn.value.replaceAll('n', i));
        realCoeffs[i] = math.evaluate(an.value.replaceAll('n', i));
    }
    
    wave = audioCtx.createPeriodicWave(realCoeffs, imagCoeffs, {disableNormalization: true});
    oscillator.setPeriodicWave(wave);
}

a0.addEventListener('input', (e) => {
    customSound();
});

an.addEventListener('input', (e) => {
    customSound();
});

bn.addEventListener('input', (e) => {
    customSound();
});

n.addEventListener('input', (e) => {
    customSound();
    nValue.innerHTML = "Значение: " + e.target.value;
});
















var sliceWidth;
var gridSize = 20;
var y, v;

var bufferLength;
var dataArray;
var canvasArray = [];
var contextArray = [];
for (let i = 0; i < 4; i++) {
    canvasArray.push(document.getElementById('canvas__' + i.toString()));
    contextArray.push(canvasArray[i].getContext("2d"));
    fillCanvas(i);
}


function fillCanvas(i) {
    contextArray[i].clearRect(0, 0, canvasArray[i].width, canvasArray[i].height);
}









function drawWaveform(canvasNum, analyserNum) {
    dataArray = new Uint8Array(analyserArray[analyserNum].frequencyBinCount);

    fillCanvas(canvasNum);

    analyserArray[analyserNum].getByteTimeDomainData(dataArray);

    contextArray[canvasNum].lineWidth = 2;
    contextArray[canvasNum].strokeStyle = 'rgb(255, 255, 255)';
    contextArray[canvasNum].beginPath();
    sliceWidth = canvasArray[canvasNum].width * 1.0 / (dataArray.length - 1);
    x = 0;

    dataArray.forEach((element, index) => {
        v = element / 128.0;
        y = v * canvasArray[canvasNum].height/2;

        if(index === 0) {
          contextArray[canvasNum].moveTo(x, y);
        } else {
          contextArray[canvasNum].lineTo(x, y);
        }

        x += sliceWidth;
    })

    contextArray[canvasNum].stroke();

    //drawCoord(canvasNum);


     
}


var barWidth;
var barHeight;
var x;  

var popupText = document.getElementById("popupText");  

function drawFFT(canvasNum, analyserNum) {

    dataArray = new Uint8Array(analyserArray[analyserNum].frequencyBinCount);
    analyserArray[analyserNum].getByteFrequencyData(dataArray);

    fillCanvas(canvasNum);

    barWidth = canvasArray[canvasNum].width / dataArray.length;
    x = 0;

    //drawGrid(canvasNum);

    dataArray.forEach((element) => {
        barHeight = element/2;

        contextArray[canvasNum].fillStyle = 'rgb(255, 255, 255)';
        contextArray[canvasNum].fillRect(x,canvasArray[canvasNum].height-barHeight/2,barWidth,barHeight);

        x += barWidth + 1;
    })

    //drawCoord(canvasNum);
    if ((dataArray[0]/160 > 1)) 
    {
        popupText.style.transform = "scale(" + (dataArray[0]/160).toString() + ")";
    }
    else {
        popupText.style.transform = "scale(1)";
    } 
    

}






var message = document.getElementById("message");
var closeMessage = document.getElementById("closeMessage");
var audioMessage = new Audio('../audio/message.mp3');
audioMessage.preload = "auto";


function showMessage() {
    //message.style.display = "block";
    message.style.right = "0px";
    audioMessage.play();
}

function hideMessage() {
    //message.style.display = "none";
    message.style.right = "-500px";
}


setTimeout(showMessage, 1000);
setTimeout(hideMessage, 16000);

closeMessage.onclick = function() {
    hideMessage();
}



var achievPopup = document.getElementById("achievPopup");


function activatePopup() {
    achievPopup.style.display = 'flex';
    audio.src = '../audio/MORGENSHTERN - Пососи.mp3';
    audio.play();
    audio.volume = 1;
    audio.currentTime = 6;

    for (var i = 0; i < filters.length; i++) {
        if (filters.length == 1) {
            analyserArray[0].disconnect(filters[filters.length - 1]);
            filters[filters.length - 1].disconnect(analyserArray[1]);
            analyserArray[0].connect(analyserArray[1]);
        } else {
            filters[filters.length - 2].disconnect(filters[filters.length - 1]);
            filters[filters.length - 1].disconnect(analyserArray[1]);
            filters[filters.length - 2].connect(analyserArray[1]);
        }

        filterArray[filterArray.length - 1].remove();
        filterArray.pop();
        filtersType.pop();
        filtersFreq.pop();
        filtersGain.pop();
        filtersQ.pop();
        filters.pop();
    }
    
    filters.push(audioCtx.createBiquadFilter());
    filters[filters.length - 1].type = "lowshelf"; 
    filters[filters.length - 1].frequency.value = 100;
    filters[filters.length - 1].gain.value = 40;
    filters[filters.length - 1].Q.value = 0;

    filterListener();

    if (filters.length == 1) {
        analyserArray[0].disconnect(analyserArray[1]);
        analyserArray[0].connect(filters[filters.length - 1]);
        filters[filters.length - 1].connect(analyserArray[1])
    } else {
        filters[filters.length - 2].disconnect(analyserArray[1]);
        filters[filters.length - 2].connect(filters[filters.length - 1]);
        filters[filters.length - 1].connect(analyserArray[1]);
    }
    
}

