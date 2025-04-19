const res = {
	'data': {
		init(){return N(0);},
		produce(diff) {res.add('data', res.val('dn1').mul(formula.dnbm(1)).mul(diff));},
	},
	'boost': {
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
	},
	'dn5b': {
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
	dnbe()
	{
		let base = N(2);
		if(res.val('boost').gte(5)) base = base.add(0.5);
		return base;
	},
	dnbc(x)
	{
		let basec = [null, N(1), N(100), N(10000), N(1e10), N(1e18), N(1e100), N(1e100), N(1e100)];
		let multc = [null, N(10), N(100), N(1e3), N(1e6), N(1e9), N(1e100), N(1e100), N(1e100)];
		let cost = basec[x].mul(multc[x].pow(res.val('dn' + x + 'b')));
		return cost;
	},
	dnbm(x)
	{
		let base = N(1);
		base = base.mul(formula.dnbe().pow(res.val('dn' + x + 'b')));
		if(res.val('boost').gte(3) && x == 1) base = base.mul(formula.booste(2));
		return base;
	},
	boostc()
	{
		let basec = N(1e3);
		let multc = N(1e4);
		let cost = basec.mul(multc.pow(res.val('boost')));
		return cost;
	},
	booste(id)
	{
		if(id == 2)
		{
			let base = N(3).pow(res.val('boost').sub(2));
			return base;
		}
	},
}