import {Component, Input, OnInit} from '@angular/core';
import {IPost} from "../../interfaces";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post:IPost
  @Input() idx:number=2

  num:string
  constructor() { }

  ngOnInit(): void {
    if (this.idx<10){
      this.num='0'+(this.idx+1)
    }
  }

}
