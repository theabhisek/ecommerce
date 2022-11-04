const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/theabhishek", {
useNewUrlParser: true,
useUnifiedTopology: true
});

