// @ts-nocheck
import event from "../../event.js";
import { PLAY_IMGAE_URL, PAUSE_IMAGE_URL, PlayingStates } from "./constants.js";
const [PLAYING, PAUSE, COMPLETED] = PlayingStates;

class AudioPlayer {
  constructor () {
    this.playerDoc = document.createElement('div');
    this.playerDoc.className = "convai-player";
    this.playerDoc.id = "convai-player";
    
    this.player = null;
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.fastForward = this.fastForward.bind(this);
    this.rewind = this.rewind.bind(this);
    this.status = COMPLETED;
    event.subscribe('setTimer', (time) => {
      this.status = PLAYING;
      this.player.currentTime = time.currentTime;
      this.player.play();
    });

    event.subscribe('onSpeedChange', (data) => {
      this.setSpeed(Number(data.speed));
    });
  }

  fastForward(e) {
    this.player.currentTime = this.player.currentTime + 0.1;
  }

  rewind() {
    this.player.currentTime = this.player.currentTime - 0.1;
  }

  resetSpeed() {
    this.player.playbackRate = 1.0;
  }

  setSpeed(speed) {
    this.player.playbackRate = speed;
  }

  togglePlayPause() {
    let _player = this.player;
    if (_player.currentTime === _player.duration) {
      this.status = COMPLETED;
    }
    switch (this.status) {
      case COMPLETED:
        this.status = PLAYING;
        _player.currentTime = 0;
        _player.play();
        break;
      case PLAYING:
        this.status = PAUSE;
        _player.pause();
        break;
      case PAUSE:
        this.status = PLAYING;
        _player.play();
        break;
    }
  };

  setPlayURL() {
    let ele = document.querySelector('img.play');
    ele.src = PLAY_IMGAE_URL;
  }

  render() {
    let _this = this;
    this.playerDoc.innerHTML = `
    <div class="convai-player-rewind" id="convai-player-rewind">
      <img class="rewind--active" src="app/resources/images/rewind-active.svg" alt="rewind" />
      <img class="rewind" src="app/resources/images/rewind.svg" alt="rewind" />
    </div>
    <div class="convai-player-play" >
      <img class="play" src="app/resources/images/play.png" alt="play" />
    </div>
    <div class="convai-player-forward" id="convai-player-forward" >
      <img class="forward--active" src="app/resources/images/forward-active.svg" alt="rewind" />
      <img class="forward" src="app/resources/images/forward.svg" alt="forward" />
    </div>
    <audio controls id="audio-player">
      <source src="app/sounds/interation1.wav" type="audio/wav">
    </audio>`;
    this.player = this.playerDoc.querySelector('#audio-player');
    
    this.player.onloadeddata = () => {
      event.publish('onEndTimeChanged', this.player.duration);
    };

    this.player.onended = () => {
      this.setPlayURL();
    };

    this.player.ontimeupdate = (evt) => {
      event.publish("onTimeChanged", {
        currentTime: evt.target.currentTime,
        duration: this.player.duration
      });
    };
    this.playerDoc.querySelector('#convai-player-forward').addEventListener('click', () => {
      _this.fastForward();
    });
    this.playerDoc.querySelector('#convai-player-rewind').addEventListener('click', () => {
      _this.rewind();
    });
    this.playerDoc.querySelector(".convai-player-play").addEventListener('click', () => {
      _this.togglePlayPause();
      let ele = document.querySelector('img.play');
      let [PLAYURL, PAUSEURL] = ['play.png', 'pause.png'];
      if (ele.src.indexOf(PLAYURL) > 0) {
        ele.src = PAUSE_IMAGE_URL;
      } else {
        ele.src = PLAY_IMGAE_URL;
      }
    });
    this.playerDoc.querySelector('.rewind--active').addEventListener('click', () => {
      _this.rewind;
    });
    this.playerDoc.querySelector('.forward--active').addEventListener('click', () => {
      _this.fastForward;
    });
    return this.playerDoc;
  }
}
export default new AudioPlayer();