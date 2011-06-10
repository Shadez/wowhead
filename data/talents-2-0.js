$WowheadTalentCalculator.registerClass(2, [
{
	n: 'Holy',
	color: '#FFB81A',
	role: 4,
	mastery: {
		description: 'Invokes the power of the Light to protect and to heal.',
		spells: [
			{id:20473,name:'Holy Shock',icon:'spell_holy_searinglight'},
			{id:85102,name:'Walk in the Light',icon:'spell_holy_championsgrace'},
			{id:95859,name:'Meditation',icon:'spell_nature_sleep'}
		],
		rating: [
			{id:76669,name:'Illuminated Healing',description:'<!--sp76669:0-->Your direct healing spells also place an absorb shield on your target for 12% of the amount healed lasting 15 sec.  Each point of Mastery increases the absorb amount by an additional 1.50%.<!--sp76669-->'}
		]
	},
	icon: 'spell_holy_holybolt',
	t: [
	{
		i: 10099,
		n: 'Arbiter of the Light',
		m: 2,
		s: [20359,20360],
		d: [
			'Increases the critical effect chance of your Judgement and Templar\'s Verdict by 6%.',
			'Increases the critical effect chance of your Judgement and Templar\'s Verdict by 12%.'
		],
		x: 0,
		y: 0
	},
	{
		i: 12189,
		n: 'Protector of the Innocent',
		m: 3,
		s: [20138,20139,20140],
		d: [
			'Casting a targeted heal on any target, except yourself, also heals you for <!--pts1-->868 to 998<!---->.',
			'Casting a targeted heal on any target, except yourself, also heals you for <!--pts1-->1737 to 1997<!---->.',
			'Casting a targeted heal on any target, except yourself, also heals you for <!--pts1-->2605 to 2997<!---->.'
		],
		x: 1,
		y: 0
	},
	{
		i: 10127,
		n: 'Judgements of the Pure',
		m: 3,
		s: [53671,53673,54151],
		d: [
			'Your Judgement increases your casting and melee haste by 3% for 1 min.',
			'Your Judgement increases your casting and melee haste by 6% for 1 min.',
			'Your Judgement increases your casting and melee haste by 9% for 1 min.'
		],
		x: 2,
		y: 0
	},
	{
		i: 11213,
		n: 'Clarity of Purpose',
		m: 3,
		s: [85462,85463,85464],
		d: [
			'Reduces the casting time of your Holy Light and Divine Light spells by 0.15 sec.',
			'Reduces the casting time of your Holy Light and Divine Light spells by 0 sec.',
			'Reduces the casting time of your Holy Light and Divine Light spells by 0 sec.'
		],
		x: 0,
		y: 1
	},
	{
		i: 10097,
		n: 'Last Word',
		m: 2,
		s: [20234,20235],
		d: [
			'Gives your Word of Glory a 30% increased critical chance when used on targets with 35% or less health.',
			'Gives your Word of Glory a 60% increased critical chance when used on targets with 35% or less health.'
		],
		x: 1,
		y: 1
	},
	{
		i: 11780,
		n: 'Blazing Light',
		m: 2,
		s: [20237,20238],
		d: [
			'Increases the damage of your Holy Shock and Exorcism by 10%.',
			'Increases the damage of your Holy Shock and Exorcism by 20%.'
		],
		x: 2,
		y: 1
	},
	{
		i: 10109,
		n: 'Denounce',
		m: 2,
		s: [31825,85510],
		d: [
			'Reduces the mana cost of Exorcism by 38%.  In addition, you have a 25% chance when casting Holy Shock to make your next Exorcism spell instant and cost no mana.',
			'Reduces the mana cost of Exorcism by 75%.  In addition, you have a 50% chance when casting Holy Shock to make your next Exorcism spell instant and cost no mana.'
		],
		x: 0,
		y: 2
	},
	{
		i: 11202,
		n: 'Divine Favor',
		m: 1,
		s: [31842],
		d: [
			'Increases your spell casting haste by 20% and spell critical chance by 20% for 20 sec.'
		],
		t: ['3 min cooldown'],
		x: 1,
		y: 2
	},
	{
		i: 10129,
		n: 'Infusion of Light',
		m: 2,
		s: [53569,53576],
		d: [
			'Increases the critical effect chance of your Holy Shock by 5%.  In addition, your Holy Shock critical effects reduce the cast time of your next Holy Light or Divine Light by 0.75 sec.',
			'Increases the critical effect chance of your Holy Shock by 10%.  In addition, your Holy Shock critical effects reduce the cast time of your next Holy Light or Divine Light by 1.50 sec.'
		],
		x: 2,
		y: 2
	},
	{
		i: 11771,
		n: 'Daybreak',
		m: 2,
		s: [88820,88821],
		d: [
			'Your Flash of Light, Holy Light and Divine Light have a 10% chance to make your next Holy Shock not trigger a cooldown if used within 12 sec.',
			'Your Flash of Light, Holy Light and Divine Light have a 20% chance to make your next Holy Shock not trigger a cooldown if used within 12 sec.'
		],
		x: 3,
		y: 2
	},
	{
		i: 10113,
		n: 'Enlightened Judgements',
		m: 2,
		s: [53556,53557],
		d: [
			'Grants hit rating equal to 50% of any Spirit gained from items or effects, and increases the range of your Judgement by 5 yards.  In addition, your Judgement instantly heals you for <!--pts1-->1241 to 1427<!---->.',
			'Grants hit rating equal to 100% of any Spirit gained from items or effects, and increases the range of your Judgement by 10 yards.  In addition, your Judgement instantly heals you for <!--pts1-->2481 to 2853<!---->.'
		],
		j: [
			{mlehitrtng:[50/100,'percentOf','spi'],rgdhitrtng:[50/100,'percentOf','spi'],splhitrtng:[50/100,'percentOf','spi']},
			{mlehitrtng:[100/100,'percentOf','spi'],rgdhitrtng:[100/100,'percentOf','spi'],splhitrtng:[100/100,'percentOf','spi']}
		],
		x: 0,
		y: 3
	},
	{
		i: 10133,
		n: 'Beacon of Light',
		m: 1,
		s: [53563],
		d: [
			'The target becomes a Beacon of Light to all members of your party or raid within a 60 yard radius.  Each heal you cast on party or raid members will also heal the Beacon for 50% of the amount healed.  Only one target can be the Beacon of Light at a time. Lasts 5 min.'
		],
		t: ['<table width="100%"><tr><td>6% of base mana</td><th>60 yd range</th></tr></table>Instant'],
		x: 1,
		y: 3
	},
	{
		i: 11215,
		n: 'Speed of Light',
		m: 3,
		s: [85495,85498,85499],
		d: [
			'Grants 1% spell haste and reduces the cooldown of Holy Radiance by 10 sec.  Casting Holy Radiance increases your movement speed by 20% for 4 sec.',
			'Grants 2% spell haste and reduces the cooldown of Holy Radiance by 20 sec.  Casting Holy Radiance increases your movement speed by 40% for 4 sec.',
			'Grants 3% spell haste and reduces the cooldown of Holy Radiance by 30 sec.  Casting Holy Radiance increases your movement speed by 60% for 4 sec.'
		],
		j: [
			{splhastepct:1},
			{splhastepct:2},
			{splhastepct:3}
		],
		x: 2,
		y: 3,
		r: [8,2]
	},
	{
		i: 10121,
		n: 'Sacred Cleansing',
		m: 1,
		s: [53551],
		d: [
			'Your Cleanse spell now also dispels 1 Magic effect.'
		],
		x: 3,
		y: 3
	},
	{
		i: 11779,
		n: 'Conviction',
		m: 3,
		s: [20049,20056,20057],
		d: [
			'Gives you a 1% bonus to damage and healing for 15 sec after causing a critical effect from a weapon swing, non-periodic spell, or ability. This effect stacks up to 3 times.',
			'Gives you a 2% bonus to damage and healing for 15 sec after causing a critical effect from a weapon swing, non-periodic spell, or ability. This effect stacks up to 3 times.',
			'Gives you a 3% bonus to damage and healing for 15 sec after causing a critical effect from a weapon swing, non-periodic spell, or ability. This effect stacks up to 3 times.'
		],
		x: 0,
		y: 4
	},
	{
		i: 10115,
		n: 'Aura Mastery',
		m: 1,
		s: [31821],
		d: [
			'Causes your Concentration Aura to make all affected targets immune to Silence and Interrupt effects and improve the effect of Devotion Aura, Resistance Aura, and Retribution Aura by 100%.  Lasts 6 sec.'
		],
		t: ['2 min cooldown'],
		x: 2,
		y: 4
	},
	{
		i: 12151,
		n: 'Paragon of Virtue',
		m: 2,
		s: [93418,93417],
		d: [
			'Reduces the cooldown of Divine Protection by 10 sec, Hand of Sacrifice by 15 sec and Avenging Wrath by 30 sec.',
			'Reduces the cooldown of Divine Protection by 20 sec, Hand of Sacrifice by 30 sec and Avenging Wrath by 60 sec.'
		],
		x: 3,
		y: 4
	},
	{
		i: 11168,
		n: 'Tower of Radiance',
		m: 3,
		s: [84800,85511,85512],
		d: [
			'Healing the target of your Beacon of Light with Flash of Light or Divine Light has a 33% chance to generate a charge of Holy Power.',
			'Healing the target of your Beacon of Light with Flash of Light or Divine Light has a 66% chance to generate a charge of Holy Power.',
			'Healing the target of your Beacon of Light with Flash of Light or Divine Light has a 100% chance to generate a charge of Holy Power.'
		],
		x: 1,
		y: 5,
		r: [11,1]
	},
	{
		i: 10117,
		n: 'Blessed Life',
		m: 2,
		s: [31828,31829],
		d: [
			'You have a 50% chance to gain a charge of Holy Power whenever you take direct damage.  This effect cannot occur more than once every 8 seconds.',
			'You have a 100% chance to gain a charge of Holy Power whenever you take direct damage.  This effect cannot occur more than once every 8 seconds.'
		],
		x: 2,
		y: 5
	},
	{
		i: 11203,
		n: 'Light of Dawn',
		m: 1,
		s: [85222],
		d: [
			'Consumes all Holy Power to send a wave of healing energy before you, healing up to <!--sp54940:0-->5<!--sp54940--> of the most injured targets in your party or raid within a 30 yard frontal cone for <!--pts1-->606 to 674<!----> per charge of Holy Power.'
		],
		t: ['1 <br />Instant cast<!--?85222:40:85:85:625:0:1000-->'],
		x: 1,
		y: 6
	}
	]
},
{
	n: 'Protection',
	color: '#FF0000',
	role: 2,
	mastery: {
		description: 'Uses Holy magic to shield <himself/herself> and defend allies from attackers.',
		spells: [
			{id:31935,name:'Avenger\'s Shield',icon:'spell_holy_avengersshield'},
			{id:84839,name:'Vengeance',icon:'ability_paladin_shieldofvengeance'},
			{id:53592,name:'Touched by the Light',icon:'ability_paladin_touchedbylight'},
			{id:31878,name:'Judgements of the Wise',icon:'ability_paladin_judgementofthewise'}
		],
		rating: [
			{id:76671,name:'Divine Bulwark',description:'<!--sp76671:0-->Increases your chance to block melee attacks by 18%.  Each point of Mastery increases block chance by an additional 2.25%.<!--sp76671-->'}
		]
	},
	icon: 'ability_paladin_shieldofthetemplar',
	t: [
	{
		i: 12198,
		n: 'Divinity',
		m: 3,
		s: [63646,63647,63648],
		d: [
			'Increases all healing done by you and all healing effects on you by 2%.',
			'Increases all healing done by you and all healing effects on you by 4%.',
			'Increases all healing done by you and all healing effects on you by 6%.'
		],
		j: [
			{_healpct:2,healpct:2},
			{_healpct:4,healpct:4},
			{_healpct:6,healpct:6}
		],
		x: 0,
		y: 0
	},
	{
		i: 10324,
		n: 'Seals of the Pure',
		m: 2,
		s: [20224,20225],
		d: [
			'Increases the damage done by your Seal of Righteousness, Seal of Truth, and Seal of Justice by 6%.',
			'Increases the damage done by your Seal of Righteousness, Seal of Truth, and Seal of Justice by 12%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 12152,
		n: 'Eternal Glory',
		m: 2,
		s: [87163,87164],
		d: [
			'Your Word of Glory has a 15% chance not to consume Holy Power.',
			'Your Word of Glory has a 30% chance not to consume Holy Power.'
		],
		x: 2,
		y: 0
	},
	{
		i: 10372,
		n: 'Judgements of the Just',
		m: 2,
		s: [53695,53696],
		d: [
			'Your Judgement reduces the melee and ranged attack speed of the target by 10% for 20 sec.  In addition, increases the duration of your Seal of Justice effect by 0 sec.',
			'Your Judgement reduces the melee and ranged attack speed of the target by 20% for 20 sec.  In addition, increases the duration of your Seal of Justice effect by 1 sec.'
		],
		x: 0,
		y: 1
	},
	{
		i: 10332,
		n: 'Toughness',
		m: 3,
		s: [20143,20144,20145],
		d: [
			'Increases your armor value from items by 3%.',
			'Increases your armor value from items by 6%.',
			'Increases your armor value from items by 10%.'
		],
		j: [
			{armor:[3/100,'forSlots',[0,2,4,7,8,9,10,11,17]]},
			{armor:[6/100,'forSlots',[0,2,4,7,8,9,10,11,17]]},
			{armor:[10/100,'forSlots',[0,2,4,7,8,9,10,11,17]]}
		],
		x: 1,
		y: 1
	},
	{
		i: 10336,
		n: 'Improved Hammer of Justice',
		m: 2,
		s: [20487,20488],
		d: [
			'Decreases the cooldown of your Hammer of Justice spell by 10 sec.',
			'Decreases the cooldown of your Hammer of Justice spell by 20 sec.'
		],
		x: 2,
		y: 1
	},
	{
		i: 10344,
		n: 'Hallowed Ground',
		m: 2,
		s: [84631,84633],
		d: [
			'Increases the damage of your Consecration by 20% and decreases its mana cost by 40%.',
			'Increases the damage of your Consecration by 40% and decreases its mana cost by 80%.'
		],
		x: 0,
		y: 2
	},
	{
		i: 10346,
		n: 'Sanctuary',
		m: 3,
		s: [20911,84628,84629],
		d: [
			'Reduces the chance you\'ll be critically hit by melee attacks by 2% and reduces all damage taken by 3%.  In addition when you block or dodge a melee attack you gain 1% of maximum mana.',
			'Reduces the chance you\'ll be critically hit by melee attacks by 4% and reduces all damage taken by 7%.  In addition when you block or dodge a melee attack you gain 2% of maximum mana.',
			'Reduces the chance you\'ll be critically hit by melee attacks by 6% and reduces all damage taken by 10%. In addition when you block or dodge a melee attack you gain 3% of maximum mana.'
		],
		j: [
			{_mlecritstrkpct:-2,_mledmgpct:-3,_rgddmgpct:-3,_holdmgpct:-3,_firdmgpct:-3,_natdmgpct:-3,_frodmgpct:-3,_shadmgpct:-3,_arcdmgpct:-3},
			{_mlecritstrkpct:-4,_mledmgpct:-7,_rgddmgpct:-7,_holdmgpct:-7,_firdmgpct:-7,_natdmgpct:-7,_frodmgpct:-7,_shadmgpct:-7,_arcdmgpct:-7},
			{_mlecritstrkpct:-6,_mledmgpct:-10,_rgddmgpct:-10,_holdmgpct:-10,_firdmgpct:-10,_natdmgpct:-10,_frodmgpct:-10,_shadmgpct:-10,_arcdmgpct:-10}
		],
		x: 1,
		y: 2
	},
	{
		i: 10374,
		n: 'Hammer of the Righteous',
		m: 1,
		s: [53595],
		d: [
			'Hammer the current target for 30% weapon damage, causing a wave of light that hits all targets within 8 yards for <!--pts1-->583 to 873<!----> Holy damage. Grants a charge of Holy Power.'
		],
		t: ['<table width="100%"><tr><td>12% of base mana</td><th>Melee Range</th></tr></table><table width="100%"><tr><td>Instant</td><th>4.5 sec cooldown</th></tr></table>','Requires One-Handed Melee Weapon'],
		x: 2,
		y: 2
	},
	{
		i: 11159,
		n: 'Wrath of the Lightbringer',
		m: 2,
		s: [84635,84636],
		d: [
			'Increases the damage of your Crusader Strike and Judgement abilities by 50%, and increases the critical strike chance of your Holy Wrath and Hammer of Wrath spells by 15%.',
			'Increases the damage of your Crusader Strike and Judgement abilities by 100%, and increases the critical strike chance of your Holy Wrath and Hammer of Wrath spells by 30%.'
		],
		x: 3,
		y: 2
	},
	{
		i: 11161,
		n: 'Reckoning',
		m: 2,
		s: [20177,20179],
		d: [
			'You have a 10% chance after blocking an attack for your next 4 weapon swings within 8 sec to generate an additional attack.',
			'You have a 20% chance after blocking an attack for your next 4 weapon swings within 8 sec to generate an additional attack.'
		],
		x: 0,
		y: 3
	},
	{
		i: 11607,
		n: 'Shield of the Righteous',
		m: 1,
		s: [53600],
		d: [
			'Slam the target with your shield, causing Holy damage.  Consumes all charges of Holy Power to determine damage dealt:<br /><br />1 Holy Power: (<!--pts1:1-->610<!----> - 1) damage<br />2 Holy Power: (<!--pts1:1-->610<!----> * 3 - 3) damage<br />3 Holy Power: (<!--pts1:1-->610<!----> * 6 - 6) damage'
		],
		t: ['<table width="100%"><tr><td>1 </td><th>Melee Range</th></tr></table>Instant cast<!--?53600:25:85:85:184:0:1000-->','Requires Shields'],
		x: 1,
		y: 3,
		r: [7,3]
	},
	{
		i: 11193,
		n: 'Grand Crusader',
		m: 2,
		s: [75806,85043],
		d: [
			'When your Crusader Strike or Hammer of the Righteous deal damage to your primary target, they have a 10% chance of refreshing the cooldown on your next Avenger\'s Shield and causing it to generate a charge of Holy Power if used within 6 sec.',
			'When your Crusader Strike or Hammer of the Righteous deal damage to your primary target, they have a 20% chance of refreshing the cooldown on your next Avenger\'s Shield and causing it to generate a charge of Holy Power if used within 6 sec.'
		],
		x: 2,
		y: 3,
		r: [8,1]
	},
	{
		i: 10680,
		n: 'Vindication',
		m: 1,
		s: [26016],
		d: [
			'Your Crusader Strike and Hammer of the Righteous reduce physical damage done by their primary targets by 10% for 30 sec.'
		],
		x: 0,
		y: 4
	},
	{
		i: 10356,
		n: 'Holy Shield',
		m: 1,
		s: [20925],
		d: [
			'Using Shield of the Righteous<!--sp85639:0--><!--sp85639--><!--sp85646:0--><!--sp85646--> or Inquisition increases the amount your shield blocks by an additional 10% for 20 sec.'
		],
		x: 1,
		y: 4,
		r: [11,1]
	},
	{
		i: 11221,
		n: 'Guarded by the Light',
		m: 2,
		s: [85639,85646],
		d: [
			'Increases your Word of Glory by 5% when used to heal yourself, and allows your Word of Glory to grant Holy Shield.',
			'Increases your Word of Glory by 10% when used to heal yourself, and allows your Word of Glory to grant Holy Shield.  In addition, any overhealing will create a protective shield equal to the amount of overhealing that lasts for 6 sec.'
		],
		x: 2,
		y: 4
	},
	{
		i: 10334,
		n: 'Divine Guardian',
		m: 1,
		s: [70940],
		d: [
			'All party or raid members within 30 yards, excluding the Paladin, take 20% reduced damage for 6 sec.'
		],
		t: ['100 yd range<br />3 min cooldown'],
		x: 3,
		y: 4
	},
	{
		i: 10370,
		n: 'Sacred Duty',
		m: 2,
		s: [53709,53710],
		d: [
			'Your Judgement and Avenger Shield have a 25% chance of making your next Shield of the Righteous a critical strike.  Lasts 10 sec.',
			'Your Judgement and Avenger\'s Shield have a 50% chance of making your next Shield of the Righteous a critical strike.  Lasts 10 sec.'
		],
		x: 1,
		y: 5,
		r: [14,1]
	},
	{
		i: 10340,
		n: 'Shield of the Templar',
		m: 3,
		s: [31848,31849,84854],
		d: [
			'Reduces the cooldown of Avenging Wrath by 20 sec and Guardian of Ancient Kings by 40 sec.  In addition, your Divine Plea will generate 1 Holy Power.',
			'Reduces the cooldown of Avenging Wrath by 40 sec and Guardian of Ancient Kings by 80 sec.  In addition, your Divine Plea will generate 2 Holy Power.',
			'Reduces the cooldown of Avenging Wrath by 60 sec and Guardian of Ancient Kings by 120 sec.  In addition, your Divine Plea will generate 3 Holy Power.'
		],
		x: 2,
		y: 5
	},
	{
		i: 10350,
		n: 'Ardent Defender',
		m: 1,
		s: [31850],
		d: [
			'Reduce damage taken by 20% for 10 sec. While Ardent Defender is active, the next attack that would otherwise kill you will instead cause you to be healed for 15% of your maximum health.'
		],
		t: ['3 min cooldown'],
		x: 1,
		y: 6
	}
	]
},
{
	n: 'Retribution',
	color: '#4D80FF',
	role: 8,
	mastery: {
		description: 'A righteous crusader who judges and punishes opponents with weapons and Holy magic.',
		spells: [
			{id:85256,name:'Templar\'s Verdict',icon:'spell_paladin_templarsverdict'},
			{id:53503,name:'Sheath of Light',icon:'ability_paladin_sheathoflight'},
			{id:20113,name:'Two-Handed Weapon Specialization',icon:'inv_hammer_04'},
			{id:89901,name:'Judgements of the Bold',icon:'ability_paladin_judgementofthewise'}
		],
		rating: [
			{id:76672,name:'Hand of Light',description:'<!--sp76672:0-->Your Templar\'s Verdict, Crusader Strike, and Divine Storm deal 16.8% additional damage as Holy damage.  Each point of Mastery increases the damage by an additional 2.1%.<!--sp76672-->'}
		]
	},
	icon: 'spell_holy_auraoflight',
	t: [
	{
		i: 10647,
		n: 'Eye for an Eye',
		m: 2,
		s: [9799,25988],
		d: [
			'All magic attacks against you have a 20% chance to cause 30% of the damage taken back to the attacker as well.',
			'All magic attacks against you have a 40% chance to cause 30% of the damage taken back to the attacker as well.'
		],
		x: 0,
		y: 0
	},
	{
		i: 10651,
		n: 'Crusade',
		m: 3,
		s: [31866,31867,31868],
		d: [
			'Increases the damage of your Crusader Strike, Hammer of the Righteous, and Templar\'s Verdict by 10%, and the damage and healing of your Holy Shock by 10%.  In addition, for 15 sec after you kill an enemy that yields experience or honor, your next Holy Light heals for an additional 100%.',
			'Increases the damage of your Crusader Strike, Hammer of the Righteous, and Templar\'s Verdict by 20%, and the damage and healing of your Holy Shock by 20%.  In addition, for 15 sec after you kill an enemy that yields experience or honor, your next Holy Light heals for an additional 200%.',
			'Increases the damage of your Crusader Strike, Hammer of the Righteous, and Templar\'s Verdict by 30%, and the damage and healing of your Holy Shock by 30%.  In addition, for 15 sec after you kill an enemy that yields experience or honor, your next Holy Light heals for an additional 300%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 11612,
		n: 'Improved Judgement',
		m: 2,
		s: [87174,87175],
		d: [
			'Increases the range of your Judgement by 10 yards.',
			'Increases the range of your Judgement by 20 yards.'
		],
		x: 2,
		y: 0
	},
	{
		i: 12153,
		n: 'Guardian\'s Favor',
		m: 2,
		s: [20174,20175],
		d: [
			'Reduces the cooldown of your Hand of Protection by 60 sec and increases the duration of your Hand of Freedom by 2 sec.',
			'Reduces the cooldown of your Hand of Protection by 2 min and increases the duration of your Hand of Freedom by 4 sec.'
		],
		x: 0,
		y: 1
	},
	{
		i: 11269,
		n: 'Rule of Law',
		m: 3,
		s: [85457,85458,87461],
		d: [
			'Increases the critical effect chance of your Crusader Strike, Hammer of the Righteous and Word of Glory by 5%.',
			'Increases the critical effect chance of your Crusader Strike, Hammer of the Righteous and Word of Glory by 10%.',
			'Increases the critical effect chance of your Crusader Strike, Hammer of the Righteous and Word of Glory by 15%.'
		],
		x: 1,
		y: 1
	},
	{
		i: 11611,
		n: 'Pursuit of Justice',
		m: 2,
		s: [26022,26023],
		d: [
			'You have a 50% chance to gain a charge of Holy Power when struck by a Stun, Fear or Immobilize effect.  In addition, increases your movement and mounted movement speed by 8%.  This effect does not stack with other movement speed increasing effects.',
			'You have a 100% chance to gain a charge of Holy Power when struck by a Stun, Fear or Immobilize effect.  In addition, increases your movement and mounted movement speed by 15%.  This effect does not stack with other movement speed increasing effects.'
		],
		x: 3,
		y: 1
	},
	{
		i: 10665,
		n: 'Communion',
		m: 1,
		s: [31876],
		d: [
			'Your auras increase your party and raid\'s damage dealt by 3%, and your own damage is increased by an additional 2% at all times.  In addition, your Judgement causes Replenishment.<br /><br />Replenishment - Grants up to 10 party or raid members mana regeneration equal to 1% of their maximum mana per 10 sec. Lasts for 15 sec.'
		],
		j: [
			{mledmgpct:2,rgddmgpct:2,holdmgpct:2,firdmgpct:2,natdmgpct:2,frodmgpct:2,shadmgpct:2,arcdmgpct:2}
		],
		x: 0,
		y: 2
	},
	{
		i: 10661,
		n: 'The Art of War',
		m: 3,
		s: [53486,53488,87138],
		d: [
			'Your autoattacks have a 7% chance to make your next Exorcism instant, free and cause 100% additional damage.',
			'Your autoattacks have a 14% chance to make your next Exorcism instant, free and cause 100% additional damage.',
			'Your autoattacks have a 20% chance to make your next Exorcism instant, free and cause 100% additional damage.'
		],
		x: 1,
		y: 2
	},
	{
		i: 11610,
		n: 'Long Arm of the Law',
		m: 2,
		s: [87168,87172],
		d: [
			'Your Judgement has a 50% chance to increase your movement speed by 45% for 4 sec when used on targets at or further than 15 yards from you.',
			'Your Judgement has a 100% chance to increase your movement speed by 45% for 4 sec when used on targets at or further than 15 yards from you.'
		],
		x: 2,
		y: 2,
		r: [2,2]
	},
	{
		i: 11204,
		n: 'Divine Storm',
		m: 1,
		s: [53385],
		d: [
			'An instant attack that causes 100% weapon damage to all enemies within 8 yards.  The Divine Storm heals up to 3 party or raid members totaling 25% of the damage caused, and will grant a charge of Holy Power if it hits 4 or more targets.'
		],
		t: ['5% of base mana<table width="100%"><tr><td>Instant</td><th>4.5 sec cooldown</th></tr></table>','Requires Melee Weapon'],
		x: 3,
		y: 2
	},
	{
		i: 11207,
		n: 'Sacred Shield',
		m: 1,
		s: [85285],
		d: [
			'When reduced below 30% health, you gain the Sacred Shield effect. The Sacred Shield absorbs ((1) + (<span class="w">AP</span> * 2.8)) damage and increases healing received by 20%.  Lasts 15 sec.  This effect cannot occur more than once every 60 sec.'
		],
		t: ['30 sec cooldown'],
		x: 0,
		y: 3
	},
	{
		i: 11372,
		n: 'Sanctity of Battle',
		m: 1,
		s: [25956],
		d: [
			'Haste effects lower the cooldown of your Crusader Strike and Divine Storm abilities.'
		],
		x: 1,
		y: 3
	},
	{
		i: 10643,
		n: 'Seals of Command',
		m: 1,
		s: [85126],
		d: [
			'Your Seal of Righteousness, Seal of Truth, and Seal of Justice now also deal 7% weapon damage when triggered. In addition, your Seal of Righteousness now hits up to 2 additional targets.'
		],
		x: 2,
		y: 3
	},
	{
		i: 10669,
		n: 'Sanctified Wrath',
		m: 3,
		s: [53375,90286,53376],
		d: [
			'Increases the critical strike chance of Hammer of Wrath by 20%, reduces the cooldown of Avenging Wrath by 20 secs and allows the use of Hammer of Wrath at all times during Avenging Wrath.',
			'Increases the critical strike chance of Hammer of Wrath by 40%, reduces the cooldown of Avenging Wrath by 40 secs and allows the use of Hammer of Wrath at all times during Avenging Wrath.',
			'Increases the critical strike chance of Hammer of Wrath by 60%, reduces the cooldown of Avenging Wrath by 60 secs and allows the use of Hammer of Wrath at all times during Avenging Wrath.'
		],
		x: 3,
		y: 3
	},
	{
		i: 11271,
		n: 'Selfless Healer',
		m: 2,
		s: [85803,85804],
		d: [
			'When you heal others with your Word of Glory, it increases the effectiveness of the heal by 25% and increases your damage done by 2% per charge of Holy Power for 10 sec.',
			'When you heal others with your Word of Glory, it increases the effectiveness of the heal by 50% and increases your damage done by 4% per charge of Holy Power for 10 sec.'
		],
		x: 0,
		y: 4
	},
	{
		i: 10663,
		n: 'Repentance',
		m: 1,
		s: [20066],
		d: [
			'Puts the enemy target in a state of meditation, incapacitating them for up to 1 min.  Any damage from sources other than Censure will awaken the target.  Usable against Demons, Dragonkin, Giants, Humanoids and Undead.'
		],
		t: ['<table width="100%"><tr><td>9% of base mana</td><th>20 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>1 min cooldown</th></tr></table>'],
		x: 1,
		y: 4
	},
	{
		i: 10633,
		n: 'Divine Purpose',
		m: 2,
		s: [85117,86172],
		d: [
			'The following attacks have a 7% chance to cause your next Holy Power ability to consume no Holy Power and to cast as if 3 Holy Power were consumed:<br /><br />- Judgement<br />- Exorcism<br />- Templar\'s Verdict<br />- Divine Storm<br />- Inquisition<br />- Holy Wrath<br />- Hammer of Wrath',
			'The following attacks have a 15% chance to cause your next Holy Power ability to consume no Holy Power and to cast as if 3 Holy Power were consumed:<br /><br />- Judgement<br />- Exorcism<br />- Templar\'s Verdict<br />- Divine Storm<br />- Inquisition<br />- Holy Wrath<br />- Hammer of Wrath'
		],
		x: 2,
		y: 4
	},
	{
		i: 10677,
		n: 'Inquiry of Faith',
		m: 3,
		s: [53380,53381,53382],
		d: [
			'Increases the periodic damage done by your Seal of Truth by 10%, and the duration of your Inquisition by 50%.',
			'Increases the periodic damage done by your Seal of Truth by 20%, and the duration of your Inquisition by 100%.',
			'Increases the periodic damage done by your Seal of Truth by 30%, and the duration of your Inquisition by 150%.'
		],
		x: 1,
		y: 5
	},
	{
		i: 11211,
		n: 'Acts of Sacrifice',
		m: 2,
		s: [85446,85795],
		d: [
			'Reduces the cooldown by 10% and mana cost by 10% of your Hand of Freedom, Hand of Salvation and Hand of Sacrifice.  In addition, your Cleanse will remove one movement impairing effect if cast on yourself.',
			'Reduces the cooldown by 20% and mana cost by 20% of your Hand of Freedom, Hand of Salvation and Hand of Sacrifice.  In addition, your Cleanse will remove one movement impairing effect if cast on yourself.'
		],
		x: 2,
		y: 5
	},
	{
		i: 11222,
		n: 'Zealotry',
		m: 1,
		s: [85696],
		d: [
			'Your Crusader Strike generates 3 charges of Holy Power per strike for the next 20 sec.  Requires 3 Holy Power to use, but does not consume Holy Power.'
		],
		t: ['3 <table width="100%"><tr><td>Instant cast</td><th>2 min cooldown</th></tr></table>'],
		x: 1,
		y: 6
	}
	]
}
]);