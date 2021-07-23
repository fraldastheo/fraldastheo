import { Dialog, PrepareDialog, DIALOG_REF, DialogRef } from '@nimble-ts/core/dialog';
import { Inject } from '@nimble-ts/core/inject';
import { ElementListener } from '@nimble-ts/core/render/listener';
import { Game } from './classes/game';

@PrepareDialog({
    template: require('./game.dialog.html'),
    style: require('./game.dialog.scss')
})
export class GameDialog extends Dialog {

	private game: Game;
	private get dialogPainel() {
		return this.dialogRef.element.querySelector('.nimble-dialog-panel') as HTMLElement;
	}
	private get dialogContainer() {
		return this.dialogRef.element.querySelector('.nimble-dialog-container') as HTMLElement;
	}

    constructor(
        @Inject(DIALOG_REF) public dialogRef: DialogRef<GameDialog>,
		private listener: ElementListener
    ) {
        super();
		this.game = new Game();
    }

    onOpen() {
		const dialogArea = this.dialogRef.element.querySelector('.nimble-dialog-area') as HTMLElement;
		dialogArea.style.padding = '0';
		dialogArea.style.background = 'transparent';
		dialogArea.style.boxShadow = 'unset';

		this.dialogContainer.style.minHeight = 'unset';
		this.dialogContainer.style.height = 'unset';

		this.game.start({
			from: this.dialogRef.element.querySelector('.game-dialog'),
			close: () => {
				this.dialogRef.close();
			}
		});
		document.body.style.overflowY = 'hidden';

		this.listener.listen(window, 'resize', this.onResize.bind(this));
		this.onResize();
    }

	private onResize(): void {
		if (window.innerWidth <= 494){
			this.dialogPainel.style.position = 'relative';
			this.dialogPainel.style.transform = `scale(${window.innerWidth / 494})`;
			this.dialogPainel.style.transformOrigin = 'left';
			this.dialogContainer.style.padding = '25px 0';
		}
		else {
			this.dialogPainel.style.position = '';
			this.dialogPainel.style.transform = ``;
			this.dialogPainel.style.transformOrigin = '';
			this.dialogContainer.style.padding = '';
		}
	}

    onClose() {
		this.game.stop();
		document.body.style.overflowY = '';
    }
}