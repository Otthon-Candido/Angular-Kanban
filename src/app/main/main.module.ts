import { ModalModule } from './modal/modal.module';
import { FormCardModule } from './form-card/form-card.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddNameModule } from './add-name/add-name.module';
import { NamesModule } from './names/names.module';
import { BuildCardModule } from './build-card/build-card.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
  MainComponent
  ],
  imports: [
   CommonModule, AddNameModule, NamesModule, FormCardModule, BuildCardModule, ModalModule
  ],

  exports: [
    MainComponent ],

  providers: []

})
export class MainModule { }
