// @ts-nocheck
import transcript from "../../data/transcript.js";
import timeUpdate from "../time-update/index.js";
import event from "../../event.js";
const intialProgressbarState = 148;
class SoundBar {
  constructor () {
    this.eleDoc = document.createElement('div');
    this.eleDoc.className = "convai-sound-bar";
    event.subscribe("onTimeChanged", (time) => {
      this.updateProgressbarWidth(Number(((time.currentTime * 9.5) + intialProgressbarState) + 4).toFixed(2));
    });
    this.meSpokenLength = transcript.word_timings.filter((d,i)=>{return (i&1)}).flat().length;
    this.youSpokenLength = transcript.word_timings.filter((d,i)=>{return !(i&1)}).flat().length;
  }

  getYouSpokenPercentage() {
    return Math.round((this.youSpokenLength / (this.meSpokenLength + this.youSpokenLength)) * 100);
  }

  getMeSpokenPercentage(){
    return Math.round((this.meSpokenLength / (this.meSpokenLength + this.youSpokenLength)) * 100);
  }
  
  updateProgressbarWidth(progressWidth) {    
    this.eleDoc.querySelector('#bar-progress >.container-bar').style.width = progressWidth + "px";
  }
  generaterSoundBars() {
    let marginLeft = 0;
    let youBars = "";
    let meBars = "";
    let width = intialProgressbarState;
    transcript.word_timings.forEach((words, wordIndex) => {
      if (!(wordIndex & 1)) {//even bars                
        for (var evenIndex = 0; evenIndex < words.length; evenIndex++, width += 4) {
          let time = words[evenIndex];
          youBars += `<i data-word="${time.word}" data-width="${width}" class='bar' style="margin-left: ${evenIndex == 0 ? marginLeft * 4.1 + "px;" : "none"}" startTime=${time.startTime} endTime=${time.endTime}></i>`;
        }
        marginLeft = evenIndex;
      } else {        
        marginLeft *= 4.1;
        for (var oddIndex = 0; oddIndex < words.length; oddIndex++, width += 4) {
          let time = words[oddIndex];
          meBars += `<i data-word="${time.word}" data-width="${width}" class='bar' style="margin-left: ${oddIndex == 0 ? marginLeft + "px;" : "none"}" startTime=${time.startTime} endTime=${time.endTime}></i>`;
        }
        marginLeft = oddIndex;
      }
    });
    return {
      youBars,
      meBars
    };
  }

  render() {
    const { youBars, meBars } = this.generaterSoundBars();
    this.eleDoc.innerHTML = `<div id="time-calc">  </div>
<div class="bar-original">
<div class="sound-wave-me">
    <div class="conv-percentage you">
        ${this.getYouSpokenPercentage()}% You
    </div>
    <div id="wave">
        <div class='sound-icon '>
            <div class='sound-wave'>
              ${youBars}
            </div>
          </div>
    </div>
</div>
<div class="sound-wave-connector"></div>
<div class="sound-wave-you">
    <div class="conv-percentage me">
        ${this.getMeSpokenPercentage()}% Michel
    </div>
    <div id="wave">
        <div class='sound-icon'>
            <div class='sound-wave'>
              ${meBars}
            </div>
          </div>
    </div>
    </div>    
</div>

<div class="bar-progress" id="bar-progress">
  <div class="container-bar">
    <div class="sound-wave-me">
        <div class="conv-percentage you">        
        </div>
        <div id="wave">
            <div class='sound-icon '>
                <div class='sound-wave'>
                  ${youBars}
                </div>
              </div>
        </div>
    </div>
    <div class="sound-wave-connector"></div>
    <div class="sound-wave-you">
        <div class="conv-percentage me">        
        </div>
        <div id="wave">
            <div class='sound-icon'>
                <div class='sound-wave'>
                  ${meBars}
                </div>
              </div>
        </div>
    </div>
  </div>   
</div>`;
    this.eleDoc.querySelector('#time-calc').innerHTML = new timeUpdate().render();
    this.eleDoc.addEventListener("click", (evt) => {
      if (evt.target.className === "bar") {        
        let time = Number(evt.target.getAttribute('startTime').split('s')[0]);        
        let currentTime = Number(time).toFixed(2);        
        event.publish('setTimer', {
          currentTime: currentTime
        });        
      }
    });
    this.updateProgressbarWidth(intialProgressbarState);
    return this.eleDoc;
  }
}
export default new SoundBar();