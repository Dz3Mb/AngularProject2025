import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRendu]',
  standalone: true
})
export class RenduDirective implements OnChanges {
  @Input() appRendu: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('appRendu' in changes) {
      this.updateStyle();
    }
  }

  private updateStyle() {
    this.el.nativeElement.style.color = this.appRendu ? 'green' : 'red';
    this.el.nativeElement.style.fontWeight = 'bold';
  }
}
