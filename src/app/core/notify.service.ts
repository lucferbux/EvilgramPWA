import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  logginStatus = new EventEmitter<string>();

  constructor() { }

}
