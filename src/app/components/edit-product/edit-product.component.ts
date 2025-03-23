import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
title: string = ''
  price: number= 0
  type: string = ''

  @Input() product!: Product;
  @Output() submitEvent = new EventEmitter<Product>();
  @Output() closeEvent = new EventEmitter<void>();





  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.title = this.product.title;
      this.price = this.product.price;
      this.type = this.product.type;
    }
  }


  submit() {
    if (this.product) {
      this.submitEvent.emit({
        ...this.product,
        title: this.title,
        price: this.price,
        type: this.type
      });
    }
  }

  close() {
    this.closeEvent.emit();
  }

}
