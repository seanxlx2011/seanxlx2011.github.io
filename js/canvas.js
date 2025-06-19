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
			disp += '2.1.2(2025/6/10)<br>修复一个bug。<br>修复一个显示错误。<br>加入了铭刻和位面。<br>Endgame: 1e40世界信息、2位面。<br><br>';
			disp += '2.1.1(2025/5/25)<br>修复两个bug。<br><br>';
			disp += '2.1(2025/5/25)<br>修复一个bug。<br>加入了位面切片。<br>Endgame: 10000世界信息。<br><br>';
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
				if(res.val('plane').gte(2))
				{
					let basec = N(1e3);
					let multc = N(1e4);
					let base = res.val('data').div(basec).log(multc).add(1);
					if(base.gte(10)) base = N(10).add(base.sub(10).root(formula.boostsc(0)));
					base = base.floor();
					res.set('boost', res.val('boost').max(base));
				}
				else
				{
					res.add('boost', 1);
				}
				if(!player.tag.boostnr) res.resets.boost();
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
			, N(15), N(16), N(50)], next, has_next = false;
			let ms_desc = ['解锁2号传输节点。', '解锁3号传输节点。', '解锁4号传输节点，跃迁增幅1号传输节点。当前：×' + notation(formula.booste(2))
			, '解锁5号传输节点，节点升级效果+0.5。', '解锁购买最大按钮。', '解锁6号传输节点。'
			, '跃迁增幅前4个传输节点。当前：×' + notation(formula.booste(6)), '解锁跃迁数据。'
			, '解锁7号传输节点。', '解锁8号传输节点。', '跃迁的重置项目失效（永久性）。'];
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
			return '达到' + format(formula.dnbscs()) + '倍之后，<br>购买乘数将被软上限！<br>(e^0.75)';
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
				if(bm.gte(formula.maxdnl(i))) bm = formula.maxdnl(i);
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
	'autoPL1': {
		color(){return 'blue';},
		posx: -10000,
		posy: 10500,
		branches: ['autoPL0'],
		description()
		{
			return '世界自动化';
		},
		unlocked(){return player.tag.unlPL1au == true;},
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
			if(res.val('autodn').gte(9)) return '延迟已缩减到最小';
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
		get posx(){return player.tag.unlPL1au ? -10400 : -10200},
		get posy(){return player.tag.unlPL1au ? 10200 : 10400},
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
	'autoinsc': {
		posx: -9800,
		posy: 10500,
		branches: ['autoPL1'],
		description()
		{
			return '铭刻自动机<br>自动获取100%/s';
		},
		unlocked(){return player.tag.unlomginsc;},
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
	'slice': {
		corrupted: true,
		color(){return 'blue';},
		posx: -400,
		posy: 9600,
		branches: ['PL1info'],
		description()
		{
			return '位面切片<br>' + notation(res.val('slicereal'), 1) + (res.val('data').lt('1e900') ? '<br>需1e900数据' : '<br>(+' + notation(formula.slicegps(), 2) + '/s)') + '<br>节点×' + notation(formula.slicee(), 1);
		},
		click()
		{
		},
		unlocked(){return formula.haswu(8);},
	},
	'insc_unl': {
		color(){return 'blue';},
		posx: -400,
		posy: 10400,
		branches: ['PL1info'],
		description()
		{
			return '解锁铭刻<br>10000世界信息';
		},
		lightning()
		{
			return res.val('PL1info').gte(10000);
		},
		click()
		{
			if(this.lightning())
			{
				res.func('PL1info', N(10000), Decimal.sub);
				player.tag['unlinsc'] = true;
			}
		},
		unlocked(){return !player.tag['unlinsc'] && formula.haswu(8);},
	},
	'insc': {
		color(){return 'blue';},
		posx: -400,
		posy: 10400,
		branches: ['PL1info'],
		description()
		{
			return '铭刻<br>' + notation(res.val('insc'), 0) + '<br>点击+' + notation(formula.inscg(), 1);
		},
		click()
		{
			res.add('insc', formula.inscg());
		},
		unlocked(){return player.tag['unlinsc'];},
	},
	'insc_alpha': {
		color(){return 'blue';},
		posx: -200,
		posy: 10400,
		branches: ['insc'],
		description()
		{
			return 'α铭刻<br>' + notation(res.val('insc_alpha'), 1) + '<br>转化后+' + notation(res.val('insc').mul(formula.insc_rate(1)), 1) + '<br>切片×' + notation(formula.insce(1), 1);
		},
		click()
		{
			res.add('insc_alpha', res.val('insc').mul(formula.insc_rate(1)));
			res.set('insc', N(0));
		},
		unlocked(){return player.tag['unlinsc'];},
	},
	'insc_beta': {
		color(){return 'blue';},
		posx: -400,
		posy: 10600,
		branches: ['insc'],
		description()
		{
			return 'β铭刻<br>' + notation(res.val('insc_beta'), 1) + '<br>转化后+' + notation(res.val('insc').mul(formula.insc_rate(2)), 1) + '<br>节点×' + notation(formula.insce(2), 1);
		},
		click()
		{
			res.add('insc_beta', res.val('insc').mul(formula.insc_rate(2)));
			res.set('insc', N(0));
		},
		unlocked(){return player.tag['unlinsc'];},
	},
	'insc_gamma': {
		color(){return 'blue';},
		posx: -600,
		posy: 10400,
		branches: ['insc'],
		description()
		{
			return 'γ铭刻<br>' + notation(res.val('insc_gamma'), 1) + '<br>转化后+' + notation(res.val('insc').mul(formula.insc_rate(3)), 1) + '<br>节点升级效果<br>+' + notation(formula.insce(3), 3);
		},
		click()
		{
			res.add('insc_gamma', res.val('insc').mul(formula.insc_rate(3)));
			res.set('insc', N(0));
		},
		unlocked(){return player.tag['unlinsc'];},
	},
	'insc_omega': {
		color(){return 'blue';},
		posx: -400,
		posy: 10000,
		branches: ['insc'],
		description()
		{
			if(formula.inscomgg().lt(1) && !(player.tag.unlomginsc)) return '???<br>解锁进度：<br>' + notation(formula.inscomgg().mul(100), 2) + '%';
			else if(formula.inscomgg().lt(1)) return 'ω铭刻<br>' + notation(res.val('insc_omega'), 1) + '<br>重置前四种铭刻<br>' + notation(formula.inscomgg().mul(100), 2) + '%';
			else return 'ω铭刻<br>' + notation(res.val('insc_omega'), 1) + '<br>重置前四种铭刻<br>转化后+' + notation(formula.inscomgg(), 1);
		},
		click()
		{
			if(formula.inscomgg().lt(1)) return;
			res.add('insc_omega', formula.inscomgg());
			res.set('insc', N(0));
			res.set('insc_alpha', N(0));
			res.set('insc_beta', N(0));
			res.set('insc_gamma', N(0));
			player.tag.unlomginsc = true;
			player.tag.unlPL1au = true;
		},
		unlocked(){return player.tag['unlinsc'];},
	},
	'insc_omega_desc': {
		texttype: true,
		posx: -600,
		posy: 10200,
		branches: [],
		description()
		{
			let disp = '<span style="color: ' + (player.tag['unlomginsc'] ? 'lightgreen' : 'grey') + '">首次进行ω铭刻重置后，将解锁铭刻自动机</span>';
			if(formula.inscpsie().gte(10)) disp += '<br><span style="color: red">ψ铭刻效果在^10到达对数软上限！</span>';
			return disp;
		},
		unlocked(){return player.tag['unlinsc'];},
	},
	'insc_psi': {
		color(){return 'blue';},
		posx: -300,
		posy: 10200,
		branches: ['insc', 'insc_omega'],
		description()
		{
			return 'ψ铭刻<br>' + notation(res.val('insc_psi'), 1) + '<br>+' + notation(formula.inscpsig(), 1) + '/s<br>增产基本铭刻<br>^' + notation(formula.inscpsie(), 2);
		},
		click()
		{
			res.add('insc', formula.inscg());
		},
		unlocked(){return player.tag['unlinsc'];},
	},
	'plane': {
		corrupted: true,
		color(){return res.val('PL1info').gte(formula.planec()) ? 'cyan' : 'blue';},
		posx: -800,
		posy: 9600,
		branches: ['slice'],
		description()
		{
			return '位面<br>' + notation(res.val('plane'), 0) + '<br>' + notation(formula.planec()) + '世界信息';
		},
		lightning()
		{
			return res.val('PL1info').gte(formula.planec());
		},
		click()
		{
			if(res.val('PL1info').gte(formula.planec()))
			{
				res.init('slice');
				res.init('slicereal');
				player.tag.sliceb = [N(0), N(0), N(0), N(0), N(0), N(0)];
				res.resets.world();
				
				res.add('plane', 1);
			}
		},
		unlocked(){return res.val('slicereal').gte(formula.slicecap()) || res.val('plane').gte(1);},
	},
	'planed': {
		corrupted: true,
		color(){return res.val('PL1info').gte(formula.planec()) ? 'cyan' : 'blue';},
		posx: -800,
		posy: 9400,
		branches: ['plane'],
		description()
		{
			return '减少一个位面';
		},
		click()
		{
			if(res.val('plane').gte(1)) res.func('plane', 1, Decimal.sub);
		},
		unlocked(){return res.val('plane').gte(1);},
	},
	'planee': {
		texttype: true,
		posx: -1000,
		posy: 9600,
		branches: [],
		description()
		{
			let milestone = [N(1), N(2)], next, has_next = false;
			let ms_desc = ['解锁最大化位面切片升级', '解锁最大化跃迁'];
			for(let i = 0;i < milestone.length;i++)
			{
				if(res.val('plane').lt(milestone[i]))
				{
					has_next = true;
					next = milestone[i];
					break;
				}
			}
			let disp = '创造位面将重置位面切片及其升级。<br>位面基本效果：<br>';
			disp += '<span style="color: red;">(-)位面切片产量÷' + notation(formula.planee(0)) + '->' + notation(formula.planee(0, true)) + (formula.planee(0).gte('1.798e308') ? '(受软上限限制)' : '') + '</span><br>';
			disp += '<span style="color: lightgreen;">(+)位面切片升级价格÷' + notation(formula.planee(1)) + '->' + notation(formula.planee(1, true)) + '</span><br>';
			if(res.val('plane').gte(1)) disp += '<span style="color: lightgreen;">(+)位面切片效果指数+' + notation(formula.planee(2), 0) + '->' + notation(formula.planee(2, true), 0) + '</span><br>';
			
			disp += '位面里程碑效果：<br>';
			if(has_next) disp += '(下一个在' + notation(next, 0) + '位面)<br>';
			for(let i = 0;i < milestone.length;i++)
			{
				if(res.val('plane').gte(milestone[i]))
				{
					disp += '在' + notation(milestone[i], 0) + '位面，' + ms_desc[i] + '<br>';
				}
			}
			return disp;
		},
		unlocked(){return true;},
	},
};

var models = {
	'dnxb': {
		list: [1, 2, 3, 4, 5, 6, 7, 8],
		para(x)
		{
			let px = [0, -200, -400, -400, -200, 200, 400, 400, 200];
			let py = [0, 400, 200, -200, -400, -400, -200, 200, 400];
			let ul = [0, 1, 2, 3, 5, 10, 15, 16];
			let dnxb = {
				posx: px[x],
				posy: py[x],
				unl: ul[x],
				branches: ['dn' + (x)],
				description()
				{
					if(res.val('dn' + x + 'b').gte(formula.maxdnl(x)))
					{
						return '已达到最大等级';
					}
					else return '升级(' + notation(res.val('dn' + x + 'b').div(formula.maxdnl(x)).mul(100), 0) + '%)<br>×' + notation(formula.dnbe(), 1) + '<br>价格：' + notation(formula.dnbc(x), 0);
				},
				lightning()
				{
					return res.val('data').gte(formula.dnbc(x)) || res.val('dn' + x + 'b').gte(formula.maxdnl(x));
				},
				click()
				{
					if(res.val('data').gte(formula.dnbc(x)) && !(res.val('dn' + x + 'b').gte(formula.maxdnl(x))))
					{
						res.func('data', formula.dnbc(x), Decimal.sub);
						res.add('dn' + x + 'b', 1);
						res.add('dn' + x, 1);
						if(player.tag.inwc == 8) player.tag.lbdb = 1;
					}
				},
				unlocked(){return res.val('boost').gte(this.unl);},
			};
			return ['dn' + x + 'b', dnxb];
		},
	},
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
					if(res.val('PL1info').gte(formula.wuc(this.id)) && !formula.haswu(this.id))
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
					if(this.id == 8) player.tag.lbdb = 1;
					res.resets.world();
				},
				unlocked(){return formula.haswu(7);},
			};
			return ['wceb' + x, wceb];
		},
	},
	'sliceb': {
		list: [0, 1, 2, 3, 4, 5],
		para(x)
		{
			let sliceb = {
				id: x,
				corrupted: true,
				color(){return (res.val('slicereal').gte(formula.slicebc(this.id)) ? 'cyan' : 'blue');},
				get posx(){return -400 + 200 * Math.cos(((60 * x + Date.now() * 0.005) % 360) / 180 * Math.PI);},
				get posy(){return 9600 + 200 * Math.sin(((60 * x + Date.now() * 0.005) % 360) / 180 * Math.PI);},
				branches: ['slice'],
				description()
				{
					return formula.slicebd(this.id) + '<br>价格：' + notation(formula.slicebc(this.id), 1);
				},
				click()
				{
					if(res.val('slicereal').gte(formula.slicebc(this.id)))
					{
						if(res.val('plane').gte(1))
						{
							let bs = [N(5), N(12.5), N(17.5), N(10000), N(1e16), N(1e20)];
							let basex = [N(1.5), N(2), N(4), N(7.5), N(1e64), N(1e80)];
							let multiple = N(1);
							if(res.val('plane').gte(1)) multiple = multiple.div(formula.planee(1));
							let base = res.val('slicereal').div(multiple).div(bs[this.id]).log(basex[this.id]).add(1).floor();
							player.tag.sliceb[this.id] = player.tag.sliceb[this.id].max(base);
						}
						else
						{
							res.set('slice', res.val('slicereal').sub(formula.slicebc(this.id)).root(formula.slicep()));
							let h = formula.hassliceb(this.id);
							player.tag.sliceb[this.id] = player.tag.sliceb[this.id].add(1);
						}
					}
				},
				unlocked(){return formula.haswu(8);},
			};
			return ['sliceb' + x, sliceb];
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
			let p = m.para(m.list[j]);
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
			let box_class_using = 'node';
			if(can[i].texttype) box_class_using = 'node_text_type';
			let text_class_using = 'node_desc';
			if(can[i].corrupted) text_class_using += ' corrupted';
			let text_style = '';
			if(can[i].corrupted)
			{
				text_style += 'animation-delay: -' + (Date.now() % 500) + 'ms;';
			}
			
			canvas += '<div id="node_' + i + '" class="' + box_class_using + '" style="transform: translate(-50%, -50%);';
			canvas += ' top: ' + (0.5 * height - dy) + 'px; left: ' + (0.5 * width - dx) + 'px';
			if(can[i].lightning != undefined && can[i].lightning()) canvas += '; box-shadow: 0px 0px 10px ' + color + ', 0px 0px 5px ' + color;
			canvas += '; border-color: ' + color;
			canvas += '"';
			if(can[i].click != undefined) canvas += ' onmousedown="can[\'' + i + '\'].click()"';
			canvas += '><span class="' + text_class_using + '" style="' + text_style + '">' + can[i].description() + '</span></div>';
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