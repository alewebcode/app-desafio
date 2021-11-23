import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://newuser:zhYqbqAv4KlyQueI@cluster1.htsrt.mongodb.net/database_desafio?retryWrites=true&w=majority',{ useNewUrlParser: true })
.catch(e => {
  console.error('Connection error', e.message)
})

const db = mongoose.connection

export default db