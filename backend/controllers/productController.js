// bu controller için de bütün get put post delete methodlarını yazıp route da import ederek kullanabiliriz.

const req = require("express/lib/request"); // req
const res = require("express/lib/response"); // res
const asynchandler = require ('express-async-handler'); // async handler ıle a senkronu ımport ettık
const productModel = require("../models/productModel"); // modelımızı ımport ettık

// get all product
const get_product = asynchandler(async (req, res) => {
    
    const product = await productModel.find();
    res.status(200).json(product);

})

// get by barcode
const getByBarcode = asynchandler(async (req, res) => {

    const product = await productModel.findOne({barcode: req.params.barcode})
    if(!product)
    {
        res.status(400)
        throw Error('Ürün listelenemedi, Barkod değerine ulaşılamıyor')
    }
    else
    {
        res.status(200).json(product)
    }
})

// get by id
const getById = asynchandler(async (req, res) => {

    const product = await productModel.findById(req.params.id);
    if(!product)
    {
        res.status(400)
        throw Error('Ürün getirilemedi, Id değerine ulaşılamıyor')
    }
    else
    {
        res.status(200).json(product)
    }
})

//create new product
const addNewProduct = asynchandler(async (req, res) => {

    if(!req.body.name && !req.body.barcode && !req.body.category && !req.body.unitprice && !req.body.stock)
    {
        res.status(400)
        throw new Error('Lütfen zorunlu alanları boş bırakmayınız, Eğer bilmiyorsanız rastgele giriniz ve sonra tekrar düzenleyiniz!')
    }
    else
    {
        // nesnemizi oluşturduk
        const product = await productModel.create(
        {
            name: req.body.name,
            marka: req.body.marka,
            barcode: req.body.barcode,
            emei: req.body.emei,
            emei2: req.body.emei2,
            desc: req.body.desc,
            category: req.body.category,
            unitprice: req.body.unitprice,
            indirim: req.body.indirim,
            stock: req.body.stock
        })

        res.status(200).json(product);
    }
})

// update selected product
const update_selected_product = asynchandler(async (req, res) => {

    const product = await productModel.findById(req.params.id);

    if(!product)
    {
        res.status(400)
        throw Error('Ürün güncellenemedi, ürünün değeri boş döndü. Bu hata için bizimle iletişime geçin')
    }
    else
    {
        const updated = await productModel.findByIdAndUpdate(req.params.id, req.body, {new: true}) // new : true dersek yenı verı gelecek eger new false dersek eskı verı gelecek
        res.status(200).json('Ürün güncelleme işlemi başarılı');
    }
     
})

// delete selected product
const delete_selected_product = asynchandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);

    if(!product)
    {
        res.status(400)
        throw Error('Böyle bir ürün bulunamadı, Lütfen işleminizi kontrol edin!')
    }
    else
    {
        await product.remove(); // databse den id sini seçtiğimiz kaydı siler
        res.status(200).json(product.name + ' ürünü silindi!');
    }
})


module.exports =
{
    get_product, // export all get product
    addNewProduct, // export create new product
    update_selected_product, // export update selected product
    delete_selected_product, // export delete selected product
    getByBarcode, // export, get product by barcode value
    getById // export, get product by id value
}
