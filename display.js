var mouseenterpermupg = -1;

function build_permupgui()
{
	let ui = '';
	if(mouseenterpermupg != -1)
	{
		ui = ui + '<span class="ftsz2">永久升级' + (mouseenterpermupg + 1) + '</span><br>';
		if(getdisablepermupg(mouseenterpermupg)) ui = ui + '<span style="color: red"><strike>';
		ui = ui + '<span style="color: lightblue">' + getpermupgeffect(mouseenterpermupg) + '</span><br>';
		if(getdisablepermupg(mouseenterpermupg)) ui = ui + '</strike></span>';
		ui = ui + '<span class="ftsz2">价格：' + notation(permupgcost[mouseenterpermupg]) + permupgcosttypename[permupgcosttype[mouseenterpermupg]] + '</span><br><br>';
	}
	else ui = ui + '<br><br><br><br>';
	document.getElementById('permupgeffect').innerHTML = ui;
	
	for(let i = 0;i < permupgnum;i++)
	{
		if(permupgcanblock(i)) document.getElementById('permupg' + i).style.display = 'block';
		else document.getElementById('permupg' + i).style.display = 'none';
		
		if(player.permupg.includes(i))
		{
			if(permupgcosttype[i] == 0) document.getElementById('permupg' + i).style['background-color'] = 'purple';
			else if(permupgcosttype[i] == 1) document.getElementById('permupg' + i).style['background-color'] = 'orange';
			else if(permupgcosttype[i] == 2) document.getElementById('permupg' + i).style['background-color'] = 'red';
			else if(permupgcosttype[i] == 3) document.getElementById('permupg' + i).style['background-color'] = 'gold';
			else if(permupgcosttype[i] == 4) document.getElementById('permupg' + i).style['background-color'] = '#ffcc00';
			else if(permupgcosttype[i] == 5) document.getElementById('permupg' + i).style['background-color'] = 'white';
			
			if(permupgcosttype[i] == 5) document.getElementById('permupg' + i).style.color = 'black';
			else document.getElementById('permupg' + i).style.color = 'white';
		}
		else if(player[permupgcosttypeinternal[permupgcosttype[i]]].gte(permupgcost[i]))
		{
			document.getElementById('permupg' + i).style['background-color'] = '#666666';
			document.getElementById('permupg' + i).style['color'] = 'white';
		}
		else
		{
			document.getElementById('permupg' + i).style['background-color'] = 'black';
			document.getElementById('permupg' + i).style['color'] = 'white';
		}
		
		
		if(getdisablepermupg(i))
		{
			document.getElementById('permupg' + i).style['border-color'] = 'white';
			document.getElementById('permupg' + i).style['background-color'] = 'black';
			document.getElementById('permupg' + i).style['color'] = 'black';
		}
		else
		{
			document.getElementById('permupg' + i).style['border-color'] = 'white';
		}
	}
}

function dis_permupgui()
{
	let ui = '';
	ui = ui + '<table>';
	for(let i = 0;i < permupgnum;i++)
	{
		ui = ui + '<td><button id=\"permupg' + i + '\" class=\"permupg\" onclick="buypermupg(' + i + ');" onmouseenter=\"mouseenterpermupg = ' + i + ';\"';
		
		ui = ui + '>' + (i + 1);
		ui = ui + '</button></td>';
		if(i % 10 == 9)
		{
			ui = ui + '<tr>';
		}
		
	}
	ui = ui + '</table>';
	document.getElementById('permupg').innerHTML = ui;
}

function build_chalui()
{
	for(let i = 0;i < chalparanum;i++)
	{
		if(player.chalpara.includes(i) && player.openchal) document.getElementById('chalpara' + i).style['background-color'] = 'green';
		else if(player.chalpara.includes(i)) document.getElementById('chalpara' + i).style['background-color'] = 'blue';
		else document.getElementById('chalpara' + i).style['background-color'] = 'darkred';
		document.getElementById('chalpara' + i).innerHTML = getchalparatext(i);
	}
	for(let i = 0;i < getchallayerunlock();i++)
	{
		document.getElementById('challayer' + i).style.display = 'block';
		document.getElementById('challayert' + i).style.display = 'block';
	}
	for(let i = getchallayerunlock();i < challayernum;i++)
	{
		document.getElementById('challayer' + i).style.display = 'none';
		document.getElementById('challayert' + i).style.display = 'none';
	}
	if(player.openchal) document.getElementById('openchal').style['background-color'] = 'red';
	else document.getElementById('openchal').style['background-color'] = 'black';
}

function dis_chalui()
{
	let ui = '';
	ui = ui + '<table>';
	let nowparaid = 0;
	for(let i = 0;i < challayernum;i++)
	{
		ui = ui + '<td style="width: 50px;"><span class="ftsz2" id="challayert' + i + '">阶层' + (i + 1) + '</td>';
		ui = ui + '<td align="center" id="challayer' + i + '"><table>';
		for(let j = 0;j < challayerhaspara[i];j++)
		{
			ui = ui + '<td><button class="chalpara" id="chalpara' + nowparaid + '" onclick="changechalpara(' + nowparaid +')"></button></td>';
			nowparaid++;
		}
		ui = ui + '</table></td><tr>';
	}
	document.getElementById('challenge_detail').innerHTML = ui;
}

var nowclickexchal = 0;

