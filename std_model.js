//const std_model_name = ['上夸克', '下夸克', '奇夸克', '粲夸克', '顶夸克', '底夸克', '电子', '缪子', '陶子', '中微子', '缪中微子', '陶中微子', '光子', '胶子', 'W玻色子', 'Z玻色子', '希格斯玻色子'];
const std_model = [
	{
		id: 0,
		color: 'red',
		name: '上夸克',
		description(){return '传输节点产能×' + notation(this.effect(player.stdmod[this.id]));},
		effect(x)
		{
			let effbase = N(1 / 1.5);
			if(player.openstdmod && player.unlstdmod[3]) effbase = effbase.add(std_model[3].effect(player.stdmod[3]));
			let base = x.add(1).min(N(300000).add(x.mul(2).root(1.5))).pow(effbase);
			if(player.SMupg >= 0) base = base.mul(N(1.01).pow(base).min(N(1e16).add(N(1.0005).pow(base.root(2)))));
			return base;
		},
		canget()
		{
			let base = player.data.max(1).log10();
			if(player.SMupg >= 1) base = base.mul(player.PL1info.add(10).log10().root(10));
			if(player.astree.includes(31)) base = base.mul(ascend_tree[31].effect());
			if(player.SMupg >= 19) base = base.mul(10);
			return base;
		},
		auto()
		{
			let base = N(0);
			if(player.SMupg >= 23) base = base.add(1);
			return base;
		},
		unlock(){return true;},
		unldes(){return '默认解锁';},
		show(){return true;},
	},
	{
		id: 1,
		color: 'blue',
		name: '下夸克',
		description(){return '传输节点每等级使产能×' + notation(this.effect(player.stdmod[this.id]));},
		effect(x)
		{
			let base = x.add(10).log10().root(6);
			if(player.SMupg >= 4) base = base.pow(1.1);
			return base;
		},
		canget()
		{
			let base = player.data.max(1).log10();
			if(player.astree.includes(31)) base = base.mul(ascend_tree[31].effect());
			if(player.SMupg >= 19) base = base.mul(10);
			return base;
		},
		auto()
		{
			let base = N(0);
			if(player.SMupg >= 23) base = base.add(1);
			return base;
		},
		unlock(){return player.PL1info.gte(1);},
		unldes(){return '达到1世界信息';},
		show(){return true;},
	},
	{
		id: 2,
		color: 'green',
		name: '奇夸克',
		description(){return '每个二重跃迁使传输节点产能×' + notation(this.effect(player.stdmod[this.id]));},
		effect(x)
		{
			let base = x.add(10).log10().root(6).sub(1).div(2).add(1);
			if(player.SMupg >= 20) base = base.pow(6);
			return base;
		},
		canget()
		{
			let base = player.data.max(1).log10().div(2);
			if(player.astree.includes(31)) base = base.mul(ascend_tree[31].effect());
			if(player.SMupg >= 19) base = base.mul(10);
			return base;
		},
		auto()
		{
			let base = N(0);
			if(player.SMupg >= 23) base = base.add(1);
			return base;
		},
		unlock(){return player.data.gte(1e100);},
		unldes(){return '达到1.000e100数据';},
		show(){return player.unlstdmod[1];},
	},
	{
		id: 3,
		color: 'orange',
		name: '粲夸克',
		description(){return '上夸克效果公式中的指数+' + notation(this.effect(player.stdmod[this.id]));},
		effect(x)
		{
			let base = x.add(10).div(10).log10().root(5).div(100);
			if(player.unlstdmod[4]) base = base.mul(std_model[4].effect(player.stdmod[4]));
			return base;
		},
		canget()
		{
			let base = player.PL1info.add(1).log10();
			if(player.astree.includes(31)) base = base.mul(ascend_tree[31].effect());
			if(player.SMupg >= 19) base = base.mul(10);
			return base;
		},
		auto()
		{
			let base = N(0);
			if(player.SMupg >= 23) base = base.add(1);
			return base;
		},
		unlock(){return player.PL1info.gte(1e20);},
		unldes(){return '达到1.000e20世界信息';},
		show(){return player.unlstdmod[2];},
	},
	{
		id: 4,
		color: 'purple',
		name: '顶夸克',
		description(){return '粲夸克效果×' + notation(this.effect(player.stdmod[this.id]));},
		effect(x)
		{
			let base = x.add(100).div(10).log10().mul(N(1).add(x.div(100).min(25)));
			if(base.gte(100)) base = N(100).add(base.sub(100).root(2).div(2));
			return base;
		},
		canget()
		{
			let base = player.PL1info.add(1).log10().div(2);
			if(player.astree.includes(31)) base = base.mul(ascend_tree[31].effect());
			if(player.SMupg >= 19) base = base.mul(10);
			return base;
		},
		auto()
		{
			let base = N(0);
			if(player.SMupg >= 23) base = base.add(1);
			return base;
		},
		unlock(){return player.PL1info.gte(1e80);},
		unldes(){return '达到1.000e80世界信息';},
		show(){return player.SMupg >= 2;},
	},
	{
		id: 5,
		color: 'black',
		name: '底夸克',
		description(){return '世界信息获取量×' + notation(this.effect(player.stdmod[this.id]));},
		effect(x)
		{
			let base = x.mul(N(1.01).pow(x));
			if(base.gte(1e70)) base = N(1e70).mul(N(10).pow(base.div(1e70).add(1).log10().pow(0.8)));
			return base;
		},
		canget()
		{
			let base = player.data.add(1).log10().div(10).sub(599);
			if(player.astree.includes(31)) base = base.mul(ascend_tree[31].effect());
			if(player.SMupg >= 19) base = base.mul(10);
			return base;
		},
		auto()
		{
			let base = N(0);
			if(player.SMupg >= 23) base = base.add(1);
			return base;
		},
		unlock(){return player.data.gte('1e6000');},
		unldes(){return '达到1.000e6000数据';},
		show(){return player.SMupg >= 2;},
	},
	{
		id: 6,
		color: '#406',
		name: '电子',
		description(){return '矩阵节点冷却÷' + notation(this.effect(player.stdmod[this.id]));},
		effect(x)
		{
			let base = x.add(10).log10().root(2).sub(1).div(2).add(1);
			if(player.SMupg >= 21) base = base.pow(2.5);
			return base;
		},
		canget()
		{
			let base = player.data.div('1e24000').add(10).log10().div(5);
			if(player.SMupg >= 20) base = base.mul(player.stdmod[2].add(10).log10().div(2).add(0.5));
			return base;
		},
		unlock(){return player.PL2info.gte(1);},
		unldes(){return '达到1宇宙信息';},
		show(){return player.SMupg >= 19;},
	},
	{
		id: 7,
		color: '#448',
		name: '缪子',
		description(){return '矩阵第一效果指数×' + notation(this.effect(player.stdmod[this.id]));},
		effect(x)
		{
			let base = x.min(1).mul(10).add(x.add(10).log10());
			return base;
		},
		canget()
		{
			let base = player.data.div('1e40000').add(10).log10().div(5);
			return base;
		},
		unlock(){return player.data.gte('1e50000');},
		unldes(){return '达到1e50000数据';},
		show(){return player.SMupg >= 19;},
	},
];
const SMupg = [
	{
		id: 0,
		description(){return '修改上夸克的效果公式：x→x×1.01^x，但额外乘数软上限在×1e16。';},
		costname: '数据',
		costtype: 'data',
		cost: N(1e180),
	},
	{
		id: 1,
		description(){return '世界信息增幅上夸克获取量。当前：×' + notation(player.PL1info.add(10).log10().root(10));},
		costname: '数据',
		costtype: 'data',
		cost: N(1e250),
	},
	{
		id: 2,
		description(){return '世界信息增幅传输节点产能。当前：×' + notation(player.PL1info.add(1).root(8));},
		costname: '世界信息',
		costtype: 'PL1info',
		cost: N(1e32),
	},
	{
		id: 3,
		description(){return '虚空信息倍增传输节点产能。当前：×' + notation(N(100).pow(player.PL4info.sub(5).max(0)));},
		costname: '数据',
		costtype: 'data',
		cost: N('1e520'),
	},
	{
		id: 4,
		description(){return '1.1次方下夸克效果。当前：^' + notation(N(1.1));},
		costname: '数据',
		costtype: 'data',
		cost: N('1e830'),
	},
	{
		id: 5,
		description(){return '解锁矩阵。';},
		costname: '世界信息',
		costtype: 'PL1info',
		cost: N(1e130),
	},
	{
		id: 6,
		description(){return '矩阵数据增幅矩阵节点乘数。当前：×' + notation(player.arraydata.max(10).log10().mul(2).sub(1));},
		costname: '跃迁',
		costtype: 'boost',
		cost: N(640),
	},
	{
		id: 7,
		description(){return '解锁第2矩阵节点。';},
		costname: '数据',
		costtype: 'data',
		cost: N('1e2100'),
	},
	{
		id: 8,
		description(){return '第1矩阵节点产能×10。';},
		costname: '矩阵数据',
		costtype: 'arraydata',
		cost: N(1e8),
	},
	{
		id: 9,
		description(){return '在粒子加速器之外，矩阵数据增幅传输节点产能。当前：^' + notation(player.arraydata.max(1).min(N(9e15).mul(player.arraydata.sub(9e15).max(1).root(2))), 0);},
		costname: '数据',
		costtype: 'data',
		cost: N('1e2500'),
	},
	{
		id: 10,
		description(){return '数据增幅第1矩阵节点产能。当前：×' + notation(player.data.div('1e3300').max(1).log10().add(1).root(3));},
		costname: '数据',
		costtype: 'data',
		cost: N('1e3300'),
	},
	{
		id: 11,
		description(){return '解锁第3矩阵节点。';},
		costname: '矩阵数据',
		costtype: 'arraydata',
		cost: N(9e15),
	},
	{
		id: 12,
		description(){return '冷却＜0.1秒后，可以提升矩阵等阶。';},
		costname: '世界信息',
		costtype: 'PL1info',
		cost: N('1e500'),
	},
	{
		id: 13,
		description(){return '数据增幅第2矩阵节点产能。当前：×' + notation(player.data.div('1e4500').max(1).log10().add(1).root(4));},
		costname: '数据',
		costtype: 'data',
		cost: N('1e4500'),
	},
	{
		id: 14,
		description(){return '解锁第4矩阵节点。';},
		costname: '数据',
		costtype: 'data',
		cost: N('1e5000'),
	},
	{
		id: 15,
		description(){return '矩阵节点 产能增加 购买项底数+1。';},
		costname: '矩阵数据',
		costtype: 'arraydata',
		cost: N(1e30),
	},
	{
		id: 16,
		description(){return '数据增幅第3矩阵节点产能。当前：×' + notation(player.data.div('1e6666').max(1).log10().add(1).root(5));},
		costname: '数据',
		costtype: 'data',
		cost: N('1e6666'),
	},
	{
		id: 17,
		description(){return '解锁第5矩阵节点。';},
		costname: '数据',
		costtype: 'data',
		cost: N('1e8000'),
	},
	{
		id: 18,
		description(){return '矩阵节点的等阶数量增强等阶提供的产能倍数。当前：+' + notation(getantiersum().mul(10));},
		costname: '矩阵数据',
		costtype: 'arraydata',
		cost: N(1e50),
	},
	{
		id: 19,
		description(){return '所有夸克获取量×10。';},
		costname: '数据',
		costtype: 'data',
		cost: N('1e10000'),
	},
	{
		id: 20,
		description(){return '奇夸克效果^6，且奇夸克数量增幅电子获取数量。当前：×' + notation(player.stdmod[2].add(10).log10().div(2).add(0.5));},
		costname: '数据',
		costtype: 'data',
		cost: N('1e400000'),
	},
	{
		id: 21,
		description(){return '电子效果^2.5。';},
		costname: '宇宙信息',
		costtype: 'PL2info',
		cost: N(1e45),
	},
	{
		id: 22,
		description(){return '矩阵数据增幅矩阵节点 产能增加 购买项底数。当前：+' + notation(player.arraydata.div(1e60).max(1).log10().min(20));},
		costname: '宇宙信息',
		costtype: 'PL2info',
		cost: N(1e50),
	},
	{
		id: 23,
		description(){return '每秒自动获得100%收集时可获得的夸克。';},
		costname: '矩阵数据',
		costtype: 'arraydata',
		cost: N(1e77),
	},
	{
		id: 24,
		description(){return '解锁第6矩阵节点。';},
		costname: '宇宙信息',
		costtype: 'PL2info',
		cost: N(1e250),
	},
	{
		id: 25,
		description(){return '解锁因子。';},
		costname: '宇宙信息',
		costtype: 'PL2info',
		cost: N('1.798e308'),
	},
	{
		id: 26,
		description(){return '解锁第7矩阵节点。';},
		costname: '矩阵数据',
		costtype: 'arraydata',
		cost: N(1e110),
	},
	{
		id: 27,
		description(){return '解锁因子提升。(Coming Soon...)';},
		costname: '矩阵数据',
		costtype: 'arraydata',
		cost: N(1e150),
	},
];

