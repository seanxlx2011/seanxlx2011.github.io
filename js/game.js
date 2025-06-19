function init()
{
	player = {
		//otherwise
		last_version: '未知版本',
		last_update: Date.now(),
		opened: {},
		resource: {},
		tag: {},
		focus_pos: [0, 0],
		press: false,
		press_last: [0, 0],
		tpress: false,
		tpress_last: [0, 0],
		cd_counter: {},
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

function automation()
{
	if(player.tag.autodn)
	{
		if(player.cd_counter.autodn == undefined) player.cd_counter.autodn = Date.now();
		if(formula.autocd('autodn').lt(Date.now() - player.cd_counter.autodn))
		{
			can['buymaxdn'].click();
			player.cd_counter.autodn = Date.now();
		}
	}
	if(formula.haswc(2) && player.tag.autoboost)
	{
		if(player.cd_counter.autoboost == undefined) player.cd_counter.autoboost = Date.now();
		if(formula.autocd('autoboost').lt(Date.now() - player.cd_counter.autoboost))
		{
			can['boost'].click();
			player.cd_counter.autoboost = Date.now();
		}
	}
	if(formula.haswc(2) && player.tag.autobdeb)
	{
		if(player.cd_counter.autobdeb == undefined) player.cd_counter.autobdeb = Date.now();
		if(formula.autocd('autobdeb').lt(Date.now() - player.cd_counter.autobdeb))
		{
			can['bdeb'].click();
			player.cd_counter.autobdeb = Date.now();
		}
	}
}

function produce()
{
	let diff = (Date.now() - player.last_update) / 1000;
	if(diff < 0) diff = 0;
	if(diff > 30) diff = 30;
	
	if(player.last_version != VERSION)
	{
		infobox.create('游戏已更新', '游戏版本已从' + player.last_version + '更新到' + VERSION + '。如果是版本回退，可能引发错误。');
		player.last_version = VERSION;
	}
	
	if(player.tag.start != true)
	{
		infobox.create('欢迎来到IDR 2', '本游戏是由Seanxlx制作的网页增量游戏，项目于2025年4月启动。<br>游戏的最终目标是达到【超越现实】。');
		player.tag.start = true;
	}
	
	if(player.tag.unlPL1 != true && res.val('data').gte(N(2).pow(1024)))
	{
		infobox.create('解锁世界重置', '你已达到' + notation(N(2).pow(1024)) + '数据，解锁世界重置！');
		player.tag.unlPL1 = true;
	}
	
	if(player.tag.unlau != true && formula.haswu(6))
	{
		infobox.create('解锁自动化', '你已解锁自动化！');
		player.tag.unlau = true;
	}
	
	if(player.tag.boostnr != true && res.val('boost').gte(50))
	{
		infobox.create('跃迁不再重置', '跃迁不再重置任何东西。<br>效果永久生效。');
		player.tag.boostnr = true;
	}
	
	for(let i in player.resource)
	{
		if(res[i].produce != undefined)
		{
			res[i].produce(diff);
		}
	}
	
	if(formula.haswu(7) && player.tag.inwc >= 0) formula.compwc();
	
	if(player.tag.unlau == true) automation();
	
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