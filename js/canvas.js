var can = {
	'title': {
		texttype: true,
		posx: -10000,
		posy: 0,
		branches: [],
		description()
		{
			return '数据增量重制版(Incremental Data Rewritten, IDR)<br>版本：' + VERSION + '<br>作者：Seanxlx';
		},
		unlocked(){return true;},
	},
	'update_log': {
		texttype: true,
		posx: -10300,
		posy: 0,
		branches: [],
		description()
		{
			let disp = '更新日志：<br><br>';
			disp += '2.0.1(2025/5/4)<br>加入了世界前所有内容、世界阶段前半部分内容。<br>Endgame: 1e880+数据，50+世界信息。<br><br>';
			disp += '2.0(2025/4/19)<br>加入了数据、前5个传输节点、跃迁。<br>Endgame：1e35数据。<br><br>';
			return disp;
		},
		unlocked(){return true;},
	},
	'data': {
		posx: 0,
		posy: 0,
		branches: [],
		description()
		{
			return '数据<br>' + notation(res.val('data'), 0) + '<br>点击+1';
		},
		click()
		{
			res.add('data', 1);
		},
		unlocked(){return true;},
	},
	'boost': {
		posx: 0,
		posy: -1000,
		branches: ['data'],
		description()
		{
			return '跃迁<br>' + notation(res.val('boost'), 0) + '<br>价格：' + notation(formula.boostc(), 0);
		},
		lightning()
		{
			return res.val('data').gte(formula.boostc());
		},
		click()
		{
			if(res.val('data').gte(formula.boostc()))
			{
				res.resets.boost();
				res.add('boost', 1);
			}
		},
		unlocked(){return true;},
	},
	'boostscal': {
		texttype: true,
		posx: 0,
		posy: -1100,
		description()
		{
			return '超过10跃迁后，跃迁将超级折算！(^' + notation(formula.boostsc(0)) + ')';
		},
		unlocked(){return res.val('boost').gte(10);},
	},
	'booste': {
		texttype: true,
		posx: 250,
		posy: -1000,
		branches: [],
		description()
		{
			let milestone = [N(1), N(2), N(3), N(5), N(7), N(10), N(12), N(14)
			, N(15), N(16)], next, has_next = false;
			let ms_desc = ['解锁2号传输节点。', '解锁3号传输节点。', '解锁4号传输节点，跃迁增幅1号传输节点。当前：×' + notation(formula.booste(2))
			, '解锁5号传输节点，节点升级效果+0.5。', '解锁购买最大按钮。', '解锁6号传输节点。'
			, '跃迁增幅前4个传输节点。当前：×' + notation(formula.booste(6)), '解锁跃迁数据。'
			, '解锁7号传输节点。', '解锁8号传输节点。'];
			for(let i = 0;i < milestone.length;i++)
			{
				if(res.val('boost').lt(milestone[i]))
				{
					has_next = true;
					next = milestone[i];
					break;
				}
			}
			let disp = '进行跃迁将重置传输节点。<br>跃迁效果：<br>';
			if(has_next) disp += '(下一个在' + notation(next, 0) + '跃迁)<br>';
			for(let i = 0;i < milestone.length;i++)
			{
				if(res.val('boost').gte(milestone[i]))
				{
					disp += '在' + notation(milestone[i], 0) + '跃迁，' + ms_desc[i] + '<br>';
				}
			}
			return disp;
		},
		unlocked(){return true;},
	},
	'boostdata': {
		posx: -200,
		posy: -1000,
		branches: ['boost'],
		description()
		{
			return '跃迁数据<br>' + notation(res.val('boostdata'), 0) + '<br>使节点×' + notation(formula.bde(), 1);
		},
		unlocked(){return res.val('boost').gte(14);},
	},
	'bdeb': {
		posx: -400,
		posy: -1000,
		branches: ['boostdata'],
		description()
		{
			return '增幅跃迁数据效果<br>^+' + notation(formula.bdebe(), 1) + '<br>' + notation(formula.bdebc(), 0) + '数据';
		},
		lightning()
		{
			return res.val('data').gte(formula.bdebc());
		},
		click()
		{
			if(res.val('data').gte(formula.bdebc()))
			{
				res.func('data', formula.bdebc(), Decimal.sub);
				res.add('bdeb', 1);
			}
		},
		unlocked(){return res.val('boost').gte(14);},
	},
	'bdsc': {
		texttype: true,
		posx: -200,
		posy: -850,
		description()
		{
			return '达到' + format(N(2).pow(128)) + '倍之后，<br>跃迁数据乘数将被软上限！<br>(e^0.5)';
		},
		unlocked(){return res.val('boost').gte(14);},
	},
	'dnsc': {
		texttype: true,
		posx: -400,
		posy: 400,
		description()
		{
			return '达到' + format(N(2).pow(128)) + '倍之后，<br>购买乘数将被软上限！<br>(e^0.75)';
		},
		unlocked(){return res.val('boost').gte(14);},
	},
	'dn1': {
		posx: -100,
		posy: 200,
		branches: ['data'],
		description()
		{
			return '1号传输节点<br>' + notation(res.val('dn1'), 0) + '<br>×' + notation(formula.dnbm(1), 1);
		},
		click(){},
		unlocked(){return true;},
	},
	'dn1b': {
		posx: -200,
		posy: 400,
		branches: ['dn1'],
		description()
		{
			return '升级<br>×' + notation(formula.dnbe(), 1) + '<br>价格：' + notation(formula.dnbc(1), 0);
		},
		lightning()
		{
			return res.val('data').gte(formula.dnbc(1));
		},
		click()
		{
			if(res.val('data').gte(formula.dnbc(1)))
			{
				res.func('data', formula.dnbc(1), Decimal.sub);
				res.add('dn1b', 1);
				res.add('dn1', 1);
			}
		},
		unlocked(){return true;},
	},
	'dn2': {
		posx: -200,
		posy: 100,
		branches: ['dn1'],
		description()
		{
			return '2号传输节点<br>' + notation(res.val('dn2'), 0) + '<br>×' + notation(formula.dnbm(2), 1);
		},
		click(){},
		unlocked(){return res.val('boost').gte(1);},
	},
	'dn2b': {
		posx: -400,
		posy: 200,
		branches: ['dn2'],
		description()
		{
			return '升级<br>×' + notation(formula.dnbe(), 1) + '<br>价格：' + notation(formula.dnbc(2), 0);
		},
		lightning()
		{
			return res.val('data').gte(formula.dnbc(2));
		},
		click()
		{
			if(res.val('data').gte(formula.dnbc(2)))
			{
				res.func('data', formula.dnbc(2), Decimal.sub);
				res.add('dn2b', 1);
				res.add('dn2', 1);
			}
		},
		unlocked(){return res.val('boost').gte(1);},
	},
	'dn3': {
		posx: -200,
		posy: -100,
		branches: ['dn2'],
		description()
		{
			return '3号传输节点<br>' + notation(res.val('dn3'), 0) + '<br>×' + notation(formula.dnbm(3), 1);
		},
		click(){},
		unlocked(){return res.val('boost').gte(2);},
	},
	'dn3b': {
		posx: -400,
		posy: -200,
		branches: ['dn3'],
		description()
		{
			return '升级<br>×' + notation(formula.dnbe(), 1) + '<br>价格：' + notation(formula.dnbc(3), 0);
		},
		lightning()
		{
			return res.val('data').gte(formula.dnbc(3));
		},
		click()
		{
			if(res.val('data').gte(formula.dnbc(3)))
			{
				res.func('data', formula.dnbc(3), Decimal.sub);
				res.add('dn3b', 1);
				res.add('dn3', 1);
			}
		},
		unlocked(){return res.val('boost').gte(2);},
	},
	'dn4': {
		posx: -100,
		posy: -200,
		branches: ['dn3'],
		description()
		{
			return '4号传输节点<br>' + notation(res.val('dn4'), 0) + '<br>×' + notation(formula.dnbm(4), 1);
		},
		click(){},
		unlocked(){return res.val('boost').gte(3);},
	},
	'dn4b': {
		posx: -200,
		posy: -400,
		branches: ['dn4'],
		description()
		{
			return '升级<br>×' + notation(formula.dnbe(), 1) + '<br>价格：' + notation(formula.dnbc(4), 0);
		},
		lightning()
		{
			return res.val('data').gte(formula.dnbc(4));
		},
		click()
		{
			if(res.val('data').gte(formula.dnbc(4)))
			{
				res.func('data', formula.dnbc(4), Decimal.sub);
				res.add('dn4b', 1);
				res.add('dn4', 1);
			}
		},
		unlocked(){return res.val('boost').gte(3);},
	},
	'dn5': {
		posx: 100,
		posy: -200,
		branches: ['dn4'],
		description()
		{
			return '5号传输节点<br>' + notation(res.val('dn5'), 0) + '<br>×' + notation(formula.dnbm(5), 1);
		},
		click(){},
		unlocked(){return res.val('boost').gte(5);},
	},
	'dn5b': {
		posx: 200,
		posy: -400,
		branches: ['dn5'],
		description()
		{
			return '升级<br>×' + notation(formula.dnbe(), 1) + '<br>价格：' + notation(formula.dnbc(5), 0);
		},
		lightning()
		{
			return res.val('data').gte(formula.dnbc(5));
		},
		click()
		{
			if(res.val('data').gte(formula.dnbc(5)))
			{
				res.func('data', formula.dnbc(5), Decimal.sub);
				res.add('dn5b', 1);
				res.add('dn5', 1);
			}
		},
		unlocked(){return res.val('boost').gte(5);},
	},
	'dn6': {
		posx: 200,
		posy: -100,
		branches: ['dn5'],
		description()
		{
			return '6号传输节点<br>' + notation(res.val('dn6'), 0) + '<br>×' + notation(formula.dnbm(6), 1);
		},
		click(){},
		unlocked(){return res.val('boost').gte(10);},
	},
	'dn6b': {
		posx: 400,
		posy: -200,
		branches: ['dn6'],
		description()
		{
			return '升级<br>×' + notation(formula.dnbe(), 1) + '<br>价格：' + notation(formula.dnbc(6), 0);
		},
		lightning()
		{
			return res.val('data').gte(formula.dnbc(6));
		},
		click()
		{
			if(res.val('data').gte(formula.dnbc(6)))
			{
				res.func('data', formula.dnbc(6), Decimal.sub);
				res.add('dn6b', 1);
				res.add('dn6', 1);
			}
		},
		unlocked(){return res.val('boost').gte(10);},
	},
	'dn7': {
		posx: 200,
		posy: 100,
		branches: ['dn6'],
		description()
		{
			return '7号传输节点<br>' + notation(res.val('dn7'), 0) + '<br>×' + notation(formula.dnbm(7), 1);
		},
		click(){},
		unlocked(){return res.val('boost').gte(15);},
	},
	'dn7b': {
		posx: 400,
		posy: 200,
		branches: ['dn7'],
		description()
		{
			return '升级<br>×' + notation(formula.dnbe(), 1) + '<br>价格：' + notation(formula.dnbc(7), 0);
		},
		lightning()
		{
			return res.val('data').gte(formula.dnbc(7));
		},
		click()
		{
			if(res.val('data').gte(formula.dnbc(7)))
			{
				res.func('data', formula.dnbc(7), Decimal.sub);
				res.add('dn7b', 1);
				res.add('dn7', 1);
			}
		},
		unlocked(){return res.val('boost').gte(15);},
	},
	'dn8': {
		posx: 100,
		posy: 200,
		branches: ['dn7'],
		description()
		{
			return '8号传输节点<br>' + notation(res.val('dn8'), 0) + '<br>×' + notation(formula.dnbm(8), 1);
		},
		click(){},
		unlocked(){return res.val('boost').gte(16);},
	},
	'dn8b': {
		posx: 200,
		posy: 400,
		branches: ['dn8'],
		description()
		{
			return '升级<br>×' + notation(formula.dnbe(), 1) + '<br>价格：' + notation(formula.dnbc(8), 0);
		},
		lightning()
		{
			return res.val('data').gte(formula.dnbc(8));
		},
		click()
		{
			if(res.val('data').gte(formula.dnbc(8)))
			{
				res.func('data', formula.dnbc(8), Decimal.sub);
				res.add('dn8b', 1);
				res.add('dn8', 1);
			}
		},
		unlocked(){return res.val('boost').gte(16);},
	},
	'buymaxdn': {
		posx: -350,
		posy: 0,
		branches: ['data'],
		description()
		{
			return '购买最大节点<br>(不消耗数据)';
		},
		click()
		{
			let basec = [null, N(1), N(100), N(10000), N(1e10), N(1e18), N(1e40), N(1e100), N(1e210)];
			let multcl = [null, N(1), N(2), N(3), N(6), N(9), N(14), N(20), N(30)];
			for(let i = 1;i <= 8;i++)
			{
				if(res.val('data').lt(basec[i])) continue;
				if(!can['dn' + i + 'b'].unlocked()) break;
				let bm = res.val('data').div(basec[i]).log10().div(multcl[i]).add(1).floor().max(res.val('dn' + i + 'b'));
				if(bm.gte(res.val('dn' + i + 'b')))
				{
					res.add('dn' + i, (bm.sub(res.val('dn' + i + 'b'))));
				}
				res.set('dn' + i + 'b', bm);
			}
		},
		unlocked(){return res.val('boost').gte(7);},
	},
	'autoPL0': {
		posx: -10000,
		posy: 10000,
		branches: [],
		description()
		{
			return '初阶自动化';
		},
		unlocked(){return player.tag.unlau == true;},
	},
	'autodn': {
		posx: -10200,
		posy: 10000,
		branches: ['autoPL0'],
		description()
		{
			return '自动传输节点<br>' + (player.tag.autodn ? '(开)' : '(关)') + '<br>当前冷却：' + formula.autocd('autodn') + 'ms';
		},
		click()
		{
			if(player.tag.autodn != true) player.tag.autodn = true;
			else player.tag.autodn = false;
		},
		unlocked(){return player.tag.unlau == true;},
	},
	'autodnb': {
		color(){return res.val('autodn').gte(9) ? 'blue' : 'cyan';},
		posx: -10400,
		posy: 10000,
		branches: ['autodn'],
		description()
		{
			return '自动传输节点<br>延迟-100ms<br>价格：' + notation(N(3).pow(res.val('autodn')), 0) + '世界信息';
		},
		lightning()
		{
			return res.val('autodn').lt(9) && res.val('PL1info').gte(N(3).pow(res.val('autodn')));
		},
		click()
		{
			if(res.val('autodn').lt(9) && res.val('PL1info').gte(N(3).pow(res.val('autodn'))))
			{
				res.func('PL1info', N(3).pow(res.val('autodn')), Decimal.sub);
				res.add('autodn', 1);
			}
		},
		unlocked(){return formula.haswc(1);},
	},
	'autoboost': {
		posx: -10200,
		posy: 10200,
		branches: ['autoPL0', 'autodn'],
		description()
		{
			return '自动跃迁<br>' + (player.tag.autoboost ? '(开)' : '(关)') + '<br>当前冷却：' + formula.autocd('autoboost') + 'ms';
		},
		click()
		{
			if(player.tag.autoboost != true) player.tag.autoboost = true;
			else player.tag.autoboost = false;
		},
		unlocked(){return formula.haswc(2);},
	},
	'autobdeb': {
		posx: -10200,
		posy: 10400,
		branches: ['autoboost'],
		description()
		{
			return '自动跃迁数据增强<br>' + (player.tag.autobdeb ? '(开)' : '(关)') + '<br>当前冷却：' + formula.autocd('autobdeb') + 'ms';
		},
		click()
		{
			if(player.tag.autobdeb != true) player.tag.autobdeb = true;
			else player.tag.autobdeb = false;
		},
		unlocked(){return formula.haswc(2);},
	},
	'PL1info': {
		color(){return 'blue';},
		posx: 0,
		posy: 10000,
		branches: ['data'],
		description()
		{
			return '世界信息<br>' + notation(res.val('PL1info'), 0);
		},
		click(){},
		unlocked(){return player.tag['unlPL1'];},
	},
	'PL1reset': {
		color(){return 'blue';},
		posx: -200,
		posy: 10000,
		branches: ['PL1info'],
		description()
		{
			let disp = '世界重置<br>+' + notation(formula.resetg(1), 0) + '信息';
			if(formula.resetg(1).lt(1024)) disp += '<br>(' + notation(formula.resetg(1, true).sub(formula.resetg(1)).mul(100), 3) + '%)';
			return disp;
		},
		click()
		{
			if(res.val('data').gte(N(2).pow(1024)))
			{
				res.add('PL1info', formula.resetg(1));
				res.resets.world();
			}
		},
		unlocked(){return player.tag['unlPL1'];},
	},
};

