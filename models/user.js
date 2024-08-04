class User {
  constructor(props) {
    this.id = props?.id;
    this.username = props?.username;
    this.fullname = props?.fullname;
    this.email = props?.email;
    this.password = props?.password;
    this.created_at = props?.created_at;
    this.updated_at = props?.updated_at;
    this.isActive = props?.isactive;
    this.isDeleted = props?.isdeleted;
  }

  static mapAll(rows) {
    return rows.map((row) => new User(row));
  }

  static mapOne(row) {
    return new User(row);
  }
}

module.exports = User;
