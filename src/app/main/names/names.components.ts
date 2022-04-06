import { Cards } from '../build-card/card';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storege.service';
import { Names } from './names';



@Component({
  selector: 'kb-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.css']
})


export class NamesComponent implements OnChanges{


@Input()  addNameVar:string[] = []
@Output() removeAlert = new EventEmitter<any>();
@Output() acceptAlert = new EventEmitter<any>();
@Output() addName = new EventEmitter<string>();


private cards:Cards[] = [];
private userNames:Names[] = [];
private size:number = 0;

constructor(
  private storege:LocalStorageService
){
}

ngOnInit(): void {}

ngOnChanges(simple:SimpleChanges) {


  if(simple.addNameVar){

  this.userNames = this.storege.getNames();


   if(this.userNames!=null){
  this.size = this.userNames.length;
  }
  }


}



 remove(indice:number){

  var nameExist:boolean = true;
  this.cards = this.storege.getCards();

  if(this.cards!=null){

  for(var cont=0; cont<this.cards.length;cont++){

    if(this.cards[cont].user == this.userNames[indice].names ){
      this.removeAlert.emit();
      nameExist = false;
  break;

   }

  }
  if(nameExist){

    this.userNames.splice(indice,1);

    for(var cont = 0; cont < this.userNames.length; cont++){
      this.userNames[cont].indice = cont;
    }

    this.storege.set('name',this.userNames);
    this.addName.emit();
    this.acceptAlert.emit();

  }
}
}
}





