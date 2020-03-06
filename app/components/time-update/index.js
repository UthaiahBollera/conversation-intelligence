// @ts-nocheck
import event from "../../event.js";

class TimeUpdate {
  constructor () {
    event.subscribe('ontimechanged', (event) => {
      document.querySelector('.running-time').innerHTML = Number(event.currentTime).toFixed(2);
      document.querySelector('.completing-time').innerHTML = event.duration;
    });
  }
  render() {
    let duration = document.querySelector('#convai-player>audio').duration    
    return `<span class="running-time">0:0</span><span>&nbsp;/&nbsp;</span><span class="completing-time">${duration || "00:00"}</span>`;
  }
}
export default TimeUpdate;