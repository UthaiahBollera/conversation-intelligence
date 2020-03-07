// @ts-nocheck
import CovaiAudioPlayer from "./components/covai-audio-player/covai-audio-player.js";
import PlaySpeedAdjust from "./components/play-speed-adjust/index.js";
import event from "./event.js";
import Transcript from "../app/components/transcript/index.js";

import SoundBar from "./components/sound-bar/index.js";
window.event = event;
window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('#player').prepend(CovaiAudioPlayer.render());
  document.querySelector('#convai-player').insertAdjacentHTML = (PlaySpeedAdjust.render());
  document.querySelector('#sound-bar').appendChild(SoundBar.render());
  document.querySelector('#search-transcript').insertAdjacentElement("afterend", Transcript.render());
});