
// Temel express server oluşturmak için öncelikle express paketini aşağıdaki gibi çağarıyoruz...
const express = require("express");

// kök dizinde ki .env dosyasına ulaşıp dotenv değişkenimize port değerimizi atıyor.
const dotenv = require('dotenv').config()

// hata yakalama fonksyonumuz
const {errorCatching} = require('./middlewares/errorMiddleware')

// 8080 portu üzerinden projemiz yayın yapıyor olacak ; " localhost:8080 "
const PORT = process.env.PORT

// serverimizi db ye bagladık
const connection = require('./config/db')

//colors paketi ile console ekranımızda ki hata mesajlarımızı renkledırdık
const colors = require('colors')

const cors = require('cors')

// express i çağarmış oluyoruz
const app = express();

// Bir fonksiyon oluşturduk ve içerisine çalışması gereken örnek kodları yazdık
const serverFunc = () =>
{
    console.log('Bu web app '.magenta.italic + PORT.magenta.italic + ' portu üzerinden yayında'.magenta.italic);
}

// get fonksyonu ile veri response yanı dondurduk
// http://localhost:8080/api/product

// body verisini serverinde yakalayabilmesi için bu urlencodded kullanılır
app.use(express.urlencoded({extended:true})); // ya da extended : false durumu vardır
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use('/api/product', require('./routes/productRoute')); // product route
app.use('/api/users', require('./routes/userRoute')); // user route
app.use('/api/customers', require('./routes/customerRoute')) // customer route
app.use('/api/services', require('./routes/serviceRoute'))
app.use('/api/orders', require('./routes/orderRoute'))
app.use(errorCatching) // hata yakalamyı calıstırdık

// call db connection
connection();

// server dinleniyor
app.listen(PORT, serverFunc);
