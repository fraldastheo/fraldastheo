import { Dialog, PrepareDialog, DIALOG_REF, DialogRef } from '@nimble-ts/core/dialog';
import { Inject } from '@nimble-ts/core/inject';

@PrepareDialog({
    template: require('./game.dialog.html'),
    style: require('./game.dialog.scss')
})
export class GameDialog extends Dialog {

    constructor(
        @Inject(DIALOG_REF) public dialogRef: DialogRef<GameDialog>
    ) {
        super();
    }

    onOpen() {
    }

    onClose() {
    }
}