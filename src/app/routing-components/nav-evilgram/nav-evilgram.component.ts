import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'app-nav-evilgram',
  templateUrl: './nav-evilgram.component.html',
  styleUrls: ['./nav-evilgram.component.css']
})
export class NavEvilgramComponent {

  logged: Observable<Boolean>;

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  links = [
    { link: "feed", image: "collections", text: "Feed"},
    { link: "upload", image: "add_a_photo", text: "Subir Foto"},
    { link: "login", image: "account_circle", text: "Autenticar"},

  ]

  constructor(private breakpointObserver: BreakpointObserver, public auth: AuthService) {
    this.logged = this.auth.user.pipe(
      map(user => !! user )
    )
  }

  
  
}


export interface linksPage {
  link: string,
  image: string,
  text: string,
}