import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing/components/landing-page/landing-page.component';
import { Error404Component } from './shared/error404/error404.component';
import { RecipeSearchComponent } from './modules/recipe/components/recipe-search/recipe-search.component';
import { JrecipeModule } from './modules/jrecipe/jrecipe.module';
import { AboutUsComponent } from './shared/about-us/about-us.component';
import { RecipePageComponent } from './modules/recipe/components/recipe-page/recipe-page.component';

const routes: Routes = [

  {
    path:'landing',
    component: LandingPageComponent,
    loadChildren:()=> import("./modules/landing/landing.module").then(m => m.LandingModule)  
 },
 {
  path: 'auth',
  loadChildren:() => import("./modules/auth/auth.module").then(m =>m.AuthModule)

 },
 {
  path:'about-us',
  component: AboutUsComponent
 },
 {
  path:'recetas-internacionales',
  component: RecipePageComponent
 },

 {
  path:'recetas',
  loadChildren:() => import("./modules/jrecipe/jrecipe.module").then(m => JrecipeModule)
 },
 
 {
  path: 'search', 
  component: RecipeSearchComponent
},  

 {
  path: '404',
  component: Error404Component
 },
 {
  path:'',
  redirectTo: 'landing',
  pathMatch:'full'
 },
 {
  path:'**',
  component:Error404Component
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
