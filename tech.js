var page = 1;
var subpage = 1;
var sbc = [255, 255, 255];
var sbct = [-3, -2, -1];
var player;
var flashLock = false;


var PL1upgcost = [N(1), N(2), N(6), N(40), N(2500), N(10000), N(30000), N(50000)];
var PL2upgcost = [N(1e12), N(1e13), N(1e32), N(1e75)];
var sliceupgcost = [N(5), N(6), N(7), N(8), N(300), N(15000), N(1e10), N(1e111)];
var insupgcostb = [N(300), N(50), N(300), N(50), N(300), N(50)];
var insupgcostx = [N(100), N(6), N(100), N(6), N(100), N(6)];
var voidupgcost = [N(10), N(100), N(1000), N(10000), N(1e5), N(1e6), N(1e7), N(1e8), N(1e10), N(1e15), N(1e100), N(1e100)];
var bhupgcost = [N(3000), N(2500), N(6000), N(10000)];
var bhupgcostx = [N(3), N(2), N(3), N(10)];
var ancost = [N(10), N(10000), N(1e20), N(1e30), N(1e45), N(1e80), N(1e120), N('1e300000')];
var ancostx = [N(10), N(30), N(60), N(100), N(150), N(250), N(350), N(1e256)];
var ancdbase = [N(1), N(4), N(8), N(16), N(32), N(64), N(128), N(256)];
var ancdcost = [N(10), N(1e5), N(1e20), N(1e30), N(1e45), N(1e80), N(1e120), N('1e300000')];
var ancdcostx = [N(10), N(20), N(40), N(80), N(160), N(320), N(640), N(1280)];
var unlan = [5, 7, 11, 14, 17, 24, 26, 100];

function chpage(p)
{
	if(flashLock) return;
	page = p;
	subpage = 1;
}

function chspage(p)
{
	if(flashLock) return;
	subpage = p;
}

function hard_reset()
{
	init();
	data_print();
}

function N(num)
{
	return new Decimal(num);
}

//NOTATION ------------------------------------------------------------------------------------------------------------------------------------
//NOTATION ------------------------------------------------------------------------------------------------------------------------------------
var decimalOne = N(1);
var decimalZero = N(0);
function exponentialFormat(num, precision, mantissa = true) {
    let e = num.log10().floor()
    let m = num.div(Decimal.pow(10, e))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = decimalOne
        e = e.add(1)
    }
    e = (e.gte(1e6) ? format(e, 3) : (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0)))
    if (mantissa)
        return m.toStringWithDecimalPlaces(precision) + "e" + e
    else return "e" + e
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.001) return (0).toFixed(precision)
    let init = num.toStringWithDecimalPlaces(precision)
    let portions = init.split(".")
    //portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    if (portions.length == 1) return portions[0]
    return portions[0] + "." + portions[1]
}


function regularFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.0001) return (0).toFixed(precision)
    if (num.mag < 0.1 && precision !==0) precision = Math.max(precision, 4)
    return num.toStringWithDecimalPlaces(precision)
}

function fixValue(x, y = 0) {
    return x || new Decimal(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return decimalZero
    return x.reduce((a, b) => Decimal.add(a, b))
}

function format(decimal, precision = 3, small) {
    small = small || 0
    decimal = new Decimal(decimal)
    if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
        player.hasNaN = true;
        return "NaN"
    }
    if (decimal.sign < 0) return "-" + format(decimal.neg(), precision)
    if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
    if (decimal.gte("eeee1000")) {
        var slog = decimal.slog()
        if (slog.gte(1e6)) return "f" + format(slog.floor())
        else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "f" + commaFormat(slog.floor(), 0)
    }
    else if (decimal.gte("1e1000000")) return exponentialFormat(decimal, 2, false)
    else if (decimal.gte("1e10000")) return exponentialFormat(decimal, 2)
    else if (decimal.gte(1e6)) return exponentialFormat(decimal, 3)
    else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
    else if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision)
    else if (decimal.eq(0)) return (0).toFixed(precision)

    decimal = invertOOM(decimal)
    let val = ""
    if (decimal.lt("1e1000")){
        val = exponentialFormat(decimal, precision)
        return val.replace(/([^(?:e|F)]*)$/, '-$1')
    }
    else   
        return format(decimal, precision) + "⁻¹"

}