var models = {
	'wu': {
		list: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		para(x)
		{
			let wu = {
				id: x,
				color(){return formula.haswu(this.id) ? 'blue' : 'cyan';},
				posx: 200 * (x % 3) + 200,
				posy: 9800 + Math.floor(x / 3) * 200,
				branches: [],
				description()
				{
					return '世界升级' + (Number(this.id) + 1) + '<br>' + formula.wud(this.id) + '<br>价格：' + notation(formula.wuc(this.id), 0);
				},
				lightning()
				{
					return !formula.haswu(this.id) && res.val('PL1info').gte(formula.wuc(this.id));
				},
				click()
				{
					if(player.tag.haswu == undefined) player.tag.haswu = 0;
					if(res.val('PL1info').gte(formula.wuc(this.id)))
					{
						res.func('PL1info', formula.wuc(this.id), Decimal.sub);
						player.tag.wu = player.tag.wu | (1 << this.id);
					}
				},
				unlocked(){return player.tag['unlPL1'];},
			};
			return ['wu' + x, wu];
		},
	},
	'wcd': {
		list: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		para(x)
		{
			let wcd = {
				id: x,
				texttype: true,
				posx: 800,
				posy: 9500 + 125 * x,
				branches: [],
				description()
				{
					return '世界挑战' + (Number(this.id) + 1) + (formula.haswc(this.id) ? '(已完成)' : '(未完成)') + '<br>' + formula.wcd(this.id) + '<br>目标：' + notation(formula.wcg(this.id)) + '数据<br>奖励：' + formula.wcrd(this.id);
				},
				unlocked(){return formula.haswu(7);},
			};
			return ['wcd' + x, wcd];
		},
	},
	'wceb': {
		list: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		para(x)
		{
			let wceb = {
				id: x,
				color(){return player.tag.inwc == this.id ? 'cyan' : (formula.haswc(this.id) ? 'blue' : 'grey');},
				posx: 1000,
				posy: 9500 + 125 * x,
				branches: [],
				description()
				{
					return player.tag.inwc == this.id ? '退出挑战' : '启动挑战';
				},
				click()
				{
					if(player.tag.inwc == this.id) player.tag.inwc = -1;
					else player.tag.inwc = this.id;
					res.resets.world();
				},
				unlocked(){return formula.haswu(7);},
			};
			return ['wceb' + x, wceb];
		},
	},
};

