const bcrypt = require("bcrypt")
  const helper ={}

helper.encypt = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    const hash  = await bcrypt.hash(password,salt)
    return hash;
}

helper.compare = async (password,passwordHash)=>{
    const result = await bcrypt.compare(password,passwordHash)
    return result;

}

module.exports = helper