const ftu = [
	{
		id: 0,
		title: '矩阵增幅',
		description(layer){return layer + '阶因子能量增幅矩阵节点产能。当前：×' + notation(this.effect(layer));},
		effect(layer)
		{
			let base = player.ft[layer].energy.add(10).log10().pow(N(layer).mul(0.5).add(1));
			return base;
		},
		toteffect()
		{
			let mult = N(1);
			for(let i in player.ft)
			{
				if(hasftu(i, this.id)) mult = mult.mul(ftu[this.id].effect(i));
			}
			return mult;
		},
		cost(layer)
		{
			return N(1);
		},
		unlock(layer)
		{
			return true;
		},
	},
	{
		id: 1,
		title: '扁平增幅',
		description(layer){return layer + '阶因子能量增幅0阶因子能量产能。当前：×' + notation(this.effect(layer)) + (this.effect(layer).gte(this.sc1(layer)) ? '(受软上限限制)' : '');},
		effect(layer)
		{
			let base = player.ft[layer].energy.add(1).root(4).pow(Math.max(1, layer * 6));
			if(base.gte(this.sc1(layer))) base = this.sc1(layer).mul(base.div(this.sc1(layer)).pow(0.5));
			return base;
		},
		sc1(layer)
		{
			let base = N(1e10).pow(layer + 1);
			return base;
		},
		toteffect()
		{
			let mult = N(1);
			for(let i in player.ft)
			{
				if(hasftu(i, this.id)) mult = mult.mul(ftu[this.id].effect(i));
			}
			return mult;
		},
		cost(layer)
		{
			return N(10000);
		},
		unlock(layer)
		{
			return true;
		},
	},
	{
		id: 2,
		title: '增幅矩阵',
		description(layer){return '矩阵数据增幅0阶因子能量产能。当前：×' + notation(this.effect(layer));},
		effect(layer)
		{
			let base = player.arraydata.div(1e90).add(10).log10();
			return base;
		},
		toteffect()
		{
			let mult = N(1);
			for(let i in player.ft)
			{
				if(hasftu(i, this.id)) mult = mult.mul(ftu[this.id].effect(i));
			}
			return mult;
		},
		cost(layer)
		{
			return N(1e6);
		},
		unlock(layer)
		{
			return layer == 0;
		},
	},
	{
		id: 3,
		title: '简*扁平增幅',
		description(layer){return layer + '阶因子能量弱化增幅0阶因子能量产能。当前：×' + notation(this.effect(layer)) + (this.effect(layer).gte(this.sc1(layer)) ? '(受软上限限制)' : '');},
		effect(layer)
		{
			let base = player.ft[layer].energy.add(1).root(8).pow(Math.sqrt(layer * 64));
			if(base.gte(this.sc1(layer))) base = this.sc1(layer).mul(base.div(this.sc1(layer)).pow(0.5));
			return base;
		},
		sc1(layer)
		{
			let base = N(1e5).pow(layer);
			return base;
		},
		toteffect()
		{
			let mult = N(1);
			for(let i in player.ft)
			{
				if(hasftu(i, this.id)) mult = mult.mul(ftu[this.id].effect(i));
			}
			return mult;
		},
		cost(layer)
		{
			return N(1);
		},
		unlock(layer)
		{
			return layer != 0;
		},
	},
	{
		id: 4,
		title: '奇点提取',
		description(layer){return '坍缩保留因子阶层' + (layer - 1) + '的升级';},
		toteffect()
		{
			let max = 0;
			for(let i in player.ft)
			{
				if((player.ft[i].upg & (1 << this.id)) != 0) max = Math.max(max, i);
			}
			return max;
		},
		cost(layer)
		{
			return N(10);
		},
		unlock(layer)
		{
			return (layer == 1) || (layer >= 2 && hasftu(layer - 1, this.id));
		},
	},
	{
		id: 5,
		title: '自动化',
		description(layer){return '自动购买因子阶层' + (layer - 1) + '的增幅器、强化器 I';},
		cost(layer)
		{
			return N(100);
		},
		unlock(layer)
		{
			return (layer == 1) || (layer >= 2 && hasftu(layer - 1, this.id));
		},
	},
	{
		id: 6,
		title: '免费自动化',
		description(layer){return '免费购买因子阶层' + (layer - 1) + '的增幅器、强化器 I';},
		cost(layer)
		{
			return N(100000);
		},
		unlock(layer)
		{
			return (layer == 1) || (layer >= 2 && hasftu(layer - 1, this.id));
		},
	},
];

