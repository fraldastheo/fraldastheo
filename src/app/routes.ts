import { RouteBase } from '@nimble-ts/core/route';

export const ROUTES: RouteBase[] = [
	{
		path: '',
		page: () => import('./pages/root/root.page').then(x => x.RootPage),
		children: [
			{
				path: '',
				page: () => import('./pages/home/home.page').then(x => x.HomePage)
			} 
		]
	}
];