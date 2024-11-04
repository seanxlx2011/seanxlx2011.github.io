var PL1infoget = N(0), PL2infoget = N(0), PL3infoget = N(0), PL4infoget = N(0);
function updatePLinfoget()
{
	if(player.data.gte(1e80))
	{
		if(player.sliceupg[1]) PL1infoget = player.data.root(8).div(1e10);
		else if(player.PL1upg[7]) PL1infoget = player.data.root(10).div(1e8);
		else PL1infoget = player.data.root(80).sub(9);
	}
	else PL1infoget = N(0);
	
	if(!player.openstdmod)
	{
		//mul
		if(player.boost2.gte(10)) PL1infoget = PL1infoget.mul(player.boost.add(1).mul(1.5).pow(0.75));
		if(player.permupg.includes(0)) PL1infoget = PL1infoget.mul(getsliceeffect().pow(0.4));
		if(player.origin_data.gte(1e90) && !(player.openchal && player.chalpara.includes(2))) PL1infoget = PL1infoget.mul(player.origin_data.div(1e80).pow(540).min('e220000'));
		//pow
		if(player.permupg.includes(22) && player.openentropy) PL1infoget = PL1infoget.mul(player.PL1info.add(1).pow(5).min('e35000'));
		if(player.permupg.includes(23)) PL1infoget = PL1infoget.pow(1.02);
		//dil
		if(player.openchal && player.chalpara.includes(3)) PL1infoget = N(10).pow(PL1infoget.add(1).log10().pow(0.4)).max(1);
		if(player.openchal && player.chalpara.includes(5)) PL1infoget = N(10).pow(PL1infoget.add(1).log10().pow(1.3)).max(1);
		if(player.openchal && player.chalpara.includes(6)) PL1infoget = N(10).pow(PL1infoget.add(1).log10().pow(1.7)).max(1);
	}
	if(player.openstdmod)
	{
		if(player.unlstdmod[5]) PL1infoget = PL1infoget.mul(std_model[5].effect(player.stdmod[5]));
	}
	PL1infoget = PL1infoget.floor();
	
	if(player.PL1info.gte('e7000'))
	{
		if(player.permupg.includes(26)) PL2infoget = player.PL1info.root(3300).div(132.19);
		else PL2infoget = player.PL1info.root(3500).div(100);
	}
	else PL2infoget = N(0);
	
	if(!player.openstdmod)
	{
		if(player.permupg.includes(53)) PL2infoget = PL2infoget.pow(2);
	}
	PL2infoget = PL2infoget.floor();
	
	if(player.PL2info.gte('e10000'))
	{
		if(player.elements >= 4) PL3infoget = player.PL2info.log10().root(2).div(10).sub(9);
		else PL3infoget = player.PL2info.log10().root(4).div(5).sub(1);
	}
	else PL3infoget = N(0);
	if(player.exchal[7].gte(1)) PL3infoget = PL3infoget.mul(exchal[7].effect());
	
	PL3infoget = PL3infoget.floor();
	
	if(player.data.gte(N(10).pow(N(2).pow(1024))))
	{
		PL4infoget = player.data.log10().log(2).div(32).sub(31);
	}
	else PL4infoget = N(0);
	PL4infoget = (PL4infoget.sub(player.PL4info)).max(0);
	
	PL4infoget = PL4infoget.floor();
}

function getPL4infonext()
{
	return N(10).pow(N(2).pow(player.PL4info.add(32).mul(32)));
}

function buyPL1()
{
	if(player.data.gte(1e80))
	{
		if(!player.PL2tms.gte(7)) PL1reset();
		player.PL1info = player.PL1info.add(PL1infoget);
		player.PL1unlock = true;
	}
}

function buyPL2()
{
	if(player.PL1info.gte('e7000'))
	{
		PL2reset();
		let gettms = N(1);
		if(player.permupg.includes(30)) gettms = gettms.mul(5);
		player.PL2info = player.PL2info.add(PL2infoget);
		player.PL2unlock = true;
		player.PL2tms = player.PL2tms.add(gettms);
		
		if(player.PL2tms.gte(2)) player.PL1upg = [true, true, true, true, true, true, true, true];
		if(player.PL2tms.gte(4)) player.sliceupg = [true, true, true, true], player.unlock_origin = true;
	}
}

