function init()
{
	player =
	{
		//start
		data: N(10),
		buyjd: [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)],
		jdnum: [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)],
		boost: N(0),
		boost2: N(0),
		
		//world
		PL1info: N(0),
		PL1unlock: false,
		PL1upg: [false, false, false, false, false, false, false, false],
		autobuyjd: [false, false, false, false, false, false, false, false],
		autoboost: false,
		autoboost2: false,
		slice: N(0),
		sliceupg_rep: [N(0), N(0), N(0), N(0)],
		sliceupg: [false, false, false, false],
		unlock_origin: false,
		origin_data: N(0),
		origin_upg: [N(0), N(0), N(0), N(0), N(0)],
		
		//universe
		PL2info: N(0),
		PL2unlock: false,
		PL2tms: N(0),
		buysn: [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)],
		star_node: [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)],
		star: N(0),
		dimension: N(0),
		boost3: N(0),
		autoboost3: false,
		entropy: [N(0), N(0), N(0), N(0)],
		openentropy: false,
		PL2upg: [false, false, false, false],
		godstar: N(0),
		godnode: [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)],
		buygn: [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)],
		gnunlock: [false, false, false, false, false, false, false, false],
		permupg: [],
		chalcomp: N(0),
		chalcomp_temp: N(0),
		openchal: false,
		chalpara: [false],
		algor: N(0),
		algordata: N(0),
		hidenode: false,
		algorrebuy: [N(0), N(0)],
		
		//chaos
		PL3info: N(0),
		PL3infottl: N(0),
		PL3unlock: false,
		PL3tms: N(0),
		chaosshard: N(0),
		chaosmass: N(0),
		reactpara: [N(0), N(0), N(0), N(0)],
		openelements: false,
		elements: 0,
		autochaos: false,
		autochaosgoal: N(0),
		blackhole: N(0),
		openbh: false,
		sing: N(0),
		exchal: [],
		openexchal: 0,
		colldata: N(0),
		opensupp: false,
		suppdata: N(0),
		suppupg: [],
		
		//void
		PL4info: N(0),
		PL4data: N(0),
		PL4unlock: false,
		PL4tms: N(0),
		voidarea: N(0),
		voidupgbits: 0,
		bhupg: [N(0), N(0), N(0), N(0)],
		
		//theorem
		
		//reality
		
		//beyond
		
		//otherwise
		ach: [],
		last_update: Date.now(),
		offlinetime: 0,
		openoffline: false,
	};
}

function getjdscs(i)
{
	let base = [N(1024), N(1e10), N(1e50), N('e400'), N(180000), N(1e7), N(2e8), N(2e10)];
	if(getexchalopen().includes(6)) return base;
	
	if(player.boost.gte(55)) base[2] = base[2].pow(1.5);
	if(player.boost.gte(315)) base[3] = base[3].pow(1.25);
	if(player.boost2.gte(250)) base[3] = base[3].pow(2);
	if(player.PL1upg[6]) for(let j = 0;j < 2;j++) base[j] = base[j].pow(1.5);
	if(player.sliceupg[2]) for(let j = 0;j < 3;j++) base[j] = base[j].pow(1.5);
	if(player.permupg.includes(15)) base[4] = base[4].mul(1.1);
	if(player.godstar.gte(3e6)) base[4] = base[4].pow(N(1).add(player.godstar.div(3e6).add(1).log10().add(10).log10().log10().min(0.025)));
	//delete
	if(player.boost3.gte(3)) {base[0] = N(Infinity); base[0].layer = Infinity;}
	if(player.boost3.gte(12)) {base[1] = N(Infinity); base[1].layer = Infinity;}
	if(player.boost3.gte(13)) {base[2] = N(Infinity); base[2].layer = Infinity;}
	if(player.boost3.gte(80)) {base[3] = N(Infinity); base[3].layer = Infinity;}
	return base;
}

function getjdscx(i)
{
	let base = [N(1), N(4), N(99), N(999), N(1 / 9), N(1 / 6), N(1 / 3), N(1 / 7)];
	if(getexchalopen().includes(6))
	{
		for(let i = 0;i < 8;i++) base[i] = N(1).div(base[i].add(1));
		return base;
	}
	
	if(player.boost.gte(15)) base[0] = base[0].mul(0.75);
	if(player.boost.gte(20)) base[0] = base[0].mul(0.4);
	if(player.boost.gte(21)) base[1] = base[1].mul(N(1).div(player.boost.add(1).root(15)));
	if(player.boost2.gte(2)) base[0] = base[0].mul(N(1).div(player.boost.add(1).root(5)));
	if(player.boost2.gte(48)) for(let j = 0;j < 3;j++) base[j] = base[j].mul(N(1).div(player.boost2.root(10)));
	if(player.boost2.gte(119)) for(let j = 1;j < 4;j++) base[j] = base[j].mul(0.3);
	if(player.PL1upg[1]) base[0] = base[0].mul(0.6);
	if(player.PL1upg[5]) base[0] = base[0].mul(0.5);
	if(player.PL1upg[5]) base[1] = base[1].mul(0.6);
	if(player.PL1upg[5]) base[2] = base[2].mul(0.6);
	if(player.permupg.includes(1)) base[4] = base[4].mul(0.8);
	if(player.boost2.gte(470)) base[3] = base[3].mul(0.7);
	if(player.permupg.includes(28)) base[3] = base[3].mul(0.5);
	if(player.permupg.includes(40)) base[6] = base[6].mul(0.6);
	if(hassuppupg(91)) base[6] = base[6].mul(suppupgeffect(91));
	//delete
	if(player.permupg.includes(51)) {base[4] = N(0);}
	if(player.exchal[6].gte(17)) {base[5] = N(0);}
	if(player.permupg.includes(61)) {base[6] = base[6].mul(0.8);}
	for(let i = 0;i < 8;i++) base[i] = N(1).div(base[i].add(1));
	return base;
}

function getjdprice()
{
	let base = [N(10), N(1000), N(1e5), N(1e7), N(1e9), N(1e11), N(1e13), N(1e15)];
	let basex = [N(10), N(100), N(1000), N(1e4), N(1e5), N(1e6), N(1e7), N(1e8)];
	let jdprice = base;
	for(let i = 0;i < 8;i++) jdprice[i] = jdprice[i].mul(basex[i].pow(player.buyjd[i]));
	return jdprice;
}

function getbuyjdeffect()
{
	let base = N(2);
	if(getexchalopen().includes(7)) return N(1);
	if(getexchalopen().includes(9)) return N(1);
	//mul
	if(player.PL2unlock && !player.permupg.includes(17)) base = base.mul(player.star.add(10).log10().pow(0.5));
	else if(player.PL2unlock && player.permupg.includes(17)) base = base.mul(player.star.add(2).log(2));
	if(player.permupg.includes(2)) base = base.mul(player.PL2info.add(1).log10().mul(1.5).root(1.75).max(1));
	if(player.godstar.gte(1e21)) base = base.mul(player.godstar.div(1e15).sub(999999).root(5).max(1).min(30000));
	if(player.permupg.includes(21)) base = base.mul(player.dimension.add(2).div(2).root(1.2));
	if(player.PL3info.gte(250000)) base = base.mul(player.PL3infottl.sub(250000).add(1).root(2));
	//pow
	if(player.permupg.includes(29)) base = base.pow(N(1).add(player.algorrebuy[0].add(player.permupg.includes(57) ? player.algorrebuy[1].mul(0.5) : 0).mul(0.05)));
	if(player.exchal[5].gte(1)) base = base.pow(exchal[5].effect());
	//dil
	return base;
}

function getjdx()
{
	let base = [N(1), N(1), N(1), N(1), N(1), N(1), N(1), N(1)];
	for(let i = 0;i < 8;i++)
	{
		let scs = getjdscs(i);
		let scx = getjdscx(i);
		base[i] = base[i].mul(getbuyjdeffect().pow(player.buyjd[i].add(player.permupg.includes(24) ? getalgoreffect() : 0)));
		if(getexchalopen().includes(10)) continue;
		for(let j = 0;j < 4;j++)
		{
			if(base[i].gte(scs[j]))
			{
				base[i] = scs[j].mul(base[i].div(scs[j]).pow(scx[j]));
			}
		}
		//mult
		if(player.boost2.gte(1)) base[i] = base[i].mul(3);
		if(player.boost2.gte(3)) base[i] = base[i].mul(player.boost2.add(1).mul(1.25).pow(3.5));
		if(player.boost2.gte(12)) base[i] = base[i].mul(player.PL1info.add(1).mul(0.5).pow(0.25).min('e100000'));
		if(player.boost.gte(3) && !player.boost.gte(52)) base[i] = base[i].mul(player.boost);
		if(player.boost.gte(52)) base[i] = base[i].mul(player.boost.pow(2));
		if(player.boost3.gte(8)) base[i] = base[i].mul(N(2).pow(player.boost.pow(1.35)).min('e5000'));
		if(player.boost3.gte(9)) base[i] = base[i].mul(player.PL2info.add(1).pow(45));
		if(player.PL1upg[2]) base[i] = base[i].mul(player.boost.add(1).pow(1.5));
		if(player.PL1upg[7]) base[i] = base[i].mul(getsliceeffect());
		if(player.origin_data.gte(1e5) && !(player.openchal && player.chalpara.includes(2))) base[i] = base[i].mul(player.origin_data.div(100).sub(1000).max(1).pow(20));
		if(player.entropy[2].gte(1)) base[i] = base[i].mul(N(100).pow(player.entropy[2].add(3).pow(4)).min('e8192'));
		if(player.PL2upg[2] && !player.permupg.includes(11)) base[i] = base[i].mul(N(10).pow(player.godstar.mul(60).root(1.8).min(N(2000).add(player.godstar.root(2.1))).min(N(10000).add(player.godstar.root(4))).min(N(20000).add(player.godstar.log10().mul(45)))).min('e1e12'));
		if(player.PL3infottl.gte(6.666)) base[i] = base[i].mul(player.PL3infottl.pow(100));
		//pow
		if(player.boost.gte(65)) base[i] = base[i].pow(N(1).add(player.boost.root(10).div(15)));
		if(player.boost3.gte(4))
		{
			let power = player.PL2info.add(1).log10().div(40).add(1);
			if(power.gte(1.1)) power = N(1.1).mul(power.div(1.1).pow(0.4));
			base[i] = base[i].pow(power.min(1.3));
		}
		if(player.PL1upg[7]) base[i] = base[i].pow(N(1).add(player.sliceupg_rep[0].mul(0.005)));
		if(player.permupg.includes(8)) base[i] = base[i].pow(player.PL2info.add(1).log10().add(10).log10().root(4).min(1.4));
		if(player.PL2upg[2] && player.permupg.includes(11)) base[i] = base[i].pow(player.godstar.add(10).log10().add(10).log10().root(3));
		if(player.permupg.includes(12)) base[i] = base[i].pow(player.star.add(10).log10().add(10).log10().root(6));
		if(player.chalcomp.gte(1.5)) base[i] = base[i].pow(N(1).add(player.chalcomp.log(1.5).root(7).log(2)));
		if(player.PL3unlock) base[i] = base[i].pow(player.PL3infottl.add(10).log10().root(2));
		if(player.boost3.gte(52)) base[i] = base[i].pow(player.boost.add(1).log10().div(3).add(1).root(2));
		if(player.elements >= 5) base[i] = base[i].pow(1.9 - 0.1 * i);
		if(player.exchal[1].gte(1)) base[i] = base[i].pow(exchal[1].effect());
		if(player.colldata.gte(1e18)) base[i] = base[i].pow(player.colldata.div(1e18).root(1.5).iteratedlog(10, 0.75).add(0.75));
		if(player.colldata.gte(1e54)) base[i] = base[i].pow(player.colldata.mul(player.star.add(1).root(1000)).div(1e54).add(9).log10());
		if(hassuppupg(4) && !getexchalopen().includes(11)) base[i] = base[i].pow(suppupgeffect(4));
		if(hassuppupg(80) && !getexchalopen().includes(11)) base[i] = base[i].pow(suppupgeffect(80));
		if(hassuppupg(97) && !getexchalopen().includes(11)) base[i] = base[i].pow(suppupgeffect(97));
		if(player.star.gte('e81000')) base[i] = base[i].pow(player.star.add(10).log10().sub(80500).div(500).pow(1.1));
		if(hassuppupg(38) && i == 0 && !getexchalopen().includes(11)) base[i] = base[i].pow(suppupgeffect(38));
		if(player.colldata.gte(1e250)) base[i] = base[i].pow(player.colldata.div(1e250).add(10).log10().pow(1.5).mul(player.PL3info.add(10).log10().pow(2)).div(4).add(1).root(1.75));
		if(player.exchal[10].gte(1)) base[i] = base[i].pow(exchal[10].effect());
		//dil
		if(player.openentropy)
		{
			base[i] = N(10).pow(base[i].log10().pow(0.9)).max(1);
		}
		if(player.openchal && player.chalpara.includes(0)) base[i] = N(10).pow(base[i].log10().pow(0.4)).max(1);
		if(player.openchal && player.chalpara.includes(4)) base[i] = N(10).pow(base[i].log10().pow(1.7)).max(1);
		if(player.openchal && player.chalpara.includes(5)) base[i] = N(10).pow(base[i].log10().pow(1.3)).max(1);
		if(getexchalopen().includes(3)) base[i] = N(10).pow(base[i].log10().pow(0.5)).max(1);
		if(player.opensupp) base[i] = N(10).pow(base[i].log10().pow(1.5)).max(1);
		if(hassuppupg(84) && !getexchalopen().includes(11)) base[i] = N(10).pow(base[i].log10().pow(suppupgeffect(84))).max(1);
		if(hassuppupg(24) && !getexchalopen().includes(11)) base[i] = N(10).pow(base[i].log10().pow(suppupgeffect(24))).max(1);
		if(player.colldata.gte(1e160)) base[i] = N(10).pow(base[i].log10().pow(player.colldata.div(1e160).root(40).mul(1e11).iteratedlog(10, 2).root(3))).max(1);
		if(getexchalopen().includes(11)) base[i] = N(10).pow(base[i].log10().pow(0.831)).max(1);
		for(let j = 4;j < 8;j++)
		{
			if(base[i].gte(N(10).pow(scs[j])))
			{
				base[i] = (N(10).pow(scs[j])).mul(N(10).pow(base[i].log10().sub(scs[j]).pow(scx[j])));
			}
		}
	}
	return base;
}

