import { Component } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent {


    wagonimg = "assets/icons/wagon.png";
    salary = 0;
    cartItems: any[] = []; // Stores selected items
  
    items = [
      { img: "assets/icons/mugitem.png", price: 30,name:"cup" },
      { img: "assets/icons/shoesitem.png", price: 90,name:"shoes" },
      { img: "assets/icons/caseitem.png", price: 12,name:"phone cover" },
      { img: "assets/icons/jacket3.jpg", price: 70,name:"jacket" },
      { img: "assets/icons/jacket2.jpg", price: 90 ,name:"jacket"},
      { img: "assets/icons/jens.jpg", price: 90 ,name:"jens"},
      { img: "assets/icons/laptob.png", price: 900 ,name:"laptob"},
      { img: "assets/icons/watch.png", price: 60 ,name:"watch"},
    ];
  
    // Function to add an item to the cart
    addToCart(item: any) {
      this.cartItems.push(item); 
      this.salary += item.price
    }
  
    // Function to show cart items
    showCartItems() {
      alert(this.cartItems.map(item => `${item.price} - ${item.name}`).join("\n"));
    }
  }






