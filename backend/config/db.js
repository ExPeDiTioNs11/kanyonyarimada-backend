const mongoose = require('mongoose');
const colors = require('colors')

const connetion = async ()=>
{
    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('mongoDBye bağlantı başarılı --- '.green.inverse + conn.connection.name.green.inverse) // sonda ki kod bağlantı adını alır
    }
    catch (error)
    {
        console.log(error.red.inverse);
        process.exit(1);
    }
}

module.exports = connetion;