const ftbtransscalname = ['超级折算', '究极折算', '扭曲折算', '末日折算', '穹顶折算', '奇点折算'];

const ftbuyables = [
	{
		id: 0,
		title: '增幅器',
		description(layer){return '倍增' + layer + '阶因子能量×' + notation(this.base(layer)) + '。<br>当前：×' + notation(this.effect(layer))},
		base(layer)
		{
			let base = N(3).sub(N(layer).mul(0.25)).max(1.5);
			if(hasftb(layer, 1)) base = base.add(ftbuyables[1].effect(layer));
			if(player.astree.includes(41)) base = base.add(0.25);
			if(hasftb(layer, 2)) base = base.mul(ftbuyables[2].effect(layer));
			return base;
		},
		effect(layer)
		{
			if(!ftbdefined(layer, this.id)) return N(1);
			let base = this.base(layer).pow(player.ft[layer].buyables[this.id]);
			return base;
		},
		cost(layer)
		{
			return N(10);
		},
		scal(layer)
		{
			return N(5).add(layer).mul(2);
		},
		transscal(layer)
		{
			let ori = [N(20), N(0), N(0), N(0), N(0), N(0)];
			return [
			[ori[0], function(){
				let base = N(2);
				return base;
			}],
			];
		},
		auto(layer)
		{
			return hasftu(Number(layer) + 1, 5);
		},
		free(layer)
		{
			return hasftu(Number(layer) + 1, 6);
		},
		unlock(layer)
		{
			return true;
		},
	},
	{
		id: 1,
		title: '强化器 I',
		description(layer){return '增加增幅器底数+' + notation(this.base(layer)) + '。<br>当前：+' + notation(this.effect(layer))},
		base(layer)
		{
			let base = N(0.1).sub(N(layer).mul(0.01)).max(0.05);
			return base;
		},
		effect(layer)
		{
			if(!ftbdefined(layer, this.id)) return N(0);
			let base = this.base(layer).mul(player.ft[layer].buyables[this.id]);
			return base;
		},
		cost(layer)
		{
			return N(1000);
		},
		scal(layer)
		{
			return N(7).add(layer).mul(2);
		},
		transscal(layer)
		{
			let ori = [N(20), N(0), N(0), N(0), N(0), N(0)];
			return [
			[ori[0], function(){
				let base = N(2);
				return base;
			}],
			];
		},
		auto(layer)
		{
			return hasftu(Number(layer) + 1, 5);
		},
		free(layer)
		{
			return hasftu(Number(layer) + 1, 6);
		},
		unlock(layer)
		{
			return true;
		},
	},
	{
		id: 2,
		title: '强化器 II',
		description(layer){return '增加增幅器底数×+' + notation(this.base(layer)) + '。<br>当前：×' + notation(this.effect(layer))},
		base(layer)
		{
			let base = N(0.15).sub(layer * 0.03).max(0.03);
			return base;
		},
		effect(layer)
		{
			if(!ftbdefined(layer, this.id)) return N(1);
			let base = this.base(layer).mul(player.ft[layer].buyables[this.id]).add(1);
			return base;
		},
		cost(layer)
		{
			return N(1e30);
		},
		scal(layer)
		{
			return N(100);
		},
		transscal(layer)
		{
			let ori = [N(20), N(0), N(0), N(0), N(0), N(0)];
			return [
			[ori[0], function(){
				let base = N(2);
				return base;
			}],
			];
		},
		auto(layer)
		{
			return false;
		},
		free(layer)
		{
			return false;
		},
		unlock(layer)
		{
			return player.unlft > layer;
		},
	},
];

