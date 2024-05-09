import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Recipe, User, Comment } from 'src/app/core/Models';
import { AuthService } from 'src/app/core/services/auth.service';
import { JrecipeService } from 'src/app/core/services/jrecipe.service';
import { userService } from 'src/app/core/services/user.service';



@Component({
  selector: 'app-json-recipe',
  templateUrl: './json-recipe.component.html',
  styleUrls: ['./json-recipe.component.css']
})
export class JsonRecipeComponent implements OnInit {

  
  recipes: Array<Recipe>=[];
  comments: Array<Comment> = [];
  

  @Output() taskToUpdate: EventEmitter<Recipe> = new EventEmitter();


  constructor(private jrecipeservice: JrecipeService, private userService: userService){}
  
  users: Array<User> = [];
  

  ngOnInit(): void { 

    this.completeData();
    
  }

  

  public addRecipe(recipe: Recipe) {
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i].id == sessionStorage.getItem("token")){
        if(this.searchRecipeInUser(this.users[i], Number(recipe.id)) == false){
          this.users[i].favoriteRecipe.push(Number(recipe.id));
          this.userService.updateUser(this.users[i]);
        } else{
          let aux = this.users[i].favoriteRecipe.indexOf(Number(recipe.id));
          this.users[i].favoriteRecipe.splice(aux, 1);
          this.userService.updateUser(this.users[i]);
        }
      }
    }
    
  }


  getUser(){
    let user!: User;
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i].id == sessionStorage.getItem("token")){
        user = this.users[i];
      }
    }
    return user;
  }

   public async completeData(){
    this.jrecipeservice.getRecipes().then(data => this.recipes = data);
    this.jrecipeservice.getComment().then(data => this.comments = data);
    this.userService.getUsers().then(data => this.users = data);
    
   }

   public searchRecipeInUser(user: User, idRecipe: number){
      for(let item of user.favoriteRecipe){
        if(item === idRecipe){
          return true;
        }
      }
      return false;
   }

   public checkRecipe(recipe: Recipe){
    let user = this.getUser();
    if(user != null && user.favoriteRecipe.length > 0){
      if(user.favoriteRecipe.includes(Number(recipe.id))){
        return true;
      }
    }
    return false;
  }

 getCommentById(idComment: number){
  let commentToReturn!: Comment;
    for(let comment of this.comments){
      if(comment.id == idComment){
        commentToReturn = comment;
      }
    }
    return commentToReturn;
 }

 getText(recipe: Recipe){
  let text: string = "";
  if(recipe.comments !== null && recipe.comments.length > 0){
    let comment = this.getCommentById(recipe.comments[0]);
    text = comment && comment.text !== null ? comment.text : "";
  } 
  return text;
 }
}




