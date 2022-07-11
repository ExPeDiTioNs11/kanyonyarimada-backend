const mongoose = require('mongoose');


// DB model for note
const customer_schema = mongoose.Schema({

    name: {
        type: String, // veri tipini belirtiyoruz
        required:[true, 'Müşteri adını girmek zorunludur'] // boş geçilemez anlamına gelir
    },

    phoneNumber: {
        type: String,
        required: false// boş geçilebilir
    },

    adress: {
        type: String,
        required: false // boş geçilebilir
    },

    tcKimlik: {
        type: Number,
        required: false // boş geçilebilir 
    }

},
    {timestamps: true} // mongo db de otomatık olusmasını ıstıyorsak bunu eklemelıyız.
);

// tekrar export ederek şemayı kullanacagız ' burada tırnak ıcın de kı ısım ıle sema ulasacak '
module.exports = mongoose.model('Customer', customer_schema)