const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    // User details
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    address: {
      type: String,
      required: [true, 'Delivery address is required'],
    },
    city: { type: String },
    pincode: { type: String },

    // Products ordered
    products: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'Order must have at least one product',
      },
    },

    // Pricing
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },

    // Status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },

    paymentMethod: {
      type: String,
      enum: ['cod', 'online'],
      default: 'cod',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
