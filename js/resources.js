const res = {
	'data': {
		init()
		{
			let base = N(0);
			if(formula.haswc(0)) base = N(10);
			return base;
		},
		produce(diff) {res.add('data', res.val('dn1').mul(formula.dnbm(1)).mul(diff));},
	},
	'boost': {
		init()
		{
			let base = N(0);
			if(formula.haswc(2)) base = N(16);
			return base;
		},
	},
	'boostdata': {
		init(){return N(0);},
		produce(diff) {res.add('boostdata', formula.bdg().mul(diff));},
	},
	'bdeb': {
		init(){return N(0);},
	},
	'dn1': {
		init(){return N(0);},
		produce(diff) {res.add('dn1', res.val('dn2').mul(formula.dnbm(2)).mul(diff));},
	},
	'dn1b': {
		init(){return N(0);},
	},
	'dn2': {
		init(){return N(0);},
		produce(diff) {res.add('dn2', res.val('dn3').mul(formula.dnbm(3)).mul(diff));},
	},
	'dn2b': {
		init(){return N(0);},
	},
	'dn3': {
		init(){return N(0);},
		produce(diff) {res.add('dn3', res.val('dn4').mul(formula.dnbm(4)).mul(diff));},
	},
	'dn3b': {
		init(){return N(0);},
	},
	'dn4': {
		init(){return N(0);},
		produce(diff) {res.add('dn4', res.val('dn5').mul(formula.dnbm(5)).mul(diff));},
	},
	'dn4b': {
		init(){return N(0);},
	},
	'dn5': {
		init(){return N(0);},
		produce(diff) {res.add('dn5', res.val('dn6').mul(formula.dnbm(6)).mul(diff));},
	},
	'dn5b': {
		init(){return N(0);},
	},
	'dn6': {
		init(){return N(0);},
		produce(diff) {res.add('dn6', res.val('dn7').mul(formula.dnbm(7)).mul(diff));},
	},
	'dn6b': {
		init(){return N(0);},
	},
	'dn7': {
		init(){return N(0);},
		produce(diff) {res.add('dn7', res.val('dn8').mul(formula.dnbm(8)).mul(diff));},
	},
	'dn7b': {
		init(){return N(0);},
	},
	'dn8': {
		init(){return N(0);},
	},
	'dn8b': {
		init(){return N(0);},
	},
	'autodn': {
		init(){return N(0);},
	},
	'PL1info': {
		init(){return N(0);},
	},
	'slice': {
		init(){return N(0);},
		produce(diff){res.add('slice', formula.sliceg().mul(diff)); res.set('slice', res.val('slice').min(formula.slicecap().root(formula.slicep())))},
	},
	'slicereal': {
		init(){return N(0);},
		produce(diff){res.set('slicereal', res.val('slice').pow(formula.slicep()));},
	},
	'insc': {
		init(){return N(0);},
		produce(diff){if(player.tag.unlomginsc) res.add('insc', formula.inscg().mul(diff));},
	},
	'insc_alpha': {
		init(){return N(0);},
	},
	'insc_beta': {
		init(){return N(0);},
	},
	'insc_gamma': {
		init(){return N(0);},
	},
	'insc_omega': {
		init(){return N(0);},
	},
	'insc_psi': {
		init(){return N(0);},
		produce(diff){res.add('insc_psi', formula.inscpsig().mul(diff));},
	},
	'plane': {
		init(){return N(0);},
	},
	
	resets: {
		boost()
		{
			res.init('data');
			for(let i = 1;i <= 8;i++)
			{
				if(player.resource['dn' + i] != undefined) res.init('dn' + i);
				if(player.resource['dn' + i + 'b'] != undefined) res.init('dn' + i + 'b');
			}
		},
		world()
		{
			res.init('boost');
			res.init('boostdata');
			res.init('bdeb');
			res.resets.boost();
		},
	},
	
	init(id)
	{
		player.resource[id] = res[id].init();
	},
	val(id)
	{
		if(player.resource[id] == undefined) res.init(id);
		return player.resource[id];
	},
	capped(id)
	{
		if(res[id].cap == undefined) return false;
		else if(res[id].cap() == false) return false;
		else return res.val(id).gte(res[id].cap());
	},
	set(id, val)
	{
		if(player.resource[id] == undefined) res.init(id);
		player.resource[id] = val;
		if(res.capped(id)) player.resource[id] = res[id].cap();
	},
	add(id, val)
	{
		if(player.resource[id] == undefined) res.init(id);
		player.resource[id] = player.resource[id].add(val);
		if(res.capped(id)) player.resource[id] = res[id].cap();
	},
	mul(id, val)
	{
		if(player.resource[id] == undefined) res.init(id);
		player.resource[id] = player.resource[id].mul(val);
		if(res.capped(id)) player.resource[id] = res[id].cap();
	},
	func(id, val, func)
	{
		if(player.resource[id] == undefined) res.init(id);
		player.resource[id] = func(player.resource[id], val);
		if(res.capped(id)) player.resource[id] = res[id].cap();
	}
};

