import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    RecipePageComponent,
    RecipeSearchComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SharedModule
  ],
  exports: [
    RecipePageComponent,
    RecipeSearchComponent
  ]
})
export class RecipeModule { }
