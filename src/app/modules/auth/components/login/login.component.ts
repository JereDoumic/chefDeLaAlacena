import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/Models';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  private email: string = '';

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  public userLogin: User | null= null;

  
  ngOnInit(): void {}

  constructor(private formB: FormBuilder,private router: Router,private authService: AuthService,
                private toastr: ToastrService ) {}
 
  loginForm: FormGroup = this.formB.group({
  email: new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
  password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(10)]),
  })

  isValidField(field:string): boolean | null{
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  } //se fija si hay errores y si fue tocado el campo 


  getErrorInField(field:string): string | null {
    
    if(!this.loginForm.controls[field]) return null; //verifica que el campo exista

    const errors= this.loginForm.controls[field].errors || {}; //o llena con los errores o lo inicia con obj vacío
   
    for(const key of Object.keys(errors)){ //reacciono a cada error de los input recorriendo el arreglo por cada key
      switch(key){
        case 'required':
          return "Debe completar este campo";
          case 'minlength':
            return `Minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'maxlength':
            return `Maximo ${errors['maxlength'].requiredLength} caracteres `;
          case 'pattern':
          return 'Formato de email invalido'
      }
    }
    return null;
  }

  async onSubmit() {
    try {
      let isLogin: boolean = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);

      if (isLogin) {

        this.router.navigate(["/landing"]);
      }
      else {
        this.email = this.loginForm.value.email;
        this.loginForm.reset({ email: this.email });
        this.toastr.error("Revise y vuelva a intentarlo", "Contraseña o email incorrectos");
      }

    } catch (error) {
      console.log(error);
    }
}
}
