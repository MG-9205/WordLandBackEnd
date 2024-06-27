const FeedBack = require("../model/FeedBack");

const FeedBackHandler = async (req, res) => {
  const { Name, Email, feedback } = req.body;

  if (!Name || !Email || !feedback) {
    return res.status(402).json({
      msg: "Some error occurred. All fields are required.",
    });
  }

  try {
    const existingUser = await FeedBack.findOneAndUpdate(
      { Email },
      { $push: { feedback: feedback } },
      { new: true }
    );

    if (!existingUser) {
      await FeedBack.create({
        Name,
        Email,
        feedback: Array.isArray(feedback) ? feedback : [feedback],
      });
      res.json({
        msg: "feedback send successfully!",
      });
    } else {
      res.json({
        msg: "feedback send successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Some error occurred while saving feedback.",
    });
  }
};

module.exports = { FeedBackHandler };