function getdataspillstart()
{
	let base = N(10).pow(N(2).pow(1024));
	if(player.elements >= 10) base = base.pow(N(2).pow(128));
	if(player.bhupg[2].gte(1)) base = base.pow(getbhupgeff(2));
	return base;
}

function getdataspillroot(gen)
{
	let start = getdataspillstart();
	if(start.gte(gen)) return;
	return gen.log10().div(start.log10()).root(2);
};

function buyjd(num)
{
	num = num - 1;
	let costlist = getjdprice();
	let cost = costlist[num];
	if(player.data.gte(cost))
	{
		if(!player.PL1upg[0]) player.data = player.data.sub(cost);
		player.buyjd[num] = player.buyjd[num].add(1);
		player.jdnum[num] = player.jdnum[num].add(10);
	}
}

function buymaxjd(num)
{
	let jdunlock = [N(1), N(2), N(4), N(5), N(11), N(12), N(13), N(14)];
	num = num - 1;
	let base = [N(1), N(100), N(1e4), N(1e6), N(1e8), N(1e10), N(1e12), N(1e14)];
	let basex = [N(10), N(100), N(1000), N(1e4), N(1e5), N(1e6), N(1e7), N(1e8)];
	let cost = getjdprice();
	if(player.data.gte(cost[num]) && player.boost.gte(jdunlock[num]))
	{
		let ans = player.data.div(base[num]).log(basex[num]).floor().add(1);
		if(!player.PL1upg[0]) player.data = player.data.sub(cost[num]);
		player.jdnum[num] = player.jdnum[num].add(ans.sub(player.buyjd[num]).mul(10));
		player.buyjd[num] = ans;
	}
}

function chautobuyjd(num)
{
	num = num - 1;
	player.autobuyjd[num] = !player.autobuyjd[num];
}

function allmaxjd()
{
	for(let i = 0;i < 8;i++) buymaxjd(i + 1);
}

function buyPL1ug(i)
{
	i = i - 1;
	if(player.PL1info.gte(PL1upgcost[i]) && !player.PL1upg[i])
	{
		player.PL1info = player.PL1info.sub(PL1upgcost[i]);
		player.PL1upg[i] = true;
	}
}

function getsliceeffect()
{
	let p = N(0.5);
	//add
	if(player.PL1upg[7]) p = p.add(player.sliceupg_rep[1].mul(0.05));
	if(player.boost.gte(95)) p = p.add(0.2);
	if(player.origin_data.gte(1e45) && !(player.openchal && player.chalpara.includes(2))) p = p.add(player.origin_data.div(1e40).max(1).log10().div(10));
	//mult
	if(player.star.gte(1e70)) p = p.mul(player.star.add(10).div(1e70).max(1).root(7).min(3.5));
	if(player.boost.gte(888)) p = p.mul(1.125);
	if(player.origin_data.gte(1e56) && !(player.openchal && player.chalpara.includes(2))) p = p.mul(player.origin_data.log10().sub(55).root(2).max(1).min(2));
	if(player.permupg.includes(9)) p = p.mul(1.5);
	if(player.permupg.includes(42)) p = p.mul(player.algordata.add(10).log(10).mul(3).min(1000));
	if(player.chaosmass.gte(2e8)) p = p.mul(player.chaosmass.div(2).log10().sub(7).mul(50).sub(49));
	if(player.permupg.includes(44)) p = p.mul(player.slice.add(10).log10().mul(2).sub(1).root(6));
	if(player.star.gte('e730')) p = p.mul(player.star.div('e730').add(10).log10().root(4));
	//pow
	//delete
	if(getexchalopen().includes(3)) p = N(0.001);
	
	let effect = player.slice.pow(p).max(1);
	if(player.openchal && player.chalpara.includes(1)) effect = N(1);
	return effect;
}

function buysliceupg(num)
{
	num = num - 1;
	if(num < 4)
	{
		if(player.sliceupg_rep[num].gte(200)) return;
		let cost = sliceupgcost[num].pow(player.sliceupg_rep[num].add(1));
		if(player.slice.gte(cost))
		{
			player.slice = player.slice.sub(cost);
			player.sliceupg_rep[num] = player.sliceupg_rep[num].add(1);
		}
	}
	else
	{
		let cost = sliceupgcost[num];
		if(player.slice.gte(cost) && !player.sliceupg[num - 4])
		{
			player.slice = player.slice.sub(cost);
			player.sliceupg[num - 4] = true;
		}
	}
}

function unlock_origin()
{
	if(player.PL1info.gte(1e130) && !player.unlock_origin)
	{
		player.PL1info = player.PL1info.sub(1e130);
		player.unlock_origin = true;
	}
}

function getorigineffect()
{
	let e = '';
	if(player.openchal && player.chalpara.includes(2)) return '到达 Infinity 本源数据解锁本源第一效果<br>';
	if(player.origin_data.gte(100)) e = e + "位面切片获取速度×" + notation(player.origin_data.sub(100).max(1).pow(N(1.15).add(player.origin_data.gte(1e56) ? player.origin_data.log10().sub(55).root(3).sub(1).max(0) : 0)).div(100).max(1)) + "<br>";
	if(player.origin_data.gte(100000)) e = e + "传输节点产能×" + notation(player.origin_data.div(100).sub(1000).max(1).pow(20)) + "<br>";
	if(player.origin_data.gte(5e12)) e = e + "本源数据获取速度×" + notation(player.origin_data.div(1.25e12).log(4).max(1)) + "<br>";
	if(player.origin_data.gte(1e45)) e = e + '位面切片效果指数+' + notation(player.origin_data.div(1e40).max(1).log10().div(10)) + '<br>';
	if(player.origin_data.gte(1e56)) e = e + '位面切片效果指数×' + notation(player.origin_data.log10().sub(55).root(2).max(1).min(2)) + ', 本源第一效果公式中的指数+' + notation(player.origin_data.log10().sub(55).root(3).sub(1).max(0)) + '<br>';
	if(player.origin_data.gte(1e90)) e = e + '世界信息获取×' + notation(player.origin_data.div(1e80).pow(540).min('e220000')) + '<br>';
	
	if(!player.origin_data.gte(100)) e = e + "到达 100 本源数据解锁本源第一效果<br>";
	else if(!player.origin_data.gte(100000)) e = e + "到达 1.000e5 本源数据解锁本源第二效果<br>";
	else if(!player.origin_data.gte(5e12)) e = e + "到达 5.000e12 本源数据解锁本源第三效果<br>";
	else if(!player.origin_data.gte(1e45)) e = e + '到达 1.000e45 本源数据解锁本源第四效果<br>';
	else if(!player.origin_data.gte(1e56)) e = e + '到达 1.000e56 本源数据解锁本源第五效果<br>';
	else if(!player.origin_data.gte(1e90)) e = e + '到达 1.000e90 本源数据解锁本源第六效果<br>';
	
	return e;
}

function getoriginupgcost(num)
{
	let base = [N(1), N(10), N(100), N(1e4), N(1e6)];
	let basex = [N(1.15), N(1.35), N(8), N(20), N(30)];
	if(num == 0) return base[0].mul(basex[0].pow(player.origin_upg[0])).sub(1);
	else return base[num].mul(basex[num].pow(player.origin_upg[num]));
}

function buyoriginupg(num)
{
	num = num - 1;
	let cap = [N(100), N(100), N(30), N(30)];
	if(num != 4 && player.origin_upg[num].gte(cap[num])) return;
	if(player.origin_data.gte(getoriginupgcost(num)))
	{
		player.origin_data = player.origin_data.sub(getoriginupgcost(num));
		player.origin_upg[num] = player.origin_upg[num].add(1);
	}
}

function getdimscalx()
{
	let base = N(1);
	if(player.permupg.includes(5)) base = base.mul(0.7);
	if(player.permupg.includes(45)) base = base.mul(N(1).div(player.chaosmass.add(100).log(100).root(5)));
	if(player.elements >= 2) base = base.mul(N(1).div(player.algordata.add(10).log10().root(2)));
	base = base.add(1);
	return base;
}

function getdimcost()
{
	let cost = (N(10).pow(getdimscalx().pow(player.dimension))).div(10);
	return cost;
}

function buydim()
{
	if(player.PL2info.gte(getdimcost()))
	{
		player.PL2info = player.PL2info.sub(getdimcost());
		player.dimension = player.dimension.add(1);
		player.star = player.star.add(1);
	}
}

function buymaxdim()
{
	if(player.PL2info.gte(1))
	{
		let ans = player.PL2info.mul(10).log10().log(getdimscalx()).floor().add(1);
		if(ans.gte(player.dimension))
		{
			player.dimension = ans;
			player.star = player.star.add(ans);
		}
	}
}

function getstareffect()
{
	let e = '';
	if(!player.permupg.includes(17)) e = e + "节点升级效果×" + notation(player.star.add(10).log10().pow(0.5)) + "<br>";
	else e = e + '节点升级效果×' + notation(player.star.add(2).log(2)) + '<br>';
	if(player.star.gte(1e50)) e = e + '位面切片获取速度×' + notation(player.permupg.includes(6) ? player.star.add(1).root(4.5) : player.star.add(10).log10().pow(1.75)) + '<br>';
	if(player.star.gte(1e70)) e = e + '位面切片增幅指数×' + notation(player.star.add(10).div(1e70).max(1).root(7).min(3.5)) + '<br>';
	if(player.star.gte('e370')) e = e + '位面切片增幅指数×' + notation(player.star.div('e730').add(10).log10().root(4)) + '<br>';
	if(player.star.gte('e81000')) e = e + '传输节点产能^' + notation(player.star.add(10).log10().sub(80500).div(500).pow(1.1)) + '<br>';
	if(!player.star.gte(1e50)) e = e + '到达 1.000e50 星辰解锁星辰第二效果' + '<br>';
	else if(!player.star.gte(1e70)) e = e + '到达 1.000e70 星辰解锁星辰第三效果' + '<br>';
	else if(!player.star.gte('e730')) e = e + '到达 1.000e730 星辰解锁星辰第四效果' + '<br>';
	else if(!player.star.gte('e81000')) e = e + '到达 1.000e81000 星辰解锁星辰第五效果' + '<br>';
	return e;
}

function getsnscs()
{
	let base = [N(16384), N(1e100), N('e1000'), N('e10000')];
	if(hasvoidupg(3)) base[3] = base[3].mul(getvoidupgeffect(3));
	return base;
}

function getsnscx()
{
	let base = [N(4), N(24), N(1e5 - 1), N(Infinity)];
	if(player.elements >= 8) base[2] = base[2].mul(0.002);
	for(let i = 0;i < 4;i++) base[i] = N(1).div(base[i].add(1));
	return base;
}

function getsncost(num)
{
	let base = [N(1), N(1e4), N(1e8), N(1e12), N(1e16), N(1e20), N(1e24), N(1e28)];
	let basex = [N(100), N(10000), N(1e6), N(1e10), N(1e16), N(1e25), N(1e36), N(1e50)];
	return base[num].mul(basex[num].pow(player.buysn[num]));
}

function buysn(num)
{
	num = num - 1;
	let cost = getsncost(num);
	if(player.star.gte(cost))
	{
		if(!player.permupg.includes(27))player.star = player.star.sub(cost);
		player.buysn[num] = player.buysn[num].add(1);
		player.star_node[num] = player.star_node[num].add(1);
	}
}

