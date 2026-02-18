import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

interface LoginData {
  userName: string;
  email: string;
  password: string;
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
    password: ''
  });

  protected readonly loginForm = form(this.loginData);

  saveLoginForm(){
    
  }
}
