export const LoginValidator = {
  validateName(name) {
    if (!name.trim()) return 'Name is required.';
    if (name.trim().length < 2) return 'Name must be at least 2 characters.';
    return '';
  },

  validateEmail(email) {
    if (!email.trim()) return 'Email is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Enter a valid email address.';
    return '';
  },

  validatePasswordBasic(password) {
    if (!password) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  },

  validatePasswordStrict(password) {
    if (!password) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (!/[A-Z]/.test(password)) return 'Include at least one uppercase letter.';
    if (!/[0-9]/.test(password)) return 'Include at least one number.';
    return '';
  },

  validateLogin({ email, password }) {
    return this.validateEmail(email) || this.validatePasswordBasic(password);
  },

  validateRegister({ name, email, password }) {
    return this.validateName(name) || this.validateEmail(email) || this.validatePasswordStrict(password);
  },
};