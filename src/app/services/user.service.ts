import { UserRoles } from './../model/user-roles';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut$: Observable<boolean>;
  public pictureUrl$: Observable<string>;
  public role$: Observable<UserRoles>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    afAuth.idToken.subscribe(jwt => console.log("jwt", jwt));
    afAuth.authState.subscribe(auth => console.log("auth", auth));

    this.isLoggedIn$ = afAuth.authState.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
    this.pictureUrl$ = afAuth.authState.pipe(map(user => user ? user.photoURL : null));
    this.role$ = this.afAuth.idTokenResult.pipe(map(token => <any>token?.claims ?? { admin: false }));
  }

  public logout(): void {
    this.afAuth.signOut();
    this.router.navigateByUrl("/login");
  }
}