const formula = {
	resetg(layer, dec = false)
	{
		let ans = N(0);
		if(layer == 1 && res.val('data').gte(N(2).pow(1024)))
		{
			ans = res.val('data').root(1024).sub(1);
			if(ans.gte(10)) ans = ans.sub(10).pow(4);
		}
		if(dec) return ans;
		else return ans.floor();
	},
	autocd(type)
	{
		if(type == 'autodn')
		{
			let base = N(1000).sub(res.val('autodn').mul(100));
			if(player.tag.inwc == 1) base = base.mul(10);
			return base;
		}
		else if(type == 'autoboost')
		{
			let base = N(1500);
			return base;
		}
		else if(type == 'autobdeb')
		{
			let base = N(2000);
			return base;
		}
	},
	dnbe()
	{
		let base = N(2);
		if(res.val('boost').gte(5)) base = base.add(0.5);
		if(formula.haswu(0)) base = base.add(0.1);
		if(formula.haswc(7)) base = base.add(0.2);
		if(formula.hassliceb(1)) base = base.add(formula.slicebe(1));
		if(player.tag['unlinsc']) base = base.add(formula.insce(3));
		
		if(player.tag.inwc == 0) base = base.pow(0.5);
		if(player.tag.inwc == 7) base = base.pow(0.1);
		return base;
	},
	dnbc(x)
	{
		let basec = [null, N(1), N(100), N(10000), N(1e10), N(1e18), N(1e40), N(1e100), N(1e210)];
		let multc = [null, N(10), N(100), N(1e3), N(1e6), N(1e9), N(1e14), N(1e20), N(1e30)];
		let cost = basec[x].mul(multc[x].pow(res.val('dn' + x + 'b')));
		return cost;
	},
	dnbet(x)
	{
		let base = formula.dnbe().pow(res.val('dn' + x + 'b'));
		if(base.gte(formula.dnbscs())) base = N(2).pow(N(127).add(base.max(1).log2().sub(127).pow(0.75)));
		return base;
	},
	dnbm(x)
	{
		let base = N(1);
		base = base.mul(formula.dnbet(x));
		if(res.val('boost').gte(3) && x == 1) base = base.mul(formula.booste(2));
		if(res.val('boost').gte(12) && x <= 4) base = base.mul(formula.booste(6));
		if(res.val('boost').gte(14)) base = base.mul(formula.bde());
		if(formula.haswu(3)) base = base.mul(formula.wue(3));
		if(formula.haswu(4)) base = base.mul(formula.wue(4));
		if(formula.haswu(5)) base = base.mul(formula.wue(5));
		if(formula.haswc(5) && x != 8) base = base.mul(res.val('dn' + (x + 1)).max(10).log10());
		if(formula.haswu(8)) base = base.mul(formula.slicee());;
		if(player.tag['unlinsc']) base = base.mul(formula.insce(2));
		if(player.tag.inwc == 1) base = base.pow(0.9);
		if(player.tag.inwc == 5 && x == 7) base = N(0);
		if(player.tag.inwc == 8 && x != player.tag.lbdb) base = N(0);
		return base;
	},
	dnbscs()
	{
		let base = N(2).pow(128);
		if(formula.hassliceb(3)) base = base.pow(formula.slicebe(3));
		return base;
	},
	boostc()
	{
		let basec = N(1e3);
		let multc = N(1e4);
		let num = res.val('boost');
		if(num.gte(10)) num = N(9).add(num.sub(9).pow(formula.boostsc(0)));
		let cost = basec.mul(multc.pow(num));
		return cost;
	},
	boostsc(id)
	{
		let base = N(0);
		if(id == 0)
		{
			base = N(2);
			if(formula.haswu(1)) base = base.pow(0.9);
			if(player.tag.inwc == 2) base = base.pow(1.5);
		}
		return base;
	},
	booste(id)
	{
		if(id == 2)
		{
			if(player.tag.inwc == 4) return N(1);
			let base = N(3).pow(res.val('boost').sub(2));
			return base;
		}
		else if(id == 6)
		{
			if(player.tag.inwc == 4) return N(1);
			let base = N(2).pow(res.val('boost').sub(11).pow(1.5)).min(N(2).pow(N(53)).mul(N(2).pow(res.val('boost').sub(11))));
			return base;
		}
	},
	bdg()
	{
		if(res.val('boost').lt(14)) return N(0);
		let base = res.val('data').add(1).root(50).div(10).max(0);
		let exp = res.val('boost').sub(13).log(4).add(1);
		base = base.pow(exp);
		if(formula.haswu(2)) base = base.mul(2);
		if(player.tag.inwc == 3) base = base.pow(0.25);
		return base;
	},
	bde()
	{
		let exp = N(0.5);
		let base = res.val('boostdata').max(10).div(10).pow(exp);
		if(res.val('bdeb').gte(1)) base = base.pow(res.val('bdeb').mul(formula.bdebe()).add(1));
		if(formula.haswc(6)) base = base.pow(1.1);
		
		if(player.tag.inwc == 6) base = base.pow(0.1);
		if(base.gte(N(2).pow(128))) base = N(2).pow(N(127).add(base.max(1).log2().sub(127).pow(0.5)));
		
		if(formula.hassliceb(2)) base = base.pow(formula.slicebe(2));
		return base;
	},
	bdebe()
	{
		let base = N(0.2);
		return base;
	},
	bdebc()
	{
		let base = N(75);
		let basex = N(1.5);
		return N(10).pow(base.mul(basex.pow(res.val('bdeb'))));
	},
	haswu(id)
	{
		if(player.tag.wu == undefined) player.tag.wu = 0;
		return (player.tag.wu & (1 << id)) != 0;
	},
	wuc(id)
	{
		let list = [N(1), N(1), N(1), N(2), N(4), N(10), N(1), N(5), N(50)];
		return list[id];
	},
	wud(id)
	{
		let list = ['节点升级效果+0.1', '跃迁超级折算<br>弱化10%', '跃迁数据获取×2',
		'基于数据，<br>节点×' + notation(formula.wue(3), 1), '基于世界信息，<br>节点×' + notation(formula.wue(4), 1), '基于跃迁，<br>节点×' + notation(formula.wue(5), 1),
		'解锁自动化', '解锁挑战', '解锁位面切片'];
		return list[id];
	},
	wue(id)
	{
		let base;
		if(id == 3)
		{
			base = res.val('data').add(10).log10();
			if(player.tag.inwc == 7) base = base.pow(2);
			
			base = base.min(N(2).pow(1024));
		}
		else if(id == 4)
		{
			base = res.val('PL1info').mul(100).add(1).root(2);
			if(formula.haswc(4) && res.val('PL1info').gte(1)) base = base.add(res.val('PL1info').mul(10).div(res.val('PL1info').add(Math.E).ln()));
			if(player.tag.inwc == 7) base = base.pow(1.5);
			if(formula.haswc(4) && player.tag.inwc == 7) base = base.pow(1.5);
			
			base = base.min(N(2).pow(1024));
		}
		else if(id == 5)
		{
			base = res.val('boost').pow(2).max(1);
			if(formula.haswc(3)) base = base.add(N(1.4).pow(res.val('boost').max(0)));
			if(player.tag.inwc == 7) base = base.pow(1.75);
			
			base = base.min(N(2).pow(1024));
		}
		return base;
	},
	wcd(id)
	{
		let list = ['节点升级效果^0.5', '自动节点延迟×10，节点产能^0.9', '跃迁超级折算强化50%',
		'跃迁数据获取^0.25', '3跃迁及12跃迁的增幅效果失效', '7号传输节点失效',
		'跃迁数据效果^0.1', '增强第二行世界升级，但节点升级效果^0.1', '只有最后一次手动购买的节点能生效'];
		return list[id];
	},
	wcg(id)
	{
		if(id == 0) return N(1e60);
		else if(id == 1) return N(2).pow(1024);
		else if(id == 2) return N(2).pow(1024);
		else if(id == 3) return N('1e314');
		else if(id == 4) return N('1e700');
		else if(id == 5) return N('1e640');
		else if(id == 6) return N('1e320');
		else if(id == 7) return N(1e150);
		else if(id == 8) return N('1e15000');
		else return N('e9e15');
	},
	wcrd(id)
	{
		if(id == 0) return '每次重置后开始于10数据';
		else if(id == 1) return '解锁一个自动化购买项';
		else if(id == 2) return '世界重置后开始于16跃迁，解锁自动跃迁';
		else if(id == 3) return '世界升级6的效果获得增强';
		else if(id == 4) return '世界升级5的效果获得增强';
		else if(id == 5) return 'log10(高一级节点)增幅低一级节点';
		else if(id == 6) return '跃迁数据效果^1.1';
		else if(id == 7) return '节点升级效果+0.2';
		else if(id == 8) return '解锁宇宙重置';
		else return '敬请期待';
	},
	wcr(id)
	{
		if(id == 0) return N(0);
		else return N(0);
	},
	haswc(id)
	{
		if(player.tag.wc == undefined) player.tag.wc = 0;
		return (player.tag.wc & (1 << id)) != 0;
	},
	compwc()
	{
		if(player.tag.inwc == undefined) player.tag.inwc = -1;
		if(player.tag.wc == undefined) player.tag.wc = 0;
		if(player.tag.inwc >= 0)
		{
			if(res.val('data').gte(formula.wcg(player.tag.inwc)))
			{
				player.tag.wc = player.tag.wc | (1 << player.tag.inwc);
				res.resets.world();
				player.tag.inwc = -1;
			}
		}
	},
	sliceg()
	{
		if(!formula.haswu(8)) return N(0);
		if(res.val('data').lt('1e900')) return N(0);
		let base = res.val('data').root(900).sub(9).mul(10).mul(res.val('PL1info').mul(10).add(1).root(5));
		if(formula.hassliceb(0)) base = base.mul(formula.slicebe(0));
		if(player.tag['unlinsc']) base = base.mul(formula.insce(1));
		if(res.val('plane').gte(1)) base = base.div(formula.planee(0));
		return base;
	},
	slicegps()
	{
		return (res.val('slice').add(formula.sliceg()).pow(formula.slicep())).sub(res.val('slicereal'));
	},
	slicep()
	{
		let base = N(0.25);
		return base;
	},
	slicee()
	{
		let exp = N(7);
		exp = exp.add(formula.slicebe(4));
		exp = exp.add(formula.planee(2));
		let base = N(1.5);
		base = res.val('slicereal').add(1).pow(exp);
		return base;
	},
	hassliceb(id)
	{
		if(player.tag.sliceb == undefined) player.tag.sliceb = [N(0), N(0), N(0), N(0), N(0), N(0)];
		return player.tag.sliceb[id].gte(N(1));
	},
	slicebl(id)
	{
		if(!formula.hassliceb(id)) return N(0);
		else return player.tag.sliceb[id];
	},
	slicebc(id)
	{
		let bs = [N(5), N(12.5), N(17.5), N(10000), N(1e16), N(1e20)];
		let basex = [N(1.5), N(2), N(4), N(7.5), N(1e64), N(1e80)];
		let base = bs[id].mul(basex[id].pow(formula.slicebl(id)));
		if(res.val('plane').gte(1)) base = base.div(formula.planee(1));
		return base;
	},
	slicebd(id)
	{
		let disp = ['增加切片产量。<br>当前：×' + notation(formula.slicebe(0), 1)
		, '增加节点升级效果。<br>当前：+' + notation(formula.slicebe(1), 1)
		, '增幅跃迁数据效果<br>(软上限后)。<br>当前：^' + notation(formula.slicebe(2), 2)
		, '延迟节点升级软上限。<br>当前：^' + notation(formula.slicebe(3), 2)
		, '增加切片效果指数。<br>当前：+' + notation(formula.slicebe(4), 0)
		, '基于位面减少<br>位面效果惩罚。<br>当前：^' + notation(formula.slicebe(5), 2)];
		return disp[id];
	},
	slicebe(id)
	{
		let h = formula.hassliceb(id);
		let base = N(0);
		if(id == 0)
		{
			base = player.tag.sliceb[0].mul(4).add(1).mul(N(1.1).pow(player.tag.sliceb[0]));
		}
		else if(id == 1)
		{
			base = player.tag.sliceb[1].mul(0.5);
		}
		else if(id == 2)
		{
			base = N(1.025).pow(player.tag.sliceb[2].mul(4).pow(2).add(1).log(2));
		}
		else if(id == 3)
		{
			base = N(1).add(player.tag.sliceb[3].mul(10).pow(2.5).add(1).log10()).add(N(1.075).pow(player.tag.sliceb[3].pow(2).add(1).log(2)).sub(1));
		}
		else if(id == 4)
		{
			base = N(8).mul(player.tag.sliceb[4]);
		}
		else if(id == 5)
		{
			base = N(1).div(player.tag.sliceb[5].mul(0.05).mul(N(1).add(res.val('plane').mul(0.5))).add(1));
		}
		return base;
	},
	maxdnl(id)
	{
		let base = N(1100).sub(N(100).mul(id));
		return base;
	},
	insc_rate(id)
	{
		if(id == 1)
		{
			let base = N(0.05);
			return base;
		}
		else if(id == 2)
		{
			let base = N(0.001);
			return base;
		}
		else if(id == 3)
		{
			let base = N(0.00005);
			return base;
		}
	},
	inscg(id)
	{
		let base = N(1).add(res.val('PL1info').div(100).root(2));
		if(player.tag.unlomginsc) base = base.pow(formula.inscpsie());
		return base;
	},
	insce(id)
	{
		if(id == 1)
		{
			let base = res.val('insc_alpha').mul(5).add(1).root(1.1);
			if(base.gte(1e20)) base = base.div(1e20).pow(0.5).mul(1e20);
			return base;
		}
		else if(id == 2)
		{
			let base = res.val('insc_beta').mul(15).add(1).pow(3);
			return base;
		}
		else if(id == 3)
		{
			let base = res.val('insc_gamma').add(1).log(5);
			return base;
		}
	},
	inscomgg()
	{
		let base = res.val('insc_alpha').mul(res.val('insc_beta')).mul(res.val('insc_gamma')).div(1e3).root(10);
		return base;
	},
	inscpsig()
	{
		let base = N(10).pow(res.val('insc_omega').max(1).log10().pow(1.5)).mul(5).sub(4);
		return base;
	},
	inscpsie()
	{
		let base = res.val('insc_psi').add(100).log(100);
		if(base.gte(2)) base = base.sub(1).pow(0.75).add(1);
		if(base.gte(10)) base = base.sub(9).log10().add(10);
		return base;
	},
	slicecap()
	{
		let base = N(2).pow(53);
		return base;
	},
	planec()
	{
		let base = N(1e30);
		let exp = N(10);
		let exp2 = N(1.25);
		base = base.mul(exp.pow(exp2.mul(res.val('plane'))));
		return base;
	},
	planee(id, next = false)
	{
		let pl = res.val('plane');
		if(next) pl = pl.add(1);
		if(id == 0)
		{
			let base = N(2).pow(200).pow(pl);
			base = base.pow(formula.slicebe(5));
			if(base.gte('1.798e308')) base = N(2).pow(N(1023).add(base.log(2).sub(1023).pow(0.8)));
			return base;
		}
		else if(id == 1)
		{
			let base = N(2).pow(25).pow(pl);
			return base;
		}
		else if(id == 2)
		{
			let base = N(5).mul(pl).sub(5).max(0);
			return base;
		}
	},
}