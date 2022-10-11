import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserData } from '../libs/entity/user-data.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() {
    this.data$.pipe(
      tap(resp=>{
        console.log(resp)
      })
    )
   }

  public data$: BehaviorSubject<UserData> = new BehaviorSubject<UserData>({name:"",password :""});
}
