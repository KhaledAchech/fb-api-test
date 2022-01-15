const dotenv = require("dotenv");
dotenv.config();
const express = require ("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// set port, listen for requests
const PORT = process.env.PORT || 5050;

//connect to DB
mongoose
  .connect(process.env.DB_CONNNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo is up."))
  .catch((err) => console.log("Mongo is Down. Raison :", err));

//Routes
app.get('/', (req,res) => {
    res.send("<h1> we're home ^^ </h1>")
})
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);


//facebook login uri
var request = require('request');
var OAuth2 = require('oauth').OAuth2;
var oauth2 = new OAuth2("248168070726587",
                        "72df90e90483d55e8f6b560e1dc8c6a6",
                       "", "https://www.facebook.com/dialog/oauth",
                   "https://graph.facebook.com/oauth/access_token",
                   null);
  
app.get('/facebook/auth',function (req, res) {
      var redirect_uri = "http://localhost:5050/";
      // For eg. "http://localhost:3000/facebook/callback"
      var params = {'redirect_uri': redirect_uri, 'scope':'public_profile'};
      res.redirect(oauth2.getAuthorizeUrl(params));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});