import {ChangeDetectorRef, Directive, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';

@Directive({
    selector: '[appImgPreloader]'  // E.g <img app-img-preloader="http://some_remote_image_url"
})
export class ImgPreloaderDirective implements OnInit, OnDestroy {

    @HostBinding('attr.src') finalImage: any;  // the attribute of the host element we want to update. in this case, <img 'src' />
    @Input('appImgPreloader') targetSource: string;

    // Set an input so the directive can set a default image.
    @Input() defaultImage: string = '';

    downloadingImage: any; // In class holder of remote image
    constructor(private changeDetector: ChangeDetectorRef) {

    }

    // ngOnInit is needed to access the @inputs() variables. these aren't available on constructor()
    ngOnInit() {
        // First set the final image to some default image while we prepare our preloader:
        this.finalImage = this.defaultImage;

        this.downloadingImage = new Image();  // create image object
        this.downloadingImage.onload = () => { // Once image is completed, console.log confirmation and switch our host attribute
            this.finalImage = this.targetSource;  // do the switch
            this.changeDetector.detectChanges();
        };
        // Assign the src to that of some_remote_image_url. Since its an Image Object the
        // on assignment from this.targetSource download would start immediately in the background
        // and trigger the onload()
        if (this.targetSource) {
            this.downloadingImage.src = this.targetSource;
        }
    }

    ngOnDestroy() {

    }
}