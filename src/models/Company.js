import mongoose from 'mongoose';

const Company = mongoose.model('Company',{
  cnpj:String,
  name:String,
  corporate_name:String,
  primary_activity:String,
  street:String,
  number:Number,
  complement:String,
  zip_code:String,
  neighborhood:String,
  city:String,
  state:String

})

export default Company;