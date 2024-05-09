import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonRecipeComponent } from './components/json-recipe/json-recipe.component';
import { FavoriteRecipeComponent } from './components/favorite-recipe/favorite-recipe.component';

const routes: Routes = [

  {
    path:'nacionales',
    component: JsonRecipeComponent
  },

  {
    path:'favorite',
    component: FavoriteRecipeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JrecipeRoutingModule { }
