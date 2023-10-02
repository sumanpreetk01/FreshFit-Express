const db = require("../config/connection.js");
const {Item,Category,User} = require("../models/index.js");



db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany(
    [
      {
        name:"Healthy Snacks"
      },
      {
        name:"Drinks"
      },
      {
         name:"High Protein Meal"
      },
      {
        name:"Vegetarian Meal"
      },
      {
        name:"Vegan Meal" 
       },
       {
        name:"Keto Meal"
       },
       {
        name:"Desserts"
       }
    ]
  );

  console.log('categories seeded');

  await Item.deleteMany();

  const Items = await Item.insertMany(
    
[
  //Healthy Snacks Starts
  {
    name: "Kale Chips",
    description:
      "These crispy oven-baked kale chips are a great homemade snack.Made by quickly tossing together three simple ingredients – fresh kale, olive oil, and flaked sea salt",
    image: "kalechips.jpg",
    price: 8.99,
    quantity: 1,
    category: categories[0]._id
  },

  {
    name: "Apple Chips",
    description:
      "Apple chips are chips or crisps that are prepared using apple",
    image: "AppleChips.webp",
    price: 3.99,
    quantity: 1,
    category: categories[0]._id
  },
  {
    name: "Zucchini Chips",
    description:
      "Zucchini chips are made with thin slices of zucchini coated with bread crumbs and Parmesan chees",
    image: "ZucchiniChips.webp",
    price: 7.99,
    quantity: 1,
    category: categories[0]._id
  },
  {
    name: "Sweet Potato Chips",
   description:
      "Sweet Potato Chips Recipe – Crisp, delicious, salty baked chips are made with sweet potatoes, olive oil, and spices.",
    image: "SweetPotato.jpg",
    price: 8.99,
    quantity: 1,
    category: categories[0]._id
  },
  {
    name: "Roasted green beans with Creamy dip sauce",
    description:
      "Roasted green beans are a light and healthy side dish to accompany heavier meals",
    image: "Roastedgreenbeans.png",
    price: 11.99,
    quantity: 1,
    category: categories[0]._id
  },
  {
    name: "Baked broccoli tots",
    description:
      "A healthy and delicious twist on tater tots, made with nutrient-rich broccoli and crispy breadcrumbs, perfect as a side or snack.",
    image: "Broccolitots.jpg",
    price: 10.99,
    quantity: 1,
    category: categories[0]._id
  },
  {
    name: " Chili-lime Roasted Chickpeas",
    description:
      "Roasting chickpeas are made with basic ingredients: cooked or canned chickpeas, extra-virgin olive oil, and salt.",
    image: "Chickpea.jpg",
    price: 9.99,
    quantity: 1,
    category: categories[0]._id
  },
  {
    name: "Blueberry and oats granola bar",
   description:
      "Granola bars are made from ingredients like oats, dried fruit, nuts, seeds, honey, coconut, and Blueberry",
    image: "granola-bar.jpeg",
    price: 2.99,
    quantity: 1,
    category: categories[0]._id
  },
  //Drinks starts here
  {
    name: "Chocolate Keto Protein Shake",
   description:
      "Chocolate Keto Protein Shake is packed with almond milk, almond butter, chia seeds, and hemp seeds",
    image: "ChocolateProtein.jpg",
    price: 7.99,
    quantity: 1,
    category: categories[1]._id
  },
  {
    name: "Peanut Butter Banana Smoothie",
    description:
      "Peanut butter Banana Smoothie is packed with protein, low in carbs, and is a very satisfying and delicious. It's perfect in post-workout smoothies or pre-workout snacks",
    image: "Peanutbutterbanana.jfif",
    price: 7.99,
    quantity: 1,
    category: categories[1]._id
  },
  {
    name: "Keto Smoothie",
   description:
      "Popular smoothie fruits like bananas or pineapples are a no-go on keto, so we've replaced them with lower carb raspberries, strawberries, and blackberries here.",
    image: "KetoSmoothie.jpg",
    price: 7.99,
    quantity: 1,
    category: categories[1]._id
  },
  {
    name: "Blueberry Smoothie",
   description:
      "Blueberry Smoothie is an excellent source of antioxidants and phytonutrients, which help to reduce inflammation, improve digestion, boost the immune system.",
    image: "BlueberrySmoothie.jpg",
    price: 8.99,
    quantity: 1,
    category: categories[1]._id
  },
  {
    name: "Perfect Green Smoothie",
    description:
      "Green smoothies combine leafy greens like spinach, kale, arugula, and microgreens with a base liquid like water.",
    image: "GreenSmoothie.jfif",
    price: 8.99,
    quantity: 1,
    category: categories[1]._id
  },
  {
    name: "Avocado Smoothie",
   description:
      "An Avocado smoothie is a creamy and nutritious beverage made primarily with ripe avocados blended with other ingredients to create a smooth, satisfying drink",
    image: "avocadosmoothie.jpg",
    price: 8.99,
    quantity: 1,
    category: categories[1]._id
  },
  {
    name: "Mango smoothie",
    description:
      "Mango smoothie is a refreshing and tropical beverage made by blending ripe mangoes with other ingredients like yogurt, milk (or dairy-free alternatives), and sweeteners ",
    image: "mangosmoothie.jfif",
    price: 8.99,
    quantity: 1,
    category: categories[1]._id
  },
  {
    name: "Tea",
    description:
      "Tea is a popular beverage made by steeping dried tea leaves or herbs in hot water.",
    image: "tea.png",
    price: 2.99,
    quantity: 1,
    category: categories[1]._id
  },
  {
    name: "Coeffe",
    description:
      "Coffee is a popular and widely consumed beverage made by brewing roasted coffee beans.",
    image: "Coeffe.jfif",
    price: 2.99,
    quantity: 1,
    category: categories[1]._id
  },
  {
    name: "Diet Coke",
    description:
      "Diet Coke is a popular sugar-free and calorie-free soft drink.",
    image: "coke.jfif",
    price: 2.99,
    quantity: 1,
    category: categories[1]._id
  },
//High Protein Seeds
  {
    name: "Balsamic Chicken Breast",
    description:
      "We made our chicken with vegetable brown rice (carrots and corn added) and kale lightly sautéed in olive oil.",
    image: "BalsamicChickenBreast.jfif",
    price: 11.99,
    quantity: 1,
    category: categories[2]._id
  },
  {
    name: "Broiled Asian Cod",
    description:
      "Boy Choy: Also known as Chinese cabbage, bok choy offers low-calories roughage (12 calories per 100 grams), and it’s high in vitamins A, B6, C, and K. ",
    image: "BroiledAsianCod.jfif",
    price: 14.99,
    quantity: 1,
    category: categories[2]._id
  },
  {
    name: "Turkey Stew",
    description:
      "Turkey stew is a delicious and comforting dish made with turkey meat and a variety of vegetables and seasonings.",
    image: "TurkeyStew.jfif",
    price: 13.99,
    quantity: 1,
    category: categories[2]._id
  },
  {
    name: "Lean Beef Meat Loaf",
    description:
      "Lean beef meatloaf is a dish made from ground beef that contains a lower fat content compared to traditional meatloaf recipes.",
    image: "BeefMeatloaf.jfif",
    price: 16.99,
    quantity: 1,
    category: categories[2]._id
  },
  {
    name: "Broiled Ginger Salmon",
    description:
      "Broiled ginger salmon is a delicious and healthy dish that combines the bold flavors of ginger and salmon.",
    image: "BroiledGingerSalmon.jfif",
    price: 9.99,
    quantity: 1,
    category: categories[2]._id
  },
  {
    name: "Spicy Shrimp Spinach Caesar Salad",
    description: "The protein in this salad comes from crispy baked shrimp, a luxurious Caesar dressing egg yolk and anchovy paste, and a sprinkle of Parmesan cheese for good measure. ",
    image:
    "shrimps-salad.jpeg",
    price: 12.99,
    quantity: 1,
    category: categories[2]._id
  },
  {
    name: "Cheesy Chicken Enchilada Pasta",
    description: "Who knew two perfect foods (enchiladas and pasta) could come together to make something even better? It's creamy. It's cheesy. It's full of protein.",
    image:
      "Chicken-Enchilada-Pasta.jpg",
    price: 15.99,
    quantity: 1,
    category: categories[2]._id
  },
  {
    name: "Easy Salmon Piccata",
    description:
      "If you already love chicken piccata—the briny, lemony, caper-packed Italian favorite—you'll be obsessed with this speedy salmon version, which comes together entirely in one pan and is perfect for weeknight dinners.",
    image: "cafe-delites-Salmon-Piccata.webp",
    price: 7.99,
    quantity: 1,
    category: categories[2]._id
  },
  {
    name: "Tilapia in Parchment With Tomato and Broccoli Over Rice",
     description: "Baked tilapia is one of the healthiest options for cooking tilapia.One of the delicious meal we have",
      image:"Tilapia-in-Parchment.jpeg",
     price: 7.99,
    quantity: 1,
    category: categories[2]._id
  },
//Vegetarian Meal
  {
    name: "Chickpea Salad with Smashed Cucumbers",
   description: "Chickpea Salad with Smashed Cucumbers is tossed with fresh tomatoes, crisp cucumber, bell pepper, red onion, feta, parsley, and a bright lemon vinaigrette",
   image:
  "chickpea-salad-smashed-cucumbers.jpeg",  
  price: 7.99,
    quantity: 1,
    category: categories[3]._id
  },
  {
    name: " Roasted Eggplant Veggie Burgers",
   description: "This eggplant burger has tons of flavorful spices and goes perfectly with some melty cheese and a brioche bun.",
    image:
   "Veggie-Burgers.jpeg", 
   price: 9.99,
    quantity: 1,
    category: categories[3]._id
  },
  {
    name: "Zucchini Linguine",
    description:
      "This cozy dish packs in plenty of veggies, thanks to the shredded zucchini and microgreens. Fresh, fluffy parmesan is the finishing touch.",
    image: "zucchini-linguine.jpeg",
    price: 11.99,
    quantity: 1,
    category: categories[3]._id
  },
  {
    name: "Sticky Tofu Bowl",
   description: "The tofu in this dish gets a sweet-salty flavor thanks to the blend of soy sauce, brown sugar and chili garlic sauce.",
    image:
  "Tofu-Bowl.jpeg",
   price: 9.99,
    quantity: 1,
    category: categories[3]._id
  },
  {
    name: "Vegetable Paella",
    description:
      "This dish takes inspiration from traditional Spanish-style seafood paella but leaves out the meat and fish for extra veggies instead!",
    image: "vegetable-paella.jpg",
    price: 11.99,
    quantity: 1,
    category: categories[3]._id
  },
  {
    name: "Mushroom and Brussels Sprout Pizza",
    description:
      "Shiitake mushrooms and two kinds of cheese elevate this pie beyond the typical red sauce pizza.",
    image: "mushroom-and-brussels-sprouts-pizza.jpg",
    price: 8.99,
    quantity: 1,
    category: categories[3]._id
  },
  {
    name: "Cauliflower Alfredo",
    description:
      "This deceptively decadent-looking pasta contains no cream or butter, is packed with fiber (and flavor!) and just happens to be vegan.",
    image: "cauliflower-alfredo.jpg",
    price: 9.99,
    quantity: 1,
    category: categories[3]._id
  },
  {
    name: "Kale and Roasted Cauliflower Salad",
    description:
      "O.G. vegetarian go-tos kale and cauliflower join forces in this killer salad. Feta, pine nuts and raisins add to the party.",
    image: "KALE-roasted-cauliflower-salad.jpg",
    price: 8.99,
    quantity: 1,
    category: categories[3]._id
  },
  {
    name: "Coconutty Rice and Peas",
    description:
      "This meal is rich, comforting and a complete protein.",
    image: "coconutty-rice-peas.jpg",
    price: .99,
    quantity: 1,
    category: categories[3]._id
  },
  {
    name: "Provolone Veggie Party Subs",
   description:
      "Provolone Veggie Party Subs are delicious sandwiches filled with a variety of vegetables and provolone cheese. ",
    image: "provolone-veggie-party-subs.jpg",
    price: .99,
    quantity: 1,
    category: categories[3]._id
  },
  //Vegan Meal
  {
    name: "Broccoli and peanut soba noodles",
    description:
      "The fresh greens are a great combination with the noodles while the roasted peanuts adds a crunchy texture to the dish.",
      image:"brocolli-peanut-noodles.webp",
      price: 11.99,
    quantity: 1,
    category: categories[4]._id
  },
  {
    name: "Spinach, chickpea and potato curry",
    description:
      "Our gently spiced vegan curry packed with spinach, chickpeas and potato makes for a wholesome midweek meal for four.",
      image:"SpinachChickpeaPotatoCurry.webp",
      price: 12.99,
    quantity: 1,
    category: categories[4]._id
  },
  {
    name: "Vegan gumbo",
    description:
      "Try this veg-packed gumbo, inspired by the classic Southern dish, for a vegan dish that’s as healthy as it is filling.",
      image:"VeganGumbo.webp",
      price: 11.99,
    quantity: 1,
    category: categories[4]._id
  },
  {
    name: "Vegan aubergine curry",
    description:
      "Cook aubergine pieces with fragrant spices and red lentils for a hearty yet healthy vegan curry that serves four.",
    image:"AubergineCurry.webp", 
       price: 11.99,
    quantity: 1,
    category: categories[4]._id
  },
  {
    name: "Moroccan veggie soup",
    description:
      "Check out our easy Moroccan vegan soup recipe with lemons, chickpeas and plenty of spice.",
      image:"Moroccan-veggie-soup.jpeg",
      price: 8.99,
    quantity: 1,
    category: categories[4]._id
  },
  {
    name: "Vegan chilli tofu ramen",
    description:
      "This chilli tofu version is plant-based and packed with loads of fresh flavours.",
      image:"chillitofuramen.webp",
      price: 14.99,
    quantity: 1,
    category: categories[4]._id
  },
  {
    name: "Vegan quinoa and black bean chilli",
    description:
      " Check out this quick and easy vegan chilli recipe. Our quinoa and black bean chilli is high in protein, fibre and vegan – but still tastes impossibly creamy.",
      image:"quinoa.webp",
      price: 11.99,
    quantity: 1,
    category: categories[4]._id
  },
  {
    name: "Shredded veg miso soup",
    description:
      "Shred ginger, leeks and carrots into this umami-rich soup and top up with quinoa and kale for a nourishing, light meal.",
      image:"VeggieMisoSoup.webp",
      price: 11.99,
    quantity: 1,
    category: categories[4]._id
  },
  {
    name: "Vegan sweet potato soup",
    description:
      "Check out this easy vegan soup recipe with sweet potato and groundnut. Packed with punchy chilli and smooth peanut butter this flavoursome soup is super creamy, and totally satisfying.",
      image:"SweetPotatosoup.webp",
      price: .99,
    quantity: 1,
    category: categories[4]._id
  },
  {
    name: "Moroccan tagine",
    description:
      "This recipe for Moroccan veg and chickpea tagine is vegan, low-fat and really easy to make. This makes enough for four, but the leftovers freeze well.",
      image:"morroccantagine.webp",
      price: .99,
    quantity: 1,
    category: categories[4]._id
  },
  //Keto Meal
  {
    name: "Chinese Broccoli With Soy Paste",
    description:
      "This dish is all about the sweet and salty soy paste, which balances out the bitterness of the broccoli.",
      image:"Chinese-Broccoli.webp",
      price: 11.99,
    quantity: 1,
    category: categories[5]._id
  },
  {
    name: "Poached Cod in Tomato Curry",
    description:
      "We opted to use cherry tomatoes for this poached cod recipe because we like their sweetness and how quickly they collapse into a sauce.",
      image:"poached_Tomato_Curry_16x9.webp",
      price: 10.99,
    quantity: 1,
    category: categories[5]._id
  },
  {
    name: "Fresh Pepper Kung Pao Chicken",
    description:
      "Fresh Pepper Kung Pao Chicken is a popular Chinese stir-fry dish known for its bold flavors and a combination of tender chicken, crunchy peanuts, and colorful bell peppers. ",
      image:"kung-pao-chicken.jpeg",
      price: 9.99,
    quantity: 1,
    category: categories[5]._id
  },
  {
    name: "Green-Garlic-Rubbed Buttery Roast Chicken",
    description:
      "As the chicken cooks low and slow, the green garlic and turns into a crispy crumb topping.",
      image:"Garlic-Rubbed-Buttery-Roast-Chicken.webp",
      price: 9.99,
    quantity: 1,
    category: categories[5]._id
  },
  {
    name: "Pork and Asparagus Stir-Fry",
    description:
      "A Sichuan-inspired stir-fry of blistered yet snappy asparagus and crispy pork in an aromatic sauce",
      image:"Picky-Eaters-Pork-Asparagus-Stir-Fry.webp",
      price: 11.99,
    quantity: 1,
    category: categories[5]._id
  },
  {
    name: "Tangy Vinegar Chicken",
    description:
      "Fresh Pepper Kung Pao Chicken is a popular Chinese stir-fry dish known for its bold flavors and a combination of tender chicken, crunchy peanuts, and colorful bell peppers.",
      image:"Tangy-Vinegar-Chicken.webp",
      price: 10.99,
    quantity: 1,
    category: categories[5]._id
  },
  {
    name: "Healthyish Chicken Salad",
    description: "This is the summery chicken salad you could eat plate after plate of without feeling like you’ve downed a jar of mayonnaise—because you didn't!",
   image:"Chicken-Salad-16x9.webp",
   price: 11.99,
    quantity: 1,
    category: categories[5]._id
  },
  {
    name: "Fall-Apart Caramelized Cabbage",
   description:
      "Fall-Apart Caramelized Cabbage is a delicious side dish that features cabbage slow-cooked to perfection until it becomes tender, sweet, and caramelized. ",
      image:"Cabbage.webp",
      price: 14.99,
    quantity: 1,
    category: categories[5]._id
  },
  {
    name: "Saucy Chicken Puttanesca",
    description:
      "Here, chicken legs are gently oven-braised in puttanesca sauce until nearly falling off the bone. ",
      image:"Chicken-Puttanesca.webp",
      price: 16.99,
    quantity: 1,
    category: categories[5]._id
  },
  {
    name: "Sichuan Boiled Fish",
    description:
      "The flavors of this fish are out of control—super spicy, super intense, super delicious.",
      image:"Sichuan-Boiled-Fish.jpeg",
      price: 11.99,
    quantity: 1,
    category: categories[5]._id
  },
  //Desserts
  {
    name: "Chia and coconut pudding",
    description:
      "Indulge in a taste of tropical paradise with this mouth-watering coconuty dessert containing healthy chia seeds.",
    image:"chia-and-coconut-pudding.jpeg",
      price: 8.99,
    quantity: 1,
    category: categories[6]._id
  },
  {
    name: "Lemon and yoghurt syrup cakes",
   description:
      "Create these tasty syrup cakes that incorporates healthier options of coconut sugar, spelt flour and low-fat Greek yoghurt.",
      image:"lemon-and-yoghurt-syrup-cakes.jpeg",
      price: 7.99,
    quantity: 1,
    category: categories[6]._id
  },
  {
    name: "Gooey peanut butter and chocolate fridge bars",
    description:
       "These bars combine the creamy goodness of peanut butter with rich, sweet chocolate for a decadent treat",
      image:"fridge-bars.jpeg",
      price: 5.99,
    quantity: 1,
    category: categories[6]._id
  },
  {
    name: "Lemon panna cotta with vodka blueberry syrup",
    description:
      "This lemon panna cotta is very creamy but it's low in fat!",
      image:"lemon-panna-cotta.jpeg",
      price: 6.99,
    quantity: 1,
    category: categories[6]._id
  },
  {
    name: "Strawberry frozen yoghurt",
    description:
      "Your kids will love this health-right snack of strawberry frozen yoghurt.",
      image:"strawberry-frozen-yoghurt.jpeg",
      price: .99,
    quantity: 1,
    category: categories[6]._id
  },
  {
    name: "Peanut butter ice-cream cups",
    description:
      "Yes, you can give in to temptation - thse gooey peanut butter ice-cream cups are guilt free!",
      image:"peanut-butter-ice-cream-cups.jpeg",
      price: 4.99,
    quantity: 1,
    category: categories[6]._id
  },
  {
    name: "Frozen strawberry cheesecake",
    description:
      "Using buckwheat, almonds, coconut and dates in the base instead of biscuits means this cheesecake cuts down on processed sugars and adds natural goodness. ",
      image:"frozen-strawberry-cheesecake.jpeg",
      price: 8.99,
    quantity: 1,
    category: categories[6]._id
  },
  {
    name: "Banoffee coconut chia puddings",
    description:
      "Try this vegan and sugar-free dessert for a healthy, guilt-free treat.",
      image:"banoffee-coconut-chia-puddings.jpeg",
      price: 7.99,
    quantity: 1,
    category: categories[6]._id
  },
  {
    name: "Healthier no bake fruity cheesecake tarts",
    description:
      "There's no need to miss out on cheesecake with this healthier, no-bake recipe.",
      image:"healthier-no-bake-fruity-cheesecake-tarts.jpeg",
      price: 7.99,
    quantity: 1,
    category: categories[6]._id
  },
  {
    name: "Mango labne cheesecake",
    description:
      "Make the most of the Aussie mango season with this delicious tart with creamy labne, macadamia base and hint of lime - the perfect light summer treat.",
      image:"mango-labne-cheesecake.jpeg",
      price: 7.99,
    quantity: 1,
    category: categories[6]._id
  }
]


  );

  console.log('items seeded');

  await User.deleteMany();

  
  process.exit();
});

