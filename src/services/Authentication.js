export default class AuthenticationService {
  static signUserOut () {
    window.blockstack.signUserOut(window.location.href)
  }
}
