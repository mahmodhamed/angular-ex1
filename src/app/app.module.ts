import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { ImagezoomComponent } from './imagezoom/imagezoom.component';
import { AppRoutingModule } from './app-routing.module';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ItemInfoComponent } from './components/item-info/item-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    NavBarComponent,
    SideBarComponent,
    ImagezoomComponent,
    MyCartComponent,
    AboutComponent,
    ContactUsComponent,
    ItemInfoComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
