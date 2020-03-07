class SearchTranscript {
  constructor () {

  }
  render() {
    let eleDoc = document.createElement('div');
    eleDoc.id = eleDoc.className = "convai-search-transcript";
    const searchHTML =  `<i class="fa fa-search" aria-hidden="true"></i>
    <input type="text" placeholder="Search call transcript" />`;
    eleDoc.innerHTML = searchHTML;
    return eleDoc;
  }
}
export default new SearchTranscript;