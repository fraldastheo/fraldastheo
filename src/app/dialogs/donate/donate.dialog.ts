import { Dialog, PrepareDialog, DIALOG_REF, DialogRef } from '@nimble-ts/core/dialog';
import { Inject } from '@nimble-ts/core/inject';

@PrepareDialog({
    template: require('./donate.dialog.html'),
    style: require('./donate.dialog.scss')
})
export class DonateDialog extends Dialog {

    constructor(
        @Inject(DIALOG_REF) public dialogRef: DialogRef<DonateDialog>
    ) {
        super();
    }

    onOpen() {
    }

    onClose() {
    }
}