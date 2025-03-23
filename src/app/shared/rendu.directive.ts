import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRendu]',
  standalone: true
})
export class RenduDirective implements OnInit {
  @Input() appRendu = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appRendu) {
      this.el.nativeElement.style.color = 'green';
      this.el.nativeElement.style.fontWeight = 'bold';
    } else {
      this.el.nativeElement.style.color = 'red';
      this.el.nativeElement.style.fontStyle = 'italic';
    }
  }
}