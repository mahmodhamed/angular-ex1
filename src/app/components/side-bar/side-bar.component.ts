import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  activeItemIndex = 0;
  items = [
    { name: "My Cart", path: "/cart" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact us", path: "/contact" }
  ];
}
