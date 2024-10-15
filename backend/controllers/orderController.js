import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// this function is to create a new order and reduce from qty of products
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  // % create order 
  // read data from req

  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }else {
    const order= new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    // save order
    const createdOrder = await order.save();

    // delete item from qty
    for (const item of orderItems) {
      const product = await Product.findById(item._id);
  
      if (!product) {
        res.status(404);
        throw new Error(`Product not found: ${item._id}`);
      }
  
      if (product.countInStock < item.qty) {
        res.status(400);
        throw new Error(`Not enough stock for ${product._id}`);
      }
  
      product.countInStock -= item.qty;
      await product.save();
    }

    res.status(201).json(createdOrder);
  }
});




// show order for my account
// @desc    Get logged in user orders
// @route   GET /api/orders/myOrders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id});
  res.status(200).json(orders);
});



// get specific order 
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // Retrieve a specific order from the database by its ID
  const orders = await Order.findById(req.params.id).populate('user','name email');
  // Populate the 'user' field in the retrieved order document with data from related documents in the User collection
  if (orders){ 
    res.status(200).json(orders);
  }else{
    res.status(404);
    throw new Error('Order not found');
  }
});


// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {

  // check if this transaction has been used before
  const order = await Order.findById(req.params.id);
  if (order) {

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//change Delivered state fo order to delivered 
// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const changeOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//change Delivered state fo order to not delivered 
// @desc    Update order to not delivered
// @route   Post /api/orders/:id/deliver
// @access  Private/Admin
const changeOrderToNotDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = false;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});


//change paid state fo order to paid 
// @desc    Change order to paid
// @route   PUT /api/orders/:id/paid
// @access  Private/Admin
const changeOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});


//change paid state fo order to not paid 
// @desc    Change order to not paid
// @route   Post /api/orders/:id/paid
// @access  Private/Admin
const changeOrderToNotPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = false;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});





// get all orders
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.status(200).json(orders);

});


export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  changeOrderToPaid,
  changeOrderToNotPaid,
  changeOrderToDelivered,
  changeOrderToNotDelivered,
  getOrders,
};
