import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent {
  @Input() cartItems: any[] = [];

  ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  getTotalSalary() {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }


}
