import {Component, OnInit} from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {Observable} from "rxjs";
import {IPost} from "../shared/interfaces";


@Component({
  selector: 'app-home-pages',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$: Observable<IPost[]>

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
   this.posts$= this.postsService.getAll()
  }

}
