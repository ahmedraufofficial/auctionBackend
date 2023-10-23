const { default: mongoose } = require("mongoose");

const reqString = {
    type: String,
    require: true,
};

const reqDate = {
    type: Date,
    require: true,
};

const ClassifiedsSchema = new mongoose.Schema({
    Vehicle_Id: String,
    Vehicle_Manufacturer: String,
    Model: String,
    Year: String,
    Engine: String,
    Trim: String,
    Product_Description: String,
    Price: String,
    Added_Date: reqDate,
    Features: Array,
    Location: String,
    VIN: String,
    Availability: String,
    Cylinders: String,
    Condition: String,
    Exterior_Color: String,
    Kilometers: String,
    Body_Style: String,
    Transmission: String,
    Fuel_Type: String,
    Interior_Color: String,
    Doors: String,
    Specs: String,
    Seller_Name: String,
    Seller_Contact: String,
    Username: String,
    Images: Array,
});

const Classified = mongoose.model("classifieds", ClassifiedsSchema);
module.exports = Classified;