function load_can_model()
{
	for(let i in models)
	{
		let m = models[i];
		for(let j in m.list)
		{
			let p = m.para(j);
			can[p[0]] = p[1];
		}
	}
}

load_can_model();

const can_cal = {
	dx(id){
		return player.focus_pos[0] - can[id].posx;
	},
	dy(id){
		return player.focus_pos[1] - can[id].posy;
	},
};

function getbranchpara(i, j)
{
	let x1 = can_cal.dx(i), x2 = can_cal.dx(j);
	let y1 = can_cal.dy(i), y2 = can_cal.dy(j);
	let cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
	let deg = (Math.atan(Math.abs(y1 - y2) / (Math.abs(x1 - x2))) * (180 / Math.PI));
	let length = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
	if(x1 > x2) deg = 180 - deg;
	if(y1 > y2) deg = 180 - deg;
	return {cx: cx, cy: cy, deg: deg, length: length};
}

function out_of_screen(x, y, w, h)
{
	let width = document.getElementById('canvas').offsetWidth;
	let height = document.getElementById('canvas').offsetHeight;
	if((x + 0.5 * w) >= -0.5 * width && (x - 0.5 * w) <= 0.5 * width
	&& (y + 0.5 * h) >= -0.5 * height && (y - 0.5 * h) <= 0.5 * height) return true;
	else return false;
}

