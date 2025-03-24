import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
    
  products: Array<Product> = [];
  loading = false;
  isFormOpened = false
  isEditFormOpened = false;
  productToEdit: Product | null = null; 
    constructor(
      private shopService:ShopService,
      private cdr: ChangeDetectorRef,
      private router:Router

  ) { }


  ngOnInit(){
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts().subscribe((data) => {
      console.log("Received Data:", data); 
      if (Array.isArray(data)) {
        this.products = data;
      } else {
        console.error("API did not return an array:", data);
        this.products = []; 
      }
    }, (error) => {
      console.error("Error fetching products:", error);
    });
  }
  addItem(product: Product){
    console.log(product.id)
    console.log(product.selected)
    this.shopService.addRemoveItemToCart(product).subscribe((data)=>{

    })
   }


  sort(sort: string){
    this.shopService.sortProductsByPrice(sort).subscribe((data) => {
      this.products = data;
      console.log(this.products);
      this.cdr.detectChanges(); 
    });

  }

  clearFilters() {
    this.shopService.getProducts().subscribe((data) => {
      this.products = data;
      this.cdr.detectChanges();
    });
  }

  detailsProduct(id : number){
   this.router.navigate(["/shop/product",id])
  }
  

  editProduct(product: Product) {
    this.productToEdit = { ...product };
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
  
  filterProducts(type: string) {
    this.shopService.getFilteredProducts(type).subscribe((data) => {
      this.products = data;
      console.log(this.products);
      this.cdr.detectChanges(); 
    });
  }
  
  

  deleteProduct(id: number) {
    this.shopService.deleteProduct(id).subscribe((data)=>{
      this.getProducts();
    })
    
  }
  


  closeForm(){
    this.isFormOpened = false
  }

  openForm(){
    this.isFormOpened = true
  }
  closeEditForm() {
    this.isEditFormOpened = false;
  }


  addNewProduct(product: any){
    console.log(product)
    this.shopService.createNewProduct(product).subscribe((data)=>{
      this.isFormOpened = false
      this.getProducts();
    })
   
  }

}