function ftbdefined(layer, id)
{
	if(player.unlft < layer) return false;
	if(player.ft[layer].buyables == undefined) return false;
	if(player.ft[layer].buyables[id] == undefined) return false;
	return true;
}

function openstdmodel()
{
	if(player.firstopenstdmod)
	{
		stdmodScreenFlash(100);
		player.firstopenstdmod = false;
	}
	else
	{
		PL4reset();
		player.openstdmod = !player.openstdmod;
	}
}

function dis_particleui()
{
	let ui;
	ui = ui + '<table style="width: 100%">';
	for(let i = 0;i < std_model.length;i++)
	{
		ui = ui + '<td align="center" style="width: 100%"><button class="particle" id="particle' + i + '" style="background-color: ' + std_model[i].color + '">';
		ui = ui + '<span align="center" class="ftsz3">' + std_model[i].name + '</span><br><br>';
		ui = ui + '<table style="width: 100%"><td style="width: 50%">解锁需求：' + std_model[i].unldes() + '<br>数量：<span id="particlenum' + i + '"></span>/{{notation(getpartcap())}}<br>效果：<span id="particleeff' + i + '"></span><br></td>';
		ui = ui + '<td style="width: 50%">';
		//many button
		ui = ui + '<button class="chalpara" id="collectpart' + i + '" onclick="collectpart(' + i + ')">收集(+<span id="collectnum' + i + '"></span>)</button>';
		ui = ui + '</td></table>';
		ui = ui + '</button></td><tr>';
	}
	ui = ui + '</table>';
	document.getElementById('particle').innerHTML = ui;
}

