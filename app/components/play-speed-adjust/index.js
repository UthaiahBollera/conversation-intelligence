class PlaySpeedAdjust {
  constructor () { }
  render() {
    let div = document.createElement('div');
    div.innerHTML = `<div class="convai-speed-adjust">
    <select name="speed-select" id="speed-select">
      <option value="1.0x">1.0x</option>
      <option value="2.0x">2.0x</option>
      <option value="3.0x">3.0x</option>
    </select>
  </div>`;
    return div.outerHTML;
  }
};
export default new PlaySpeedAdjust();