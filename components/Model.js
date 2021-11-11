class Model {
  uid;
  userName;
  surName;
  email;
  mobile;
  photo;
  password;
  users;
  messages = [];
  allUsers = null;
  numberOfGuest;
  timeIn;
  timeOut;
  date;
  description;
  location;

  constructor() {}

  setUid(uid) {
    this.uid = uid;
  }

  setLocation(location) {
    this.location = location;
  }
  setName(name) {
    this.userName = name;
  }

  setSurname(surname) {
    this.surName = surname;
  }

  setEmail(email) {
    this.email = email;
  }

  setMobile(mobile) {
    this.mobile = mobile;
  }
  setNumberOfGuest(numberOfGuest) {
    this.numberOfGuest = numberOfGuest;
  }
  setTimeIn(timeIn) {
    this.timeIn = timeIn;
  }
  setTimeOut(timeOut) {
    this.timeOut = timeOut;
  }
  setDate(date) {
    this.date = date;
  }

  setPhoto(photo) {
    this.photo = photo;
  }

  setPassword(password) {
    this.password = password;
  }
  setUsers(users) {
    this.users = users;
  }
  setDecription(description) {
    this.description = description;
  }
}

const globalUserModel = new Model();
export default globalUserModel;
