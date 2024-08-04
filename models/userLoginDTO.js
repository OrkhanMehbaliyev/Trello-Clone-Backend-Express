class UserLoginDTO {
  constructor(props) {
    this.username = props?.username;
    this.password = props?.password;
  }

  static mapOne(row) {
    return new UserLoginDTO(row);
  }

  static mapAll(rows) {
    return rows.map((row) => new UserLoginDTO(row));
  }
}

module.exports = UserLoginDTO;
