require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('build'))
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const Luettelo = require('./models/person')


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


app.delete('/api/persons/:id', function (req,  response, next) {
  console.log(req.param.id)
 Luettelo.findByIdAndRemove(req.params.id)
 .then(result=> {
console.log(req.param.id)
response.status(204).end()

 })
 
 .catch(error => next(error))

})






app.post('/api/persons', (request, response) => {
  


  const body = request.body
console.log(body)  


if(!body.name){


  console.log(request.headers)
  return response.status(400).json({
  
  error: 'no content'
  
  })
  
  }




const numbero = new Luettelo({
name:body.name,
number:body.number
})

numbero.save().then(savedNote => {
  response.json(savedNote.toJSON())

}

)




})












app.get('/api/persons', (req, res) => {

Luettelo.find({}).then(numbit=>{

  res.json(numbit.map(numbi => numbi.toJSON()))

})

  




})






app.get('/api/persons/:id', (request, response) => {


    Luettelo.findById(request.params.id)
    .then(nah=>{
      response.json(nah.toJSON()
      
      
      )
    })
    



})




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})