import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { PostsService } from 'src/app/shared/posts.service';
import {IPost} from "../../shared/interfaces";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-create-pages',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form!: FormGroup;


  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    const post:IPost={
      title:this.form.value.title,
      author:this.form.value.author,
      text:this.form.value.text,
      date:new Date()
    }

    this.postsService.create(post).subscribe(()=>{
      this.form.reset()
      this.alertService.success('Its post was successfully')
    })
  }

  get title() {
    return this.form.controls['title']
  }

  get author() {
    return this.form.controls['author']
  }

}
