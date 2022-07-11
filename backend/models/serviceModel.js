const mongoose = require('mongoose');


// DB model for note
const service_schema = mongoose.Schema({

    customerFullname: {
        type: String, // veri tipini belirtiyoruz
        required:[true, 'Müşteri adı boş geçilemez.'] // boş geçilemez anlamına gelir
    },

    customerPhone: {
        type: String, // veri tipini belirtiyoruz
        required: [true, 'Ürünün modeli boş geçilemez.'] // boş geçilemez anlamına gelir
    },

    customerPhoneNumber: {
        type: String,
        required: [true, 'Müşteri telefon numarası boş geçilemez.'] // barcode boş geçilemez
    },

    desc: {
        type: String,
        required: [true, 'Arıza açıklaması boş geçilemez.'] // boş geçilebilir anlamına gelir
    },

    finish: {
        type: Boolean, // 0 false, 1 true
        require: [true, 'Kaydın tamamlanıp tamamlanmadığını belirtmek zorunludur.']
    }

},
    {timestamps: true} // mongo db de otomatık olusmasını ıstıyorsak bunu eklemelıyız.
);

// tekrar export ederek şemayı kullanacagız ' burada tırnak ıcın de kı ısım ıle sema ulasacak '
module.exports = mongoose.model('Service', service_schema)