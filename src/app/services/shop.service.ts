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

  // getProducts(): Observable<any> {
  //   return this.http.get<any>("http://localhost:3000/api/products");
  // }

  getProducts(): Observable<any[]> {
    return this.http.get<any>("http://localhost:3000/api/products").pipe(
      map(response => response.data) // Extract the array from response
    );
  }
  

  // getProducts(){
  //   this.http.get<any>("http://localhost:3000/api/products").subscribe((data)=>{
  //     this.productsListSubject.next(data.data)
  //   })
  // }


  createNewProduct(product: any){
    // this.http.post<any>("http://localhost:3000/api/products", product).subscribe((data)=>{
    //   this.getProducts()
    // })

    return this.http.post<any>("http://localhost:3000/api/products", product);
  }


  // getFilteredProducts(type: any){
  //   this.http.get<any>("http://localhost:3000/api/products?filter="+type).subscribe((data)=>{
  //     this.productsListSubject.next(data.data)
  //   })
  // }

  //  getFilteredProducts(type: string): Observable<any> {
  //   const url = type ? `http://localhost:3000/api/products?filter=${type}` : 'http://localhost:3000/api/products';
  //   return this.http.get<any>(url); // Returns an observable with the filtered product data
  // }

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

  // getCartTotal() {
  //   this.http.get<any>('http://localhost:3000/api/cart/total').subscribe((data) => {
  //     console.log('Received total:', data.total); // Debug log
  //     const total = Number(data.total);
  //     this.totalPayment.next(total);
  //   });
  // }
  
  


  addRemoveItemToCart(product: Product){
    // let product = this.productsListSubject.getValue().filter((product) => product.id == id)[0]
    // let data = {
    //   title: product.title,
    //   price: product.price,
    //   type: product.type,
    //   selected: !product.selected
    // }
    if(product.selected==true){
      product.selected=false
    }else if (product.selected==false){
      product.selected=true
    }

    
    // this.http.put<any>("http://localhost:3000/api/products/" + product.id, product).subscribe((data)=>{
    //   this.getProducts()
    //   this.getCartTotal()
    //  })
     return this.http.put<any>("http://localhost:3000/api/products/" + product.id, product);
  }


  updateProduct(product: Product): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/products/${product.id}`, product);
  }
  
  deleteProduct(id: number): Observable<any> {
    return this.http.delete("http://localhost:3000/api/products/"+id);
  }

  // deleteProduct(id: number){
  //   this.http.get<any>("http://localhost:3000/api/products?id="+id).subscribe((data)=>{
  //     this.productsListSubject.next(data.data)
  //   })
  // }
  
  // deleteProduct(id: number) {
  //   return this.http.delete<any>(`http://localhost:3000/api/products/${id}`);
  // }

  sortProductsByPrice(sort: any): Observable<any[]> {
    return this.http.get<any>("http://localhost:3000/api/products?sort="+sort).pipe(
      map(response => response.data) // Extract the array from response
    );
  }

  getOneProduct(id: any): Observable<any> {
    return this.http.get<any>("http://localhost:3000/api/products/"+id);
  }
  
  
  
}