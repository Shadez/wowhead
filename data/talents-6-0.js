$WowheadTalentCalculator.registerClass(6, [
{
	n: 'Blood',
	color: '#FF0000',
	role: 2,
	mastery: {
		description: 'A dark guardian who manipulates and corrupts life energy to sustain <him/her>self in the face of an enemy onslaught.',
		spells: [
			{id:55050,name:'Heart Strike',icon:'inv_weapon_shortblade_40'},
			{id:50029,name:'Veteran of the Third War',icon:'spell_misc_warsongfocus'},
			{id:50034,name:'Blood Rites',icon:'spell_deathknight_bloodtap'},
			{id:93099,name:'Vengeance',icon:'ability_paladin_shieldofvengeance'}
		],
		rating: [
			{id:77513,name:'Blood Shield',description:'<!--sp77513:0-->Each time you heal yourself with Death Strike while in Blood Presence, you gain 50% of the amount healed as a damage absorption shield.  Each point of Mastery increases the shield by an additional 6.25%.<!--sp77513-->'}
		]
	},
	icon: 'spell_deathknight_bloodpresence',
	t: [
	{
		i: 1939,
		n: 'Butchery',
		m: 2,
		s: [48979,49483],
		d: [
			'Whenever you kill an enemy that grants experience or honor, you generate up to 10 Runic Power.  In addition, you generate 1 Runic Power per 5 sec while in combat.',
			'Whenever you kill an enemy that grants experience or honor, you generate up to 20 Runic Power.  In addition, you generate 2 Runic Power per 5 sec while in combat.'
		],
		x: 0,
		y: 0
	},
	{
		i: 2017,
		n: 'Blade Barrier',
		m: 3,
		s: [49182,49500,49501],
		d: [
			'Whenever your Blood Runes are on cooldown, you gain the Blade Barrier effect, which decreases damage taken by 2% for the next 10 sec.',
			'Whenever your Blood Runes are on cooldown, you gain the Blade Barrier effect, which decreases damage taken by 4% for the next 10 sec.',
			'Whenever your Blood Runes are on cooldown, you gain the Blade Barrier effect, which decreases damage taken by 6% for the next 10 sec.'
		],
		x: 1,
		y: 0
	},
	{
		i: 1938,
		n: 'Bladed Armor',
		m: 3,
		s: [48978,49390,49391],
		d: [
			'Increases your attack power by 2 for every 180 armor value you have.',
			'Increases your attack power by 4 for every 180 armor value you have.',
			'Increases your attack power by 6 for every 180 armor value you have.'
		],
		j: [
			{mleatkpwr:[1/90,'percentOf','armor']},
			{mleatkpwr:[1/45,'percentOf','armor']},
			{mleatkpwr:[1/30,'percentOf','armor']}
		],
		x: 2,
		y: 0
	},
	{
		i: 12223,
		n: 'Improved Blood Tap',
		m: 2,
		s: [94553,94555],
		d: [
			'Reduces the cooldown of your Blood Tap ability by 15 sec.',
			'Reduces the cooldown of your Blood Tap ability by 30 sec.'
		],
		x: 0,
		y: 1
	},
	{
		i: 1948,
		n: 'Scent of Blood',
		m: 3,
		s: [49004,49508,49509],
		d: [
			'You have a 15% chance after dodging, parrying or taking direct damage to gain the Scent of Blood effect, causing your next melee hit to generate 10 Runic Power.',
			'You have a 15% chance after dodging, parrying or taking direct damage to gain the Scent of Blood effect, causing your next 2 melee hits to generate 10 Runic Power.',
			'You have a 15% chance after dodging, parrying or taking  direct damage to gain the Scent of Blood effect, causing your next 3 melee hits to generate 10 Runic Power.'
		],
		x: 1,
		y: 1
	},
	{
		i: 7462,
		n: 'Scarlet Fever',
		m: 2,
		s: [81131,81132],
		d: [
			'Causes your Blood Plague to afflict enemies with Scarlet Fever, reducing their physical damage dealt by 5% for 21 sec.',
			'Causes your Blood Plague to afflict enemies with Scarlet Fever, reducing their physical damage dealt by 10% for 21 sec.'
		],
		x: 2,
		y: 1
	},
	{
		i: 11270,
		n: 'Hand of Doom',
		m: 2,
		s: [85793,85794],
		d: [
			'Reduces the cooldown of your Strangulate ability by 30 sec.',
			'Reduces the cooldown of your Strangulate ability by 60 sec.'
		],
		x: 3,
		y: 1
	},
	{
		i: 7460,
		n: 'Blood-Caked Blade',
		m: 3,
		s: [49219,49627,49628],
		d: [
			'Your auto attacks have a 10% chance to cause a Blood-Caked Strike, which hits for 25% weapon damage plus 12.5% for each of your diseases on the target.',
			'Your auto attacks have a 20% chance to cause a Blood-Caked Strike, which hits for 25% weapon damage plus 12.5% for each of your diseases on the target.',
			'Your auto attacks have a 30% chance to cause a Blood-Caked Strike, which hits for 25% weapon damage plus 12.5% for each of your diseases on the target.'
		],
		x: 0,
		y: 2
	},
	{
		i: 7459,
		n: 'Bone Shield',
		m: 1,
		s: [49222],
		d: [
			'Surrounds you with a barrier of whirling bones.  The shield begins with 4 charges, and each damaging attack consumes a charge.  While at least 1 charge remains, you take 20% less damage from all sources and deal 2% more damage with all attacks, spells and abilities.  Lasts 5 min.'
		],
		t: ['1 Unholy<br />1 min cooldown'],
		x: 1,
		y: 2
	},
	{
		i: 7458,
		n: 'Toughness',
		m: 3,
		s: [49042,49786,49787],
		d: [
			'Increases your armor value from items by 3%.',
			'Increases your armor value from items by 7%.',
			'Increases your armor value from items by 10%.'
		],
		j: [
			{armor:[3/100,'forSlots',[0,2,4,7,8,9,10,11,17]]},
			{armor:[7/100,'forSlots',[0,2,4,7,8,9,10,11,17]]},
			{armor:[10/100,'forSlots',[0,2,4,7,8,9,10,11,17]]}
		],
		x: 2,
		y: 2
	},
	{
		i: 2105,
		n: 'Abomination\'s Might',
		m: 2,
		s: [53137,53138],
		d: [
			'Increases the attack power by 5% of party and raid members within 100 yards.  Also increases your total Strength by 1%.',
			'Increases the attack power by 10% of party and raid members within 100 yards.  Also increases your total Strength by 2%.'
		],
		j: [
			{str:[1/100,'percentOf','str'],mleatkpwr:[5/100,'percentOf','mleatkpwr'],rgdatkpwr:[5/100,'percentOf','rgdatkpwr']},
			{str:[2/100,'percentOf','str'],mleatkpwr:[10/100,'percentOf','mleatkpwr'],rgdatkpwr:[10/100,'percentOf','rgdatkpwr']}
		],
		x: 3,
		y: 2
	},
	{
		i: 7461,
		n: 'Sanguine Fortitude',
		m: 2,
		s: [81125,81127],
		d: [
			'While active, your Icebound Fortitude reduces damage taken by an additional 15% and costs 50% less Runic Power to activate.',
			'While active, your Icebound Fortitude reduces damage taken by an additional 30% and costs no Runic Power to activate.'
		],
		x: 0,
		y: 3
	},
	{
		i: 1960,
		n: 'Blood Parasite',
		m: 2,
		s: [49027,49542],
		d: [
			'Your melee attacks have a 5% chance to spawn a Bloodworm. The Bloodworm attacks your enemies, gorging itself with blood until it bursts to heal nearby allies.  Lasts up to 20 sec.',
			'Your melee attacks have a 10% chance to spawn a Bloodworm.  The Bloodworm attacks your enemies, gorging itself with blood until it bursts to heal nearby allies.  Lasts up to 20 sec.'
		],
		x: 1,
		y: 3
	},
	{
		i: 1936,
		n: 'Improved Blood Presence',
		m: 2,
		s: [50365,50371],
		d: [
			'Increases your rune regeneration by 10% and reduces the chance that you will be critically hit by melee attacks while in Blood Presence by 3%.  In addition, while in Frost Presence or Unholy Presence, you retain 2% damage reduction from Blood Presence.',
			'Increases your rune regeneration by 20% and reduces the chance that you will be critically hit by melee attacks while in Blood Presence by 6%.  In addition, while in Frost Presence or Unholy Presence, you retain 4% damage reduction from Blood Presence.'
		],
		x: 2,
		y: 3
	},
	{
		i: 1959,
		n: 'Will of the Necropolis',
		m: 3,
		s: [52284,81163,81164],
		d: [
			'When a damaging attack brings you below 30% of your maximum health, the cooldown on your Rune Tap ability is refreshed and your next Rune Tap has no cost, and all damage taken is reduced by 8% for 8 sec.  This effect cannot occur more than once every 45 seconds.',
			'When a damaging attack brings you below 30% of your maximum health, the cooldown on your Rune Tap ability is refreshed and your next Rune Tap has no cost, and all damage taken is reduced by 16% for 8 sec.  This effect cannot occur more than once every 45 seconds.',
			'When a damaging attack brings you below 30% of your maximum health, the cooldown on your Rune Tap ability is refreshed and your next Rune Tap has no cost, and all damage taken is reduced by 25% for 8 sec.  This effect cannot occur more than once every 45 seconds.'
		],
		x: 0,
		y: 4,
		r: [15,1]
	},
	{
		i: 1941,
		n: 'Rune Tap',
		m: 1,
		s: [48982],
		d: [
			'Converts 1 Blood Rune into 10% of your maximum health.'
		],
		t: ['1 Blood<br />30 sec cooldown'],
		x: 1,
		y: 4
	},
	{
		i: 2019,
		n: 'Vampiric Blood',
		m: 1,
		s: [55233],
		d: [
			'<!--sp58676:0-->Temporarily grants the Death Knight 15% of maximum health and increases the amount of health received from healing spells and effects by 25% for 10 sec.  After the effect expires, the health is lost.<!--sp58676-->'
		],
		t: ['1 min cooldown'],
		x: 2,
		y: 4
	},
	{
		i: 2259,
		n: 'Improved Death Strike',
		m: 3,
		s: [62905,62908,81138],
		d: [
			'Increases the damage done by your Death Strike by 30%, its critical strike chance by 3%, and its amount healed by 15%.',
			'Increases the damage done by your Death Strike by 60%, its critical strike chance by 6%, and its amount healed by 30%.',
			'Increases the damage done by your Death Strike by 90%, its critical strike chance by 9%, and its amount healed by 45%.'
		],
		x: 1,
		y: 5
	},
	{
		i: 7463,
		n: 'Crimson Scourge',
		m: 2,
		s: [81135,81136],
		d: [
			'Increases the damage dealt by your Blood Boil by 20%, and when you land a melee attack on a target that is infected with your Blood Plague, there is a 5% chance that your next Blood Boil will consume no runes.',
			'Increases the damage dealt by your Blood Boil by 40%, and when you land a melee attack on a target that is infected with your Blood Plague, there is a 10% chance that your next Blood Boil will consume no runes.'
		],
		x: 2,
		y: 5
	},
	{
		i: 1961,
		n: 'Dancing Rune Weapon',
		m: 1,
		s: [49028],
		d: [
			'Summons a second rune weapon that fights on its own for 12 sec, doing the same attacks as the Death Knight but for 50% reduced damage.  The rune weapon also assists in defense of its master, granting an additional 20% parry chance while active.'
		],
		t: ['<table width="100%"><tr><td>60 Runic Power</td><th>30 yd range</th></tr></table><table width="100%"><tr><td>Instant cast</td><th>1.5 min cooldown</th></tr></table>','Requires Melee Weapon'],
		x: 1,
		y: 6
	}
	]
},
{
	n: 'Frost',
	color: '#4D80FF',
	role: 8,
	mastery: {
		description: 'An icy harbinger of doom, channeling runic power and delivering rapid weapon strikes.',
		spells: [
			{id:49143,name:'Frost Strike',icon:'spell_deathknight_empowerruneblade2'},
			{id:50887,name:'Icy Talons',icon:'spell_deathknight_icytalons'},
			{id:54637,name:'Blood of the North',icon:'inv_weapon_shortblade_79'}
		],
		rating: [
			{id:77514,name:'Frozen Heart',description:'<!--sp77514:0-->Increases all Frost damage done by 16%.  Each point of Mastery increases Frost damage by an additional 2.0%.<!--sp77514-->'}
		]
	},
	icon: 'spell_deathknight_frostpresence',
	t: [
	{
		i: 2031,
		n: 'Runic Power Mastery',
		m: 3,
		s: [49455,50147,91145],
		d: [
			'Increases your maximum Runic Power by 10.',
			'Increases your maximum Runic Power by 20.',
			'Increases your maximum Runic Power by 30.'
		],
		j: [
			{runic:10},
			{runic:20},
			{runic:30}
		],
		x: 0,
		y: 0
	},
	{
		i: 2035,
		n: 'Icy Reach',
		m: 2,
		s: [55061,55062],
		d: [
			'Increases the range of your Icy Touch,  Chains of Ice and Howling Blast by 5 yards.',
			'Increases the range of your Icy Touch, Chains of Ice and Howling Blast by 10 yards.'
		],
		x: 1,
		y: 0
	},
	{
		i: 2022,
		n: 'Nerves of Cold Steel',
		m: 3,
		s: [49226,50137,50138],
		d: [
			'Increases your chance to hit with one-handed melee weapons by 1% and increases the damage done by your off-hand weapon by 8%.',
			'Increases your chance to hit with one-handed melee weapons by 2% and increases the damage done by your off-hand weapon by 16%.',
			'Increases your chance to hit with one-handed melee weapons by 3% and increases the damage done by your off-hand weapon by 25%.'
		],
		j: [
			{mlehitpct:[1,'forClass',[2,41105,1]],mledps:[8/100,'forSlots',[17],'forClass',[2,41105,1]]},
			{mlehitpct:[2,'forClass',[2,41105,1]],mledps:[16/100,'forSlots',[17],'forClass',[2,41105,1]]},
			{mlehitpct:[3,'forClass',[2,41105,1]],mledps:[25/100,'forSlots',[17],'forClass',[2,41105,1]]}
		],
		x: 2,
		y: 0
	},
	{
		i: 2048,
		n: 'Annihilation',
		m: 3,
		s: [51468,51472,51473],
		d: [
			'Increases the damage dealt by your Obliterate ability by 15%.',
			'Increases the damage dealt by your Obliterate ability by 30%.',
			'Increases the damage dealt by your Obliterate ability by 45%.'
		],
		x: 0,
		y: 1
	},
	{
		i: 2215,
		n: 'Lichborne',
		m: 1,
		s: [49039],
		d: [
			'Draw upon unholy energy to become undead for 10 sec.  While undead, you are immune to Charm, Fear and Sleep effects.'
		],
		t: ['2 min cooldown'],
		x: 1,
		y: 1
	},
	{
		i: 11275,
		n: 'On a Pale Horse',
		m: 2,
		s: [51983,51986],
		d: [
			'You become as hard to stop as death itself.  The duration of movement-slowing effects used against you is reduced by 15%, and your mounted speed is increased by 10%.  This does not stack with other movement speed increasing effects.',
			'You become as hard to stop as death itself.  The duration of movement-slowing effects used against you is reduced by 30%, and your mounted speed is increased by 20%.  This does not stack with other movement speed increasing effects.'
		],
		x: 2,
		y: 1
	},
	{
		i: 1971,
		n: 'Endless Winter',
		m: 2,
		s: [49137,49657],
		d: [
			'The cost of your Mind Freeze is reduced to 10 Runic Power.',
			'Your Mind Freeze no longer costs Runic Power.'
		],
		x: 3,
		y: 1
	},
	{
		i: 1993,
		n: 'Merciless Combat',
		m: 2,
		s: [49024,49538],
		d: [
			'Your Icy Touch, Howling Blast, Obliterate and Frost Strike do an additional 6% damage when striking targets with less than 35% health.',
			'Your Icy Touch, Howling Blast, Obliterate and Frost Strike do an additional 12% damage when striking targets with less than 35% health.'
		],
		x: 0,
		y: 2
	},
	{
		i: 1981,
		n: 'Chill of the Grave',
		m: 2,
		s: [49149,50115],
		d: [
			'Your Chains of Ice, Howling Blast, Icy Touch and Obliterate generate 5 additional Runic Power.',
			'Your Chains of Ice, Howling Blast, Icy Touch and Obliterate generate 10 additional Runic Power.'
		],
		x: 1,
		y: 2
	},
	{
		i: 2044,
		n: 'Killing Machine',
		m: 3,
		s: [51123,51127,51128],
		d: [
			'Your melee attacks have a chance to make your next Obliterate or Frost Strike a guaranteed critical strike.',
			'Your melee attacks have a chance to make your next Obliterate or Frost Strike a guaranteed critical strike.  Effect occurs more often than Killing Machine (Rank 1).',
			'Your melee attacks have a chance to make your next Obliterate or Frost Strike a guaranteed critical strike.  Effect occurs more often than Killing Machine (Rank 2).'
		],
		x: 2,
		y: 2
	},
	{
		i: 1992,
		n: 'Rime',
		m: 3,
		s: [49188,56822,59057],
		d: [
			'Your Obliterate has a 15% chance to cause your next Howling Blast or Icy Touch to consume no runes.',
			'Your Obliterate has a 30% chance to cause your next Howling Blast or Icy Touch to consume no runes.',
			'Your Obliterate has a 45% chance to cause your next Howling Blast or Icy Touch to consume no runes.'
		],
		x: 0,
		y: 3
	},
	{
		i: 1979,
		n: 'Pillar of Frost',
		m: 1,
		s: [51271],
		d: [
			'Calls upon the power of Frost to increase the Death Knight\'s Strength by 20%.  Icy crystals hang heavy upon the Death Knight\'s body, providing immunity against external movement such as knockbacks.  Lasts 20 sec.'
		],
		t: ['1 Frost<br />1 min cooldown'],
		x: 1,
		y: 3
	},
	{
		i: 2223,
		n: 'Improved Icy Talons',
		m: 1,
		s: [55610],
		d: [
			'Increases the melee and ranged attack speed of all party and raid members within 100 yards by 10%, and your own attack speed by an additional 5%.'
		],
		x: 2,
		y: 3
	},
	{
		i: 1980,
		n: 'Brittle Bones',
		m: 2,
		s: [81327,81328],
		d: [
			'Your Strength is increased by 2% and your Frost Fever chills the bones of its victims, increasing their physical damage taken by 2%.',
			'Your Strength is increased by 4% and your Frost Fever chills the bones of its victims, increasing their physical damage taken by 4%.'
		],
		j: [
			{str:[2/100,'percentOf','str']},
			{str:[4/100,'percentOf','str']}
		],
		x: 3,
		y: 3
	},
	{
		i: 2260,
		n: 'Chilblains',
		m: 2,
		s: [50040,50041],
		d: [
			'Victims of your Frost Fever disease are Chilled, reducing movement speed by 25% for 10 sec, and your Chains of Ice immobilizes targets for 1 sec.',
			'Victims of your Frost Fever disease are Chilled, reducing movement speed by 50% for 10 sec, and your Chains of Ice immobilizes targets for 3 sec.'
		],
		x: 0,
		y: 4
	},
	{
		i: 1999,
		n: 'Hungering Cold',
		m: 1,
		s: [49203],
		d: [
			'Purges the earth around the Death Knight of all heat.  Enemies within 10 yards are trapped in ice, preventing them from performing any action for 10 sec and infecting them with Frost Fever.  Enemies are considered Frozen, but any damage other than diseases will break the ice.'
		],
		t: ['40 Runic Power<table width="100%"><tr><td>Instant cast</td><th>1 min cooldown</th></tr></table>'],
		x: 1,
		y: 4
	},
	{
		i: 2029,
		n: 'Improved Frost Presence',
		m: 2,
		s: [50384,50385],
		d: [
			'Increases your bonus damage while in Frost Presence by an additional 2%.  In addition, while in Blood Presence or Unholy Presence, you retain 2% increased Runic Power generation from Frost Presence.',
			'Increases your bonus damage while in Frost Presence by an additional 5%.  In addition, while in Blood Presence or Unholy Presence, you retain 4% increased Runic Power generation from Frost Presence.'
		],
		x: 2,
		y: 4
	},
	{
		i: 2284,
		n: 'Threat of Thassarian',
		m: 3,
		s: [65661,66191,66192],
		d: [
			'When dual-wielding, your Death Strikes, Obliterates, Plague Strikes, Rune Strikes, Blood Strikes and Frost Strikes have a 30% chance to also deal damage with your offhand weapon.',
			'When dual-wielding, your Death Strikes, Obliterates, Plague Strikes, Rune Strikes, Blood Strikes and Frost Strikes have a 60% chance to also deal damage with your offhand weapon.',
			'When dual-wielding, your Death Strikes, Obliterates, Plague Strikes, Rune Strikes, Blood Strikes and Frost Strikes have a 100% chance to also deal damage with your offhand weapon.'
		],
		x: 0,
		y: 5
	},
	{
		i: 7571,
		n: 'Might of the Frozen Wastes',
		m: 3,
		s: [81330,81332,81333],
		d: [
			'When wielding a two-handed weapon, your melee attacks deal an additional 4% damage and your autoattacks have a 15% chance to generate 10 Runic Power.',
			'When wielding a two-handed weapon, your melee attacks deal an additional 8% damage and your autoattacks have a 30% chance to generate 10 Runic Power.',
			'When wielding a two-handed weapon, your melee attacks deal an additional 12% damage and your autoattacks have a 45% chance to generate 10 Runic Power.'
		],
		x: 2,
		y: 5
	},
	{
		i: 1989,
		n: 'Howling Blast',
		m: 1,
		s: [49184],
		d: [
			'Blast the target with a frigid wind, dealing ((<!--pts2:1-->1370<!----> + <!--pts2:2--> 1512<!----> / 2) + <span class="w"> AP</span> * 0.48)) Frost damage to that foe, and ((0.5 * (((<!--pts2:1-->1370<!----> + <!--pts2:2--> 1512<!----> / 2) + (<span class="w">AP</span> * 0.48)))) Frost damage to all other enemies within 0 yards.)'
		],
		t: ['<table width="100%"><tr><td>1 Frost</td><th>20 yd range</th></tr></table><!--?49184:40:85:85:157:0:1000-->'],
		x: 1,
		y: 6,
		r: [15,1]
	}
	]
},
{
	n: 'Unholy',
	color: '#CC00FF',
	role: 8,
	mastery: {
		description: 'A master of death and decay, spreading infection and controlling undead minions to do <his/her> bidding.',
		spells: [
			{id:55090,name:'Scourge Strike',icon:'spell_deathknight_scourgestrike'},
			{id:52143,name:'Master of Ghouls',icon:'spell_shadow_animatedead'},
			{id:56835,name:'Reaping',icon:'spell_shadow_shadetruesight'},
			{id:91107,name:'Unholy Might',icon:'spell_shadow_unholystrength'}
		],
		rating: [
			{id:77515,name:'Dreadblade',description:'<!--sp77515:0-->Increases Shadow damage done by 20%.  Each point of Mastery increases Shadow damage by an additional 2.5%.<!--sp77515-->'}
		]
	},
	icon: 'spell_deathknight_unholypresence',
	t: [
	{
		i: 2025,
		n: 'Unholy Command',
		m: 2,
		s: [49588,49589],
		d: [
			'Reduces the cooldown of your Death Grip ability by 5 sec, and gives you a 50% chance to refresh its cooldown when dealing a killing blow to a target that grants experience or honor.',
			'Reduces the cooldown of your Death Grip ability by 10 sec, and gives you a 100% chance to refresh its cooldown when dealing a killing blow to a target that grants experience or honor.'
		],
		x: 0,
		y: 0
	},
	{
		i: 1932,
		n: 'Virulence',
		m: 3,
		s: [48962,49567,49568],
		d: [
			'Increases the damage done by your diseases by 10%.',
			'Increases the damage done by your diseases by 20%.',
			'Increases the damage done by your diseases by 30%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 1963,
		n: 'Epidemic',
		m: 3,
		s: [49036,49562,81334],
		d: [
			'Increases the duration of Blood Plague and Frost Fever by 4 sec.',
			'Increases the duration of Blood Plague and Frost Fever by 8 sec.',
			'Increases the duration of Blood Plague and Frost Fever by 12 sec.'
		],
		x: 2,
		y: 0
	},
	{
		i: 2226,
		n: 'Desecration',
		m: 2,
		s: [55666,55667],
		d: [
			'Your Plague, Scourge, and Necrotic Strikes defile the ground within 7 yards of your target. Enemies in the area are slowed by 25% while standing on the unholy ground. Does not trigger against targets that are immune to movement-slowing effects. Lasts 20 sec.',
			'Your Plague, Scourge, and Necrotic Strikes defile the ground within 7 yards of your target. Enemies in the area are slowed by 50% while standing on the unholy ground. Does not trigger against targets that are immune to movement-slowing effects. Lasts 20 sec.'
		],
		x: 0,
		y: 1
	},
	{
		i: 7572,
		n: 'Resilient Infection',
		m: 2,
		s: [81338,81339],
		d: [
			'When your diseases are dispelled by an enemy, you have a 50% chance to activate a Frost Rune if Frost Fever was removed, or an Unholy Rune if Blood Plague was removed.',
			'When your diseases are dispelled by an enemy, you have a 100% chance to activate a Frost Rune if Frost Fever was removed, or an Unholy Rune if Blood Plague was removed.'
		],
		x: 1,
		y: 1
	},
	{
		i: 11178,
		n: 'Morbidity',
		m: 3,
		s: [48963,49564,49565],
		d: [
			'Increases the damage and healing of Death Coil by 5% and Death and Decay by 10%.',
			'Increases the damage and healing of Death Coil by 10% and Death and Decay by 20%.',
			'Increases the damage and healing of Death Coil by 15% and Death and Decay by 30%.'
		],
		x: 3,
		y: 1
	},
	{
		i: 2047,
		n: 'Runic Corruption',
		m: 2,
		s: [51459,51462],
		d: [
			'Reduces the cost of your Death Coil by 3, and causes your Runic Empowerment ability to no longer refresh a depleted rune, but instead to increase your rune regeneration rate by 50% for 3 sec.',
			'Reduces the cost of your Death Coil by 6, and causes your Runic Empowerment ability to no longer refresh a depleted rune, but instead to increase your rune regeneration rate by 100% for 3 sec.'
		],
		x: 0,
		y: 2
	},
	{
		i: 7574,
		n: 'Unholy Frenzy',
		m: 1,
		s: [49016],
		d: [
			'Induces a friendly unit into a killing frenzy for 30 sec.  The target is Enraged, which increases their melee and ranged haste by 20%, but causes them to lose health equal to 2% of their maximum health every 3 sec.'
		],
		t: ['30 yd range<br />3 min cooldown'],
		x: 1,
		y: 2
	},
	{
		i: 12119,
		n: 'Contagion',
		m: 2,
		s: [91316,91319],
		d: [
			'Increases the damage of your diseases spread via Pestilence by 50%.',
			'Increases the damage of your diseases spread via Pestilence by 100%.'
		],
		x: 2,
		y: 2,
		r: [2,3]
	},
	{
		i: 11179,
		n: 'Shadow Infusion',
		m: 3,
		s: [48965,49571,49572],
		d: [
			'Grants your successful Death Coils a 33% chance to empower your active Ghoul, increasing its damage dealt by 6% for 30 sec.  Stacks up to 5 times.',
			'Grants your successful Death Coils a 66% chance to empower your active Ghoul, increasing its damage dealt by 6% for 30 sec.  Stacks up to 5 times.',
			'Grants your successful Death Coils a 100% chance to empower your active Ghoul, increasing its damage dealt by 6% for 30 sec.  Stacks up to 5 times.'
		],
		x: 3,
		y: 2
	},
	{
		i: 15322,
		n: 'Death\'s Advance',
		m: 2,
		s: [96269,96270],
		d: [
			'While your Unholy Runes are both depleted, movement-impairing effects may not reduce you below 60% of normal movement speed.',
			'While your Unholy Runes are both depleted, movement-impairing effects may not reduce you below 75% of normal movement speed.'
		],
		x: 0,
		y: 3
	},
	{
		i: 2009,
		n: 'Magic Suppression',
		m: 3,
		s: [49224,49610,49611],
		d: [
			'Increases the spell damage absorption of your Anti-Magic Shell by an additional 8%, and causes damage absorbed by Anti-Magic Shell to energize the Death Knight with Runic Power.',
			'Increases the spell damage absorption of your Anti-Magic Shell by an additional 16%, and increases the Runic Power generated when damage is absorbed by Anti-Magic Shell.',
			'Increases the spell damage absorption of your Anti-Magic Shell by an additional 25%, and increases the Runic Power generated when damage is absorbed by Anti-Magic Shell.'
		],
		x: 1,
		y: 3
	},
	{
		i: 2082,
		n: 'Rage of Rivendare',
		m: 3,
		s: [51745,51746,91323],
		d: [
			'Increases the damage of your Plague Strike, Scourge Strike, and Festering Strike abilities by 15%.',
			'Increases the damage of your Plague Strike, Scourge Strike, and Festering Strike abilities by 30%.',
			'Increases the damage of your Plague Strike, Scourge Strike, and Festering Strike abilities by 45%.'
		],
		x: 2,
		y: 3
	},
	{
		i: 1996,
		n: 'Unholy Blight',
		m: 1,
		s: [49194],
		d: [
			'Causes the victims of your Death Coil to be surrounded by a vile swarm of unholy insects, taking 10% of the damage done by the Death Coil over 10 sec, and preventing any diseases on the victim from being dispelled.'
		],
		x: 0,
		y: 4
	},
	{
		i: 2221,
		n: 'Anti-Magic Zone',
		m: 1,
		s: [51052],
		d: [
			'Places a large, stationary Anti-Magic Zone that reduces spell damage done to party or raid members inside it by 75%.  The Anti-Magic Zone lasts for 10 sec or until it absorbs (10000 + 2 * <span class="w"> AP</span>) spell damage.'
		],
		t: ['1 Unholy<br />2 min cooldown'],
		x: 1,
		y: 4,
		r: [11,3]
	},
	{
		i: 2013,
		n: 'Improved Unholy Presence',
		m: 2,
		s: [50391,50392],
		d: [
			'Grants you an additional 2% haste while in Unholy Presence.  In addition, while in Blood Presence or Frost Presence, you retain 8% increased movement speed from Unholy Presence.',
			'Grants you an additional 5% haste while in Unholy Presence.  In addition, while in Blood Presence or Frost Presence, you retain 15% increased movement speed from Unholy Presence.'
		],
		x: 2,
		y: 4
	},
	{
		i: 2085,
		n: 'Dark Transformation',
		m: 1,
		s: [63560],
		d: [
			'Consume 5 charges of Shadow Infusion on your Ghoul to transform it into a powerful undead monstrosity for 30 sec.  The Ghoul\'s abilities are empowered and take on new functions while the transformation is active.'
		],
		t: ['<table width="100%"><tr><td>1 Unholy</td><th>100 yd range</th></tr></table>Instant cast'],
		x: 3,
		y: 4,
		r: [9,3]
	},
	{
		i: 2043,
		n: 'Ebon Plaguebringer',
		m: 2,
		s: [51099,51160],
		d: [
			'Your Plague Strike, Icy Touch, Chains of Ice, and Outbreak abilities also infect their target with Ebon Plague, which increases damage taken from your diseases by 15% and all magic damage taken by an additional 8%.',
			'Your Plague Strike, Icy Touch, Chains of Ice, and Outbreak abilities also infect their target with Ebon Plague, which increases damage taken from your diseases by 30% and all magic damage taken by an additional 8%.'
		],
		x: 1,
		y: 5
	},
	{
		i: 7575,
		n: 'Sudden Doom',
		m: 3,
		s: [49018,49529,49530],
		d: [
			'Your main-hand auto attacks have a chance to make your next Death Coil cost no Runic Power.',
			'Your main-hand auto attacks have a chance (higher than rank 1) to make your next Death Coil cost no Runic Power.',
			'Your main-hand auto attacks have a chance (higher than rank 2) to make your next Death Coil cost no Runic Power.'
		],
		x: 2,
		y: 5
	},
	{
		i: 2000,
		n: 'Summon Gargoyle',
		m: 1,
		s: [49206],
		d: [
			'A Gargoyle flies into the area and bombards the target with Nature damage modified by the Death Knight\'s attack power.  Persists for 30 sec.'
		],
		t: ['<table width="100%"><tr><td>60 Runic Power</td><th>30 yd range</th></tr></table><table width="100%"><tr><td>Instant cast</td><th>3 min cooldown</th></tr></table>'],
		x: 1,
		y: 6
	}
	]
}
]);