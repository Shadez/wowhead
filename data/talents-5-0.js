$WowheadTalentCalculator.registerClass(5, [
{
	n: 'Discipline',
	color: '#FFB81A',
	role: 4,
	mastery: {
		description: 'Uses magic to shield allies from taking damage as well as heal their wounds.',
		spells: [
			{id:47540,name:'Penance',icon:'spell_holy_penance'},
			{id:84732,name:'Enlightenment',icon:'spell_arcane_mindmastery'},
			{id:95860,name:'Meditation',icon:'spell_nature_sleep'},
			{id:33167,name:'Absolution',icon:'spell_holy_absolution'}
		],
		rating: [
			{id:77484,name:'Shield Discipline',description:'<!--sp77484:0-->Increases  the potency of all your damage absorption spells by 20%.  Each point of Mastery increases the potency of absorbs by an additional 2.5%.<!--sp77484-->'}
		]
	},
	icon: 'spell_holy_powerwordshield',
	t: [
	{
		i: 10736,
		n: 'Improved Power Word: Shield',
		m: 2,
		s: [14748,14768],
		d: [
			'Increases the damage absorbed by your Power Word: Shield by 10%.',
			'Increases the damage absorbed by your Power Word: Shield by 20%.'
		],
		x: 0,
		y: 0
	},
	{
		i: 8577,
		n: 'Twin Disciplines',
		m: 3,
		s: [47586,47587,47588],
		d: [
			'Increases your Shadow and Holy spell damage and healing by 2%.',
			'Increases your Shadow and Holy spell damage and healing by 4%.',
			'Increases your Shadow and Holy spell damage and healing by 6%.'
		],
		j: [
			{holdmgpct:2,shadmgpct:2,healpct:2},
			{holdmgpct:4,shadmgpct:4,healpct:4},
			{holdmgpct:6,shadmgpct:6,healpct:6}
		],
		x: 1,
		y: 0
	},
	{
		i: 8595,
		n: 'Mental Agility',
		m: 3,
		s: [14520,14780,14781],
		d: [
			'Reduces the mana cost of your instant cast spells by 4%.',
			'Reduces the mana cost of your instant cast spells by 7%.',
			'Reduces the mana cost of your instant cast spells by 10%.'
		],
		x: 2,
		y: 0
	},
	{
		i: 8593,
		n: 'Evangelism',
		m: 2,
		s: [81659,81662],
		d: [
			'When you cast Smite, Holy Fire or Mind Flay you gain Evangelism. Stacks up to 5 times. Lasts for 20 sec.<br /><br /><span style="color: #FFFFFF">Evangelism (Smite, Holy Fire)</span><br />Increases the damage done by your Smite, Holy Fire, and Penance spells by 2% and reduces the mana cost of those spells by 3%.<br /><br /><span style="color: #FFFFFF">Dark Evangelism (Mind Flay)</span><br />Increases the damage done by your Periodic Shadow spells by 1%.',
			'When you cast Smite, Holy Fire or Mind Flay you gain Evangelism. Stacks up to 5 times. Lasts for 20 sec.<br /><br /><span style="color: #FFFFFF">Evangelism (Smite, Holy Fire)</span><br />Increases the damage done by your Smite, Holy Fire, and Penance spells by 4% and reduces the mana cost of those spells by 6%.<br /><br /><span style="color: #FFFFFF">Dark Evangelism (Mind Flay)</span><br />Increases the damage done by your Periodic Shadow spells by 2%.'
		],
		x: 0,
		y: 1
	},
	{
		i: 11608,
		n: 'Archangel',
		m: 1,
		s: [87151],
		d: [
			'Consumes your Evangelism effects, causing an effect depending on what type of Evangelism effect is consumed:<br /><br /><span style="color: #FFFFFF">Archangel (Evangelism)</span><br />Instantly restores 1% of your total mana and increases your healing done by 3% for each stack. Lasts for 18 sec. 30 sec cooldown.<br /><br /><span style="color: #FFFFFF">Dark Archangel (Dark Evangelism)</span><br />Instantly restores 5% of your total mana and increases the damage done by your Mind Flay, Mind Spike, Mind Blast and Shadow Word: Death by 4% for each stack. Lasts for 18 sec. 90 sec cooldown.'
		],
		x: 1,
		y: 1,
		r: [3,2]
	},
	{
		i: 8581,
		n: 'Inner Sanctum',
		m: 3,
		s: [14747,14770,14771],
		d: [
			'Your Inner Fire also reduces all spell damage taken by 2% while it is active, and the movement speed bonus of your Inner Will is increased by 2%.',
			'Your Inner Fire also reduces all spell damage taken by 4% while it is active, and the movement speed bonus of your Inner Will is increased by 4%.',
			'Spell damage taken is reduced by 6% while within Inner Fire, and the movement speed bonus of your Inner Will is increased by 6%.'
		],
		x: 2,
		y: 1
	},
	{
		i: 8607,
		n: 'Soul Warding',
		m: 2,
		s: [63574,78500],
		d: [
			'Reduces the cooldown of your Power Word: Shield ability by 1 sec.',
			'Reduces the cooldown of your Power Word: Shield ability by 2 sec.'
		],
		x: 3,
		y: 1
	},
	{
		i: 11224,
		n: 'Renewed Hope',
		m: 2,
		s: [57470,57472],
		d: [
			'Increases the critical effect chance of your Flash Heal, Greater Heal, Heal and Penance (Heal) spells by 5% on targets afflicted by the Weakened Soul effect, or blessed with your Grace effect.',
			'Increases the critical effect chance of your Flash Heal, Greater Heal, Heal and Penance (Heal) spells by 10% on targets afflicted by the Weakened Soul effect, or blessed with your Grace effect.'
		],
		x: 0,
		y: 2
	},
	{
		i: 8611,
		n: 'Power Infusion',
		m: 1,
		s: [10060],
		d: [
			'Infuses the target with power, increasing spell casting speed by 20% and reducing the mana cost of all spells by 20%.  Lasts 15 sec.'
		],
		t: ['<table width="100%"><tr><td>16% of base mana</td><th>40 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>2 min cooldown</th></tr></table>'],
		x: 1,
		y: 2
	},
	{
		i: 11812,
		n: 'Atonement',
		m: 2,
		s: [14523,81749],
		d: [
			'When you deal damage with Smite or Holy Fire, you instantly heal a nearby low health friendly target within 15 yards from the enemy target equal to 50% of the damage dealt.<br /><br />If the Priest is healed through Atonement, the effect is reduced in half.',
			'When you deal damage with Smite or Holy Fire, you instantly heal a nearby low health friendly target within 15 yards from the enemy target equal to 100% of the damage dealt.<br /><br />If the Priest is healed through Atonement, the effect is reduced in half.'
		],
		x: 2,
		y: 2
	},
	{
		i: 8591,
		n: 'Inner Focus',
		m: 1,
		s: [89485],
		d: [
			'Reduces the mana cost of your next Flash Heal, Binding Heal, Greater Heal or Prayer of Healing by 100% and increases its critical effect chance by 25%.'
		],
		t: ['45 sec cooldown'],
		x: 3,
		y: 2
	},
	{
		i: 8617,
		n: 'Rapture',
		m: 3,
		s: [47535,47536,47537],
		d: [
			'When your Power Word: Shield is completely absorbed or dispelled you are instantly energized with 2% of your total mana. This effect can only occur once every 12 sec.',
			'When your Power Word: Shield is completely absorbed or dispelled you are instantly energized with 5% of your total mana. This effect can only occur once every 12 sec.',
			'When your Power Word: Shield is completely absorbed or dispelled you are instantly energized with 7% of your total mana. This effect can only occur once every 12 sec.'
		],
		x: 1,
		y: 3
	},
	{
		i: 11523,
		n: 'Borrowed Time',
		m: 2,
		s: [52795,52797],
		d: [
			'Grants 7% spell haste for your next spell after casting Power Word: Shield. Lasts for 6 sec.',
			'Grants 14% spell haste for your next spell after casting Power Word: Shield. Lasts for 6 sec.'
		],
		x: 2,
		y: 3
	},
	{
		i: 8605,
		n: 'Reflective Shield',
		m: 2,
		s: [33201,33202],
		d: [
			'Causes 22% of the damage you absorb with Power Word: Shield to reflect back at the attacker.  This damage causes no threat.',
			'Causes 45% of the damage you absorb with Power Word: Shield to reflect back at the attacker.  This damage causes no threat.'
		],
		x: 3,
		y: 3
	},
	{
		i: 11813,
		n: 'Strength of Soul',
		m: 2,
		s: [89488,89489],
		d: [
			'When you heal a target with your Heal, Greater Heal or Flash Heal spell, the duration of the weakened soul debuff on the target is reduced by 2 sec.<br /><br />In addition, when you cast Inner Focus you become immune to Silence, Interrupt and Dispel effects for 3 sec.',
			'When you heal a target with your Heal, Greater Heal or Flash Heal spell, the duration of the weakened soul debuff on the target is reduced by 4 sec.<br /><br />In addition, when you cast Inner Focus you become immune to Silence, Interrupt and Dispel effects for 5 sec.'
		],
		x: 0,
		y: 4,
		r: [7,2]
	},
	{
		i: 8609,
		n: 'Divine Aegis',
		m: 3,
		s: [47509,47511,47515],
		d: [
			'Critical heals and all heals from Prayer of Healing create a protective shield on the target, absorbing 10% of the amount healed. Lasts 15 sec.',
			'Critical heals and all heals from Prayer of Healing create a protective shield on the target, absorbing 20% of the amount healed. Lasts 15 sec.',
			'Critical heals and all heals from Prayer of Healing create a protective shield on the target, absorbing 30% of the amount healed. Lasts 15 sec.'
		],
		x: 1,
		y: 4
	},
	{
		i: 8623,
		n: 'Pain Suppression',
		m: 1,
		s: [33206],
		d: [
			'Instantly reduces a friendly target\'s threat by 5%, and reduces all damage they take by 40% for 8 sec.'
		],
		t: ['<table width="100%"><tr><td>8% of base mana</td><th>40 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>3 min cooldown</th></tr></table>'],
		x: 2,
		y: 4
	},
	{
		i: 12183,
		n: 'Train of Thought',
		m: 2,
		s: [92295,92297],
		d: [
			'You have a 100% chance when you heal with Greater Heal to reduce the cooldown of your Inner Focus by 5 sec.<br /><br />You have a 100% chance when you Smite to reduce the cooldown of your Penance by 0 sec.',
			'You have a 100% chance when you heal with Greater Heal to reduce the cooldown of your Inner Focus by 5 sec.<br /><br />You have a 100% chance when you Smite to reduce the cooldown of your Penance by 0 sec.'
		],
		x: 3,
		y: 4
	},
	{
		i: 8621,
		n: 'Focused Will',
		m: 2,
		s: [45234,45243],
		d: [
			'Whenever you are victim of an attack equal to damage greater than 10% of your total health or critically hit by any attack, you gain Focused Will reducing all damage taken by 5% lasting for 8 sec. Stacks up to 2 times.',
			'Whenever you are victim of an attack equal to damage greater than 10% of your total health or critically hit by any attack, you gain Focused Will reducing all damage taken by 10% lasting for 8 sec. Stacks up to 2 times.'
		],
		x: 0,
		y: 5
	},
	{
		i: 8625,
		n: 'Grace',
		m: 2,
		s: [47516,47517],
		d: [
			'Your Flash Heal, Greater Heal, Heal and Penance spells bless the target with Grace, increasing all healing received from the Priest by 4%. This effect will stack up to 3 times. Effect lasts 15 sec.',
			'Your Flash Heal, Greater Heal, Heal and Penance spells bless the target with Grace, increasing all healing received from the Priest by 8%. This effect will stack up to 3 times. Effect lasts 15 sec.'
		],
		x: 2,
		y: 5
	},
	{
		i: 8603,
		n: 'Power Word: Barrier',
		m: 1,
		s: [62618],
		d: [
			'Summons a holy barrier on the target location that reduces all damage done to friendly targets by 25%<!--sp55689:0--><!--sp55689-->. While within the barrier, spellcasting will not be interrupted by damage. The barrier lasts for 10 sec.'
		],
		t: ['<table width="100%"><tr><td>30% of base mana</td><th>40 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>3 min cooldown</th></tr></table>'],
		x: 1,
		y: 6,
		r: [15,3]
	}
	]
},
{
	n: 'Holy',
	color: '#FF0000',
	role: 4,
	mastery: {
		description: 'A versatile healer who can reverse damage on individuals or groups and even heal from beyond the grave.',
		spells: [
			{id:88625,name:'Holy Word: Chastise',icon:'spell_holy_chastise'},
			{id:87336,name:'Spiritual Healing',icon:'spell_holy_impholyconcentration'},
			{id:95861,name:'Meditation',icon:'spell_nature_sleep'},
			{id:33167,name:'Absolution',icon:'spell_holy_absolution'}
		],
		rating: [
			{id:77485,name:'Echo of Light',description:'<!--sp77485:0-->Your direct healing spells heal for an additional 10% over 6 sec.  Each point of Mastery provides an additional 1.25% healing over 6 sec.<!--sp77485-->'}
		]
	},
	icon: 'spell_holy_guardianspirit',
	t: [
	{
		i: 10746,
		n: 'Improved Renew',
		m: 2,
		s: [14908,15020],
		d: [
			'Increases the amount healed by your Renew spell by 5%.',
			'Increases the amount healed by your Renew spell by 10%.'
		],
		x: 0,
		y: 0
	},
	{
		i: 9553,
		n: 'Empowered Healing',
		m: 3,
		s: [33158,33159,33160],
		d: [
			'Increases the healing done by your Flash Heal, Heal, Binding Heal and Greater Heal by 5%.',
			'Increases the healing done by your Flash Heal, Heal, Binding Heal and Greater Heal by 10%.',
			'Increases the healing done by your Flash Heal, Heal, Binding Heal and Greater Heal by 15%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 9549,
		n: 'Divine Fury',
		m: 3,
		s: [18530,18531,18533],
		d: [
			'Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by .15 sec.',
			'Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.35 sec.',
			'Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0 sec.'
		],
		x: 2,
		y: 0
	},
	{
		i: 11669,
		n: 'Desperate Prayer',
		m: 1,
		s: [19236],
		d: [
			'Instantly heals the caster for 30% of their total health.'
		],
		t: ['2 min cooldown'],
		x: 1,
		y: 1
	},
	{
		i: 11765,
		n: 'Surge of Light',
		m: 2,
		s: [88687,88690],
		d: [
			'You have a 3% chance when you Smite, Heal, Flash Heal, Binding Heal or Greater Heal to cause your next Flash Heal to be instant cast and cost no mana.',
			'You have a 6% chance when you Smite, Heal, Flash Heal, Binding Heal or Greater Heal to cause your next Flash Heal to be instant cast and cost no mana.'
		],
		x: 2,
		y: 1
	},
	{
		i: 9561,
		n: 'Inspiration',
		m: 2,
		s: [14892,15362],
		d: [
			'Reduces your target\'s physical damage taken by 5% for 15 sec after getting a critical effect from your Flash Heal, Heal, Greater Heal, Binding Heal, Penance, Prayer of Mending, Prayer of Healing, or Circle of Healing spell.',
			'Reduces your target\'s physical damage taken by 10% for 15 sec after getting a critical effect from your Flash Heal, Heal, Greater Heal, Binding Heal, Penance, Prayer of Mending, Prayer of Healing, or Circle of Healing spell.'
		],
		x: 3,
		y: 1
	},
	{
		i: 9593,
		n: 'Divine Touch',
		m: 2,
		s: [63534,63542],
		d: [
			'Your Renew will instantly heal the target for 5% of the total periodic effect.',
			'Your Renew will instantly heal the target for 10% of the total periodic effect.'
		],
		x: 0,
		y: 2,
		r: [0,2]
	},
	{
		i: 9577,
		n: 'Holy Concentration',
		m: 2,
		s: [34753,34859],
		d: [
			'Increases the amount of mana regeneration from Spirit while in combat by an additional 15%.',
			'Increases the amount of mana regeneration from Spirit while in combat by an additional 30%.'
		],
		j: [
			{manargn:[15/100,'percentOf','spimanargn'],oocmanargn:[-15/100,'percentOf','spimanargn']},
			{manargn:[30/100,'percentOf','spimanargn'],oocmanargn:[-30/100,'percentOf','spimanargn']}
		],
		x: 1,
		y: 2
	},
	{
		i: 11666,
		n: 'Lightwell',
		m: 1,
		s: [724],
		d: [
			'Creates a Holy Lightwell.  Friendly players can click the Lightwell to restore ((<!--pts1:1-->2878<!----> + ($SP * .308)) * 3)*(1.15 * <!--sp47588:0--> <!--sp47587:0--> <!--sp47586:0--> 1<!--sp47586--><!--sp47587--><!--sp47588-->) health over 6 sec.  Attacks done to you equal to 30% of your total health will cancel the effect. Lightwell lasts for 3 min or 10 charges.'
		],
		t: ['<table width="100%"><tr><td>30% of base mana</td><th>40 yd range</th></tr></table><table width="100%"><tr><td>0.5 sec cast</td><th>3 min cooldown</th></tr></table>'],
		x: 2,
		y: 2
	},
	{
		i: 12184,
		n: 'Tome of Light',
		m: 2,
		s: [14898,81625],
		d: [
			'Reduces the cooldown of your Holy Word spells by 15%.',
			'Reduces the cooldown of your Holy Word spells by 30%'
		],
		x: 3,
		y: 2
	},
	{
		i: 14738,
		n: 'Rapid Renewal',
		m: 1,
		s: [95649],
		d: [
			'Reduces the global cooldown of your Renew by 0 sec.'
		],
		x: 0,
		y: 3,
		r: [6,2]
	},
	{
		i: 11670,
		n: 'Spirit of Redemption',
		m: 1,
		s: [20711],
		d: [
			'Upon death, the priest becomes the Spirit of Redemption for 15 sec.  The Spirit of Redemption cannot move, attack, be attacked or targeted by any spells or effects.  While in this form the priest can cast any healing spell free of cost.  When the effect ends, the priest dies.'
		],
		x: 2,
		y: 3
	},
	{
		i: 9573,
		n: 'Serendipity',
		m: 2,
		s: [63730,63733],
		d: [
			'When you heal with Binding Heal or Flash Heal, the cast time of your next Greater Heal or Prayer of Healing spell is reduced by 10% and mana cost reduced by 5%. Stacks up to 2 times. Lasts 20 sec.',
			'When you heal with Binding Heal or Flash Heal, the cast time of your next Greater Heal or Prayer of Healing spell is reduced by 20% and mana cost reduced by 10%. Stacks up to 2 times. Lasts 20 sec.'
		],
		x: 3,
		y: 3
	},
	{
		i: 9587,
		n: 'Body and Soul',
		m: 2,
		s: [64127,64129],
		d: [
			'When you cast Power Word: Shield or Leap of Faith, you increase the target\'s movement speed by 30% for 4 sec, and you have a 50% chance when you cast Cure Disease on yourself to also cleanse 1 poison effect in addition to diseases.',
			'When you cast Power Word: Shield or Leap of Faith, you increase the target\'s movement speed by 60% for 4 sec, and you have a 100% chance when you cast Cure Disease on yourself to also cleanse 1 poison effect in addition to diseases.'
		],
		x: 0,
		y: 4
	},
	{
		i: 11667,
		n: 'Chakra',
		m: 1,
		s: [14751],
		d: [
			'When activated, your next Heal, Flash Heal, Greater Heal, Binding Heal, Prayer of Healing, Prayer of Mending, Mind Spike or Smite will put you into a Chakra state.<br /><br /><span style="color: #FFFFFF">Serenity (Heal, Flash Heal, Greater Heal, Binding Heal)</span><br />Increases the critical effect chance of your direct healing spells by 10%, and causes your direct heals to refresh the duration of your Renew on the target.<br /><br /><span style="color: #FFFFFF">Sanctuary (Prayer of Healing, Prayer of Mending)</span><br />Increases the healing done by your area of effect spells and Renew by 15% and reduces the cooldown of your Circle of Healing by 2 sec.<br /><br /><span style="color: #FFFFFF">Chastise (Smite, Mind Spike)</span><br />Increases your total damage done by Shadow and Holy spells by 15%.'
		],
		t: ['30 sec cooldown'],
		x: 1,
		y: 4,
		r: [7,2]
	},
	{
		i: 11755,
		n: 'Revelations',
		m: 1,
		s: [88627],
		d: [
			'While within Chakra: Serenity or Chakra: Sanctuary, your Holy Word: Chastise ability will transform into a different ability depending on which state you are in.<br /><br /><span style="color: #FFFFFF">Holy Word: Serenity</span><br />Instantly heals the target for <!--pts1-->5198 to 6100<!---->, and increases the critical effect chance of your healing spells on the target by 25% for 6 sec. 15 sec cooldown.<br /><br /><span style="color: #FFFFFF">Holy Word: Sanctuary</span><br />Blesses the ground with Divine light, healing all within it for <!--pts1-->299 to 355<!----> every 2 sec for 18 sec. Only one Sanctuary can be active at any one time. 40 sec cooldown.'
		],
		x: 2,
		y: 4,
		r: [14,1]
	},
	{
		i: 11672,
		n: 'Blessed Resilience',
		m: 2,
		s: [33142,33145],
		d: [
			'Whenever you are victim of an attack equal to damage greater than 10% of your total health or critically hit by any non-periodic attack, you gain Blessed Resilience increasing all healing received by 15% lasting for 10 sec.',
			'Whenever you are victim of an attack equal to damage greater than 10% of your total health or critically hit by any non-periodic attack, you gain Blessed Resilience increasing all healing received by 30% lasting for 10 sec.'
		],
		x: 3,
		y: 4
	},
	{
		i: 9597,
		n: 'Test of Faith',
		m: 3,
		s: [47558,47559,47560],
		d: [
			'Increases healing by 4% on friendly targets at or below 50% health.',
			'Increases healing by 8% on friendly targets at or below 50% health.',
			'Increases healing by 12% on friendly targets at or below 50% health.'
		],
		x: 0,
		y: 5
	},
	{
		i: 11668,
		n: 'State of Mind',
		m: 2,
		s: [87430,87431],
		d: [
			'Reduces the cooldown of your Chakra spell by 3 sec.',
			'Reduces the cooldown of your Chakra spell by 6 sec.'
		],
		x: 1,
		y: 5,
		r: [14,1]
	},
	{
		i: 9595,
		n: 'Circle of Healing',
		m: 1,
		s: [34861],
		d: [
			'Heals up to <!--sp55675:0-->5<!--sp55675--> friendly party or raid members within 30 yards of the target for <!--pts1-->2309 to 2551<!---->.  Prioritizes healing the most injured party members.'
		],
		t: ['<table width="100%"><tr><td>21% of base mana</td><th>40 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>10 sec cooldown</th></tr></table><!--?34861:35:85:85:186:0:1000-->'],
		x: 2,
		y: 5
	},
	{
		i: 9601,
		n: 'Guardian Spirit',
		m: 1,
		s: [47788],
		d: [
			'Calls upon a guardian spirit to watch over the friendly target. The spirit increases the healing received by the target by 40%, and also prevents the target from dying by sacrificing itself.  This sacrifice terminates the effect but heals the target of 50% of their maximum health. Lasts 10 sec.'
		],
		t: ['<table width="100%"><tr><td>6% of base mana</td><th>40 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>3 min cooldown</th></tr></table>'],
		x: 1,
		y: 6
	}
	]
},
{
	n: 'Shadow',
	color: '#4D80FF',
	role: 8,
	mastery: {
		description: 'Uses sinister Shadow magic, especially damage-over-time spells, to eradicate enemies.',
		spells: [
			{id:15407,name:'Mind Flay',icon:'spell_shadow_siphonmana'},
			{id:87327,name:'Shadow Power',icon:'spell_shadow_shadowpower'},
			{id:95740,name:'Shadow Orbs',icon:'spell_priest_shadoworbs'}
		],
		rating: [
			{id:77486,name:'Shadow Orb Power',description:'<!--sp86475:0-->Increases the damage done by your Shadow Orbs by 11.6%. Each point of Mastery increases damage by an additional 1.4%.<!--sp86475-->'}
		]
	},
	icon: 'spell_shadow_shadowwordpain',
	t: [
	{
		i: 9032,
		n: 'Darkness',
		m: 3,
		s: [15259,15307,15308],
		d: [
			'Spell haste increased by 1%.',
			'Spell haste increased by 2%.',
			'Spell haste increased by 3%.'
		],
		j: [
			{splhastepct:1},
			{splhastepct:2},
			{splhastepct:3}
		],
		x: 0,
		y: 0
	},
	{
		i: 9036,
		n: 'Improved Shadow Word: Pain',
		m: 2,
		s: [15275,15317],
		d: [
			'Increases the damage of your Shadow Word: Pain spell by 3%.',
			'Increases the damage of your Shadow Word: Pain spell by 6%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 9046,
		n: 'Veiled Shadows',
		m: 2,
		s: [15274,15311],
		d: [
			'Decreases the cooldown of your Fade ability by 3 sec, and reduces the cooldown of your Shadowfiend ability by 30 sec.',
			'Decreases the cooldown of your Fade ability by 6 sec, and reduces the cooldown of your Shadowfiend ability by 60 sec.'
		],
		x: 2,
		y: 0
	},
	{
		i: 9040,
		n: 'Improved Psychic Scream',
		m: 2,
		s: [15392,15448],
		d: [
			'Reduces the cooldown of your Psychic Scream spell by 2 sec.',
			'Reduces the cooldown of your Psychic Scream spell by 4 sec.'
		],
		x: 0,
		y: 1
	},
	{
		i: 9042,
		n: 'Improved Mind Blast',
		m: 3,
		s: [15273,15312,15313],
		d: [
			'Reduces the cooldown of your Mind Blast spell by 0 sec., and while in Shadowform your Mind Blast also has a 33% chance to reduce all healing done to the target by 10% for 10 sec.',
			'Reduces the cooldown of your Mind Blast spell by 1 sec., and while in Shadowform your Mind Blast also has a 66% chance to reduce all healing done to the target by 10% for 10 sec.',
			'Reduces the cooldown of your Mind Blast spell by 2 sec., and while in Shadowform your Mind Blast also has a 100% chance to reduce all healing done to the target by 10% for 10 sec.'
		],
		x: 1,
		y: 1
	},
	{
		i: 9062,
		n: 'Improved Devouring Plague',
		m: 2,
		s: [63625,63626],
		d: [
			'Your Devouring Plague instantly deals damage equal to 15% of its total periodic effect.',
			'Your Devouring Plague instantly deals damage equal to 30% of its total periodic effect.'
		],
		x: 2,
		y: 1
	},
	{
		i: 11673,
		n: 'Twisted Faith',
		m: 2,
		s: [47573,47577],
		d: [
			'Increases your Shadow spell damage by 1%, and grants you spell hit rating equal to 50% of any Spirit gained from items or effects.',
			'Increases your Shadow spell damage by 2%, and grants you spell hit rating equal to 100% of any Spirit gained from items or effects.'
		],
		j: [
			{splhitrtng:[50/100,'percentOf','spi'],shadmgpct:1},
			{splhitrtng:[100/100,'percentOf','spi'],shadmgpct:2}
		],
		x: 3,
		y: 1
	},
	{
		i: 9064,
		n: 'Shadowform',
		m: 1,
		s: [15473],
		d: [
			'Assume a Shadowform, increasing your Shadow damage by 15%, reducing all damage done to you by 15%, and increasing all party and raid members spell haste by 5%. However, you may not cast Holy spells while in this form.'
		],
		j: [
			{shadmgpct:15,_mledmgpct:-15,_rgddmgpct:-15,_holdmgpct:-15,_firdmgpct:-15,_natdmgpct:-15,_frodmgpct:-15,_shadmgpct:-15,_arcdmgpct:-15}
		],
		t: ['13% of base mana<table width="100%"><tr><td>Instant</td><th>1.5 sec cooldown</th></tr></table>'],
		x: 1,
		y: 2
	},
	{
		i: 9068,
		n: 'Phantasm',
		m: 2,
		s: [47569,47570],
		d: [
			'Your Fade ability now has a 50% chance to remove all movement impairing effects.',
			'Your Fade ability now has a 100% chance to remove all movement impairing effects.'
		],
		x: 2,
		y: 2
	},
	{
		i: 11606,
		n: 'Harnessed Shadows',
		m: 2,
		s: [33191,78228],
		d: [
			'Increases the chance for you to gain a Shadow Orb when dealing damage with your Mind Flay and Shadow Word: Pain by 4%, and you have a 50% chance to gain a Shadow Orb when critically hit by any attack.',
			'Increases the chance for you to gain a Shadow Orb when dealing damage with your Mind Flay and Shadow Word: Pain by 8%, and you have a 100% chance to gain a Shadow Orb when critically hit by any attack.'
		],
		x: 3,
		y: 2
	},
	{
		i: 9052,
		n: 'Silence',
		m: 1,
		s: [15487],
		d: [
			'Silences the target, preventing them from casting spells for 5 sec.  Non-player victim spellcasting is also interrupted for 3 sec.'
		],
		t: ['<table width="100%"><tr><td>225 Mana</td><th>30 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>45 sec cooldown</th></tr></table>'],
		x: 0,
		y: 3,
		r: [3,2]
	},
	{
		i: 9054,
		n: 'Vampiric Embrace',
		m: 1,
		s: [15286],
		d: [
			'Fills you with the embrace of Shadow energy, causing you to be healed for 6% and other party members to be healed for 3% of any single-target Shadow spell damage you deal.'
		],
		x: 1,
		y: 3
	},
	{
		i: 11778,
		n: 'Masochism',
		m: 2,
		s: [88994,88995],
		d: [
			'When you take a damaging attack equal to or greater than 10% of your total health or damage yourself with your Shadow Word: Death, you instantly gain 5% of your total mana.',
			'When you take a damaging attack equal to or greater than 10% of your total health or damage yourself with your Shadow Word: Death, you instantly gain 10% of your total mana.'
		],
		x: 2,
		y: 3,
		r: [11,1]
	},
	{
		i: 9060,
		n: 'Mind Melt',
		m: 2,
		s: [14910,33371],
		d: [
			'Increases the damage done with your Shadow Word: Death by 15% on targets at or below 25% health, and when you deal damage with Mind Spike, the cast time of your next Mind Blast is reduced by 25% lasting 6 sec. Mind Melt can stack up to 2 times.',
			'Increases the damage done with your Shadow Word: Death by 30% on targets at or below 25% health, and when you deal damage with Mind Spike, the cast time of your next Mind Blast is reduced by 50% lasting 6 sec. Mind Melt can stack up to 2 times.'
		],
		x: 3,
		y: 3
	},
	{
		i: 9076,
		n: 'Pain and Suffering',
		m: 2,
		s: [47580,47581],
		d: [
			'Your Mind Flay has a 30% chance to refresh the duration of your Shadow Word: Pain on the target, and reduces the damage you take from your own Shadow Word: Death by 20%.',
			'Your Mind Flay has a 60% chance to refresh the duration of your Shadow Word: Pain on the target, and reduces the damage you take from your own Shadow Word: Death by 40%.'
		],
		x: 0,
		y: 4
	},
	{
		i: 9074,
		n: 'Vampiric Touch',
		m: 1,
		s: [34914],
		d: [
			'Causes <!--pts2:3:5-->540<!----> Shadow damage over 15 sec to your target and causes up to 10 party or raid members to gain 1% of their maximum mana per 10 sec when you deal damage from Mind Blast.'
		],
		t: ['<table width="100%"><tr><td>16% of base mana</td><th>40 yd range</th></tr></table><!--cast-->1.5 sec cast<!--?34914:30:85:85:212:0:1000-->'],
		x: 1,
		y: 4,
		r: [11,1]
	},
	{
		i: 11663,
		n: 'Paralysis',
		m: 2,
		s: [87192,87195],
		d: [
			'When you critically hit with your Mind Blast, you cause the target to be unable to move for 2 sec.',
			'When you critically hit with your Mind Blast, you cause the target to be unable to move for 4 sec.'
		],
		x: 2,
		y: 4
	},
	{
		i: 9072,
		n: 'Psychic Horror',
		m: 1,
		s: [64044],
		d: [
			'You terrify the target, causing them to tremble in horror for 3 sec and drop their main hand and ranged weapons for 10 sec.'
		],
		t: ['<table width="100%"><tr><td>16% of base mana</td><th>30 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>2 min cooldown</th></tr></table>'],
		x: 0,
		y: 5
	},
	{
		i: 11605,
		n: 'Sin and Punishment',
		m: 2,
		s: [87099,87100],
		d: [
			'When your Vampiric Touch is dispelled, the dispeller and all nearby enemy targets within 6 yards have a 50% chance to be instantly feared in horror for 3 sec.<br /><br />When your Mind Flay critically hits, the cooldown of your Shadowfiend is reduced by 5 sec.',
			'When your Vampiric Touch is dispelled, the dispeller and all nearby enemy targets within 6 yards have a 100% chance to be instantly feared in horror for 3 sec.<br /><br />When your Mind Flay critically hits, the cooldown of your Shadowfiend is reduced by 10 sec.'
		],
		x: 1,
		y: 5,
		r: [15,1]
	},
	{
		i: 9070,
		n: 'Shadowy Apparition',
		m: 3,
		s: [78202,78203,78204],
		d: [
			'When you deal periodic damage with your Shadow Word: Pain, you have a 4% chance to summon a shadow version of yourself which will slowly move towards a target which is afflicted by your Shadow Word: Pain. Once reaching the target, it will instantly deal <!--pts1:2-->485<!----> shadow damage. <br />    <br />While moving, the chance to summon the shadowy apparation is increased to 20%. You can have up to 4 Shadowy Apparitions active at a time.',
			'When you deal periodic damage with your Shadow Word: Pain, you have an 8% chance to summon a shadow version of yourself which will slowly move towards a target which is afflicted by your Shadow Word: Pain. Once reaching the target, it will instantly deal <!--pts1:2-->485<!----> shadow damage. <br />    <br />While moving, the chance to summon the shadowy apparation is increased to 40%. You can have up to 4 Shadowy Apparitions active at a time.',
			'When you deal periodic damage with your Shadow Word: Pain, you have a 12% chance to summon a shadow version of yourself which will slowly move towards a target which is afflicted by your Shadow Word: Pain. Once reaching the target, it will instantly deal <!--pts1:1-->485<!----> shadow damage.<br />    <br />While moving, the chance to summon the shadowy apparation is increased to 60%. You can have up to 4 Shadowy Apparitions active at a time.'
		],
		x: 2,
		y: 5
	},
	{
		i: 9080,
		n: 'Dispersion',
		m: 1,
		s: [47585],
		d: [
			'You disperse into pure Shadow energy, reducing all damage taken by 90%.  You are unable to attack or cast spells, but you regenerate 6% mana every 1 sec for 6 sec. <br /><br />Dispersion can be cast while stunned, feared or silenced. Clears all snare and movement impairing effects when cast, and makes you immune to them while dispersed.'
		],
		t: ['2 min cooldown'],
		x: 1,
		y: 6
	}
	]
}
]);