import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from "../../shared/posts.service";
import {map, Subscription, switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IPost} from 'src/app/shared/interfaces';
import {AlertService} from '../shared/services/alert.service';


@Component({
  selector: 'app-edit-pages',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnDestroy,OnInit {

  form: FormGroup
  post:IPost
  submitted: boolean;
  uSub:Subscription

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => params['id']),
        switchMap((id: string) => this.postsService.getById(id)))
      .subscribe((post: IPost) => {
        this.post=post
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        })
      });

  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
   this.uSub= this.postsService.update({
      ...this.post,
      title:this.form.value.title,
      text:this.form.value.text
    }).subscribe(()=>{
      this.submitted=false
     this.alertService.success('Its post was successfully updated')
    })
  }

  get title() {
    return this.form.controls['title']
  }

  ngOnDestroy() {
    if(this.uSub) {
      this.uSub.unsubscribe()
    }
  }
}
