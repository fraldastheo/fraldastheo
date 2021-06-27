export class GalleryPhoto {

	public path: string;
	public type: 'VIDEO' | 'PHOTO';

	constructor(obj?: Partial<GalleryPhoto>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}