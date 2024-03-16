const {RegisterUser, LoginUser, DeleteUser, updateUser}= require("../controllers/user.controller")
const {addNewBook,updateBook,deleteBook} = require("../controllers/book.controller");
const authorization = require("../middleware/authorization.middleware");


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


        addBook: async (_, { title, author, publishedYear}, context) => {
            if(!authorization(context, "Admin")){
                return await addNewBook({ title, author, publishedYear})
            }
        },
        updateBook: async (_, { id, title, author, publishedYear}, context) => {
            if(!authorization(context, "Admin")){
                return await updateBook({id, title, author, publishedYear})
            }
        },
        deleteBook: async (_, { id }, context) => {
            if(!authorization(context, "Admin")){
                return await deleteBook(id)
            }
        },
    },
};

module.exports = resolvers;
