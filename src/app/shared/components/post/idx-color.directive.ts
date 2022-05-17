import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appIdxColor]'
})
export class IdxColorDirective implements OnInit{


  @Input('appIdxColor') i:number
  constructor(
    private el:ElementRef,
    private r:Renderer2
              ) { }

  ngOnInit(): void {
    switch (true) {
      case (this.i+1)%2===0:this.r.setStyle(this.el.nativeElement,'backgroundColor','#2196f3')
        break;
      case (this.i+1)%3===0:this.r.setStyle(this.el.nativeElement,'backgroundColor','#97dc47')
        break;
      default:
        this.r.setStyle(this.el.nativeElement,'backgroundColor','#e91e63')
    }
  }


}
