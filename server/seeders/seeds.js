const db = require("../config/connection.js");
const {Item,Category,User} = require("../models");
const highProteinMealSeeds = require('./highProteinSeeds.json');
const healthySnacksSeeds = require('./healthySnacksSeeds.json');
const veganMealSeeds = require('./veganSeeds.json');
const vegeterianMealSeeds = require('./VegetarianSeeds.json');
const ketoMealsSeeds = require('./ketoSeeds.json');
const drinkSeeds = require('./drinkSeeds.json');
const dessertsSeeds = require('./dessertsSeeds.json');
const CategoriesSeeds = require('./categoriesSeeds.json');


db.once('open', async () => { 
  try{
  
    //  Drop existing categories if any
  await Category.deleteMany();
  const categories = await Category.insertMany(CategoriesSeeds);

console.log("Different Categories of Meal has been successfully seeded");

  // Drop existing  items if any
await Item.deleteMany();

const itemsToInsert = [
  ...highProteinMealSeeds,
  ...vegeterianMealSeeds,
  ...veganMealSeeds,
  ...ketoMealsSeeds,
  ...healthySnacksSeeds,
  ...drinkSeeds,
  ...dessertsSeeds,
];
const items = await Item.insertMany(itemsToInsert);

console.log("Items has been seeded");

await User.deleteMany();
console.log("Users have been deleted");
  }
  catch (error) {
    console.error("Error:", error);
  } finally {
   
    db.disconnect();
  }

});
