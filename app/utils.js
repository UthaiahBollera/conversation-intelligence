export default {
  getTimeToclass: (startTime, EndTime) => {
    let arr = [];
    for (var i = startTime; i < EndTime; i = i + 0.1) {
      arr.push("word_" + Number(i).toFixed(1).split('.').join('_'));
    }
    return ` ${arr.toString().split(',').join(' ')} `;
  }
}