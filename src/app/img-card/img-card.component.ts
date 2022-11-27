import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-img-card',
  templateUrl: './img-card.component.html',
  styleUrls: ['./img-card.component.sass']
})
export class ImgCardComponent {
  @Input('imgSrc') imgSrc = '';
    tags = ["shiba inu", "dog"]
}