function buyPL3()
{
	if(player.PL2info.gte('e10000'))
	{
		PL3reset();
		player.PL3info = player.PL3info.add(PL3infoget);
		player.PL3infottl = player.PL3infottl.add(PL3infoget);
		player.PL3unlock = true;
		player.PL3tms = player.PL3tms.add(1);
		
		if(player.permupg.includes(32))
		{
			player.PL2tms = N(35);
			player.PL1upg = [true, true, true, true, true, true, true, true];
			player.sliceupg = [true, true, true, true], player.unlock_origin = true;
		}
		if(player.permupg.includes(41))
		{
			player.PL2upg = [true, true, true, true];
		}
	}
}

function buyPL4()
{
	updatePLinfoget();
	if(!PL4infoget.gte(1)) return;
	if(player.data.gte(N(10).pow(N(2).pow(1024))))
	{
		PL4reset();
		player.PL4info = player.PL4info.add(PL4infoget);
		player.PL4unlock = true;
		player.PL4tms = player.PL4tms.add(1);
	}
}

function buyboost()
{
	if(getexchalopen().includes(1)) return;
	let cost = getboostcost();
	if(player.data.gte(cost))
	{
		if(!player.PL1upg[4]) boostreset();
		player.boost = player.boost.add(N(1));
	}
}

function buymaxboost()
{
	if(getexchalopen().includes(1)) return;
	if(!player.PL1upg[4]) return;
	let zs1x = getboostzs1x();
	let ans = N(0);
	if(!player.data.gte(1e10))
	{
		ans = player.data.log(10).floor().add(1);
	}
	else
	{
		ans = ((player.data.div(1e10)).log10().log(zs1x)).floor().add(11);
		if(ans.gte(20000)) ans = N(20000).add(ans.sub(20000).root(getboostzs2x())).floor().add(1);
	}
	
	if(ans.gte(player.boost))
	{
		player.boost = ans;
	}
}

function buyboost2()
{
	if(getexchalopen().includes(1)) return;
	let cost = getboost2cost();
	if(player.boost.gte(cost))
	{
		if(!player.sliceupg[0]) boost2reset();
		player.boost2 = player.boost2.add(N(1));
	}
}

function buymaxboost2()
{
	if(getexchalopen().includes(1)) return;
	let cost_sub = N(0);
	if(player.PL1upg[7]) cost_sub = cost_sub.add(player.sliceupg_rep[2]);
	if(player.boost3.gte(2)) cost_sub = cost_sub.add(player.boost3.add(1).mul(2).pow(1.25));
	if(player.permupg.includes(16)) cost_sub = cost_sub.add(player.godstar.add(1).log10().min(10000));
	let ans = player.boost.add(cost_sub).sub(16).div(4).floor().add(1);
	if(ans.gte(player.boost2))
	{
		player.boost2 = ans;
	}
}

function buyboost3()
{
	if(getexchalopen().includes(1)) return;
	let cost = getboost3cost();
	if(player.boost2.gte(cost))
	{
		if(!player.PL2upg[0]) boost3reset();
		player.boost3 = player.boost3.add(N(1));
	}
}

function buymaxboost3()
{
	if(getexchalopen().includes(1)) return;
	let ans = player.boost2.sqrt().sub(7).floor();
	if(ans.gte(player.boost3))
	{
		player.boost3 = ans;
	}
}

function chautoboost()
{
	if(player.PL1upg[4]) player.autoboost = !player.autoboost;
}

function chautoboost2()
{
	if(player.sliceupg[0]) player.autoboost2 = !player.autoboost2;
}

function chautoboost3()
{
	if(player.PL2upg[1]) player.autoboost3 = !player.autoboost3;
}

