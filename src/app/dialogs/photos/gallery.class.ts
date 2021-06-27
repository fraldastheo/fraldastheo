import { GalleryPhoto } from "./gallery-photo.class";

export class Gallery {

	public title: string;
	public subtitle: string;
	public medias: GalleryPhoto[] = [];

	constructor(obj?: Partial<Gallery>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}