class UserCreateDTO {
  constructor(props) {
    this.username = props?.username;
    this.fullname = props?.fullname;
    this.email = props?.email;
    this.password = props?.password;
  }

  static mapAll(rows) {
    return rows.map((row) => new UserCreateDTO(row));
  }

  static mapOne(row) {
    return new UserCreateDTO(row);
  }
}

module.exports = UserCreateDTO;
