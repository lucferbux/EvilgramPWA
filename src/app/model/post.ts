import * as firebase from 'firebase/app'

export interface Post {
    title: string,
    description: string,
    image: string,
    user: string,
    timestamp: Date,
    geoposition: firebase.firestore.GeoPoint
}

export interface PostId extends Post {
    id: string
}