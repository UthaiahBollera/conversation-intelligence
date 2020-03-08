// @ts-nocheck
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
    event.subscribe("onTimeChanged", (time) => {
      let styleString = `
      .word_${Number(time.currentTime).toFixed(1).toString().split('.').join('_')}{
        background: #bde0fb;
        padding-left: 3px;
        padding-right: 3px;
        border-radius: 5px;
      }`;
      document.querySelector('#word-style').innerHTML = styleString;
    });
  }

  updateYouAndMeText() {
    let wordTimings = transcript.word_timings;
    let youText = "", meText = "";
    const youTextParentEle = this.element.querySelector('.convai-transcript__text.you > div');
    const meTextParentEle = this.element.querySelector('.convai-transcript__text.me > div');
    this.searchItem && (wordTimings = wordTimings.map((words) => {
      if (words.filter(d => d.word == 'company').length) {
        return words;
      }
      return [];
    }));

    wordTimings.forEach((wording, index) => {
      if (index & 1) {//for odd conversation
        wording.forEach((time) => {
          if (time.word) {
            let className = "word";
            let startTime = utils.timeToNumber(time.startTime, 1);
            let endTime = utils.timeToNumber(time.endTime, 1);
            if (this.searchItem.split(' ').indexOf(time.word) >= 0) {
              className += " search-select";
            }
            className += utils.getTimeToclass(startTime, endTime);
            meText += `<span class="${className}" startTime=${startTime} endTime=${endTime}>${time.word} &nbsp;</span>`;
          }
        });
      } else {//for even conversation
        wording.forEach((time) => {
          if (time.word) {
            let className = "word";
            let startTime = utils.timeToNumber(time.startTime, 1);
            let endTime = utils.timeToNumber(time.endTime, 1);
            if (this.searchItem.split(' ').indexOf(time.word) >= 0) {
              className += " search-select";
            }
            className += utils.getTimeToclass(startTime, endTime);
            youText += `<span class="${className}" startTime=${startTime} endTime=${endTime}>${time.word}</span> `;
          }
        });
      }
    });
    youTextParentEle.innerHTML = youText;
    meTextParentEle.innerHTML = meText;
  }

  render() {
    const wordTimings = transcript.word_timings;
    const youStartTime = wordTimings[0][0].startTime;
    const meStartTime = wordTimings[1][0].startTime;

    this.element.innerHTML = `<!--  You Transcript -->
    <style id="word-style"></style>
    <div class="convai-transcript you">
      <div class="convai-transcript__time you">
        <span>${utils.timeToNumber(youStartTime, 2)}</span>
      </div>
      <div class="convai-transcript__text you">
        <div>.</div>
      </div>
    </div>
    <!--  Me Transcript -->
    <div class="convai-transcript me">
      <div></div>
      <div class="convai-transcript__time me">
        <span>${utils.timeToNumber(meStartTime, 2)}</span>
      </div>
      <div class="convai-transcript__text me">
        <div></div>
      </div>
    </div>`;

    this.updateYouAndMeText();
    this.element.querySelector('.convai-transcript').addEventListener("click", (evt) => {
      if (evt.target.className.indexOf("word") >= 0) {
        event.publish('setTimer', {
          currentTime: utils.timeToNumber(evt.target.getAttribute('startTime'), 2)
        });
      }
    });
    return this.element;
  }
}

export default new Trnascript();