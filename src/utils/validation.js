const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req?.body;
  console.log(firstName, lastName);
  if (!firstName || !lastName) {
    throw new Error("name is not valid");
  } else if (!validator?.isEmail(emailId)) {
    throw new Error("email is not valid");
  } else if (!validator?.isStrongPassword(password)) {
    throw new Error("email is not valid");
  }
};

module.exports = {
  validateSignUpData,
};