function dis_SMupgui()
{
	let ui;
	ui = ui + '<table align="center">';
	for(let i = 0;i < SMupg.length;i++)
	{
		ui = ui + '<td id="SMupg' + i + '"><button class="suppupgbt" id="SMupgbt' + i + '" onclick="if(player.SMupg == ' + (i - 1) + ') buySMupg()">{{SMupg[' + i + '].description()}}<br>成本：{{notation(SMupg[' + i + '].cost, 0)}}{{SMupg[' + i + '].costname}}</button></td>';
		if(i % 5 == 4) ui = ui + '<tr id="SMtr' + Math.floor(i / 5) + '">';
	}
	ui = ui + '</table>';
	document.getElementById('SMupg').innerHTML = ui;
}

function build_particle()
{
	for(let i = 0;i < std_model.length;i++)
	{
		if(!player.unlstdmod[i] && std_model[i].unlock()) player.unlstdmod[i] = true;
		if(player.unlstdmod[i] || std_model[i].show()) document.getElementById('particle' + i).style.display = 'block';
		else document.getElementById('particle' + i).style.display = 'none';
		if(player.unlstdmod[i]) document.getElementById('particle' + i).style.opacity = '100%';
		else document.getElementById('particle' + i).style.opacity = '50%';
		document.getElementById('particlenum' + i).innerHTML = notation(player.stdmod[i], 0);
		document.getElementById('particleeff' + i).innerHTML = std_model[i].description();
		document.getElementById('collectnum' + i).innerHTML = notation(std_model[i].canget(), 0);
	}
}

