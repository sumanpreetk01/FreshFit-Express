const db = require("./connection");
const { User, Item, Category,Order } = require("../models");
const higProteinMealSeeds = require('./highProteinSeeds.json');
const healthySnacksSeeds = require('./healthySnacksSeeds.json');
const veganMealSeeds = require('./veganSeeds.json');
const vegeterianMealSeeds = require('./VegetarianSeeds.json');
const ketoMealsSeeds = require('./ketoSeeds.json');
const drinkSeeds = require('./drinkSeeds.json');
const dessertsSeeds = require('./dessertsSeeds.json');


db.once('open', async () => {
  await Category.deleteMany();

});