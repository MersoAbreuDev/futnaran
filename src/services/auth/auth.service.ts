import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, switchMap, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IJogador } from '../../interfaces/IJogador';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private hasCompanySubject = new BehaviorSubject<boolean>(false);
  hasCompany$ = this.hasCompanySubject.asObservable();
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);
  private url = `${environment.apiUrl}`;
  private readonly TOKEN_KEY = 'currentUser';
  private userRoles: string[] = [];
  constructor(private http: HttpClient,
            private afAuth: AngularFireAuth,

  ) {
     const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
     const hasCompany = JSON.parse(localStorage.getItem('hasCompany') || 'false');

     this.isAuthenticated.next(isAuthenticated);
     this.hasCompanySubject.next(hasCompany);

    this.afAuth.authState.subscribe((user:any) => {
      if (user) {
        this.isAuthenticated.next(true);
        this.currentUserSubject.next(user);
      } else {
        this.isAuthenticated.next(false);
        this.currentUserSubject.next(null);
      }
    });
    this.getAuthorization();
    this.getRole();

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('isClosing', 'true');
    });

    window.addEventListener('unload', () => {
      if (localStorage.getItem('isClosing') === 'true') {
        this.logout();
        localStorage.removeItem('isClosing');
      }
    });

    window.addEventListener('load', () => {
      localStorage.removeItem('isClosing');
    });
  }


  setUserRoles(roles: string[]) {
    this.userRoles = roles;
  }

  userHasPermission(role: string): boolean {
    return this.userRoles.includes(role);
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get currentUserId(): string | null {
    return this.currentUserSubject.value ? this.currentUserSubject.value.uid : null;
  }

  async getAuthorization() {
    const idToken = await this.getIdToken();
    return {Authorization: 'Bearer ' + idToken};
  }

  async getIdToken() {
    return new Promise<string | null>((resolve, reject) => {
      this.afAuth.onAuthStateChanged(async (currentUser:any) => {
        if (currentUser) {
          const idToken = await currentUser.getIdToken(true);
          resolve(idToken);
        } else {
          resolve(null);
        }
      })
    });
  }

  async getCurrentUser(): Promise<any | null> {
    return new Promise<any | null>((resolve, reject) => {
      this.afAuth.onAuthStateChanged(async (currentUser:any) => {
        if (currentUser) {
          const user: any = await this.findById(currentUser.uid);
          resolve(user);
        } else {
          resolve(null);
        }
      })
    });
  }


  async getRole() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged(async (currentUser:any) => {
        if (currentUser) {
          const idTokenResult = await currentUser.getIdTokenResult();
          console.log('resolve', resolve(idTokenResult.claims?.['role']));

        } else {
          resolve(null);
        }
      })
    });
  }

login(user: any): Observable<{ userCredential: any }> {
  return from(this.afAuth.signInWithEmailAndPassword(user.email, user.password)).pipe(
    map(userCredential => {
      this.currentUserSubject.next(userCredential.user);
      localStorage.setItem('isAuthenticated', 'true');
      return {
        userCredential
      };
    }),
    catchError(error => {
      console.error('Erro ao realizar login:', error);
      localStorage.setItem('isAuthenticated', 'false');
      return throwError(error); // Propague o erro
    })
  );
}


logout(): void {
  this.afAuth.signOut()
      .then(() => {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('hasCompany');
          this.isAuthenticated.next(false);
          this.currentUserSubject.next(null);
      })
      .catch((error:any) => {
          console.log("Erro ao fazer logout:", error);
      });
}

  recoverPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.url}/user/forgot-password`, email)
      .pipe(
        catchError(this.handleError)
      );
  }

  createUser(data:any): Observable<any> {
    console.log("Create ",data)
    return this.http.post<any>(`${this.url}/user/create`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  findById(id:any):Observable<any>{
    return this.http.get<any>(`${this.url}/users/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateHasCompanyState(hasCompany: boolean): void {
    this.hasCompanySubject.next(hasCompany);
  }

  private handleError(error: any) {
    console.error('Ocorreu um erro', error);
    return throwError(error.error || 'Erro no servidor');
  }

  updateUser(uid: string, data: { nome?: string, jogador?: Partial<IJogador> }): Observable<any> {
    return this.http.put<any>(`${this.url}/users/${uid}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllPlayers(): Observable<IJogador[]> {
    return this.http.get<IJogador[]>(`${this.url}/users`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
