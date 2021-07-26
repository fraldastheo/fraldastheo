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

	private countDownInterval: any;
	public bornDate = new Date('2021-09-12T03:00:00Z');
	// public bornDate = new Date('2021-07-26T21:50:00Z');
	public get dateNow() { return new Date(); }
	public get countDown() {
		const diff = (this.bornDate.getTime() - this.dateNow.getTime());
		const days = diff / (1000 * 3600 * 24);
		let data = {} as any;
		data.days =  Math.floor(days);
		data.hours = Math.floor((days - data.days) * 24);
		data.minutes = Math.floor(((days - data.days) * 24 - data.hours) * 60);
		data.seconds = Math.floor((((days - data.days) * 24 - data.hours) * 60 - data.minutes) * 60);
		return data;
	}

    constructor(
        private dialogBuilder: DialogBuilder
    ) {
        super();
		this.countDownInterval = setInterval(() => {
			this.render();
		}, 1000);
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

	public padLeft(value: any): string {
		value = value?.toString();
		const length = 2;
		for(let i = value.length; i < length; i++) {
			value = `0${value}`;
		}
		return value;
	}

	public onExit(): void {
		clearInterval(this.countDownInterval);
	}
}