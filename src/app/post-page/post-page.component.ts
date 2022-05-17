import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {PostsService} from "../shared/posts.service";
import {Observable, switchMap} from "rxjs";
import {IPost} from "../shared/interfaces";

@Component({
  selector: 'app-post-pages',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$:Observable<IPost>
  constructor(
    private route:ActivatedRoute,
    private postsService:PostsService
  ) { }

  ngOnInit(): void {
    this.post$=this.route.params.pipe(
      switchMap((params:Params) =>{
        return this.postsService.getById(params['id'])
      })
    )
  }

}