function notation(decimal, precision = 3)
{
	return format(decimal, precision);
}

function formatWhole(decimal) {
    decimal = new Decimal(decimal)
    if (decimal.gte(1e9)) return format(decimal, 2)
    if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal, 2)
    return format(decimal, 0)
}

function formatTime(s) {
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function toPlaces(x, precision, maxAccepted) {
    x = new Decimal(x)
    let result = x.toStringWithDecimalPlaces(precision)
    if (new Decimal(result).gte(maxAccepted)) {
        result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
    }
    return result
}

// Will also display very small numbers
function formatSmall(x, precision=2) { 
    return format(x, precision, true)    
}

function invertOOM(x){
    let e = x.log10().ceil()
    let m = x.div(Decimal.pow(10, e))
    e = e.neg()
    x = new Decimal(10).pow(e).times(m)

    return x
}

//NOTATION ------------------------------------------------------------------------------------------------------------------------------------
//NOTATION ------------------------------------------------------------------------------------------------------------------------------------

var formatsave = {
  encoder: new TextEncoder(),
  decoder: new TextDecoder(),
  startString: 'IncrementalDataRewrittenSaveFormat',
  endString: 'EndOfSaveFile',
  steps: [{
      encode: JSON.stringify,
      decode: JSON.parse
    },
    {
      encode: x => formatsave.encoder.encode(x),
      decode: x => formatsave.decoder.decode(x)
    },
    {
      encode: x => pako.deflate(x),
      decode: x => pako.inflate(x)
    },
    {
      encode: x => Array.from(x).map(i => String.fromCharCode(i)).join(""),
      decode: x => Uint8Array.from(Array.from(x).map(i => i.charCodeAt(0)))
    },
    {
      encode: x => btoa(x),
      decode: x => atob(x)
    },
    {
      encode: x => x.replace(/=+$/g, "").replace(/0/g, "0a").replace(/\+/g, "0b").replace(/\//g, "0c"),
      decode: x => x.replace(/0b/g, "+").replace(/0c/g, "/").replace(/0a/g, "0")
    },
    {
      encode: x => formatsave.startString + x + formatsave.endString,
      decode: x => x.slice(formatsave.startString.length, -formatsave.endString.length),
    }
  ],
  encode(s) {
    return this.steps.reduce((x, f) => f.encode(x), s);
  },
  decode(s) {
    return this.steps.reduceRight((x, f) => f.decode(x), s);
  },
}

function transformToDecimal(object)
{
	for(i in object)
	{
		if(typeof(object[i]) == 'string' && !isNaN(N(object[i]).mag)) object[i] = N(object[i]);
		if(typeof(object[i]) == 'object') transformToDecimal(object[i]);
	}
}

function data_print()
{
	localStorage.IDRgamesave = formatsave.encode(JSON.stringify(player));
}

function data_input()
{
	if (!localStorage.IDRgamesave) return;
	if(localStorage.IDRgamesave[0] == 'e') player = JSON.parse(atob(localStorage.IDRgamesave));
	else player = JSON.parse(formatsave.decode(localStorage.IDRgamesave));
	transformToDecimal(player);
}

async function jtb(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

function export_save()
{
	jtb(formatsave.encode(JSON.stringify(player)));
}

function import_save()
{
	let userInput = prompt("导入：", "输入存档");
	if (userInput != null && userInput !== "") {
		if(userInput[0] == 'e') player = JSON.parse(atob(userInput));
		else player = JSON.parse(formatsave.decode(userInput));
		transformToDecimal(player);
		data_print();
		location.reload();
	} else {
	}
}

function getRandomColor()
{
	const letters = '0123456789ABCDEF';
	let color = '#';
	for(let i = 0; i < 6; i++)
	{
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function stdmodScreenFlash(ms) {
	flashLock = true;
	if(ms == 0)
	{
		document.getElementById('mainbody').style['background-color'] = '';
		document.getElementById('textbody').style.opacity = '100%';
		flashLock = false;
		PL4reset();player.openstdmod = !player.openstdmod;
		return;
	}
	document.getElementById('mainbody').style['background-color'] = getRandomColor();
	document.getElementById('textbody').style.opacity = (ms * ms / 100) + '%';
	setTimeout(function(){stdmodScreenFlash(ms - 1)}, ms);
}