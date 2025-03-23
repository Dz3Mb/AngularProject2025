import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRendu]',
  standalone: true
})
export class RenduDirective implements OnInit {
  @Input() appRendu: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.color = this.appRendu ? 'green' : 'red';
    this.el.nativeElement.style.fontWeight = 'bold';
  }
}
