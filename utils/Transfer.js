class TransferClass {
  constructor(statCode, result) {
    this.statCode = statCode;
    this.result = result;
  }
}

function Transfer(statCode, result) {
  return new TransferClass(statCode, result);
}

module.exports = Transfer;
