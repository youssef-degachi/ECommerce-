import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();


// import data exist in data/users.js and data/products.js in //=>database
const importData = async () => {
  try {
    // delete all data from the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // insert new user data into User collection and store the created users
    const createdUsers = await User.insertMany(users);
    // modify first user to admin is admin@email.com
    const adminUser = createdUsers[0]._id;


    // make all product in the products list to include the ID of the admin user
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    // insert new product into  Product collection
    await Product.insertMany(sampleProducts);
    // show that import function  works correctly
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// delete all data in database
const destroyData = async () => {
  try {
    // delete all data from the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    // show that delete function  works correctly
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
//for call it using cmd => look at package.json
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
