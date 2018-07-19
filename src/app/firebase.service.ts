import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { Post, PostId } from './model/post';
import { Location } from './model/location';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  postCollection: AngularFirestoreCollection<Post>; //Given collection in the backend firestore ddbb
  post: Observable<Post[]>; //Object observable who will store the data

  locationCollection: AngularFirestoreCollection<Location>;
  location: Observable<Location[]>;

  constructor(private afs: AngularFirestore) { 
    this.postCollection = this.afs.collection('post', ref => {
      return ref.orderBy('timestamp');
    })

    this.locationCollection = this.afs.collection('location', ref => {
      return ref.orderBy('timestamp');
    })
  }

  retreivePost() {
    return this.post = this.postCollection.snapshotChanges().pipe(
      map(posts => posts.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  addPost(post: Post) {
    this.postCollection.add(post);
  }

  updatePost(post: PostId) {
    const newValue: Post = post;
    this.postCollection.doc(post.id).update(newValue);
  }

  removePost(post: PostId) {
    this.postCollection.doc(post.id).delete();
  }

  addLocation(location: Location) {
    this.locationCollection.add(location);
  }

}
