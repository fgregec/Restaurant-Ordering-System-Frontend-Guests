import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  myInterval = 4000;
  activeSlideIndex = 0;
  slides: {image: string; text?: string}[] = [
    {image: '../assets/restaurant_imgs/1.jpg'},
    {image: '../assets/restaurant_imgs/2.jpg'},
    {image: '../assets/restaurant_imgs/3.jpg'}
  ];
}
