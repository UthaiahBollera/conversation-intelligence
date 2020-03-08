import event from "../../event.js";

class SearchTranscript {
  constructor () {
    this.eleDoc = null;
  }
  attachEvents() {
    this.eleDoc.querySelector('#transcript-search').addEventListener('keyup', (e) => {
      const { value } = e.target || {};      
        event.publish('onSearchChange', {
          searchItem: value
        });      
    });
  }
  render() {
    this.eleDoc = document.createElement('div');
    this.eleDoc.id = this.eleDoc.className = "convai-search-transcript";
    const searchHTML = `<i class="fa fa-search" aria-hidden="true"></i>
    <input type="text" placeholder="Search call transcript" id="transcript-search" />`;
    this.eleDoc.innerHTML = searchHTML;
    this.attachEvents();
    return this.eleDoc;
  }
}
export default new SearchTranscript;