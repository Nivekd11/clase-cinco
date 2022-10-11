import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Drink } from '../libs/entity/drink.interface';
import transForm from '../libs/helpers/transform.helper';
import { combineAll, combineLatestAll, concatMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { merge } from 'rxjs/internal/observable/merge';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(public http : HttpClient) { }

  private toSearch: Observable<any>[] =[]

  getCocktail(name:string) : Observable<any>{
    return this.http.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+name).pipe(
      map((resp : any) =>{
          
          return transForm.drinks(resp.drinks);
      })
    )
  }

  getPokemon(name:string):Observable<any>{
    return this.http.get('https://pokeapi.co/api/v2/pokemon/'+name).pipe(
    tap(res =>{
      console.log('tap',res)
    }), 
    concatMap((responsePokemon  : any) =>{
        return this.getSpecies(responsePokemon.species.url,responsePokemon)
      }),
    tap(res =>{
        console.log('tap2',res)
    }), 
    concatMap((respSpecies: any)=>{
      return this.getVarieties(respSpecies)
    }),
    map((response : any)=>{
        return transForm.pokemon(response)
    }),
    tap(res => {
      console.log("tap3", res)
    })
    )
  }

  getPokemon2(){
    return merge([this.http.get('https://pokeapi.co/api/v2/pokemon/ditto'),this.http.get('https://pokeapi.co/api/v2/pokemon/pikachu')]).pipe(
    combineLatestAll(),  
    tap(resp =>{
        console.log(resp)
      })
    )
  }

  getSpecies(url: string, original:any):Observable <any>{
    return this.http.get(url).pipe(
      map((res : any) => {
        (res.varieties as any[]).forEach( item =>{
          this.toSearch.push(this.http.get(item.pokemon.url))
        })
        console.log(this.toSearch)
        return{
          ...res, ...original
        }
        
      })
    )
  }

  getVarieties(original: any){
    return merge(this.toSearch).pipe(
      combineLatestAll(),
      map(res => {
        let sprites = res.map(item =>{
          return {
            name : item.name,
            img: item.sprites.front_default
          }
        })
        console.log('IN VARIATIES', res)
        return {
           ...original,
           sprites: sprites,
        }
      })
    )
  }
  
}
