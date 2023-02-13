// Create authentication Service

import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { from, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser$ = authState(this._afAuth);
  constructor(private readonly _afAuth: Auth) {}

  public login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this._afAuth, email, password));
  }

  public register(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this._afAuth, email, password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })));
  }

  public logout() {
    return from(this._afAuth.signOut());
  }
}
