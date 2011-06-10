$WowheadTalentCalculator.registerClass(4, [
{
	n: 'Assassination',
	color: '#FFB81A',
	role: 8,
	mastery: {
		description: 'A deadly master of poisons who dispatches victims with vicious dagger strikes.',
		spells: [
			{id:1329,name:'Mutilate',icon:'ability_rogue_shadowstrikes'},
			{id:14117,name:'Improved Poisons',icon:'ability_poisons'},
			{id:84601,name:'Assassin\'s Resolve',icon:'ability_rogue_sinistercalling'}
		],
		rating: [
			{id:76803,name:'Potent Poisons',description:'<!--sp76803:0-->Increases the damage done by your poisons by 28%.  Each point of Mastery increases damage by an additional 3.5%.<!--sp76803-->'}
		]
	},
	icon: 'ability_rogue_eviscerate',
	t: [
	{
		i: 6514,
		n: 'Deadly Momentum',
		m: 2,
		s: [79121,79122],
		d: [
			'After killing an opponent that yields experience or honor, you have a 50% chance to increase the critical strike chance of your next ability within 15 sec by 40%, and to refresh your Slice and Dice and Recuperate abilities to their original duration.',
			'After killing an opponent that yields experience or honor, the critical strike chance of your next ability within 15 sec is increased by 40% and your Slice and Dice and Recuperate abilities are refreshed to their original duration.'
		],
		x: 0,
		y: 0
	},
	{
		i: 276,
		n: 'Coup de Grace',
		m: 3,
		s: [14162,14163,14164],
		d: [
			'Increases the damage done by your Eviscerate and Envenom abilities by 7%.',
			'Increases the damage done by your Eviscerate and Envenom abilities by 14%.',
			'Increases the damage done by your Eviscerate and Envenom abilities by 20%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 269,
		n: 'Lethality',
		m: 3,
		s: [14128,14132,14135],
		d: [
			'Increases the critical strike damage bonus of your Sinister Strike, Backstab, Mutilate and Hemorrhage abilities by 10%.',
			'Increases the critical strike damage bonus of your Sinister Strike, Backstab, Mutilate and Hemorrhage abilities by 20%.',
			'Increases the critical strike damage bonus of your Sinister Strike, Backstab, Mutilate and Hemorrhage abilities by 30%.'
		],
		x: 2,
		y: 0
	},
	{
		i: 273,
		n: 'Ruthlessness',
		m: 3,
		s: [14156,14160,14161],
		d: [
			'Gives your melee finishing moves a 20% chance to add a combo point to your target.',
			'Gives your melee finishing moves a 40% chance to add a combo point to your target.',
			'Gives your melee finishing moves a 60% chance to add a combo point to your target.'
		],
		x: 0,
		y: 1
	},
	{
		i: 1721,
		n: 'Quickening',
		m: 2,
		s: [31208,31209],
		d: [
			'All healing effects on you are increased by 10% and your movement speed is increased by 8%.  This does not stack with most other movement speed increasing effects.',
			'All healing effects on you are increased by 20% and your movement speed is increased by 15%.  This does not stack with most other movement speed increasing effects.'
		],
		j: [
			{_healpct:10},
			{_healpct:20}
		],
		x: 1,
		y: 1
	},
	{
		i: 277,
		n: 'Puncturing Wounds',
		m: 3,
		s: [13733,13865,13866],
		d: [
			'Increases the critical strike chance of your Backstab ability by 10%, and the critical strike chance of your Mutilate ability by 5%.',
			'Increases the critical strike chance of your Backstab ability by 20%, and the critical strike chance of your Mutilate ability by 10%.',
			'Increases the critical strike chance of your Backstab ability by 30%, and the critical strike chance of your Mutilate ability by 15%.'
		],
		x: 2,
		y: 1
	},
	{
		i: 6515,
		n: 'Blackjack',
		m: 2,
		s: [79123,79125],
		d: [
			'Even after your Sap wears off, its effects linger on enemies, reducing their damage done by 35% for 8 sec.',
			'Even after your Sap wears off, its effects linger on enemies, reducing their damage done by 70% for 8 sec.'
		],
		x: 3,
		y: 1
	},
	{
		i: 2065,
		n: 'Deadly Brew',
		m: 2,
		s: [51625,51626],
		d: [
			'When you apply Instant, Wound or Mind-Numbing Poison to a target, you have a 50% chance to apply Crippling Poison.',
			'When you apply Instant, Wound, or Mind-Numbing Poison to a target, you have a 100% chance to apply Crippling Poison.'
		],
		x: 0,
		y: 2
	},
	{
		i: 280,
		n: 'Cold Blood',
		m: 1,
		s: [14177],
		d: [
			'When activated, generates 25 Energy and increases the critical strike chance of your next non-periodic offensive ability by 100%.'
		],
		t: ['2 min cooldown'],
		x: 1,
		y: 2
	},
	{
		i: 682,
		n: 'Vile Poisons',
		m: 3,
		s: [16513,16514,16515],
		d: [
			'Increases the damage dealt by your poisons by 7% and gives you 33% of the normal chance of applying poisons from your equipped melee weapons when you use the Fan of Knives ability.',
			'Increases the damage dealt by your poisons by 14% and gives you 67% of the normal chance of applying poisons from your equipped melee weapons when you use the Fan of Knives ability.',
			'Increases the damage dealt by your poisons by 20% and gives you 100% of the normal chance of applying poisons from your equipped melee weapons when you use the Fan of Knives ability.'
		],
		x: 2,
		y: 2
	},
	{
		i: 11209,
		n: 'Deadened Nerves',
		m: 3,
		s: [31380,31382,31383],
		d: [
			'Reduces all damage taken by 3%.',
			'Reduces all damage taken by 7%.',
			'Reduces all damage taken by 10%.'
		],
		j: [
			{_mledmgpct:-3,_rgddmgpct:-3,_holdmgpct:-3,_firdmgpct:-3,_natdmgpct:-3,_frodmgpct:-3,_shadmgpct:-3,_arcdmgpct:-3},
			{_mledmgpct:-7,_rgddmgpct:-7,_holdmgpct:-7,_firdmgpct:-7,_natdmgpct:-7,_frodmgpct:-7,_shadmgpct:-7,_arcdmgpct:-7},
			{_mledmgpct:-10,_rgddmgpct:-10,_holdmgpct:-10,_firdmgpct:-10,_natdmgpct:-10,_frodmgpct:-10,_shadmgpct:-10,_arcdmgpct:-10}
		],
		x: 0,
		y: 3
	},
	{
		i: 283,
		n: 'Seal Fate',
		m: 2,
		s: [14186,14190],
		d: [
			'Your critical strikes from abilities that add combo points have a 50% chance to add an additional combo point.',
			'Your critical strikes from abilities that add combo points have a 100% chance to add an additional combo point.'
		],
		x: 1,
		y: 3,
		r: [8,1]
	},
	{
		i: 6516,
		n: 'Murderous Intent',
		m: 2,
		s: [14158,14159],
		d: [
			'When you Backstab an enemy that is below 35% health, you instantly recover 15 Energy.',
			'When you Backstab an enemy that is below 35% health, you instantly recover 30 Energy.'
		],
		x: 0,
		y: 4
	},
	{
		i: 281,
		n: 'Overkill',
		m: 1,
		s: [58426],
		d: [
			'While stealthed, and for 20 seconds after breaking stealth, you regenerate 30% additional energy.'
		],
		x: 1,
		y: 4
	},
	{
		i: 1715,
		n: 'Master Poisoner',
		m: 1,
		s: [58410],
		d: [
			'Increases the spell damage taken by any target you have poisoned by 8%, causes your Envenom ability to no longer consume Deadly Poison, and reduces the duration of all Poison effects applied to you by 50%.'
		],
		x: 2,
		y: 4,
		r: [9,3]
	},
	{
		i: 278,
		n: 'Improved Expose Armor',
		m: 2,
		s: [14168,14169],
		d: [
			'Gives a 50% chance to refund all combo points used when performing your Expose Armor ability.',
			'Gives a 100% chance to refund all combo points used when performing your Expose Armor ability.'
		],
		x: 3,
		y: 4
	},
	{
		i: 2070,
		n: 'Cut to the Chase',
		m: 3,
		s: [51664,51665,51667],
		d: [
			'Your Eviscerate and Envenom abilities have a 33% chance to refresh your Slice and Dice duration to its 5 combo point maximum.',
			'Your Eviscerate and Envenom abilities have a 67% chance to refresh your Slice and Dice duration to its 5 combo point maximum.',
			'Your Eviscerate and Envenom abilities have a 100% chance to refresh your Slice and Dice duration to its 5 combo point maximum.'
		],
		x: 1,
		y: 5
	},
	{
		i: 6517,
		n: 'Venomous Wounds',
		m: 2,
		s: [79133,79134],
		d: [
			'Each time your Rupture or Garrote deals damage to an enemy that you have poisoned, you have a 30% chance to deal <!--pts1-->675<!----> additional Nature damage and to regain 10 Energy.  If an enemy dies while afflicted by your Rupture, you regain energy proportional to the remaining Rupture duration.',
			'Each time your Rupture or Garrote deals damage to an enemy that you have poisoned, you have a 60% chance to deal <!--pts1-->675<!----> additional Nature damage and to regain 10 Energy.  If an enemy dies while afflicted by your Rupture, you regain energy proportional to the remaining Rupture duration.'
		],
		x: 2,
		y: 5
	},
	{
		i: 2071,
		n: 'Vendetta',
		m: 1,
		s: [79140],
		d: [
			'Marks an enemy for death, increasing all damage you deal to the target by 20% and granting you unerring vision of your target, regardless of concealments such as stealth and invisibility.  Lasts 30 sec.'
		],
		t: ['30 yd range<br />2 min cooldown'],
		x: 1,
		y: 6
	}
	]
},
{
	n: 'Combat',
	color: '#FF0000',
	role: 8,
	mastery: {
		description: 'A swashbuckler who uses agility and guile to stand toe-to-toe with enemies.',
		spells: [
			{id:13877,name:'Blade Flurry',icon:'ability_warrior_punishingblow'},
			{id:61329,name:'Vitality',icon:'ability_warrior_revenge'},
			{id:13852,name:'Ambidexterity',icon:'ability_dualwield'}
		],
		rating: [
			{id:76806,name:'Main Gauche',description:'<!--sp76806:0-->Your main hand attacks have a 16% chance to grant you an attack that deals damage equal to 100% of a main hand attack.  Each point of Mastery increases the chance by an additional 2.00%.<!--sp76806-->'}
		]
	},
	icon: 'ability_backstab',
	t: [
	{
		i: 6395,
		n: 'Improved Recuperate',
		m: 2,
		s: [79007,79008],
		d: [
			'Causes your Recuperate ability to restore an additional 0.5% of your maximum health and reduces all damage taken by 3% while your Recuperate ability is active.',
			'Causes your Recuperate ability to restore an additional 1% of your maximum health and reduces all damage taken by 6% while your Recuperate ability is active.'
		],
		x: 0,
		y: 0
	},
	{
		i: 201,
		n: 'Improved Sinister Strike',
		m: 3,
		s: [13732,13863,79004],
		d: [
			'Increases the damage dealt by your Sinister Strike ability by 10% and reduces its Energy cost by 2.',
			'Increases the damage dealt by your Sinister Strike ability by 20% and reduces its Energy cost by 4.',
			'Increases the damage dealt by your Sinister Strike ability by 30% and reduces its Energy cost by 6.'
		],
		x: 1,
		y: 0
	},
	{
		i: 181,
		n: 'Precision',
		m: 3,
		s: [13705,13832,13843],
		d: [
			'Increases your chance to hit with weapon and poison attacks by 2%.',
			'Increases your chance to hit with weapon and poison attacks by 4%.',
			'Increases your chance to hit with weapon and poison attacks by 6%.'
		],
		j: [
			{mlehitpct:[2,'forClass',[2,368797,1]],rgdhitpct:[2,'forClass',[2,368797,1]],splhitpct:[2,'forClass',[2,368797,1]]},
			{mlehitpct:[4,'forClass',[2,368797,1]],rgdhitpct:[4,'forClass',[2,368797,1]],splhitpct:[4,'forClass',[2,368797,1]]},
			{mlehitpct:[6,'forClass',[2,368797,1]],rgdhitpct:[6,'forClass',[2,368797,1]],splhitpct:[6,'forClass',[2,368797,1]]}
		],
		x: 2,
		y: 0
	},
	{
		i: 1827,
		n: 'Improved Slice and Dice',
		m: 2,
		s: [14165,14166],
		d: [
			'Increases the duration of your Slice and Dice ability by 25%.',
			'Increases the duration of your Slice and Dice ability by 50%.'
		],
		x: 0,
		y: 1
	},
	{
		i: 222,
		n: 'Improved Sprint',
		m: 2,
		s: [13743,13875],
		d: [
			'Gives a 50% chance to remove all movement-impairing effects when you activate your Sprint ability.',
			'Gives a 100% chance to remove all movement-impairing effects when you activate your Sprint ability.'
		],
		x: 1,
		y: 1
	},
	{
		i: 1122,
		n: 'Aggression',
		m: 3,
		s: [18427,18428,18429],
		d: [
			'Increases the damage of your Sinister Strike, Backstab, and Eviscerate abilities by 7%.',
			'Increases the damage of your Sinister Strike, Backstab, and Eviscerate abilities by 14%.',
			'Increases the damage of your Sinister Strike, Backstab, and Eviscerate abilities by 20%.'
		],
		x: 2,
		y: 1
	},
	{
		i: 206,
		n: 'Improved Kick',
		m: 2,
		s: [13754,13867],
		d: [
			'Causes your Kick ability to also silence the target for 1 sec.',
			'Causes your Kick ability to silence the target for 3 sec.'
		],
		x: 3,
		y: 1
	},
	{
		i: 186,
		n: 'Lightning Reflexes',
		m: 3,
		s: [13712,13788,13789],
		d: [
			'Increases your chance to dodge enemy attacks by 3% and your attack speed by 2%.',
			'Increases your chance to dodge enemy attacks by 6% and your attack speed by 4%.',
			'Increases your chance to dodge enemy attacks by 9% and your attack speed by 6%.'
		],
		j: [
			{dodgepct:3},
			{dodgepct:6},
			{dodgepct:9}
		],
		x: 0,
		y: 2
	},
	{
		i: 11171,
		n: 'Revealing Strike',
		m: 1,
		s: [84617],
		d: [
			'An instant strike that causes <!--ppl29:80:81:86-->125% of your normal weapon damage and increases the effectiveness of your next offensive finishing move on that target by 35% for 15 sec.  Awards 1 combo point.'
		],
		t: ['<table width="100%"><tr><td>40 Energy</td><th>Melee Range</th></tr></table>Instant','Requires Melee Weapon'],
		x: 1,
		y: 2
	},
	{
		i: 6511,
		n: 'Reinforced Leather',
		m: 2,
		s: [79077,79079],
		d: [
			'Increases your armor contribution from cloth and leather items by 25%.',
			'Increases your armor contribution from cloth and leather items by 50%.'
		],
		j: [
			{armor:[25/100,'forSlots',[0,2,4,7,8,9,10,11,17]]},
			{armor:[50/100,'forSlots',[0,2,4,7,8,9,10,11,17]]}
		],
		x: 2,
		y: 2
	},
	{
		i: 203,
		n: 'Improved Gouge',
		m: 2,
		s: [13741,13793],
		d: [
			'Increases the effect duration of your Gouge ability by 1 sec and reduces its energy cost by 15.',
			'Increases the effect duration of your Gouge ability by 2 sec and reduces its energy cost by 30.'
		],
		x: 3,
		y: 2
	},
	{
		i: 1825,
		n: 'Combat Potency',
		m: 3,
		s: [35541,35550,35551],
		d: [
			'Gives your successful off-hand melee attacks and Main Gauche attacks a 20% chance to generate 5 Energy.',
			'Gives your successful off-hand melee attacks  and Main Gauche attacks a 20% chance to generate 10 Energy.',
			'Gives your successful off-hand melee attacks and Main Gauche attacks a 20% chance to generate 15 Energy.'
		],
		x: 1,
		y: 3
	},
	{
		i: 1706,
		n: 'Blade Twisting',
		m: 2,
		s: [31124,31126],
		d: [
			'Gives your damaging melee attacks a 20% chance to daze the target, reducing movement speed by 70% for 4 sec.',
			'Gives your damaging melee attacks a 40% chance to daze the target, reducing movement speed by 70% for 8 sec.'
		],
		x: 2,
		y: 3
	},
	{
		i: 2072,
		n: 'Throwing Specialization',
		m: 2,
		s: [5952,51679],
		d: [
			'Increases the range of Throw and Deadly Throw by 5 yards and gives your Deadly Throw a 50% chance to interrupt the target for 3 sec.',
			'Increases the range of Throw and Deadly Throw by 10 yards and gives your Deadly Throw a 100% chance to interrupt the target for 3 sec.'
		],
		x: 0,
		y: 4
	},
	{
		i: 205,
		n: 'Adrenaline Rush',
		m: 1,
		s: [13750],
		d: [
			'Increases your Energy regeneration rate by 100% and your melee attack speed by 20% for 15 sec.'
		],
		t: ['3 min cooldown'],
		x: 1,
		y: 4
	},
	{
		i: 2074,
		n: 'Savage Combat',
		m: 2,
		s: [51682,58413],
		d: [
			'Increases your total attack power by 2% and all physical damage caused to enemies you have poisoned is increased by 2%.',
			'Increases your total attack power by 4% and all physical damage caused to enemies you have poisoned is increased by 4%.'
		],
		j: [
			{mleatkpwr:[2/100,'percentOf','mleatkpwr']},
			{mleatkpwr:[4/100,'percentOf','mleatkpwr']}
		],
		x: 2,
		y: 4
	},
	{
		i: 11174,
		n: 'Bandit\'s Guile',
		m: 3,
		s: [84652,84653,84654],
		d: [
			'Your Sinister Strike and Revealing Strike abilities have a 33% chance to grant you an evolving insight into an opponent\'s defenses, increasing damage to that target by up to 30%.  Opponents can adapt over time, negating this benefit, and Striking a different opponent will begin the cycle anew.',
			'Your Sinister Strike and Revealing Strike abilities have a 67% chance to grant you an evolving insight into an opponent\'s defenses, increasing damage to that target by up to 30%.  Opponents can adapt over time, negating this benefit, and Striking a different opponent will begin the cycle anew.',
			'Your Sinister Strike and Revealing Strike abilities have a 100% chance to grant you an evolving insight into an opponent\'s defenses, increasing damage to that target by up to 30%.  Opponents can adapt over time, negating this benefit, and Striking a different opponent will begin the cycle anew.'
		],
		x: 0,
		y: 5
	},
	{
		i: 6513,
		n: 'Restless Blades',
		m: 2,
		s: [79095,79096],
		d: [
			'Your damaging finishing moves reduce the cooldown of your Adrenaline Rush, Killing Spree, Redirect, and Sprint abilities by 1 sec per combo point.',
			'Your damaging finishing moves reduce the cooldown of your Adrenaline Rush, Killing Spree, Redirect, and Sprint abilities by 2 sec per combo point.'
		],
		x: 2,
		y: 5
	},
	{
		i: 2076,
		n: 'Killing Spree',
		m: 1,
		s: [51690],
		d: [
			'Step through the shadows from enemy to enemy within 10 yards, attacking an enemy every 0.5 sec with both weapons until 5 assaults are made, and increasing all damage done by 20% for the duration.  Can hit the same target multiple times.  Cannot hit invisible or stealthed targets.'
		],
		t: ['10 yd range<br />2 min cooldown','Requires Melee Weapon'],
		x: 1,
		y: 6,
		r: [14,1]
	}
	]
},
{
	n: 'Subtlety',
	color: '#4D80FF',
	role: 8,
	mastery: {
		description: 'A dark stalker who leaps from the shadows to ambush <his/her> unsuspecting prey.',
		spells: [
			{id:36554,name:'Shadowstep',icon:'ability_rogue_shadowstep'},
			{id:31223,name:'Master of Subtlety',icon:'ability_rogue_masterofsubtlety'},
			{id:31220,name:'Sinister Calling',icon:'ability_rogue_sinistercalling'}
		],
		rating: [
			{id:76808,name:'Executioner',description:'<!--sp76808:0-->Increases the damage done by all your finishing moves, and the effectiveness of your Slice and Dice, by 20%.  Each point of Mastery increases damage by an additional 2.5%.<!--sp76808-->'}
		]
	},
	icon: 'ability_stealth',
	t: [
	{
		i: 244,
		n: 'Nightstalker',
		m: 2,
		s: [13975,14062],
		d: [
			'Increases your speed while stealthed by 5% and reduces the cooldown of your Stealth ability by 2 sec.',
			'Increases your speed while stealthed by 10% and reduces the cooldown of your Stealth ability by 4 sec.'
		],
		x: 0,
		y: 0
	},
	{
		i: 263,
		n: 'Improved Ambush',
		m: 3,
		s: [14079,14080,84661],
		d: [
			'Increases the critical strike chance of your Ambush ability by 20% and its damage by 5%.',
			'Increases the critical strike chance of your Ambush ability by 40% and its damage by 10%.',
			'Increases the critical strike chance of your Ambush ability by 60% and its damage by 15%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 2244,
		n: 'Relentless Strikes',
		m: 3,
		s: [14179,58422,58423],
		d: [
			'Your finishing moves have a 7% chance per combo point to restore 25 energy.',
			'Your finishing moves have a 14% chance per combo point to restore 25 energy.',
			'Your finishing moves have a 20% chance per combo point to restore 25 energy.'
		],
		x: 2,
		y: 0
	},
	{
		i: 247,
		n: 'Elusiveness',
		m: 2,
		s: [13981,14066],
		d: [
			'Reduces the cooldown of your Vanish and Blind abilities by 30 sec and your Cloak of Shadows ability by 10 sec.',
			'Reduces the cooldown of your Vanish and Blind abilities by 60 sec and your Cloak of Shadows ability by 20 sec.'
		],
		x: 0,
		y: 1
	},
	{
		i: 2077,
		n: 'Waylay',
		m: 2,
		s: [51692,51696],
		d: [
			'Your Ambush and Backstab hits have a 50% chance to unbalance a target, increasing the time between their melee and ranged attacks by 20%, and reducing movement speed by 50% for 8 sec.',
			'Your Ambush and Backstab hits have a 100% chance to unbalance a target, increasing the time between their melee and ranged attacks by 20%, and reducing movement speed by 50% for 8 sec.'
		],
		x: 1,
		y: 1,
		r: [1,3]
	},
	{
		i: 261,
		n: 'Opportunity',
		m: 3,
		s: [14057,14072,79141],
		d: [
			'Increases the damage dealt with your Backstab, Mutilate, Garrote, and Ambush abilities by 10%.',
			'Increases the damage dealt with your Backstab, Mutilate, Garrote and Ambush abilities by 20%.',
			'Increases the damage dealt with your Backstab, Mutilate, Garrote and Ambush abilities by 30%.'
		],
		x: 2,
		y: 1
	},
	{
		i: 245,
		n: 'Initiative',
		m: 2,
		s: [13976,13979],
		d: [
			'Gives you a 50% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability.',
			'Gives you a 100% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability.'
		],
		x: 3,
		y: 1
	},
	{
		i: 11665,
		n: 'Energetic Recovery',
		m: 3,
		s: [79150,79151,79152],
		d: [
			'Empowers your Recuperate ability, causing its periodic effect to also restore 4 Energy.',
			'Empowers your Recuperate ability, causing its periodic effect to also restore 8 Energy.',
			'Empowers your Recuperate ability, causing its periodic effect to also restore 12 Energy.'
		],
		x: 0,
		y: 2
	},
	{
		i: 6519,
		n: 'Find Weakness',
		m: 2,
		s: [51632,91023],
		d: [
			'Your Ambush, Garrote, and Cheap Shot abilities reveal a flaw in your target\'s defenses, causing all your attacks to bypass 35% of that enemy\'s armor for 10 sec.',
			'Your Ambush, Garrote, and Cheap Shot abilities reveal a flaw in your target\'s defenses, causing all your attacks to bypass 70% of that enemy\'s armor for 10 sec.'
		],
		x: 1,
		y: 2
	},
	{
		i: 681,
		n: 'Hemorrhage',
		m: 1,
		s: [16511],
		d: [
			'An instant strike that deals <!--ppl29:80:69:80-->110% weapon damage ((<!--ppl29:80:69:80-->110 * 1.45)% if a dagger is equipped)<!--sp56807:0--><!--sp56807--> and causes the target to take 30% additional damage from Bleed effects for 1 min.  Awards 1 combo point.'
		],
		t: ['<table width="100%"><tr><td>35 Energy</td><th>Melee Range</th></tr></table>Instant','Requires Melee Weapon'],
		x: 2,
		y: 2
	},
	{
		i: 2078,
		n: 'Honor Among Thieves',
		m: 3,
		s: [51698,51700,51701],
		d: [
			'Increases the critical strike chance of all party and raid members by 5%. When any player in your party or raid critically hits with a spell or ability, you have a 33% chance to gain a combo point on your current target.  This effect cannot occur more than once every 4 seconds.',
			'Increases the critical strike chance of all party and raid members by 5%. When any player in your party or raid critically hits with a spell or ability, you have a 66% chance to gain a combo point on your current target.  This effect cannot occur more than once every 3 seconds.',
			'Increases the critical strike chance of all party and raid members by 5%. When any player in your party or raid critically hits with a spell or ability, you have a 100% chance to gain a combo point on your current target.  This effect cannot occur more than once every 2 seconds.'
		],
		j: [
			{mlecritstrkpct:5,rgdcritstrkpct:5,holsplcritstrkpct:5,firsplcritstrkpct:5,natsplcritstrkpct:5,frosplcritstrkpct:5,shasplcritstrkpct:5,arcsplcritstrkpct:5},
			{mlecritstrkpct:5,rgdcritstrkpct:5,holsplcritstrkpct:5,firsplcritstrkpct:5,natsplcritstrkpct:5,frosplcritstrkpct:5,shasplcritstrkpct:5,arcsplcritstrkpct:5},
			{mlecritstrkpct:5,rgdcritstrkpct:5,holsplcritstrkpct:5,firsplcritstrkpct:5,natsplcritstrkpct:5,frosplcritstrkpct:5,shasplcritstrkpct:5,arcsplcritstrkpct:5}
		],
		x: 0,
		y: 3
	},
	{
		i: 381,
		n: 'Premeditation',
		m: 1,
		s: [14183],
		d: [
			'When used, adds 2 combo points to your target.  You must add to or use those combo points within 20 sec or the combo points are lost.'
		],
		t: ['30 yd range<br />20 sec cooldown','Requires Stealth'],
		x: 1,
		y: 3
	},
	{
		i: 11664,
		n: 'Enveloping Shadows',
		m: 3,
		s: [31211,31212,31213],
		d: [
			'Reduces the damage taken by area of effect attacks by 10% and increases the duration of your Feint ability by 1 sec.',
			'Reduces the damage taken by area of effect attacks by 20% and increases the duration of your Feint ability by 2 sec.',
			'Reduces the damage taken by area of effect attacks by 30% and increases the duration of your Feint ability by 3 sec.'
		],
		x: 3,
		y: 3
	},
	{
		i: 1722,
		n: 'Cheat Death',
		m: 3,
		s: [31228,31229,31230],
		d: [
			'You have a 33% chance that an attack which would otherwise kill you will instead reduce you to 10% of your maximum health. In addition, all damage taken will be reduced by 80% for 3 sec.  This effect cannot occur more than once per 90 seconds.',
			'You have a 66% chance that an attack which would otherwise kill you will instead reduce you to 10% of your maximum health. In addition, all damage taken will be reduced by 80% for 3 sec.  This effect cannot occur more than once per 90 seconds.',
			'You have a 100% chance that an attack which would otherwise kill you will instead reduce you to 10% of your maximum health. In addition, all damage taken will be reduced by 80% for 3 sec.  This effect cannot occur more than once per 90 seconds.'
		],
		x: 0,
		y: 4
	},
	{
		i: 284,
		n: 'Preparation',
		m: 1,
		s: [14185],
		d: [
			'When activated, this ability immediately finishes the cooldown on your Sprint, Vanish,<!--sp56819:0--><!--sp56819--> and Shadowstep abilities.'
		],
		t: ['5 min cooldown'],
		x: 1,
		y: 4
	},
	{
		i: 6520,
		n: 'Sanguinary Vein',
		m: 2,
		s: [79146,79147],
		d: [
			'Increases your damage dealt to targets with a Bleed effect on them by 5% and gives your Bleed effects a 50% chance to not break your Gouge.',
			'Increases your damage dealt to targets with a Bleed effect on them by 10% and gives your Bleed effects a 100% chance to not break your Gouge.'
		],
		x: 2,
		y: 4,
		r: [9,1]
	},
	{
		i: 2080,
		n: 'Slaughter from the Shadows',
		m: 3,
		s: [51708,51709,51710],
		d: [
			'Reduces the energy cost of your Backstab and Ambush abilities by 7, and the energy cost of your Hemorrhage and Fan of Knives abilities by 2.',
			'Reduces the energy cost of your Backstab and Ambush abilities by 14, and the energy cost of your Hemorrhage and Fan of Knives abilities by 4.',
			'Reduces the energy cost of your Backstab and Ambush abilities by 20, and the energy cost of your Hemorrhage and Fan of Knives abilities by 6.'
		],
		x: 1,
		y: 5
	},
	{
		i: 1123,
		n: 'Serrated Blades',
		m: 2,
		s: [14171,14172],
		d: [
			'Your Eviscerate has a 10% chance per combo point to refresh your Rupture on the target to its original duration.',
			'Your Eviscerate has a 20% chance per combo point to refresh your Rupture on the target to its original duration.'
		],
		x: 2,
		y: 5
	},
	{
		i: 2081,
		n: 'Shadow Dance',
		m: 1,
		s: [51713],
		d: [
			'Enter the Shadow Dance for 6 sec, allowing the use of Sap, Garrote, Ambush, Cheap Shot, Premeditation, Pickpocket and Disarm Trap regardless of being stealthed.'
		],
		t: ['1 min cooldown'],
		x: 1,
		y: 6
	}
	]
}
]);