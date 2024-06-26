const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");

const { z } = require("zod");

const jwtPassword = process.env.JWT_PASSWORD;

const signUpInputValidation = z.object({
  Email: z.string().email("must be a valid Email"),
  Username: z
    .string()
    .min(4, { message: "Username must contain at least 8 letters" }),
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
      const existingUser = await User.findOne({ $or: [
        { Email: Email },
        { Username: Username }
      ]});
      if (existingUser) {
        return res.status(400).json({ msg: "Email or Username already in use" });
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
      return res.status(400).json({ msg: error.errors.map(err => err.message).join(', ') });
    }
    console.log(error);
    res.status(500).json({ msg: "Error creating user" });
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
      res.status(401).json({ msg: "Username not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error logging in" });
  }
};
const HandleLibrary = async (req, res) => {
  const token = req.header('X-Auth');
  const { bookID } = req.body;
  const param=req.query
  if (!token) {
    return res.status(401).json({ msg: "Failed" });
  }

  try {
    const decode = jwt.verify(token, jwtPassword);
    const Username = decode.username;
    const user = await User.findOne({ Username });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (param.remove === 'true') {
      await User.updateOne(
        { Username },
        { $pull: { Library: bookID } }
      );

      return res.json({ msg: "Successfully removed" });
    } else {
      const isBookInLibrary = user.Library.includes(bookID);

      if (!isBookInLibrary) {
        user.Library.push(bookID);
        await user.save();
        return res.json({ msg: "Successfully stored" });
      }
      return res.json({
        msg: "Book is already in your Library"
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Unable to store" });
  }
};
const sendUserLibrary = async (req, res) => {
  const token = req.header('X-Auth');

  if (!token) {
    return res.status(401).json({ msg: "Failed" });
  }

  try {
    const { username } = jwt.verify(token, jwtPassword);
    const user = await User.findOne({ Username: username }).select('Library');

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ LibraryData: user.Library });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "An internal error occurred" });
  }
};

module.exports = { SignUp, UserLogin, HandleLibrary,sendUserLibrary};