function getboostzs1x()
{
	let base = N(1);
	if(player.boost.gte(16)) base = base.mul(0.5);
	if(player.boost2.gte(5)) base = base.mul(0.5);
	if(player.boost2.gte(11)) base = base.mul(0.9);
	if(player.boost2.gte(90)) base = base.mul(!player.boost2.gte(370) ? N(1).div(player.boost2.add(2).root(11)) : N(1).div(player.boost2.add(1).mul(2).root(10)));
	if(player.boost3.gte(1)) base = base.mul(0.7);
	if(player.PL1upg[3]) base = base.mul(0.5);
	if(player.PL2tms.gte(10)) base = base.mul(0.75);
	if(player.entropy[0].gte(1.75)) base = base.mul(N(1).div(player.entropy[0].root(2)));
	if(player.permupg.includes(3)) base = base.mul(0.75);
	base = base.add(1);
	return base;
}

function getboostzs2x()
{
	let base = N(2);
	if(player.exchal[11].gte(1)) base = base.mul(exchal[11].effect());
	base = base.add(1);
	return base;
}

function getboostcost()
{
	let base = N(10).pow(player.boost);
	if(player.boost.gte(10))
	{
		let zsx = getboostzs1x();
		base = N(10).pow(10).mul(N(10).pow(N(zsx).pow(player.boost.sub(10))));
	}
	if(player.boost.gte(20000))
	{
		let zsx1 = getboostzs1x();
		let zsx2 = getboostzs2x();
		base = N(10).pow(10).mul(N(10).pow(N(zsx1).pow(N(20000).add(player.boost.sub(20000).pow(zsx2)).sub(10))));
	}
	return base;
}

function getboost2cost()
{
	let base = player.boost2.mul(4).add(16);
	if(player.PL1upg[7]) base = base.sub(player.sliceupg_rep[2]);
	if(player.boost3.gte(2)) base = base.sub(player.boost3.add(1).mul(2).pow(1.25));
	if(player.permupg.includes(16)) base = base.sub(player.godstar.add(1).log10().min(10000));
	return base;
}

function getboost3cost()
{
	let base = player.boost3.add(8).pow(2);
	return base;
}

var boosteffectlist = [N(1), N(2), N(3), N(4), N(5), N(11), N(12), N(13)
, N(14), N(15), N(16), N(20), N(21), N(52), N(55), N(65)
, N(67), N(95), N(120), N(315), N(888)];
var boosteffectnum = 21;

function getboosteffect(b)
{
	if(!b.gte(1))
	{
		return '在1跃迁，解锁1号传输节点。';
	}
	else if(!b.gte(2))
	{
		return '在2跃迁，解锁2号传输节点。';
	}
	else if(!b.gte(3))
	{
		return '在3跃迁，节点产能增加等同于跃迁数量的倍数。';
	}
	else if(!b.gte(4))
	{
		return '在4跃迁，解锁3号传输节点。';
	}
	else if(!b.gte(5))
	{
		return '在5跃迁，解锁4号传输节点。';
	}
	else if(!b.gte(11))
	{
		return '在11跃迁，解锁5号传输节点。';
	}
	else if(!b.gte(12))
	{
		return '在12跃迁，解锁6号传输节点。';
	}
	else if(!b.gte(13))
	{
		return '在13跃迁，解锁7号传输节点。';
	}
	else if(!b.gte(14))
	{
		return '在14跃迁，解锁8号传输节点。';
	}
	else if(!b.gte(15))
	{
		return '在15跃迁，传输节点的一阶软上限弱化25%。';
	}
	else if(!b.gte(16))
	{
		return '在16跃迁，使跃迁超级折算弱化50%。';
	}
	else if(!b.gte(20))
	{
		return '在20跃迁，传输节点的一阶软上限弱化60%。';
	}
	else if(!b.gte(21))
	{
		return '在21跃迁，跃迁弱化传输节点的二阶软上限，当前：×' + notation(N(1).div(player.boost.add(1).root(15)));
	}
	else if(!b.gte(52))
	{
		return '在52跃迁，3跃迁的效果改为增加等同于跃迁数量的平方的倍数';
	}
	else if(!b.gte(55))
	{
		return '在55跃迁，节点三阶软上限延迟1.5次方出现。';
	}
	else if(!b.gte(65))
	{
		return '在65跃迁，跃迁提高传输节点的指数。当前：+' + notation(player.boost.root(10).div(15));
	}
	else if(!b.gte(67))
	{
		return '在67跃迁，世界信息增幅位面切片获取量。当前：×' + notation(player.PL1info.add(10).log(2).root(1.5));
	}
	else if(!b.gte(95))
	{
		return '在95跃迁，位面切片增幅指数增加0.2。';
	}
	else if(!b.gte(120))
	{
		return '在120跃迁，本源数据产能×5。';
	}
	else if(!b.gte(315))
	{
		return '在315跃迁，节点四阶软上限延迟1.25次方出现。';
	}
	else if(!b.gte(888))
	{
		return '在888跃迁，位面切片增幅指数×1.125';
	}
	else return '';
}

