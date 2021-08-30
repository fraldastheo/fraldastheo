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
	public bornDate = new Date('2021-09-08T14:00:00Z');
	public get dateNow() { return new Date(); }
	public get countDown() {
		const diff = (this.bornDate.getTime() - this.dateNow.getTime());
		const days = diff / (1000 * 3600 * 24);
		let data = {} as any;
		data.days =  Math.floor(days);
		data.hours = Math.floor((days - data.days) * 24);
		data.min = Math.floor(((days - data.days) * 24 - data.hours) * 60);
		data.sec = Math.floor((((days - data.days) * 24 - data.hours) * 60 - data.min) * 60);

		return data;
	}
	public get wasBorn() {
		const remaining = this.countDown;
		return remaining.days < 0;
	}

    constructor(
        private dialogBuilder: DialogBuilder
    ) {
        super();
		if (!this.wasBorn) {
			this.countDownInterval = setInterval(() => {
				this.render();
			}, 1000);
		}
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