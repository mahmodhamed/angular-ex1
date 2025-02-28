import { Component } from '@angular/core';

@Component({
  selector: 'app-imagezoom',
  templateUrl: './imagezoom.component.html',
  styleUrls: ['./imagezoom.component.css']
})
export class ImagezoomComponent {
imgURL='assets/images.jpg'
imgwidth=200;
imgheight=200;

zoomin(){
if(this.imgheight < window.innerHeight *0.9 && this.imgwidth < window.innerWidth *0.9){
  this.imgwidth+=20
this.imgheight+=20

}

}


zoomout(){
if(this.imgheight>30 && this.imgwidth>30){
  this.imgwidth-=20
  this.imgheight-=20
}
}


reset(){
  this.imgwidth=200
this.imgheight=200
}
}