function update_can()
{
	let canvas = '';
	for(let i in can)
	{
		if(!can[i].unlocked()) continue;
		
		let dx = can_cal.dx(i), dy = can_cal.dy(i);
		
		let width = document.getElementById('canvas').offsetWidth;
		let height = document.getElementById('canvas').offsetHeight;
		
		let w, h;
		if(document.getElementById('node_' + i) != undefined) w = document.getElementById('node_' + i).offsetWidth, h = document.getElementById('node_' + i).offsetHeight;
		else w = 100, h = 100;
		
		let color = 'white';
		if(can[i].color != undefined) color = can[i].color();
		
		for(let k in can[i].branches)
		{
			let j = can[i].branches[k];
			if(!can[j].unlocked()) continue;
			let para = getbranchpara(i, j);
			let dxn = para.cx, dyn = para.cy;
			let edeg = para.deg;
			let hn = Math.abs(para.length * Math.sin(edeg / 180 * Math.PI)), wn = Math.abs(para.length * Math.cos(edeg / 180 * Math.PI));
			if(out_of_screen(dxn, dyn, wn, hn))
			{
				canvas += '<div id="node_' + i + '_' + j + '" class="node_conn" style="';
				canvas += 'border-color: ' + color + '; ';
				canvas += 'transform: translate(-50%, -50%) rotate(' + (para.deg);
				canvas += 'deg); top: ' + (0.5 * height - para.cy) + 'px; left: ' + (0.5 * width - para.cx) + 'px; width: ' + (para.length) + 'px"';
				canvas += '></div>';
			}
		}
		
		if(out_of_screen(dx, dy, w, h))
		{
			let class_using = 'node';
			if(can[i].texttype) class_using = 'node_text_type';
			canvas += '<div id="node_' + i + '" class="' + class_using + '" style="transform: translate(-50%, -50%);';
			canvas += ' top: ' + (0.5 * height - dy) + 'px; left: ' + (0.5 * width - dx) + 'px';
			if(can[i].lightning != undefined && can[i].lightning()) canvas += '; box-shadow: 0px 0px 10px ' + color + ', 0px 0px 5px ' + color;
			canvas += '; border-color: ' + color;
			canvas += '"';
			if(can[i].click != undefined) canvas += ' onmousedown="can[\'' + i + '\'].click()"';
			canvas += '><span class="node_desc">' + can[i].description() + '</span></div>';
		}
	}
	document.getElementById('canvas_corner').innerHTML = canvas;
}

document.addEventListener('mousedown', function(m)
{
	player.press = true;
	player.press_last = [m.clientX, m.clientY];
});

document.addEventListener('touchstart', function(m)
{
	player.tpress = true;
	player.tpress_last = [m.changedTouches[0].clientX, m.changedTouches[0].clientY];
});

document.addEventListener('mouseup', function()
{
	player.press = false;
});

document.addEventListener('touchend', function()
{
	player.tpress = false;
});

document.addEventListener('mousemove', function(m)
{
	if(player.press)
	{
		player.focus_pos[0] -= m.clientX - player.press_last[0];
		player.focus_pos[1] -= m.clientY - player.press_last[1];
		player.press_last = [m.clientX, m.clientY];
	}
});

document.addEventListener('touchmove', function(m)
{
	if(player.tpress)
	{
		player.focus_pos[0] -= m.changedTouches[0].clientX - player.tpress_last[0];
		player.focus_pos[1] -= m.changedTouches[0].clientY - player.tpress_last[1];
		player.tpress_last = [m.changedTouches[0].clientX, m.changedTouches[0].clientY];
	}
});