function build_SMupg()
{
	for(let i = 0;i < SMupg.length;i++)
	{
		if(player.SMupg < i - 1) document.getElementById('SMupg' + i).style.display = 'none';
		else document.getElementById('SMupg' + i).style.display = 'inline-block';
		if(i % 5 == 0 && i != 0 && player.SMupg >= i - 1) document.getElementById('SMtr' + (i / 5 - 1)).style.display = 'block';
		else if(i % 5 == 0 && i != 0) document.getElementById('SMtr' + (i / 5 - 1)).style.display = 'none';
		if(player[SMupg[i].costtype].gte(SMupg[i].cost)) document.getElementById('SMupgbt' + i).style['border-color'] = 'green';
		else document.getElementById('SMupgbt' + i).style['border-color'] = 'red';
		if(player.SMupg >= i) document.getElementById('SMupgbt' + i).style['background-color'] = 'green';
		else document.getElementById('SMupgbt' + i).style['background-color'] = 'black';
	}
}

function collectpart(i)
{
	if(player.unlstdmod[i] && player.openstdmod)
	{
		player.stdmod[i] = player.stdmod[i].add(std_model[i].canget());
		if(player.stdmod[i].gte(getpartcap())) player.stdmod[i] = getpartcap();
	}
}

function buySMupg()
{
	if(player[SMupg[player.SMupg + 1].costtype].gte(SMupg[player.SMupg + 1].cost)) player.SMupg++;
}

function getancdbuybase()
{
	let base = N(1.2);
	return base;
}

function getancd(i)
{
	let base = ancdbase[i];
	if(player.buyancd[i].gte(1)) base = base.div(getancdbuybase().pow(player.buyancd[i]));
	if(player.SMupg >= 12 && player.antier[i].gte(1)) base = base.mul(getantiercdbase().pow(player.antier[i]));
	if(player.openstdmod && player.unlstdmod[6]) base = base.div(std_model[6].effect(player.stdmod[6]));
	return base;
}

function getanbuybase()
{
	let base = N(1);
	if(player.SMupg >= 15) base = base.add(1);
	if(player.SMupg >= 22) base = base.add(player.arraydata.div(1e60).max(1).log10().min(20));
	return base;
}

function getanx(i)
{
	let base = N(1);
	if(player.buyan[i].gte(1)) base = base.add(getanbuybase().mul(player.buyan[i]));
	if(player.SMupg >= 6) base = base.mul(player.arraydata.max(10).log10().mul(2).sub(1));
	if(player.SMupg >= 8 && i == 0) base = base.mul(10);
	if(player.permupg.includes(67)) base = base.mul(player.PL4info.add(1));
	if(player.SMupg >= 10 && i == 0) base = base.mul(player.data.div('1e3300').log10().add(1).root(3));
	if(player.SMupg >= 12 && player.antier[i].gte(1)) base = base.mul(getantierbase().pow(player.antier[i]));
	if(player.SMupg >= 13 && i == 1) base = base.mul(player.data.div('1e4500').max(1).log10().add(1).root(4));
	if(player.SMupg >= 16 && i == 2) base = base.mul(player.data.div('1e6666').max(1).log10().add(1).root(5));
	if(player.astree.includes(21) && i == 0) base = base.mul(ascend_tree[21].effect());
	if(player.SMupg >= 25) base = base.mul(ftu[0].toteffect());
	return base;
}

