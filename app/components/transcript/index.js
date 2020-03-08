import transcript from "../../data/transcript.js";
import event from "../../event.js";
import utils from "../../utils.js";

class Trnascript {
  constructor () {
    this.element = document.createElement('div');
    this.element.id = "transcript";
    this.element.className = "convai-row transcript";
    this.searchItem = "";

    event.subscribe('onSearchChange', (data) => {      
      this.searchItem = data.searchItem || "";
      this.updateYouAndMeText();
    });
    event.subscribe("ontimechanged", (time) => {
      let styleString = `
      .word_${Number(time.currentTime).toFixed(1).toString().split('.').join('_')}{
        background: #bde0fb;
        padding-left: 3px;
        padding-right: 3px;
        border-radius: 5px;
      }`;
      console.log(styleString);
      document.querySelector('#word-style').innerHTML = styleString;
    });
  }

  updateYouAndMeText() {
    const wordTimings = transcript.word_timings;
    let youText = "", meText = "";
    const youTextParentEle = this.element.querySelector('.convai-transcript__text.you > div');
    const meTextParentEle = this.element.querySelector('.convai-transcript__text.me > div');
    wordTimings.forEach((wording, index) => {      
      if (index & 1) {//for odd conversation
        wording.forEach((time) => {
          if (time.word) {       
            let className = "word";
            let startTime = +Number(time.startTime.split('s')[0]).toFixed(1);
            let endTime = +Number(time.endTime.split('s')[0]).toFixed(1);
            if (this.searchItem.split(' ').indexOf(time.word) >= 0) {
              className += " search-select";
            }
            className+= utils.getTimeToclass(startTime,endTime);
            meText += `<span class="${className}" startTime=${startTime} endTime=${endTime}>${time.word} &nbsp;</span>`;
          }
        });
      } else {//for even conversation
        wording.forEach((time) => {
          if (time.word) {            
            let className = "word";
            let startTime = +Number(time.startTime.split('s')[0]).toFixed(1);
            let endTime = +Number(time.endTime.split('s')[0]).toFixed(1);
            if (this.searchItem.split(' ').indexOf(time.word) >= 0) {
              className += " search-select";
            }
            className+= utils.getTimeToclass(startTime,endTime);      
            youText += `<span class="${className}" startTime=${startTime} endTime=${endTime}>${time.word}</span> `;
          }
        });
      }
    });
    youTextParentEle.innerHTML = youText;
    meTextParentEle.innerHTML = meText;
  }


  render() {
    let wordTimings = transcript.word_timings;
    let youStartTime = wordTimings[0][0].startTime;
    let meStartTime = wordTimings[1][0].startTime;


    this.element.innerHTML = `<!--  You Transcript -->
    <style id="word-style"></style>
    <div class="convai-transcript you">
      <div class="convai-transcript__time you">
        <span>${Number(youStartTime.split('s')[0]).toFixed(2)}</span>
      </div>
      <div class="convai-transcript__text you">
        <div>.</div>
      </div>
    </div>
    <!--  Me Transcript -->
    <div class="convai-transcript me">
      <div></div>
      <div class="convai-transcript__time me">
        <span>${Number(meStartTime.split('s')[0]).toFixed(2)}</span>
      </div>
      <div class="convai-transcript__text me">
        <div></div>
      </div>
    </div>`;
    this.updateYouAndMeText();
    this.element.querySelector('.convai-transcript').addEventListener("click", (evt) => {
      if (evt.target.className.indexOf("word")>=0) {
        let time = Number(evt.target.getAttribute('startTime'));
        if (isFinite(time)) {
          event.publish('setTimer', {
            currentTime: Number(time).toFixed(2)
          });
        }
      }
    });

    return this.element;
  }
}

export default new Trnascript();