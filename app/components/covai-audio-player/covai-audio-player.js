// @ts-nocheck
import event from "../../event.js";

const [PLAYING, PAUSE, COMPLETED] = [1, 2, 3];
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
  }

  fastForward() {
    this.player.playbackRate = 0.5;
  }

  fastForward() {
    this.player.playbackRate = 0.5;
  }

  rewind() {
    this.player.playbackRate = -1.0;
  }

  resetSpeed() {
    this.player.playbackRate = 1.0;
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

  render() {
    let _this = this;
    let playerDoc = document.createElement('div');
    playerDoc.className = "convai-player";
    playerDoc.id = "convai-player";

    playerDoc.innerHTML = `
    <div class="convai-player-rewind">
      <img class="rewind--active" src="./resources/images/rewind-active.png" alt="rewind" />
      <img class="rewind" src="./resources/images/rewind.png" alt="rewind" />
    </div>
    <div class="convai-player-play" >
      <img class="rewind" src="./resources/images/play.png" alt="play" />
    </div>
    <div class="convai-player-forward" id="convai-player-forward" >
      <img class="forward--active" src="./resources/images/forward-active.png" alt="rewind" />
      <img class="forward" src="./resources/images/forward.png" alt="forward" />
    </div>
    <audio controls id="audio-player">
      <source src="./sounds//interation1.wav" type="audio/wav">
    </audio>`;
    this.player = playerDoc.querySelector('#audio-player');
    this.player.ontimeupdate = (evt) => {
      event.publish("ontimechanged", {
        currentTime: Number(evt.target.currentTime).toFixed(1),
        duration: this.player.duration
      });
    };
    playerDoc.querySelector(".convai-player-play").addEventListener('click', () => {
      _this.togglePlayPause();
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