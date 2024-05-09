export interface IUser {
    id: number | null;
    userName: string | null;
    email: string | null;
    password: string | null;
    comments: number[] | null;
    favoriteRecipe: number[] | null;
  }

  export interface IRecipe{
    id: number | null;
    name:string | null;
    instructions:string | null; 
    url: string | null;
    image:string | null;
    comments: number[] | null;
  }

  export interface IComments{
    id: number | null;
    users: number[] | null ;
    text: string | null; 

  }

  
  