function buymaxsn()
{
	if(!player.star.gte(0.1)) return;
	let base = [N(1), N(1e4), N(1e8), N(1e12), N(1e16), N(1e20), N(1e24), N(1e28)];
	let basex = [N(100), N(10000), N(1e6), N(1e10), N(1e16), N(1e25), N(1e36), N(1e50)];
	for(let i = 0;i < 8;i++)
	{
		let ans = player.star.div(base[i]).log(basex[i]).floor().add(1);
		if(ans.gte(player.buysn[i]))
		{
			player.star_node[i] = player.star_node[i].add(ans.sub(player.buysn[i]));
			player.buysn[i] = ans;
		}
	}
}

function getsnx()
{
	let scs = getsnscs();
	let scx = getsnscx();
	let snx = [N(1), N(1), N(1), N(1), N(1), N(1), N(1), N(1)];
	for(let i = 0;i < 8;i++)
	{
		snx[i] = snx[i].mul(N(2).pow(player.buysn[i])).pow(player.dimension);
		//mult
		if(player.entropy[1].gte(1.4)) snx[i] = snx[i].mul(N(100).pow(player.entropy[1]));
		if(player.chaosmass.gte(100000)) snx[i] = snx[i].mul(player.chaosmass.sub(99999.99).mul(100).root(2));
		//pow
		if(player.colldata.gte(1e54)) snx[i] = snx[i].pow(player.colldata.mul(player.star.add(1).root(1000)).div(1e54).add(9).log10());
		//sc
		for(let j = 0;j < 3;j++)
		{
			if(snx[i].gte(scs[j]))
			{
				snx[i] = scs[j].mul(snx[i].div(scs[j]).pow(scx[j]));
			}
		}
		if(snx[i].gte(scs[3]))
		{
			snx[i] = scs[3];
		}
	}
	return snx;
}

function openentropy()
{
	if(player.PL1info.gte('e7000'))
	{
		player.PL2info = player.PL2info.add(PL2infoget);
		player.PL2unlock = true;
		player.PL2tms = player.PL2tms.add(1);
	}
	PL2reset();
	if(player.PL2tms.gte(2)) player.PL1upg = [true, true, true, true, true, true, true, true];
	if(player.PL2tms.gte(4)) player.sliceupg = [true, true, true, true], player.unlock_origin = true;
	player.openentropy = !player.openentropy;
}

function getentropy()
{
	if(player.openentropy || player.permupg.includes(33))
	{
		player.entropy[0] = player.entropy[0].max(player.PL1info.add(1).log10().div(100).sub(25).pow(0.5)).min(N(5).add(player.entropy[2].gte(4) ? player.entropy[2].sub(4).mul(2) : 0));
		player.entropy[1] = player.entropy[1].max(player.boost.add(1).log(N(10).mul(
			player.entropy[2].gte(1.014) ? N(1).sub(player.entropy[2].mul(0.1)) : 1)).div(2)).min(5);
		player.entropy[2] = player.entropy[2].max(player.slice.add(1).log10().sub(3).div(140)).min(5);
		player.entropy[3] = player.entropy[3].max(player.data.add(1).log(N(10).mul(
			player.entropy[1].gte(1.5) ? N(1).sub(player.entropy[1].mul(0.18)) : 1)).add(1).log(N(10).mul(
			player.entropy[1].gte(1.5) ? N(1).sub(player.entropy[1].mul(0.18)) : 1)).pow(0.5).div(2)).min(5);
	}
}

function getentropyeffect(i)
{
	let e = '';
	if(i == 0)
	{
		if(player.entropy[0].gte(1.75)) e = e + '跃迁超级折算强度×' + notation(N(1).div(player.entropy[0].root(2))) + '<br>';
		if(!player.entropy[0].gte(1.75)) e = e + '到达 1.75 熵_I解锁熵_I第一效果<br>';
		return e;
	}
	if(i == 1)
	{
		if(player.entropy[1].gte(1.4)) e = e + '星辰节点产能×' + notation(N(100).pow(player.entropy[1])) + '<br>';
		if(player.entropy[1].gte(1.5)) e = e + '熵_IV获取公式中的对数×' + notation(N(1).sub(player.entropy[1].mul(0.1))) + '<br>';
		if(!player.entropy[1].gte(1.4)) e = e + '到达 1.40 熵_II解锁熵_II第一效果<br>';
		else if(!player.entropy[1].gte(1.5)) e = e + '到达 1.50 熵_II解锁熵_II第二效果<br>';
		return e;
	}
	if(i == 2)
	{
		if(player.entropy[2].gte(1)) e = e + '传输节点产能×' + notation(N(100).pow(player.entropy[2].add(3).pow(4)).min('e8192')) + '<br>';
		if(player.entropy[2].gte(1.014)) e = e + '熵_II获取公式中的对数×' + notation(N(1).sub(player.entropy[2].mul(0.18))) + '<br>';
		if(player.entropy[2].gte(4)) e = e + '熵_I获取上限+' + notation(player.entropy[2].sub(4).mul(2)) + '<br>';
		if(!player.entropy[2].gte(1)) e = e + '到达 1.00 熵_III解锁熵_III第一效果<br>';
		else if(!player.entropy[2].gte(1.014)) e = e + '到达 1.014 熵_III解锁熵_III第二效果<br>';
		else if(!player.entropy[2].gte(4)) e = e + '到达 4.00 熵_III解锁熵_III第三效果<br>';
		return e;
	}
	if(i == 3)
	{
		if(player.entropy[3].gte(1)) e = e + '本源数据获取速度×' + notation(N(1000).pow(player.entropy[3].pow(1.25))) + '<br>';
		if(player.entropy[3].gte(1.062)) e = e + '位面切片在 1.000e135 的软上限强度×' + notation(N(1).sub(player.entropy[3].mul(0.16)).max(0.2)) + '<br>';
		if(!player.entropy[3].gte(1)) e = e + '到达 1.00 熵_IV解锁熵_IV第一效果<br>';
		else if(!player.entropy[3].gte(1.062)) e = e + '到达 1.062 熵_IV解锁熵_IV第二效果<br>';
		return e;
	}
}

function buyPL2upg(i)
{
	i = i - 1;
	if(player.PL2info.gte(PL2upgcost[i]) && !player.PL2upg[i])
	{
		player.PL2info = player.PL2info.sub(PL2upgcost[i]);
		player.PL2upg[i] = true;
	}
}

function getgodstareffect()
{
	let e = '';
	if(!player.permupg.includes(11)) e = e + '传输节点产能×' + notation(N(10).pow(player.godstar.mul(60).root(1.8).min(N(2000).add(player.godstar.root(2.1))).min(N(10000).add(player.godstar.root(4))).min(N(20000).add(player.godstar.log10().mul(45)))).min('e1e12')) + '<br>';
	else e = e + '传输节点产能^' + notation(player.godstar.add(10).log10().add(10).log10().root(3)) + '<br>';
	if(player.godstar.gte(3e6)) e = e + '节点五阶软上限指数延迟^' + notation(N(1).add(player.godstar.div(3e6).add(1).log10().add(10).log10().log10().min(0.025))) + '<br>';
	if(player.godstar.gte(1e13)) e = e + '本源数据获取速度×' + notation(player.godstar.div(1e9).sub(9999).root(1.25).max(1).min('e1800')) + '<br>';
	if(player.godstar.gte(1e21)) e = e + '传输节点升级效果×' + notation(player.godstar.div(1e15).sub(999999).root(5).max(1).min(30000)) + '<br>';
	if(player.godstar.gte(1e140)) e = e + '位面切片获取速度×' + notation(player.godstar.div(1e120).root(4).div(100).sub(999).min(N(1e50).add(player.permupg.includes(50) ? player.godstar.log(1.0001).pow(1000) : 0))) + '<br>';
	if(!player.godstar.gte(3e6)) e = e + '到达 3.000e6 神星解锁神星第二效果<br>';
	else if(!player.godstar.gte(1e13)) e = e + '到达 1.000e13 神星解锁神星第三效果<br>';
	else if(!player.godstar.gte(1e21)) e = e + '到达 1.000e21 神星解锁神星第四效果<br>';
	else if(!player.godstar.gte(1e140)) e = e + '到达 1.000e140 神星解锁神星第五效果<br>';
	return e;
}

function unlockgn(num)
{
	num = num - 1;
	let cost = [N('e1e6'), N('e2e6'), N('e3e6'), N('e4e6'), N('e5e6'), N('e6e6'), N('e7e6'), N('e8e6')];
	if(player.data.gte(cost[num]))
	{
		player.data = player.data.sub(cost[num]);
		player.gnunlock[num] = true;
	}
}

function getbuygnx()
{
	let base = N(3);
	if(player.exchal[4].gte(1)) base = base.mul(exchal[4].effect());
	return base;
}

function getgnx()
{
	let base = [N(1), N(1), N(1), N(1), N(1), N(1), N(1), N(1)];
	for(let i = 0;i < 8;i++)
	{
		base[i] = base[i].mul(getbuygnx().pow(player.buygn[i]));
		if(player.permupg.includes(4)) base[i] = base[i].mul(player.PL2info.div(1e40).add(10).log10().max(1));
		if(player.permupg.includes(13)) base[i] = base[i].mul(N(1.1).pow(player.boost3));
		if(getexchalopen().includes(5)) base[i] = N(10).pow(base[i].log10().pow(0.25));
		if(player.openchal && player.chalpara.includes(8)) base[i] = N(0);
	}
	return base;
}

function getgnc()
{
	let x = [N(100), N(10000), N(1e6), N(1e8), N(1e10), N(1e12), N(1e14), N(1e16)];
	let base = [N(1e35), N(1e70), N(1e110), N(1e170), N(1e210), N(1e240), N(1e300), N('e370')];
	let basex = [N(100), N(10000), N(1e6), N(1e8), N(1e10), N(1e12), N(1e14), N(1e16)];
	for(let i = 0;i < 8;i++)
	{
		x[i] = (base[i].mul(basex[i].pow(player.buygn[i])));
	}
	return x;
}

function buygn(num)
{
	num = num - 1;
	let c = getgnc();
	c = c[num];
	if(player.PL2info.gte(c))
	{
		player.PL2info = player.PL2info.sub(c);
		player.buygn[num] = player.buygn[num].add(1);
		player.godnode[num] = player.godnode[num].add(1);
	}
}

function buymaxgn()
{
	if(!player.PL2info.gte(0.1)) return;
	for(let i = 0;i < 8;i++)
	{
		if(!player.gnunlock[i]) continue;
		let x = [N(100), N(10000), N(1e6), N(1e8), N(1e10), N(1e12), N(1e14), N(1e16)];
		let base = [N(1e35), N(1e70), N(1e110), N(1e170), N(1e210), N(1e240), N(1e300), N('e370')];
		let basex = [N(100), N(10000), N(1e6), N(1e8), N(1e10), N(1e12), N(1e14), N(1e16)];
		let ans = player.PL2info.div(base[i]).log(basex[i]).floor().add(1);
		if(ans.gte(player.buygn[i]))
		{
			player.godnode[i] = player.godnode[i].add(ans.sub(player.buygn[i]));
			player.buygn[i] = ans;
		}
	}
}

function getfreepermupg()
{
	let e = 0;
	if(player.PL3unlock) e += player.PL3tms.min(15) * 2;
	return e;
}

function getdisablepermupg(i)
{
	if(getexchalopen().includes(4))
	{
		if(i == 0 || i == 1 || i == 3 || i == 7 || i == 8 || i == 11 || i == 12 || i == 15 || i == 17 || i == 23 || i == 25 || i == 28) return true;
	}
	return false;
}

