const asynchandler = require('express-async-handler'); // import async handler
const req = require('express/lib/request');
const res = require('express/lib/response');
const customerModel = require('../models/customerModel');


// get all customer
const get_allCustomers = asynchandler(async (req, res) => {

    const Getcustomer = await customerModel.find();
    res.status(200).json(Getcustomer);

})

// add new customer
const add_new_customer = asynchandler(async (req, res) => {

    if(!req.body.name)
    {
        res.status(400)
        throw new Error('Lütfen isim soyisim alanını boş geömeyiniz')
    }
    else
    {
         // nesnemizi oluşturduk
         const addCustomer = await customerModel.create(
            {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                adress: req.body.adress,
                tcKimlik: req.body.tcKimlik
            })
    
            res.status(200).json(addCustomer);
    }
})

// update customer
const update_customer = asynchandler(async (req, res) => {

    const updateCustomer = await customerModel.findById(req.params.id)

    if(!updateCustomer)
    {
        res.status(400)
        throw new Error('Müşteriyi şuan da güncelleyemiyoruz, id değerine ulaşılamıyor.')
    }
    else
    {
        const customerUpdated = await customerModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json('Müşteri güncelleme işlemi başarılı');
    }
})

// delete customer
 const delete_customer = asynchandler(async (req, res) => {

    const deleteCustomer = await customerModel.findById(req.params.id)

    if (!deleteCustomer) 
    {
        res.status(400)
        throw new Error('Müşteriyi şuan da silemiyoruz, id değerine ulaşılamıyor.')
    }
    else
    {
        await deleteCustomer.remove()
        res.status(200).json(deleteCustomer.name + " isimli müşteri silindi!")
    }
 })

 module.exports = 
 {
     get_allCustomers, // export list customer
     add_new_customer, // export add new customer
     update_customer,  // update customer
     delete_customer // delete customer
 }