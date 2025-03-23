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
  // this.shopService.totalPayment.subscribe((data)=>{
  //   this.total = data 
  // })
  this.getProducts();
 }


 getProducts() {
  this.shopService.getProducts().subscribe((data) => {
    console.log("Received Data:", data); // Check what API returns
    if (Array.isArray(data)) {
      for(let i =0; i<=data.length;i++){
        if(data[i]?.selected==true){
          this.products.push(data[i])
          this.total+=data[i].price
        }

      }
      
    } else {
      console.error("API did not return an array:", data);
      this.products = []; // Reset to avoid issues
    }
  }, (error) => {
    console.error("Error fetching products:", error);
  });
}


addItem(product: Product){
  console.log(product.id)
  console.log(product.selected)
  this.shopService.addRemoveItemToCart(product).subscribe((data)=>{
    for(let i=0;i<this.products.length;i++){
      if(this.products[i].selected==false){
        this.total-=this.products[i].price
        this.products.splice(i,1)

      }

    }
  })
  
  
 }

 editProduct(product: Product) {
  this.productToEdit = { ...product }; // Clone to avoid modifying the original object
  this.isEditFormOpened = true;
}

updateProduct(updatedProduct: Product) {
  console.log("Updated Product:", updatedProduct);

  this.shopService.updateProduct(updatedProduct).subscribe(
    (response) => {
      console.log("API Response:", response);
      this.isEditFormOpened = false; 
      this.getProducts(); 
    },
    (error) => {
      console.error("Error updating product:", error);
    }
  );
}


deleteProduct(id: number) {
  this.shopService.deleteProduct(id).subscribe((data)=>{
    this.getProducts();
  })
  
}

closeEditForm() {
  this.isEditFormOpened = false;
}



}
