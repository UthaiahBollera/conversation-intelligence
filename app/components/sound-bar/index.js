import transcript from "../../../data/transcript.js";
import timeUpdate from "../time-update/index.js";
import event from "../../event.js";
class SoundBar {
  constructor () {
  }

  render() {
    let marginLeft = 0;
    let youbars = "";
    let meBars = "";
    transcript.word_timings.forEach((words, wordIndex) => {
      if (!(wordIndex & 1)) {//even bars        
        console.log("even", words, marginLeft);
        for (var evenIndex = 0; evenIndex < words.length; evenIndex++) {
          let time = words[evenIndex];
          youbars += `<i data-word="${time.word}" class='bar' style="margin-left: ${evenIndex == 0 ? marginLeft* 4.1 + "px;" : "none"}" startTime=${time.startTime} endTime=${time.endTime}></i>`;
        }
        marginLeft = evenIndex;        
      } else {
        console.log("odd", words, marginLeft* 4.1);
        marginLeft *= 4.1
        for (var oddIndex = 0; oddIndex < words.length; oddIndex++) {
          let time = words[oddIndex];
          meBars += `<i data-word="${time.word}" class='bar' style="margin-left: ${oddIndex == 0 ? marginLeft + "px;" : "none"}" startTime=${time.startTime} endTime=${time.endTime}></i>`;
        }
        marginLeft = oddIndex;
      }
    });
    let eleDoc = document.createElement('div');
    eleDoc.className = "convai-sound-bar";
    eleDoc.innerHTML = `<div id="time-calc">              
</div>
<div class="bar-original">
<div class="sound-wave-me">
    <div class="conv-percentage you">
        54% You
    </div>
    <div id="wave">
        <div class='sound-icon '>
            <div class='sound-wave'>
              ${youbars}
            </div>
          </div>
    </div>
</div>
<div class="sound-wave-connector"></div>
<div class="sound-wave-you">
    <div class="conv-percentage me">
        46% Michel
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

<div class="bar-progress">
<div class="sound-wave-me">
    <div class="conv-percentage you">        
    </div>
    <div id="wave">
        <div class='sound-icon '>
            <div class='sound-wave'>
              ${youbars}
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

`;
    eleDoc.querySelector('#time-calc').innerHTML = new timeUpdate().render();
    eleDoc.querySelector('.sound-wave').addEventListener("click", (evt) => {
      if (evt.target.className === "bar") {
        let time = Number(evt.target.getAttribute('startTime').split('s')[0]);
        if (isFinite(time)) {
          event.publish('setTimer', {
            currentTime: Number(time).toFixed(2)
          });
        }
      }
    });
    return eleDoc;
  }
}
export default new SoundBar();