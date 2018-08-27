import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  private data = new BehaviorSubject(null);

  constructor() {}

  public get list$() {
    return this.data.asObservable();
  }

  public load$() {

  }

  // add pagination
  public findAll() {

  }

  // add id and return
  public findById() {

  }
}
