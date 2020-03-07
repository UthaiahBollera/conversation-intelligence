import transcript from "../../../data/transcript.js";
import timeUpdate from "../time-update/index.js";
import event from "../../event.js";
class SoundBar {
  constructor () {
  }

  render() {
    let youbars = "";
    transcript.word_timings[0].forEach((time) => {
      youbars += `<i class='bar' startTime=${time.startTime} endTime=${time.endTime}></i>`;
    });

    let meBars = "";
    transcript.word_timings[1].forEach((time) => {
      meBars += `<i class='bar' startTime=${time.startTime} endTime=${time.endTime}></i>`;
    });
    let eleDoc = document.createElement('div');
    eleDoc.className = "convai-sound-bar";
    eleDoc.innerHTML = `<div id="time-calc">              
</div>
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
</div>`;
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