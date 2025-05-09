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

const validateProfileUpdateData = (req) => {
  const allowedData = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "profileImage",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(req.body)?.every((key) =>
    allowedData?.includes(key)
  );

  return isAllowed;
};

module.exports = {
  validateSignUpData,
  validateProfileUpdateData,
};
