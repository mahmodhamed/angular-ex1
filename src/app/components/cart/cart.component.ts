import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: Array<Product> = [];
  total = 0
  isEditFormOpened = false;
  productToEdit: Product | null = null; 
 constructor(private shopService: ShopService){}
 products: Array<Product> = [];

 ngOnInit(){
 this.getTotal();
  this.getProducts();
 }


 getTotal(){
  this.shopService.getCartTotal().subscribe((data)=>{
    this.total = data.total 
  })
 }

 getProducts() {
  this.shopService.getProducts().subscribe((data) => {
    console.log("Received Data:", data);
    if (Array.isArray(data)) {
      for(let i =0; i<=data.length;i++){
        if(data[i]?.selected==true){
          this.products.push(data[i])
        }
      }
      
    } else {
      console.error("API did not return an array:", data);
      this.products = [];
    }
  }, (error) => {
    console.error("Error fetching products:", error);
  });
}


removeItem(product: Product){
  console.log(product.id)
  console.log(product.selected)
  this.shopService.addRemoveItemToCart(product).subscribe((data)=>{
    for(let i=0;i<this.products.length;i++){
      if(this.products[i].selected==false){
        this.products.splice(i,1)
      }
      this.getTotal();
    }
  }) 
 }


closeEditForm() {
  this.isEditFormOpened = false;
}



}
