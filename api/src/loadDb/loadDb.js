const axios = require ('axios');
const { Country } = require ('../db')


async function LoadDb(req, res) {
  try {
    {
    const cleanArray = (arr) =>
      arr.map((elem) => {
      return{
          id: elem.cca3,
          name: elem.name.common,
          flag: elem.flags ? elem.flags[1] : "",
          continent: elem.continents ? elem.continents[0] : "",
          capital: elem.capital ? elem.capital[0] : "",
          subregion: elem.hasOwnProperty('subregion') ? elem.subregion : "",
          area: elem.area,
          population: elem.population
      }
  })
    const apicountriesRow = (await axios.get("https://restcountries.com/v3/all")).data
    const apicountries = cleanArray(apicountriesRow)
    await Country.bulkCreate(apicountries)
  
   }
    console.log('DB success')
  } catch (error) {
    res.send(error);
  }
}
module.exports= {LoadDb}
