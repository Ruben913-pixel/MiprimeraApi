const express =  require('express')
const cors= require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]



app.get('/api/notes', (requise,response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (r,response) => {
    const id = Number(r.params.id) 
    console.log({id})
    const note = notes.find(note => note.id === parseInt(id))
    if(note){
    response.json(note)
    }else {
      response.status(404).end()
    }

})

app.delete('/api/notes/:id', (r,response) => {
    const id = Number(r.params.id) 
    console.log({id})

    const note = notes.filter(note => note.id !== parseInt(id))
    console.log({note})
    response.json(note)
})


app.post('/api/notes', (r, response) => {
  const {content} = r.body
if(!content){
  console.log("error 404")
  return response.status(404).end()
}
  const newNote = {
    id: notes.length + 1 ,
    content: content,
    important: false
  }
  notes = [...notes,newNote]
  response.json(newNote)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})
