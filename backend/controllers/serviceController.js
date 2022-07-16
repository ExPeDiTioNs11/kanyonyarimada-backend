const asyncHandler = require('express-async-handler')
const serviceModel = require('../models/serviceModel')
const req = require('express/lib/request');
const res = require('express/lib/response');

// get all service
const getService = asyncHandler(async (req, res) => {

    const getServices = await serviceModel.find();
    res.status(200).json(getServices);

})

// get by id
const getById = asynchandler(async (req, res) => {

    const service = await serviceModel.findById(req.params.id);
    if(!service)
    {
        res.status(400)
        throw Error('Ürün getirilemedi, Id değerine ulaşılamıyor')
    }
    else
    {
        res.status(200).json(service)
    }
})

// create new service
const add_new_service = asyncHandler(async (req, res) => {

    if(!req.body.customerFullname && !req.body.customerPhone && !req.body.customerPhoneNumber && !req.body.desc && !req.body.finish)
    {
        res.status(400)
        throw new Error('Lütfen tüm alanları eksıksız doldurunuz')
    }
    else
    {
         // nesnemizi oluşturduk
         const addService = await serviceModel.create(
            {
                customerFullname: req.body.customerFullname,
                customerPhone: req.body.customerPhone,
                customerPhoneNumber: req.body.customerPhoneNumber,
                desc: req.body.desc,
                finish: req.body.finish
            })
    
            res.status(200).json(addService);
    }
})

// update service and fixed service
const update_service = asyncHandler(async (req, res) => {

    const updateService = await serviceModel.findById(req.params.id)

    if(!updateService)
    {
        res.status(400)
        throw new Error('Servis kaydını şuan da güncelleyemiyoruz, id değerine ulaşılamıyor.')
    }
    else
    {
        const serviceUpdated = await serviceModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json('Servis kaydı güncelleme işlemi başarılı');
    }
})

// delete service
const deleteService = asyncHandler(async (req, res) => {

    const deleteService = await serviceModel.findById(req.params.id)

    if (!deleteService) 
    {
        res.status(400)
        throw new Error('Servis kaydını şuan da silemiyoruz, id değerine ulaşılamıyor.')
    }
    else
    {
        await deleteService.remove()
        res.status(200).json(deleteService.customerFullname + " kişisinin servis kaydı silindi!")
    }

})

module.exports = 
{
    getService, // export list service
    add_new_service, // add new service
    update_service, // update service
    deleteService, // delete service
    getById
}
