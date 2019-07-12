const express = require('express')
const app = express()
app.use(express.static('build'))
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')

app.use(cors())



let numerot = [  { 
       id: 1,   
        name: "Arto Hellas",  
         number: "040-12312414" 
             },
    {  
          id: 2, 
             name: "Ada Lovelace",  
             number: "39445325252"
      },
        {   
             id: 3, 
                name: "Dan Abramov ", 
                number: "392452525252" 
     },
    {
        id: 4,
        name:"Mary Poppendieck",
        number:"39225525525"
    }]




app.get('/info', (req, res) => {



    let aika = new Date().toLocaleString();

const sivu = () => {
  
return (
    `Phonebook has info for ${numerot.length} people  <br> ${aika}` 

)

}


  res.send(sivu())

})


app.delete('/api/persons/:id', function (req, res) {
  const id = Number(req.params.id)
  numerot = numerot.filter(numero => numero.id !== id)
  res.status(404).end()


})






app.post('/api/persons', (request, response) => {
  


  const body = request.body
console.log(body)  


let rId = Math.random(1000000)

if(!body.name){


  console.log(request.headers)
  return response.status(400).json({
  
  error: 'no content'
  
  })
  
  }

nimet = numerot.map(nam => nam.name)



 

  var found = nimet.find(function(element) {
    return element === body.name;
  });




if( typeof found === 'string'){
  return response.status(400).json({
  
    error: 'nimi on jo'
    
    })

}








 
  
const numero = {
  id: rId,
name: body.name,
number: body.number


}


numerot = numerot.concat(numero)
  


  response.json(numero)

})












app.get('/api/persons', (req, res) => {



  res.json(numerot)
})

app.get('/api/persons/:id', (request, response) => {


    const id = Number(request.params.id)
    const numero = numerot.find(numerot => numerot.id === id)
    

if(numero){
    response.json(numero)


}
else{
   


    response.status(404).end()
}  

})




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})