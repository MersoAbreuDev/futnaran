import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore   
  ) {}

  uploadImage(file: File, userId: string): Observable<any> {
    return this.getExistingImageUrl(userId).pipe(
      switchMap(existingImageUrl => {
        if (existingImageUrl) {
          // Se existir uma imagem, excluí-la antes de fazer o upload da nova
          return this.deleteImageByUrl(existingImageUrl).pipe(
            switchMap(() => this.uploadNewImage(file, userId))
          );
        } else {
          // Se não houver imagem existente, fazer o upload da nova
          return this.uploadNewImage(file, userId);
        }
      })
    );
  }

  private getExistingImageUrl(userId: string): Observable<string | null> {
    return this.firestore.collection('users').doc(userId).get().pipe(
      switchMap(docSnapshot => {
        const data = docSnapshot.data() as { imageUrl?: string };
        return from([data?.imageUrl || null]); 
      })
    );
  }

  private deleteImageByUrl(imageUrl: string): Observable<any> {
    return from(this.storage.storage.refFromURL(imageUrl).delete());
  }

  private uploadNewImage(file: File, userId: string): Observable<any> {
    const filePath = `images/${userId}/${file.name}`; 
    const fileRef = this.storage.ref(filePath);       
    const task = this.storage.upload(filePath, file); 

    return new Observable(observer => {
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((downloadURL) => {
            this.saveImageData(userId, downloadURL).then(() => {
              observer.next(downloadURL);   
              observer.complete();
            }).catch(error => {
              observer.error(error);
            });
          });
        })
      ).subscribe();
    });
  }

  public saveImageData(userId: string, downloadURL: string): Promise<void> {
    return this.firestore.collection('users').doc(userId).set({ imageUrl: downloadURL }, { merge: true });
  }
}
