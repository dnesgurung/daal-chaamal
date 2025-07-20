import Order from "../models/Order.js";
import Product from "../models/Product.js";


// Place Order COD (Cash On Delivery) : /api/order/cod


export const placeOrderCOD = async (req, res) => {
    try {
        const {userId, items, address} = req.body;
        if(!address || items.length === 0){
            return res.json({success: false, message: 'Invalid data'})
        } 
        // Calculate Amoutn Using Itmes
        let amount = await items.reduce(async (acc, item)=> {
            const product = await Product.findById(item.product)
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)  
        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD'
        });

        return res.json({success: true, message: "Order Placed Successfully"})
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}

// ge