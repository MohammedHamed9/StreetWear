const Checkout = require("../models/CheckoutModel");
const Order = require("../models/OrderModel");
const Cart = require("../models/CartModel");
const { deleteCache } = require("../utils/cache");
const logger = require("../utils/logger");

const processSuccessfulCheckout = async (session) => {

    const checkoutId = session.metadata.checkoutId;

    if (!checkoutId) {
        throw new Error("Checkout ID missing from metadata");
    }

    const checkout = await Checkout.findById(checkoutId);

    if (!checkout) {
        throw new Error("Checkout not found");
    }

    if (checkout.isFinalized) {
        return checkout;
    }

    checkout.isPaid = true;
    checkout.paymentStatus = "paid";

    checkout.paidAt = Date.now();

    checkout.paymentDetails = {
        stripeSessionId: session.id,
        paymentIntentId: session.payment_intent,
        paymentStatus: session.payment_status,
    };
    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();

    await checkout.save();

    const newOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: "stripe",
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
    });

    await Cart.findOneAndDelete({
        user: checkout.user
    });

    await deleteCache("all-orders");
    await deleteCache(`my-orders:${checkout.user}`);

    logger.info({
        message: `Order created from Stripe webhook`,
        checkoutId: checkout._id,
        orderId: newOrder._id,
        userId: checkout.user
    });

    return newOrder;
};
module.exports = processSuccessfulCheckout;