function getpermupgeffect(num)
{
	if(num == 0) return '位面切片效果增幅世界信息。当前：×' + notation(getsliceeffect().pow(0.4));
	else if(num == 1) return '节点五阶软上限弱化20%。';
	else if(num == 2) return '宇宙信息增幅节点升级效果。当前：×' + notation(player.PL2info.add(1).log10().mul(1.5).root(1.75).max(1));
	else if(num == 3) return '跃迁超级折算弱化25%。';
	else if(num == 4) return '宇宙信息增幅神子产能。当前：×' + notation(player.PL2info.div(1e40).add(10).log10().max(1));
	else if(num == 5) return '维度折算弱化30%。';
	else if(num == 6) return '重写星辰第二效果的公式。当前：×' + notation(player.star.add(1).root(4.5).div(player.star.add(10).log10().pow(1.75)));
	else if(num == 7) return '世界信息增幅本源数据产能。当前：×' + notation(player.PL1info.pow(25).add(1.05).log(1.05).pow(1.15));
	else if(num == 8) return '宇宙信息以指数增幅节点产能。当前：^' + notation(player.PL2info.add(1).log10().add(10).log10().root(4).min(1.4));
	else if(num == 9) return '位面切片增幅指数×1.5。';
	else if(num == 10) return '你可以最大化购买神子。';
	else if(num == 11) return '神星第一效果改为对指数加成。当前：^' + notation(player.godstar.add(10).log10().add(10).log10().root(3));
	else if(num == 12) return '星辰增幅传输节点。当前：^' + notation(player.star.add(10).log10().add(10).log10().root(6));
	else if(num == 13) return '每个三重跃迁使神子×1.1。当前：×' + notation(N(1.1).pow(player.boost3));
	else if(num == 14) return '解锁挑战。(在层级选项卡内)';
	else if(num == 15) return '节点五阶软上限延迟1.1次方出现。';
	else if(num == 16) return '神星减少二重跃迁成本。当前：-' + notation(player.godstar.add(1).log10().min(10000));
	else if(num == 17) return '重写星辰第一效果的公式。当前：×' + notation(player.star.add(2).log(2).div(player.star.add(10).log10().pow(0.5)));
	else if(num == 18) return '被动获得宇宙信息的比率×100。';
	else if(num == 19) return '解锁阶层4挑战参数。';
	else if(num == 20) return '阶层4挑战参数的复杂度权重增加0.2';
	else if(num == 21) return '维度倍增传输节点升级效果。当前：×' + notation(player.dimension.add(2).div(2).root(1.2));
	else if(num == 22) return '收集熵时世界信息获取量^6，但上限在×1e35000。';
	else if(num == 23) return '世界信息获取量^1.02。';
	else if(num == 24) return '解锁算法。(在传输节点子选项卡内)';
	else if(num == 25) return '算法底数+1。';
	else if(num == 26) return '宇宙信息获取公式变得更好。';
	else if(num == 27) return '你自动购买星辰节点和神子，它们不消耗任何东西。';
	else if(num == 28) return '节点四阶软上限弱化50%。';
	else if(num == 29) return '解锁两个新的算法可购买。解锁混沌重置。';
	else if(num == 30) return '获得5倍宇宙重置次数。';
	else if(num == 31) return '混沌重置后保留永久升级11、14、15、19、22、24、25、28。';
	else if(num == 32) return '混沌重置后有35次宇宙重置。';
	else if(num == 33) return '你在任何环境下都能获得熵。';
	else if(num == 34) return '基于当前游戏进度，可以免费购买永久升级。当前：免费自动购买前' + getfreepermupg() + '个永久升级。';
	else if(num == 35) return '大幅降低算法价格。';
	else if(num == 36) return '你自动购买维度和算法，它们不消耗任何东西。';
	else if(num == 37) return '数据增强算法数据获取。当前：×' + notation(player.data.add(10).log10().add(9).log10().div(2));
	else if(num == 38) return '你自动购买算法可购买，它们不消耗任何东西。';
	else if(num == 39) return '解锁自动混沌重置。';
	else if(num == 40) return '节点七阶软上限弱化40%。';
	else if(num == 41) return '混沌重置后保留宇宙升级。';
	else if(num == 42) return '算法数据增强位面切片增幅指数。当前：×' + notation(player.algordata.add(10).log(10).mul(3).min(1000));
	else if(num == 43) return '解锁反应堆。(在混沌选项卡内)';
	else if(num == 44) return '位面切片增强位面切片增幅指数。当前：×' + notation(player.slice.add(10).log10().mul(2).sub(1).root(6));
	else if(num == 45) return '混沌质量弱化维度折算。当前：×' + notation(N(1).div(player.chaosmass.add(100).log(100).root(5)));
	else if(num == 46) return '数据延迟算法数据溢出。当前：×' + notation(player.data.add(10).log10().add(9).log10().root(5));
	else if(num == 47) return '解锁阶层5挑战参数。';
	else if(num == 48) return '你可以用反应堆压缩元素。';
	else if(num == 49) return '位面切片获取量（软上限后）^1.5。';
	else if(num == 50) return '神星第五效果的上限变为软上限。';
	else if(num == 51) return '移除节点五阶软上限。';
	else if(num == 52) return '算法数据增幅算法底数。当前：+' + notation(player.algordata.add(1).log10().root(5).div(3));
	else if(num == 53) return '宇宙信息获取量^2。';
	else if(num == 54) return '算法底数+0.5。';
	else if(num == 55) return '释放黑洞(在混沌选项卡内)。';
	else if(num == 56) return '八重神子增幅算法底数。当前：+' + notation(player.godnode[7].add(1).log10().add(1).log10().root(4));
	else if(num == 57) return '每2个宇宙折叠使真空衰变+1。当前：+' + notation(player.algorrebuy[1].mul(0.5)) + '；每4个真空衰变使算法+1。当前：+' + notation(player.algorrebuy[0].mul(0.25));
	else if(num == 58) return '解锁奇异挑战1(在层级选项卡内)。';
	else if(num == 59) return '开启黑洞不消耗黑洞，关闭黑洞时黑洞的充能变得更强。';
	else if(num == 60) return '解锁奇异挑战9。';
	else if(num == 61) return '节点七阶软上限弱化20%。';
	else if(num == 62) return '粉物质产量^1.1。';
	else if(num == 63) return '黑洞永久开启，开启黑洞时仍然能够充能。解锁黑洞升级。';
	else if(num == 64) return '混沌信息降低黑洞升级的价格。当前：÷' + notation(player.PL3info.add(1).log10().sub(200).max(0).add(1).root(3));
	else if(num == 65) return '黑洞增幅混沌以前全局速度的公式变得更好。';
	else if(num == 66) return '解锁???。';
	else return '无效升级';
}

var permupgcost = [N(1e75), N(1e78), N(1e19), N(1e82), N(1e85), N(3e23), N(1e88), N(4.5e25), N(5e95), N(1e40)
, N(1e42), N(1e124), N(2e46), N(1e50), N(1e150), N(1e70), N(1e190), N(1e92), N(1e240), N(1e127)
, N(1e255), N(4.65), N(1e270), N(7), N(1e146), N(1e162), N('1.797e308'), N('e400'), N('e3680'), N('e5300')
, N(1), N(1), N(2), N(2), N(3), N(4), N(5), N(6), N(7), N(10000)
, N('e70000'), N('e120000'), N('e4.6e6'), N(9.7), N(4e9), N('e9.4e6'), N(400), N('e1.18e7'), N('e2.18e7'), N('e2.7e7')
, N('e1e8'), N('e2.5e8'), N(1e13), N('e6e8'), N('e2.1e9'), N(1e6), N('e5e9'), N('e2e10'), N('e3e11'), N(1e14)
, N(1e7), N('ee365'), N(1e190), N(1e10), N(1e200), N('ee393'), N('ee400')];
var permupgcosttype = [0, 0, 1, 0, 0, 1, 0, 1, 0, 1
, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1
, 0, 2, 0, 2, 1, 1, 0, 0, 0, 0
, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
, 0, 1, 0, 2, 4, 0, 3, 1, 0, 1
, 0, 0, 4, 1, 1, 3, 0, 1, 1, 3
, 5, 0, 3, 5, 3, 0, 0];
var permupgnum = permupgcosttype.length;
var permupgcosttypename = ['宇宙信息', '神星', '挑战复杂度纪录', '混沌信息', '混沌质量', '虚空数据'];
var permupgcosttypeinternal = ['PL2info', 'godstar', 'chalcomp_temp', 'PL3info', 'chaosmass', 'PL4data'];

function buypermupg(num)
{
	if(getdisablepermupg(num)) return;
	if(player.permupg.includes(num)) return;
	if(player[permupgcosttypeinternal[permupgcosttype[num]]].gte(permupgcost[num]))
	{
		player[permupgcosttypeinternal[permupgcosttype[num]]] = player[permupgcosttypeinternal[permupgcosttype[num]]].sub(permupgcost[num]);
		player.permupg.push(num);
	}
}

function permupgcanblock(num)
{
	if(num >= 15 && num < 29 && !player.permupg.includes(14)) return false;
	if(num == 29 && (!player.permupg.includes(14) && !player.PL3unlock)) return false;
	if(num >= 30 && !player.PL3unlock) return false;
	if(num >= 60 && !hasvoidupg(6)) return false;
	return true;
}

function getchallayerunlock()
{
	let base = N(0);
	if(player.permupg.includes(14))
	{
		base = N(3);
	}
	if(player.permupg.includes(19))
	{
		base = N(4);
	}
	if(player.permupg.includes(47))
	{
		base = N(5);
	}
	return base;
}

var chalparanum = 9;
var challayernum = 5;
var challayerhaspara = [1, 2, 1, 3, 2];

function canchangechalpara(num)
{
	if(num < challayerhaspara[0]) return true;
	else
	{
		//获取参数阶层
		let n = 0;
		let layer;
		for(let i = 0;i < getchallayerunlock();i++)
		{
			n += challayerhaspara[i];
			if(num >= n) layer = i + 1;
		}
		let first, end;
		//获取上一个阶层起始点
		n = 0;
		for(let i = 0;i < layer - 1;i++)
		{
			n += challayerhaspara[i];
		}
		first = n;
		//获取上一个阶层终点
		n = 0;
		for(let i = 0;i < layer;i++)
		{
			n += challayerhaspara[i];
		}
		end = n - 1;
		//查找任何一个
		for(let i = first;i <= end;i++)
		{
			if(player.chalpara.includes(i)) return true;
		}
		return false;
	}
}

function getchalparatext(num)
{
	if(num == 0) return '节点产能指数^0.4';
	else if(num == 1) return '位面切片失去效果';
	else if(num == 2) return '本源数据失去效果';
	else if(num == 3) return '世界信息获取量指数^0.4';
	else if(num == 4) return '节点产能指数^1.7';
	else if(num == 5) return '节点产能与世界信息获取量指数^1.3';
	else if(num == 6) return '世界信息获取量指数^1.7';
	else if(num == 7) return '算法数据的溢出起点^0.25<br>挑战开始和结束都为混沌重置<br>完成需求为1e2000宇宙信息';
	else if(num == 8) return '禁用神子生产<br>挑战开始和结束都为混沌重置<br>完成需求为1e2000宇宙信息';
	else return '暂时没有这个参数';
}

function changechalpara(num)
{
	if(!player.openchal)
	{
		if(canchangechalpara(num) && !player.chalpara.includes(num)) player.chalpara.push(num);
	}
	else
	{
		alert('挑战时无法修改参数');
	}
}

function resetchalpara(num)
{
	if(!player.openchal)
	{
		player.chalpara = [];
	}
	else
	{
		alert('挑战时无法重置参数');
	}
}

