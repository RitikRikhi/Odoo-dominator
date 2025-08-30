const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventTime: {
    type: String,
    required: true
  },
  eventLocation: {
    type: String,
    required: true
  },
  ticketType: {
    type: String,
    required: true,
    enum: ['Paid', 'Free']
  },
  paidTicketCategory: {
    type: String,
    required: function() {
      return this.ticketType === 'Paid';
    },
    enum: ['Standard', 'VIP', 'Premium']
  },
  category: {
    type: String,
    required: true
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tickets: [{
    type: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    saleStart: Date,
    saleEnd: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', eventSchema);
