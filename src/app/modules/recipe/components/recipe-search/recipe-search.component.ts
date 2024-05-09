import { Component, OnInit, Input} from '@angular/core';
import { debounce, debounceTime } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit{
  
  @Input() name: string | undefined;

  data: any = {};
  
  constructor(private apiService: ApiService, ) {

  }

  ngOnInit(): void {
    
    
  }

  searchByName(recipe: string){
    this.apiService.getRecipeByName(recipe).pipe(
      debounceTime(1000)
    ).subscribe(
      data => {
        this.data = data;
      }
    )
  }

  search(event: Event): void{
    const element = event.currentTarget as HTMLInputElement;
    this.searchByName(element.value);
  }

}
