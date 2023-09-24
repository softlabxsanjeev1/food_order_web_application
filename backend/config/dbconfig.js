const mongoose =require('mongoose');
const mongoUrl = "mongodb+srv://Sanjeevkumar:HArinder321@cluster0.pdvqf9v.mongodb.net/gofoodmern?retryWrites=true&w=majority"


const connectDB = async () => {
    await mongoose.connect(mongoUrl)       
          console.log("Connected");

    const fetched_data = await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray().then((data) => {
       global.food_items = data
        // console.log(food_items)   
        
    })
    const foodCategory = mongoose.connection.db.collection("foodCategory");
    foodCategory.find({}).toArray().then((catData) => {
        global.foodCategory = catData
        // console.log(foodCategory)
    })        
    
    }                        



module.exports = connectDB();