var boost2effectlist = [N(1), N(2), N(3), N(5), N(10), N(11), N(12), N(25)
, N(34), N(48), N(90), N(119), N(250), N(370), N(470)];
var boost2effectnum = 15;

function getboost2effect(b)
{
	if(!b.gte(1))
	{
		return '在1二重跃迁，节点产能增加3倍。';
	}
	else if(!b.gte(2))
	{
		return '在2二重跃迁，跃迁弱化传输节点的一阶软上限。当前：×' + notation(N(1).div(player.boost.add(1).root(5)));
	}
	else if(!b.gte(3))
	{
		return '在3二重跃迁，二重跃迁增幅节点产能。当前：×' + notation(player.boost2.add(1).mul(1.25).pow(3.5));
	}
	else if(!b.gte(5))
	{
		return '在5二重跃迁，使跃迁超级折算弱化50%。';
	}
	else if(!b.gte(10))
	{
		return '在10二重跃迁，跃迁数量加成世界信息获取量。当前：×' + notation(player.boost.add(1).mul(1.5).pow(0.75));
	}
	else if(!b.gte(11))
	{
		return '在11二重跃迁，使跃迁超级折算弱化10%。';
	}
	else if(!b.gte(12))
	{
		return '在12二重跃迁，世界信息增幅节点产能。当前：×' + notation(player.PL1info.add(1).mul(0.5).pow(0.25).min('e100000'));
	}
	else if(!b.gte(25))
	{
		return '在25二重跃迁，位面切片产能×5000。';
	}
	else if(!b.gte(34))
	{
		return '在34二重跃迁，位面切片数量增幅本源数据获取。当前：×' + notation(N(1).add(player.slice.log(2).div(30)));
	}
	else if(!b.gte(48))
	{
		return '在48二重跃迁，二重跃迁弱化节点一至三阶软上限。当前：×' + notation(N(1).div(player.boost2.root(10)));
	}
	else if(!b.gte(90))
	{
		return '在90二重跃迁，二重跃迁弱化跃迁超级折算。当前：×' + notation(!player.boost2.gte(370) ? N(1).div(player.boost2.add(2).root(11)) : N(1).div(player.boost2.add(1).mul(2).root(10)));
	}
	else if(!b.gte(119))
	{
		return '在119二重跃迁，节点二至四阶软上限弱化70%。';
	}
	else if(!b.gte(250))
	{
		return '在250二重跃迁，节点四阶软上限延迟2次方出现。';
	}
	else if(!b.gte(370))
	{
		return '在370二重跃迁，90二重跃迁的效果公式变得更好。';
	}
	else if(!b.gte(470))
	{
		return '在470二重跃迁，节点四阶软上限弱化30%。';
	}
	else return '';
}

var boost3effectlist = [N(1), N(2), N(3), N(4), N(8), N(9), N(12), N(13)
, N(52), N(80)];
var boost3effectnum = 10;

