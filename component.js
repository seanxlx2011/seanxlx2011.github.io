function loadVue()
{
	window.app = new Vue({
		el: '#app',
		data: {
			player: player,
			page: page,
			spage: subpage,
			SMupg: SMupg,
			arraynode: [0, 1, 2, 3, 4, 5, 6, 7],
			unlan: unlan,
			ftu: ftu,
			ftbuyables: ftbuyables,
		}
	});
}