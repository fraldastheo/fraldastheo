import { Dialog, PrepareDialog, DIALOG_REF, DialogRef } from '@nimble-ts/core/dialog';
import { Inject } from '@nimble-ts/core/inject';

@PrepareDialog({
    template: require('./donate.dialog.html'),
    style: require('./donate.dialog.scss')
})
export class DonateDialog extends Dialog {

	public qrCodeCopied: boolean = false;
	public qrCodeCopiedTimeout;

    constructor(
        @Inject(DIALOG_REF) public dialogRef: DialogRef<DonateDialog>
    ) {
        super();
    }

    public onOpen(): void {
    }

    public copyQrCode(): void {
		const el = document.createElement('textarea');
		el.value = '00020126330014BR.GOV.BCB.PIX0111090669056035204000053039865802BR5921Eric Andrade Ferreira6009SAO PAULO61080540900062170513FraldasdoTheo63046CE4';
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);

		clearTimeout(this.qrCodeCopiedTimeout);
		this.render(() => {
			this.qrCodeCopied = true;
			console.log(this.qrCodeCopied);
		});
		this.qrCodeCopiedTimeout = setTimeout(() => {
			this.render(() => {
				this.qrCodeCopied = false;
				console.log(this.qrCodeCopied);
			});
		}, 10000);
    }

    public onClose(): void {
    }
}