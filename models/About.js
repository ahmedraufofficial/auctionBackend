const { default: mongoose } = require("mongoose");

const AboutSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
});

const About = mongoose.model("abouts", AboutSchema);
module.exports = About;