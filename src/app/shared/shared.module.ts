import { NgModule } from '@angular/core';

import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";

import {LoaderComponent} from "../pages/loader/loader.component";



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),

  ],
  exports:[
    HttpClientModule,
    QuillModule,
    LoaderComponent
  ]
})
export class SharedModule { }
