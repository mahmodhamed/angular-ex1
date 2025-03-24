import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ShopService } from 'src/app/services/shop.service';
import Swal from "sweetalert2";

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
    this.shopService.updateProduct(updatedProduct).subscribe((res) => {
      console.log(res);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Update",
          text: "product was Updating Successfully...!!!",
        });
        this.isEditFormOpened = false; 
            } else {
        Swal.fire({
          icon: "error",
          title: "Ops...",
          text: "product is already exist!!!",
        });
        this.isEditFormOpened = false; 
            }
    });
  }
  
  filterProducts(type: string) {
    this.shopService.getFilteredProducts(type).subscribe((data) => {
      this.products = data;
      console.log(this.products);
      this.cdr.detectChanges(); 
    });
  }
  
  
  deleteProduct(id: number) {
    Swal.fire({
      title: "Are you sure you want to delete this product ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.shopService.deleteProduct(id).subscribe((res) => {
          if (res) {
            this.getProducts();
            Swal.fire(
              "Deleted! has been deleted.",
              "success"
            );
          }
        });
      }
      this.getProducts();
    });
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


  addNewProduct(product:any) {
    this.shopService.createNewProduct(product).subscribe((res) => {
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Added",
          text: "product was added Successfully...!!!",
        });
        this.isFormOpened = false
        this.getProducts();
      } else {
        Swal.fire({
          icon: "error",
          title: "Ops...",
          text: "product is already exist!!!",
        });
        this.isFormOpened = false
        this.getProducts();
      }
    });
  }

}
