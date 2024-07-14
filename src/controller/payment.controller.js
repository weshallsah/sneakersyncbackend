import { ApiError } from "../utils/ApiError.utils.js";
import { AsyncHandler } from "../utils/AsyncHandeler.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js"
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const payment = AsyncHandler(async (req, res) => {
    const { amount, token } = req.body;
    console.log(token);
    try {
        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            source: token.id,
            description: 'Charge for test@example.com',
        });

        res.send('Payment successful');
    } catch (err) {
        console.error('Error processing payment:', err);
        let message = 'An error occurred while processing your payment.';

        if (err.type === 'StripeCardError') {
            message = err.message;
        }

        res.status(500).send(message);
    }
});

export {
    payment
};