function openchal()
{
	if(!player.openchal && !player.chalpara.includes(0))
	{
		alert('您必须将阶层1参数加入参数表中！');
		return;
	}
	if(player.PL1info.gte('e7000'))
	{
		player.PL2info = player.PL2info.add(PL2infoget);
		player.PL2unlock = true;
		player.PL2tms = player.PL2tms.add(1);
		if(player.openchal && getchalparacomp().gte(player.chalcomp)
		&& !(player.chalpara.includes(7) || player.chalpara.includes(8)))
		{
			player.chalcomp = getchalparacomp();
		}
	}
	PL2reset();
	if(player.PL2tms.gte(2)) player.PL1upg = [true, true, true, true, true, true, true, true];
	if(player.PL2tms.gte(4)) player.sliceupg = [true, true, true, true], player.unlock_origin = true;
	if(player.chalpara.includes(7) || player.chalpara.includes(8))
	{
		if(player.PL2info.gte('e10000'))
		{
			player.PL3info = player.PL3info.add(PL3infoget);
			player.PL3infottl = player.PL3infottl.add(PL3infoget);
			player.PL3unlock = true;
			player.PL3tms = player.PL3tms.add(1);
		}
		if(player.PL2info.gte('e2000'))
		{
			if(player.openchal && getchalparacomp().gte(player.chalcomp))
			{
				player.chalcomp = getchalparacomp();
			}
		}
		PL3reset();
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
	player.openchal = !player.openchal;
}

function getchalparacomp()
{
	let base = N(1);
	let qz = [N(1), N(1), N(1.5), N(-1), N(1.5)];
	let nowid = 0;
	if(player.permupg.includes(20)) qz[3] = qz[3].add(0.2);
	for(let i = 0;i < getchallayerunlock();i++)
	{
		let lbase = N(1);
		for(let j = 0;j < challayerhaspara[i];j++)
		{
			if(player.chalpara.includes(nowid)) lbase = lbase.add(1);
			nowid++;
		}
		base = base.mul(lbase.pow(qz[i]));
	}
	return base;
}

function getchalcompeffect()
{
	let e = '';
	if(player.chalcomp.gte(1.5)) e = e + '传输节点^' + notation(N(1).add(player.chalcomp.log(1.5).root(7).log(2))) + '<br>';
	if(player.chalcomp.gte(10)) e = e + '算法数据的溢出延迟×' + notation(player.chalcomp.mul(50).sub(499).root(2)) + '<br>';
	if(!player.chalcomp.gte(1.5)) e = e + '到达 1.5 复杂度纪录解锁挑战第一效果<br>';
	if(!player.chalcomp.gte(10)) e = e + '到达 10 复杂度纪录解锁挑战第二效果<br>';
	return e;
}

function getalgoreffect()
{
	if(getexchalopen().includes(2)) return N(0);
	let power = N(1);
	if(player.permupg.includes(29)) power = power.add(player.algorrebuy[1].mul(0.02));
	if(player.colldata.gte(1e9)) power = power.add(player.colldata.div(1e9).log10().root(5).div(10).min(N(0.12).add(player.colldata.log10().root(50).div(1000))));
	if(hasvoidupg(0)) power = power.add(getvoidupgeffect(0));
	if(getexchalopen().includes(5)) power = N(1);
	let freelevel = player.algordata.pow(power);
	return freelevel;
}

function getalgorscalx()
{
	let sx = N(1);
	if(player.exchal[2].gte(1)) sx = sx.mul(exchal[2].effect());
	if(player.elements >= 7) sx = sx.mul(0.8);
	sx = sx.add(1);
	return sx;
}

function getalgorscal1x()
{
	let base = N(1.5);
	return base;
}

function getalgorcost()
{
	let effective = player.algor;
	if(player.algor.gte(3000)) effective = N(3000).add(effective.sub(3000).pow(getalgorscal1x())).sub(1);
	if(player.permupg.includes(35)) return N('e14000').mul(N('e1e4').pow(getalgorscalx().mul(0.97).pow(effective).sub(1)));
	else return N('e1e6').mul(N('e2e4').pow(getalgorscalx().pow(effective).sub(1)));
}

function getalgorbase()
{
	let base = N(2);
	if(player.permupg.includes(25)) base = base.add(1);
	if(player.permupg.includes(52)) base = base.add(player.algordata.add(1).log10().root(5).div(3));
	if(player.permupg.includes(54)) base = base.add(0.5);
	if(player.permupg.includes(56)) base = base.add(player.godnode[7].add(1).log10().add(1).log10().root(4));
	if(hassuppupg(14)) base = base.add(suppupgeffect(14));
	return base;
}

function buyalgor()
{
	if(player.PL1info.gte(getalgorcost()))
	{
		player.PL1info = player.PL1info.sub(getalgorcost());
		player.algor = player.algor.add(1);
	}
}

function buymaxalgor()
{
	if(!player.PL1info.gte('e14000')) return;
	let ans = N(0);
	if(player.permupg.includes(35)) ans = player.PL1info.div('e14000').log('e1e4').log(getalgorscalx().mul(0.97)).add(1);
	else ans = player.PL1info.div('e1e6').log('e2e4').log(getalgorscalx()).add(1);
	if(ans.gte(3000)) ans = N(3000).add(ans.sub(3000).root(getalgorscal1x())).add(1);
	ans = ans.floor();
	if(ans.gte(player.algor)) player.algor = ans;
}

function getalgorrebuyscalx()
{
	let base = N(1.05);
	return base;
}

function getalgorrebuyscal2x()
{
	let base = N(2);
	return base;
}

function getalgorrebuycost(num)
{
	if(num == 0)
	{
		let effective = player.algorrebuy[0];
		if(effective.gte(600)) effective = N(600).add(effective.sub(600).pow(getalgorrebuyscal2x())).sub(1);
		if(effective.gte(50)) effective = N(50).add(effective.sub(50).pow(getalgorrebuyscalx())).sub(1);
		return N('e1.7e7').mul(N('e4e5').pow(N(2.5).pow(effective).sub(1)));
	}
	else if(num == 1)
	{
		let effective = player.algorrebuy[1];
		if(effective.gte(300)) effective = N(300).add(effective.sub(300).pow(getalgorrebuyscal2x())).sub(1);
		if(effective.gte(25)) effective = N(25).add(effective.sub(25).pow(getalgorrebuyscalx())).sub(1);
		return N('e1.8e7').mul(N('e1e6').pow(N(6).pow(effective).sub(1)));
	}
}

function buyalgorrebuy(num)
{
	num = num - 1;
	if(player.PL1info.gte(getalgorrebuycost(num)))
	{
		player.PL1info = player.PL1info.sub(getalgorrebuycost(num));
		player.algorrebuy[num] = player.algorrebuy[num].add(1);
	}
}

function buymaxalgorrebuy()
{
	if(player.PL1info.gte('e1.7e7'))
	{
		let ans = player.PL1info.div('e1.7e7').log('e4e5').log(2.5).add(1);
		if(ans.gte(50))
		{
			ans = N(50).add(ans.sub(50).root(getalgorrebuyscalx()).add(1));
		}
		if(ans.gte(600))
		{
			ans = N(600).add(ans.sub(600).root(getalgorrebuyscal2x()).add(1));
		}
		ans = ans.floor();
		if(ans.gte(player.algorrebuy[0])) player.algorrebuy[0] = ans;
	}
	if(player.PL1info.gte('e1.8e7'))
	{
		let ans = player.PL1info.div('e1.8e7').log('e1e6').log(6).add(1);
		if(ans.gte(25))
		{
			ans = N(25).add(ans.sub(25).root(getalgorrebuyscalx()).add(1));
		}
		if(ans.gte(300))
		{
			ans = N(300).add(ans.sub(300).root(getalgorrebuyscal2x()).add(1));
		}
		ans = ans.floor();
		if(ans.gte(player.algorrebuy[1])) player.algorrebuy[1] = ans;
	}
}

function getalgordataspillstart()
{
	let base = N(1e13);
	//mul
	if(player.permupg.includes(46)) base = base.mul(player.data.add(10).log10().add(9).log10().root(5));
	if(player.chalcomp.gte(10)) base = base.mul(player.chalcomp.mul(50).sub(499).root(2));
	if(hassuppupg(95)) base = base.mul(suppupgeffect(95));
	if(hassuppupg(96)) base = base.mul(suppupgeffect(96));
	if(player.colldata.gte(1e210)) base = base.mul(player.colldata.div(1e210).pow(2).add(9).iteratedlog(10, 1.5).add(0.5).pow(2));
	//pow
	if(player.openchal && player.chalpara.includes(7)) base = base.pow(0.25);
	return base;
}

function getalgordataspillroot(gen)
{
	let start = getalgordataspillstart();
	if(player.exchal[1].gte(1)) return gen.add(10).log10().div(start.add(10).log10()).root(1.1);
	return player.algordata.add(10).log10().div(2).sub(start.log10().div(2).sub(1));
};

function getalgordataspill2start()
{
	let base = N(1e34);
	return base;
}

function getalgordataspill2root(gen)
{
	let start = getalgordataspill2start();
	return gen.add(10).log10().div(start.add(10).log10()).root(1.05);
}

function getalgordatagen()
{
	let adg = N(0);
	adg = adg.add(getalgorbase().pow(player.algor.add(player.permupg.includes(57) ? player.algorrebuy[0].mul(0.25) : 0)).sub(1));
	if(player.permupg.includes(37)) adg = adg.mul(player.data.add(10).log10().add(9).log10().max(2).div(2));
	if(player.colldata.gte(10)) adg = adg.mul(player.colldata.log10().pow(2));
	return adg;
}


function getPL3infoeffect()
{
	let e = '';
	e = e + '传输节点产能^' + notation(player.PL3infottl.add(10).log10().root(2)) + '<br>';
	if(player.PL3infottl.gte(6.666)) e = e + '传输节点产能×' + notation(player.PL3infottl.pow(1000)) + '<br>';
	if(player.PL3infottl.gte(250000)) e = e + '传输节点购买倍数×' + notation(player.PL3infottl.sub(250000).add(1).root(2)) + '<br>';
	if(player.PL3infottl.gte(1e14)) e = e + '压制数据获取速度×' + notation(player.PL3infottl.log10().mul(14).sub(195)) + '<br>';
	if(!player.PL3infottl.gte(6.666)) e = e + '到达 6.666 累计混沌信息解锁混沌第二效果<br>';
	if(!player.PL3infottl.gte(250000)) e = e + '到达 250000 累计混沌信息解锁混沌第三效果<br>';
	if(!player.PL3infottl.gte(1e14)) e = e + '到达 1.000e14 累计混沌信息解锁混沌第四效果<br>';
	return e;
}

function getreactparalim()
{
	let base = [N(1), N(10), N(20), N(1000).add(player.chaosshard.pow(2).mul(200))];
	if(player.chaosshard.gte(7)) base[3] = N(8200).mul(player.chaosshard.sub(5).pow(3));
	if(player.chaosshard.gte(15)) base[3] = N(1e7).mul(N(1.5).pow(N(1.25).pow(player.chaosshard.sub(15))));
	if(player.openelements) base[3] = elementsgoal[player.elements + 1];
	return base;
}

function addacce()
{
	let lim = getreactparalim();
	player.reactpara[0] = player.reactpara[0].add(lim[0].div(20)).min(lim[0]);
}

function subacce()
{
	let lim = getreactparalim();
	player.reactpara[0] = player.reactpara[0].sub(lim[0].div(20)).max(0);
}

function getchaosmasseffect()
{
	let e = '';
	if(player.chaosmass.gte(100000)) e = e + '星辰节点产能×' + notation(player.chaosmass.sub(99999.99).mul(100).root(2)) + '<br>';
	if(player.chaosmass.gte(2e8)) e = e + '位面切片增幅指数×' + notation(player.chaosmass.div(2).log10().sub(7).mul(50).sub(49)) + '<br>';
	if(!player.chaosmass.gte(100000)) e = e + '达到 100000 混沌质量解锁混沌质量第一效果<br>';
	if(!player.chaosmass.gte(2e8)) e = e + '达到 2.000e8 混沌质量解锁混沌质量第二效果<br>';
	return e;
}

var elementsname = ['', 'H','He','Li','Be','B','C','N','O','F','Ne',
        'Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca',
        'Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn',
        'Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr',
        'Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn',
        'Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd',
        'Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb',
        'Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg',
        'Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th',
        'Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm',
        'Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds',
        'Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'];
var elementsgoal = [N(0), N(1e6), N(2e6), N(5e6), N(6e7), N(1e8), N(1e8), N(2e11), N(1e12), N(1e17), N(1e21)
, N('10^^10')];

function startelements()
{
	player.openelements = !player.openelements;
	player.reactpara = [N(0), N(0), N(0), N(0)];
	if(player.openelements) page = 6, subpage = 2;
}

function getelementseffect()
{
	let e = '<br>';
	for(let i = 1;i <= 118;i++)
	{
		if(player.elements >= i)
		{
			e = e + '[' + elementsname[i] + ' ' + i + ']: ' + geteachelementseffect(i) + '<br>';
		}
	}
	return e;
}

function geteachelementseffect(x)
{
	if(x == 1) return '混沌信息增强反应速度。当前：×' + notation(player.PL3info.add(1).log(2).add(1));
	else if(x == 2) return '算法数据弱化维度折算。当前：×' + notation(N(1).div(player.algordata.add(10).log10().root(2)));
	else if(x == 3) return '数据增强反应速度。当前：×' + notation(player.data.add(10).log(10).add(10).log(10));
	else if(x == 4) return '混沌信息的公式变得更好。';
	else if(x == 5) return '已知1<=X<=8，X号传输节点^(1.9-0.1×X)。';
	else if(x == 6) return '混沌以前全局速度增幅反应速度。当前：×' + notation(getPL3globalspeed().root(1.5));
	else if(x == 7) return '算法折算弱化20%。';
	else if(x == 8) return '星辰节点三阶软上限弱化99.8%。';
	else if(x == 9) return '已获得元素数量增幅混沌以前全局速度。当前：×' + notation(player.elements - 7);
	else if(x == 10) return '数据溢出延迟^' + notation(N(2).pow(128));
	return '元素过大';
}

function getsingcap()
{
	let scale = N(2);
	let ans = N(2).pow(1024).pow(scale.pow(player.voidarea));
	return ans;
}

function getbheffect()
{
	let e = '';
	if(player.openbh) e = e + '(加成已获得)<br>';
	else e = e + '(开启黑洞以获得加成)<br>';
	if(!player.permupg.includes(65)) e = e + '基于黑洞和奇点，混沌以前全局速度×' + notation(player.blackhole.mul(player.sing.add(10).log10())) + '<br>';
	else e = e + '基于黑洞和奇点，混沌以前全局速度×' + notation(N(1.001).pow(player.blackhole).mul(player.sing.add(10).log10())) + '<br>';
	if(player.sing.gte(1e19) && player.permupg.includes(63)) e = e + '基于奇点，黑洞充能×' + notation(player.sing.div(1e18).log10().root(10)) + '<br>';
	if(!player.sing.gte(1e19) && player.permupg.includes(63)) e = e + '到达 1.000e19 奇点凝聚进度解锁黑洞第二效果<br>';
	return e;
}

function getPL3globalspeed()
{
	let s = N(1);
	if(!player.PL3unlock) return N(1);
	else
	{
		if(player.openbh)
		{
			if(!player.permupg.includes(65)) s = s.mul(player.blackhole.mul(player.sing.add(10).log10()));
			else s = s.mul(N(1.001).pow(player.blackhole).mul(player.sing.add(10).log10()));
		}
	}
	if(player.exchal[6].gte(1)) s = s.mul(exchal[6].effect());
	if(player.elements >= 9) s = s.mul(player.elements - 7);
	if(getexchalopen().includes(9)) s = s.div(1e300);
	return s;
}

function cbh()
{
	if(player.permupg.includes(63)) return;
	player.openbh = !player.openbh;
	if(player.openbh && !player.blackhole.gte(1)) player.openbh = false;
	if(player.opensupp) player.openbh = false;
}

var exchal = [
	null,
	{
		name: '区域限定',
		layer: 'chaos',
		description: '跃迁锁定为1，二重跃迁、三重跃迁锁定为0。<br>',
		effectdisplay(){return '增幅一号传输节点产能。当前：^' + notation(this.effect()) + '。<br>第1次完成本挑战时，算法数据的溢出改为基于算法数据获取速度而不是总量。<br>第1次完成本挑战时，解锁奇异挑战2。';},
		effect()
		{
			if(player.exchal[1].gte(1)) return player.exchal[1].add(1).mul(2).root(4);
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			if(player.exchal[9].gte(1)) max = max.mul(exchal[9].effect());
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(2).pow(num).mul(5e10));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[1]))) return player.data.log10().div(5e10).log(2).add(1).floor().sub(player.exchal[1]).min(this.maxcancomp().sub(player.exchal[1])); 
			else return N(0);
		},
	},
	{
		name: '计算失误',
		layer: 'chaos',
		description: '算法数据失去效果。<br>',
		effectdisplay(){return '弱化算法折算。当前：×' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战3。';},
		effect()
		{
			if(getexchalopen().includes(10)) return N(1);
			else if(player.exchal[2].gte(1)) return N(1).div(player.exchal[2].root(1.6).add(1).root(3));
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			if(player.exchal[9].gte(1)) max = max.mul(exchal[9].effect());
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(9).pow(num).mul(5e10));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[2]))) return player.data.log10().div(5e10).log(9).add(1).floor().sub(player.exchal[2]).min(this.maxcancomp().sub(player.exchal[2])); 
			else return N(0);
		}
	},
	{
		name: '位面冲击',
		layer: 'chaos',
		description: '位面切片增幅指数锁定为0.001，且传输节点产能指数^0.5。<br>',
		effectdisplay(){return '算法数据倍增本源数据获取。当前：×' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战4。';},
		effect()
		{
			if(player.exchal[3].gte(1)) return player.algordata.add(1).mul(player.exchal[3].add(1).mul(40)).pow(45).pow(player.exchal[3]);
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			if(player.exchal[9].gte(1)) max = max.mul(exchal[9].effect());
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(4).pow(num).mul(2000));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[3]))) return player.data.log10().div(2000).log(4).add(1).floor().sub(player.exchal[3]).min(this.maxcancomp().sub(player.exchal[3])); 
			else return N(0);
		}
	},
	{
		name: '升级破坏',
		layer: 'chaos',
		description: '第30号之前的部分永久升级被禁用。<br>',
		effectdisplay(){return '增幅神星升级倍数。当前：×' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战5。';},
		effect()
		{
			if(player.exchal[4].gte(1)) return player.exchal[4].pow(3).add(10).pow(2).log10();
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			if(player.exchal[9].gte(1)) max = max.mul(exchal[9].effect());
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(10).pow(num).mul(1e15));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[4]))) return player.data.log10().div(1e15).log(10).add(1).floor().sub(player.exchal[4]).min(this.maxcancomp().sub(player.exchal[4])); 
			else return N(0);
		}
	},
	{
		name: '压力陡增',
		layer: 'chaos',
		description: '神子产能指数^0.25，算法数据指数始终为1。<br>',
		effectdisplay(){return '增幅节点升级效果。当前：^' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战6。<br>第2次完成本挑战时，解锁数据压制(在混沌选项卡内)。';},
		effect()
		{
			if(player.exchal[5].gte(1)) return player.exchal[5].add(1).root(10);
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			if(player.exchal[9].gte(1)) max = max.mul(exchal[9].effect());
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(5).pow(num).mul(5e13));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[5]))) return player.data.log10().div(5e13).log(5).add(1).floor().sub(player.exchal[5]).min(this.maxcancomp().sub(player.exchal[5])); 
			else return N(0);
		}
	},
	{
		name: '极端折算',
		layer: 'chaos',
		description: '节点所有软上限不可削弱或移除。<br>',
		effectdisplay(){return '增幅混沌以前全局速度。当前：×' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战7。<br>第17次完成本挑战时，移除节点六阶软上限。';},
		effect()
		{
			if(player.exchal[6].gte(1)) return player.exchal[6].add(1).mul(2).pow(2);
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			if(player.exchal[9].gte(1)) max = max.mul(exchal[9].effect());
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(5).pow(num).mul(1e13));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[6]))) return player.data.log10().div(1e13).log(5).add(1).floor().sub(player.exchal[6]).min(this.maxcancomp().sub(player.exchal[6])); 
			else return N(0);
		}
	},
	{
		name: '水泄不通',
		layer: 'chaos',
		description: '节点升级效果锁定为×1。<br>',
		effectdisplay(){return '增幅混沌信息获取量。当前：×' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战8。';},
		effect()
		{
			if(player.exchal[7].gte(1)) return player.exchal[7].add(1).pow(2).mul(3);
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			if(player.exchal[9].gte(1)) max = max.mul(exchal[9].effect());
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(4).pow(num).mul(1e11));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[7]))) return player.data.log10().div(1e11).log(4).add(1).floor().sub(player.exchal[7]).min(this.maxcancomp().sub(player.exchal[7])); 
			else return N(0);
		}
	},
	{
		name: '混沌终章',
		layer: 'chaos',
		description: '同时开启奇异挑战1~7。<br>',
		effectdisplay(){return '数据增幅折叠数据获取量。当前：×' + notation(this.effect()) + '。<br>第25次完成本挑战时，解锁<span style="color: white;">虚空</span>重置。';},
		effect()
		{
			if(player.exchal[8].gte(1)) return player.data.add(1e10).log10().log10().root(1.5).pow(player.exchal[8].mul(2).root(2));
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			if(player.exchal[9].gte(1)) max = max.mul(exchal[9].effect());
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(2).pow(num).mul(10000));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[8]))) return player.data.log10().div(10000).log(2).add(1).floor().sub(player.exchal[8]).min(this.maxcancomp().sub(player.exchal[8])); 
			else return N(0);
		}
	},
	{
		name: '时间裂缝',
		layer: 'void',
		description: '混沌以前全局速度÷1e300，且传输节点升级倍数锁定为×1。<br>',
		effectdisplay(){return '倍增奇异挑战1~8的完成次数上限。当前：×' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战10。';},
		effect()
		{
			return player.exchal[9].add(1);
		},
		maxcancomp()
		{
			let max = N(1);
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(1e200).pow(num).mul(1e200));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[9]))) return player.data.log10().div(1e200).log(1e200).add(1).floor().sub(player.exchal[9]).min(this.maxcancomp().sub(player.exchal[9])); 
			else return N(0);
		}
	},
	{
		name: '升级主场',
		layer: 'void',
		description: '除节点升级倍数以外的所有传输节点倍数、指数和膨胀失效，奇异挑战2禁用。',
		effectdisplay(){return '1号传输节点购买等级以指数提升所有传输节点产能。当前：^' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战11。';},
		effect()
		{
			return player.buyjd[0].add(10).log10().add(1).log(2).pow(2).pow(player.exchal[10]);
		},
		maxcancomp()
		{
			let max = N(1);
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(1e200).pow(num).mul(1e200));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[10]))) return player.data.log10().div(1e200).log(1e200).add(1).floor().sub(player.exchal[10]).min(this.maxcancomp().sub(player.exchal[10])); 
			else return N(0);
		}
	},
	{
		name: '压制放缓',
		layer: 'void',
		description: '压制升级给予传输节点的加成全部失效，传输节点产能指数^0.8',
		effectdisplay(){return '弱化跃迁究极折算。当前：×' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战12。';},
		effect()
		{
			return N(0.3).pow(player.exchal[11]);
		},
		maxcancomp()
		{
			let max = N(1);
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(1e200).pow(num).mul(1e200));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[11]))) return player.data.log10().div(1e200).log(1e200).add(1).floor().sub(player.exchal[11]).min(this.maxcancomp().sub(player.exchal[11])); 
			else return N(0);
		}
	},
];

