import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent {
 title=''
    constructor(private route:ActivatedRoute){}
    ngOnInit(){
      this.title= this.route.snapshot.params['title']
    }
}
