import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from 'src/app/shared/posts.service';
import {IPost} from "../../shared/interfaces";
import {debounceTime, distinctUntilChanged, map, Subscription} from "rxjs";
import {FormControl} from "@angular/forms";
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-pages',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: IPost[] = []
  pSub?: Subscription
  dSub?: Subscription
  searchStr = ''
  searchControl = new FormControl()

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.dSub = this.postsService.getAll().subscribe(posts => this.posts = posts)

    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      map(value => value.trim()),
      distinctUntilChanged()
    ).subscribe((el: any) => {
      this.searchStr = el
    })
  }

  remove(id?: string) {
    if (id) {
      this.pSub = this.postsService.remove(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id)
        this.alertService.warning('Its post has been removed')
      })
    }
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }
}
