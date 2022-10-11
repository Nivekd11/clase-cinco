import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UserData } from 'src/app/libs/entity/user-data.interface';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.component.html',
  styleUrls: ['./dos.component.scss']
})
export class DosComponent implements OnInit {

  constructor(public infoService: InfoService) { 
    this.detector$ = infoService.data$.pipe(
      tap(resp =>{
        console.log("pipe",resp)
      })
    )
  }

  public name:string =''
  public password:string = ''
  public detector$!: Observable<any>
  ngOnInit(): void {
    // this.infoService.data$.subscribe({next: (resp: UserData)=>{
    //   console.log(resp)
    //     this.name= resp.name
    //     this.password = resp.password
    // }})
  }

}
