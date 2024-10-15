import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  
  changeOrderToPaid,//
  changeOrderToNotPaid,//


  changeOrderToDelivered, //
  changeOrderToNotDelivered,//
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

router.route('/:id/deliver').put(protect, admin, changeOrderToDelivered);
router.route('/:id/deliver').post(protect, admin, changeOrderToNotDelivered);


router.route('/:id/paid').put(protect, admin, changeOrderToPaid);
router.route('/:id/paid').post(protect, admin, changeOrderToNotPaid);

export default router;
