require("dotenv").config({ path: "./.env" });
const { app } = require("./app");
const { ConnectToDB } = require("./config/db");


const PORT = process.env.PORT || 8888;
console.log(PORT)

ConnectToDB()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is live on port no. ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo DB Connection Failed", error);
  });