function build_exchalui()
{
	let exchaltext = '';
	if(nowclickexchal != 0)
	{
		exchaltext += '奇异挑战' + nowclickexchal + ': ' + exchal[nowclickexchal].name + '(' + player.exchal[nowclickexchal] + '/' + exchal[nowclickexchal].maxcancomp() + ')';
		if(getexchalopen().includes(nowclickexchal)) exchaltext += '[+' + exchal[nowclickexchal].cancomp() + ']';
		exchaltext += '<br><span style="color: green">内容：' + exchal[nowclickexchal].description + '</span><br>';
		exchaltext += '<span style="color: gold">目标：' + notation(exchal[nowclickexchal].goal(player.exchal[nowclickexchal])) + '数据</span><br>';
		exchaltext += '<span style="color: ' + (player.exchal[nowclickexchal] >= 1 ? 'green' : 'grey') + '">奖励：<br>' + exchal[nowclickexchal].effectdisplay() + '</span><br>';
	}
	document.getElementById('exchaltext').innerHTML = exchaltext;
	for(let i = 1;i < exchal.length;i++) document.getElementById('exchal' + i).style['box-shadow'] = '';
	let o = getexchalopen();
	for(let i = 0;i < o.length;i++)  document.getElementById('exchal' + o[i]).style['box-shadow'] = '0px 0px 10px white';
	for(let i = 1;i < exchal.length;i++)
	{
		document.getElementById('exchalcompinfo' + i).innerHTML = player.exchal[i] + '/' + exchal[i].maxcancomp();
		if(getexchalunlock(i)) document.getElementById('exchalcompinfo' + i).style.display = 'block';
		else document.getElementById('exchalcompinfo' + i).style.display = 'none';
	}
	for(let i = 1;i < exchal.length;i++)
	{
		if(getexchalunlock(i)) document.getElementById('exchal' + i).style.display = 'block';
		else document.getElementById('exchal' + i).style.display = 'none';
	}
	if(player.openexchal != 0) document.getElementById('closeexchal').style['opacity'] = '1';
	else document.getElementById('closeexchal').style['opacity'] = '0.3';
}

function dis_exchalui()
{
	let ui = '<table align="center">';
	for(let i = 1;i < exchal.length;i++)
	{
		let bgc, bdc;
		if(exchal[i].layer == 'chaos') bgc = '#770', bdc = '#990';
		else if(exchal[i].layer == 'void') bgc = '#777', bdc = '#fff';
		ui += '<td><p align="center"><button id="exchal' + i + '"class="exchal" onclick="if(nowclickexchal != ' + i + ') {nowclickexchal = ' + i + ';} else {openexchal(' + i + ')}"style="background-color: ' + bgc + '; border-color: ' + bdc + '">Ex' + i + '</button>';
		ui += '<span class="ftsz2" id="exchalcompinfo' + i + '"></span></p></td>';
		if(i < exchal.length - 1 && exchal[i].layer != exchal[i + 1].layer)
		{
			ui += '<tr>';
		}
	}
	ui += '</table><br><span style="font-size: 20px; color: white;" id="exchaltext"></span>';
	document.getElementById('exchal_detail').innerHTML = ui;
}

function dis_suppui()
{
	let ui = '<table>';
	for(let i = 0;i < suppupg.length;i++)
	{
		if(suppupg[i] != undefined)
		{
			ui += '<td id="suppupgtd' + i + '"><button class="suppupgbt" id="suppupg' + i + '" onclick="buysuppupg(' + i + ')" style="border-color: ' + (suppupg[i].color == 'black' ? 'white' : suppupg[i].color) + '">';
			ui += '</button></td>';
			
			if(player.suppupg[i] == undefined)
			{
				if(suppupg[i].type == 0 || suppupg[i].type == 2) player.suppupg[i] = N(0);
				else player.suppupg[i] = false;
			}
		}
		if(i % 5 == 4)
		{
			let flag = false;
			for(let j = 1;j <= 5;j++)
			{
				if(suppupg[i + j] != undefined) flag = true;
			}
			if(flag) ui += '<tr>';
		}
	}
	ui += '</table>';
	document.getElementById('suppupg_detail').innerHTML = ui;
}

function build_suppui()
{
	for(let i = 0;i < suppupg.length;i++)
	{
		if(suppupg[i] != undefined)
		{
			if(suppupg[i].unlocked()) document.getElementById('suppupgtd' + i).style.display = 'inline-block';
			else document.getElementById('suppupgtd' + i).style.display = 'none';
			document.getElementById('suppupg' + i).style['background-color'] = (!hassuppupg(i)
			? (suppupg[i].type == 2 ? (suppupgcanbuy(i).sub(player.suppupg[i]).gte(1) ? 'grey' : 'black') : (suppupgcanbuy(i) ? 'grey' : 'black'))
			: (suppupg[i].type == 2 ? (suppupgcanbuy(i).sub(player.suppupg[i]).gte(1) ? 'grey' : 'black') : suppupg[i].color));
			if(document.getElementById('suppupg' + i).style['background-color'] == 'white') document.getElementById('suppupg' + i).style['color'] = 'black';
			else document.getElementById('suppupg' + i).style['color'] = 'white';
			if(suppupg[i].type == 2) document.getElementById('suppupg' + i).innerHTML = (suppupg[i].name + '<br>' + suppupg[i].description()
			+ '<br>等级' + notation(suppupglevel(i), 0) + (suppupg[i].extralevel().gte(0.01) ? ('+' + notation(suppupg[i].extralevel())) : '') + '<br>价格 ' + notation(suppupgcost(i)) + suppupg[i].moneyname);
			else if(suppupg[i].type == 1) document.getElementById('suppupg' + i).innerHTML = (suppupg[i].name + '<br>' + suppupg[i].description()
			+ '<br>价格 ' + notation(suppupgcost(i)) + suppupg[i].moneyname);
			else document.getElementById('suppupg' + i).innerHTML = (suppupg[i].name + '<br>' + notation(player.suppupg[i]) + '<br>+' + notation(suppupg[i].gain()) + '/s');
			if(suppupg[i].type == 2 && suppupg[i].autobuy())
			{
				buymaxsuppupg(i);
			}
		}
	}
}

