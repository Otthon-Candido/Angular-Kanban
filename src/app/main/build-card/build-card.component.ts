import { RemoveCardService } from '../services/remove-card.service';
import { CardTestService } from '../services/bot-up-down.service';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ChangeColumnService } from '../services/change-column.service';
import { Cards } from './card';
import { ChangeLineService } from '../services/change-line.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storege.service';



@Component({
  selector: 'kb-built-card',
  templateUrl: './build-card.component.html',
  styleUrls: ['./build-card.component.css'],
})


export class BuildCardComponent implements OnChanges {

@Output() removeCardModal = new EventEmitter<any>();
@Output() editCardModal = new EventEmitter<any>();

constructor(

  private changeColumn:ChangeColumnService,
  private changeLine:ChangeLineService,
  private botCardFocus:CardTestService,
  private formDescricao: FormBuilder,
  private formEstimativa: FormBuilder,
  private formTitle: FormBuilder,
  private localStorage: LocalStorageService,
  private removeCard: RemoveCardService
  ){
}


  @Input() private addCard:any;
  changeTitulo:FormGroup;
  changeDescricao:FormGroup;
  changeUser:FormGroup;
  changeEstimativa:FormGroup;
  private cardsLocalStorage:Cards[] = [];
  private cards:Cards[] = [];
  private cardsafazer:Cards[]=[];
  private cardsandamento:Cards[]=[];
  private cardsfinalizado:Cards[]=[];
  private cardshow:Cards[] = [];
  private bordatest:boolean;
  private botafazer:boolean = false;
  private botandamento:boolean = false;
  private botfinalizado:boolean = false;


ngOnInit(){

    this.borda();
    this.changeTitulo = this.formTitle.group({
      titulo:['',
      [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)]]
      })

    this.changeDescricao = this.formDescricao.group({
    descricao:['',
    [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(60)]]
    })
    this.changeEstimativa = this.formEstimativa.group({
    estimativa:['',Validators.required]
    })
}


  ngOnChanges(SimpleChanges:SimpleChanges){

    if(SimpleChanges.addCard){
      this.cardsLocalStorage = [];
      this.cards = [];
      this.cardsLocalStorage = this.localStorage.getCards();

     if(this.cardsLocalStorage != null){

      for(var cont = 0; cont < this.cardsLocalStorage.length; cont++){
        this.cards.push(this.cardsLocalStorage[cont]);
      }
    }
  }
    this.indicerenderizar();
  }


  indicerenderizar(){

    for(var cont = 0; cont < this.cards.length; cont++){
      this.cards[cont].indice = cont;
    }
    this.localStorage.set('card',this.cards);

    this.cards =  this.localStorage.getCards();

    this.borda();
    this.afazer();
    this.andamento();
    this.finalizado();
    this.botUpDown();
  }


  afazer(){
    this.cardsafazer =[];
    var i = 0;
    this.cards.forEach(() => {

      if(this.cards[i].coluna =="A FAZER"){
        this.cardsafazer.push(this.cards[i]);
      }
      i++;
    });
  }


  andamento(){
    this.cardsandamento =[];
    var i = 0;
    this.cards.forEach(() => {
      if(this.cards[i].coluna =="EM ANDAMENTO"){
        this.cardsandamento.push(this.cards[i]);
      }
      i++;
    });
  }


  finalizado(){
    this.cardsfinalizado =[];
    var i = 0;
    this.cards.forEach(() => {
      if(this.cards[i].coluna =="FINALIZADO"){
        this.cardsfinalizado.push(this.cards[i]);
      }
      i++;

    });
  }


  remove(indice){

    this.cards = this.localStorage.getCards();
    this.removeCard.remove(indice,this.cards);
    this.removeCardModal.emit();
    this.indicerenderizar();
  }


  changetoafazer(indice){

    this.cards[indice].coluna = "A FAZER";
    this.changeColumn.changetoafazer(this.cards, indice, this.cardsafazer);
    this.indicerenderizar();
  }


  changetoandamento(indice){

    this.cards[indice].coluna = "EM ANDAMENTO";
    this.changeColumn.changetoandamento(this.cards, indice, this.cardsandamento);
    this.indicerenderizar();
  }


  changetofinalizado(indice){

  this.cards[indice].coluna = "FINALIZADO";
  this.changeColumn.changetofinalizado(this.cards, indice, this.cardsfinalizado);
  this.indicerenderizar();
}


  borda(){

   if(this.cards.length==0){
     this.bordatest=true;
   }

   else{

     this.bordatest=false;
   }
  }


  showcard(indice){

    this.cardshow = [];
    this.cardshow.push(this.cards[indice]);
  }


  up(id){

    this.changeLine.up(id,this.cards,this.cardsafazer,this.cardsandamento,this.cardsfinalizado);
    this.indicerenderizar();
  }


  down(id){

    this.changeLine.down(id,this.cards,this.cardsafazer,this.cardsandamento,this.cardsfinalizado);
    this.indicerenderizar();
  }


  botUpDown(){

    this.botafazer = this.botCardFocus.cardtestafazer(this.cardsafazer, this.botafazer);
    this.botandamento = this.botCardFocus.cardtestandamento(this.cardsandamento, this.botandamento);
    this.botfinalizado = this.botCardFocus.cardtestfinalizado(this.cardsfinalizado, this.botfinalizado);
  }


  changeattribbute(indice, type){

    switch(type){

      case 'titulo':

      var titulo:string =  this.changeTitulo.get('titulo').value;
      this.cards[indice].titulo = (titulo);
      this.changeTitulo = this.formTitle.group({

        titulo:['',[Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)]]
        })
        this.indicerenderizar();
      break;

  case 'descricao':

      var descricao:string =  this.changeDescricao.get('descricao').value;
      this.cards[indice].descricao = (descricao);
      this.changeDescricao = this.formDescricao.group({

        descricao:['',
        [Validators.required,
          Validators.minLength(4),
          Validators.maxLength(60)]]
        })
        this.indicerenderizar();

      break;

  case 'estimativa':

      var estimativa:number =  this.changeEstimativa.get('estimativa').value;
      this.cards[indice].estimativa = (estimativa);
      this.changeEstimativa = this.formEstimativa.group({

        estimativa:['',Validators.required]
        })
        this.indicerenderizar();

      break;

    }

  this.showcard(indice);
  this.editCardModal.emit();
}
}
