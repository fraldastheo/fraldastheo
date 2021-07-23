import { Dialog, PrepareDialog, DIALOG_REF, DialogRef } from '@nimble-ts/core/dialog';
import { Inject } from '@nimble-ts/core/inject';
import { ElementListener } from '@nimble-ts/core/render/listener';
import { GalleryPhoto } from '../photos/gallery-photo.class';

@PrepareDialog({
    template: require('./view-photo.dialog.html'),
    style: require('./view-photo.dialog.scss')
})
export class ViewPhotoDialog extends Dialog {

	public photo: GalleryPhoto;
	public loading: boolean = true;
	private img: HTMLImageElement;
	private scaleRate: number = 1;

	public get width(): string { return (this.loading ? 0 : this.img.width * this.scaleRate) + 'px'; }
	public get height(): string { return (this.loading ? 0 : this.img.height * this.scaleRate) + 'px'; }

	private get windowWidth(): number { return window.innerWidth - 50; }
	private get windowHeight(): number { return window.innerHeight - 50; }

    constructor(
        @Inject(DIALOG_REF) public dialogRef: DialogRef<ViewPhotoDialog>,
		private listener: ElementListener
    ) {
        super();
		this.photo = dialogRef.data;
    }
	
    public onOpen() {
		const dialogArea = this.dialogRef.element.querySelector('.nimble-dialog-area') as HTMLElement;
		dialogArea.style.padding = '0';
		dialogArea.style.background = 'transparent';
		dialogArea.style.boxShadow = 'unset';

		const dialogContainer = this.dialogRef.element.querySelector('.nimble-dialog-container') as HTMLElement;
		dialogContainer.style.minHeight = 'unset';
		dialogContainer.style.height = 'unset';
		dialogContainer.style.padding = '25px';

		this.render(() => {
			if (this.photo.type === 'PHOTO') {
				this.listener.listen(window, 'click', this.onWindowResize.bind(this));
				this.loadImage();
			}
			else {
				this.loading = false;
			}
		}).then(() => {
			if (this.photo.type === 'VIDEO') {
				const videoElement = this.dialogRef.element.querySelector('video');
				videoElement?.setAttribute('controls', '');
				videoElement?.setAttribute('autoplay', '');
			}
		});
    }

	private loadImage(): void {
		this.loading = true;
		this.img = new Image();
		this.img.onload = () => {
			this.loading = false;
			this.onWindowResize();
		};
		this.img.src = `/assets/img/gallery/${this.photo.path}`;
	}

	private onWindowResize() {
		this.render(() => {
			if (!this.loading) {
				let widthDiff = this.windowWidth - this.img.width;
				let heightDiff = this.windowHeight - this.img.height;

				if (widthDiff < 0 || heightDiff < 0) {
					if (widthDiff < heightDiff) {
						if (this.img.width > this.windowWidth) {
							this.scaleRate = this.windowWidth / this.img.width;
							return;
						}
					}
					else {
						if (this.img.height > this.windowHeight) {
							this.scaleRate = this.windowHeight / this.img.height;
							return;
						}
					}
				}
			}
			this.scaleRate = 1;
		});
	}

    public onClose() {
    }
}