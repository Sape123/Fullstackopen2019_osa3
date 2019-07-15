const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://admin:${password}@cluster0-akszh.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const numerotSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const nro = mongoose.model('puhelinnumero', numerotSchema)




if(process.argv[3]=== 'find'){

nro.find({}).then(result =>{
result.forEach(numba =>{
console.log(numba)


})
mongoose.connection.close()

} )

}







if ( process.argv.length<5 ) {
  
  
  const numero = new nro({
  
    name:'juuso oksman1',
    number: '40242442'
  })
  
  
  

  numero.save().then(response => {
    console.log('numero tallennettu!');
    mongoose.connection.close();
  })





}

else{

  const numero = new nro({
  
    name: process.argv[3],
    number: process.argv[4]
  })


  numero.save().then(response => {
    console.log(`added ${process.argv[3]} numberino ${process.argv[4]}  `);
    mongoose.connection.close();
  })



}






