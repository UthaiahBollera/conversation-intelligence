import transcript from "../../../data/transcript.js";
import event from "../../event.js";

class Trnascript {
  constructor () {   
  }
  render() {  
    let eleDoc = document.createElement('div');
    eleDoc.id = "transcript";
    eleDoc.className = "convai-row transcript";
    let wordTimings = transcript.word_timings;
    let youStartTime = wordTimings[0][0].startTime;
    let meStartTime = wordTimings[1][0].startTime;
    let youText = "", meText = "";
    wordTimings[0].forEach((time) => {
      if(time.word){
        youText += `<span class=${"word"} startTime=${time.startTime} endTime=${time.endTime}>${time.word}</span> `;
      }      
    });
    wordTimings[1].forEach((time) => {
      if(time.word){
        meText += `<span class=${"word"} startTime=${time.startTime} endTime=${time.endTime}>${time.word} &nbsp;</span>`;
      }
    });

    eleDoc.innerHTML =  `<!--  You Transcript -->
    <style id="word-style"></style>
    <div class="convai-transcript you">
      <div class="convai-transcript__time you">
        <span>${Number(youStartTime.split('s')[0]).toFixed(2)}</span>
      </div>
      <div class="convai-transcript__text you">
        <div>${youText}.</div>
      </div>
    </div>
    <!--  Me Transcript -->
    <div class="convai-transcript me">
      <div></div>
      <div class="convai-transcript__time me">
        <span>${Number(meStartTime.split('s')[0]).toFixed(2)}</span>
      </div>
      <div class="convai-transcript__text me">
        <div>${meText}.</div>
      </div>
    </div>`;
    eleDoc.querySelector('.convai-transcript').addEventListener("click", (evt) => {
      if (evt.target.className === "word") {
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

export default new Trnascript();