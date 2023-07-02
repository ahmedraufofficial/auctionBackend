const { default: mongoose } = require("mongoose");

const reqString = {
    type: String,
    require: true,
};

const reqDate = {
    type: Date,
    require: true,
};

const NegotiationsSchema = new mongoose.Schema({
    Auction_Id: String,
    Vehicle_Id: String,
    Auction_Type: String,
    Product_Description: String,
    Currency: String,
    Current_Bid: String,
    Buy_Now_Price: String,
    Negotiation_Start_Date: Date,
    Allow_Negotiation: String,
    Negotiation_Duration: String,
    Negotiation_Mode: String,
    Vehicle_Title: String,
    Set_Incremental_Price: String,
    Status: String,
    Bids: Array,
    Images: Array,
    Allow_Auction_Sniping: String,
    Incremental_Time: String,
});

const Negotiation = mongoose.model("negotiations", NegotiationsSchema);
module.exports = Negotiation;