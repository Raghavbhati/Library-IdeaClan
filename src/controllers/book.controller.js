const { BookModel } = require("../models/book.model");


const addNewBook = async (bookData)=>{
    const { title, author, publishedYear} = bookData;

    try {
        if(!title || !author || !publishedYear){
            throw new Error("All fields are required, Please add all reqired infromastion");
        }

        const newBook = await BookModel.create({ title, author, publishedYear});
        if(!newBook){
            throw Error("Unable to create new book at that moment");
        }

        return newBook;
    } catch (error) {
        throw error;
    }
}

const updateBook = async (data) => {
    const { id, title, author, publishedYear } = data;

    const updates = {};
    if (title) updates.title = title;
    if (author) updates.author = author;
    if (publishedYear) updates.publishedYear = publishedYear;

    try {
        const updatedBook = await BookModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedBook) {
            throw new Error("Book not found or unable to update the book right now");
        }

        return updatedBook;
    } catch (error) {
        throw error;
    }
};


const deleteBook = async (id)=>{
    try {
       const deletedBook =  await BookModel.findByIdAndDelete(id);

       if(!deletedBook){
         throw Error("Unable to delete book at that moment");
       }

       return deletedBook;
    } catch (error) {
        throw error
    }
}

module.exports = {addNewBook,updateBook,deleteBook}