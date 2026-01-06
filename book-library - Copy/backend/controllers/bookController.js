import bookModel from "../models/BookModel.js"

const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find().populate("ownerId", "name email");
    return res.json({success:true,books});
  } catch (error) {
    return res.json({success:false, message: "Failed to fetch books!" });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id).populate(
      "ownerId",
      "name email"
    );

    if (!book) {
      return res.json({success:false, message: "Book not found" });
    }

    return res.json({success:true,book});

  } catch (error) {
    return res.json({success:false, message: "Failed to fetch book" });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;

    const book = await bookModel.create({
      title,
      author,
      genre,
      description,
      ownerId: req.user.id
    });

    return res.json({success:true,book});
  } catch (error) {
    res.json({ success:false, message: "Failed to create book" });
  }
};


const updateBook = async (req, res) => {
  try {
    const id= req.params.id;
    const book = await bookModel.findById(req.params.id);

    if (!book) {
      return res.json({success:false, message: "Book not found" });
    }

    if (book.ownerId.toString() !== req.user.id) {
      return res.json({success:false, message: "Not authorized" });
    }

    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      {...req.body,
      updateAt: Date.now()
    },
      { new: true }
    );

    return res.json({success:false, updatedBook});
  } catch (error) {
    return res.json({success:false, message: "Failed to update book" });
  }
};


const deleteBook = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);

    if (!book) {
      return re.json({success:false, message: "Book not found" });
    }

    if (book.ownerId.toString() !== req.user.id) {
      return res.json({ success:false, message: "Not authorized" });
    }

    await book.deleteOne();
    return res.json({success:true, message: "Book deleted successfully" });
  } catch (error) {
    return res.json({success:false, message: "Failed to delete book" });
  }
};


export {getAllBooks,getBookById,createBook,updateBook,deleteBook}