function getarraydatatranspower()
{
	let base = N(5);
	if(player.openstdmod && player.unlstdmod[7]) base = base.mul(std_model[7].effect(player.stdmod[7]));
	return base;
}

function getarraydataeffect()
{
	let e = '';
	if(player.arraydata.gte(1)) e += '以^' + notation(getarraydatatranspower()) + '传输节点产能×' + notation(player.arraydata.max(1).pow(getarraydatatranspower()), 0) + '<br>';
	if(!player.arraydata.gte(1)) e += '达到 1 矩阵数据后解锁矩阵第一效果<br>';
	return e;
}

function getarraynodecost(i)
{
	let base = ancost[i];
	let basebuy = player.buyan[i];
	base = base.mul(ancostx[i].pow(basebuy));
	return base;
}

function getarraynodecdcost(i)
{
	let base = ancdcost[i];
	let basebuy = player.buyancd[i];
	base = base.mul(ancdcostx[i].pow(basebuy));
	return base;
}

function buyan(i)
{
	if(player.arraydata.gte(getarraynodecost(i)))
	{
		player.arraydata = player.arraydata.sub(getarraynodecost(i));
		player.buyan[i] = player.buyan[i].add(1);
	}
}

function buyancd(i)
{
	if(player.arraydata.gte(getarraynodecdcost(i)))
	{
		player.arraydata = player.arraydata.sub(getarraynodecdcost(i));
		player.buyancd[i] = player.buyancd[i].add(1);
	}
}

function getantierbase()
{
	let base = N(500);
	if(player.SMupg >= 18) base = base.add(getantiersum().mul(10));
	return base;
}

function getantiercdbase()
{
	let base = N(100);
	if(player.astree.includes(11)) base = base.mul(ascend_tree[11].effect());
	return base;
}

function buyantier(i)
{
	if(getancd(i).lt(0.1))
	{
		player.antier[i] = player.antier[i].add(1);
	}
}

function getantiersum(i)
{
	let sum = N(0);
	for(let i in player.antier) sum = sum.add(player.antier[i]);
	return sum;
}

function getpartcap()
{
	let base = N(5e9);
	return base;
}

function changeft(x)
{
	if(player.openft + x >= 0 && player.openft + x <= player.unlft)
	{
		player.openft += x;
	}
}

function getftgx(x)
{
	if(!player.SMupg >= 25) return N(0);
	if(x == 0)
	{
		let base = N(1);
		if(hasftb(0, 0)) base = base.mul(ftbuyables[0].effect(0));
		if(player.SMupg >= 25) base = base.mul(ftu[1].toteffect());
		if(player.SMupg >= 25) base = base.mul(ftu[2].toteffect());
		if(player.unlft >= 1) base = base.mul(ftu[3].toteffect());
		return base;
	}
	else
	{
		let base = N(1);
		if(hasftb(x, 0)) base = base.mul(ftbuyables[0].effect(x));
		return base;
	}
}

function getftg(x)
{
	if(!player.SMupg >= 25) return N(0);
	if(x == 0)
	{
		let base = getftgx(0);
		return base;
	}
	else
	{
		return N(0);
	}
}

function getftcrcost(layer = player.openft)
{
	let base = N(1e10).pow(N(layer + 1).pow(2));
	return base;
}

function getftcrbaselog(layer)
{
	let base = N(0.5).add(N(0.01).mul(layer));
	return base;
}

function getftcrg(layer)
{
	let bl = getftcrbaselog(layer);
	let nowenergy = N(player.ft[layer].energy);
	if(nowenergy.gte(getftcrcost(layer)))
	{
		let gen = nowenergy.add(1).iteratedlog(10, bl).div(getftcrcost(layer).add(1).iteratedlog(10, bl));
		gen = gen.mul(getftgx(layer + 1));
		if(gen.gte(1)) return gen;
		else return N(0);
	}
	else return N(0);
}

function getftustyle(layer, id)
{
	let s = '';
	if(hasftu(layer, id)) s += 'background-color: green;';
	else if(player.ft[layer].energy.gte(ftu[id].cost(layer))) s += 'background-color: #666666;';
	else s += 'background-color: black;';
	return s;
}

function getftbstyle(layer, id)
{
	let s = '';
	if(player.ft[layer].energy.gte(ftbcost(layer, id))) s += 'background-color: #666666';
	else s += 'background-color: black;';
	return s;
}

