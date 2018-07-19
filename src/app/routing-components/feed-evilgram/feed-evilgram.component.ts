import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Post, PostId } from '../../model/post';
import { Location } from '../../model/location';
import { User } from '../../model/user';
import { FirebaseService } from '../../firebase.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase/app'


@Component({
  selector: 'app-feed-evilgram',
  templateUrl: './feed-evilgram.component.html',
  styleUrls: ['./feed-evilgram.component.css']
})
export class FeedEvilgramComponent {
 
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  posts: PostId[];
  username: string;
  interval: any;


  constructor(private breakpointObserver: BreakpointObserver, private tfs: FirebaseService,public auth: AuthService) {
    this.auth.user.subscribe(
      (data: User) => {
        this.username = data.username;
      }
    )
    this.getData();
  }

  ngOnInit() {
    this.interval = setTimeout(() => this.postLocation(), 30000);
  }

  postLocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        var positionFirebase = new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude);
        var location: Location = { timestamp: new Date(), name: this.username, geoposition: positionFirebase };
        try {
          this.tfs.addLocation(location);
          this.interval = setTimeout(() => this.postLocation(), 30000);
        } catch(err) {
          alert("Failed updating position.");
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getData() {
    this.tfs.retreivePost().subscribe(
      (data: PostId[]) => {
        this.posts = data;
      }
    )
  }

  editPost(post: PostId) {
      this.tfs.updatePost(post);
  }

  removePost(post: PostId) {
    this.tfs.removePost(post);
  }


}
