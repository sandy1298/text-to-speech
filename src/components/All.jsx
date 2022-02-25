import React from 'react'

export default function All() {

    window.addEventListener('load', (event) => {

const msg = new SpeechSynthesisUtterance();
let voices = []; //empty array for voices
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const rate = document.querySelector('#rate');
const speakButton = document.querySelector('#speak'); //start to speak
const stopButton = document.querySelector('#stop'); //stop
const pauseButton = document.querySelector('#pause'); //pause
const resumeButton = document.querySelector('#resume'); //resume
msg.text = document.querySelector('[name="text"]').value;


function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
  .filter(voice => voice.lang.includes('en')) // showing only english voices
  .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`) //all of the voices 
  .join('');
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value); //loop over every single voices in the array and find the one where it's name attribute is the same as the option that was currently selected
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  speakButton.classList.remove();
  pauseButton.classList.add();
  resumeButton.classList.add()
  //restart speaking
  if (startOver) {
    speechSynthesis.speak(msg);
    speakButton.classList.add();
    pauseButton.classList.remove();
  }
}

function pause() {
  speechSynthesis.pause();
  pauseButton.classList.add();
  resumeButton.classList.remove();
}

function resume() {
  speechSynthesis.resume();
  pauseButton.classList.remove();
  resumeButton.classList.add();
}

function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

msg.onend = function(event) {
  console.log('Utterance has finished ' + event.elapsedTime + ' milliseconds.');
  speakButton.classList.remove();
  pauseButton.classList.add();
  resumeButton.classList.add();
}

msg.rate = 2.7; // default rate on load
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
pauseButton.addEventListener('click', pause);
resumeButton.addEventListener('click', resume);
stopButton.addEventListener('click', () => toggle(false));
});
  return (
    <div className='container-fluid'>
<div className="voiceinator">
  <h1>Text to Speech Conversion using React JS</h1>

  <select name="voice" id="voices">
    <option value="">Select A Voice</option>
  </select>

  <label htmlFor="rate">Rate:</label>
  <input name="rate" id="rate" type="range" min="0" max="16"  step="0.1" list="tickmarks"/>
  <datalist id="tickmarks">
  <option value=""></option>
    {/* <option value="0"></option>
    <option value="1"></option>
    <option value="2"></option>
    <option value="3"></option>
    <option value="4"></option>
    <option value="5"></option>
    <option value="6"></option>
    <option value="7"></option>
    <option value="8"></option>
    <option value="9"></option>
    <option value="10"></option>
    <option value="11"></option>
    <option value="12"></option>
    <option value="13"></option>
    <option value="14"></option>
    <option value="15"></option>
    <option value="16"></option> */}
  </datalist>

  
  <label htmlFor="pitch">Pitch:</label>
  <input name="pitch" type="range" min="0" max="2" step="0.1"/>
  
  <textarea name="text">Type here...</textarea>
  
  <button id="stop">Stop</button>
  <button id="speak" className="">Speak</button>
  <button id="pause" className="">Pause</button>
  <button id="resume" className="">Resume</button>
</div>


    </div>
  )
}

 