function getftbscaltitle(layer, id)
{
	if(!ftbdefined(layer, id)) return '';
	for(let i = ftbuyables[id].transscal.length - 1;i >= 0;i--)
	{
		if(player.ft[layer].buyables[id].gte(ftbuyables[id].transscal()[i][0])) return ftbtransscalname[i] + '|';
	}
	return '';
}

function getftuunlock(layer, id)
{
	return ftu[id].unlock(layer);
}

function buyftu(layer, id)
{
	if(player.unlft < layer) return;
	if(hasftu(layer, id)) return;
	if(!player.openstdmod) return;
	if(player.ft[layer].energy.gte(ftu[id].cost(layer)))
	{
		player.ft[layer].energy = player.ft[layer].energy.sub(ftu[id].cost(layer));
		player.ft[layer].upg = player.ft[layer].upg | (1 << id);
	}
}

function getftbunlock(layer, id)
{
	return ftbuyables[id].unlock(layer);
}

function ftbscaling(ori, transscal)
{
	let now = ori;
	for(let i = 0;i < transscal.length;i++)
	{
		if(ori.lt(transscal[i][0])) break;
		else
		{
			now = transscal[i][0].add(now.sub(transscal[i][0]).pow(transscal[i][1]()));
		}
	}
	return now;
}

function ftbcost(layer, id)
{
	if(!ftbdefined(layer, id)) return ftbuyables[id].cost(layer);
	let number = ftbscaling(player.ft[layer].buyables[id].add(1), ftbuyables[id].transscal(layer));
	return ftbuyables[id].cost(layer).mul(ftbuyables[id].scal(layer).pow(number));
}

function buyftb(layer, id)
{
	if(player.unlft < layer) return;
	if(!player.openstdmod) return;
	if(player.ft[layer].energy.gte(ftbcost(layer, id)))
	{
		if(!ftbuyables[id].free(layer)) player.ft[layer].energy = player.ft[layer].energy.sub(ftbcost(layer, id));
		if(!ftbdefined(layer, id)) player.ft[layer].buyables[id] = N(1);
		else player.ft[layer].buyables[id] = player.ft[layer].buyables[id].add(1);
	}
}

function autoftb(layer, id)
{
	if(player.unlft < layer) return;
	let currency = player.ft[layer].energy;
	if(currency.lt(ftbuyables[id].cost(layer))) return;
	let cnt = N(1);
	currency = currency.div(ftbuyables[id].cost(layer));
	cnt = cnt.add(currency.log(ftbuyables[id].scal(layer)));
	
	let transscal = ftbuyables[id].transscal(layer);
	for(let i = 0;i < transscal.length;i++)
	{
		if(cnt.gte(transscal[i][0]))
		{
			cnt = transscal[i][0].add(cnt.sub(transscal[i][0]).root(transscal[i][1]()));
		}
		else break;
	}
	cnt = cnt.floor();
	if(cnt.sub(1).lt(player.ft[layer].buyables[id])) return;
	
	if(!ftbuyables[id].free(layer))
	{
		let spent = N(0);
		for(let i = cnt;i.gte(player.ft[layer].buyables[id]);i = i.sub(1))
		{
			let number = ftbscaling(player.ft[layer].buyables[id] == undefined ? N(0) : player.ft[layer].buyables[id], ftbuyables[id].transscal(layer));
			let addspent = (ftbuyables[id].cost(layer).mul(ftbuyables[id].scal(layer).pow(number)));
			if(spent.div(addspent)) break;
			spent = spent.add(addspent);
		}
		player.ft[layer].energy = player.ft[layer].energy.sub(spent).max(0);
	}
	player.ft[layer].buyables[id] = cnt;
}

function hasftb(layer, id)
{
	if(player.unlft < layer) return false;
	if(!ftbdefined(layer, id)) return false;
	if(player.ft[layer].buyables[id].gte(1)) return true;
}

function hasftu(layer, id)
{
	if(player.unlft < layer) return false;
	return (player.ft[layer].upg & (1 << id)) != 0;
}

function ftcrreset(layer)
{
	if(player.unlft == layer)
	{
		ftinit(layer + 1);
	}
	let savelist = {};
	if(ftu[4].toteffect() > layer) savelist.upg = true;
	for(let i in player.ft)
	{
		if(i <= layer)
		{
			ftinit(layer, savelist);
		}
	}
}

function ftcr(layer)
{
	if(player.ft[layer].energy.gte(getftcrcost(layer)))
	{
		let g = getftcrg(layer);
		ftcrreset(layer);
		player.ft[layer + 1].energy = player.ft[layer + 1].energy.add(g);
		if(player.unlft == layer)
		{
			player.unlft = layer + 1;
			player.openft = layer + 1;
		}
	}
}