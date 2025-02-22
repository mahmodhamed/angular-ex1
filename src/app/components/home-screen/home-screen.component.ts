import { Component } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent {
  items = [
    {
      img: "assets/icons/mugitem.png",
      price: "30$"
    },
    {
      img: "assets/icons/shoesitem.png",
      price: "90$"
    },
    {
      img: "assets/icons/caseitem.png",
      price: "12$"
    }
  ]
}
