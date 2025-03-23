import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  title: string = ''
  price: number= 0
  type: string = ''

  @Output() submitEvent = new EventEmitter<any>()
  @Output() closeEvent = new EventEmitter<any>()


  submit(){
    this.submitEvent.emit({title: this.title, price: this.price, type: this.type})
  }

  close(){
    this.closeEvent.emit()
  }
}
