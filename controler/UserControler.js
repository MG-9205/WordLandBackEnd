const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");

const { z } = require("zod");

const jwtPassword = process.env.JWT_PASSWORD;

const signUpInputValidation = z.object({
  Email: z.string().email("must be a valid Email"),
  Username: z
    .string()
    .min(8, { message: "Username must contain at least 8 letters" }),
  Password: z
    .string()
    .min(6, { message: "Password must contain at least 6 letters" })
    .regex(/\d/, { message: "Password must contain a number" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain a special character",
    }),
});

const passwordChecker = (user, password) => {
  if (user.Password == password) {
    return true;
  } else {
    return false;
  }
};

const jwtTokenGenerator = (username) => {
  const token = jwt.sign({ username }, jwtPassword, { expiresIn: "1h" });
  return token;
};

const SignUp = async (req, res) => {
  try {
    signUpInputValidation.parse(req.body);

    const { Email, Username, Password } = req.body;

    if (Email && Username && Password) {
      const existingUser = await User.findOne({ Email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email already in use" });
      }
      await User.create({
        Email,
        Username,
        Password,
      });

      const token = jwtTokenGenerator(Username);

      res.setHeader("X-Auth", token);

      res.json({ msg: "User created successfully" });
    } else {
      res
        .status(400)
        .json({ msg: "Please provide Email, Username, and Password" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.log(error);
    res.status(500).json({ msg: "Error creating user", error: error.message });
  }
};

const UserLogin = async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const user = await User.findOne({ Username });

    if (!user) {
      return res.status(404).json({ msg: "Username not found" });
    }

    const isPasswordValid = passwordChecker(user, Password);

    if (isPasswordValid) {
      const token = jwtTokenGenerator(Username);

      res.setHeader("X-Auth", token);

      res.json({ msg: "Login Successful" });
    } else {
      res.status(401).json({ msg: "Login Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error logging in", error: error.message });
  }
};

module.exports = { SignUp, UserLogin };
