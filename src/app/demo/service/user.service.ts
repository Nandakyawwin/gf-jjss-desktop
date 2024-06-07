import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASEURL = environment.BASEURL;

  constructor(private http: HttpClient) { }

  allUser(){
    return this.http.get(this.BASEURL + 'user/all').pipe(
      map(
        response => response
      )
    )
  };

  saveUser(obj: any) {
    let url = this.BASEURL + 'user/register';
    return this.http.post(url,obj).pipe(
      map(
        response => response
      )
    )
  };

  updateUser(obj: any) {
    let url = this.BASEURL + 'update/user';
    return this.http.post(url,obj).pipe(
      map(
        response => response
      )
    )
  };

  deleteUser(id: any) {
    let url = this.BASEURL + 'delete/user/' + id ;
    return this.http.delete(url).pipe(
      map(
        response => response
      )
    )
  }


}
