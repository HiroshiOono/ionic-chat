import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, AlertController } from '@ionic/angular';
import { firebaseError } from './firebase.error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public navController: NavController,
    public alertController: AlertController,
  ) { }

   async getUserId(): Promise<string> {
     const user = await this.afAuth.currentUser;
      return user.uid;
    }


  authSignUp(login: { email: string, password: string }){
    return this.afAuth.createUserWithEmailAndPassword(login.email, login.password)
      .then(() => this.navController.navigateForward('/'))
      .catch( error => {
        this.alertError(error);
        throw error;
      });
  }

  authSignIn(login: { email: string, password: string }){
    return this.afAuth
    .signInWithEmailAndPassword(login.email, login.password)
      .then(() => this.navController.navigateForward('/'))
      .catch( error => {
        this.alertError(error);
        throw error;
      });
  }

  authSignOut(){
    return this.afAuth.signOut()
      .then(() => this.navController.navigateRoot('/auth/signin'))
      .catch( error => {
        this.alertError(error);
        throw error;
      });
  }


  async alertError(e){
    if(firebaseError.hasOwnProperty(e.code)){
      e = firebaseError[e.code];
    }

    const alert = await this.alertController.create({
      header: e.code,
      message: e.message,
      buttons: ['閉じる'],
    });
    await alert.present();
  }


}
