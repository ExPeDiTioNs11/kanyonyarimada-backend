
const mongoose = require('mongoose');


// DB model for note
const user_schema = mongoose.Schema({
  
    username: {
        type: String, // veri tipini belirtiyoruz
        required:[true, 'please username write.'] // boş geçilemez anlamına gelir
    },

    email: {
        type: String, // veri tipini belirtiyoruz
        required: [true, 'please email write.'], // boş geçilemez anlamına gelir
        unique: true // bu email kayıt edilirken baska aynı verı varsa bunu kabul etmez
    },

    phoneNumber: {
        type: String,
        required: [true, 'please phone number write.']
    },

    password: {
        type: String,
        required: [true, 'please password write.']
    }

},
    {timestamps: true} // mongo db de otomatık olusmasını ıstıyorsak bunu eklemelıyız.
);

// tekrar export ederek şemayı kullanacagız ' burada tırnak ıcın de kı ısım ıle sema ulasacak '
module.exports = mongoose.model('user', user_schema);