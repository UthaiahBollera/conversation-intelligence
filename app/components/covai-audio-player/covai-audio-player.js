// @ts-nocheck
import event from "../../event.js";

const [PLAYING, PAUSE, COMPLETED] = [1, 2, 3];
let [PLAYURL, PAUSEURL] = ['play.png', 'pause.png'];
let status = COMPLETED;

class AudioPlayer {
  constructor () {
    this.player = null;
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.fastForward = this.fastForward.bind(this);
    this.rewind = this.rewind.bind(this);
    event.subscribe('setTimer', (time) => {
      status = PLAYING;
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
      status = COMPLETED;
    }
    switch (status) {
      case COMPLETED:
        status = PLAYING;
        _player.currentTime = 0;
        _player.play();
        break;
      case PLAYING:
        status = PAUSE;
        _player.pause();
        break;
      case PAUSE:
        status = PLAYING;
        _player.play();
        break;
    }
  };

  setPlayURL(){
    let ele = document.querySelector('img.play');
    ele.src = "/app/resources/images/" + PLAYURL;
  }

  render() {
    let _this = this;
    let playerDoc = document.createElement('div');
    playerDoc.className = "convai-player";
    playerDoc.id = "convai-player";

    playerDoc.innerHTML = `
    <div class="convai-player-rewind" id="convai-player-rewind">
      <img class="rewind--active" src="/app/resources/images/rewind-active.svg" alt="rewind" />
      <img class="rewind" src="/app/resources/images/rewind.svg" alt="rewind" />
    </div>
    <div class="convai-player-play" >
      <img class="play" src="/app/resources/images/play.png" alt="play" />
    </div>
    <div class="convai-player-forward" id="convai-player-forward" >
      <img class="forward--active" src="/app/resources/images/forward-active.svg" alt="rewind" />
      <img class="forward" src="/app/resources/images/forward.svg" alt="forward" />
    </div>
    <audio controls id="audio-player">
      <source src="/app/sounds/interation1.wav" type="audio/wav">
    </audio>`;
    this.player = playerDoc.querySelector('#audio-player');
    this.player.onloadeddata = () => {
      event.publish('onendtimechanged', this.player.duration);
    };
    this.player.onended = () => {
      this.setPlayURL();
    };

    this.player.ontimeupdate = (evt) => {
      event.publish("ontimechanged", {
        currentTime: evt.target.currentTime,
        duration: this.player.duration
      });
    };
    playerDoc.querySelector('#convai-player-forward').addEventListener('click', () => {
      _this.fastForward();
    });
    playerDoc.querySelector('#convai-player-rewind').addEventListener('click', () => {
      _this.rewind();
    });
    playerDoc.querySelector(".convai-player-play").addEventListener('click', () => {
      _this.togglePlayPause();
      let ele = document.querySelector('img.play');
      let [PLAYURL, PAUSEURL] = ['play.png', 'pause.png'];
      if (ele.src.indexOf(PLAYURL) > 0) {
        ele.src = "/app/resources/images/" + PAUSEURL;
      } else {
        ele.src = "/app/resources/images/" + PLAYURL;
      }
    });
    playerDoc.querySelector('.rewind--active').addEventListener('click', () => {
      _this.rewind;
    });
    playerDoc.querySelector('.forward--active').addEventListener('click', () => {
      _this.fastForward;
    });
    return playerDoc;
  }
}
export default new AudioPlayer();