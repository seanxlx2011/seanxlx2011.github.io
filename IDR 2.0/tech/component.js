function loadVue()
{
	window.app = new Vue({
		el: '#app',
		data: {
			player: player,
		}
	});
}