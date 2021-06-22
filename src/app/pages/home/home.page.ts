import { Page, PreparePage } from '@nimble-ts/core/page';
import { DialogBuilder } from '@nimble-ts/core/dialog';
import { DonateDialog } from 'src/app/dialogs/donate/donate.dialog';
import { PhotosDialog } from 'src/app/dialogs/photos/photos.dialog';
import { GameDialog } from 'src/app/dialogs/game/game.dialog';

@PreparePage({
    template: require('./home.page.html'),
    style: require('./home.page.scss'),
    title: 'Chá de fralda do Théo'
})
export class HomePage extends Page {

    constructor(
        private dialogBuilder: DialogBuilder
    ) {
        super();
	}

    public openPhotos(): void {
        this.dialogBuilder.open(PhotosDialog);
    }

    public openGame(): void {
        this.dialogBuilder.open(GameDialog);
    }

    public openDonation(): void {
        this.dialogBuilder.open(DonateDialog);
    }
}