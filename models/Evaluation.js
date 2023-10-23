const { default: mongoose } = require("mongoose");

const reqString = {
    type: String,
    require: true,
};

const reqDate = {
    type: Date,
    require: true,
};

const EvaluationsSchema = new mongoose.Schema({
    Vehicle_Id: String,
    Vehicle_Manufacturer: String,
    Model: String,
    Year: String,
    Engine: String,
    Trim: String,
    Product_Description: String,
    Price: String,
    Currency: String,
    Seller_Dealer: String,
    Added_Date: reqDate,
    Accident: String,
    Location: String,
    VIN: String,
    Registration_Area: String,
    Paint_Condition: String,
    Service_History: String,
    Number_Of_Owners: String,
    Fault_Indication_Sign: String,
    Number_Of_Keys: String,
    Log_Book: String,
    Meeting_Point: String,
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
    Username: String,
    Images: Array,
});

const Evaluation = mongoose.model("evaluations", EvaluationsSchema);
module.exports = Evaluation;