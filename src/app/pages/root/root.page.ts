import { Page, PreparePage } from '@nimble-ts/core/page';
import { Router } from '@nimble-ts/core/route';

@PreparePage({
    template: require('./root.page.html'),
    style: require('./root.page.scss')
})
export class RootPage extends Page {

    public loading = false;

    private cancelListeners: (() => void)[] = [];

    onInit() {
        this.cancelListeners = [
			Router.onStartChange(() => {
                this.render(() => this.loading = true);
			}),
			Router.onEndChange(() => {
				this.render(() => this.loading = false);
			})
        ]
	}

    onDestroy() {
        this.cancelListeners.forEach(unlistener => {
			unlistener();
		});
    }
}