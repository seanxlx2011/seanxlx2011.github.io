const achievement = [
	//0~9: Pre-World
	{
		name: '你得从某个地方开始',
		description: '达到1跃迁',
		done(){return player.boost.gte(1);},
	},
	{
		name: '总共八个',
		description: '达到8跃迁',
		done(){return player.boost.gte(8);},
	},
	{
		name: '凑齐了',
		description: '获得8号传输节点',
		done(){return player.buyjd[7].gte(8);},
	},
	{
		name: '回到原点',
		description: '达到1二重跃迁',
		done(){return player.boost2.gte(1);},
	},
	{
		name: 'root古戈尔',
		description: '达到1e50数据',
		done(){return player.data.gte(1e50);},
	},
	{
		name: '疯狂涨价',
		description: '触发跃迁超级折算',
		done(){return player.boost.gte(10);},
	},
	{
		name: '连续袭击',
		description: '达到2二重跃迁',
		done(){return player.boost2.gte(2);},
	},
	{
		name: '看看这里吧！',
		description: '查看统计页面',
		done(){return page == 3;},
	},
	{
		name: '第一座墙',
		description: '达到1e75数据',
		done(){return player.data.gte(1e75);},
	},
	{
		name: '当离别开出花',
		description: '达到1e80数据',
		done(){return player.data.gte(1e80);},
	},
	//10~19 World
	{
		name: '致命打击',
		description: '世界重置',
		done(){return player.PL1unlock;},
	},
	{
		name: '您可以获得50个跃迁？',
		description: '达到50跃迁',
		done(){return player.boost.gte(50);},
	},
	{
		name: '撕裂世界',
		description: '解锁位面切片',
		done(){return player.PL1upg[7]},
	},
	{
		name: '无限 0',
		description: '达到1.798e308数据',
		done(){return player.data.gte(N(2).pow(1024));},
	},
	{
		name: '无限 I',
		description: '达到1.798e308世界信息',
		done(){return player.PL1info.gte(N(2).pow(1024));},
	},
	{
		name: '世界之原初',
		description: '解锁本源',
		done(){return player.unlock_origin;},
	},
	{
		name: '本源过载',
		description: '达到1e40本源数据',
		done(){return player.origin_data.gte(1e40);},
	},
	{
		name: '上千',
		description: '达到1e1000世界信息',
		done(){return player.PL1info.gte('1e1000');},
	},
	{
		name: '新的选项卡',
		description: '查看世界界面',
		done(){return page == 4;},
	},
	{
		name: '伸出新长的枝娅',
		description: '达到1e7000世界信息',
		done(){return player.PL1info.gte('e7000')},
	},
	//20~29 Universe
	{
		name: '宇宙终焉',
		description: '宇宙重置',
		done(){return player.PL2unlock;},
	},
	{
		name: '无限 II',
		description: '达到1.798e308宇宙信息',
		done(){return player.PL2info.gte(N(2).pow(1024));}
	},
	{
		name: '继续叠加',
		description: '达到1三重跃迁',
		done(){return player.boost3.gte(1);},
	},
	{
		name: '强干扰',
		description: '收集熵',
		done(){return player.openentropy;},
	},
	{
		name: '神力在握',
		description: '解锁神星',
		done(){return player.PL2upg[2];},
	},
	{
		name: '升级数量猛增',
		description: '解锁永久升级',
		done(){return player.PL2upg[3];},
	},
	{
		name: '超强效率',
		description: '达到×1e7节点升级效果',
		done(){return getbuyjdeffect().gte(1e7);},
	},
	{
		name: '更强的干扰',
		description: '挑战复杂度纪录达到1',
		done(){return player.chalcomp.gte(1);},
	},
	{
		name: '末日',
		description: '触发真空衰变',
		done(){return player.algorrebuy[0].gte(1);},
	},
	{
		name: '那冬去春又来',
		description: '达到1e10000宇宙信息',
		done(){return player.PL2info.gte('e10000');},
	},
	//30~39 Chaos
	{
		name: '生于混沌',
		description: '混沌重置',
		done(){return player.PL3unlock;},
	},
	{
		name: '无限 III',
		description: '达到1.798e308混沌信息',
		done(){return player.PL3info.gte(N(2).pow(1024));},
	},
	{
		name: '核聚变',
		description: '获得混沌质量',
		done(){return player.chaosmass.gte(1);},
	},
	{
		name: '广义相对论',
		description: '开启黑洞',
		done(){return player.openbh;},
	},
	{
		name: '时速紊乱',
		description: '混沌以前全局速度达到×1000',
		done(){return getPL3globalspeed().gte(1000);},
	},
	{
		name: '对折',
		description: '获得折叠数据',
		done(){return player.colldata.gte(1);},
	},
	{
		name: '多元混沌',
		description: '达到1000混沌重置',
		done(){return player.PL3tms.gte(1000);},
	},
	{
		name: '再次提升的干扰',
		description: '完成1次奇异挑战8',
		done(){return player.exchal[8].gte(1);},
	},
	{
		name: '硬上限限制',
		description: '完成100次奇异挑战1',
		done(){return player.exchal[1].gte(100);},
	},
	{
		name: '等待心雪融化',
		description: '达到e1.798e308数据',
		done(){return player.data.gte(N(10).pow(N(2).pow(1024)));},
	},
	//40~49 void
	{
		name: '来自虚空',
		description: '虚空重置',
		done(){return player.PL4unlock;},
	},
	{
		name: '无限 IV',
		description: '达到1.798e308虚空信息',
		done(){return player.PL4info.gte(N(2).pow(1024));},
	},
	{
		name: '当一切归于湮灭',
		description: '开启粒子加速器',
		done(){return player.openstdmod;},
	},
	{
		name: '线性代数',
		description: '解锁矩阵',
		done(){return player.SMupg >= 5;},
	},
	{
		name: '大厦崩塌',
		description: '坍缩一次因子',
		done(){return player.unlft > 0;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '你每次离开家',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	//50~59 Theorem
	{
		name: '窥得天光',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '带着远方的牵挂',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	//60~69 Reality
	{
		name: '虚幻骰子',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '那城市的繁华',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	//70~79 Beyond
	{
		name: '最后终焉',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '[数据删除]',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '生与灭',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '轮回不止',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '你与我',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '渡向无限',
		description: '？？？(Coming Soon)',
		done(){return false;},
	},
	{
		name: '盖住了月牙......',
		description: '[???????]',
		done(){return false;},
	},
];
function predictableRandom(x) {
	let start = Math.pow(x % 97, 4.3) * 232344573;
	const a = 15485863;
	const b = 521791;
	start = (start * a) % b;
	for (let i = 0; i < (x * x) % 90 + 90; i++) {
		start = (start * a) % b;
	}
	return start / b;
}

function randomSymbol() {
	return String.fromCharCode(Math.floor(Math.random() * 50) + 192);
}

function randomCrossWords(str, frac = 0.7) {
	if (frac <= 0) return str;
	const x = str.split("");
	for (let i = 0; i < x.length * frac; i++) {
	const randomIndex = Math.floor(predictableRandom(Math.floor(Date.now() / 500) % 964372 + 1.618 * i) * x.length);
		x[randomIndex] = randomSymbol();
	}
	return x.join("");
}

function dis_achievementui()
{
	let ui = '<table>';
	for(let num = 0;num < achievement.length;)
	{
		num++;
		ui += '<td><div class="button-wrapper"><button class="ach" id="ach' + (num - 1) + '">' + (num - 1);
		if(num <= 70) ui += '<br>' + achievement[num - 1].name + '</button><div class="hover-box">' + achievement[num - 1].description + '</div></div></td>';
		else
		{
			ui += '<br>{{randomCrossWords(achievement[' + (num - 1) + '].name, ' + (num - 70) / 10 + ')}}</button><div class="hover-box">{{randomCrossWords(achievement[' + (num - 1) + '].description, ' + (num - 70) / 10 + ')}}</div></div></td>';
		}
		if(num % 10 == 0) ui += '<tr>';
	}
	ui += '</table>';
	document.getElementById('achievement_ui').innerHTML = ui;
}