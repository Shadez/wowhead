$WowheadTalentCalculator.registerClass(1, [
{
	n: 'Arms',
	color: '#FFB81A',
	role: 8,
	mastery: {
		description: 'A battle-hardened master of two-handed weapons, using mobility and overpowering attacks to strike <his/her> opponents down.',
		spells: [
			{id:12294,name:'Mortal Strike',icon:'ability_warrior_savageblow'},
			{id:12296,name:'Anger Management',icon:'ability_warrior_endlessrage'},
			{id:12712,name:'Two-Handed Weapon Specialization',icon:'inv_axe_09'}
		],
		rating: [
			{id:76838,name:'Strikes of Opportunity',description:'<!--sp76838:0-->Grants a 17.6% chance for your melee attacks to instantly trigger an additional melee attack for 100% normal damage.  Each point of Mastery increases this chance by 2.2%.<!--sp76838-->'}
		]
	},
	icon: 'ability_warrior_savageblow',
	t: [
	{
		i: 10134,
		n: 'War Academy',
		m: 3,
		s: [84570,84571,84572],
		d: [
			'Increases the damage of Mortal Strike, Raging Blow, Devastate, Victory Rush and Slam by 5%.',
			'Increases the damage of Mortal Strike, Raging Blow, Devastate, Victory Rush and Slam by 10%.',
			'Increases the damage of Mortal Strike, Raging Blow, Devastate, Victory Rush and Slam by 15%.'
		],
		x: 0,
		y: 0
	},
	{
		i: 11163,
		n: 'Field Dressing',
		m: 2,
		s: [84579,84580],
		d: [
			'Increases all healing received by 3%, and the effectiveness of your self-healing abilities by an additional 10%.',
			'Increases all healing received by 6%, and the effectiveness of your self-healing abilities by an additional 20%.'
		],
		j: [
			{_healpct:3},
			{_healpct:6}
		],
		x: 1,
		y: 0
	},
	{
		i: 9664,
		n: 'Blitz',
		m: 2,
		s: [80976,80977],
		d: [
			'Your Charge generates 5 additional rage and stuns an additional nearby target.',
			'Your Charge generates 10 additional rage and stuns an additional 2 nearby targets.'
		],
		x: 2,
		y: 0
	},
	{
		i: 11416,
		n: 'Tactical Mastery',
		m: 2,
		s: [12295,12676],
		d: [
			'You retain up to an additional 25 rage when you change stances.',
			'You retain up to an additional 50 rage when you change stances.'
		],
		x: 0,
		y: 1
	},
	{
		i: 8190,
		n: 'Second Wind',
		m: 2,
		s: [29834,29838],
		d: [
			'Whenever you are struck by a Stun or Immobilize effect you generate 10 rage and 2% of your total health over 10 sec.',
			'Whenever you are struck by a Stun or Immobilize effect you generate 20 rage and 5% of your total health over 10 sec.'
		],
		x: 1,
		y: 1
	},
	{
		i: 8176,
		n: 'Deep Wounds',
		m: 3,
		s: [12834,12849,12867],
		d: [
			'Your critical strikes cause the opponent to bleed, dealing 16% of your melee weapon\'s average damage over 6 sec.',
			'Your critical strikes cause the opponent to bleed, dealing 32% of your melee weapon\'s average damage over 6 sec.',
			'Your critical strikes cause the opponent to bleed, dealing 48% of your melee weapon\'s average damage over 6 sec.'
		],
		x: 2,
		y: 1
	},
	{
		i: 8184,
		n: 'Drums of War',
		m: 2,
		s: [12290,12963],
		d: [
			'Reduces the rage cost of your Pummel, Demoralizing Shout, Intimidating Shout and Challenging Shout by 50%.',
			'Reduces the rage cost of your Pummel, Demoralizing Shout, Intimidating Shout and Challenging Shout by 100%.'
		],
		x: 3,
		y: 1
	},
	{
		i: 10138,
		n: 'Taste for Blood',
		m: 3,
		s: [56636,56637,56638],
		d: [
			'Increases your Overpower critical strike chance by 20%. In addition, whenever your Rend ability causes damage, you have a 33% chance of allowing the use of Overpower for 9 sec.  This effect will not occur more than once every 5 sec.',
			'Increases your Overpower critical strike chance by 40%. In addition, whenever your Rend ability causes damage, you have a 66% chance of allowing the use of Overpower for 9 sec.  This effect will not occur more than once every 5 sec.',
			'Increases your Overpower critical strike chance by 60%. In addition, whenever your Rend ability causes damage, you have a 100% chance of allowing the use of Overpower for 9 sec.  This effect will not occur more than once every 5 sec.'
		],
		x: 0,
		y: 2
	},
	{
		i: 8192,
		n: 'Sweeping Strikes',
		m: 1,
		s: [12328],
		d: [
			'Your melee attacks strike an additional nearby opponent.  Lasts 10 sec.'
		],
		t: ['30 Rage<table width="100%"><tr><td>Instant cast</td><th>1 min cooldown</th></tr></table>','Requires Battle Stance, Berserker Stance'],
		x: 1,
		y: 2
	},
	{
		i: 10741,
		n: 'Impale',
		m: 2,
		s: [16493,16494],
		d: [
			'Increases the critical strike damage bonus of Mortal Strike, Slam and Overpower by 10%.',
			'Increases the critical strike damage bonus of Mortal Strike, Slam and Overpower by 20%.'
		],
		x: 2,
		y: 2,
		r: [5,3]
	},
	{
		i: 11417,
		n: 'Improved Hamstring',
		m: 2,
		s: [12289,12668],
		d: [
			'When reapplying Hamstring, you immobilize the target for 5 sec. This effect cannot occur more than once every 60 sec.  In addition, reduces the global cooldown of your Hamstring by 0.2 sec.',
			'When reapplying Hamstring, you immobilize the target for 5 sec. This effect cannot occur more than once every 30 sec.  In addition, reduces the global cooldown of your Hamstring by 0 sec.'
		],
		x: 3,
		y: 2
	},
	{
		i: 11418,
		n: 'Improved Slam',
		m: 2,
		s: [86655,12330],
		d: [
			'Decreases the swing time of Slam by 0 sec and increases its damage by 10%.',
			'Decreases the swing time of Slam by 1 sec and increases its damage by 20%.'
		],
		x: 0,
		y: 3
	},
	{
		i: 11223,
		n: 'Deadly Calm',
		m: 1,
		s: [85730],
		d: [
			'For the next 10 sec, none of your abilities cost rage, but you continue to generate rage. Cannot be used during Inner Rage.'
		],
		t: ['2 min cooldown'],
		x: 1,
		y: 3
	},
	{
		i: 9662,
		n: 'Blood Frenzy',
		m: 2,
		s: [29836,29859],
		d: [
			'Your bleed effects cause targets to take an extra 2% physical damage. Applying a bleed effect increases bleed damage taken by the target by 15% for 1 min. In addition, your autoattacks have a 5% chance to generate 20 additional rage.',
			'Your bleed effects cause targets to take an extra 4% physical damage. Applying a bleed effect increases bleed damage taken by the target by 30% for 1 min. In addition, your autoattacks have a 10% chance to generate 20 additional rage.'
		],
		x: 2,
		y: 3
	},
	{
		i: 10520,
		n: 'Lambs to the Slaughter',
		m: 3,
		s: [84583,84587,84588],
		d: [
			'Your Mortal Strike causes the Slaughter effect, which refreshes the duration of Rend on the target and increases the damage of your Execute, Overpower, Slam and Mortal Strike by 10%.  Lasts 15 sec.',
			'Your Mortal Strike causes the Slaughter effect, which refreshes the duration of Rend on the target and increases the damage of your Execute, Overpower, Slam and Mortal Strike by 10%.  Lasts 15 sec.  Stacks up to 2 times.',
			'Your Mortal Strike causes the Slaughter effect, which refreshes the duration of Rend on the target and increases the damage of your Execute, Overpower, Slam and Mortal Strike by 10%.  Lasts 15 sec.  Stacks up to 3 times.'
		],
		x: 0,
		y: 4
	},
	{
		i: 8208,
		n: 'Juggernaut',
		m: 1,
		s: [64976],
		d: [
			'Your Charge ability is now usable while in combat and in all stances, and the cooldown of your Charge is reduced by 2 sec.  Following a Charge, your next Slam or Mortal Strike has an additional 25% chance to critically hit if used within 10 sec.  However, Charge and Intercept now share a cooldown.'
		],
		x: 1,
		y: 4
	},
	{
		i: 8214,
		n: 'Sudden Death',
		m: 2,
		s: [29723,29725],
		d: [
			'Your melee hits have a 3% chance of resetting the cooldown on your Colossus Smash, and you keep 5 rage after using Execute.',
			'Your melee hits have a 6% chance of resetting the cooldown on your Colossus Smash, and you keep 10 rage after using Execute.'
		],
		x: 3,
		y: 4
	},
	{
		i: 8194,
		n: 'Wrecking Crew',
		m: 2,
		s: [46867,56611],
		d: [
			'Your Mortal Strike critical hits have a 50% chance to Enrage you, increasing all damage caused by 5% for 12 sec.',
			'Your Mortal Strike critical hits have a 100% chance to Enrage you, increasing all damage caused by 10% for 12 sec.'
		],
		x: 0,
		y: 5
	},
	{
		i: 11167,
		n: 'Throwdown',
		m: 1,
		s: [85388],
		d: [
			'Knocks the target to the ground and stuns it for 5 sec.'
		],
		t: ['<table width="100%"><tr><td>15 Rage</td><th>Melee Range</th></tr></table><table width="100%"><tr><td>Instant cast</td><th>45 sec cooldown</th></tr></table>','Requires Melee Weapon<br />Requires Battle Stance'],
		x: 2,
		y: 5,
		r: [15,1]
	},
	{
		i: 8222,
		n: 'Bladestorm',
		m: 1,
		s: [46924],
		d: [
			'You become a whirling storm of destructive force, instantly striking all nearby targets for 150% weapon damage and continuing to perform a whirlwind attack every 1 sec for 6 sec.  While under the effects of Bladestorm, you do not feel pity or remorse or fear and you cannot be stopped unless killed or disarmed, but you cannot perform any other abilities.'
		],
		t: ['25 Rage<table width="100%"><tr><td>Instant cast</td><th>1.5 min cooldown</th></tr></table>','Requires Melee Weapon'],
		x: 1,
		y: 6,
		r: [15,1]
	}
	]
},
{
	n: 'Fury',
	color: '#FF0000',
	role: 8,
	mastery: {
		description: 'A furious berserker wielding a weapon in each hand, unleashing a flurry of attacks to carve <his/her> opponents to pieces.',
		spells: [
			{id:23881,name:'Bloodthirst',icon:'spell_nature_bloodlust'},
			{id:23588,name:'Dual Wield Specialization',icon:'ability_dualwield'},
			{id:29592,name:'Precision',icon:'ability_marksmanship'}
		],
		rating: [
			{id:76856,name:'Unshackled Fury',description:'<!--sp76856:0-->Increases the benefit of abilities that cause or require you to be enraged by 11.2%. Each point of Mastery increases enrage effects by an additional 5.60%.<!--sp76856-->'}
		]
	},
	icon: 'ability_warrior_innerrage',
	t: [
	{
		i: 9610,
		n: 'Blood Craze',
		m: 3,
		s: [16487,16489,16492],
		d: [
			'After taking any damage, you have a 10% chance to regenerate 1% of your total health over 5 sec.',
			'After taking any damage, you have a 10% chance to regenerate 2% of your total Health over 5 sec.',
			'After taking any damage, you have a 10% chance to regenerate 3% of your total Health over 5 sec.'
		],
		x: 0,
		y: 0
	},
	{
		i: 9606,
		n: 'Battle Trance',
		m: 3,
		s: [12322,85741,85742],
		d: [
			'Your Bloodthirst, Mortal Strike and Shield Slam hits have a 5% chance to make your next special attack that costs more than 5 rage consume no rage.',
			'Your Bloodthirst, Mortal Strike and Shield Slam hits have a 10% chance to make your next special attack that costs more than 5 rage consume no rage.',
			'Your Bloodthirst, Mortal Strike and Shield Slam hits have a 15% chance to make your next special attack that costs more than 5 rage consume no rage.'
		],
		x: 1,
		y: 0
	},
	{
		i: 9608,
		n: 'Cruelty',
		m: 2,
		s: [12320,12852],
		d: [
			'Increases the critical strike chance of Bloodthirst, Mortal Strike and Shield Slam by 5%.',
			'Increases the critical strike chance of Bloodthirst, Mortal Strike and Shield Slam by 10%.'
		],
		x: 2,
		y: 0
	},
	{
		i: 9644,
		n: 'Executioner',
		m: 2,
		s: [20502,20503],
		d: [
			'Your Execute hits have a 50% chance to improve your melee attack speed by 5% for 9 sec.  This effect stacks up to 5 times.',
			'Your Execute hits have a 100% chance to improve your melee attack speed by 5% for 9 sec.  This effect stacks up to 5 times.'
		],
		x: 0,
		y: 1
	},
	{
		i: 9624,
		n: 'Booming Voice',
		m: 2,
		s: [12321,12835],
		d: [
			'Reduces the cooldown of your Battle Shout and Commanding Shout by 15 sec and causes those abilities to generate 5 additional Rage.',
			'Reduces the cooldown of your Battle Shout and Commanding Shout by 30 sec and causes those abilities to generate 10 additional Rage.'
		],
		x: 1,
		y: 1
	},
	{
		i: 11415,
		n: 'Rude Interruption',
		m: 2,
		s: [61216,61221],
		d: [
			'Successfully interrupting a spell with Pummel increases your damage by 5% for 15 sec.',
			'Successfully interrupting a spell with Pummel increases your damage by 5% for 30 sec.'
		],
		x: 2,
		y: 1
	},
	{
		i: 9618,
		n: 'Piercing Howl',
		m: 1,
		s: [12323],
		d: [
			'Causes all enemies within 10 yards to be Dazed, reducing movement speed by 50% for 6 sec.'
		],
		t: ['10 Rage<br />Instant cast'],
		x: 3,
		y: 1
	},
	{
		i: 9636,
		n: 'Flurry',
		m: 3,
		s: [12319,12971,12972],
		d: [
			'Increases your attack speed by 8% for your next 3 swings after dealing a melee critical strike.',
			'Increases your attack speed by 16% for your next 3 swings after dealing a melee critical strike.',
			'Increases your attack speed by 25% for your next 3 swings after dealing a melee critical strike.'
		],
		x: 0,
		y: 2
	},
	{
		i: 9630,
		n: 'Death Wish',
		m: 1,
		s: [12292],
		d: [
			'When activated you become Enraged, increasing your physical damage by 20%<!--sp94374:0--> but increasing all damage taken by 5%<!--sp94374-->.  Lasts 30 sec.'
		],
		t: ['10 Rage<table width="100%"><tr><td>Instant cast</td><th>3 min cooldown</th></tr></table>'],
		x: 1,
		y: 2
	},
	{
		i: 9612,
		n: 'Enrage',
		m: 3,
		s: [12317,13045,13046],
		d: [
			'Your melee hits have a 3% chance to Enrage you, giving you a 3% damage bonus for 9 sec.',
			'Your melee hits have a 6% chance to Enrage you,  giving you a 7% damage bonus for 9 sec.',
			'Your melee hits have a 9% chance to Enrage you, giving you a 10% damage bonus for 9 sec.'
		],
		x: 2,
		y: 2
	},
	{
		i: 11414,
		n: 'Die by the Sword',
		m: 2,
		s: [81913,81914],
		d: [
			'Increases your parry chance by 100% for 4 sec whenever you are brought to 20% health or less.  This effect cannot occur more often than once every 2 min.',
			'Increases your parry chance by 100% for 8 sec whenever you are brought to 20% health or less.  This effect cannot occur more often than once every 2 min.'
		],
		x: 0,
		y: 3
	},
	{
		i: 11208,
		n: 'Raging Blow',
		m: 1,
		s: [85288],
		d: [
			'A mighty blow that deals <!--ppl39:80:72:68-->100% weapon damage from both melee weapons.  Can only be used while Enraged.'
		],
		t: ['<table width="100%"><tr><td>20 Rage</td><th>Melee Range</th></tr></table><table width="100%"><tr><td>Instant cast</td><th>6 sec cooldown</th></tr></table>','Requires Melee Weapon<br />Requires Berserker Stance'],
		x: 1,
		y: 3,
		r: [8,1]
	},
	{
		i: 9650,
		n: 'Rampage',
		m: 1,
		s: [29801],
		d: [
			'Increases the critical strike chance of all party and raid members within 100 yds by 5%.  In addition, improves your critical strike chance by an additional 2%.'
		],
		j: [
			{mlecritstrkpct:2,rgdcritstrkpct:2,mlecritstrkpct:5,rgdcritstrkpct:5,holsplcritstrkpct:5,firsplcritstrkpct:5,natsplcritstrkpct:5,frosplcritstrkpct:5,shasplcritstrkpct:5,arcsplcritstrkpct:5}
		],
		x: 2,
		y: 3,
		r: [11,1]
	},
	{
		i: 9648,
		n: 'Heroic Fury',
		m: 1,
		s: [60970],
		d: [
			'Removes any Immobilization effects and refreshes the cooldown of your Intercept ability.'
		],
		t: ['30 sec cooldown'],
		x: 3,
		y: 3
	},
	{
		i: 9634,
		n: 'Furious Attacks',
		m: 1,
		s: [46910],
		d: [
			'Your autoattacks have a chance to reduce all healing done to the target by 10% for 10 sec.'
		],
		x: 0,
		y: 4
	},
	{
		i: 9642,
		n: 'Meat Cleaver',
		m: 2,
		s: [12329,12950],
		d: [
			'Dealing damage with Cleave or Whirlwind increases the damage of Cleave and Whirlwind by 5% for 10 sec.  This effect stacks up to 3 times.',
			'Dealing damage with Cleave or Whirlwind increases the damage of Cleave and Whirlwind by 10% for 10 sec.  This effect stacks up to 3 times.'
		],
		x: 2,
		y: 4
	},
	{
		i: 10743,
		n: 'Intensify Rage',
		m: 2,
		s: [46908,46909],
		d: [
			'Reduces the cooldown of your Berserker Rage, Recklessness and Death Wish abilities by 10%.',
			'Reduces the cooldown of your Berserker Rage, Recklessness and Death Wish abilities by 20%.'
		],
		x: 3,
		y: 4
	},
	{
		i: 9654,
		n: 'Bloodsurge',
		m: 3,
		s: [46913,46914,46915],
		d: [
			'Your Bloodthirst hits have a 10% chance of making your next Slam instant, free, and deal 20% more damage for 10 sec.',
			'Your Bloodthirst hits have a 20% chance of making your next Slam instant, free, and deal 20% more damage for 10 sec.',
			'Your Bloodthirst hits have a 30% chance of making your next Slam instant, free, and deal 20% more damage for 10 sec.'
		],
		x: 1,
		y: 5,
		r: [11,1]
	},
	{
		i: 10744,
		n: 'Skirmisher',
		m: 2,
		s: [29888,29889],
		d: [
			'Reduces the cooldown of your Intercept by 5 sec and your Heroic Leap by 10 sec.',
			'Reduces the cooldown of your Intercept by 10 sec and your Heroic Leap by 20 sec.'
		],
		x: 2,
		y: 5
	},
	{
		i: 9658,
		n: 'Titan\'s Grip',
		m: 1,
		s: [46917],
		d: [
			'Allows you to equip two-handed axes, maces and swords in one hand.'
		],
		x: 1,
		y: 6
	},
	{
		i: 9660,
		n: 'Single-Minded Fury',
		m: 1,
		s: [81099],
		d: [
			'When you dual-wield one-handed weapons, you deal 20% additional damage and Slam hits with both weapons.'
		],
		j: [
			{mledmgpct:[20,'forClass',[2,43153,1]],holdmgpct:[20,'forClass',[2,43153,1]],firdmgpct:[20,'forClass',[2,43153,1]],natdmgpct:[20,'forClass',[2,43153,1]],frodmgpct:[20,'forClass',[2,43153,1]],shadmgpct:[20,'forClass',[2,43153,1]],arcdmgpct:[20,'forClass',[2,43153,1]]}
		],
		x: 2,
		y: 6
	}
	]
},
{
	n: 'Protection',
	color: '#4D80FF',
	role: 2,
	mastery: {
		description: 'A stalwart protector who uses a shield to safeguard <himself/herself> and <his/her> allies.',
		spells: [
			{id:23922,name:'Shield Slam',icon:'inv_shield_05'},
			{id:29144,name:'Sentinel',icon:'inv_helmet_21'},
			{id:93098,name:'Vengeance',icon:'ability_paladin_shieldofvengeance'}
		],
		rating: [
			{id:76857,name:'Critical Block',description:'<!--sp76857:0-->Increases your chance to block by 12% and your chance to critically block by 12%.  Each point of Mastery increases your block chance by an additional 1.5% and your critical block chance by an additional 1.5%.<!--sp76857-->'}
		]
	},
	icon: 'ability_warrior_defensivestance',
	t: [
	{
		i: 10464,
		n: 'Incite',
		m: 3,
		s: [50685,50686,50687],
		d: [
			'Increases the critical strike chance of your Heroic Strike by 5%, and gives your Heroic Strike criticals a 33% chance to cause the next Heroic Strike to also be a critical strike.  These guaranteed criticals cannot re-trigger the Incite effect.',
			'Increases the critical strike chance of your Heroic Strike by 10%, and gives your Heroic Strike criticals a 66% chance to cause the next Heroic Strike to also be a critical strike.  These guaranteed criticals cannot re-trigger the Incite effect.',
			'Increases the critical strike chance of your Heroic Strike by 15%, and gives your Heroic Strike criticals a 100% chance to cause the next Heroic Strike to also be a critical strike.  These guaranteed criticals cannot re-trigger the Incite effect.'
		],
		x: 0,
		y: 0
	},
	{
		i: 10474,
		n: 'Toughness',
		m: 3,
		s: [12299,12761,12762],
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
		y: 0
	},
	{
		i: 10480,
		n: 'Blood and Thunder',
		m: 2,
		s: [84614,84615],
		d: [
			'When you Thunder Clap a target affected by your Rend, you have a 50% chance to affect every target with Rend.',
			'When you Thunder Clap a target affected by your Rend, you have a 100% chance to affect every target with Rend.'
		],
		x: 2,
		y: 0
	},
	{
		i: 10466,
		n: 'Shield Specialization',
		m: 3,
		s: [12298,12724,12725],
		d: [
			'You generate 5 extra rage when you block an attack. You generate 20 extra rage when you Spell Reflect a magic attack.',
			'You generate 10 extra rage when you block an attack. You generate 40 extra rage when you Spell Reflect a magic attack.',
			'You generate 15 extra rage when you block an attack. You generate 60 extra rage when you Spell Reflect a magic attack.'
		],
		x: 0,
		y: 1
	},
	{
		i: 10472,
		n: 'Shield Mastery',
		m: 3,
		s: [29598,84607,84608],
		d: [
			'Reduces the cooldown of your Shield Block by 10 sec, your Shield Wall by 60 sec and causes your Shield Block to also reduce magic damage taken by 7% for 6 sec.',
			'Reduces the cooldown of your Shield Block by 20 sec, your Shield Wall by 120 sec and causes your Shield Block to also reduce magic damage taken by 14% for 6 sec.',
			'Reduces the cooldown of your Shield Block by 30 sec, your Shield Wall by 180 sec and causes your Shield Block to also reduce magic damage taken by 20% for 6 sec.'
		],
		x: 1,
		y: 1
	},
	{
		i: 11170,
		n: 'Hold the Line',
		m: 2,
		s: [84604,84621],
		d: [
			'Improves your critical strike and critical block chance by 10% for 5 sec following a successful parry.',
			'Improves your critical strike and critical block chance by 10% for 10 sec following a successful parry.'
		],
		x: 2,
		y: 1
	},
	{
		i: 10468,
		n: 'Gag Order',
		m: 2,
		s: [12311,12958],
		d: [
			'Gives your Pummel and Heroic Throw a 50% chance to silence the target for 3 sec.  Also lowers the cooldown on Heroic Throw by 15 sec.',
			'Gives your Pummel and Heroic Throw a 100% chance to silence the target for 3 sec.  Also lowers the cooldown on Heroic Throw by 30 sec.'
		],
		x: 3,
		y: 1
	},
	{
		i: 10482,
		n: 'Last Stand',
		m: 1,
		s: [12975],
		d: [
			'Temporarily grants you 30% of your maximum health for 20 sec.  After the effect expires, the health is lost.'
		],
		t: ['3 min cooldown'],
		x: 0,
		y: 2
	},
	{
		i: 10478,
		n: 'Concussion Blow',
		m: 1,
		s: [12809],
		d: [
			'Stuns the opponent for 5 sec and deals (75 / 100 * <span class="w"> AP</span>) damage (based on attack power).'
		],
		t: ['<table width="100%"><tr><td>15 Rage</td><th>Melee Range</th></tr></table><table width="100%"><tr><td>Instant cast</td><th>30 sec cooldown</th></tr></table>','Requires Melee Weapon'],
		x: 1,
		y: 2
	},
	{
		i: 10934,
		n: 'Bastion of Defense',
		m: 2,
		s: [29593,29594],
		d: [
			'Reduces the chance you\'ll be critically hit by melee attacks by 3% while in Defensive Stance. In addition, when you block, dodge or parry an attack you have a 10% chance to become Enraged, increasing physical damage done by 5% for 12 sec.',
			'Reduces the chance you\'ll be critically hit by melee attacks by 6% while in Defensive Stance.  In addition, when you block, dodge or parry an attack you have a 20% chance to become Enraged, increasing physical damage done by 10% for 12 sec.'
		],
		j: [
			{_mlecritstrkpct:[-3,'forStance','131072']},
			{_mlecritstrkpct:[-6,'forStance','131072']}
		],
		x: 2,
		y: 2
	},
	{
		i: 10494,
		n: 'Warbringer',
		m: 1,
		s: [57499],
		d: [
			'Your Charge, Intercept and Intervene abilities are now usable while in combat and in any stance.  In addition, your Intervene ability will remove all movement impairing effects.'
		],
		x: 3,
		y: 2
	},
	{
		i: 10470,
		n: 'Improved Revenge',
		m: 2,
		s: [12797,12799],
		d: [
			'Increases the damage of your Revenge ability by 30% and causes Revenge to strike an additional target for 50% damage.',
			'Increases the damage of your Revenge ability by 60% and causes Revenge to strike an additional target.'
		],
		x: 0,
		y: 3
	},
	{
		i: 10486,
		n: 'Devastate',
		m: 1,
		s: [20243],
		d: [
			'Sunder the target\'s armor causing the Sunder Armor effect.  In addition, causes <!--ppl39:80:109:100-->150% of weapon damage plus <!--pts2-->854<!----> for each application of Sunder Armor on the target.  The Sunder Armor effect can stack up to 3 times.'
		],
		t: ['<table width="100%"><tr><td>15 Rage</td><th>Melee Range</th></tr></table>Instant cast<!--?20243:25:85:85:135:0:1000-->','Requires Shields'],
		x: 2,
		y: 3
	},
	{
		i: 11217,
		n: 'Impending Victory',
		m: 2,
		s: [80128,80129],
		d: [
			'Using Devastate on a target with 20% or less health has a 25% chance to allow the use of Victory Rush but that Victory Rush only heals for 5% of your health.',
			'Using Devastate on a target with 20% or less health has a 50% chance to allow the use of Victory Rush but that Victory Rush only heals for 5% of your health.'
		],
		x: 3,
		y: 3,
		r: [12,1]
	},
	{
		i: 10488,
		n: 'Thunderstruck',
		m: 2,
		s: [80979,80980],
		d: [
			'Improves the damage of your Rend, Cleave and Thunder Clap by 3%.  In addition, your Thunder Clap improves the damage of your next Shockwave by 5%.  Stacks up to 3 times.',
			'Improves the damage of your Rend, Cleave and Thunder Clap by 6%.  In addition, your Thunder Clap improves the damage of your next Shockwave by 10%.  Stacks up to 3 times.'
		],
		x: 0,
		y: 4
	},
	{
		i: 10492,
		n: 'Vigilance',
		m: 1,
		s: [50720],
		d: [
			'Focus your protective gaze on a party or raid member.  Each time they are hit by an attack, your Taunt cooldown is refreshed and you gain Vengeance as if 20% of the damage was done to you.  Lasts 30 min.  This effect can only be on one target at a time.'
		],
		t: ['30 yd range'],
		x: 1,
		y: 4,
		r: [8,1]
	},
	{
		i: 10484,
		n: 'Heavy Repercussions',
		m: 2,
		s: [86894,86896],
		d: [
			'While your Shield Block is active, your Shield Slam hits for an additional 50% damage.',
			'While your Shield Block is active, your Shield Slam hits for an additional 100% damage.'
		],
		x: 3,
		y: 4
	},
	{
		i: 10490,
		n: 'Safeguard',
		m: 2,
		s: [46945,46949],
		d: [
			'Reduces damage taken by the target of your Intervene ability by 15% for 6 sec.',
			'Reduces damage taken by the target of your Intervene ability by 30% for 6 sec.'
		],
		x: 1,
		y: 5
	},
	{
		i: 10496,
		n: 'Sword and Board',
		m: 3,
		s: [46951,46952,46953],
		d: [
			'Increases the critical strike chance of Devastate by 5%.  In addition, when your Devastate or Revenge deal damage, they have a 10% chance of refreshing the cooldown of your Shield Slam and reducing its cost by 100% for 5 sec.',
			'Increases the critical strike chance of Devastate by 10%.  In addition, when your Devastate or Revenge deal damage, they have a 20% chance of refreshing the cooldown of your Shield Slam and reducing its cost by 100% for 5 sec.',
			'Increases the critical strike chance of Devastate by 15%.  In addition, when your Devastate or Revenge deal damage, they have a 30% chance of refreshing the cooldown of your Shield Slam and reducing its cost by 100% for 5 sec.'
		],
		x: 2,
		y: 5,
		r: [12,1]
	},
	{
		i: 10498,
		n: 'Shockwave',
		m: 1,
		s: [46968],
		d: [
			'Sends a wave of force in front of you, causing (75 / 100 * <span class="w"> AP</span>) damage (based on attack power) and stunning all enemy targets within 10 yards in a frontal cone for 4 sec.'
		],
		t: ['15 Rage<table width="100%"><tr><td>Instant cast</td><th>20 sec cooldown</th></tr></table>'],
		x: 1,
		y: 6
	}
	]
}
]);