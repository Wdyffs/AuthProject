interface IValidationService {
  validateLogin(login: string): void;
  validatePassword(password: string): void;
}
class Validation implements IValidationService {
  validateLogin(login: string): void {
    if (!login.trim()) {
      throw "Login must be fullfield";
    }
    const regex = new RegExp("^[A-Za-z-0-9]{3,16}$");
    if (!regex.test(login)) {
      throw "Login minLength - 3, maxLength - 16, no spaces";
    }
  }
  validatePassword(password: string): void {
    const pwd = password.trim();
    if (!pwd) {
      throw "Password must be fullfield";
    }
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,16}$/;
    if (!regex.test(pwd)) {
      throw "Password minLength - 8, maxLength - 16, 1 special symbol, no spaces";
    }
  }
}
const validationService = new Validation();
exports.validationService = validationService;
