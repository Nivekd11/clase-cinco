import { Component, OnInit } from '@angular/core';
import { Drink } from 'src/app/libs/entity/drink.interface';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  constructor(public request:RequestService) { }
  public drinks: Drink[]=[]
  ngOnInit(): void {
    this.request.getCocktail('margarita').subscribe({next : (resp) =>{
      console.log(resp)
      this.drinks=resp
    }})
  }

}
