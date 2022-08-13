const req = require("express/lib/request"); // req
const res = require("express/lib/response"); // res
const asynchandler = require ('express-async-handler'); // async handler ıle a senkronu ımport ettık
const orderModel = require("../models/orderModel"); // order model ımport 
const productModel = require("../models/productModel") // product model import

// get all orders
const get_order = asynchandler(async (req, res) => {

    const orders = await orderModel.find();
    res.status(200).json(orders);

})

// create new sale(order)
const create_new_order = asynchandler(async (req, res) => {

    const product = await productModel.findById(req.params.id)

    if(!product)
    {
        res.status(400)
        throw new Error("ürün bulunamadı")
    }
    else
    {
        
        if(!req.body.customerFullname && !req.body.customerPhonenumber && !req.body.customerAdress && !req.body.quantity  && !req.body.amount)
        {
            res.status(400)
            throw new Error("boş alan bırakmayınız")
        }
        else
        {
            
            const order = await orderModel.create(
                {
                    productId: product.id,
                    customerFullname: req.body.customerFullname,
                    customerPhonenumber: req.body.customerPhonenumber,
                    customerAdress: req.body.customerAdress,
                    name: req.body.name,
                    desc: req.body.desc,
                    emei: req.body.emei,
                    emei2: req.body.emei2,
                    quantity: req.body.quantity,
                    discount: req.body.discount,
                    amount: req.body.amount,
        
                })
              
                res.status(200).json(order);
        }  
    }
})

const update_order = asynchandler(async (req, res) => {

    const updateOrder = await orderModel.findById(req.params.id)

    if(!updateOrder)
    {
        res.status(400)
        throw new Error("sipariş şuan da güncellenemiyor, siparis id değerine ulaşışamıyor!")
    }
    else
    {
        const orderUpdated = await orderModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json("Sipariş güncelleme işlemi başarılı")
    }
})


module.exports =
{
    get_order, // export all get product
    create_new_order, // export create new product
    update_order // export update order
}
