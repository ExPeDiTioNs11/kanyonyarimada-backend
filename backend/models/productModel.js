const mongoose = require('mongoose');


// DB model for product
const product_schema = mongoose.Schema({

    name: {
        type: String, // veri tipini belirtiyoruz
        required:[true, 'ürünün adı boş geçilemez'] // boş geçilemez anlamına gelir
    },

    marka: {
        type: String, // veri tipini belirtiyoruz
        required: [true, 'Ürünün markası boş geçiğlemez'] // boş geçilemez anlamına gelir
    },

    barcode: {
        type: String,
        required: [true, 'Barkod boş geçilemez'] // barcode boş geçilemez
    },

    emei: {
        type: String,
        required: false // boş geçilebilir
    },

    emei2: {
        type: String,
        required: false // boş geçilebilir
    },

    desc: {
        type: String,
        required: false // boş geçilebilir anlamına gelir
    },

    category: {
        type: String,
        required: [true, 'Lütfen katefori giriniz.']  // barcode boş geçilemez
    },

    unitprice: {
        type: Number,
        required: [true, 'Ürünün birim fiyatı boş geçilemez']  // barcode boş geçilemez
    },

    indirim: {
        type: Number,
        required: false // boş geçilebilir
    },

    stock: {
        type: String,
        required: [true, 'Kaç adet stok olduğu boş geçilemez']  // barcode boş geçilemez
    }

},
    {timestamps: true} // mongo db de otomatık olusmasını ıstıyorsak bunu eklemelıyız.
);

// tekrar export ederek şemayı kullanacagız ' burada tırnak ıcın de kı ısım ıle sema ulasacak '
module.exports = mongoose.model('Product', product_schema)