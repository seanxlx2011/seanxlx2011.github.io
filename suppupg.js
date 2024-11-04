const suppupg = [
	/*
	{
		id: 0,
		name: '',
		color: '',
		type: 0,
		gain()
		{
		},
		unlocked() {},
	},
	{
		id: 0,
		name: '',
		color: '',
		type: 1,
		cost: N(0),
		effect()
		{
		},
		money: '',
		moneyname: '',
		description(){},
		unlocked() {},
	},
	{
		id: 0,
		name: '',
		color: '';
		type: 2,
		basecost: N(0),
		scal: N(0),
		effect(x)
		{
		},
		description(){},
		money: '',
		moneyname: '',
		extralevel()
		{
		},
		autobuy(){},
		unlocked() {},
	},
	*/
	{
		id: 0,
		name: '基础物质',
		color: '#333333',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.data.add(10).log10().add(10).log10().sub(37).max(0);
			if(hassuppupg(1)) base = base.mul(suppupgeffect(1));
			if(hassuppupg(3)) base = base.mul(suppupgeffect(3));
			if(hassuppupg(6)) base = base.mul(suppupgeffect(6));
			if(hassuppupg(11)) base = base.mul(suppupgeffect(11));
			if(hassuppupg(13)) base = base.mul(suppupgeffect(13));
			if(hassuppupg(18)) base = base.mul(suppupgeffect(18));
			if(hassuppupg(85)) base = base.mul(suppupgeffect(85));
			if(hassuppupg(86)) base = base.mul(player.suppupg[5].pow(0.5));
			if(hassuppupg(88)) base = base.mul(suppupgeffect(88));
			if(hassuppupg(21)) base = base.mul(suppupgeffect(21));
			if(hassuppupg(92)) base = base.mul(suppupgeffect(92));
			if(hassuppupg(99)) base = base.mul(suppupgeffect(99));
			if(hassuppupg(100)) base = base.mul(suppupgeffect(100));
			if(hasvoidupg(9)) base = base.mul(getvoidupgeffect(9));
			if(hassuppupg(2)) base = base.pow(suppupgeffect(2));
			if(hassuppupg(34)) base = base.pow(suppupgeffect(34));
			if(hasvoidupg(1)) base = base.pow(getvoidupgeffect(1));
			return base;
		},
		unlocked(){return player.data.gte('ee38') || player.suppupg[0].gte(0.01);},
	},
	{
		id: 1,
		name: '基础物质收集器',
		color: '#333333',
		type: 2,
		basecost: N(10),
		scal: N(5),
		effect(x)
		{
			let base = N(2);
			let softcapx = N(1);
			if(hassuppupg(39)) softcapx = softcapx.mul(suppupgeffect(39));
			if(hassuppupg(9)) base = base.add(suppupgeffect(9));
			let ans = N(base).pow(x);
			if(ans.gte(1e15)) ans = N(1e15).mul(ans.div(1e15).root(N(4).pow(softcapx)));
			if(ans.gte(1e35)) ans = N(1e34).mul(N(10).pow(ans.div(1e34).log10().pow(0.6)));
			return ans;
		},
		description()
		{
			return '倍增基础物质获取。当前：×'
			+ notation(this.effect(suppupglevel(this.id)))
			+ (this.effect(suppupglevel(this.id)).gte(1e15) ? (this.effect(suppupglevel(this.id)).gte(1e35) ? '(受二重软上限限制)' : '(受软上限限制)') : '');
		},
		money: 0,
		moneyname: '基础物质',
		extralevel()
		{
			let base = N(0);
			if(hassuppupg(19)) base = base.add(suppupgeffect(19));
			if(hassuppupg(81)) base = base.add(suppupgeffect(81));
			return base;
		},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.data.gte('ee38') || player.suppupg[0].gte(0.01);},
	},
	{
		id: 2,
		name: '基础物质增幅器',
		color: '#333333',
		type: 2,
		basecost: N(1000),
		scal: N(50),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.1));},
		description(){return '指数增幅基础物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 0,
		moneyname: '基础物质',
		extralevel(){return N(0);},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.data.gte('ee38') || player.suppupg[0].gte(0.01);},
	},
	{
		id: 3,
		name: '物质绽放',
		color: '#333333',
		type: 1,
		cost: N(2500),
		effect(){return player.suppupg[0].add(10).log10();},
		description(){return '基础物质倍增基础物质获取。当前：×' + notation(this.effect());},
		money: 0,
		moneyname: '基础物质',
		unlocked(){return player.data.gte('ee38') || player.suppupg[0].gte(0.01);},
	},
	{
		id: 4,
		name: '物质扫描',
		color: '#333333',
		type: 1,
		cost: N(10000),
		effect()
		{
			let base = player.suppupg[0].add(10).log10();
			if(hassuppupg(83)) base = base.pow(suppupgeffect(83));
			return base;
		},
		description(){return '基础物质增幅传输节点产能。当前：^' + notation(this.effect());},
		money: 0,
		moneyname: '基础物质',
		unlocked(){return player.data.gte('ee38') || player.suppupg[0].gte(0.01);},
	},
	{
		id: 5,
		name: '暗物质',
		color: '#222222',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[0].div(10000).max(1).iteratedlog(10, 0.5).add(0.5).max(0);
			if(hassuppupg(6)) base = base.mul(suppupgeffect(6));
			if(hassuppupg(13)) base = base.mul(suppupgeffect(13));
			if(hassuppupg(18)) base = base.mul(suppupgeffect(18));
			if(hassuppupg(86)) base = base.mul(player.suppupg[0].pow(0.1));
			if(hassuppupg(86)) base = base.mul(player.suppupg[10].pow(0.5));
			if(hassuppupg(21)) base = base.mul(suppupgeffect(21));
			if(hassuppupg(7)) base = base.pow(suppupgeffect(7));
			return base;
		},
		unlocked(){return player.suppupg[0].gte(10000) || player.suppupg[5].gte(0.01);},
	},
	{
		id: 6,
		name: '暗物质收集器',
		color: '#222222',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(1.75).pow(x);
			let softcapx = N(1);
			if(hassuppupg(39)) softcapx = softcapx.mul(suppupgeffect(39));
			if(base.gte(1e20)) base = N(1e19).mul(N(10).pow(base.div(1e19).log10().pow(N(0.2).pow(softcapx))));
			return base;
		},
		description(){return '倍增暗物质和基础物质获取。当前：×' + notation(this.effect(suppupglevel(this.id)))
		+ (this.effect(suppupglevel(this.id)).gte(1e20) ? '(受软上限限制)' : '');},
		money: 5,
		moneyname: '暗物质',
		extralevel()
		{
			let base = N(0);
			if(hassuppupg(19)) base = base.add(suppupgeffect(19));
			if(hassuppupg(81)) base = base.add(suppupgeffect(81));
			return base;
		},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.suppupg[0].gte(10000) || player.suppupg[5].gte(0.01);},
	},
	{
		id: 7,
		name: '暗物质增幅器',
		color: '#222222',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.09));},
		description(){return '指数增幅暗物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 5,
		moneyname: '暗物质',
		extralevel(){return N(0);},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.suppupg[0].gte(10000) || player.suppupg[5].gte(0.01);},
	},
	{
		id: 8,
		name: '时间洪流怀表',
		color: '#222222',
		type: 1,
		cost: N(5000),
		effect(){return N(0);},
		description(){return '开始积累离线时间。游戏会消耗离线时间增幅超越以前全局速度。';},
		money: 5,
		moneyname: '暗物质',
		unlocked(){return player.suppupg[0].gte(10000) || player.suppupg[5].gte(0.01);},
	},
	{
		id: 9,
		name: '扫描重构',
		color: '#222222',
		type: 1,
		cost: N(1e8),
		effect(){return player.suppupg[5].add(10).log10().div(9).root(1.5);},
		description(){return '暗物质增幅基础物质收集器底数。当前：+' + notation(this.effect());},
		money: 5,
		moneyname: '暗物质',
		unlocked(){return player.suppupg[0].gte(10000) || player.suppupg[5].gte(0.01);},
	},
	{
		id: 10,
		name: '红物质',
		color: '#440000',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[0].div(1e8).max(1).pow(2).iteratedlog(10, 0.5).add(0.5).max(0);
			if(hassuppupg(11)) base = base.mul(suppupgeffect(11));
			if(hassuppupg(13)) base = base.mul(suppupgeffect(13));
			if(hassuppupg(86)) base = base.mul(player.suppupg[5].pow(0.1));
			if(hassuppupg(86)) base = base.mul(player.suppupg[15].pow(0.5));
			if(hassuppupg(21)) base = base.mul(suppupgeffect(21));
			if(hassuppupg(12)) base = base.pow(suppupgeffect(12));
			return base;
		},
		unlocked(){return player.suppupg[5].gte(1e8) || player.suppupg[10].gte(0.01);},
	},
	{
		id: 11,
		name: '红物质收集器',
		color: '#440000',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(1.6).pow(x);
			let softcapx = N(1);
			if(hassuppupg(39)) softcapx = softcapx.mul(suppupgeffect(39));
			if(base.gte(1e20)) base = N(1e19).mul(N(10).pow(base.div(1e19).log10().pow(N(0.2).pow(softcapx))));
			return base;
		},
		description(){return '倍增红物质和基础物质获取。当前：×' + notation(this.effect(suppupglevel(this.id)))
		+ (this.effect(suppupglevel(this.id)).gte(1e20) ? '(受软上限限制)' : '');},
		money: 10,
		moneyname: '红物质',
		extralevel()
		{
			let base = N(0);
			if(hassuppupg(19)) base = base.add(suppupgeffect(19));
			if(hassuppupg(81)) base = base.add(suppupgeffect(81));
			return base;
		},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.suppupg[5].gte(1e8) || player.suppupg[10].gte(0.01);},
	},
	{
		id: 12,
		name: '红物质增幅器',
		color: '#440000',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.085));},
		description(){return '指数增幅红物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 10,
		moneyname: '红物质',
		extralevel(){return N(0);},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.suppupg[5].gte(1e8) || player.suppupg[10].gte(0.01);},
	},
	{
		id: 13,
		name: '高压转化',
		color: '#440000',
		type: 1,
		cost: N(2e7),
		effect(){return player.colldata.add(10).log10().mul(3).root(1.25);},
		description(){return '折叠数据增幅基础物质、暗物质和红物质获取。当前：×' + notation(this.effect());},
		money: 10,
		moneyname: '红物质',
		unlocked(){return player.suppupg[5].gte(1e8) || player.suppupg[10].gte(0.01);},
	},
	{
		id: 14,
		name: '算力增长',
		color: '#440000',
		type: 1,
		cost: N(1e12),
		effect(){return player.suppupg[10].add(10).log10().root(1.5).div(2);},
		description(){return '红物质增幅算法底数。当前：+' + notation(this.effect());},
		money: 10,
		moneyname: '红物质',
		unlocked(){return player.suppupg[5].gte(1e8) || player.suppupg[10].gte(0.01);},
	},
	{
		id: 15,
		name: '品红物质',
		color: '#8b008b',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[0].div(1e12).max(1).iteratedlog(10, 0.5).add(0.5).max(0);
			if(hassuppupg(11)) base = base.mul(suppupgeffect(16));
			if(hassuppupg(86)) base = base.mul(player.suppupg[10].pow(0.1));
			if(hassuppupg(21)) base = base.mul(suppupgeffect(21));
			if(hassuppupg(12)) base = base.pow(suppupgeffect(17));
			return base;
		},
		unlocked(){return player.suppupg[10].gte(1e12) || player.suppupg[15].gte(0.01);},
	},
	{
		id: 16,
		name: '品红物质收集器',
		color: '#8b008b',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(1.5).pow(x);
			let softcapx = N(1);
			if(hassuppupg(39)) softcapx = softcapx.mul(suppupgeffect(39));
			if(base.gte(1e20)) base = N(1e19).mul(N(10).pow(base.div(1e19).log10().pow(N(0.2).pow(softcapx))));
			return base;
		},
		description(){return '倍增品红物质获取。当前：×' + notation(this.effect(suppupglevel(this.id)))
		+ (this.effect(suppupglevel(this.id)).gte(1e20) ? '(受软上限限制)' : '');},
		money: 15,
		moneyname: '品红物质',
		extralevel()
		{
			let base = N(0);
			if(hassuppupg(19)) base = base.add(suppupgeffect(19));
			if(hassuppupg(81)) base = base.add(suppupgeffect(81));
			return base;
		},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.suppupg[10].gte(1e12) || player.suppupg[15].gte(0.01);},
	},
	{
		id: 17,
		name: '品红物质增幅器',
		color: '#8b008b',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.08));},
		description(){return '指数增幅品红物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 15,
		moneyname: '品红物质',
		extralevel(){return N(0);},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.suppupg[10].gte(1e12) || player.suppupg[15].gte(0.01);},
	},
	{
		id: 18,
		name: '黑暗助推',
		color: '#8b008b',
		type: 1,
		cost: N(1e8),
		effect()
		{
			let base = player.suppdata.root(1.25).add(1).iteratedlog(10, 0.5).add(0.5);
			if(hassuppupg(23)) base = base.pow(suppupgeffect(23));
			if(hassuppupg(39)) base = base.pow(4);
			return base;
		},
		description(){return '压制数据增幅基础物质和暗物质获取。当前：×' + notation(this.effect());},
		money: 15,
		moneyname: '品红物质',
		unlocked(){return player.suppupg[10].gte(1e12) || player.suppupg[15].gte(0.01);},
	},
	{
		id: 19,
		name: '全面增幅',
		color: '#8b008b',
		type: 1,
		cost: N(6e9),
		effect(x){return player.suppupg[15].add(1).log10().root(2).mul(3);},
		description(){return '品红物质增加前四个物质收集器等级。当前：+' + notation(this.effect());},
		money: 15,
		moneyname: '品红物质',
		unlocked(){return player.suppupg[10].gte(1e12) || player.suppupg[15].gte(0.01);},
	},
	{
		id: 20,
		name: '粉物质',
		color: '#ffaaaa',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[0].mul(player.suppupg[5]).mul(player.suppupg[10]).mul(player.suppupg[15]).root(8).add(1).log10();
			if(hassuppupg(90)) base = base.mul(suppupgeffect(90));
			if(hassuppupg(28)) base = base.mul(suppupgeffect(28));
			if(hassuppupg(93)) base = base.mul(suppupgeffect(93));
			if(hassuppupg(98)) base = base.mul(suppupgeffect(98));
			if(hassuppupg(101)) base = base.mul(suppupgeffect(101));
			if(hasvoidupg(5)) base = base.mul(getvoidupgeffect(5));
			if(hassuppupg(22)) base = base.pow(suppupgeffect(22));
			if(player.permupg.includes(62)) base = base.pow(1.1);
			return base;
		},
		unlocked(){return hassuppupg(89);},
	},
	{
		id: 21,
		name: '粉物质收集器',
		color: '#ffaaaa',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(10);
			if(hassuppupg(26)) base = base.mul(suppupgeffect(26));
			if(hassuppupg(31)) base = base.mul(suppupgeffect(31));
			if(hassuppupg(36)) base = base.mul(suppupgeffect(36));
			let ans = base.pow(x);
			if(ans.gte(1e50)) ans = N(10).pow(ans.div(1e49).log10().pow(0.75)).mul(1e49);
			return ans;
		},
		description(){return '倍增前四种物质获取。当前：×' + notation(this.effect(suppupglevel(this.id)))
		+ (this.effect(suppupglevel(this.id)).gte(1e50) ? '(受软上限限制)' : '');},
		money: 20,
		moneyname: '粉物质',
		extralevel()
		{
			let base = N(0);
			return base;
		},
		autobuy(){return false;},
		unlocked(){return hassuppupg(89);},
	},
	{
		id: 22,
		name: '粉物质增幅器',
		color: '#ffaaaa',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.075));},
		description(){return '指数增幅粉物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 20,
		moneyname: '粉物质',
		extralevel(){return N(0);},
		autobuy(){return false;},
		unlocked(){return hassuppupg(89);},
	},
	{
		id: 23,
		name: '强化助推',
		color: '#ffaaaa',
		type: 1,
		cost: N(40000),
		effect(){return player.suppupg[5].add(1).log10().div(200).root(2).mul(2.3).add(1);},
		description(){return '暗物质增幅 黑暗助推 效果。当前：^' + notation(this.effect());},
		money: 20,
		moneyname: '粉物质',
		unlocked(){return hassuppupg(89);},
	},
	{
		id: 24,
		name: '指数指数',
		color: '#ffaaaa',
		type: 1,
		cost: N(80000),
		effect()
		{
			let base = player.suppupg[5].add(1).log10().add(1).iteratedlog(10, 0.5).sub(0.5).div(100).add(1).root(4).add(0.01);
			if(hassuppupg(29)) base = base.mul(suppupgeffect(29));
			return base;
		},
		description(){return '暗物质增幅传输节点产能指数。当前：^' + notation(this.effect());},
		money: 20,
		moneyname: '粉物质',
		unlocked(){return hassuppupg(89);},
	},
	{
		id: 25,
		name: '紫物质',
		color: '#440044',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[20].div(50000).mul(suppupg[20].gain().div(100)).root(5);
			if(hassuppupg(27)) base = base.pow(suppupgeffect(27));
			return base;
		},
		unlocked(){return player.suppupg[20].gte(50000) || player.suppupg[25].gte(0.01);},
	},
	{
		id: 26,
		name: '紫物质收集器',
		color: '#440044',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(1).add(x.mul(2));
			return base;
		},
		description(){return '增加粉物质收集器底数。当前：×' + notation(this.effect(suppupglevel(this.id)));},
		money: 25,
		moneyname: '紫物质',
		extralevel()
		{
			let base = N(0);
			return base;
		},
		autobuy(){return false;},
		unlocked(){return player.suppupg[20].gte(50000) || player.suppupg[25].gte(0.01);},
	},
	{
		id: 27,
		name: '紫物质增幅器',
		color: '#440044',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.07));},
		description(){return '指数增幅紫物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 25,
		moneyname: '紫物质',
		extralevel(){return N(0);},
		autobuy(){return false;},
		unlocked(){return player.suppupg[20].gte(50000) || player.suppupg[25].gte(0.01);},
	},
	{
		id: 28,
		name: '色彩转化',
		color: '#440044',
		type: 1,
		cost: N(5000),
		effect(){return player.suppupg[25].add(1).root(1.5);},
		description(){return '紫物质增幅粉物质获取。当前：×' + notation(this.effect());},
		money: 25,
		moneyname: '紫物质',
		unlocked(){return player.suppupg[20].gte(50000) || player.suppupg[25].gte(0.01);},
	},
	{
		id: 29,
		name: '高能差异',
		color: '#440044',
		type: 1,
		cost: N(90000),
		effect(){return player.suppupg[25].add(10).log10().add(1).log10().add(1).root(10);},
		description(){return '紫物质增幅 指数指数 效果。当前：×' + notation(this.effect())},
		money: 25,
		moneyname: '紫物质',
		unlocked(){return player.suppupg[20].gte(50000) || player.suppupg[25].gte(0.01);},
	},
	{
		id: 30,
		name: '淡紫物质',
		color: '#880088',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[25].div(1e6).mul(suppupg[25].gain().div(1000)).root(5);
			if(hassuppupg(32)) base = base.pow(suppupgeffect(32));
			return base;
		},
		unlocked(){return player.suppupg[25].gte(1e6) || player.suppupg[30].gte(0.01);},
	},
	{
		id: 31,
		name: '淡紫物质收集器',
		color: '#880088',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(1).add(x.mul(1.8));
			return base;
		},
		description(){return '增加粉物质收集器底数。当前：×' + notation(this.effect(suppupglevel(this.id)));},
		money: 30,
		moneyname: '淡紫物质',
		extralevel()
		{
			let base = N(0);
			return base;
		},
		autobuy(){return false;},
		unlocked(){return player.suppupg[25].gte(1e6) || player.suppupg[30].gte(0.01);},
	},
	{
		id: 32,
		name: '淡紫物质增幅器',
		color: '#880088',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.065));},
		description(){return '指数增幅淡紫物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 30,
		moneyname: '淡紫物质',
		extralevel(){return N(0);},
		autobuy(){return false;},
		unlocked(){return player.suppupg[25].gte(1e6) || player.suppupg[30].gte(0.01);},
	},
	{
		id: 33,
		name: '黑暗吞没',
		color: '#880088',
		type: 1,
		cost: N(10000),
		effect(){return player.suppupg[5].add(10).log10().add(9).log10();},
		description(){return '暗物质增幅奇点获取。当前：^' + notation(this.effect());},
		money: 30,
		moneyname: '淡紫物质',
		unlocked(){return player.suppupg[25].gte(1e6) || player.suppupg[30].gte(0.01);},
	},
	{
		id: 34,
		name: '物质扩张',
		color: '#880088',
		type: 1,
		cost: N(1e7),
		effect(){return N(1.075);},
		description(){return '基础物质获取量^1.075。';},
		money: 30,
		moneyname: '淡紫物质',
		unlocked(){return player.suppupg[25].gte(1e6) || player.suppupg[30].gte(0.01);},
	},
	{
		id: 35,
		name: '蓝物质',
		color: '#0000ff',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[30].div(3e6).mul(suppupg[30].gain().div(2000)).root(5);
			if(hassuppupg(37)) base = base.pow(suppupgeffect(37));
			return base;
		},
		unlocked(){return (player.suppupg[30].gte(1e8) || player.suppupg[35].gte(0.01)) && player.PL4unlock;},
	},
	{
		id: 36,
		name: '蓝物质收集器',
		color: '#0000ff',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(1).add(x.mul(1.6));
			return base;
		},
		description(){return '增加粉物质收集器底数。当前：×' + notation(this.effect(suppupglevel(this.id)));},
		money: 35,
		moneyname: '蓝物质',
		extralevel()
		{
			let base = N(0);
			return base;
		},
		autobuy(){return false;},
		unlocked(){return (player.suppupg[30].gte(1e8) || player.suppupg[35].gte(0.01)) && player.PL4unlock;},
	},
	{
		id: 37,
		name: '蓝物质增幅器',
		color: '#0000ff',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.06));},
		description(){return '指数增幅蓝物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 35,
		moneyname: '蓝物质',
		extralevel(){return N(0);},
		autobuy(){return false;},
		unlocked(){return (player.suppupg[30].gte(1e8) || player.suppupg[35].gte(0.01)) && player.PL4unlock;},
	},
	{
		id: 38,
		name: '节点充能',
		color: '#0000ff',
		type: 1,
		cost: N(80000),
		effect(){return player.suppupg[35].add(1).root(2);},
		description(){return '蓝物质增幅一号传输节点产能。当前：^' + notation(this.effect());},
		money: 35,
		moneyname: '蓝物质',
		unlocked(){return (player.suppupg[30].gte(1e8) || player.suppupg[35].gte(0.01)) && player.PL4unlock;},
	},
	{
		id: 39,
		name: '收集充能',
		color: '#0000ff',
		type: 1,
		cost: N(1e6),
		effect(){return N(0.7);},
		description(){return '前四种收集器的软上限弱化30%、黑暗助推 的效果^4。';},
		money: 35,
		moneyname: '蓝物质',
		unlocked(){return (player.suppupg[30].gte(1e8) || player.suppupg[35].gte(0.01)) && player.PL4unlock;},
	},
];

