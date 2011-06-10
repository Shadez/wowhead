$WowheadTalentCalculator.registerClass(7, [
{
	n: 'Elemental',
	color: '#FFB81A',
	role: 8,
	mastery: {
		description: 'A spellcaster who harnesses the destructive forces of nature and the elements.',
		spells: [
			{id:51490,name:'Thunderstorm',icon:'spell_shaman_thunderstorm'},
			{id:60188,name:'Elemental Fury',icon:'spell_fire_volcano'},
			{id:62099,name:'Shamanism',icon:'spell_unused2'}
		],
		rating: [
			{id:77222,name:'Elemental Overload',description:'<!--sp77222:0-->Grants a 16% chance for Elemental Overload to occur.  Elemental Overload causes a Lightning Bolt, Chain Lightning, or Lava Burst spell you cast to trigger a second, similar spell on the same target at no additional cost that causes 75% of normal damage and no threat.  Each point of Mastery increases the chance of Elemental Overload by an additional 2%.<!--sp77222-->'}
		]
	},
	icon: 'spell_nature_lightning',
	t: [
	{
		i: 11218,
		n: 'Acuity',
		m: 3,
		s: [17485,17486,17487],
		d: [
			'Increases your critical strike chance with all spells and attacks by 1%.',
			'Increases your critical strike chance with all spells and attacks by 2%.',
			'Increases your critical strike chance with all spells and attacks by 3%.'
		],
		j: [
			{mlecritstrkpct:1,rgdcritstrkpct:1,holsplcritstrkpct:1,firsplcritstrkpct:1,natsplcritstrkpct:1,frosplcritstrkpct:1,shasplcritstrkpct:1,arcsplcritstrkpct:1},
			{mlecritstrkpct:2,rgdcritstrkpct:2,holsplcritstrkpct:2,firsplcritstrkpct:2,natsplcritstrkpct:2,frosplcritstrkpct:2,shasplcritstrkpct:2,arcsplcritstrkpct:2},
			{mlecritstrkpct:3,rgdcritstrkpct:3,holsplcritstrkpct:3,firsplcritstrkpct:3,natsplcritstrkpct:3,frosplcritstrkpct:3,shasplcritstrkpct:3,arcsplcritstrkpct:3}
		],
		x: 0,
		y: 0
	},
	{
		i: 564,
		n: 'Convection',
		m: 2,
		s: [16039,16109],
		d: [
			'Reduces the mana cost of your damaging offensive spells by 5%.',
			'Reduces the mana cost of your damaging offensive spells by 10%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 563,
		n: 'Concussion',
		m: 3,
		s: [16035,16105,16106],
		d: [
			'Increases the damage done by your Lightning Bolt, Chain Lightning, Thunderstorm, Lava Burst and Shock spells by 2%.',
			'Increases the damage done by your Lightning Bolt, Chain Lightning, Thunderstorm, Lava Burst and Shock spells by 4%.',
			'Increases the damage done by your Lightning Bolt, Chain Lightning, Thunderstorm, Lava Burst and Shock spells by 6%.'
		],
		x: 2,
		y: 0
	},
	{
		i: 561,
		n: 'Call of Flame',
		m: 2,
		s: [16038,16160],
		d: [
			'Increases the damage done by your Fire Totems and Fire Nova by 10%, and damage done by your Lava Burst spell by 5%.',
			'Increases the damage done by your Fire Totems and Fire Nova by 20%, and damage done by your Lava Burst spell by 10%.'
		],
		x: 0,
		y: 1
	},
	{
		i: 1640,
		n: 'Elemental Warding',
		m: 3,
		s: [28996,28997,28998],
		d: [
			'Reduces magical damage taken by 4%.',
			'Reduces magical damage taken by 8%.',
			'Reduces magical damage taken by 12%.'
		],
		j: [
			{_holdmgpct:-4,_firdmgpct:-4,_natdmgpct:-4,_frodmgpct:-4,_shadmgpct:-4,_arcdmgpct:-4},
			{_holdmgpct:-8,_firdmgpct:-8,_natdmgpct:-8,_frodmgpct:-8,_shadmgpct:-8,_arcdmgpct:-8},
			{_holdmgpct:-12,_firdmgpct:-12,_natdmgpct:-12,_frodmgpct:-12,_shadmgpct:-12,_arcdmgpct:-12}
		],
		x: 1,
		y: 1
	},
	{
		i: 575,
		n: 'Reverberation',
		m: 2,
		s: [16040,16113],
		d: [
			'Reduces the cooldown of your Shock spells and Wind Shear by 0 sec.',
			'Reduces the cooldown of your Shock spells and Wind Shear by 1 sec.'
		],
		x: 2,
		y: 1
	},
	{
		i: 1685,
		n: 'Elemental Precision',
		m: 3,
		s: [30672,30673,30674],
		d: [
			'Increases your Fire, Frost and Nature damage by 1% and grants you spell hit rating equal to 33% of any Spirit gained from items or effects.',
			'Increases your Fire, Frost and Nature damage by 2% and grants you spell hit rating equal to 66% of any Spirit gained from items or effects.',
			'Increases your Fire, Frost and Nature damage by 3% and grants you spell hit rating equal to 100% of any Spirit gained from items or effects.'
		],
		j: [
			{firdmgpct:1,natdmgpct:1,frodmgpct:1,splhitrtng:[33/100,'percentOf','spi']},
			{firdmgpct:2,natdmgpct:2,frodmgpct:2,splhitrtng:[66/100,'percentOf','spi']},
			{firdmgpct:3,natdmgpct:3,frodmgpct:3,splhitrtng:[100/100,'percentOf','spi']}
		],
		x: 3,
		y: 1
	},
	{
		i: 11767,
		n: 'Rolling Thunder',
		m: 2,
		s: [88756,88764],
		d: [
			'When you deal damage with Lightning Bolt or Chain Lightning while your Lightning Shield ability is active, you have a 30% chance to recover 2% of your mana and to generate an additional Lightning Shield charge, up to a maximum of 9 charges.',
			'When you deal damage with Lightning Bolt or Chain Lightning while your Lightning Shield ability is active, you have a 60% chance to recover 2% of your mana and to generate an additional Lightning Shield charge, up to a maximum of 9 charges.'
		],
		x: 0,
		y: 2
	},
	{
		i: 574,
		n: 'Elemental Focus',
		m: 1,
		s: [16164],
		d: [
			'After landing a non-periodic critical strike with a Fire, Frost, or Nature damage spell, you enter a Clearcasting state.  The Clearcasting state reduces the mana cost of your next 2 damage or healing spells by 40%.'
		],
		x: 1,
		y: 2
	},
	{
		i: 1641,
		n: 'Elemental Reach',
		m: 2,
		s: [28999,29000],
		d: [
			'Increases the range of your Lightning Bolt, Chain Lightning, Fire Nova, and Lava Burst spells by 5 yards, and increases the range of your Shock spells and Searing Totem by 7 yards.',
			'Increases the range of your Lightning Bolt, Chain Lightning, Fire Nova, and Lava Burst spells by 10 yards, and increases the range of your Shock spells and Searing Totem by 15 yards.'
		],
		x: 2,
		y: 2
	},
	{
		i: 2049,
		n: 'Elemental Oath',
		m: 2,
		s: [51466,51470],
		d: [
			'While Clearcasting from Elemental Focus is active, you deal 5% more spell damage. In addition, party and raid members within 100 yards receive a 3% bonus to their critical strike chance.',
			'While Clearcasting from Elemental Focus is active, you deal 10% more spell damage. In addition, party and raid members within 100 yards receive a 5% bonus to their critical strike chance.'
		],
		j: [
			{mlecritstrkpct:3,rgdcritstrkpct:3,holsplcritstrkpct:3,firsplcritstrkpct:3,natsplcritstrkpct:3,frosplcritstrkpct:3,shasplcritstrkpct:3,arcsplcritstrkpct:3},
			{mlecritstrkpct:5,rgdcritstrkpct:5,holsplcritstrkpct:5,firsplcritstrkpct:5,natsplcritstrkpct:5,frosplcritstrkpct:5,shasplcritstrkpct:5,arcsplcritstrkpct:5}
		],
		x: 1,
		y: 3,
		r: [8,1]
	},
	{
		i: 2051,
		n: 'Lava Flows',
		m: 3,
		s: [51480,51481,51482],
		d: [
			'Increases the critical strike damage bonus of your Lava Burst spell by an additional 6% and the periodic damage of your Flame Shock by 20%.  In addition, when your Flame Shock is dispelled you gain 10% spell haste for 6 sec.',
			'Increases the critical strike damage bonus of your Lava Burst spell by an additional 12% and the periodic damage of your Flame Shock by 40%.  In addition, when your Flame Shock is dispelled you gain 20% spell haste for 6 sec.',
			'Increases the critical strike damage bonus of your Lava Burst spell by an additional 24% and the periodic damage of your Flame Shock by 60%.  In addition, when your Flame Shock is dispelled you gain 30% spell haste for 6 sec.'
		],
		x: 2,
		y: 3
	},
	{
		i: 11769,
		n: 'Fulmination',
		m: 1,
		s: [88766],
		d: [
			'When you have more than 3 Lightning Shield charges active, your Earth Shock spell will consume any surplus charges, instantly dealing their total damage to the enemy target.'
		],
		x: 0,
		y: 4,
		r: [7,2]
	},
	{
		i: 573,
		n: 'Elemental Mastery',
		m: 1,
		s: [16166],
		d: [
			'When activated, your next Lightning Bolt, Chain Lightning or Lava Burst spell becomes an instant cast spell. In addition, your Fire, Frost, and Nature damage is increased by 15%<!--sp55452:0--><!--sp55452--> and you gain 20% spell haste for 15 sec.'
		],
		t: ['3 min cooldown'],
		x: 1,
		y: 4
	},
	{
		i: 11768,
		n: 'Earth\'s Grasp',
		m: 2,
		s: [51483,51485],
		d: [
			'Grants your Earthbind Totem a 50% chance to root nearby targets for 5 sec when cast.',
			'Grants your Earthbind Totem a 100% chance to root nearby targets for 5 sec when cast.'
		],
		x: 2,
		y: 4
	},
	{
		i: 5565,
		n: 'Totemic Wrath',
		m: 1,
		s: [77746],
		d: [
			'Causes your Fire totems to increase the spell power of party and raid members within 100 yards by 10%.'
		],
		x: 3,
		y: 4
	},
	{
		i: 11368,
		n: 'Feedback',
		m: 3,
		s: [86183,86184,86185],
		d: [
			'Your Lightning Bolt and Chain Lightning spells reduce the remaining cooldown on your Elemental Mastery talent by 1 sec.',
			'Your Lightning Bolt and Chain Lightning spells reduce the remaining cooldown on your Elemental Mastery talent by 2 sec.',
			'Your Lightning Bolt and Chain Lightning spells reduce the remaining cooldown on your Elemental Mastery talent by 3 sec.'
		],
		x: 1,
		y: 5,
		r: [13,1]
	},
	{
		i: 5566,
		n: 'Lava Surge',
		m: 2,
		s: [77755,77756],
		d: [
			'Gives your Flame Shock periodic damage ticks a 10% chance to reset the cooldown of your Lava Burst spell.',
			'Gives your Flame Shock periodic damage ticks a 20% chance to reset the cooldown of your Lava Burst spell.'
		],
		x: 2,
		y: 5
	},
	{
		i: 1687,
		n: 'Earthquake',
		m: 1,
		s: [61882],
		d: [
			'You cause the earth at the target location to tremble and break, dealing <!--pts1-->325<!----> Physical damage every 1 sec to enemies in 8 yard radius, with a 10% chance of knocking down affected targets. Lasts 10 sec.'
		],
		t: ['<table width="100%"><tr><td>60% of base mana</td><th>35 yd range</th></tr></table><table width="100%"><tr><td>2.5 sec cast</td><th>10 sec cooldown</th></tr></table>'],
		x: 1,
		y: 6
	}
	]
},
{
	n: 'Enhancement',
	color: '#FF0000',
	role: 8,
	mastery: {
		description: 'A totemic warrior who strikes foes with weapons imbued with elemental power.',
		spells: [
			{id:60103,name:'Lava Lash',icon:'ability_shaman_lavalash'},
			{id:30814,name:'Mental Quickness',icon:'spell_nature_mentalquickness'},
			{id:86629,name:'Dual Wield',icon:'ability_dualwield'},
			{id:51522,name:'Primal Wisdom',icon:'spell_shaman_spectraltransformation'}
		],
		rating: [
			{id:77223,name:'Enhanced Elements',description:'<!--sp77223:0-->Increases all Fire, Frost, and Nature damage done by 20%.  Each point of Mastery increases damage by an additional 2.5%<!--sp77223-->'}
		]
	},
	icon: 'spell_nature_lightningshield',
	t: [
	{
		i: 611,
		n: 'Elemental Weapons',
		m: 2,
		s: [16266,29079],
		d: [
			'Increases the passive bonuses granted by your Flametongue Weapon and Earthliving Weapon abilities by 20%, the damage of your extra attacks from Windfury Weapon by 20%, and the effectiveness of the ongoing benefits of your Unleash Elements ability by 25%.',
			'Increases the passive bonuses granted by your Flametongue Weapon and Earthliving Weapon abilities by 40%, the damage of your extra attacks from Windfury Weapon by 40%, and the effectiveness of the ongoing benefits of your Unleash Elements ability by 50%.'
		],
		x: 0,
		y: 0
	},
	{
		i: 5560,
		n: 'Focused Strikes',
		m: 3,
		s: [77536,77537,77538],
		d: [
			'Increases the damage dealt by your Primal Strike and Stormstrike abilities by 15%.',
			'Increases the damage dealt by your Primal Strike and Stormstrike abilities by 30%.',
			'Increases the damage dealt by your Primal Strike and Stormstrike abilities by 45%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 607,
		n: 'Improved Shields',
		m: 3,
		s: [16261,16290,51881],
		d: [
			'Increases the damage done by your Lightning Shield orbs by 5%, increases the amount of mana gained from your Water Shield orbs by 5%, and increases the amount of healing done by your Earth Shield orbs by 5%.',
			'Increases the damage done by your Lightning Shield orbs by 10%, increases the amount of mana gained from your Water Shield orbs by 10%, and increases the amount of healing done by your Earth Shield orbs by 10%.',
			'Increases the damage done by your Lightning Shield orbs by 15%, increases the amount of mana gained from your Water Shield orbs by 15%, and increases the amount of healing done by your Earth Shield orbs by 15%.'
		],
		x: 2,
		y: 0
	},
	{
		i: 11216,
		n: 'Elemental Devastation',
		m: 3,
		s: [30160,29179,29180],
		d: [
			'When you deal critical damage with a non-periodic spell, your chance to get a critical strike with melee attacks increases by 3% for 10 sec.',
			'When you deal critical damage with a non-periodic spell, your chance to get a critical strike with melee attacks increases by 6% for 10 sec.',
			'When you deal critical damage with a non-periodic spell, your chance to get a critical strike with melee attacks increases by 9% for 10 sec.'
		],
		x: 0,
		y: 1
	},
	{
		i: 602,
		n: 'Flurry',
		m: 3,
		s: [16256,16281,16282],
		d: [
			'Increases your attack speed by 10% for your next 3 swings after dealing a critical strike.',
			'Increases your attack speed by 20% for your next 3 swings after dealing a critical strike.',
			'Increases your attack speed by 30% for your next 3 swings after dealing a critical strike.'
		],
		x: 1,
		y: 1
	},
	{
		i: 605,
		n: 'Ancestral Swiftness',
		m: 2,
		s: [16262,16287],
		d: [
			'Reduces the cast time of your Ghost Wolf spell by 1 sec and increases movement speed by 7%.  This does not stack with other movement speed increasing effects.',
			'Reduces the cast time of your Ghost Wolf spell by 2 sec and increases movement speed by 15%.  This does not stack with other movement speed increasing effects.'
		],
		x: 2,
		y: 1
	},
	{
		i: 11432,
		n: 'Totemic Reach',
		m: 2,
		s: [86935,86936],
		d: [
			'Increases the range of your totems\' effects by 15%.',
			'Increases the range of your totems\' effects by 30%.'
		],
		x: 3,
		y: 1
	},
	{
		i: 615,
		n: 'Toughness',
		m: 3,
		s: [16252,16306,16307],
		d: [
			'Increases your Stamina by 3%, and reduces the duration of movement slowing effects on you by 10%.',
			'Increases your Stamina by 7%, and reduces the duration of movement slowing effects on you by 20%.',
			'Increases your Stamina by 10%, and reduces the duration of movement slowing effects on you by 30%.'
		],
		j: [
			{sta:[3/100,'percentOf','sta']},
			{sta:[7/100,'percentOf','sta']},
			{sta:[10/100,'percentOf','sta']}
		],
		x: 0,
		y: 2
	},
	{
		i: 901,
		n: 'Stormstrike',
		m: 1,
		s: [17364],
		d: [
			'Instantly strike an enemy with both weapons, dealing 125% weapon damage and granting you an additional 25% chance to critically strike that enemy with your Lightning Bolt, Chain Lightning, Lightning Shield, and Earth Shock spells for 15 sec.'
		],
		t: ['<table width="100%"><tr><td>8% of base mana</td><th>Melee Range</th></tr></table><table width="100%"><tr><td>Instant</td><th>8 sec cooldown</th></tr></table>','Requires Melee Weapon'],
		x: 1,
		y: 2
	},
	{
		i: 2055,
		n: 'Static Shock',
		m: 3,
		s: [51525,51526,51527],
		d: [
			'When you use your Primal Strike, Stormstrike, or Lava Lash abilities while having Lightning Shield active, you have a 15% chance to deal damage equal to a Lightning Shield orb without consuming a charge.',
			'When you use your Primal Strike, Stormstrike, or Lava Lash abilities while having Lightning Shield active, you have a 30% chance to deal damage equal to a Lightning Shield orb without consuming a charge.',
			'When you use your Primal Strike, Stormstrike, or Lava Lash abilities while having Lightning Shield active, you have a 45% chance to deal damage equal to a Lightning Shield orb without consuming a charge.'
		],
		x: 2,
		y: 2
	},
	{
		i: 11220,
		n: 'Frozen Power',
		m: 2,
		s: [63373,63374],
		d: [
			'Increases the damage done by your Lightning Bolt, Chain Lightning, Lava Lash, and Shock spells by 5% on targets afflicted by your Frostbrand Attack effect, and your Frost Shock has a 50% chance to root the target in ice for 5 sec. when used on targets at or further than 15 yards from you.',
			'Increases the damage done by your Lightning Bolt, Chain Lightning, Lava Lash, and Shock spells by 10% on targets afflicted by your Frostbrand Attack effect, and your Frost Shock has a 100% chance to root the target in ice for 5 sec. when used on targets at or further than 15 yards from you.'
		],
		x: 0,
		y: 3
	},
	{
		i: 11770,
		n: 'Seasoned Winds',
		m: 2,
		s: [16086,16544],
		d: [
			'When you successfully interrupt an enemy spellcast with Wind Shear, you gain ((<span class="w">floor</span>(<span class="w">cond</span>($lte(<span class="w">level</span>, 70), <span class="w"> level</span>, <span class="w"> cond</span>($lte(<span class="w">level</span>, 80), <span class="w"> level</span> + (<span class="w">level</span>) * 5, <span class="w"> level</span> + (<span class="w">level</span>) * 5 + (<span class="w">level</span>) * 7)) / 2))) resistance to that spell\'s magical school for 10 sec.',
			'When you successfully interrupt an enemy spellcast with Wind Shear, you gain (<span class="w">cond</span>($lte(<span class="w">level</span>, 70), <span class="w"> level</span>, <span class="w"> cond</span>($lte(<span class="w">level</span>, 80), <span class="w"> level</span> + (<span class="w">level</span>) * 5, <span class="w"> level</span> + (<span class="w">level</span>) * 5 + (<span class="w">level</span>) * 7))) resistance to that spell\'s magical school for 10 sec.'
		],
		x: 1,
		y: 3
	},
	{
		i: 2083,
		n: 'Searing Flames',
		m: 3,
		s: [77655,77656,77657],
		d: [
			'Causes the Searing Bolts from your Searing Totem to have a 33% chance to set their targets aflame, dealing damage equal to the Searing Bolt\'s impact damage over 15 sec. Stacks up to 5 times.',
			'Causes the Searing Bolts from your Searing Totem to have a 67% chance to set their targets aflame, dealing damage equal to the Searing Bolt\'s impact damage over 15 sec. Stacks up to 5 times.',
			'Causes the Searing Bolts from your Searing Totem to have a 100% chance to set their targets aflame, dealing damage equal to the Searing Bolt\'s impact damage over 15 sec. Stacks up to 5 times.'
		],
		x: 2,
		y: 3
	},
	{
		i: 2056,
		n: 'Earthen Power',
		m: 2,
		s: [51523,51524],
		d: [
			'Your Earthbind Totem\'s pulses have a 50% chance to also remove all snare effects from you and nearby friendly targets.',
			'Your Earthbind Totem\'s pulses have a 100% chance to also remove all snare effects from you and nearby friendly targets.'
		],
		x: 0,
		y: 4
	},
	{
		i: 1693,
		n: 'Shamanistic Rage',
		m: 1,
		s: [30823],
		d: [
			'Reduces all damage taken by 30%<!--sp63280:0--><!--sp63280--> and causes your skills, totems, and offensive spells to consume no mana for 15 sec. This spell is usable while stunned.'
		],
		t: ['1 min cooldown'],
		x: 1,
		y: 4
	},
	{
		i: 1689,
		n: 'Unleashed Rage',
		m: 2,
		s: [30802,30808],
		d: [
			'Increases your expertise by 4, and increases all party and raid members\' attack power by 5% while within 100 yards of the Shaman.',
			'Increases your expertise by 8, and increases all party and raid members\' attack power by 10% while within 100 yards of the Shaman.'
		],
		j: [
			{exp:4,mleatkpwr:[5/100,'percentOf','mleatkpwr'],rgdatkpwr:[5/100,'percentOf','rgdatkpwr']},
			{exp:8,mleatkpwr:[10/100,'percentOf','mleatkpwr'],rgdatkpwr:[10/100,'percentOf','rgdatkpwr']}
		],
		x: 3,
		y: 4
	},
	{
		i: 2057,
		n: 'Maelstrom Weapon',
		m: 3,
		s: [51528,51529,51530],
		d: [
			'When you deal damage with a melee weapon, you have a chance to reduce the cast time and mana cost of your next Lightning Bolt, Chain Lightning, Hex, or any healing spell by 20%. Stacks up to 5 times. Lasts 30 sec.',
			'When you deal damage with a melee weapon, you have a chance (higher than rank 1) to reduce the cast time and mana cost of your next Lightning Bolt, Chain Lightning, Hex, or any healing spell by 20%. Stacks up to 5 times. Lasts 30 sec.',
			'When you deal damage with a melee weapon, you have a chance (higher than rank 2) to reduce the cast time and mana cost of your next Lightning Bolt, Chain Lightning, Hex, or any healing spell by 20%. Stacks up to 5 times. Lasts 30 sec.'
		],
		x: 1,
		y: 5
	},
	{
		i: 5563,
		n: 'Improved Lava Lash',
		m: 2,
		s: [77700,77701],
		d: [
			'Increases the damage of your Lava Lash ability by 15%, and by an additional 10% for each of your applications of Searing Flames on the target, consuming those applications in the process.',
			'Increases the damage of your Lava Lash ability by 30%, and by an additional 20% for each of your applications of Searing Flames on the target, consuming those applications in the process.'
		],
		x: 2,
		y: 5,
		r: [12,3]
	},
	{
		i: 2058,
		n: 'Feral Spirit',
		m: 1,
		s: [51533],
		d: [
			'Summons two Spirit Wolves under the command of the Shaman, lasting 30 sec.'
		],
		t: ['<table width="100%"><tr><td>12% of base mana</td><th>30 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>2 min cooldown</th></tr></table>'],
		x: 1,
		y: 6
	}
	]
},
{
	n: 'Restoration',
	color: '#4D80FF',
	role: 4,
	mastery: {
		description: 'A healer who calls upon ancestral spirits and the cleansing power of water to mend allies\' wounds.',
		spells: [
			{id:974,name:'Earth Shield',icon:'spell_nature_skinofearth'},
			{id:16213,name:'Purification',icon:'spell_frost_wizardmark'},
			{id:95862,name:'Meditation',icon:'spell_nature_sleep'}
		],
		rating: [
			{id:77226,name:'Deep Healing',description:'<!--sp77226:0-->Increases the potency of your healing spells by up to 24%, based on the current health level of your target (lower health targets are healed for more).  Each point of Mastery increases healing by up to an additional 3.0%.<!--sp77226-->'}
		]
	},
	icon: 'spell_nature_magicimmunity',
	t: [
	{
		i: 5568,
		n: 'Ancestral Resolve',
		m: 2,
		s: [77829,77830],
		d: [
			'Reduces damage taken while casting spells by 5%.',
			'Reduces damage taken while casting spells by 10%.'
		],
		x: 0,
		y: 0
	},
	{
		i: 593,
		n: 'Tidal Focus',
		m: 3,
		s: [16179,16214,16215],
		d: [
			'Reduces the mana cost of your healing spells by 2%.',
			'Reduces the mana cost of your healing spells by 4%.',
			'Reduces the mana cost of your healing spells by 6%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 11177,
		n: 'Spark of Life',
		m: 3,
		s: [84846,84847,84848],
		d: [
			'Increases your healing done by 2% and your healing received by 5%.',
			'Increases your healing done by 4% and your healing received by 10%.',
			'Increases your healing done by 6% and your healing received by 15%.'
		],
		j: [
			{_healpct:5,healpct:2},
			{_healpct:10,healpct:4},
			{_healpct:15,healpct:6}
		],
		x: 2,
		y: 0
	},
	{
		i: 583,
		n: 'Improved Water Shield',
		m: 2,
		s: [16180,16196],
		d: [
			'You have a 50% chance to instantly gain mana as if you consumed a Water Shield Orb when you gain a critical effect from your Healing Wave, Greater Healing Wave, or Riptide spells, a 30% chance when you gain a critical effect from your Healing Surge spell, and a 15% chance when you gain a critical effect from your Chain Heal spell.',
			'You have a 100% chance to instantly gain mana as if you consumed a Water Shield Orb when you gain a critical effect from your Healing Wave, Greater Healing Wave, or Riptide spells, a 60% chance when you gain a critical effect from your Healing Surge spell, and a 30% chance when you gain a critical effect from your Chain Heal spell.'
		],
		x: 0,
		y: 1
	},
	{
		i: 595,
		n: 'Totemic Focus',
		m: 2,
		s: [16173,16222],
		d: [
			'Reduces the mana cost of your totems by 15% and increases their duration by 20%.',
			'Reduces the mana cost of your totems by 30% and increases their duration by 40%.'
		],
		x: 1,
		y: 1
	},
	{
		i: 5567,
		n: 'Focused Insight',
		m: 3,
		s: [77794,77795,77796],
		d: [
			'After casting any Shock spell, your next heal\'s mana cost is reduced by 25% of the cost of the Shock spell, and its healing effectiveness is increased by 10%.',
			'After casting any Shock spell, your next heal\'s mana cost is reduced by 50% of the cost of the Shock spell, and its healing effectiveness is increased by 20%.',
			'After casting any Shock spell, your next heal\'s mana cost is reduced by 75% of the cost of the Shock spell, and its healing effectiveness is increased by 30%.'
		],
		x: 2,
		y: 1
	},
	{
		i: 1699,
		n: 'Nature\'s Guardian',
		m: 3,
		s: [30881,30883,30884],
		d: [
			'Whenever a damaging attack brings you below 30% health, your maximum health is increased by 5% for 10 sec and your threat level towards the attacker is reduced.  30 second cooldown.',
			'Whenever a damaging attack brings you below 30% health, your maximum health is increased by 10% for 10 sec and your threat level towards the attacker is reduced.  30 second cooldown.',
			'Whenever a damaging attack brings you below 30% health, your maximum health is increased by 15% for 10 sec and your threat level towards the attacker is reduced.  30 second cooldown.'
		],
		x: 3,
		y: 1
	},
	{
		i: 581,
		n: 'Ancestral Healing',
		m: 2,
		s: [16176,16235],
		d: [
			'Reduces your target\'s physical damage taken by 5% for 15 sec after receiving a critical effect from one of your healing spells.',
			'Reduces your target\'s physical damage taken by 10% for 15 sec after receiving a critical effect from one of your healing spells.'
		],
		x: 0,
		y: 2
	},
	{
		i: 591,
		n: 'Nature\'s Swiftness',
		m: 1,
		s: [16188],
		d: [
			'When activated, your next Nature spell with a base casting time less than 10 sec. becomes an instant cast spell.'
		],
		t: ['2 min cooldown'],
		x: 1,
		y: 2
	},
	{
		i: 1696,
		n: 'Nature\'s Blessing',
		m: 3,
		s: [30867,30868,30869],
		d: [
			'Increases the effectiveness of your direct heals on Earth Shielded targets by 6%.',
			'Increases the effectiveness of your direct heals on Earth Shielded targets by 12%.',
			'Increases the effectiveness of your direct heals on Earth Shielded targets by 18%.'
		],
		x: 2,
		y: 2
	},
	{
		i: 588,
		n: 'Soothing Rains',
		m: 2,
		s: [16187,16205],
		d: [
			'Increases the amount healed by your Healing Stream Totem by 25%, and your Healing Rain spell by 15%.',
			'Increases the amount healed by your Healing Stream Totem by 50%, and your Healing Rain spell by 30%.'
		],
		x: 1,
		y: 3
	},
	{
		i: 2084,
		n: 'Improved Cleanse Spirit',
		m: 1,
		s: [77130],
		d: [
			'Empowers your Cleanse Spirit spell to also remove a magic effect from a friendly target.'
		],
		x: 2,
		y: 3
	},
	{
		i: 11435,
		n: 'Cleansing Waters',
		m: 2,
		s: [86959,86962],
		d: [
			'Reduces the cost of Cleanse Spirit by 20%, and when your Cleanse Spirit successfully removes a harmful effect, you also heal the target for <!--pts1-->1317 to 1485<!---->.',
			'Reduces the cost of Cleanse Spirit by 40%, and when your Cleanse Spirit successfully removes a harmful effect, you also heal the target for <!--pts1-->2634 to 2970<!---->.'
		],
		x: 3,
		y: 3,
		r: [11,1]
	},
	{
		i: 2061,
		n: 'Ancestral Awakening',
		m: 3,
		s: [51556,51557,51558],
		d: [
			'When you critically heal with a single-target direct heal, you summon an Ancestral spirit to aid you, instantly healing the lowest percentage health friendly party or raid target within 40 yards for 10% of the amount healed.',
			'When you critically heal with a single-target direct heal, you summon an Ancestral spirit to aid you, instantly healing the lowest percentage health friendly party or raid target within 40 yards for 20% of the amount healed.',
			'When you critically heal with a single-target direct heal, you summon an Ancestral spirit to aid you, instantly healing the lowest percentage health friendly party or raid target within 40 yards for 30% of the amount healed.'
		],
		x: 0,
		y: 4,
		r: [7,2]
	},
	{
		i: 590,
		n: 'Mana Tide Totem',
		m: 1,
		s: [16190],
		d: [
			'Summons a Mana Tide Totem with 10% of the caster\'s health at the feet of the caster for 12 sec.  Party and raid members within 40 yards of the totem gain 400% of the caster\'s Spirit (excluding short - duration Spirit bonuses).'
		],
		t: ['3 min cooldown','Tools:<br /><div class="indent q1"><a href="/items&amp;filter=cr=91;crs=5;crv=0">Water Totem</a></div>'],
		x: 1,
		y: 4
	},
	{
		i: 7705,
		n: 'Telluric Currents',
		m: 2,
		s: [82984,82988],
		d: [
			'Your attunement to natural energies causes your Lightning Bolt spell to restore mana equal to 20% of damage dealt.',
			'Your attunement to natural energies causes your Lightning Bolt spell to restore mana equal to 40% of damage dealt.'
		],
		x: 2,
		y: 4
	},
	{
		i: 15487,
		n: 'Spirit Link Totem',
		m: 1,
		s: [98008],
		d: [
			'Summons a Spirit Link Totem with 5 health at the feet of the caster. The totem reduces damage taken by all party and raid members within 10 yards by 10%. Every 1 sec, the health of all affected players is redistributed, such that each player ends up with the same percentage of their maximum health. Lasts 6 sec.'
		],
		t: ['11% of base mana<table width="100%"><tr><td>Instant</td><th>3 min cooldown</th></tr></table>','Tools:<br /><div class="indent q1"><a href="/items&amp;filter=cr=91;crs=3;crv=0">Air Totem</a></div>'],
		x: 3,
		y: 4
	},
	{
		i: 2063,
		n: 'Tidal Waves',
		m: 3,
		s: [51562,51563,51564],
		d: [
			'When you cast Chain Heal or Riptide, you gain the Tidal Waves effect, which reduces the cast time of your Healing Wave and Greater Healing Wave spells by 10% and increases the critical effect chance of your Healing Surge spell by 10%. 2 charges.',
			'When you cast Chain Heal or Riptide, you gain the Tidal Waves effect, which reduces the cast time of your Healing Wave and Greater Healing Wave spells by 20% and increases the critical effect chance of your Healing Surge spell by 20%. 2 charges.',
			'When you cast Chain Heal or Riptide, you gain the Tidal Waves effect, which reduces the cast time of your Healing Wave and Greater Healing Wave spells by 30% and increases the critical effect chance of your Healing Surge spell by 30%. 2 charges.'
		],
		x: 1,
		y: 5
	},
	{
		i: 2060,
		n: 'Blessing of the Eternals',
		m: 2,
		s: [51554,51555],
		d: [
			'Grants an additional 40% chance to trigger your Earthliving heal over time effect when you heal an ally who is below 35% of total health.',
			'Grants an additional 80% chance to trigger your Earthliving heal over time effect when you heal an ally who is below 35% of total health.'
		],
		x: 2,
		y: 5
	},
	{
		i: 2064,
		n: 'Riptide',
		m: 1,
		s: [61295],
		d: [
			'Heals a friendly target for <!--pts1-->2363<!----> and another <!--pts2:3:5-->3725<!----> over 15 sec.  Your next Chain Heal cast on that primary target within 15 sec will consume the healing over time effect and increase the amount of the Chain Heal by 25%.'
		],
		t: ['<table width="100%"><tr><td>10% of base mana</td><th>40 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>6 sec cooldown</th></tr></table><!--?61295:40:85:85:255:0:1000-->'],
		x: 1,
		y: 6
	}
	]
}
]);