function GUI()
{
	update_ach();
	updatePLinfoget();
	
	let max_page_has_spage = 5;
	
	for(let i = 1;i <= 13;i++)
	{
		if(page == i) document.getElementById('page' + i).style.display = 'block';
		else document.getElementById('page' + i).style.display = 'none';
	}
	
	if(othershine) document.getElementById('pagebt11').style.animation = 'flash-red 1s infinite';
	else document.getElementById('pagebt11').style.animation = 'flash-red 1s 0';
	if(page == 11) othershine = false;
	
	for(let i = 1;i <= max_page_has_spage;i++)
	{
		if(document.getElementById('spage' + i + '_' + page) != undefined)
		{
			if(subpage == i) document.getElementById('spage' + i + '_' + page).style.display = 'block';
			else document.getElementById('spage' + i + '_' + page).style.display = 'none';
		}	
	}
	if(player.PL1unlock) document.getElementById('PL1pbt').style.display = 'inline-block';
	else document.getElementById('PL1pbt').style.display = 'none';
	if(player.PL2unlock) document.getElementById('PL2pbt').style.display = 'inline-block';
	else document.getElementById('PL2pbt').style.display = 'none';
	if(player.PL3unlock) document.getElementById('PL3pbt').style.display = 'inline-block';
	else document.getElementById('PL3pbt').style.display = 'none';
	if(player.PL4unlock) document.getElementById('PL4pbt').style.display = 'inline-block';
	else document.getElementById('PL4pbt').style.display = 'none';
	document.getElementById('PL5pbt').style.display = 'none';
	document.getElementById('PL6pbt').style.display = 'none';
	document.getElementById('PL7pbt').style.display = 'none';
	if(player.openstdmod) document.getElementById('Stdmodpbt').style.display = 'inline-block';
	else document.getElementById('Stdmodpbt').style.display = 'none';
	if(player.sliceupg[3]) document.getElementById('PL2bt').style.display = 'block';
	else document.getElementById('PL2bt').style.display = 'none';
	if(player.permupg.includes(29)) document.getElementById('PL3bt').style.display = 'block';
	else document.getElementById('PL3bt').style.display = 'none';
	if(player.exchal[8].gte(25) || player.PL4unlock) document.getElementById('PL4bt').style.display = 'block';
	else document.getElementById('PL4bt').style.display = 'none';
	
	if(player.PL1upg[7]) document.getElementById('spagebt2_4').style.display = 'inline-block';
	else document.getElementById('spagebt2_4').style.display = 'none';
	
	if(player.PL2unlock) document.getElementById('spagebt2_1').style.display = 'inline-block';
	else document.getElementById('spagebt2_1').style.display = 'none';
	
	if(player.PL2tms.gte(25)) document.getElementById('spagebt4_3').style.display = 'inline-block';
	else document.getElementById('spagebt4_3').style.display = 'none';
	
	if(player.PL2tms.gte(35)) document.getElementById('spagebt2_5').style.display = 'inline-block';
	else document.getElementById('spagebt2_5').style.display = 'none';
	
	if(player.PL2upg[2]) document.getElementById('spagebt4_5').style.display = 'inline-block';
	else document.getElementById('spagebt4_5').style.display = 'none';
	
	if(player.PL2upg[3]) document.getElementById('spagebt3_1').style.display = 'inline-block';
	else document.getElementById('spagebt3_1').style.display = 'none';
	
	if(player.permupg.includes(14)) document.getElementById('spagebt2_2').style.display = 'inline-block';
	else document.getElementById('spagebt2_2').style.display = 'none';
	
	if(player.permupg.includes(43)) document.getElementById('spagebt2_6').style.display = 'inline-block';
	else document.getElementById('spagebt2_6').style.display = 'none';
	
	if(player.permupg.includes(48)) document.getElementById('spagebt3_6').style.display = 'inline-block';
	else document.getElementById('spagebt3_6').style.display = 'none';
	
	if(player.permupg.includes(55)) document.getElementById('spagebt4_6').style.display = 'inline-block';
	else document.getElementById('spagebt4_6').style.display = 'none';
	
	if(player.permupg.includes(58)) document.getElementById('spagebt3_2').style.display = 'inline-block';
	else document.getElementById('spagebt3_2').style.display = 'none';
	
	if(player.exchal[5].gte(2)) document.getElementById('spagebt5_6').style.display = 'inline-block';
	else document.getElementById('spagebt5_6').style.display = 'none';
	
	if(player.permupg.includes(66)) document.getElementById('spagebt2_7').style.display = 'inline-block';
	else document.getElementById('spagebt2_7').style.display = 'none';
	
	if(getofflinelimit() > 0 && player.offlinetime >= 1000)
	{
		document.getElementById('offline').style.display = 'block';
		document.getElementById('offline').innerHTML = '离线时间正在加成超越以前全局速度，当前剩余' + timeshow(Math.floor(player.offlinetime / 1000)) + '(上限在' + timeshow(Math.floor(getofflinelimit() / 1000)) + ')离线时间。';
	}
	else document.getElementById('offline').style.display = 'none';
	
	if(getofflinelimit() > 0)
	{
		if(player.openoffline) document.getElementById('offlinebt').innerHTML = '离线进度已开启';
		else document.getElementById('offlinebt').innerHTML = '离线进度已关闭';
	}
	else document.getElementById('offlinebt').innerHTML = '暂未解锁离线进度';
	
	if(Date.now() < player.last_update)
	{
		document.getElementById('offline').style.display = 'block';
		document.getElementById('offline').innerHTML = '<span style="color: red; text-shadow: 6px 6px 10px red; -6px -6px 10px red;">您从' + timeshow(Math.floor((player.last_update - Date.now()) / 1000)) + '后穿越了回来！';
	}
	
	document.getElementById('datashow').innerHTML = getdatashow();
	document.getElementById('PL3infottl').innerHTML = notation(player.PL3infottl, 0);
	document.getElementById('PL3infoeffect').innerHTML = getPL3infoeffect();
	//document.getElementById('PL4tms').innerHTML = notation(player.PL4tms);
	
	let jdx = getjdx();
	let datagen = player.jdnum[0].mul(jdx[0]);
	
	document.getElementById('slice').innerHTML = notation(player.slice, 0);
	document.getElementById('slice_effect').innerHTML = notation(getsliceeffect());
	for(let i = 0;i < 3;i++)
	{
		sbc[i] += sbct[i];
		if(sbc[i] < 0) sbc[i] = 0, sbct[i] = ((-sbct[i]) + 1) % 3;
		else if(sbc[i] > 255) sbc[i] = 255, sbct[i] = ((-sbct[i]) - 1) % 3;
	}
	for(let xm = 1;xm < 9;xm++) document.getElementById('slicebt' + xm).style['border-color'] = 'rgb(' + sbc[0] + ',' + sbc[1] + ',' + sbc[2] + ')';
	if(player.boost.gte(20000)) document.getElementById('boostscaling').innerHTML = '究极折算|';
	else if(player.boost.gte(10)) document.getElementById('boostscaling').innerHTML = '超级折算|';
	else document.getElementById('boostscaling').innerHTML = '';
	document.getElementById('boostscalingeffect').innerHTML = notation(getboostzs1x(), 3);
	document.getElementById('boostscaling2effect').innerHTML = notation(getboostzs2x(), 3);
	if(player.boost.gte(20000)) document.getElementById('boostscal2').style.display = 'block';
	else document.getElementById('boostscal2').style.display = 'none';
	document.getElementById('unlock_origin').style.display = (player.unlock_origin ? 'block' : 'none');
	document.getElementById('uunlock_origin').style.display = (!player.unlock_origin ? 'block' : 'none');
	document.getElementById('origin_data').innerHTML = notation(player.origin_data, 0);
	document.getElementById('origin_effect').innerHTML = getorigineffect();
	
	document.getElementById('dim').innerHTML = notation(player.dimension, 0);
	document.getElementById('dimcost').innerHTML = notation(getdimcost());
	document.getElementById('star').innerHTML = notation(player.star, 0);
	document.getElementById('godstar').innerHTML = notation(player.godstar, 0);
	document.getElementById('stareffect').innerHTML = getstareffect();
	document.getElementById('godstareffect').innerHTML = getgodstareffect();
	if(player.PL2info.gte(getdimcost()))
	{
		document.getElementById('dimbt').style['background-color'] = '#666666';
	}
	else
	{
		document.getElementById('dimbt').style['background-color'] = 'black';
	}
	let PL2mlst_num = 8;
	let PL2mlst_dis = [N(1), N(2), N(4), N(7), N(10), N(15), N(25), N(35)];
	for(let i = 0;i < PL2mlst_num;i++)
	{
		if(player.PL2tms.gte(PL2mlst_dis[i]))
		{
			document.getElementById('PL2mlst' + i).style['background-color'] = 'purple';
			document.getElementById('PL2mlst' + i).style['border-color'] = 'white';
			document.getElementById('PL2mlst' + i).style['color'] = 'white';
		}
		else
		{
			document.getElementById('PL2mlst' + i).style['background-color'] = 'white';
			document.getElementById('PL2mlst' + i).style['border-color'] = 'purple';
			document.getElementById('PL2mlst' + i).style['color'] = 'black';
		}
	}
	document.getElementById('chalcompeffect').innerHTML = getchalcompeffect();
	
	let boostcost = getboostcost();
	let boost2cost = getboost2cost();
	let boost3cost = getboost3cost();
	let jdcost = getjdprice();
	let jdunlock = [N(1), N(2), N(4), N(5), N(11), N(12), N(13), N(14)];
	document.getElementById('boosteffect').innerHTML = getboosteffect(player.boost);
	document.getElementById('boost2effect').innerHTML = getboost2effect(player.boost2);
	document.getElementById('boost3effect').innerHTML = getboost3effect(player.boost3);
	let beff = '', b2eff = '', b3eff = '';
	for(let i = 0;i < boosteffectnum;i++)
	{
		if(player.boost.gte(boosteffectlist[i])) beff = beff + getboosteffect(boosteffectlist[i].sub(1)) + '<br/>';
	}
	for(let i = 0;i < boost2effectnum;i++)
	{
		if(player.boost2.gte(boost2effectlist[i])) b2eff = b2eff + getboost2effect(boost2effectlist[i].sub(1)) + '<br/>';
	}
	for(let i = 0;i < boost3effectnum;i++)
	{
		if(player.boost3.gte(boost3effectlist[i])) b3eff = b3eff + getboost3effect(boost3effectlist[i].sub(1)) + '<br/>';
	}
	document.getElementById('boosteffectlist').innerHTML = beff;
	document.getElementById('boost2effectlist').innerHTML = b2eff;
	document.getElementById('boost3effectlist').innerHTML = b3eff;
	if(player.autoboost) document.getElementById('autoboostbts').innerHTML = '自动购买：开';
	else document.getElementById('autoboostbts').innerHTML = '自动购买：关';
	if(player.autoboost2) document.getElementById('autoboost2bts').innerHTML = '自动购买：开';
	else document.getElementById('autoboost2bts').innerHTML = '自动购买：关';
	if(player.autoboost3) document.getElementById('autoboost3bts').innerHTML = '自动购买：开';
	else document.getElementById('autoboost3bts').innerHTML = '自动购买：关';
	if(player.PL1upg[4]) document.getElementById('autoboostbt').style.display = 'block';
	else document.getElementById('autoboostbt').style.display = 'none';
	if(player.sliceupg[0]) document.getElementById('autoboost2bt').style.display = 'block';
	else document.getElementById('autoboost2bt').style.display = 'none';
	if(player.PL2upg[1]) document.getElementById('autoboost3bt').style.display = 'block';
	else document.getElementById('autoboost3bt').style.display = 'none';
	document.getElementById('buyjdeffect').innerHTML = notation(getbuyjdeffect());
	for(let i = 0;i < 8;i++)
	{
		let scs = getjdscs(i);
		let scx = getjdscx(i);
		for(let j = 0;j < 8;j++) document.getElementById('jdscs' + (j + 1)).innerHTML = notation(scs[j]);
		for(let j = 0;j < 8;j++) document.getElementById('jdscx' + (j + 1)).innerHTML = notation(scx[j]);
		let jdx = getjdx();
		let zscolor = ['#ff0000', '#aa2200', '#22aa00', '#00ff00', '#00aa22', '#0022aa', '#0000ff', '#2200aa'];
		let zstext = ['一阶软上限', '二阶软上限', '三阶软上限', '四阶软上限', '五阶软上限', '六阶软上限', '七阶软上限', '八阶软上限'];
		document.getElementById('jdzs' + (i + 1)).innerHTML = '';
		document.getElementById('jdzs' + (i + 1)).style['color'] = '#ffffff';
		let now_x = getbuyjdeffect().pow(player.buyjd[i]);
		for(let j = 0;j < 4;j++)
		{
			if(now_x.gte(scs[j]))
			{
				document.getElementById('jdzs' + (i + 1)).innerHTML = zstext[j];
				document.getElementById('jdzs' + (i + 1)).style['color'] = zscolor[j];
				now_x = scs[j].mul(now_x.div(scs[j]).pow(scx[j]));
			}
		}
		let jd_x = getjdx();
		for(let j = 4;j < 8;j++)
		{
			let jd_xi = jd_x[i];
			if(jd_xi.gte(N(10).pow(scs[j])))
			{
				document.getElementById('jdzs' + (i + 1)).innerHTML = zstext[j];
				document.getElementById('jdzs' + (i + 1)).style['color'] = zscolor[j];
				jd_xi = (N(10).pow(scs[j])).mul(N(10).pow(jd_xi.log10().div(scs[j]).pow(scx[j])));
			}
		}
		if(player.boost.gte(jdunlock[i]))
		{
			document.getElementById('unlockjd' + (i + 1)).style.display = 'block';
		}
		else
		{
			document.getElementById('unlockjd' + (i + 1)).style.display = 'none';
		}
		document.getElementById('jdnum' + (i + 1)).innerHTML = notation(player.jdnum[i], 1);
		document.getElementById('jdbuy' + (i + 1)).innerHTML = notation(player.buyjd[i].add(player.permupg.includes(24) ? getalgoreffect() : 0), 0);
		document.getElementById('jdx' + (i + 1)).innerHTML = notation(jdx[i], 2);
		document.getElementById('jdcost' + (i + 1)).innerHTML = notation(jdcost[i], 0);
		if(player.data.gte(jdcost[i])) document.getElementById('jdbuybt' + (i + 1)).style['background-color'] = '#666666';
		else document.getElementById('jdbuybt' + (i + 1)).style['background-color'] = '#000000';
		
		if(player.autobuyjd[i]) document.getElementById('autobuyjds' + (i + 1)).innerHTML = '自动购买：开';
		else document.getElementById('autobuyjds' + (i + 1)).innerHTML = '自动购买：关';
		if(player.PL1upg[0]) document.getElementById('autobuyjdbt' + (i + 1)).style.display = 'block';
		else document.getElementById('autobuyjdbt' + (i + 1)).style.display = 'none';
	}
	if(player.PL1upg[7])
	{
		for(let i = 0;i < 4;i++)
		{
			if(player.sliceupg_rep[i].gte(200)) document.getElementById('slicebt' + (i + 1)).style['background-color'] = 'green';
			else document.getElementById('slicebt' + (i + 1)).style['background-color'] = 'black';
			document.getElementById('sliceupgcost' + (i + 1)).innerHTML = notation(sliceupgcost[i].pow(player.sliceupg_rep[i].add(1)), 0);
			document.getElementById('sliceupglevel' + (i + 1)).innerHTML = notation(player.sliceupg_rep[i], 0);
		}
		for(let i = 4;i < 8;i++)
		{
			if(player.sliceupg[i - 4]) document.getElementById('slicebt' + (i + 1)).style['background-color'] = 'green';
			else document.getElementById('slicebt' + (i + 1)).style['background-color'] = 'black';
			document.getElementById('sliceupgcost' + (i + 1)).innerHTML = notation(sliceupgcost[i], 0);
		}
	}
	if(player.PL2unlock)
	{
		for(let i = 0;i < 8;i++)
		{
			let zscolor = ['#ff0000', '#aa2200', '#22aa00', '#00ff00'];
			let zstext = ['一阶软上限', '二阶软上限', '三阶软上限', '四阶软上限'];
			let snx = getsnx();
			let sncost = getsncost(i);
			let scs = getsnscs();
			document.getElementById('snbuy' + (i + 1)).innerHTML = notation(player.buysn[i], 0);
			document.getElementById('sncost' + (i + 1)).innerHTML = notation(getsncost(i), 0);
			document.getElementById('snnum' + (i + 1)).innerHTML = notation(player.star_node[i], 1);
			document.getElementById('snx' + (i + 1)).innerHTML = notation(snx[i], 2);
			if(player.star.gte(sncost))
			{
				document.getElementById('snbuybt' + (i + 1)).style['background-color'] = '#666666';
			}
			else
			{
				document.getElementById('snbuybt' + (i + 1)).style['background-color'] = '#000000';
			}
			document.getElementById('snzs' + (i + 1)).innerHTML = '';
			document.getElementById('snzs' + (i + 1)).style['color'] = 'black';
			for(let j = 0;j < 4;j++)
			{
				if(snx[i].gte(scs[j]))
				{
					document.getElementById('snzs' + (i + 1)).innerHTML = zstext[j];
					document.getElementById('snzs' + (i + 1)).style['color'] = zscolor[j];
				}
			}
		}
	}
	if(player.PL2upg[2])
	{
		for(let i = 0;i < 8;i++)
		{
			let gnx = getgnx();
			let gnc = getgnc();
			if(!player.gnunlock[i]) document.getElementById('unlockgn' + (i + 1)).style.display = 'block', document.getElementById('gnbt' + (i + 1)).style.display = 'none';
			else document.getElementById('unlockgn' + (i + 1)).style.display = 'none', document.getElementById('gnbt' + (i + 1)).style.display = 'block';
			document.getElementById('gn' + (i + 1)).innerHTML = notation(player.godnode[i], 1);
			document.getElementById('gnx' + (i + 1)).innerHTML = notation(gnx[i], 2);
			document.getElementById('gnc' + (i + 1)).innerHTML = notation(gnc[i], 0);
		}
		if(player.permupg.includes(10)) document.getElementById('buymaxgn').style.display = 'block';
		else document.getElementById('buymaxgn').style.display = 'none';
	}
	if(player.data.gte(boostcost))
	{
		document.getElementById('boostbt').style['background-color'] = '#666666';
	}
	else
	{
		document.getElementById('boostbt').style['background-color'] = '#000000';
	}
	if(player.boost.gte(boost2cost))
	{
		document.getElementById('boost2bt').style['background-color'] = '#666666';
	}
	else
	{
		document.getElementById('boost2bt').style['background-color'] = '#000000';
	}
	if(player.PL2tms.gte(25)) document.getElementById('boost3bt').style.display = 'block';
	else document.getElementById('boost3bt').style.display = 'none';
	if(player.boost2.gte(boost3cost))
	{
		document.getElementById('boost3bt').style['background-color'] = '#666666';
	}
	else
	{
		document.getElementById('boost3bt').style['background-color'] = '#000000';
	}
	for(let i = 0;i < 8;i++)
	{
		if(player.PL1upg[i]) document.getElementById('PL1ug' + (i + 1)).style['background-color'] = 'blue';
		else if(player.PL1info.gte(PL1upgcost[i])) document.getElementById('PL1ug' + (i + 1)).style['background-color'] = '#666666';
		else document.getElementById('PL1ug' + (i + 1)).style['background-color'] = '#000000';
	}
	document.getElementById('PL1ug3effect').innerHTML = notation(player.boost.add(1).pow(1.5), 2);
	for(let i = 0;i < 5;i++)
	{
		let cap = [N(100), N(100), N(30), N(30)];
		if(i != 4 && player.origin_upg[i].gte(cap[i])) document.getElementById('originupg' + (i + 1)).style['background-color'] = 'blue';
		else if(player.origin_data.gte(getoriginupgcost(i))) document.getElementById('originupg' + (i + 1)).style['background-color'] = '#666666';
		else document.getElementById('originupg' + (i + 1)).style['background-color'] = 'black';
		document.getElementById('originupgcost' + (i + 1)).innerHTML = notation(getoriginupgcost(i), 0);
		document.getElementById('originupglevel' + (i + 1)).innerHTML = notation(player.origin_upg[i], 1);
	}
	if(player.openentropy) document.getElementById('openentropy').style['background-color'] = 'red';
	else document.getElementById('openentropy').style['background-color'] = 'black';
	for(let i = 0;i < 4;i++)
	{
		document.getElementById('ent' + i).innerHTML = notation(player.entropy[i], 3);
		document.getElementById('entropyeffect' + i).innerHTML = getentropyeffect(i);
	}
	for(let i = 0;i < 4;i++)
	{
		if(player.PL2upg[i]) document.getElementById('PL2upg' + (i + 1)).style['background-color'] = 'purple';
		else if(player.PL2info.gte(PL2upgcost[i])) document.getElementById('PL2upg' + (i + 1)).style['background-color'] = '#666666';
		else document.getElementById('PL2upg' + (i + 1)).style['background-color'] = '#000000';
	}
	for(let i = 0;i < 100;i++)
	{
		if(document.getElementById('ach' + i))
		{
			if(player.ach.includes(i)) document.getElementById('ach' + i).style['background-color'] = 'green';
			else document.getElementById('ach' + i).style['background-color'] = 'darkred';
		}
	}
	player.chalcomp_temp = player.chalcomp;
	if(!player.permupg.includes(24) || !player.hidenode) document.getElementById('normal_node').style.display = 'block';
	else if(player.permupg.includes(24) && player.hidenode) document.getElementById('normal_node').style.display = 'none';
	if(player.permupg.includes(24))
	{
		document.getElementById('algor').style.display = 'block';
		document.getElementById('algornum').innerHTML = notation(player.algor, 0)
		+ (player.permupg.includes(57) ? ' + ' + notation(player.algorrebuy[0].mul(0.25)) : '');
		let adg = getalgordatagen();
		document.getElementById('algorcost').innerHTML = notation(getalgorcost());
		if(player.PL1info.gte(getalgorcost()))
		{
			document.getElementById('algorbt').style['background-color'] = '#666666';
		}
		else
		{
			document.getElementById('algorbt').style['background-color'] = 'black';
		}
		if(player.algor.gte(3000)) document.getElementById('algorscal').innerHTML = '超级折算|';
		else document.getElementById('algorscal').innerHTML = '';
		if(player.permupg.includes(29))
		{
			document.getElementById('algorrebuy1bt').style.display = 'block';
			document.getElementById('algorrebuy2bt').style.display = 'block';
			document.getElementById('algorrebuy1cost').innerHTML = notation(getalgorrebuycost(0), 0);
			document.getElementById('algorrebuy2cost').innerHTML = notation(getalgorrebuycost(1), 0);
			document.getElementById('algorrebuy1effect').innerHTML = notation(N(1).add(player.algorrebuy[0].mul(0.05)));
			document.getElementById('algorrebuy2effect').innerHTML = notation(player.algorrebuy[1].mul(0.02));
			document.getElementById('algorrebuy1').innerHTML = notation(player.algorrebuy[0], 0)
			+ (player.permupg.includes(57) ? ' + ' + notation(player.algorrebuy[1].mul(0.5)) : '');
			document.getElementById('algorrebuy2').innerHTML = notation(player.algorrebuy[1], 0);
			if(player.PL1info.gte(getalgorrebuycost(0)))
			{
				document.getElementById('algorrebuy1bt').style['background-color'] = '#666666';
			}
			else
			{
				document.getElementById('algorrebuy1bt').style['background-color'] = 'black';
			}
			if(player.PL1info.gte(getalgorrebuycost(1)))
			{
				document.getElementById('algorrebuy2bt').style['background-color'] = '#666666';
			}
			else
			{
				document.getElementById('algorrebuy2bt').style['background-color'] = 'black';
			}
			if(player.algorrebuy[0].gte(600)) document.getElementById('algorrebuy1scal').innerHTML = '究极折算|';
			else if(player.algorrebuy[0].gte(50)) document.getElementById('algorrebuy1scal').innerHTML = '超级折算|';
			else document.getElementById('algorrebuy1scal').innerHTML = '';
			if(player.algorrebuy[1].gte(300)) document.getElementById('algorrebuy2scal').innerHTML = '究极折算|';
			else if(player.algorrebuy[1].gte(25)) document.getElementById('algorrebuy2scal').innerHTML = '超级折算|';
			else document.getElementById('algorrebuy2scal').innerHTML = '';
		}
		else
		{
			document.getElementById('algorrebuy1bt').style.display = 'none';
			document.getElementById('algorrebuy2bt').style.display = 'none';
		}
	}
	else
	{
		document.getElementById('algor').style.display = 'none';
	}
	
	if(player.permupg.includes(43))
	{
		document.getElementById('chaosshard').innerHTML = notation(player.chaosshard, 0);
		document.getElementById('chaosmass').innerHTML = notation(player.chaosmass, 0);
		document.getElementById('chaosmasseffect').innerHTML = getchaosmasseffect();
		let lim = getreactparalim();
		for(let i = 0;i < 4;i++)
		{
			document.getElementById('reactpara' + i).innerHTML = notation(player.reactpara[i]);
			document.getElementById('reactparalim' + i).innerHTML = notation(lim[i]);
			document.getElementById('reactbar' + i).style.width = 100 - (player.reactpara[i].div(lim[i]).mul(100)) + '%';
		}
		document.getElementById('reactgoal').innerHTML = '混沌碎片';
	}
	
	if(player.permupg.includes(48))
	{
		document.getElementById('startelements').innerHTML = '开始/结束压缩元素' + (player.elements + 1);
		document.getElementById('elementseffect').innerHTML = getelementseffect();
		if(player.openelements) document.getElementById('startelements').style['background-color'] = 'red';
		else document.getElementById('startelements').style['background-color'] = 'black';
		if(player.openelements) document.getElementById('reactgoal').innerHTML = '元素' + (player.elements + 1);
	}
	
	if(player.permupg.includes(39))
	{
		document.getElementById('autochaos').style.display = 'block';
		if(player.autochaos) document.getElementById('autochaosbutton').innerHTML = '更改自动混沌设置<br>当前状态：开启<br>当前目标：' + notation(player.autochaosgoal);
		else document.getElementById('autochaosbutton').innerHTML = '更改自动混沌设置<br>当前状态：关闭';
	}
	else
	{
		document.getElementById('autochaos').style.display = 'none';	
	}
	
	if(player.permupg.includes(55))
	{
		document.getElementById('voidarea').innerHTML = notation(player.voidarea, 0);
		document.getElementById('singnow').innerHTML = notation(player.sing, 0);
		document.getElementById('singcap').innerHTML = notation(getsingcap());
		if(player.opensupp) document.getElementById('blackhole').innerHTML = '已禁用';
		else document.getElementById('blackhole').innerHTML = notation(player.blackhole, 2);
		document.getElementById('bheffect').innerHTML = getbheffect();
		if(player.opensupp) document.getElementById('bhbutton').style['border-color'] = 'red';
		else if(player.openbh) document.getElementById('bhbutton').style['border-color'] = 'gold';
		else document.getElementById('bhbutton').style['border-color'] = 'white';
	}
	
	if(player.exchal[5].gte(2))
	{
		document.getElementById('colldata').innerHTML = notation(player.colldata, 0);
		document.getElementById('colleffect').innerHTML = getcolleffect();
		document.getElementById('suppdata').innerHTML = notation(player.suppdata, 0);
		if(player.opensupp)
		{
			document.getElementById('suppweaken').style.display = 'none';
			document.getElementById('suppget').innerHTML = '+' + notation(getcollget()) + ' 压制数据';
			document.getElementById('suppget').style.display = 'block';
			document.getElementById('opensupp').style['box-shadow'] = '0px 0px 30px silver';
		}
		else 
		{
			document.getElementById('suppweaken').style.display = 'block';
			document.getElementById('suppget').style.display = 'none';
			document.getElementById('opensupp').style['box-shadow'] = '0px 0px 10px silver';
		}
	}
	document.getElementById('vdataview').style.display = (player.PL4unlock ? 'block' : 'none');
	
	if(!player.PL4info.gte(10))
	{
		document.getElementById('PL4infonext').style.display = 'inline-block';
	}
	else
	{
		document.getElementById('PL4infonext').style.display = 'none';
	}
	
	if(player.PL4unlock)
	{
		for(let i = 0;i < 12;i++)
		{
			document.getElementById('voidupg' + (i + 1)).innerHTML = getvoidupgdescribe(i) + '<br>价格：' + notation(voidupgcost[i], 0) + '虚空数据';
			if(hasvoidupg(i)) document.getElementById('voidupg' + (i + 1)).style['background-color'] = 'white';
			else if(player.PL4data.gte(voidupgcost[i])) document.getElementById('voidupg' + (i + 1)).style['background-color'] = '#666666';
			else document.getElementById('voidupg' + (i + 1)).style['background-color'] = 'grey';
		}
	}
	
	if(player.permupg.includes(63))
	{
		for(let i = 0;i < 4;i++) document.getElementById('bhupg' + i).style['border-color'] = (player.blackhole.gte(getbhupgcost(i)) ? 'gold' : 'grey');
	}
	
	if(player.permupg.includes(66))
	{
		if(player.openstdmod)
		{
			document.getElementById('openstdmodelbt').style['background-color'] = 'white';
		}
		else
		{
			document.getElementById('openstdmodelbt').style['background-color'] = 'grey';
		}
	}
	
	if(player.SMupg >= 5)
	{
		for(let i = 0;i < 8;i++)
		{
			if(player.SMupg >= unlan[i])
			{
				if(player.arraydata.gte(getarraynodecost(i))) document.getElementById('anbuy1' + i).style['background-color'] = '#666666';
				else document.getElementById('anbuy1' + i).style['background-color'] = 'black';
				if(player.arraydata.gte(getarraynodecdcost(i))) document.getElementById('anbuy2' + i).style['background-color'] = '#666666';
				else document.getElementById('anbuy2' + i).style['background-color'] = 'black';
				if(player.SMupg >= 12)
				{
					if(getancd(i).lt(0.1)) document.getElementById('antier' + i).style['background-color'] = '#666666';
					else document.getElementById('antier' + i).style['background-color'] = 'black';
				}
			}
		}
	}
	
	if(player.permupg.includes(69))
	{
		document.getElementById('assbuy0').style['background-color'] = (player.data.gte(getasscost(0)) ? '#666666' : 'black');
		document.getElementById('assbuy1').style['background-color'] = (player.PL3info.gte(getasscost(1)) ? '#666666' : 'black');
		document.getElementById('assbuy2').style['background-color'] = (player.data.gte(getasscost(2)) && player.openstdmod ? '#666666' : 'black');
	}
}
