const ascend_tree = {
	11: {
		color: 'red',
		branches: [],
		refuse: [],
		cost: N(1),
		description(){return '降低矩阵节点阶层的冷却时间提升。当前：×' + notation(this.effect());},
		effect(){return N(0.9);},
		posx: 0,
		posy: 0,
		unlock(){return true;},
	},
	21: {
		color: 'red',
		branches: [11],
		refuse: [22],
		cost: N(3),
		description(){return '(与22互斥)增幅第1矩阵节点产能。当前：×' + notation(this.effect());},
		effect(){return N(1e6);},
		posx: -0.5,
		posy: 1,
		unlock(){return player.astree.includes(11);},
	},
	22: {
		color: 'green',
		branches: [11],
		refuse: [21],
		cost: N(3),
		description(){return '(与21互斥)在粒子加速器之外增幅第1传输节点产能。当前：^' + notation(this.effect());},
		effect(){return N(1e18);},
		posx: 0.5,
		posy: 1,
		unlock(){return player.astree.includes(11);},
	},
	31: {
		color: 'red',
		branches: [21, 22],
		refuse: [33],
		cost: N(7),
		description(){return '(与33互斥)虚空信息增幅所有夸克获取。当前：×' + notation(this.effect());},
		effect(){return player.PL4info.add(1).mul(0.04).add(1);},
		posx: -1,
		posy: 2,
		unlock(){return player.astree.includes(11);},
	},
	32: {
		color: 'yellow',
		branches: [21, 22],
		refuse: [],
		cost: N(3),
		description(){return '矩阵数据增幅黑洞充能(上限×2)。当前：×' + notation(this.effect());},
		effect(){return N(1).add(player.arraydata.add(1).log10().root(10).div(5)).min(2);},
		posx: 0,
		posy: 2,
		unlock(){return player.astree.includes(11);},
	},
	33: {
		color: 'green',
		branches: [21, 22],
		refuse: [],
		cost: N(7),
		description(){return '(与31互斥)虚空信息弱化算法购买项超级折算。当前：×' + notation(this.effect());},
		effect(){return N(1).div(player.PL4info.add(1).log10().root(2));},
		posx: 1,
		posy: 2,
		unlock(){return player.astree.includes(11);},
	},
	41: {
		color: 'red',
		branches: [31],
		refuse: [],
		cost: N(4),
		description(){return '因子增幅器底数+0.250。当前：+' + notation(this.effect());},
		effect(){return N(0.25);},
		posx: -1.5,
		posy: 3,
		unlock(){return player.astree.includes(11) && player.SMupg >= 25;},
	},
	42: {
		color: 'yellow',
		branches: [32], 
		refuse: [43],
		cost: N(9),
		description(){return '(与43互斥)增幅虚空数据产能。当前：×' + notation(this.effect());},
		effect(){return N(100);},
		posx: -0.5,
		posy: 3,
		unlock(){return player.astree.includes(11);},
	},
	43: {
		color: 'yellow',
		branches: [32],
		refuse: [42],
		cost: N(9),
		description(){return '(与42互斥)数据增幅虚空数据产能。当前：×' + notation(this.effect());},
		effect(){return player.data.add(10).log10().add(10).log10().sub(308.25).div(2.5).max(1);},
		posx: 0.5,
		posy: 3,
		unlock(){return player.astree.includes(11);},
	},
	44: {
		color: 'green',
		branches: [33],
		refuse: [],
		cost: N(4),
		description(){return '虚空数据增幅混沌以前全局速度。当前：×' + notation(this.effect());},
		effect(){return player.PL4data.add(1).log10().mul(2);},
		posx: 1.5,
		posy: 3,
		unlock(){return player.astree.includes(11) && player.SMupg >= 25;},
	},
};

function gettotasshard()
{
	let base = player.asshard[0].add(player.asshard[1]).add(player.asshard[2]);
	for(let i in player.astree)
	{
		base = base.sub(ascend_tree[player.astree[i]].cost);
	}
	return base;
}

function getasscost(i)
{
	let n = player.asshard[i];
	if(i == 0) return N(10).pow(N(10).pow(N(450).add(n.mul(10))));
	else if(i == 1) return N(10).pow(N(225).add(n.mul(5)));
	else if(i == 2) return N(10).pow(N(10).pow(N(3).add(n)));
}

