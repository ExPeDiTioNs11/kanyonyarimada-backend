const mongoose = require('mongoose')

const order_schema = mongoose.Schema({

    productId: {
        type: String, // veri tipini belirtiyoruz
        required:[true, 'ürünün satışı şuan da yapılamıyor, id verisi yok'] // boş geçilemez anlamına gelir
    },
    
     name: {
        type: String, // veri tipini belirtiyoruz
        required:[true, 'ürünün satışı şuan da yapılamıyor, ürünün adı yok'] // boş geçilemez anlamına gelir
    },
    
     emei: {
        type: String, // veri tipini belirtiyoruz
        required:false 
    },
    
     emei2: {
        type: String, // veri tipini belirtiyoruz
        required:false 
    },
    
     desc: {
        type: String, // veri tipini belirtiyoruz
        required:false 
    },

    customerFullname: {
        type: String, // veri tipini belirtiyoruz
        required: [true, 'Müşteri adı ve soyadı boş geçilemez'] // boş geçilemez anlamına gelir
    },

    customerPhonenumber: {
        type: String, // veri tipini belirtiyoruz
        required: false// boş geçilebilir
    },

    customerAdress: {
        type: String,
        required: [true, 'Müşteri adresi boş geçilemez, bu faturalandırma için şart bir koşuldur'] // barcode boş geçilemez
    },

    quantity: {
        type: Number,
        required: false // boş geçilebilir
    },

    discount: {
        type: Number,
        required: false // boş geçilebilir
    },

    amount: {
        type: Number,
        required: [true, 'Miktar boş bırakılamaz'] // barcode boş geçilemez
    }
},
    {timestamps: true} // mongo db de otomatık olusmasını ıstıyorsak bunu eklemelıyız.
);

module.exports = mongoose.model('Order', order_schema)
