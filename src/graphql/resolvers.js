const {RegisterUser, LoginUser, DeleteUser, updateUser}= require("../controllers/user.controller")

const resolvers = {
    Query: {
        users: async () => {
            return await UserModel.find();
        },
        user: async (_, { id }) => {
            return await UserModel.findById(id);
        },
        books: async () => {
            return await BookModel.find();
        },
        book: async (_, { id }) => {
            return await BookModel.findById(id);
        },
        searchBooks: async (_, { name }) => {
            return await BookModel.find({ title: new RegExp(name, 'i') });
        },
    },
    Mutation: {
        addUser: async (_, { email, password, role }) => { return await RegisterUser({ email, password, role })},
        loginUser : async (_, {email,password}, context)=> {return await LoginUser({email,password}, context)},
        updateUser: async (_, {email, password }, context) => { return await updateUser({ email, password }, context) },
        deleteUser: async (_, {}, context) => {return await DeleteUser(context)},


        addBook: async (_, { title, author, publishedYear, isAvailable, owner }) => {
            const book = new BookModel({ title, author, publishedYear, isAvailable, owner });
            await book.save();
            return book;
        },
        updateBook: async (_, { id, title, author, publishedYear, isAvailable, owner }) => {
            const updates = {};
            if (title) updates.title = title;
            if (author) updates.author = author;
            if (publishedYear) updates.publishedYear = publishedYear;
            if (isAvailable !== undefined) updates.isAvailable = isAvailable;
            if (owner) updates.owner = owner;
            return await BookModel.findByIdAndUpdate(id, updates, { new: true });
        },
        deleteBook: async (_, { id }) => {
            return await BookModel.findByIdAndDelete(id);
        },
    },
};

module.exports = resolvers;
