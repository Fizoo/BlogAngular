import { Pipe, PipeTransform } from '@angular/core';
import {IPost} from "../../shared/interfaces";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(posts:IPost[] , search=''): IPost[] {
    if(search.length===0){
      return posts
    }
    return posts.filter(post=> {
    return  post.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}
