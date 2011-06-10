$WowheadTalentCalculator.registerClass(8, [
{
	n: 'Arcane',
	color: '#FFB81A',
	role: 8,
	mastery: {
		description: 'Manipulates arcane energies, playing with the very fabric of time and space.',
		spells: [
			{id:44425,name:'Arcane Barrage',icon:'ability_mage_arcanebarrage'},
			{id:84671,name:'Arcane Specialization',icon:'spell_fire_twilightfire'}
		],
		rating: [
			{id:76547,name:'Mana Adept',description:'<!--sp76547:0-->Increases all spell damage done by up to 12%, based on the amount of mana the Mage has unspent.  Each point of Mastery increases damage done by up to an additional 1.5%.<!--sp76547-->'}
		]
	},
	icon: 'spell_holy_magicalsentry',
	t: [
	{
		i: 9154,
		n: 'Arcane Concentration',
		m: 3,
		s: [11213,12574,12575],
		d: [
			'Gives you a 3% chance of entering a Clearcasting state after any damage spell hits a target.  The Clearcasting state reduces the mana cost of your next damage spell by 100%.',
			'Gives you a 6% chance of entering a Clearcasting state after any damage spell hits a target.  The Clearcasting state reduces the mana cost of your next damage spell by 100%.',
			'Gives you a 10% chance of entering a Clearcasting state after any damage spell hits a target.  The Clearcasting state reduces the mana cost of your next damage spell by 100%.'
		],
		x: 0,
		y: 0
	},
	{
		i: 9166,
		n: 'Improved Counterspell',
		m: 2,
		s: [11255,12598],
		d: [
			'Your Counterspell also silences the target for 2 sec.',
			'Your Counterspell also silences the target for 4 sec.'
		],
		x: 1,
		y: 0
	},
	{
		i: 9200,
		n: 'Netherwind Presence',
		m: 3,
		s: [44400,44402,44403],
		d: [
			'Increases your spell haste by 1%.',
			'Increases your spell haste by 2%.',
			'Increases your spell haste by 3%.'
		],
		j: [
			{splhastepct:1},
			{splhastepct:2},
			{splhastepct:3}
		],
		x: 2,
		y: 0
	},
	{
		i: 9170,
		n: 'Torment the Weak',
		m: 3,
		s: [29447,55339,55340],
		d: [
			'Your Arcane damage spells deal 2% more damage to snared or slowed targets.',
			'Your Arcane damage spells deal 4% more damage to snared or slowed targets.',
			'Your Arcane damage spells deal 6% more damage to snared or slowed targets.'
		],
		x: 0,
		y: 1
	},
	{
		i: 10864,
		n: 'Invocation',
		m: 2,
		s: [84722,84723],
		d: [
			'You gain a 5% damage bonus for 8 sec after successfully interrupting a spell.',
			'You gain a 10% damage bonus for 8 sec after successfully interrupting a spell.'
		],
		x: 1,
		y: 1
	},
	{
		i: 10737,
		n: 'Improved Arcane Missiles',
		m: 2,
		s: [83513,83515],
		d: [
			'Increases the number of missiles fired by your Arcane Missiles spell by 1.',
			'Increases the number of missiles fired by your Arcane Missiles spell by 2.'
		],
		x: 2,
		y: 1
	},
	{
		i: 9172,
		n: 'Improved Blink',
		m: 2,
		s: [31569,31570],
		d: [
			'Increases your speed by 35% for 3 sec after casting the Blink spell.',
			'Increases your speed by 70% for 3 sec after casting the Blink spell.'
		],
		x: 3,
		y: 1
	},
	{
		i: 9192,
		n: 'Arcane Flows',
		m: 2,
		s: [44378,44379],
		d: [
			'Reduces the cooldown of your Presence of Mind, Arcane Power and Invisibility spells by 12% and the cooldown of your Evocation spell by 1 min.',
			'Reduces the cooldown of your Presence of Mind, Arcane Power and Invisibility spells by 25% and the cooldown of your Evocation spell by 2 min.'
		],
		x: 0,
		y: 2,
		r: [8,1]
	},
	{
		i: 9174,
		n: 'Presence of Mind',
		m: 1,
		s: [12043],
		d: [
			'When activated, your next Mage spell with a casting time less than 10 sec becomes an instant cast spell.'
		],
		t: ['2 min cooldown'],
		x: 1,
		y: 2
	},
	{
		i: 9198,
		n: 'Missile Barrage',
		m: 2,
		s: [44404,54486],
		d: [
			'Your Arcane Missiles spell will fire its missiles every 0.6 sec.',
			'Your Arcane Missiles spell will fire its missiles every 0.5 sec.'
		],
		x: 2,
		y: 2,
		r: [5,2]
	},
	{
		i: 9178,
		n: 'Prismatic Cloak',
		m: 3,
		s: [31574,31575,54354],
		d: [
			'Reduces all damage taken by 2% and reduces the fade time of your Invisibility spell by 1 sec.',
			'Reduces all damage taken by 4% and reduces the fade time of your Invisibility spell by 2 sec.',
			'Reduces all damage taken by 6% and reduces the fade time of your Invisibility spell by 3 sec.'
		],
		j: [
			{_mledmgpct:-2,_rgddmgpct:-2,_holdmgpct:-2,_firdmgpct:-2,_natdmgpct:-2,_frodmgpct:-2,_shadmgpct:-2,_arcdmgpct:-2},
			{_mledmgpct:-4,_rgddmgpct:-4,_holdmgpct:-4,_firdmgpct:-4,_natdmgpct:-4,_frodmgpct:-4,_shadmgpct:-4,_arcdmgpct:-4},
			{_mledmgpct:-6,_rgddmgpct:-6,_holdmgpct:-6,_firdmgpct:-6,_natdmgpct:-6,_frodmgpct:-6,_shadmgpct:-6,_arcdmgpct:-6}
		],
		x: 3,
		y: 2
	},
	{
		i: 9142,
		n: 'Improved Polymorph',
		m: 2,
		s: [11210,12592],
		d: [
			'When a target you\'ve polymorphed is damaged, that target is stunned for 1.5 sec.  This effect cannot occur more often than once every 10 sec.',
			'When a target you\'ve polymorphed is damaged, that target is stunned for 3 sec.  This effect cannot occur more often than once every 10 sec.'
		],
		x: 0,
		y: 3
	},
	{
		i: 10733,
		n: 'Arcane Tactics',
		m: 1,
		s: [82930],
		d: [
			'Increases the damage of all party and raid members within 100 yards by 3%.'
		],
		j: [
			{mledmgpct:3,rgddmgpct:3,holdmgpct:3,firdmgpct:3,natdmgpct:3,frodmgpct:3,shadmgpct:3,arcdmgpct:3}
		],
		x: 1,
		y: 3,
		r: [8,1]
	},
	{
		i: 9188,
		n: 'Incanter\'s Absorption',
		m: 2,
		s: [44394,44395],
		d: [
			'When your Mana Shield or Mage Ward absorbs damage your spell damage is increased by 10% of the amount absorbed for 10 sec.  In addition, when your Mana Shield is destroyed, all enemies within 6 yards are knocked back 12 yards.',
			'When your Mana Shield or Mage Ward absorbs damage your spell damage is increased by 20% of the amount absorbed for 10 sec.  In addition, when your Mana Shield is destroyed, all enemies within 6 yards are knocked back 12 yards.'
		],
		x: 2,
		y: 3
	},
	{
		i: 11825,
		n: 'Improved Arcane Explosion',
		m: 2,
		s: [90787,90788],
		d: [
			'Reduces the global cooldown of your Arcane Explosion spell by 0.2 sec, reduces the threat generated by 40%, and reduces the mana cost by 25%.',
			'Reduces the global cooldown of your Arcane Explosion spell by 0.5 sec, reduces the threat generated by 80%, and reduces the mana cost by 50%.'
		],
		x: 3,
		y: 3
	},
	{
		i: 9180,
		n: 'Arcane Potency',
		m: 2,
		s: [31571,31572],
		d: [
			'Increases the critical strike chance of your next two damaging spells by 7% after gaining Clearcasting or Presence of Mind.',
			'Increases the critical strike chance of your next two damaging spells by 15% after gaining Clearcasting or Presence of Mind.'
		],
		x: 0,
		y: 4
	},
	{
		i: 9196,
		n: 'Slow',
		m: 1,
		s: [31589],
		d: [
			'Reduces target\'s movement speed by 60%, increases the time between ranged attacks by 60% and increases casting time by 30%.  Lasts 15 sec.  Slow can only affect one target at a time.'
		],
		t: ['<table width="100%"><tr><td>12% of base mana</td><th>35 yd range</th></tr></table>Instant'],
		x: 1,
		y: 4
	},
	{
		i: 11367,
		n: 'Nether Vortex',
		m: 2,
		s: [86181,86209],
		d: [
			'Gives your Arcane Blast spell a 50% chance to apply the Slow spell to any target it damages if no target is currently affected by Slow.',
			'Gives your Arcane Blast spell a 100% chance to apply the Slow spell to any target it damages if no target is currently affected by Slow.'
		],
		x: 2,
		y: 4,
		r: [16,1]
	},
	{
		i: 10578,
		n: 'Focus Magic',
		m: 1,
		s: [54646],
		d: [
			'Increases the target\'s chance to critically hit with spells by 3% for 30 min.  When the target critically hits your chance to critically hit with spells is increased by 3% for 10 sec.  Cannot be cast on self.  Limit 1 target.'
		],
		t: ['<table width="100%"><tr><td>6% of base mana</td><th>30 yd range</th></tr></table>Instant'],
		x: 0,
		y: 5
	},
	{
		i: 9194,
		n: 'Improved Mana Gem',
		m: 2,
		s: [31584,31585],
		d: [
			'Mana gained from your Mana Gem also increases your spell power by 1% of your maximum mana for 10 seconds.',
			'Mana gained from your Mana Gem also increases your spell power by 2% of your maximum mana for 10 seconds.'
		],
		x: 2,
		y: 5
	},
	{
		i: 9186,
		n: 'Arcane Power',
		m: 1,
		s: [12042],
		d: [
			'When activated, you deal 20% more spell damage but spells cost 10% more mana to cast. <!--sp56381:0--><!--sp56381-->This effect lasts 15 sec.'
		],
		t: ['2 min cooldown'],
		x: 1,
		y: 6,
		r: [16,1]
	}
	]
},
{
	n: 'Fire',
	color: '#FF0000',
	role: 8,
	mastery: {
		description: 'Ignites enemies with balls of fire and the breath of dragons.',
		spells: [
			{id:11366,name:'Pyroblast',icon:'spell_fire_fireball02'},
			{id:84668,name:'Fire Specialization',icon:'spell_fire_fire'}
		],
		rating: [
			{id:76595,name:'Flashburn',description:'<!--sp76595:0-->Increases the damage done by all your periodic fire damage effects by 22.4%.  Each point of Mastery increases periodic damage done by an additional 2.8%.<!--sp76595-->'}
		]
	},
	icon: 'spell_fire_firebolt02',
	t: [
	{
		i: 10545,
		n: 'Master of Elements',
		m: 2,
		s: [29074,29075],
		d: [
			'Your spell criticals will refund 15% of their base mana cost.',
			'Your spell criticals will refund 30% of their base mana cost.'
		],
		x: 0,
		y: 0
	},
	{
		i: 10531,
		n: 'Burning Soul',
		m: 3,
		s: [11083,84253,84254],
		d: [
			'Reduces the casting time lost from taking damaging attacks by 23%.',
			'Reduces the casting time lost from taking damaging attacks by 46%.',
			'Reduces the casting time lost from taking damaging attacks by 70%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 10523,
		n: 'Improved Fire Blast',
		m: 2,
		s: [11078,11080],
		d: [
			'Increases the critical strike chance of your Fire Blast spell by 4% and increases its range by 5 yards.',
			'Increases the critical strike chance of your Fire Blast spell by 8% and increases its range by 10 yards.'
		],
		x: 2,
		y: 0
	},
	{
		i: 10529,
		n: 'Ignite',
		m: 3,
		s: [11119,11120,12846],
		d: [
			'Your critical strikes from non-periodic Fire damage spells cause the target to burn for an additional 13% of your spell\'s damage over 4 sec.',
			'Your critical strikes from non-periodic Fire damage spells cause the target to burn for an additional 26% of your spell\'s damage over 4 sec.',
			'Your critical strikes from non-periodic Fire damage spells cause the target to burn for an additional 40% of your spell\'s damage over 4 sec.'
		],
		x: 0,
		y: 1
	},
	{
		i: 11434,
		n: 'Fire Power',
		m: 3,
		s: [18459,18460,54734],
		d: [
			'Increases the damage of your Fire spells by 1% and gives your Flame Orb a 33% chance to explode for <!--pts1-->1134 to 1336<!----> damage at the end of its duration.',
			'Increases the damage of your Fire spells by 2% and gives your Flame Orb a 66% chance to explode for <!--pts1-->1134 to 1336<!----> damage at the end of its duration.',
			'Increases the damage of your Fire spells by 3% and gives your Flame Orb a 100% chance to explode for <!--pts1-->1134 to 1336<!----> damage at the end of its duration.'
		],
		j: [
			{firdmgpct:1},
			{firdmgpct:2},
			{firdmgpct:3}
		],
		x: 1,
		y: 1
	},
	{
		i: 10555,
		n: 'Blazing Speed',
		m: 2,
		s: [31641,31642],
		d: [
			'Gives you a 5% chance when hit by a melee or ranged attack to increase your movement speed by 50% and dispel all effects that prevent movement.  This effect lasts 8 sec.',
			'Gives you a 10% chance when hit by a melee or ranged attack to increase your movement speed by 50% and dispel all effects that prevent movement.  This effect lasts 8 sec.'
		],
		x: 2,
		y: 1
	},
	{
		i: 10537,
		n: 'Impact',
		m: 2,
		s: [11103,12357],
		d: [
			'Gives your damaging spells a 5% chance to reset the cooldown on Fire Blast and to cause the next Fire Blast you cast to stun the target for 2 sec and spread any Fire damage over time effects to nearby enemy targets within 12 yards.',
			'Gives your damaging spells a 10% chance to reset the cooldown on Fire Blast and to cause the next Fire Blast you cast to stun the target for 2 sec and spread any Fire damage over time effects to nearby enemy targets within 12 yards.'
		],
		x: 3,
		y: 1
	},
	{
		i: 11433,
		n: 'Cauterize',
		m: 2,
		s: [86948,86949],
		d: [
			'You have a 50% chance that an attack which would otherwise kill you will instead bring you to 40% of your maximum health.  However, you will burn for 12% of your maximum health every 1.5 sec for the next 6 sec.  This effect cannot occur more than once per minute.',
			'You have a 100% chance that an attack which would otherwise kill you will instead bring you to 40% of your maximum health.  However, you will burn for 12% of your maximum health every 1.5 sec for the next 6 sec.  This effect cannot occur more than once per minute.'
		],
		x: 0,
		y: 2
	},
	{
		i: 10551,
		n: 'Blast Wave',
		m: 1,
		s: [11113],
		d: [
			'A wave of flame radiates outward from the target location, damaging all enemies caught within the blast for <!--pts1-->851 to 1003<!----> Fire damage and are slowed by 70% for 3 sec.'
		],
		t: ['<table width="100%"><tr><td>7% of base mana</td><th>40 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>15 sec cooldown</th></tr></table><!--?11113:20:85:85:13:0:1000-->'],
		x: 1,
		y: 2
	},
	{
		i: 10573,
		n: 'Hot Streak',
		m: 1,
		s: [44445],
		d: [
			'Your spells no longer trigger Arcane Missiles.  Instead, your critical strikes with Fireball, Frostfire Bolt, Scorch, Pyroblast, or Fire Blast have a chance to cause your next Pyroblast spell cast within 15 sec to be instant cast and cost no mana.'
		],
		x: 2,
		y: 2
	},
	{
		i: 10547,
		n: 'Improved Scorch',
		m: 2,
		s: [11115,11367],
		d: [
			'Reduces the mana cost of your Scorch spell by 50%.',
			'Reduces the mana cost of your Scorch spell by 100%.'
		],
		x: 3,
		y: 2
	},
	{
		i: 10543,
		n: 'Molten Shields',
		m: 1,
		s: [11094],
		d: [
			'Reduces the global cooldown of your Mage Ward spell by 1 sec and your Blazing Speed also removes any movement slowing effects when triggered and is also triggered any time Mage Ward dissipates from absorbing damage.'
		],
		x: 0,
		y: 3
	},
	{
		i: 10561,
		n: 'Combustion',
		m: 1,
		s: [11129],
		d: [
			'Combines your damaging periodic Fire effects on an enemy target but does not consume them, instantly dealing <!--pts2-->955 to 1131<!----> Fire damage and creating a new periodic effect that lasts 10 sec and deals damage per time equal to the sum of the combined effects.'
		],
		t: ['40 yd range<br />2 min cooldown<!--?11129:25:85:85:726:0:1000-->'],
		x: 1,
		y: 3
	},
	{
		i: 12121,
		n: 'Improved Hot Streak',
		m: 2,
		s: [44446,44448],
		d: [
			'Any time you score 2 non-periodic critical strikes in a row with your Fireball, Frostfire Bolt, Scorch, Pyroblast, or Fire Blast spells, you have a 50% chance to trigger your Hot Streak effect.',
			'Any time you score 2 non-periodic critical strikes in a row with your Fireball, Frostfire Bolt, Scorch, Pyroblast, or Fire Blast spells, you have a 100% chance to trigger your Hot Streak effect.'
		],
		x: 2,
		y: 3,
		r: [9,1]
	},
	{
		i: 11431,
		n: 'Firestarter',
		m: 1,
		s: [86914],
		d: [
			'Allows you to cast the Scorch spell while moving.'
		],
		x: 3,
		y: 3
	},
	{
		i: 10734,
		n: 'Improved Flamestrike',
		m: 2,
		s: [84673,84674],
		d: [
			'Reduces the casting time of your Flamestrike spell by 50% and gives you a 50% chance that your Blast Wave spell will also automatically Flamestrike the same location if two or more targets are affected by the Blast Wave.',
			'Reduces the casting time of your Flamestrike spell by 100% and gives you a 100% chance that your Blast Wave spell will also automatically Flamestrike the same location if two or more targets are affected by the Blast Wave.'
		],
		x: 0,
		y: 4
	},
	{
		i: 10571,
		n: 'Dragon\'s Breath',
		m: 1,
		s: [31661],
		d: [
			'Targets in a cone in front of the caster take <!--pts1-->1195 to 1387<!----> Fire damage and are disoriented for 5 sec.  Any direct damaging attack will revive targets.'
		],
		t: ['7% of base mana<table width="100%"><tr><td>Instant</td><th>20 sec cooldown</th></tr></table><!--?31661:30:85:85:16:0:1000-->'],
		x: 1,
		y: 4
	},
	{
		i: 10563,
		n: 'Molten Fury',
		m: 3,
		s: [31679,31680,86880],
		d: [
			'Increases damage of all spells against targets with less than 35% health by 4%.',
			'Increases damage of all spells against targets with less than 35% health by 8%.',
			'Increases damage of all spells against targets with less than 35% health by 12%.'
		],
		x: 2,
		y: 4
	},
	{
		i: 10559,
		n: 'Pyromaniac',
		m: 2,
		s: [34293,34295],
		d: [
			'Increases spell haste by 5% if 3 or more targets are taking Fire damage over time from your spells.',
			'Increases spell haste by 10% if 3 or more targets are taking Fire damage over time from your spells.'
		],
		x: 0,
		y: 5
	},
	{
		i: 10541,
		n: 'Critical Mass',
		m: 3,
		s: [11095,12872,12873],
		d: [
			'Your Living Bomb and Flame Orb spells deal 5% more damage, and your Pyroblast and Scorch spells have a 33% chance to cause your target to be vulnerable to spell damage, increasing spell critical strike chance against that target by 5% and lasts 30 sec.',
			'Your Living Bomb and Flame Orb spells deal 10% more damage, and your Pyroblast and Scorch spells have a 66% chance to cause your target to be vulnerable to spell damage, increasing spell critical strike chance against that target by 5% and lasts 30 sec.',
			'Your Living Bomb and Flame Orb spells deal 15% more damage, and your Pyroblast and Scorch spells have a 100% chance to cause your target to be vulnerable to spell damage, increasing spell critical strike chance against that target by 5% and lasts 30 sec.'
		],
		x: 2,
		y: 5
	},
	{
		i: 10577,
		n: 'Living Bomb',
		m: 1,
		s: [44457],
		d: [
			'The target becomes a Living Bomb, taking <!--pts1:3:4-->1600<!----> Fire damage over 12 sec.  After 12 sec, the target explodes dealing <!--pts1-->400<!----> Fire damage to up to 3 enemies within 10 yards.  Limit 3 targets.'
		],
		t: ['<table width="100%"><tr><td>17% of base mana</td><th>40 yd range</th></tr></table>Instant<!--?44457:40:85:85:24:80:880-->'],
		x: 1,
		y: 6,
		r: [16,1]
	}
	]
},
{
	n: 'Frost',
	color: '#4D80FF',
	role: 8,
	mastery: {
		description: 'Freezes enemies in their tracks and shatters them with Frost magic.',
		spells: [
			{id:31687,name:'Summon Water Elemental',icon:'spell_frost_summonwaterelemental_2'},
			{id:84669,name:'Frost Specialization',icon:'spell_fire_bluefire'}
		],
		rating: [
			{id:76613,name:'Frostburn',description:'<!--sp76613:0-->All your spells deal 5% increased damage against Frozen targets.  Each point of Mastery increases damage by an additional 2.5%.<!--sp76613-->'}
		]
	},
	icon: 'spell_frost_frostbolt02',
	t: [
	{
		i: 9862,
		n: 'Early Frost',
		m: 2,
		s: [83049,83050],
		d: [
			'Reduces the cast time of your Frostbolt spell by 0.3 secs.  This effect becomes inactive for 15 sec after use.',
			'Reduces the cast time of your Frostbolt spell by 0.6 secs.  This effect becomes inactive for 15 sec after use.'
		],
		x: 0,
		y: 0
	},
	{
		i: 11157,
		n: 'Piercing Ice',
		m: 3,
		s: [11151,12952,12953],
		d: [
			'Increases the critical strike chance of your spells by 1%.',
			'Increases the critical strike chance of your spells by 2%.',
			'Increases the critical strike chance of your spells by 3%.'
		],
		j: [
			{holsplcritstrkpct:1,firsplcritstrkpct:1,natsplcritstrkpct:1,frosplcritstrkpct:1,shasplcritstrkpct:1,arcsplcritstrkpct:1},
			{holsplcritstrkpct:2,firsplcritstrkpct:2,natsplcritstrkpct:2,frosplcritstrkpct:2,shasplcritstrkpct:2,arcsplcritstrkpct:2},
			{holsplcritstrkpct:3,firsplcritstrkpct:3,natsplcritstrkpct:3,frosplcritstrkpct:3,shasplcritstrkpct:3,arcsplcritstrkpct:3}
		],
		x: 1,
		y: 0
	},
	{
		i: 11158,
		n: 'Shatter',
		m: 2,
		s: [11170,12982],
		d: [
			'Multiplies the critical strike chance of all your spells against frozen targets by 2, and increases the damage done by Frostbolt against frozen targets by 10%.',
			'Multiplies the critical strike chance of all your spells against frozen targets by 3, and increases the damage done by Frostbolt against frozen targets by 20%.'
		],
		x: 2,
		y: 0
	},
	{
		i: 9846,
		n: 'Ice Floes',
		m: 3,
		s: [31670,31672,55094],
		d: [
			'Reduces the cooldown of your Frost Nova, Cone of Cold, Ice Block, Cold Snap, Ice Barrier, and Icy Veins spells by 7%.',
			'Reduces the cooldown of your Frost Nova, Cone of Cold, Ice Block, Cold Snap, Ice Barrier, and Icy Veins spells by 14%.',
			'Reduces the cooldown of your Frost Nova, Cone of Cold, Ice Block, Cold Snap, Ice Barrier, and Icy Veins spells by 20%.'
		],
		x: 0,
		y: 1
	},
	{
		i: 11325,
		n: 'Improved Cone of Cold',
		m: 2,
		s: [11190,12489],
		d: [
			'Your Cone of Cold also freezes targets for 2 sec.',
			'Your Cone of Cold also freezes targets for 4 sec.'
		],
		x: 1,
		y: 1
	},
	{
		i: 11156,
		n: 'Piercing Chill',
		m: 2,
		s: [83156,83157],
		d: [
			'Your Frostbolt criticals apply the chill effect to 1 additional nearby targets.',
			'Your Frostbolt criticals apply the chill effect to 2 additional nearby targets.'
		],
		x: 2,
		y: 1
	},
	{
		i: 9854,
		n: 'Permafrost',
		m: 3,
		s: [11175,12569,12571],
		d: [
			'Your Chill effects reduce the target\'s speed by an additional 4%, and the target\'s healing received.  In addition, whenever you deal spell damage, your Water Elemental is healed for 5% of the amount dealt.',
			'Your Chill effects reduce the target\'s speed by an additional 7%, and the target\'s healing received.  In addition, whenever you deal spell damage, your Water Elemental is healed for 10% of the amount dealt.',
			'Your Chill effects reduce the target\'s speed by an additional 10%, and the target\'s healing received.  In addition, whenever you deal spell damage, your Water Elemental is healed for 15% of the amount dealt.'
		],
		x: 3,
		y: 1
	},
	{
		i: 9860,
		n: 'Ice Shards',
		m: 2,
		s: [11185,12487],
		d: [
			'Adds a chill effect to your Blizzard spell.  This effect lowers the target\'s movement speed by 25%.  Lasts 2 sec.  In addition, increases the range of your Ice Lance spell by 2 yards.',
			'Adds a chill effect to your Blizzard spell.  This effect lowers the target\'s movement speed by 40%.  Lasts 2 sec.  In addition, increases the range of your Ice Lance spell by 5 yards.'
		],
		x: 0,
		y: 2
	},
	{
		i: 9858,
		n: 'Icy Veins',
		m: 1,
		s: [12472],
		d: [
			'Hastens your spellcasting, increasing spell casting speed by 20% and reduces the pushback suffered from damaging attacks while casting by 100%.  Lasts 20 sec.'
		],
		t: ['3% of base mana<table width="100%"><tr><td>Instant</td><th>3 min cooldown</th></tr></table>'],
		x: 1,
		y: 2
	},
	{
		i: 9876,
		n: 'Fingers of Frost',
		m: 3,
		s: [44543,44545,83074],
		d: [
			'Gives your offensive Chill effects a 7% chance to grant you the Fingers of Frost effect, which causes your next Ice Lance or Deep Freeze spell to act as if your target were frozen and increases Ice Lance damage by 25%.  Fingers of Frost can accumulate up to 2 charges and lasts 15 sec.',
			'Gives your offensive Chill effects a 14% chance to grant you the Fingers of Frost effect, which causes your next Ice Lance or Deep Freeze spell to act as if your target were frozen and increases Ice Lance damage by 25%.  Fingers of Frost can accumulate up to 2 charges and lasts 15 sec.',
			'Gives your offensive Chill effects a 20% chance to grant you the Fingers of Frost effect, which causes your next Ice Lance or Deep Freeze spell to act as if your target were frozen and increases Ice Lance damage by 25%.  Fingers of Frost can accumulate up to 2 charges and lasts 15 sec.'
		],
		x: 2,
		y: 2
	},
	{
		i: 11371,
		n: 'Improved Freeze',
		m: 3,
		s: [86259,86260,86314],
		d: [
			'Gives your Water Elemental\'s Freeze spell a 33% chance to grant 2 charges of Fingers of Frost.',
			'Gives your Water Elemental\'s Freeze spell a 66% chance to grant 2 charges of Fingers of Frost.',
			'Gives your Water Elemental\'s Freeze spell a 100% chance to grant 2 charges of Fingers of Frost.'
		],
		x: 3,
		y: 2,
		r: [9,3]
	},
	{
		i: 9894,
		n: 'Enduring Winter',
		m: 3,
		s: [44561,86500,86508],
		d: [
			'Reduces the mana cost of all spells by 3%.  In addition, your Frostbolt spell has a 33% chance to grant up to 10 party or raid members mana regeneration equal to 1% of their maximum mana over 10 sec.',
			'Reduces the mana cost of all spells by 6%.  In addition, your Frostbolt spell has a 66% chance to grant up to 10 party or raid members mana regeneration equal to 1% of their maximum mana over 10 sec.',
			'Reduces the mana cost of all spells by 10%.  In addition, your Frostbolt spell has a 100% chance to grant up to 10 party or raid members mana regeneration equal to 1% of their maximum mana over 10 sec.'
		],
		x: 0,
		y: 3
	},
	{
		i: 9870,
		n: 'Cold Snap',
		m: 1,
		s: [11958],
		d: [
			'When activated, this spell finishes the cooldown on all Frost spells you recently cast.'
		],
		t: ['8 min cooldown'],
		x: 1,
		y: 3
	},
	{
		i: 9890,
		n: 'Brain Freeze',
		m: 3,
		s: [44546,44548,44549],
		d: [
			'Your spells no longer trigger Arcane Missiles.  Instead, your Frost damage spells with chilling effects have a 5% chance to cause your next Fireball or Frostfire Bolt spell to be instant cast and cost no mana.  When Frostfire Bolt is instant, it can benefit from Fingers of Frost.  Brain Freeze cannot be triggered by Frostfire Bolt.',
			'Your spells no longer trigger Arcane Missiles.  Instead, your Frost damage spells with chilling effects have a 10% chance to cause your next Fireball or Frostfire Bolt spell to be instant cast and cost no mana.  When Frostfire Bolt is instant, it can benefit from Fingers of Frost.  Brain Freeze cannot be triggered by Frostfire Bolt.',
			'Your spells no longer trigger Arcane Missiles.  Instead, your Frost damage spells with chilling effects have a 15% chance to cause your next Fireball or Frostfire Bolt spell to be instant cast and cost no mana.  When Frostfire Bolt is instant, it can benefit from Fingers of Frost.  Brain Freeze cannot be triggered by Frostfire Bolt.'
		],
		x: 2,
		y: 3
	},
	{
		i: 9880,
		n: 'Shattered Barrier',
		m: 2,
		s: [44745,54787],
		d: [
			'Gives your Ice Barrier spell a 100% chance to freeze all enemies within 10 yds for 2 sec when it is destroyed.',
			'Gives your Ice Barrier spell a 100% chance to freeze all enemies within 10 yds for 4 sec when it is destroyed.'
		],
		x: 0,
		y: 4,
		r: [15,1]
	},
	{
		i: 9882,
		n: 'Ice Barrier',
		m: 1,
		s: [11426],
		d: [
			'Instantly shields you, absorbing <!--sp63095:0-->((<!--pts1:1-->8069<!----> + $SPFR * 0.87))<!--sp63095--> damage.  Lasts 1 min.  While the shield holds, spellcasting will not be delayed by damage.'
		],
		t: ['21% of base mana<table width="100%"><tr><td>Instant</td><th>30 sec cooldown</th></tr></table><!--?11426:30:85:85:36:0:1000-->'],
		x: 1,
		y: 4
	},
	{
		i: 11373,
		n: 'Reactive Barrier',
		m: 2,
		s: [86303,86304],
		d: [
			'Gives the caster a 50% chance for the Ice Barrier spell to automatically cast with no mana cost upon taking damage that lowers the caster\'s life below 50%.  This effect obeys Ice Barrier\'s cooldown, and will trigger the cooldown when activated.',
			'Gives the caster a 100% chance for the Ice Barrier spell to automatically cast with no mana cost upon taking damage that lowers the caster\'s life below 50%.  This effect obeys Ice Barrier\'s cooldown, and will trigger the cooldown when activated.'
		],
		x: 2,
		y: 4,
		r: [15,1]
	},
	{
		i: 11169,
		n: 'Frostfire Orb',
		m: 2,
		s: [84726,84727],
		d: [
			'Converts your Flame Orb into a Frostfire Orb, causing your Frostfire Orb to benefit from your Frost Specialization.  In addition, reduces the speed of targets slowed by your Frostfire Bolt\'s chill effect by an additional 10%.',
			'Your Frostfire Orb gains a chill effect, slowing targets damaged by the Frostfire Orb by 40% for 4 sec.   In addition, reduces the speed of targets slowed by your Frostfire Bolt\'s chill effect by an additional 20%.'
		],
		x: 2,
		y: 5
	},
	{
		i: 9898,
		n: 'Deep Freeze',
		m: 1,
		s: [44572],
		d: [
			'Stuns the target for 5 sec.  Only usable on Frozen targets.  Deals <!--pts1:1-->1144<!---->*<!--sp31678:0--><!--sp31677:0--><!--sp31676:0--><!--sp31675:0--><!--sp31674:0-->1<!--sp31674--><!--sp31675--><!--sp31676--><!--sp31677--><!--sp31678-->*<!--sp12953:0--><!--sp12952:0--><!--sp11151:0-->1<!--sp11151--><!--sp12952--><!--sp12953--> to <!--pts1:2-->1432<!---->*<!--sp31678:0--><!--sp31677:0--><!--sp31676:0--><!--sp31675:0--><!--sp31674:0-->1<!--sp31674--><!--sp31675--><!--sp31676--><!--sp31677--><!--sp31678-->*<!--sp12953:0--><!--sp12952:0--><!--sp11151:0-->1<!--sp11151--><!--sp12952--><!--sp12953--> damage to targets that are permanently immune to stuns.'
		],
		t: ['<table width="100%"><tr><td>9% of base mana</td><th>35 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>30 sec cooldown</th></tr></table>'],
		x: 1,
		y: 6,
		r: [15,1]
	}
	]
}
]);