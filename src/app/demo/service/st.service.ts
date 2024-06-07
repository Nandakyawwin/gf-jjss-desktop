import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StService {

  BASEURL = environment.BASEURL;
  constructor(private http: HttpClient) { }


  // ******* USER *******

  allUser(){
    return this.http.get(this.BASEURL + 'user/all').pipe(
      map(
        response => response
      )
    )
  };

  allRole() {
    return this.http.get(this.BASEURL + 'all/role').pipe(
      map(
        response => response
      )
    )
  };

  saveUser(obj: any) {
    let url = this.BASEURL + 'register/user';
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
    let url = this.BASEURL + 'delete/user';
    return this.http.post(url,id).pipe(
      map(
        response => response
      )
    )
  }

  // ******* USER *******

  // ******* ADMIN *******

  allAdmin() {
    let url = this.BASEURL + 'all';
    return this.http.get(url).pipe(
      map(
        response => response
      )
    )
  };

  registerAdmin(data: any) {
    let url = this.BASEURL + 'register';
    return this.http.post(url,data).pipe(
      map(
        response => response
      )
    )
  };

  loginAdmin(data: any) {
    let url = this.BASEURL + 'login';
    return this.http.post(url,data).pipe(
      map(
        response => response
      )
    )
  };

  deleteAdmin(id: any) {
    let url = this.BASEURL + 'delete' + '/' + id;
    return this.http.delete(url).pipe(
      map(
        response => response
      )
    )
  };

  // ******* ADMIN *******

  // ******* COUNSELOR *******

  allCounselor() {
    let url = this.BASEURL + 'councillor/all';
    return this.http.get(url).pipe(
      map(
        response => response
      )
    )
  };

  registerCounselor(data:any) {
    let url = this.BASEURL + 'ccheck/post';
    return this.http.post(url,data).pipe(
      map(
        response => response
      )
    )
  };

  deleteCounselor(id: any) {
    let url = this.BASEURL + 'councillor/delete/'  +id;
    return this.http.delete(url).pipe(
      map(
        response => response
      )
    )
  };

  findCounselor(id: any) {
    let url = this.BASEURL + 'C/' + 'id';
    return this.http.get(url).pipe(
      map(
        response => response
      )
    )
  };


  // ******* COUNSELOR *******


  // ******* VOLUNTEER *******

  registerVolunteer(data: any) {
    let url = this.BASEURL + 'councillor/register';
    return this.http.post(url,data).pipe(
      map(
        response => response
      )
    )
  };

  // ******* VOLUNTEER *******

  // ******* MUSIC *******

    // MusicUpdateURL = this.BASEURL + "admin/music/update";
    // MusicDeleteURL = this.BASEURL + "admin/music/delete";

    allMusic(){
      let url = this.BASEURL + 'music/all';
      return this.http.get(url).pipe(map(response=> response))
    };

    saveMusic(data:any){
        let url = this.BASEURL + 'music/post';
        return this.http.post(url, data).pipe(map(response=> response))
    };

    deleteMusic(id:any){
        let url = this.BASEURL + 'music/delete/' + id;
        return this.http.delete(url).pipe(map(response => response))
    }

  // ******* MUSIC *******

  // ******* EVENT *******

    allEvent(){
        let url = this.BASEURL + 'event/all';
        return this.http.get(url).pipe(map(response=>response))
    };

    saveEvent(data: any) {
        let url = this.BASEURL + 'event/post';
        return this.http.post(url,data).pipe(map(response=>response))
    };

    deleteEvent(id: any) {
        let url = this.BASEURL + 'event/delete/' + id;
        return this.http.delete(url).pipe(map(response=>response))
    };

  // ******* EVENT *******

  // ******* SURVEY *******

    allSurvey(){
        let url = this.BASEURL + 'book';
        return this.http.get(url).pipe(map(response=>response))
    };

  Uid(data: any) { 
      let UserFindURL = this.BASEURL + "U/";
      let url = UserFindURL + data;
      return this.http.get(url).pipe(
        map(
          response => response
        )
      )
    }
  
  Cid(data: any) { 
    let CouncillorFindURL = this.BASEURL + "C/";
      let url = CouncillorFindURL + data;
      return this.http.get(url).pipe(
        map(
          response => response
        )
      )
  }
  
  question(date: any, userid: any) {
    let url = this.BASEURL + 'question/search/' + date + '/' + userid;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  // ******* SURVEY *******


}
