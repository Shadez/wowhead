$WowheadTalentCalculator.registerClass(3, [
{
	n: 'Beast Mastery',
	color: '#4D00FF',
	role: 8,
	mastery: {
		description: 'A master of the wild who can tame a wide variety of beasts to assist <him/her> in combat.',
		spells: [
			{id:19577,name:'Intimidation',icon:'ability_devour'},
			{id:87325,name:'Animal Handler',icon:'ability_hunter_animalhandler'}
		],
		rating: [
			{id:76657,name:'Master of Beasts',description:'<!--sp76657:0-->Increases the damage done by your pets by 13.6%.  Each point of Mastery increases pet damage by an additional 1.7%.<!--sp76657-->'}
		]
	},
	icon: 'ability_hunter_bestialdiscipline',
	t: [
	{
		i: 9494,
		n: 'Improved Kill Command',
		m: 2,
		s: [35029,35030],
		d: [
			'Increases the critical strike chance of your Kill Command by 5%.',
			'Increases the critical strike chance of your Kill Command by 10%.'
		],
		x: 0,
		y: 0
	},
	{
		i: 9490,
		n: 'One with Nature',
		m: 3,
		s: [82682,82683,82684],
		d: [
			'Increases the attack power bonus of your Aspect of the Hawk by 10%, and increases the amount of focus restored by your Aspect of the Fox by 1.',
			'Increases the attack power bonus of your Aspect of the Hawk by 20%, and increases the amount of focus restored by your Aspect of the Fox by 2.',
			'Increases the attack power bonus of your Aspect of the Hawk by 30%, and increases the amount of focus restored by your Aspect of the Fox by 3.'
		],
		x: 1,
		y: 0
	},
	{
		i: 9492,
		n: 'Bestial Discipline',
		m: 3,
		s: [19590,19592,82687],
		d: [
			'Increases the Focus regeneration of your pets by 10%.',
			'Increases the Focus regeneration of your pets by 20%.',
			'Increases the Focus regeneration of your pets by 30%.'
		],
		x: 2,
		y: 0
	},
	{
		i: 9502,
		n: 'Pathfinding',
		m: 2,
		s: [19559,19560],
		d: [
			'Increases the speed bonus of your Aspect of the Cheetah and Aspect of the Pack by 4%, and increases your speed while mounted by 5%. The mounted movement speed increase does not stack with other effects.',
			'Increases the speed bonus of your Aspect of the Cheetah and Aspect of the Pack by 8%, and increases your speed while mounted by 10%. The mounted movement speed increase does not stack with other effects.'
		],
		x: 0,
		y: 1
	},
	{
		i: 9514,
		n: 'Spirit Bond',
		m: 2,
		s: [19578,20895],
		d: [
			'While your pet is active, you and your pet will regenerate 1% of total health every 10 sec., and increases healing done to you and your pet by 5%.',
			'While your pet is active, you and your pet will regenerate 2% of total health every 10 sec., and increases healing done to you and your pet by 10%.'
		],
		x: 1,
		y: 1
	},
	{
		i: 9512,
		n: 'Frenzy',
		m: 3,
		s: [19621,19622,19623],
		d: [
			'Your pet gains 2% attack speed after attacking with a Basic Attack, lasting for 10 sec and stacking up to 5 times.',
			'Your pet gains 4% attack speed after attacking with a Basic Attack, lasting for 10 sec and stacking up to 5 times.',
			'Your pet gains 6% attack speed after attacking with a Basic Attack, lasting for 10 sec and stacking up to 5 times.'
		],
		x: 2,
		y: 1
	},
	{
		i: 9510,
		n: 'Improved Mend Pet',
		m: 2,
		s: [19572,19573],
		d: [
			'Gives the Mend Pet ability a 25% chance of cleansing 1 Curse, Disease, Magic or Poison effect from the pet each tick.',
			'Gives the Mend Pet ability a 50% chance of cleansing 1 Curse, Disease, Magic or Poison effect from the pet each tick.'
		],
		x: 3,
		y: 1
	},
	{
		i: 9530,
		n: 'Cobra Strikes',
		m: 3,
		s: [53256,53259,53260],
		d: [
			'You have a 5% chance when you hit with Arcane Shot to cause your pet\'s next 2 Basic Attacks to critically hit.',
			'You have a 10% chance when you hit with Arcane Shot to cause your pet\'s next 2 Basic Attacks to critically hit.',
			'You have a 15% chance when you hit with Arcane Shot to cause your pet\'s next 2 Basic Attacks to critically hit.'
		],
		x: 0,
		y: 2
	},
	{
		i: 9504,
		n: 'Fervor',
		m: 1,
		s: [82726],
		d: [
			'Instantly restores 50 Focus to you and your pet.'
		],
		t: ['2 min cooldown'],
		x: 1,
		y: 2
	},
	{
		i: 9520,
		n: 'Focus Fire',
		m: 1,
		s: [82692],
		d: [
			'Consumes your pet\'s Frenzy Effect stack, restoring 4 Focus to your pet and increasing your ranged haste by 3% for each Frenzy Effect stack consumed. Lasts for 15 sec.'
		],
		t: ['15 sec cooldown'],
		x: 2,
		y: 2,
		r: [5,3]
	},
	{
		i: 9534,
		n: 'Longevity',
		m: 3,
		s: [53262,53263,53264],
		d: [
			'Reduces the cooldown of your Bestial Wrath, Intimidation and Pet Special Abilities by 10%.',
			'Reduces the cooldown of your Bestial Wrath, Intimidation and Pet Special Abilities by 20%.',
			'Reduces the cooldown of your Bestial Wrath, Intimidation and Pet Special Abilities by 30%.'
		],
		x: 0,
		y: 3
	},
	{
		i: 9528,
		n: 'Killing Streak',
		m: 2,
		s: [82748,82749],
		d: [
			'When you score two Kill Command critical hits in a row, your third will deal 10% more damage and have its cost reduced by 5 focus.',
			'When you score two Kill Command critical hits in a row, your third will deal 20% more damage and have its cost reduced by 10 focus.'
		],
		x: 2,
		y: 3
	},
	{
		i: 11714,
		n: 'Crouching Tiger, Hidden Chimera',
		m: 2,
		s: [82898,82899],
		d: [
			'Whenever you are hit by a melee attack, the cooldown of your Disengage is instantly reduced by 2 sec.<br /><br />Whenever you are hit by a ranged attack or spell, the cooldown of your Deterrence is instantly reduced by 4 sec.<br /><br />These effects have a 2 sec cooldown.',
			'Whenever you are hit by a melee attack, the cooldown of your Disengage is instantly reduced by 4 sec.<br /><br />Whenever you are hit by a ranged attack or spell, the cooldown of your Deterrence is instantly reduced by 8 sec.<br /><br />These effects have a 2 sec cooldown.'
		],
		x: 0,
		y: 4
	},
	{
		i: 9524,
		n: 'Bestial Wrath',
		m: 1,
		s: [19574],
		d: [
			'Send your pet into a rage causing 20% additional damage for 10 sec.  The beast does not feel pity or remorse or fear and it cannot be stopped unless killed.'
		],
		t: ['100 yd range<br />2 min cooldown'],
		x: 1,
		y: 4,
		r: [8,1]
	},
	{
		i: 9518,
		n: 'Ferocious Inspiration',
		m: 1,
		s: [34460],
		d: [
			'All party and raid members have all damage increased by 3% within 100 yards of your pet.'
		],
		x: 2,
		y: 4
	},
	{
		i: 9538,
		n: 'Kindred Spirits',
		m: 2,
		s: [56314,56315],
		d: [
			'Increases you and your pets maximum focus by 5.',
			'Increases you and your pets maximum focus by 10.'
		],
		j: [
			{mana:5},
			{mana:10}
		],
		x: 0,
		y: 5
	},
	{
		i: 9536,
		n: 'The Beast Within',
		m: 1,
		s: [34692],
		d: [
			'While your pet is under the effects of Bestial Wrath, you also go into a rage causing 10% additional damage and reducing the focus cost of all shots and abilities by 50% for 10 sec.'
		],
		x: 1,
		y: 5,
		r: [13,1]
	},
	{
		i: 9522,
		n: 'Invigoration',
		m: 2,
		s: [53252,53253],
		d: [
			'When your pet scores a critical hit with a Basic Attack, you instantly regenerate 3 focus.',
			'When your pet scores a critical hit with a Basic Attack, you instantly regenerate 6 focus.'
		],
		x: 2,
		y: 5,
		r: [14,1]
	},
	{
		i: 9542,
		n: 'Beast Mastery',
		m: 1,
		s: [53270],
		d: [
			'You master the art of Beast training, teaching you the ability to tame Exotic pets and increasing your total amount of Pet Skill Points by 4.'
		],
		x: 1,
		y: 6
	}
	]
},
{
	n: 'Marksmanship',
	color: '#CC33CC',
	role: 8,
	mastery: {
		description: 'A master archer or sharpshooter who excels in bringing down enemies from afar.',
		spells: [
			{id:19434,name:'Aimed Shot',icon:'inv_spear_07'},
			{id:87326,name:'Artisan Quiver',icon:'inv_misc_quiver_06'}
		],
		rating: [
			{id:76659,name:'Wild Quiver',description:'<!--sp76659:0-->Grants a 14.4% chance for your ranged attacks to also instantly fire an additional ranged shot.  Each point of Mastery increases the chance by an additional 1.8%.<!--sp76659-->'}
		]
	},
	icon: 'ability_hunter_focusedaim',
	t: [
	{
		i: 9390,
		n: 'Go for the Throat',
		m: 2,
		s: [34950,34954],
		d: [
			'Your ranged auto-shot critical hits cause your pet to generate 5 Focus.',
			'Your ranged auto-shot critical hits cause your pet to generate 10 Focus.'
		],
		x: 0,
		y: 0
	},
	{
		i: 9380,
		n: 'Efficiency',
		m: 3,
		s: [19416,19417,19418],
		d: [
			'Reduces the focus cost of your Arcane Shot by 1, and your Explosive Shot and Chimera Shot by 2.',
			'Reduces the focus cost of your Arcane Shot by 2, and your Explosive Shot and Chimera Shot by 4.',
			'Reduces the focus cost of your Arcane Shot by 3, and your Explosive Shot and Chimera Shot by 6.'
		],
		x: 1,
		y: 0
	},
	{
		i: 9378,
		n: 'Rapid Killing',
		m: 2,
		s: [34948,34949],
		d: [
			'After killing an opponent that yields experience or honor, your next Aimed Shot, Steady Shot or Cobra Shot causes 10% additional damage.  Lasts 20 sec.',
			'After killing an opponent that yields experience or honor, your next Aimed Shot, Steady Shot or Cobra Shot causes 20% additional damage.  Lasts 20 sec.'
		],
		x: 2,
		y: 0
	},
	{
		i: 9396,
		n: 'Sic \'Em!',
		m: 2,
		s: [83340,83356],
		d: [
			'When you critically hit with your Arcane Shot, Aimed Shot or Explosive Shot the focus cost of your Pet\'s next basic attack is reduced by 50% for 12 sec.',
			'When you critically hit with your Arcane Shot, Aimed Shot or Explosive Shot the focus cost of your Pet\'s next basic attack is reduced by 100% for 12 sec.'
		],
		x: 0,
		y: 1,
		r: [0,2]
	},
	{
		i: 9402,
		n: 'Improved Steady Shot',
		m: 3,
		s: [53221,53222,53224],
		d: [
			'When you Steady Shot twice in a row, your ranged attack speed will be increased by 5% for 8 sec.',
			'When you Steady Shot twice in a row, your ranged attack speed will be increased by 10% for 8 sec.',
			'When you Steady Shot twice in a row, your ranged attack speed will be increased by 15% for 8 sec.'
		],
		x: 1,
		y: 1
	},
	{
		i: 9398,
		n: 'Careful Aim',
		m: 2,
		s: [34482,34483],
		d: [
			'Increases the critical strike chance of your Steady Shot, Cobra Shot and Aimed Shot by 30% on targets who are above 80% health.',
			'Increases the critical strike chance of your Steady Shot, Cobra Shot and Aimed Shot by 60% on targets who are above 80% health.'
		],
		x: 2,
		y: 1
	},
	{
		i: 9424,
		n: 'Silencing Shot',
		m: 1,
		s: [34490],
		d: [
			'A shot that silences the target and interrupts spellcasting for 3 sec.'
		],
		t: ['35 yd range<br />20 sec cooldown','Requires Ranged Weapon'],
		x: 0,
		y: 2
	},
	{
		i: 9406,
		n: 'Concussive Barrage',
		m: 2,
		s: [35100,35102],
		d: [
			'Your successful Chimera Shot and Multi-Shot attacks have a 50% chance to daze the target for 4 sec.',
			'Your successful Chimera Shot and Multi-Shot attacks have a 100% chance to daze the target for 4 sec.'
		],
		x: 1,
		y: 2
	},
	{
		i: 11225,
		n: 'Piercing Shots',
		m: 3,
		s: [53234,53237,53238],
		d: [
			'Your critical Aimed, Steady and Chimera Shots cause the target to bleed for 10% of the damage dealt over 8 sec.',
			'Your critical Aimed, Steady and Chimera Shots cause the target to bleed for 20% of the damage dealt over 8 sec.',
			'Your critical Aimed, Steady and Chimera Shots cause the target to bleed for 30% of the damage dealt over 8 sec.'
		],
		x: 2,
		y: 2
	},
	{
		i: 9408,
		n: 'Bombardment',
		m: 2,
		s: [35104,35110],
		d: [
			'When you critically hit with your Multi-Shot your next Multi-Shot\'s focus cost will be reduced by 25%.',
			'When you critically hit with your Multi-Shot your next Multi-Shot\'s focus cost will be reduced by 50%.'
		],
		x: 0,
		y: 3
	},
	{
		i: 9412,
		n: 'Trueshot Aura',
		m: 1,
		s: [19506],
		d: [
			'Increases the attack power of party and raid members within 100 yards by 10%.'
		],
		j: [
			{rgdatkpwr:[10/100,'percentOf','rgdatkpwr'],mleatkpwr:[10/100,'percentOf','mleatkpwr']}
		],
		x: 1,
		y: 3
	},
	{
		i: 9416,
		n: 'Termination',
		m: 2,
		s: [83489,83490],
		d: [
			'Your Steady Shot and Cobra Shot abilities grant an additional 3 Focus when dealt on targets at or below 25% health.',
			'Your Steady Shot and Cobra Shot abilities grant an additional 6 Focus when dealt on targets at or below 25% health.'
		],
		x: 2,
		y: 3
	},
	{
		i: 9420,
		n: 'Resistance is Futile',
		m: 2,
		s: [82893,82894],
		d: [
			'When your marked target attempts to run, flee or move, you have a 4% chance to cause your next Kill Command on the marked target within 8 sec to refund the focus cost.',
			'When your marked target attempts to run, flee or move, you have a 8% chance to cause your next Kill Command on the marked target within 8 sec to refund the focus cost.'
		],
		x: 3,
		y: 3
	},
	{
		i: 9422,
		n: 'Rapid Recuperation',
		m: 2,
		s: [53228,53232],
		d: [
			'You gain 6 focus every 3 sec while under the effect of Rapid Fire, and you gain 25 focus instantly when you gain Rapid Killing.',
			'You gain 12 focus every 3 sec while under the effect of Rapid Fire, and you gain 50 focus instantly when you gain Rapid Killing.'
		],
		x: 0,
		y: 4
	},
	{
		i: 9418,
		n: 'Master Marksman',
		m: 3,
		s: [34485,34486,34487],
		d: [
			'You have a 20% chance when you Steady Shot to gain the Master Marksman effect, lasting 30 sec. After reaching 5 stacks, your next Aimed Shot\'s cast time and focus cost are reduced by 100% for 10 sec.',
			'You have a 40% chance when you Steady Shot to gain the Master Marksman effect, lasting 30 sec. After reaching 5 stacks, your next Aimed Shot\'s cast time and focus cost are reduced by 100% for 10 sec.',
			'You have a 60% chance when you Steady Shot to gain the Master Marksman effect, lasting 30 sec. After reaching 5 stacks, your next Aimed Shot\'s cast time and focus cost are reduced by 100% for 10 sec.'
		],
		x: 1,
		y: 4
	},
	{
		i: 9404,
		n: 'Readiness',
		m: 1,
		s: [23989],
		d: [
			'When activated, this ability immediately finishes the cooldown on all Hunter abilities.'
		],
		t: ['3 min cooldown'],
		x: 3,
		y: 4
	},
	{
		i: 9426,
		n: 'Posthaste',
		m: 2,
		s: [83558,83560],
		d: [
			'Reduces the cooldown of your Rapid Fire by 1 min, and your movement speed is increased by 15% for 4 sec after you use Disengage.',
			'Reduces the cooldown of your Rapid Fire by 2 min, and your movement speed is increased by 30% for 4 sec after you use Disengage.'
		],
		x: 0,
		y: 5
	},
	{
		i: 9428,
		n: 'Marked for Death',
		m: 2,
		s: [53241,53243],
		d: [
			'Your Arcane Shot and Chimera Shot have a 50% chance to automatically apply the Marked for Death effect.<br /><br />Marked for Death is the same as Hunter\'s Mark, but undispellable, does not restrict stealth or invisibility and lasts 15 sec.',
			'Your Arcane Shot and Chimera Shot have a 100% chance to automatically apply the Marked for Death effect.<br /><br />Marked for Death is the same as Hunter\'s Mark, but undispellable, does not restrict stealth or invisibility and lasts 15 sec.'
		],
		x: 2,
		y: 5,
		r: [14,3]
	},
	{
		i: 9430,
		n: 'Chimera Shot',
		m: 1,
		s: [53209],
		d: [
			'An instant shot that causes ranged weapon damage plus <span class="w">RAP</span>*0.732+<!--pts2:1-->1620<!---->, refreshing the duration of  your Serpent Sting and healing you for 5% of your total health.'
		],
		t: ['<table width="100%"><tr><td>50 Focus</td><th>40 yd range</th></tr></table>10 sec cooldown<!--?53209:40:85:85:699:0:1000-->','Requires Ranged Weapon'],
		x: 1,
		y: 6,
		r: [14,3]
	}
	]
},
{
	n: 'Survival',
	color: '#00FF99',
	role: 8,
	mastery: {
		description: 'A rugged tracker who favors using animal venom, explosives and traps as deadly weapons.',
		spells: [
			{id:53301,name:'Explosive Shot',icon:'ability_hunter_explosiveshot'},
			{id:84729,name:'Into the Wilderness',icon:'achievement_zone_alteracmountains_01'}
		],
		rating: [
			{id:76658,name:'Essence of the Viper',description:'<!--sp76658:0-->Increases all magical damage you deal by 8%.  Each point of Mastery increases magical damage by an additional 1.0%.<!--sp76658-->'}
		]
	},
	icon: 'ability_hunter_camouflage',
	t: [
	{
		i: 9442,
		n: 'Hunter vs. Wild',
		m: 3,
		s: [56339,56340,56341],
		d: [
			'Increases your total Stamina by 5%.',
			'Increases your total Stamina by 10%.',
			'Increases your total Stamina by 15%.'
		],
		j: [
			{sta:[5/100,'percentOf','sta']},
			{sta:[10/100,'percentOf','sta']},
			{sta:[15/100,'percentOf','sta']}
		],
		x: 0,
		y: 0
	},
	{
		i: 9432,
		n: 'Pathing',
		m: 3,
		s: [52783,52785,52786],
		d: [
			'Increases ranged haste by 1%.',
			'Increases ranged haste by 2%.',
			'Increases ranged haste by 3%.'
		],
		j: [
			{rgdhastepct:1},
			{rgdhastepct:2},
			{rgdhastepct:3}
		],
		x: 1,
		y: 0
	},
	{
		i: 9450,
		n: 'Improved Serpent Sting',
		m: 2,
		s: [19464,82834],
		d: [
			'Your Serpent Sting also does instant damage equal to 15% of its total periodic effect.<br /><br />Also increases the periodic critical strike chance of your Serpent Sting by 5%.',
			'Your Serpent Sting also does instant damage equal to 30% of its total periodic effect.<br /><br />Also increases the periodic critical strike chance of your Serpent Sting by 10%.'
		],
		x: 2,
		y: 0
	},
	{
		i: 9444,
		n: 'Survival Tactics',
		m: 2,
		s: [19286,19287],
		d: [
			'Reduces the chance that your trap spells will be resisted by 2%, and reduces the cooldown of your Disengage ability by 2 sec.',
			'Reduces the chance that your trap spells will be resisted by 4%, and reduces the cooldown of your Disengage ability by 4 sec.'
		],
		x: 0,
		y: 1
	},
	{
		i: 10753,
		n: 'Trap Mastery',
		m: 3,
		s: [19376,63457,63458],
		d: [
			'Ice Trap and Freezing Trap - Increases the duration by 10%.<br /><br />Immolation Trap, Explosive Trap and Black Arrow - Increases the periodic damage done by 10%.<br /><br />Snake Trap - Increases the number of snakes summoned by 2.',
			'Ice Trap and Freezing Trap - Increases the duration by 20%.<br /><br />Immolation Trap, Explosive Trap and Black Arrow - Increases the periodic damage done by 20%.<br /><br />Snake Trap - Increases the number of snakes summoned by 4.',
			'Ice Trap and Freezing Trap - Increases the duration by 30%.<br /><br />Immolation Trap, Explosive Trap and Black Arrow - Increases the periodic damage done by 30%.<br /><br />Snake Trap - Increases the number of snakes summoned by 6.'
		],
		x: 1,
		y: 1
	},
	{
		i: 9440,
		n: 'Entrapment',
		m: 2,
		s: [19184,19387],
		d: [
			'When your Ice Trap or Snake Trap are triggered you entrap all afflicted targets, preventing them from moving for 2 sec.',
			'When your Ice Trap or Snake Trap are triggered you entrap all afflicted targets, preventing them from moving for 4 sec.'
		],
		x: 2,
		y: 1
	},
	{
		i: 9472,
		n: 'Point of No Escape',
		m: 2,
		s: [53298,53299],
		d: [
			'Increases the ranged critical strike chance of all of your attacks on targets affected by your Ice Trap and Freezing Trap by 3%.',
			'Increases the ranged critical strike chance of all of your attacks on targets affected by your Ice Trap and Freezing Trap by 6%.'
		],
		x: 3,
		y: 1
	},
	{
		i: 9484,
		n: 'Thrill of the Hunt',
		m: 3,
		s: [34497,34498,34499],
		d: [
			'You have a 5% chance when you use Arcane Shot, Explosive Shot or Black Arrow to instantly regain 40% of the base focus cost of the shot.',
			'You have a 10% chance when you use Arcane Shot, Explosive Shot or Black Arrow to instantly regain 40% of the base focus cost of the shot.',
			'You have a 15% chance when you use Arcane Shot, Explosive Shot or Black Arrow to instantly regain 40% of the base focus cost of the shot.'
		],
		x: 0,
		y: 2
	},
	{
		i: 9448,
		n: 'Counterattack',
		m: 1,
		s: [19306],
		d: [
			'A strike that becomes active after parrying an opponent\'s attack.  This attack deals <span class="w">AP</span>*0.2+<!--pts1:1-->320<!----> damage and immobilizes the target for 5 sec.  Counterattack cannot be blocked, dodged, or parried.'
		],
		t: ['Melee Range<br />5 sec cooldown<!--?19306:20:85:85:81:0:1000-->'],
		x: 1,
		y: 2
	},
	{
		i: 9452,
		n: 'Lock and Load',
		m: 2,
		s: [56342,56343],
		d: [
			'You have a 50% chance when you trap a target with Freezing Trap or Ice Trap to cause your next 2 Arcane Shot or Explosive Shot abilities to cost no focus and trigger no cooldown. Effect lasts for 12 sec.',
			'You have a 100% chance when you trap a target with Freezing Trap or Ice Trap to cause your next 2 Arcane Shot or Explosive Shot abilities to cost no focus and trigger no cooldown. Effect lasts for 12 sec.'
		],
		x: 2,
		y: 2
	},
	{
		i: 9460,
		n: 'Resourcefulness',
		m: 3,
		s: [34491,34492,34493],
		d: [
			'Reduces the cooldown of all traps and Black Arrow by 2 sec.',
			'Reduces the cooldown of all traps and Black Arrow by 4 sec.',
			'Reduces the cooldown of all traps and Black Arrow by 6 sec.'
		],
		x: 0,
		y: 3
	},
	{
		i: 9482,
		n: 'Mirrored Blades',
		m: 2,
		s: [83494,83495],
		d: [
			'When attacked by a spell while in Deterrence, you have a 50% chance to reflect it back at the attacker.',
			'When attacked by a spell while in Deterrence, you have a 100% chance to reflect it back at the attacker.'
		],
		x: 1,
		y: 3
	},
	{
		i: 9462,
		n: 'T.N.T.',
		m: 2,
		s: [56333,56336],
		d: [
			'When you deal periodic damage with your Immolation Trap, Explosive Trap or Black Arrow you have a 6% chance to trigger Lock and Load.',
			'When you deal periodic damage with your Immolation Trap, Explosive Trap or Black Arrow you have a 12% chance to trigger Lock and Load.'
		],
		x: 2,
		y: 3,
		r: [9,2]
	},
	{
		i: 9464,
		n: 'Toxicology',
		m: 2,
		s: [82832,82833],
		d: [
			'Increases the periodic critical damage of your Serpent Sting and Black Arrow by 50%.',
			'Increases the periodic critical damage of your Serpent Sting and Black Arrow by 100%.'
		],
		x: 0,
		y: 4
	},
	{
		i: 9468,
		n: 'Wyvern Sting',
		m: 1,
		s: [19386],
		d: [
			'A stinging shot that puts the target to sleep for 30 sec.  Any damage will cancel the effect.  When the target wakes up, the Sting causes <!--pts1:3:3-->2736<!----> Nature damage over 6 sec.  Only one Sting per Hunter can be active on the target at a time.'
		],
		t: ['<table width="100%"><tr><td>10 Focus</td><th>35 yd range</th></tr></table>1 min cooldown','Requires Ranged Weapon'],
		x: 1,
		y: 4
	},
	{
		i: 9474,
		n: 'Noxious Stings',
		m: 2,
		s: [53295,53296],
		d: [
			'Increases your ranged damage done on targets afflicted by your Serpent Sting by 5%.<br /><br />If Wyvern Sting is dispelled, the dispeller is also afflicted by Wyvern Sting lasting 25% of the duration remaining.',
			'Increases your ranged damage done on targets afflicted by your Serpent Sting by 10%.<br /><br />If Wyvern Sting is dispelled, the dispeller is also afflicted by Wyvern Sting lasting 50% of the duration remaining.'
		],
		x: 2,
		y: 4,
		r: [14,1]
	},
	{
		i: 9476,
		n: 'Hunting Party',
		m: 1,
		s: [53290],
		d: [
			'Increases your total Agility by an additional 2%, and increases the Ranged and Melee Attack Speed of all party and raid members by 10%.'
		],
		j: [
			{agi:[2/100,'percentOf','agi']}
		],
		x: 3,
		y: 4
	},
	{
		i: 9478,
		n: 'Sniper Training',
		m: 3,
		s: [53302,53303,53304],
		d: [
			'Increases the critical strike chance of your Kill Shot ability by 5%, and after remaining stationary for 6 sec, your Steady Shot and Cobra Shot deal 2% more damage for 15 sec.',
			'Increases the critical strike chance of your Kill Shot ability by 10%, and after remaining stationary for 6 sec, your Steady Shot and Cobra Shot deal 4% more damage for 15 sec.',
			'Increases the critical strike chance of your Kill Shot ability by 15%, and after remaining stationary for 6 sec, your Steady Shot and Cobra Shot deal 6% more damage for 15 sec.'
		],
		x: 0,
		y: 5
	},
	{
		i: 11698,
		n: 'Serpent Spread',
		m: 2,
		s: [87934,87935],
		d: [
			'Targets hit by your Multi-Shot are also afflicted by your Serpent Sting equal to 6 sec of its total duration.',
			'Targets hit by your Multi-Shot are also afflicted by your Serpent Sting equal to 9 sec of its total duration.'
		],
		x: 2,
		y: 5
	},
	{
		i: 9480,
		n: 'Black Arrow',
		m: 1,
		s: [3674],
		d: [
			'Fires a Black Arrow at the target, dealing <!--pts1:3:5-->2035<!----> Shadow damage over 15 sec. Black Arrow shares a cooldown with other Fire Trap spells.'
		],
		t: ['<table width="100%"><tr><td>35 Focus</td><th>40 yd range</th></tr></table>30 sec cooldown<!--?3674:40:85:85:80:0:1000-->','Requires Ranged Weapon'],
		x: 1,
		y: 6,
		r: [14,1]
	}
	]
}
]);