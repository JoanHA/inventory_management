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

helper.convertTime = (timeStamp)=>{
  const date = new Date(timeStamp);

      // Obtiene los componentes de la fecha (año, mes y día)
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth() + 1; // Sumamos 1 para que enero sea 1, febrero 2, etc.
      const day = date.getUTCDate();

      // Formatea la fecha como "YYYY/MM/DD"
      const formattedDate = `${year}/${month
        .toString()
        .padStart(2, "0")}/${day.toString().padStart(2, "0")}`;
      return formattedDate;
}

module.exports = helper