function getboost3effect(b)
{
	if(!b.gte(1))
	{
		return '在1三重跃迁，跃迁超级折算弱化30%。';
	}
	else if(!b.gte(2))
	{
		return '在2三重跃迁，三重跃迁减少二重跃迁成本。当前：-' + notation(player.boost3.add(1).mul(2).pow(1.25));
	}
	else if(!b.gte(3))
	{
		return '在3三重跃迁，移除节点一阶软上限。';
	}
	else if(!b.gte(4))
	{
		return '在4三重跃迁，宇宙信息以指数增幅节点产能。当前：^' + notation(player.PL2info.add(1).log10().div(40).add(1).min(1.3));
	}
	else if(!b.gte(8))
	{
		return '在8三重跃迁，跃迁倍增节点产能。当前：×' + notation(N(2).pow(player.boost.pow(1.35)).min('e5000'));
	}
	else if(!b.gte(9))
	{
		return '在9三重跃迁，宇宙信息倍增节点产能。当前：×' + notation(player.PL2info.add(1).pow(45));
	}
	else if(!b.gte(12))
	{
		return '在12三重跃迁，移除节点二阶软上限。';
	}
	else if(!b.gte(13))
	{
		return '在13三重跃迁，移除节点三阶软上限。';
	}
	else if(!b.gte(52))
	{
		return '在52三重跃迁，跃迁以指数增幅节点产能。当前：^' + notation(player.boost.add(1).log10().div(3).add(1).root(2));
	}
	else if(!b.gte(80))
	{
		return '在80三重跃迁，移除节点四阶软上限。';
	}
	else return '';
}

function boostreset()
{
	player.data = N(10);
	for(let i = 0;i < 8;i++)
	{
		player.buyjd[i] = N(0);
		player.jdnum[i] = N(0);
	}
}

function boost2reset()
{
	boostreset();
	player.boost = N(0);
}

function boost3reset()
{
	boost2reset();
	player.boost2 = N(0);
}

function PL1reset()
{
	boost2reset();
	player.boost2 = N(0);
}

function PL2reset()
{
	PL1reset();
	player.PL1info = N(0);
	player.PL1upg = [true, false, false, false, true, false, false, true];
	player.slice = N(0);
	player.sliceupg = [true, false, false, true];
	player.sliceupg_rep = [N(0), N(0), N(0), N(0)];
	player.unlock_origin = false;
	player.origin_data = N(0);
	player.origin_upg = [N(0), N(0), N(0), N(0), N(0)];
	player.boost3 = N(0);
}

function PL3reset()
{
	PL2reset();
	player.PL2info = N(0);
	player.PL2tms = N(0);
	player.PL1upg = [false, false, false, false, false, false, false, false];
	player.sliceupg = [false, false, false, true];
	player.PL2upg = [false, false, false, true];
	player.star = N(0);
	player.star_node = [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)];
	player.buysn = [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)];
	player.dimension = N(0);
	player.entropy = [N(0), N(0), N(0), N(0)];
	player.godstar = N(0);
	player.godnode = [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)];
	player.buygn = [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)];
	let keep = [N(19), N(29)];
	if(player.permupg.includes(31)) {keep.push(10);keep.push(13);keep.push(14);keep.push(18);keep.push(21);keep.push(23);keep.push(24);keep.push(27);keep.push(29);}
	for(let i = 0;i < 30;i++) if(!keep.includes(i)) player.permupg = player.permupg.filter(item => item !== i);
	player.algor = N(0);
	player.algordata = N(0);
	player.algorrebuy = [N(0), N(0)];
	player.hidenode = false;
}

function PL4reset()
{
	PL3reset();
	player.PL1upg = [true, true, true, true, true, true, true, true];
	player.sliceupg = [true, true, true, true];
	player.PL2upg = [true, true, true, true];
	player.unlockgn = [true, true, true, true, true, true, true, true];
	player.PL3info = N(0);
	player.PL3tms = N(15);
	player.PL2tms = N(35);
	player.chaosmass = N(0);
	player.blackhole = N(0);
	if(!hasvoidupg(8)) player.suppdata = N(0);
	player.colldata = N(0);
	player.opensupp = false;
	player.unlock_origin = true;
	if(!hasvoidupg(2)) for(let i = 1;i <= 8;i++) player.exchal[i] = N(1);
}