suppupg.length = 80;

var extra = [
	{
		id: 80,
		name: '数据压制 I',
		type: 2,
		basecost: N(1e60),
		scal: N(1e30),
		effect(x)
		{
			let base = N(2).pow(x.add(1).iteratedlog(10, 0.5).add(0.5)).pow(1.5).mul(2).sub(2);
			if(hassuppupg(94)) base = base.mul(suppupgeffect(94));
			return base;
		},
		description(){return '增幅传输节点产能。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		extralevel(){return N(0);},
		autobuy(){return false;},
	},
	{
		id: 81,
		name: '数据压制 II',
		type: 2,
		basecost: N(1e100),
		scal: N(1e50),
		effect(x)
		{
			let base = x.mul(10);
			let softcapx = N(1);
			if(hassuppupg(102)) softcapx = softcapx.mul(suppupgeffect(102));
			if(hassuppupg(104)) softcapx = softcapx.mul(suppupgeffect(104));
			if(base.gte(30)) base = N(29).add(base.sub(29).log(N(10).mul(softcapx)).add(1).pow(2).sub(1));
			return base;
		},
		description(){return '增幅前四种收集器等级。当前：+' + notation(this.effect(suppupglevel(this.id)))
		+ (this.effect(suppupglevel(this.id)).gte(30) ? '(受软上限限制)' : '');},
		extralevel(){return N(0);},
		autobuy(){return false;},
	},
	{
		id: 82,
		name: '数据压制 III',
		type: 2,
		basecost: N(1e240),
		scal: N(1e120),
		effect(x){return N(1e5).pow(x);},
		description(){return '增幅折叠数据获取。当前：×' + notation(this.effect(suppupglevel(this.id)));},
		extralevel(){return N(0);},
		autobuy(){return false;},
	},
	{
		id: 83,
		name: '数据压制 IV',
		type: 2,
		basecost: N(1e300),
		scal: N(1e150),
		effect(x){return N(1).add(x.mul(0.05));},
		description(){return '增幅 物质扫描 效果。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		extralevel(){return N(0);},
		autobuy(){return false;},
	},
	{
		id: 84,
		name: '数据压制 V',
		type: 2,
		basecost: N('e320'),
		scal: N('e160'),
		effect(x){return N(1).add(x.add(1).log10().add(1).log10().div(6)).root(1.5);},
		description(){return '增幅传输节点产能的指数。当前：指数^' + notation(this.effect(suppupglevel(this.id)));},
		extralevel(){return N(0);},
		autobuy(){return false;},
	},
	{
		id: 85,
		name: '数据压制 VI',
		type: 1,
		cost: N(1e69),
		effect(x){return player.suppupg[0].mul(player.suppupg[5]).mul(player.suppupg[10]).mul(player.suppupg[15]).add(1).iteratedlog(10, 0.25).add(0.25);},
		description(){return '基于前四种物质的乘积，增幅基础物质获取。当前：×' + notation(this.effect());},
	},
	{
		id: 86,
		name: '数据压制 VII',
		type: 1,
		cost: N(5.14e114),
		effect(x){return N(0);},
		description(){return '对于前四种物质，每种物质^0.5增幅上一种物质获取，^0.1增幅下一种物质获取。';},
	},
	{
		id: 87,
		name: '数据压制 VIII',
		type: 1,
		cost: N(1e250),
		effect(x){return N(0);},
		description(){return '自动购买前四种物质的收集器和增幅器。';},
	},
	{
		id: 88,
		name: '数据压制 IX',
		type: 1,
		cost: N(1e260),
		effect(x){return player.data.add(10).log10().root(2.75);},
		description(){return '基于数据增幅基础物质产量。当前：×' + notation(this.effect());},
	},
	{
		id: 89,
		name: '数据压制 X',
		type: 1,
		cost: N(1e300),
		effect(x){return N(0);},
		description(){return '解锁新的物质。';},
	},
	{
		id: 90,
		name: '数据压制 XI',
		type: 1,
		cost: N('e380'),
		effect(x){return N(1000);},
		description(){return '粉物质获取速度×1000。';},
	},
	{
		id: 91,
		name: '数据压制 XII',
		type: 1,
		cost: N('e410'),
		effect(x){return N(0.85);},
		description(){return '节点七阶软上限弱化15%';},
	},
	{
		id: 92,
		name: '数据压制 XIII',
		type: 1,
		cost: N('e530'),
		effect(x){return player.suppupg[30].add(1).pow(10);},
		description(){return '淡紫物质增幅基础物质获取。当前：×' + notation(this.effect());},
	},
	{
		id: 93,
		name: '数据压制 XIV',
		type: 1,
		cost: N(2).pow(2048),
		effect(x){return player.exchal[8].sub(15).max(1).pow(8);},
		description(){return '完成奇异挑战8的次数≥16次后倍增粉物质获取。当前：×' + notation(this.effect());},
	},
	{
		id: 94,
		name: '数据压制 XV',
		type: 1,
		cost: N('e750'),
		effect(x){return player.suppupg[80];},
		description(){return '数据压制 I 的数量增幅 数据压制 I 效果。当前：×' + notation(this.effect());},
	},
	{
		id: 95,
		name: '数据压制 XVI',
		type: 1,
		cost: N('e790'),
		effect(x){return player.suppupg[20].add(10).log10().pow(2);},
		description(){return '粉物质延迟算法数据溢出。当前：×' + notation(this.effect());},
	},
	{
		id: 96,
		name: '数据压制 XVII',
		type: 1,
		cost: N('e830'),
		effect(x){return player.suppupg[5].add(10).log10().pow(2).add(10).log10().pow(2);},
		description(){return '暗物质延迟算法数据溢出。当前：×' + notation(this.effect());},
	},
	{
		id: 97,
		name: '数据压制 XVIII',
		type: 1,
		cost: N('e870'),
		effect(x){return player.suppupg[0].add(10).log10();},
		description(){return '基础物质增幅传输节点产能。当前：^' + notation(this.effect());},
	},
	{
		id: 98,
		name: '数据压制 XIX',
		type: 1,
		cost: N('e900'),
		effect(x){return N(player.suppupg[30].add(1)).iteratedlog(10, 0.5).add(0.5).pow(1.25);},
		description(){return '淡紫物质增幅粉物质获取。当前：×' + notation(this.effect());},
	},
	{
		id: 99,
		name: '数据压制 XX',
		type: 1,
		cost: N('e960'),
		effect(x){return player.PL3info.root(5).div(1e6).add(1).iteratedlog(10, 0.3).add(0.3).min(1e100);},
		description(){return '混沌信息增幅基础物质产量。当前：×' + notation(this.effect());},
	},
	{
		id: 100,
		name: '数据压制 XXI',
		type: 1,
		cost: N('e1240'),
		effect(x)
		{
			let num = N(0);
			for(i in player.exchal) num = num.add(player.exchal[i]);
			return N(1.02).pow(num);
		},
		description(){return '完成奇异挑战的次数增幅基础物质获取。当前：×' + notation(this.effect());},
	},
	{
		id: 101,
		name: '数据压制 XXII',
		type: 1,
		cost: N('e1310'),
		effect(x)
		{
			let num = 0;
			for(i in suppupg) if(suppupg[i].type == 1 && player.suppupg[i] == true) num++;
			return N(1.5).pow(num);
		},
		description(){return '购买不可重复压制升级的次数增幅粉物质获取。当前：×' + notation(this.effect());},
	},
	{
		id: 102,
		name: '数据压制 XXIII',
		type: 1,
		cost: N('e1460'),
		effect(x){return N(0.25);},
		description(){return '数据压制 II的软上限弱化75%。';},
	},
	{
		id: 103,
		name: '数据压制 XXIV',
		type: 1,
		cost: N('e1550'),
		effect(x){return player.suppupg[0].add(10).log10().sub(1500).div(10).max(1);},
		description(){return '基础物质增幅虚空数据获取。当前：×' + notation(this.effect());},
	},
	{
		id: 104,
		name: '数据压制 XXV',
		type: 1,
		cost: N('e1800'),
		effect(x){return N(0.5);},
		description(){return '数据压制 II的软上限弱化50%。';},
	},
];

for(let i = 0;i < extra.length;i++)
{
	suppupg[80 + i] = extra[i];
	suppupg[80 + i].color = '#333333';
	suppupg[80 + i].money = 0;
	suppupg[80 + i].moneyname = '基础物质';
	if(i <= 9) suppupg[80 + i].unlocked = (function(){return player.suppupg[0].gte(0.01);});
	else if(i <= 19) suppupg[80 + i].unlocked = (function(){return hassuppupg(89);});
	else suppupg[80 + i].unlocked = (function(){return player.PL4unlock;})
}

function hassuppupg(id)
{
	if(player.openstdmod && suppupg[id].type == 2) return false;
	if(suppupg[id].type == 0) return false;
	else if(suppupg[id].type == 1) return player.suppupg[id];
	else return suppupglevel(id).gte(1);
}

function suppupglevel(id)
{
	if(suppupg[id].type == 0) return N(0);
	else if(suppupg[id].type == 1) return player.suppupg[id];
	else return player.suppupg[id].add(suppupg[id].extralevel());
}

function suppupgeffect(id)
{
	if(suppupg[id].type == 0) return N(0);
	else if(suppupg[id].type == 1) return suppupg[id].effect();
	else return suppupg[id].effect(player.suppupg[id].add(suppupg[id].extralevel()));
}

function suppupgcost(id)
{
	if(suppupg[id].type == 0) return N(0);
	else if(suppupg[id].type == 1) return suppupg[id].cost;
	else return suppupg[id].basecost.mul(suppupg[id].scal.pow(player.suppupg[id]));
}

function suppupgcanbuy(id)
{
	if(suppupg[id].type == 0) return false;
	else if(suppupg[id].type == 1)
	{
		if(!player.suppupg[id] && player.suppupg[suppupg[id].money].gte(suppupgcost(id))) return true;
		else return false;
	}
	else
	{
		if(player.suppupg[suppupg[id].money].gte(suppupg[id].basecost)) return player.suppupg[suppupg[id].money].div(suppupg[id].basecost).log(suppupg[id].scal).add(1).floor();
		else return N(0);
	}
}

function buysuppupg(id)
{
	if(suppupg[id].type == 0) return;
	else if(suppupg[id].type == 1)
	{
		if(player.suppupg[suppupg[id].money].gte(suppupgcost(id)) && !player.suppupg[id])
		{
			player.suppupg[suppupg[id].money] = player.suppupg[suppupg[id].money].sub(suppupgcost(id));
			player.suppupg[id] = true;
		}
	}
	else
	{
		if(suppupgcanbuy(id).sub(player.suppupg[id]).gte(1))
		{
			let canbuy = suppupgcanbuy(id);
			player.suppupg[suppupg[id].money] = player.suppupg[suppupg[id].money].sub(suppupgcost(id));
			player.suppupg[id] = player.suppupg[id].add(1);
		}
	}
}

function buymaxsuppupg(id)
{
	if(suppupg[id].type < 2) return;
	else if(player.suppupg[suppupg[id].money].gte(suppupg[id].basecost))
	{
		let ans = player.suppupg[suppupg[id].money].div(suppupg[id].basecost).log(suppupg[id].scal).add(1).floor();
		if(ans.gte(player.suppupg[id])) player.suppupg[id] = ans;
	}
}