function getexchalunlock(i)
{
	if(i == 1) return player.permupg.includes(58);
	else if(i >= 2 && i <= 8) return player.exchal[i - 1].gte(1);
	else if(i == 9) return player.permupg.includes(60);
	else if(i >= 10 && i <= 12) return player.exchal[i - 1].gte(1);
}

function getexchalopen()
{
	let open = [];
	if(player.openexchal != 0) open.push(player.openexchal);
	if(player.opensupp) open.push(1), open.push(2), open.push(3), open.push(4);
	if(player.openexchal == 8)
	{
		for(let i = 1;i <= 7;i++) open.push(i);
	}
	let uni = [...new Set(open)];
	return uni;
}

function openexchal(i)
{
	if(player.openexchal != 0)
	{
		closeexchal();
	}
	switch(exchal[i].layer)
	{
		case 'chaos':
			if(player.PL2info.gte('e10000'))
			{
				player.PL3info = player.PL3info.add(PL3infoget);
				player.PL3infottl = player.PL3infottl.add(PL3infoget);
				player.PL3unlock = true;
				player.PL3tms = player.PL3tms.add(1);
			}
			PL3reset();
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
			break;
		case 'void':
			PL4reset();
			break;
	}
	player.openexchal = i;
}

function closeexchal()
{
	if(player.openexchal != 0)
	{
		player.exchal[player.openexchal] = player.exchal[player.openexchal].add(exchal[player.openexchal].cancomp());
		switch(exchal[player.openexchal].layer)
		{
			case 'chaos':
				if(player.PL2info.gte('e10000'))
				{
					player.PL3info = player.PL3info.add(PL3infoget);
					player.PL3infottl = player.PL3infottl.add(PL3infoget);
					player.PL3unlock = true;
					player.PL3tms = player.PL3tms.add(1);
				}
				PL3reset();
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
				break;
			case 'void':
				PL4reset();
				break;
		}
		player.openexchal = 0;
	}
}

function getcolleffect()
{
	let e = '';
	if(player.colldata.gte(10)) e += '算法数据获取速度×' + notation(player.colldata.log10().pow(2)) + '<br>';
	if(player.colldata.gte(1e6)) e += '(非连续)压制数据获取速度×' + notation(N(2).pow(player.colldata.div(2e5).log(5).floor()))
	+ '，在' + notation(N(2e5).mul(N(5).pow(player.colldata.div(2e5).log(5).floor().add(1)))) + '使效果×2。<br>';
	if(player.colldata.gte(1e9)) e += '算法数据加成指数+' + notation(player.colldata.div(1e9).log10().root(5).div(10).min(N(0.12).add(player.colldata.log10().root(50).div(1000)))) + '<br>';
	if(player.colldata.gte(1e18)) e += '传输节点产能^' + notation(player.colldata.div(1e18).root(1.5).iteratedlog(10, 0.75).add(0.75)) + '<br>';
	if(player.colldata.gte(1e54)) e += '基于折叠数据和星辰，传输节点和星辰节点产能^' + notation(player.colldata.mul(player.star.add(1).root(1000)).div(1e54).add(9).log10()) + '<br>';
	if(player.colldata.gte(1e160)) e += '传输节点产能指数^' + notation(player.colldata.div(1e160).root(40).mul(1e11).iteratedlog(10, 2).root(3)) + '<br>';
	if(player.colldata.gte(1e210)) e += '延迟算法数据溢出×' + notation(player.colldata.div(1e210).pow(2).add(9).iteratedlog(10, 1.5).add(0.5).pow(2)) + '<br>';
	if(player.colldata.gte(1e250)) e += '基于折叠数据和混沌信息，传输节点产能^' + notation(player.colldata.div(1e250).add(10).log10().pow(1.5).mul(player.PL3info.add(10).log10().pow(2)).div(4).add(1).root(1.75)) + '<br>';
	if(player.colldata.gte('e330')) e += '反应速度×' + notation(player.colldata.add(10).log10().sub(330).pow(2)) + '<br>';
	
	if(!player.colldata.gte(10)) e += '到达 10.00 折叠数据解锁折叠第一效果<br>';
	else if(!player.colldata.gte(1e6)) e += '到达 1.000e6 折叠数据解锁折叠第二效果<br>';
	else if(!player.colldata.gte(1e9)) e += '到达 1.000e9 折叠数据解锁折叠第三效果<br>';
	else if(!player.colldata.gte(1e18)) e += '到达 1.000e18 折叠数据解锁折叠第四效果<br>';
	else if(!player.colldata.gte(1e54)) e += '到达 1.000e54 折叠数据解锁折叠第五效果<br>';
	else if(!player.colldata.gte(1e160)) e += '到达 1.000e160 折叠数据解锁折叠第六效果<br>';
	else if(!player.colldata.gte(1e210)) e += '到达 1.000e210 折叠数据解锁折叠第七效果<br>';
	else if(!player.colldata.gte(1e250)) e += '到达 1.000e250 折叠数据解锁折叠第八效果<br>';
	else if(!player.colldata.gte('e330')) e += '到达 1.000e330 折叠数据解锁折叠第九效果<br>';
	
	e += '<span style="color: red">到达 1.000e20 压制数据后触发软上限。强度：^0.8</span><br>';
	if(player.suppdata.gte(1e20)) e += '<span style="color: orange">到达 1.000e75 压制数据后触发二阶软上限。强度：^0.4</span><br>';
	return e;
}

