const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://0.0.0.0:27017/FruitsDB');


  const fruitSchema = new mongoose.Schema({
    name: {
      type:String,
      required:true},
    rating: Number,
    review: String
  });

  const Fruit = mongoose.model("Fruit", fruitSchema);

const Banana= new Fruit({
  name:"Banana",
  rating:8,
  review:"Great!!!!"
})
//await Banana.save();

  const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Great!"
  });

  //await fruit.save();

  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
  });

  const Person = mongoose.model('Person', personSchema);

  const person = new Person({
    name: "John",
    age: 37,
    favouriteFruit:Banana
  });

  //await person.save();

  const kiwi= new Fruit({
    name:"kiwi",
    rating:10,
    review:"The best fruit!"
  })

  const orange= new Fruit({
    name:"Orange",
    rating:5,
    review:"too sour"
  })
  //try {
    //await Fruit.insertMany([kiwi, orange]);
  //  console.log("Successfully saved all the fruits");
//  } catch (error) {
  //  console.error("Error saving fruits:", error);
//  };





  const fruits = await Fruit.find({}).exec();
  fruits.forEach(fruit => console.log(fruit.name));

  const deleteResult = await Person.deleteOne({ name: "John" });
  if (deleteResult.deletedCount > 0) {
    console.log("Successfully deleted the fruit.");
  } else {
   console.log("Fruit not found.");
 }

  mongoose.connection.close();
}
