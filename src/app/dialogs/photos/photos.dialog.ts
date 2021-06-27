import { Dialog, PrepareDialog, DIALOG_REF, DialogRef, DialogBuilder } from '@nimble-ts/core/dialog';
import { Inject } from '@nimble-ts/core/inject';
import { ViewPhotoDialog } from '../view-photo/view-photo.dialog';
import { GalleryPhoto } from './gallery-photo.class';
import { Gallery } from './gallery.class';

@PrepareDialog({
    template: require('./photos.dialog.html'),
    style: require('./photos.dialog.scss')
})
export class PhotosDialog extends Dialog {

	public galleries = [
		new Gallery({
			title: 'Meus ultrassons',
			subtitle: '',
			medias: [
				{ path: 'ultrassons/01.jpeg', type: 'PHOTO' },
				{ path: 'ultrassons/02.jpeg', type: 'PHOTO' },
				{ path: 'ultrassons/03.jpeg', type: 'PHOTO' },
				{ path: 'ultrassons/04.jpeg', type: 'PHOTO' },
				{ path: 'ultrassons/05.jpeg', type: 'PHOTO' },
				{ path: 'ultrassons/06.jpeg', type: 'PHOTO' },
				{ path: 'ultrassons/07.jpeg', type: 'PHOTO' },
				{ path: 'ultrassons/08.mp4', type: 'VIDEO' },
			]
		}),
		new Gallery({
			title: 'Meu quartinho',
			subtitle: '',
			medias: [
				{ path: 'meu-quartinho/01.jpeg', type: 'PHOTO' },
				{ path: 'meu-quartinho/02.jpeg', type: 'PHOTO' },
			]
		}),
		new Gallery({
			title: 'Meu coraçãozinho',
			subtitle: 'Essa foi a primeira vez que o papai e mamãe escutaram meu coraçãozinho!',
			medias: [
				{ path: 'meu-coracao/01.mp4', type: 'VIDEO' },
			]
		}),
	]

    constructor(
        @Inject(DIALOG_REF) public dialogRef: DialogRef<PhotosDialog>,
        private dialogBuilder: DialogBuilder,
    ) {
        super();
		dialogRef.escClose = false;
    }

    public onOpen() {
    }

    public showPhoto(photo: GalleryPhoto) {
		this.dialogBuilder.open(ViewPhotoDialog, {
			data: photo
		});
    }

    public onClose() {
    }
}