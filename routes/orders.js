const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders - Place new order
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, city, pincode, products, subtotal, shippingCost, totalPrice, paymentMethod } = req.body;

    if (!name || !phone || !address || !products || products.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const order = new Order({
      name,
      email,
      phone,
      address,
      city,
      pincode,
      products,
      subtotal,
      shippingCost: shippingCost || 0,
      totalPrice,
      paymentMethod: paymentMethod || 'cod',
    });

    const saved = await order.save();
    res.status(201).json({
      message: 'Order placed successfully!',
      order: saved,
      orderId: saved._id,
    });
  } catch (err) {
    res.status(400).json({ message: 'Failed to place order', error: err.message });
  }
});

// GET /api/orders - Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
});

// GET /api/orders/:id - Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Order not found' });
    res.status(500).json({ message: 'Failed to fetch order', error: err.message });
  }
});

// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update order status', error: err.message });
  }
});

module.exports = router;
