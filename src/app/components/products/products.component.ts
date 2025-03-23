import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

//   @Input() itemId: number | null = null
//  @Input() title: String = "default"
//  @Input() price: number = 0
//  @Input() selected: boolean = false
//  @Output() itemClicked: EventEmitter<number> = new EventEmitter<number>()
    
  products: Array<Product> = [];
  // products: Product [] = [];
  loading = false;
  isFormOpened = false
  isEditFormOpened = false;
  productToEdit: Product | null = null; 
    constructor(private shopService:ShopService,
      private cdr: ChangeDetectorRef

  ) { }


  ngOnInit(){
  
    
    this.getProducts();

  }

  getProducts() {
    this.shopService.getProducts().subscribe((data) => {
      console.log("Received Data:", data); // Check what API returns
      if (Array.isArray(data)) {
        this.products = data;
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

    })
   }

  //  addRemoveItem(itemID: any){
  //   this.shopService.addRemoveItemToCart(itemID)
  // }

  sort(sort: string){

  }

  clearFilters() {
    this.shopService.getProducts().subscribe((data) => {
      this.products = data;
      this.cdr.detectChanges();
    });
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
      this.cdr.detectChanges(); // Force UI update
    });
  }
  
  

  deleteProduct(id: number) {
    this.shopService.deleteProduct(id).subscribe((data)=>{
      this.getProducts();
    })
    
  }
  
  
  

  goToTheProductDetails(id:number){

  }

  // addRemoveItem(itemID: any){
  //   this.shopService.addRemoveItemToCart(itemID)
  // }

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

  // filterProducts(type: number){
  //   this.shopService.filterProducts(type)
  // }
}
