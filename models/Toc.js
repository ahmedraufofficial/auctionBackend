const { default: mongoose } = require("mongoose");

const TocSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
});

const Toc = mongoose.model("tocs", TocSchema);
module.exports = Toc;