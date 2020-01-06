import { Directive, ElementRef, AfterViewInit, OnInit } from '@angular/core';

@Directive({
  selector: '[appAddToken]'
})
export class AddTokenDirective implements OnInit {
  element: SVGAnimationElement;

  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    // Cast to any is needed as beginElement does not exists in lib.dom.ts
    (this.element as any).beginElement();
  }
}
