import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  productsListSubject = new BehaviorSubject<Product[]>([]);
  productsList$ = this.productsListSubject.asObservable(); 
  productsList:Array<Product> = []
  cartItems = [];
  totalPayment = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    console.log("FETCHING")
    // this.getProducts()
    this.getCartTotal()
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any>("http://localhost:3000/api/products").pipe(
      map(response => response.data) // Extract the array from response
    );
  }
  

  createNewProduct(product: any){
    return this.http.post<any>("http://localhost:3000/api/products", product);
  }


  getFilteredProducts(type: any): Observable<any[]> {
    return this.http.get<any>("http://localhost:3000/api/products?filter="+type).pipe(
      map(response => response.data) // Extract the array from response
    );
  }

  getCartTotal(){
    this.http.get<any>('http://localhost:3000/api/cart/total').subscribe((data) => {
      this.totalPayment.next(data.total)
    })
  }

  

  addRemoveItemToCart(product: Product){
    if(product.selected==true){
      product.selected=false
    }else if (product.selected==false){
      product.selected=true
    }
     return this.http.put<any>("http://localhost:3000/api/products/" + product.id, product);
  }


  updateProduct(product: Product): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/products/${product.id}`, product);
  }
  
  deleteProduct(id: number): Observable<any> {
    return this.http.delete("http://localhost:3000/api/products/"+id);
  }

  sortProductsByPrice(sort: any): Observable<any[]> {
    return this.http.get<any>("http://localhost:3000/api/products?sort="+sort).pipe(
      map(response => response.data) // Extract the array from response
    );
  }

  getOneProduct(id: any): Observable<any> {
    return this.http.get<any>("http://localhost:3000/api/products/"+id);
  }
  
  
  
}