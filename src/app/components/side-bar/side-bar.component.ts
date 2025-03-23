import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  activeItemIndex = 0;
  items = [
    { name: "My Cart", path: "/shop/cart" },
    { name: "Products", path: "/shop/products" },
    { name: "About", path: "/shop/about" },
    { name: "Contact us", path: "/shop/contact" }
  ];
}
