var lastUpdate = Date.now();
var diff = (Date.now() - lastUpdate) / 1000;

var player;

function init()
{
	player =
	{
		energy: new Decimal(10),
		eb01: new Decimal(0),
		eb02: new Decimal(0),
		eb03: new Decimal(0),
		eb04: new Decimal(0),
		eb05: new Decimal(0),
		eb06: new Decimal(0),
		eb07: new Decimal(0),
		eb08: new Decimal(0),
		ebc01: new Decimal(0),
		ebc02: new Decimal(0),
		ebc03: new Decimal(0),
		ebc04: new Decimal(0),
		ebc05: new Decimal(0),
		ebc06: new Decimal(0),
		ebc07: new Decimal(0),
		ebc08: new Decimal(0)
	}
}

function save()
{
	localStorage.energyWorld = btoa(JSON.stringify(player));
	shownoti("#energyWorldAutoSave");
}

function load()
{
	if(!localStorage.energyWorld) return;
	player = JSON.parse(atob(localStorage.energyWorld));
	transformToDecimal(player);
}

function trueHardReset() {
    let promption = prompt("重置存档？！输入DOIMAKJMHDS确定");
    if (promption == "DOIMAKJMHDS") {
        init();
        shownoti("#resetSave");
    }
}

function main()
{
	diff = (Date.now() - lastUpdate) / 1000;
    lastUpdate = Date.now();
}