function getastx(i)
{
	return 200 + 225 * ascend_tree[i].posx;
}

function getasty(i)
{
	return 50 + 175 * ascend_tree[i].posy;
}

function getbranchpara(i, j)
{
	let x1 = getastx(i), x2 = getastx(j);
	let y1 = getasty(i), y2 = getasty(j);
	let cx = (x1 + x2) / 2 - Math.abs(x1 - x2) / 3, cy = (y1 + y2) / 2 + Math.abs(y1 - y2) / 3;
	let deg = (Math.atan(Math.abs(y1 - y2) / (Math.abs(x1 - x2))) * (180 / Math.PI));
	let length = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
	if(x1 < x2) deg = 180 - deg;
	return {cx: cx, cy: cy, deg: deg, length: length};
}

function dis_ascendtreeui()
{
	let ui = '';
	for(let i in ascend_tree)
	{
		ui = ui + '<div id="astreebranch' + i + '">';
		for(let j = 0;j < ascend_tree[i].branches.length;j++)
		{
			let branch = getbranchpara(i, ascend_tree[i].branches[j]);
			ui = ui + '<button class="astbrbt" style="top: ' + branch.cy +'px; left: ' + branch.cx + 'px; width: ' + branch.length + 'px; transform: rotate(' + branch.deg + 'deg);"></button>';
		}
		ui = ui + '</div>';
	}
	for(let i in ascend_tree)
	{
		ui = ui + '<button onclick="buyastree(' + i + ')" id="astreebt' + i + '" class="astbt" style="top: ' + getasty(i) + 'px; left: ' + getastx(i) + 'px">' + i + '<br>{{getastreedescription(' + i + ')}}<br>价格：' + notation(ascend_tree[i].cost, 0) + '飞升碎片</button>';
	}
	document.getElementById('ascend_tree').innerHTML = ui;
}

function getastreedescription(i)
{
	return ascend_tree[i].description();
}

function build_ascendtree()
{
	for(let i in ascend_tree)
	{
		if(player.astree.includes(Number(i)))
		{
			document.getElementById('astreebt' + i).style['border-color'] = ascend_tree[i].color;
			document.getElementById('astreebt' + i).style['box-shadow'] = '0px 0px 24px ' + ascend_tree[i].color;
		}
		else if(gettotasshard().gte(ascend_tree[i].cost) && !assrefuse(i) && !assbrtr(i))
		{
			document.getElementById('astreebt' + i).style['border-color'] = 'white';
			document.getElementById('astreebt' + i).style['box-shadow'] = '0px 0px 24px ' + ascend_tree[i].color;
		}
		else
		{
			document.getElementById('astreebt' + i).style['border-color'] = 'white';
			document.getElementById('astreebt' + i).style['box-shadow'] = '';
		}
		if(ascend_tree[i].unlock() || player.astree.includes(Number(i)))
		{
			document.getElementById('astreebranch' + i).style.display = 'inline-block';
			document.getElementById('astreebt' + i).style.display = 'inline-block';
		}
		else
		{
			document.getElementById('astreebranch' + i).style.display = 'none';
			document.getElementById('astreebt' + i).style.display = 'none';
		}
	}
}

function buyass(i)
{
	if(i == 0 && player.data.gte(getasscost(0))) player.asshard[0] = player.asshard[0].add(1);
	else if(i == 1 && player.PL3info.gte(getasscost(1))) player.asshard[1] = player.asshard[1].add(1);
	else if(i == 2 && player.openstdmod && player.data.gte(getasscost(2))) player.asshard[2] = player.asshard[2].add(1);
	else if(i == 3)
	{
		PL4reset();
		player.astree = [];
	}
}

function assrefuse(i)
{
	for(let j in ascend_tree[i].refuse)
	{
		if(player.astree.includes(ascend_tree[i].refuse[j])) return true;
	}
	return false;
}

function assbrtr(i)
{
	i = Number(i);
	if(ascend_tree[i].branches.length < 1) return false;
	for(let j in ascend_tree[i].branches)
	{
		if(player.astree.includes(ascend_tree[i].branches[j])) return false;
	}
	return true;
}

function buyastree(i)
{
	if(!player.astree.includes(i) && !assrefuse(i) && gettotasshard().gte(ascend_tree[i].cost) && !assbrtr(i))
	{
		player.astree.push(i);
	}
}