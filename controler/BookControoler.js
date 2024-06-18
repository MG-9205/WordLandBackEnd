const book = require("../model/Bookmodel");
const GetAllBook = async (req, res) => {
  const req_object = {};
  const { Book_name, Author_name, Genre } = req.query;
  if (Book_name) {
    req_object.Book_name = { $regex: Book_name, $options: "i" };
  }
  if (Author_name) {
    req_object.Author_name = { $regex: Author_name, $options: "i" };
  }
  if (Genre) {
    req_object.Genre = { $regex: Genre, $options: "i" };
  }

  try {
    const Books = await book.find(req_object);
    res.status(200).json({ Books });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { GetAllBook };
