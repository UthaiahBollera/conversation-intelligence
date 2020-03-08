// @ts-nocheck
import CovaiAudioPlayer from "./components/covai-audio-player/covai-audio-player.js";
import PlaySpeedAdjust from "./components/play-speed-adjust/index.js";
import Transcript from "../app/components/transcript/index.js";
import SearchTranscript from "./components/search-transcript/index.js";
import SoundBar from "./components/sound-bar/index.js";
import Share from "./components/share/index.js";

class App {
  constructor (appId = null) {
    this.eleDoc = document.getElementById(appId);
    this.eleDoc.innerHTML = `<div class="convai">
    <div class="convai-container">
      <div class="convai-row" id='player'>        
      </div>
      <div class="convai-row" id="sound-bar">        
      </div>
      <div class="convai-row" id="search-transcript">
      </div>      
    </div>
  </div>`;
    this.eleDoc.querySelector('#player').prepend(CovaiAudioPlayer.render());
    this.eleDoc.querySelector('#convai-player').insertAdjacentElement("afterend", PlaySpeedAdjust.render());
    this.eleDoc.querySelector('#sound-bar').appendChild(SoundBar.render());
    this.eleDoc.querySelector('#search-transcript').insertAdjacentElement("afterend", Transcript.render());
    this.eleDoc.querySelector('#search-transcript').appendChild(SearchTranscript.render());
    this.eleDoc.querySelector('#player').appendChild(Share.render());
  }
}
window.App = App;
export default App;
