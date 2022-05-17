import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {registerLocaleData} from "@angular/common";
import ruLocale from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth.interceptor";
import {IdxColorDirective} from "./shared/components/post/idx-color.directive";
import { SwiperModule } from 'swiper/angular';


registerLocaleData(ruLocale,'ru')

const  INTERCEPTOR_PROVIDERS:Provider={
  provide:HTTP_INTERCEPTORS,
  multi:true,
  useClass:AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    IdxColorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SwiperModule

  ],
  providers: [INTERCEPTOR_PROVIDERS],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
