import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(router: Router) {
    const token = sessionStorage.getItem('token');
    console.log('token ====> ', token)
    if (token === null) {
      router.navigateByUrl('/login');
    }
  }
}
