import { Component, signal } from '@angular/core';
import { email, form, FormField, maxLength, minLength, pattern, required } from '@angular/forms/signals';

interface LoginData {
  userName: string;
  email: string;
  password: string;
  loginAsAdmin: boolean;
  adminSecret: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormField]
})
export class App {
  protected readonly title = signal('signal-forms-demo');

  protected readonly loginData = signal<LoginData>({
    userName: '',
    email: '',
    password: '',
    loginAsAdmin: false,
    adminSecret: ''
  });

  protected readonly loginForm = form(this.loginData,(path) => {
    required(path.userName);
    minLength(path.userName, 3);
    maxLength(path.userName, 20);

    required(path.email);
    email(path.email);

    required(path.password);
    minLength(path.password, 6);
    maxLength(path.password, 20);
    pattern(path.password,   
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,{
      // message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    }
     
    )
  });


  saveLoginForm(){

  }
}
