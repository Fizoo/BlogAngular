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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


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
    SwiperModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [INTERCEPTOR_PROVIDERS],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
