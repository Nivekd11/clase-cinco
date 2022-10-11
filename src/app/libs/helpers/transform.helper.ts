import { Drink } from "../entity/drink.interface"

export default class transForm{
    
    public static drinks(drinks: any[]):Drink[]{
        let drinksx : any= drinks.map((drink =>{
          let ingredients:string[]=[]
          Object.keys(drink).forEach(key =>{
            if(key.includes("strIngredient") && drink[key] != null ){
              ingredients.push(drink[key])
            }
          })
          return {
            name: drink.strDrink,
            img: drink.strDrinkThumb,
            ingredients : ingredients
          }
        }))
        return drinksx
      }
  
    public static pokemon(pokemons: any){
      let stats: any[]=[]
          pokemons.stats.forEach((stat : any)=>{
            stats.push({
              nameStat: stat.stat.name,
              number: stat.base_stat
            })
            
            
          })
          return {
            name: pokemons.name,
            stats: stats,
            sprites: pokemons.sprites
          }
    }
}