function getcollget()
{
	let get = N(0);
	get = player.data.add(10).log10().root(2);
	if(player.colldata.gte(1e6)) get = get.mul(N(2).pow(player.colldata.div(2e5).log(5).floor()));
	if(player.PL3info.gte(1e14)) get = get.mul(player.PL3infottl.log10().mul(14).sub(195));
	if(get.gte(1e20)) get = N(1e20).mul(get.div(1e20).pow(0.8));
	if(get.gte(1e75)) get = N(1e75).mul(get.div(1e75).pow(0.4));
	return get.sub(player.suppdata).max(0);
}

function opensupp()
{
	if(player.opensupp && getcollget().gte(0))
	{
		player.suppdata = player.suppdata.add(getcollget());
	}
	if(player.PL2info.gte('e10000'))
	{
		player.PL3info = player.PL3info.add(PL3infoget);
		player.PL3infottl = player.PL3infottl.add(PL3infoget);
		player.PL3unlock = true;
		player.PL3tms = player.PL3tms.add(1);
	}
	PL3reset();
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
	player.opensupp = !player.opensupp;
}

function gvd(ps)
{
	let base = ps.pow(4).mul(10);
	if(hassuppupg(103)) base = base.mul(suppupgeffect(103));
	return base;
}

function getvdataps()
{
	let ps = player.PL4info;
	return gvd(ps);
}

function getvdatapsnew(up)
{
	let ps = player.PL4info.add(up);
	return gvd(ps);
}

function hasvoidupg(id)
{
	return (player.voidupgbits & (1 << id)) != 0;
}

function buyvoidupg(id)
{
	id--;
	if(player.PL4data.gte(voidupgcost[id]))
	{
		player.PL4data = player.PL4data.sub(voidupgcost[id]);
		player.voidupgbits = player.voidupgbits | (1 << id);
	}
}

function getvoidupgdescribe(id)
{
	if(id == 0) {return '虚空数据增幅算法数据指数。当前：+' + notation(getvoidupgeffect(id));}
	else if(id == 1) {return '虚空信息增幅基础物质产量。当前：^' + notation(getvoidupgeffect(id));}
	else if(id == 2) {return '虚空重置不重置奇异挑战1~8的完成次数。';}
	else if(id == 3) {return '从10000维度开始，每个维度推迟星辰节点四阶软上限×3倍。当前：×' + notation(getvoidupgeffect(id));}
	else if(id == 4) {return '自动获得^0.66重置可得的压制数据。当前：' + notation(getvoidupgeffect(id)) + '';}
	else if(id == 5) {return '虚空数据增幅粉物质产量。当前：×' + notation(getvoidupgeffect(id));}
	else if(id == 6) {return '解锁新的永久升级。';}
	else if(id == 7) {return '每秒自动获得10%重置时可获得的混沌信息。当前：' + notation(getvoidupgeffect(id)) + '/s';}
	else if(id == 8) {return '虚空重置不重置压制数据。';}
	else return '';
}

function getvoidupgeffect(id)
{
	if(id == 0) {return player.PL4data.add(1).log10().div(10);}
	else if(id == 1) {return player.PL4info.div(100).add(1);}
	else if(id == 3) {return N(3).pow(player.dimension.sub(10000).max(0));}
	else if(id == 4) {return getcollget().pow(0.66);}
	else if(id == 5) {return player.PL4data.add(10).log10().pow(5);}
	else if(id == 7) {updatePLinfoget(); return PL3infoget.mul(0.1);}
	else {return N(0);}
}

function getbhupgcost(i)
{
	let base = bhupgcost[i].mul(bhupgcostx[i].pow(player.bhupg[i]));
	if(player.permupg.includes(64)) base = base.div(player.PL3info.add(1).log10().sub(200).max(0).add(1).root(3));
	return base;
}

function buybhupg(i)
{
	if(player.blackhole.gte(getbhupgcost(i)))
	{
		player.bhupg[i] = player.bhupg[i].add(1);
	}
}

function getbhupgeff(i)
{
	if(i == 0) return N(1.5).pow(player.bhupg[i]);
	if(i == 1) return N(10).pow(player.bhupg[i]);
	if(i == 2) return (N(2).pow(16)).pow(player.bhupg[i]);
	if(i == 3) return N(2).pow(player.bhupg[i]);
}

function automation()
{
	if(player.PL1upg[0])
	{
		for(let i = 0;i < 8;i++)
		{
			if(player.autobuyjd[i]) buymaxjd(i + 1);
		}
	}
	if(player.PL1upg[4])
	{
		if(player.autoboost) buymaxboost();
	}
	if(player.sliceupg[0])
	{
		if(player.autoboost2) buymaxboost2();
	}
	if(player.PL2upg[1])
	{
		if(player.autoboost3) buymaxboost3();
	}
	
	if(player.slice.gte(1e64) || player.PL2tms.gte(1))
	{
		player.sliceupg_rep[0] = player.slice.log(sliceupgcost[0]).floor();
		player.sliceupg_rep[1] = player.slice.log(sliceupgcost[1]).floor();
		player.sliceupg_rep[2] = player.slice.log(sliceupgcost[2]).floor();
		player.sliceupg_rep[3] = player.slice.log(sliceupgcost[3]).floor();
		for(let i = 0;i <= 3;i++) if(player.sliceupg_rep[i].gte(200)) player.sliceupg_rep[i] = N(200);
	}
	
	if(player.PL2tms.gte(4))
	{
		let base = [N(1), N(10), N(100), N(1e4), N(1e6)];
		let basex = [N(1.15), N(1.35), N(8), N(20), N(30)];
		player.origin_upg[0] = player.origin_upg[0].max(player.origin_data.add(1).div(base[0]).log(basex[0]).floor().add(1));
		for(let i = 1;i < 5;i++) player.origin_upg[i] = player.origin_upg[i].max(player.origin_data.div(base[i]).log(basex[i]).floor().add(1));
		let cap = [N(100), N(100), N(30), N(30)];
		for(let i = 0;i < 4;i++) player.origin_upg[i] = player.origin_upg[i].min(cap[i]);
	}
	
	if(player.permupg.includes(27))
	{
		buymaxgn();
		buymaxsn();
	}
	
	if(player.permupg.includes(34))
	{
		for(let i = 0;i < getfreepermupg();i++)
		{
			if(!player.permupg.includes(i) && !getdisablepermupg(i)) player.permupg.push(i);
		}
	}
	
	if(player.permupg.includes(36))
	{
		buymaxdim();
		buymaxalgor();
	}
	
	if(player.permupg.includes(38)) buymaxalgorrebuy();
	
	if(hasvoidupg(4)) player.suppdata = player.suppdata.max(getvoidupgeffect(4));
	
	if(player.PL2upg[0])
	{
		player.PL1info = player.PL1info.add(PL1infoget.mul(tickmult));
	}
	if(player.PL2upg[2])
	{
		player.PL2info = player.PL2info.add(PL2infoget.div(player.permupg.includes(18) ? 100 : 10000).mul(tickmult));
	}
	if(hasvoidupg(7))
	{
		player.PL3info = player.PL3info.add(PL3infoget.div(100).mul(tickmult));
	}
	
	if(player.permupg.includes(39) && player.autochaos && PL3infoget.gte(player.autochaosgoal)) buyPL3();
}

var tickmult;

