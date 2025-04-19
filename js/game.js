function init()
{
	player = {
		//otherwise
		last_update: Date.now(),
		opened: {},
		resource: {},
		tag: {},
		focus_pos: [0, 0],
		press: false,
		press_last: [0, 0],
		tpress: false,
		tpress_last: [0, 0],
	};
}

var infobox_stack = [0, []];

const infobox = {
	create(title, context){
		infobox_stack[1][infobox_stack[0]] = {title: title, context: context};
		infobox_stack[0]++;
	},
	exist(){
		if(infobox_stack[0] == 0) return false;
		else return true;
	},
	get gettitle(){
		if(infobox_stack[0] == 0) return '暂无标题';
		return infobox_stack[1][infobox_stack[0] - 1].title;
	},
	get getcontext(){
		if(infobox_stack[0] == 0) return '暂无内容';
		return infobox_stack[1][infobox_stack[0] - 1].context;
	},
	clean(){
		infobox_stack[0]--;
		infobox_stack[1][infobox_stack[0]] = null;
	},
};

function produce()
{
	let diff = (Date.now() - player.last_update) / 1000;
	if(diff < 0) diff = 0;
	if(diff > 30) diff = 30;
	
	if(player.tag.start != true)
	{
		infobox.create('欢迎来到IDR 2', '本游戏是由Seanxlx制作的网页增量游戏，项目于2025年4月启动。<br>游戏的最终目标是达到【超越现实】。');
		player.tag.start = true;
	}
	
	for(let i in player.resource)
	{
		if(res[i].produce != undefined)
		{
			res[i].produce(diff);
		}
	}
	
	player.last_update = Date.now();
}

function mainloop()
{
	produce();
	update_can();
	
	window.app.$forceUpdate();
}

init();

var playerTemp = player;

data_input();

let playerLen = Object.keys(player).length;

const bKeys = Object.keys(playerTemp);

bKeys.forEach(key =>
{
	if (!player.hasOwnProperty(key))
	{
	  player[key] = playerTemp[key];
	}
});

player.press = false;
player.tpress = false;

setInterval(data_print, 1000);
setInterval(mainloop, 50);

loadVue();