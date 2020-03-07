import event from "../../event.js";

class PlaySpeedAdjust {

  constructor () {
    this.element = null;
    this.render();
  }

  addEvents() {
    this.element.querySelector('#speed-select').addEventListener('change', (e) => {
      event.publish('onSpeedChange', {
        speed: e.target.value
      });
    });
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = this.element.id = "convai-speed-adjust";
    this.element.innerHTML = `<select name="speed-select" id="speed-select">
      <option value="1.0">1.0x</option>
      <option value="2.0">2.0x</option>
      <option value="3.0">3.0x</option>
    </select>`;
    this.addEvents();
    return this.element;
  }
};
export default new PlaySpeedAdjust();