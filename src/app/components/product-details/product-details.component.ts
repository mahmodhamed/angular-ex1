import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shopService:ShopService,
    private cdr: ChangeDetectorRef
  ) {}


  public productId: number;
  // product: Product = new Product();
  product: Product | null = null; 

  ngOnInit(): void {
    this.productId = this.route.snapshot.params["id"];
   this.getOneProduct();
  }

  getOneProduct() {
    console.log('Fetching product with ID:', this.productId);
    this.shopService.getOneProduct(this.productId).subscribe(
      (data) => {
        console.log('Fetched product:', data);
        this.product = data;  // Update the product data
        this.cdr.detectChanges();  // Manually trigger change detection
      },
      (error) => {
        console.error('Error fetching product:', error);
        alert('Failed to load product data');
      }
    );
  }
  
  
  
  
  
  
  

}
