import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ItemInfoComponent } from './components/item-info/item-info.component';

const routes: Routes = [
  { path: "products", component: HomeScreenComponent },
  { path: "cart", component: MyCartComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactUsComponent },
  { path: "itemInfo/:title", component: ItemInfoComponent },
  { path: "", redirectTo: "/products", pathMatch: "full" }, // Redirect empty path to products
  { path: "**", redirectTo: "/products" } // Handle unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
