import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from 'rxjs';
import {IPost} from "./interfaces";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  create(post: IPost): Observable<IPost> {

    return this.http.post<IPost>(`${environment.fbDbUrl}/post.json`, post)
      .pipe(map((response: any)=>{
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }}
      ))}

  getAll():Observable<IPost[]> {
    return this.http.get(`${environment.fbDbUrl}/post.json`)
      .pipe(
        map((response:{[key:string]:any})=>{
         return  Object.keys(response)
           .map(key=>({
             ...response[key],
             id:key,
             date:new Date(response[key].date)
           }))
        }))
  }

  remove(id:string):Observable<void>{
   return  this.http.delete<void>(`${environment.fbDbUrl}/post/${id}.json`)
  }

  getById(id:string):Observable<IPost>{
      return this.http.get<IPost>(`${environment.fbDbUrl}/post/${id}.json`)
        .pipe(map((post: IPost)=>{
          return {
            ...post,
            id,
            date: new Date(post.date)
          }}))
  }

  update(post:IPost):Observable<IPost>{
    return this.http.patch<IPost>(`${environment.fbDbUrl}/post/${post.id}.json`,post)
  }
}