function produce()
{
	if(getexchalopen().includes(1)) player.boost = N(1), player.boost2 = N(0), player.boost3 = N(0);
	for(let i = 0;i < player.permupg.length;i++)
	{
		if(getdisablepermupg(player.permupg[i])) player.permupg[i] = undefined;
	}
	if(player.opensupp)
	{
		player.openbh = false;
	}
	if(player.permupg.includes(63)) player.openbh = true;
	
	if(player.last_update > Date.now())
	{
		return;
	}
	
	tickmult = (Date.now() - player.last_update) / 100;
	if(tickmult > 10) tickmult = 10; //max tick length: 1s (anti-changetime before offline progress open)

	if(getofflinelimit() > 0)
	{
		if(Date.now() >= player.last_update + 1000)
		{
			if(player.openoffline) player.offlinetime += (Date.now() - player.last_update);
			player.last_update = Date.now();
			tickmult = 0;
			if(player.offlinetime > getofflinelimit()) player.offlinetime = getofflinelimit();
			return;
		}
	}
	
	if(player.last_update < Date.now()) player.last_update = Date.now();
	
	if(player.offlinetime >= 1000 && player.openoffline)
	{
		let otickmult = tickmult;
		tickmult += player.offlinetime * (1 - Math.pow(0.94, otickmult)) / 100;
		player.offlinetime -= player.offlinetime * (1 - Math.pow(0.94, otickmult));
	}
	else player.offlinetime = 0;
	
	if(tickmult <= 0) return;
	
	updatePLinfoget();
	
	let jdprice = getjdprice();
	let jdx = getjdx();
	let jdunlock = [N(1), N(2), N(4), N(5), N(11), N(12), N(13), N(14)];
	
	let PL3globalspeed = getPL3globalspeed();
	
	for(let i = 7;i >= 1;i--)
	{
		if(player.boost.gte(jdunlock[i]))
		{
			player.jdnum[i - 1] = player.jdnum[i - 1].add(player.jdnum[i].mul(jdx[i]).div(10).mul(PL3globalspeed).mul(tickmult));
		}
	}
	if(player.boost.gte(jdunlock[0]))
	{
		let datagen = player.jdnum[0].mul(jdx[0]);
		if(datagen.gte(getdataspillstart())) datagen = datagen.root(getdataspillroot(datagen));
		player.data = player.data.add(datagen.div(10).mul(PL3globalspeed).mul(tickmult));
	}
	if(player.PL2unlock)
	{
		let snx = getsnx();
		for(let i = 7;i >= 1;i--)
		{
			player.star_node[i - 1] = player.star_node[i - 1].add(player.star_node[i].mul(snx[i]).div(10).mul(PL3globalspeed).mul(tickmult));
		}
		player.star = player.star.add(player.star_node[0].mul(snx[0]).div(10).mul(PL3globalspeed).mul(tickmult));
	}
	if(player.PL2upg[2])
	{
		let gnx = getgnx();
		for(let i = 7;i >= 1;i--)
		{
			player.godnode[i - 1] = player.godnode[i - 1].add(player.godnode[i].mul(gnx[i]).div(10).mul(PL3globalspeed).mul(tickmult));
		}
		player.godstar = player.godstar.add(player.godnode[0].mul(gnx[0]).div(10).mul(PL3globalspeed).mul(tickmult));
	}
	
	if(player.PL1upg[7])
	{
		let slice_gen = N(0.05);
		if(!player.slice.gte(1e7)) slice_gen = slice_gen.mul(player.slice.div(600).root(1.25).max(1));
		else slice_gen = slice_gen.mul(player.slice.min('ee6').div(1e7).pow(0.8).mul(1e7).div(600).root(1.25).max(1));
		
		//mul
		if(player.boost.gte(67)) slice_gen = slice_gen.mul(player.PL1info.add(10).log(2).root(1.5));
		if(player.boost2.gte(25)) slice_gen = slice_gen.mul(5000);
		slice_gen = slice_gen.mul(N(1.5).pow(player.sliceupg_rep[0]));
		if(player.origin_data.gte(100) && !(player.openchal && player.chalpara.includes(2))) slice_gen = slice_gen.mul(player.origin_data.sub(100).max(1).pow(1.15).div(100).max(1));
		if(player.star.gte(1e50)) slice_gen = slice_gen.mul(player.permupg.includes(6) ? player.star.add(1).root(4.5) : player.star.add(10).log10().pow(1.75));
		if(player.godstar.gte(1e140)) slice_gen = slice_gen.mul(player.godstar.div(1e120).root(4).div(100).sub(999).min(N(1e50).add(player.permupg.includes(50) ? player.godstar.log(1.0001).pow(1000) : 0)));
		//pow
		
		if(slice_gen.gte(5e8) && !player.PL2tms.gte(15)) slice_gen = N(5e8).mul(slice_gen.div(5e8).pow(0.75));
		if(slice_gen.gte(1e130)) slice_gen = N(1e130).mul(N(10).pow(slice_gen.div(1e130).log10().pow(N(1).div(N(2).mul(player.entropy[3].gte(1.062) ? N(1).sub(player.entropy[3].mul(0.16)).max(0.2) : 1)))));
		//beforesoftcap
		if(player.permupg.includes(49)) slice_gen = slice_gen.pow(1.5);
		
		player.slice = player.slice.add(slice_gen.mul(PL3globalspeed).mul(tickmult));
	}
	
	if(player.unlock_origin)
	{
		let odg = N(0);
		odg = odg.add(player.origin_upg[0].mul(0.1));
		odg = odg.add(player.origin_upg[1].mul(3));
		odg = odg.mul(N(1.5).pow(player.origin_upg[2]));
		odg = odg.mul(N(2.5).pow(player.origin_upg[3]));
		odg = odg.mul(N(5).pow(player.origin_upg[4]));
		if(player.boost.gte(120)) odg = odg.mul(5);
		if(player.boost2.gte(34)) odg = odg.mul(N(1).add(player.slice.log(2).div(30)));
		if(player.origin_data.gte(5e12) && !(player.openchal && player.chalpara.includes(2))) odg = odg.mul(player.origin_data.div(1.25e12).log(4).max(1));
		if(player.entropy[3].gte(1)) odg = odg.mul(N(1000).pow(player.entropy[3].pow(1.25)));
		if(player.godstar.gte(1e13)) odg = odg.mul(player.godstar.div(1e9).sub(9999).root(1.25).max(1).min('e1800'));
		if(player.permupg.includes(7)) odg = odg.mul(player.PL1info.pow(25).add(1.05).log(1.05).pow(1.15));
		if(player.exchal[3].gte(1)) odg = odg.mul(exchal[3].effect());
		player.origin_data = player.origin_data.add(odg.div(10).mul(PL3globalspeed).mul(tickmult));
	}
	
	if(player.permupg.includes(24))
	{
		let adg = getalgordatagen();
		if((player.exchal[1].gte(1) && adg.gte(getalgordataspillstart())) || (!player.exchal[1].gte(1) && player.algordata.gte(getalgordataspillstart()))) adg = adg.root(getalgordataspillroot(adg));
		if(adg.gte(getalgordataspill2start())) adg = adg.root(getalgordataspill2root(adg));
		player.algordata = player.algordata.add(adg.mul(PL3globalspeed).mul(tickmult));
	}
	
	if(player.permupg.includes(43))
	{
		let lim = getreactparalim();
		player.reactpara[1] = player.reactpara[1].add(player.reactpara[0].sub(lim[0].div(2)).div(10)).min(lim[1]).max(0);
		player.reactpara[2] = player.reactpara[2].add(player.reactpara[1].sub(lim[1].div(2)).div(10)).max(0);
		let reactspeed = N(1);
		if(player.elements >= 1) reactspeed = reactspeed.mul(player.PL3info.add(1).log(2).add(1));
		if(player.elements >= 3) reactspeed = reactspeed.mul(player.data.add(10).log(10).add(10).log(10));
		if(player.colldata.gte('e330')) reactspeed = reactspeed.mul(player.colldata.add(10).log10().sub(330).pow(2));
		
		if(player.elements >= 6) reactspeed = reactspeed.mul(getPL3globalspeed().root(1.5));
		player.reactpara[3] = player.reactpara[3].add(player.reactpara[2].pow(player.reactpara[2].gte(1) ? 3 : 1).div(10).mul(reactspeed));
		if(player.reactpara[2].gte(lim[2]))
		{
			player.reactpara = [N(0), N(0), N(0), N(0)];
		}
		if(player.reactpara[3].gte(lim[3]))
		{
			if(player.permupg.includes(48) && player.openelements)
			{
				player.reactpara = [N(0), N(0), N(0), N(0)];
				page = 6;
				subpage = 3;
				player.elements++;
				player.openelements = false;
			}
			else
			{
				player.reactpara = [N(0), N(0), N(0), N(0)];
				player.chaosshard = player.chaosshard.add(1);
			}
		}
		
		player.chaosmass = player.chaosmass.add(N(3).pow(player.chaosshard).sub(1).mul(tickmult));
	}
	
	if(player.permupg.includes(55))
	{
		if(!player.openbh || player.permupg.includes(63))
		{
			if(!player.permupg.includes(59))
			{
				player.blackhole = player.blackhole.add(player.data.add(10).log10().add(10).log10().div(10));
				if(player.blackhole.gte(player.data.add(10).log10().add(10).log10()))
				{
					player.blackhole = player.data.add(10).log10().add(10).log10().mul(player.blackhole.div(player.data.add(10).log10().add(10).log10()).pow(0.99));
				}
			}
			else
			{
				let bhn = player.data.add(10).log10().add(10).log10().mul(10);
				if(player.bhupg[0].gte(1)) bhn = bhn.mul(getbhupgeff(0));
				if(player.sing.gte(1e19)) bhn = bhn.mul(player.sing.div(1e18).log10().root(10));
				player.blackhole = bhn.max(player.blackhole);
			}
		}
		if(player.openbh)
		{
			let sig = player.blackhole;
			if(player.bhupg[1].gte(1)) sig = sig.mul(getbhupgeff(1));
			if(hassuppupg(33)) sig = sig.pow(suppupgeffect(33));
			player.sing = player.sing.add(sig.div(10).mul(tickmult));
			if(!player.permupg.includes(59)) player.blackhole = player.blackhole.pow(0.99).mul(0.975).sub(0.1);
			if(!player.blackhole.gte(1)) player.openbh = false;
			//change void
			if(player.sing.gte(getsingcap()))
			{
				player.sing = getsingcap();
			}
		}
	}
	
	if(player.exchal[5].gte(2))
	{
		let cdg = player.suppdata.pow(2);
		if(player.exchal[8].gte(1)) cdg = cdg.mul(exchal[8].effect());
		if(hassuppupg(82)) cdg = cdg.mul(suppupgeffect(82));
		player.colldata = player.colldata.add(cdg.div(10).mul(tickmult));
	}
	
	if(player.data.gte('ee38') || player.suppupg[0].gte(0.01))
	{
		for(let i = 0;i < suppupg.length;i++)
		{
			if(suppupg[i] != undefined && suppupg[i].type == 0 && suppupg[i].unlocked())
			{
				player.suppupg[i] = player.suppupg[i].add(suppupg[i].gain().div(10).mul(tickmult));
			}
		}
	}
	
	if(player.PL4unlock)
	{
		let vdg = getvdataps();
		player.PL4data = player.PL4data.add(vdg.div(10).mul(tickmult));
	}
	
	getentropy();
	
	automation();
}

function is_endgame()
{
	if(player.permupg.includes(66)) return true;
	else return false;
}

function update_ach()
{
	for(let i = 0;i < achievement.length;i++)
	{
		if(!player.ach.includes(i) && achievement[i].done())
		{
			othershine = true;
			player.ach.push(i);
		}
	}
}

var othershine = false;

function hidenode()
{
	player.hidenode = !player.hidenode;
}

function timeshow(time)
{
	let s = '';
	if(time >= 1e20)
	{
		return '很长时间';
	}
	if(time >= 3153600000) s = s + Math.floor(time / 3153600000) + '世纪';
	time -= Math.floor(time / 3153600000) * 3153600000;
	if(time >= 31536000) s = s + Math.floor(time / 31536000) + '年';
	time -= Math.floor(time / 31536000) * 31536000;
	if(time >= 86400) s = s + Math.floor(time / 86400) + '天';
	time -= Math.floor(time / 86400) * 86400;
	if(time >= 3600) s = s + Math.floor(time / 3600) + '小时';
	time -= Math.floor(time / 3600) * 3600;
	if(time >= 60) s = s + Math.floor(time / 60) + '分钟';
	time -= Math.floor(time / 60) * 60;
	s = s + Math.floor(time) + '秒';
	return s;
}

function getdatashow()
{
	let planck = 3.3e-102;
	if(player.data.gte('ee1000')) return '如果你每秒写1个数字，你需要写' + timeshow(player.data.log10().log10()) + '才能写出你的数据的数量级数量。';
	else if(player.data.gte(1e300)) return '如果你每秒写1个数字，你需要写' + timeshow(player.data.log10()) + '才能写出你的数据。';
	else if(player.data.gte(1e81 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(1e81 / planck)) + '个可观测宇宙。';
	else if(player.data.gte(1e48 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(1e48 / planck)) + '立方光年。';
	else if(player.data.gte(3e27 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(3e27 / planck)) + '个太阳。';
	else if(player.data.gte(3e24 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(3e24 / planck)) + '个木星。';
	else if(player.data.gte(4e19 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(4e19 / planck)) + '个月球。';
	else if(player.data.gte(1e18 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(1e18 / planck)) + '个塞德娜。';
	else if(player.data.gte(1e-30 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(1e-30 / planck)) + '个氢原子。';
	else if(player.data.gte(2e-64 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(2e-64 / planck)) + '个顶夸克。';
	else if(player.data.gte(5e-46 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(5e-46 / planck)) + '个质子。';
	else if(player.data.gte(1e-54 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(1e-54 / planck)) + '个电子。';
	else if(player.data.gte(2e-64 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(2e-64 / planck)) + '个顶夸克。';
	else if(player.data.gte(1e-72 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(1e-72 / planck)) + '个电中微子。';
	else return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data) + '个普朗克体积。';
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

if('mag' in player.entropy) player.entropy = [N(0), N(0), N(0), N(0)];
for(let i = 1;i < exchal.length;i++)
{
	if(!player.exchal[i]) player.exchal[i] = N(0);
}
if(player.PL4unlock != true) player.PL4unlock = false;
player.permupg = player.permupg.filter(item => item !== null);

dis_permupgui();
dis_chalui();
dis_exchalui();
dis_suppui();
dis_achievementui();

function getofflinelimit() //ms
{
	if(!hassuppupg(8)) return 0;
	else
	{
		let base = 600000;
		return base;
	}
}

//滚动新闻
var news = {
	0: {text() {return '这是一条不滚动新闻';}},
	1: {text() {return notation(player.data) + '数据？弱爆了';}},
	2: {text() {return '新闻为什么不从左往右走？';}},
	3: {text() {return '原神，启动';}},
	4: {text() {return '史上平衡最差的增量游戏是什么？IMR算什么，IDR才是真神';}},
	5: {text() {return '|0````1````2````2.5``2.9``3.2``3.5``|这是一把被软上限限制的尺子';}},
	6: {text() {return '|0````1````2````2````2````2````2````|这是一把被硬上限限制的尺子';}},
	7: {text() {return '|0````1````1.8``2.3``2.6``2.8``3````|这是一把被渐进限限制的尺子';}},
	8: {text() {return '你难以想象本游戏制造了多少软上限';}},
	9: {text() {return '我被chaos大重置chaos了';}},
	10: {text() {return '本游戏使用HTML/Javascript/CSS编写';}},
	11: {text() {return '美国有硅谷，中国有洛谷';}},
	12: {text() {return '我们为我们的产品质量感到自豪……';}},
	13: {text() {return '本游戏共有七个声望层：世界、宇宙、混沌、虚空、天理、现实、超越';}},
	14: {text() {return '本游戏每个声望层都没有反物质维度的现实层级大';}},
	15: {text() {return '你没有' + notation(player.data) + '数据。';}},
	16: {text() {return '新闻机构瘫痪了';}},
	17: {text() {return '你不知道你在看的新闻都是假新闻吗？';}},
	18: {text() {return '本游戏共有' + newsl + '个滚动新闻';}},
	19: {text() {return '说好了5小时后更新，可是都好几天了！';}},
	20: {text() {return '当你看这条新闻时，你就看过这条新闻了';}},
	21: {text() {return '增量的反义词是减魖';}},
	22: {text() {return '游戏有bug怎么办？只要我们把代码删完，就没有bug了。';}},
	//{text() {return '';}},
};
let newsl = 23;
let wid = window.innerWidth;
let nownews = Math.floor(Math.random() * newsl);
let newsleft = 100;
document.getElementById('newstext').left = '100%';
document.getElementById('newstext').innerHTML = news[nownews].text();
function newsscroll()
{
	newsleft -= 0.2;
	let nowpx = newsleft / 100 * wid;
	if(nowpx < 0 - news[nownews].text().length * 16)
	{
		nownews = Math.floor(Math.random() * newsl);
		document.getElementById('newstext').innerHTML = news[nownews].text();
		newsleft = 100;
	}
	document.getElementById('newstext').style.left = newsleft + '%';
}

setInterval(produce, 100);
setInterval(GUI, 40);
setInterval(data_print, 400);
setInterval(build_permupgui, 100);
setInterval(build_chalui, 100);
setInterval(build_exchalui, 100);
setInterval(build_suppui, 100);
setInterval(newsscroll, 40);

loadVue();