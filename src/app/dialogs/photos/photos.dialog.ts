import { Dialog, PrepareDialog, DIALOG_REF, DialogRef } from '@nimble-ts/core/dialog';
import { Inject } from '@nimble-ts/core/inject';

@PrepareDialog({
    template: require('./photos.dialog.html'),
    style: require('./photos.dialog.scss')
})
export class PhotosDialog extends Dialog {

    constructor(
        @Inject(DIALOG_REF) public dialogRef: DialogRef<PhotosDialog>
    ) {
        super();
    }

    onOpen() {
    }

    onClose() {
    }
}