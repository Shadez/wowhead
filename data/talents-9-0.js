$WowheadTalentCalculator.registerClass(9, [
{
	n: 'Affliction',
	color: '#FFB81A',
	role: 8,
	mastery: {
		description: 'A master of Shadow magic who specializes in fear, drains and damage-over-time spells.',
		spells: [
			{id:30108,name:'Unstable Affliction',icon:'spell_shadow_unstableaffliction_3'},
			{id:87339,name:'Shadow Mastery',icon:'spell_shadow_spectralsight'}
		],
		rating: [
			{id:77215,name:'Potent Afflictions',description:'<!--sp77215:0-->Increases all periodic shadow damage you deal by 13.04%.  Each point of Mastery increases periodic shadow damage by an additional 1.63%.<!--sp77215-->'}
		]
	},
	icon: 'spell_shadow_deathcoil',
	t: [
	{
		i: 11100,
		n: 'Doom and Gloom',
		m: 2,
		s: [18827,18829],
		d: [
			'Increases the critical strike chance of your Bane of Agony and Bane of Doom by 4%.',
			'Increases the critical strike chance of your Bane of Agony and Bane of Doom by 8%.'
		],
		x: 0,
		y: 0
	},
	{
		i: 11110,
		n: 'Improved Life Tap',
		m: 2,
		s: [18182,18183],
		d: [
			'Increases the amount of Mana awarded by your Life Tap spell by 10%.',
			'Increases the amount of Mana awarded by your Life Tap spell by 20%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 11104,
		n: 'Improved Corruption',
		m: 3,
		s: [17810,17811,17812],
		d: [
			'Increases the damage done by your Corruption by 4%.',
			'Increases the damage done by your Corruption by 8%.',
			'Increases the damage done by your Corruption by 12%.'
		],
		x: 2,
		y: 0
	},
	{
		i: 11214,
		n: 'Jinx',
		m: 2,
		s: [18179,85479],
		d: [
			'Your Curse of the Elements also affects up to 15 nearby enemy targets within 20 yards of the cursed target. <br /><br />Also, your Curse of Weakness reduces the target\'s energy, rage, focus or runic power generation by 5% while active.',
			'Your Curse of the Elements also affects up to 15 nearby enemy targets within 40 yards of the cursed target. <br /><br />Also, your Curse of Weakness reduces the target\'s energy, rage, focus or runic power generation by 10% while active.'
		],
		x: 0,
		y: 1
	},
	{
		i: 11112,
		n: 'Soul Siphon',
		m: 2,
		s: [17804,17805],
		d: [
			'Increases the amount drained by your Drain Life and Drain Soul spells by an additional 3% for each of your Affliction effects on the target, up to a maximum of 9% additional effect.',
			'Increases the amount drained by your Drain Life and Drain Soul spells by an additional 6% for each of your Affliction effects on the target, up to a maximum of 18% additional effect.'
		],
		x: 1,
		y: 1
	},
	{
		i: 11420,
		n: 'Siphon Life',
		m: 2,
		s: [63108,86667],
		d: [
			'When you deal damage with your Corruption spell, you have a 25% chance to be healed for 2% of your total health.',
			'When you deal damage with your Corruption spell, you have a 50% chance to be healed for 2% of your total health.'
		],
		x: 2,
		y: 1,
		r: [4,2]
	},
	{
		i: 11128,
		n: 'Curse of Exhaustion',
		m: 1,
		s: [18223],
		d: [
			'Reduces the target\'s movement speed by 30% for 30 sec.  Only one Curse per Warlock can be active on any one target.'
		],
		t: ['<table width="100%"><tr><td>6% of base mana</td><th>40 yd range</th></tr></table>Instant'],
		x: 0,
		y: 2
	},
	{
		i: 11114,
		n: 'Improved Fear',
		m: 2,
		s: [53754,53759],
		d: [
			'Causes your Fear spell to inflict a Nightmare on the target when the fear effect ends. The Nightmare effect reduces the target\'s movement speed by 15% for 5 sec.',
			'Causes your Fear spell to inflict a Nightmare on the target when the fear effect ends. The Nightmare effect reduces the target\'s movement speed by 30% for 5 sec.'
		],
		x: 2,
		y: 2
	},
	{
		i: 11134,
		n: 'Eradication',
		m: 3,
		s: [47195,47196,47197],
		d: [
			'When you deal damage with Corruption, you have 6% chance to increase your spell casting speed by 6% for 10 sec.',
			'When you deal damage with Corruption, you have 6% chance to increase your spell casting speed by 12% for 10 sec.',
			'When you deal damage with Corruption, you have 6% chance to increase your spell casting speed by 20% for 10 sec.'
		],
		x: 3,
		y: 2
	},
	{
		i: 11140,
		n: 'Improved Howl of Terror',
		m: 2,
		s: [30054,30057],
		d: [
			'Reduces the casting time of your Howl of Terror spell by 0 sec.',
			'Reduces the casting time of your Howl of Terror spell by 2 sec.'
		],
		x: 0,
		y: 3
	},
	{
		i: 11366,
		n: 'Soul Swap',
		m: 1,
		s: [86121],
		d: [
			'You instantly deal <!--pts1-->0<!----> damage<!--sp56226:0-->, and remove your Shadow damage-over-time effects from the target<!--sp56226-->.<br /><br />For 20 sec afterwards, the next target you cast Soul Swap: Exhale on will be afflicted by the Shadow damage-over-time effects and suffer <!--pts1-->0<!----> damage.<br /><br />You cannot Soul Swap to the same target.'
		],
		t: ['<table width="100%"><tr><td>18% of base mana</td><th>40 yd range</th></tr></table>Instant<!--?86121:25:85:85:640:0:0-->'],
		x: 1,
		y: 3,
		r: [4,2]
	},
	{
		i: 11124,
		n: 'Shadow Embrace',
		m: 3,
		s: [32385,32387,32392],
		d: [
			'Your Shadow Bolt and Haunt spells apply the Shadow Embrace effect, increasing all Shadow periodic damage dealt to the target by you by 3%. Lasts for 12 sec. Stacks up to 3 times.',
			'Your Shadow Bolt and Haunt spells apply the Shadow Embrace effect, increasing all Shadow periodic damage dealt to the target by you by 4%. Lasts for 12 sec. Stacks up to 3 times.',
			'Your Shadow Bolt and Haunt spells apply the Shadow Embrace effect, increasing all Shadow periodic damage dealt to the target by you by 5%. Stacks up to 3 times.'
		],
		x: 2,
		y: 3
	},
	{
		i: 11142,
		n: 'Death\'s Embrace',
		m: 3,
		s: [47198,47199,47200],
		d: [
			'While at or below 25% health, your Drain Life heals an additional 1% of your total health.<br /><br />Increases the damage done by your Shadow Spells by 4% when your target is at or below 25% health.',
			'While at or below 25% health, your Drain Life heals an additional 2% of your total health.<br /><br />Increases the damage done by your Shadow Spells by 8% when your target is at or below 25% health.',
			'While at or below 25% health, your Drain Life heals an additional 3% of your total health.<br /><br />Increases the damage done by your Shadow Spells by 12% when your target is at or below 25% health.'
		],
		x: 0,
		y: 4
	},
	{
		i: 11122,
		n: 'Nightfall',
		m: 2,
		s: [18094,18095],
		d: [
			'Gives your Corruption and Drain Life spells a 2% chance to cause you to enter a Shadow Trance state after damaging the opponent.  The Shadow Trance state reduces the casting time of your next Shadow Bolt spell by 100%.',
			'Gives your Corruption and Drain Life spells a 4% chance to cause you to enter a Shadow Trance state after damaging the opponent.  The Shadow Trance state reduces the casting time of your next Shadow Bolt spell by 100%.'
		],
		x: 1,
		y: 4
	},
	{
		i: 11419,
		n: 'Soulburn: Seed of Corruption',
		m: 1,
		s: [86664],
		d: [
			'Grants the Soulburn empowerment to your Seed of Corruption spell.<br /><br />Your Seed of Corruption detonation effect will afflict Corruption on all enemy targets. The Soul Shard will be refunded if the detonation is successful.'
		],
		x: 2,
		y: 4
	},
	{
		i: 11150,
		n: 'Everlasting Affliction',
		m: 3,
		s: [47201,47202,47203],
		d: [
			'Increases the critical effect chance of your Corruption, Seed of Corruption and Unstable Affliction by 5%.<br /><br />And your Drain Life, Drain Soul, and Haunt spells have a 33% chance to reset the duration of your Corruption spell on the target.',
			'Increases the critical effect chance of your Corruption, Seed of Corruption and Unstable Affliction by 10%.<br /><br />And your Drain Life, Drain Soul, and Haunt spells have a 66% chance to reset the duration of your Corruption spell on the target.',
			'Increases the critical effect chance of your Corruption, Seed of Corruption and Unstable Affliction by 15%.<br /><br />And your Drain Life, Drain Soul, and Haunt spells have a 100% chance to reset the duration of your Corruption spell on the target.'
		],
		x: 1,
		y: 5
	},
	{
		i: 11200,
		n: 'Pandemic',
		m: 2,
		s: [85099,85100],
		d: [
			'Reduces the global cooldown of your Bane and Curse spells by .25 sec.<br /><br />Your Drain Soul has a 50% chance to refresh the duration of your Unstable Affliction spell when dealing damage on targets below 25% health.',
			'Reduces the global cooldown of your Bane and Curse spells by .5 sec.<br /><br />Your Drain Soul has a 100% chance to refresh the duration of your Unstable Affliction spell when dealing damage on targets below 25% health.'
		],
		x: 2,
		y: 5
	},
	{
		i: 11152,
		n: 'Haunt',
		m: 1,
		s: [48181],
		d: [
			'You send a ghostly soul into the target, dealing ((($SP * 0.5577) * 1.25) + <!--pts1:1--> 922<!---->) Shadow damage and increasing all damage done by your Shadow damage-over-time effects on the target by 20% for 12 sec. When the Haunt spell ends or is dispelled, the soul returns to you, healing you for 100% of the damage it did to the target'
		],
		t: ['<table width="100%"><tr><td>12% of base mana</td><th>40 yd range</th></tr></table><table width="100%"><tr><td><!--cast-->1.5 sec cast</td><th>8 sec cooldown</th></tr></table><!--?48181:40:85:85:286:0:1000-->'],
		x: 1,
		y: 6
	}
	]
},
{
	n: 'Demonology',
	color: '#FF0000',
	role: 8,
	mastery: {
		description: 'A warlock who uses both Fire and Shadow magic along with powerful demons.',
		spells: [
			{id:30146,name:'Summon Felguard',icon:'spell_shadow_summonfelguard'},
			{id:84740,name:'Demonic Knowledge',icon:'spell_fire_twilightimmolation'}
		],
		rating: [
			{id:77219,name:'Master Demonologist',description:'<!--sp77219:0-->Increases the damage done by your demon servants and damage you deal while transformed into a demon by 16%.  Each point of Mastery increases damage by an additional 2.0%.<!--sp77219-->'}
		]
	},
	icon: 'spell_shadow_metamorphosis',
	t: [
	{
		i: 10994,
		n: 'Demonic Embrace',
		m: 3,
		s: [18697,18698,18699],
		d: [
			'Increases your total Stamina by 4%.',
			'Increases your total Stamina by 7%.',
			'Increases your total Stamina by 10%.'
		],
		j: [
			{sta:[4/100,'percentOf','sta']},
			{sta:[7/100,'percentOf','sta']},
			{sta:[10/100,'percentOf','sta']}
		],
		x: 0,
		y: 0
	},
	{
		i: 10992,
		n: 'Dark Arts',
		m: 3,
		s: [18694,85283,85284],
		d: [
			'Reduces the cast time of your Imp\'s Firebolt spell by 0.25 sec, increases the damage done by your Felguard\'s Legion Strike by 5%, and increases the damage done by your Felhunter\'s Shadow Bite by 5%.',
			'Reduces the cast time of your Imp\'s Firebolt spell by 0.50 sec, increases the damage done by your Felguard\'s Legion Strike by 10%, and increases the damage done by your Felhunter\'s Shadow Bite by 10%.',
			'Reduces the cast time of your Imp\'s Firebolt spell by 0.75 sec, increases the damage done by your Felguard\'s Legion Strike by 15%, and increases the damage done by your Felhunter\'s Shadow Bite by 15%.'
		],
		x: 1,
		y: 0
	},
	{
		i: 11206,
		n: 'Fel Synergy',
		m: 2,
		s: [47230,47231],
		d: [
			'You have a 50% chance to heal your pet for 15% of the amount of spell damage done by you.',
			'You have a 100% chance to heal your pet for 15% of the amount of spell damage done by you.'
		],
		x: 2,
		y: 0
	},
	{
		i: 11713,
		n: 'Demonic Rebirth',
		m: 2,
		s: [88446,88447],
		d: [
			'If your summoned demon dies, you gain the Demonic Rebirth effect reducing the cast time of your next summon demon spell by 50%. Lasts for 10 sec. This effect has a 2 min cooldown.',
			'If your summoned demon dies, you gain the Demonic Rebirth effect reducing the cast time of your next summon demon spell by 100%. Lasts for 10 sec. This effect has a 2 min cooldown.'
		],
		x: 0,
		y: 1
	},
	{
		i: 11020,
		n: 'Mana Feed',
		m: 2,
		s: [30326,85175],
		d: [
			'When your summoned demon critically hits with its Basic Attack, you instantly gain 2% total mana.<br /><br />When you gain mana from Life Tap, your summoned demon gains 30% of the mana you gain.',
			'When your summoned demon critically hits with its Basic Attack, you instantly gain 4% total mana.<br /><br />When you gain mana from Life Tap, your summoned demon gains 60% of the mana you gain.'
		],
		x: 1,
		y: 1
	},
	{
		i: 11190,
		n: 'Demonic Aegis',
		m: 2,
		s: [30143,30144],
		d: [
			'Increases the amount of health generated through spells and effects granted by your Demon Armor by an additional 5%, and increases the amount of health returned by your Fel Armor by 50%.',
			'Increases the amount of health generated through spells and effects granted by your Demon Armor by an additional 10%, and increases the amount of health returned by your Fel Armor by 100%.'
		],
		x: 2,
		y: 1
	},
	{
		i: 11014,
		n: 'Master Summoner',
		m: 2,
		s: [18709,18710],
		d: [
			'Reduces the casting time of your Imp, Voidwalker, Succubus, Felhunter and Felguard Summoning spells by 0.5 sec and the Mana cost by 50%.',
			'Reduces the casting time of your Imp, Voidwalker, Succubus, Felhunter and Felguard Summoning spells by 1 sec and the Mana cost by 100%.'
		],
		x: 3,
		y: 1
	},
	{
		i: 11198,
		n: 'Impending Doom',
		m: 3,
		s: [85106,85107,85108],
		d: [
			'Increases the chance for your Bane of Doom to summon a demon by 10% when it deals damage.<br /><br />Also grants your Shadow Bolt, Hand of Gul\'dan, and Incinerate spells a 5% chance to reduce the cooldown of your Demon Form by 15 sec.',
			'Increases the chance for your Bane of Doom to summon a demon by 20% when it deals damage.<br /><br />Also grants your Shadow Bolt, Hand of Gul\'dan, and Incinerate spells a 10% chance to reduce the cooldown of your Demon Form by 15 sec.',
			'Increases the chance for your Bane of Doom to summon a demon by 30% when it deals damage.<br /><br />Also grants your Shadow Bolt, Hand of Gul\'dan, and Incinerate spells a 15% chance to reduce the cooldown of your Demon Form by 15 sec.'
		],
		x: 0,
		y: 2
	},
	{
		i: 11160,
		n: 'Demonic Empowerment',
		m: 1,
		s: [47193],
		d: [
			'Grants the Warlock\'s summoned demon Empowerment.<br /><br />Imp - Instantly heals the Imp for 30% of its total health.<br /><br />Voidwalker - Increases the Voidwalker\'s health by 20%, and its threat generated from spells and attacks by 20% for 20 sec.<br /><br />Succubus - Instantly vanishes, causing the Succubus to go into an improved Invisibility state. The vanish effect removes all stuns, snares and movement impairing effects from the Succubus.<br /><br />Felhunter - Dispels all magical effects from the Felhunter.<br /><br />Felguard - Instantly removes all stun, snare, fear, banish, or horror and movement impairing effects from your Felguard and makes your Felguard immune to them for 15 sec.'
		],
		t: ['<table width="100%"><tr><td>6% of base mana</td><th>100 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>1 min cooldown</th></tr></table>'],
		x: 1,
		y: 2
	},
	{
		i: 10998,
		n: 'Improved Health Funnel',
		m: 2,
		s: [18703,18704],
		d: [
			'Increases the amount of Health transferred by your Health Funnel spell by 10% and reduces the health cost by 10%. In addition, your summoned demon takes 15% less damage while under the effect of your Health Funnel.',
			'Increases the amount of Health transferred by your Health Funnel spell by 20% and reduces the health cost by 20%. In addition, your summoned demon takes 30% less damage while under the effect of your Health Funnel.'
		],
		x: 2,
		y: 2
	},
	{
		i: 11024,
		n: 'Molten Core',
		m: 3,
		s: [47245,47246,47247],
		d: [
			'You have a 2% chance to gain the Molten Core effect when your Immolate deals damage. The Molten Core effect empowers your next 3 Incinerate spells cast within 15 sec, increasing damage done by 6% and reduces cast time by 10%.',
			'You have a 4% chance to gain the Molten Core effect when your Immolate deals damage. The Molten Core effect empowers your next 3 Incinerate spells cast within 15 sec, increasing damage done by 12% and reduces cast time by 20%.',
			'You have a 6% chance to gain the Molten Core effect when your Immolate deals damage. The Molten Core effect empowers your next 3 Incinerate spells cast within 15 sec, increasing damage done by 18% and reduces cast time by 30%.'
		],
		x: 0,
		y: 3
	},
	{
		i: 11201,
		n: 'Hand of Gul\'dan',
		m: 1,
		s: [71521],
		d: [
			'Summons a falling meteor down upon the enemy target, dealing <!--pts1-->1406 to 1660<!----> Shadowflame damage and erupts an aura of magic within 4 yards, causing all targets within it to have a 10% increased  chance to be critically hit by any Warlock demons. The aura lasts for 15 sec.'
		],
		t: ['<table width="100%"><tr><td>7% of base mana</td><th>40 yd range</th></tr></table><table width="100%"><tr><td><!--cast-->2 sec cast</td><th>12 sec cooldown</th></tr></table><!--?71521:25:85:85:622:0:1000-->'],
		x: 1,
		y: 3
	},
	{
		i: 11814,
		n: 'Aura of Foreboding',
		m: 2,
		s: [89604,89605],
		d: [
			'When your Hand of Gul\'dan lands, all enemies within 4 yards will be rooted for 2 sec and stunned for the same duration if they are still within the Curse of Gul\'dan aura 6 sec afterward.',
			'When your Hand of Gul\'dan lands, all enemies within 4 yards will be rooted for 3 sec and stunned for the same duration if they are still within the Curse of Gul\'dan aura 6 sec afterward.'
		],
		x: 2,
		y: 3,
		r: [11,1]
	},
	{
		i: 11188,
		n: 'Ancient Grimoire',
		m: 2,
		s: [85109,85110],
		d: [
			'Increases the duration of your Infernal and Doomguard summons by 10 sec.',
			'Increases the duration of your Infernal and Doomguard summons by 20 sec.'
		],
		x: 0,
		y: 4
	},
	{
		i: 11189,
		n: 'Inferno',
		m: 1,
		s: [85105],
		d: [
			'Enables you to channel Hellfire while moving, and increases the duration of your Immolate by (6)) sec.'
		],
		x: 1,
		y: 4,
		r: [11,1]
	},
	{
		i: 11034,
		n: 'Decimation',
		m: 2,
		s: [63156,63158],
		d: [
			'When you Shadowbolt, Incinerate or Soul Fire a target that is at or below 25% health, the cast time of your Soul Fire spell is reduced by 20% for 10 sec.',
			'When you Shadowbolt, Incinerate or Soul Fire a target that is at or below 25% health, the cast time of your Soul Fire spell is reduced by 40% for 10 sec.'
		],
		x: 2,
		y: 4
	},
	{
		i: 11199,
		n: 'Cremation',
		m: 2,
		s: [85103,85104],
		d: [
			'Increases the damage done by your Hellfire by 15%, and your Hand of Gul\'dan has a 50% chance to refresh the duration of your Immolate on the target.',
			'Increases the damage done by your Hellfire by 30%, and your Hand of Gul\'dan has a 100% chance to refresh the duration of your Immolate on the target.'
		],
		x: 1,
		y: 5,
		r: [14,1]
	},
	{
		i: 11042,
		n: 'Demonic Pact',
		m: 1,
		s: [47236],
		d: [
			'Increases your spell damage by 2%, and your summoned demon grants the Demonic Pact effect to all nearby friendly party and raid members.<br /><br />The Demonic Pact effect increases spell power by 10%.'
		],
		j: [
			{firdmgpct:2,shadmgpct:2}
		],
		x: 2,
		y: 5
	},
	{
		i: 11044,
		n: 'Metamorphosis',
		m: 1,
		s: [59672],
		d: [
			'You transform into a Demon for 30 sec.  This form increases your armor by 600%, damage by 20%, reduces the chance you\'ll be critically hit by melee attacks by 6% and reduces the duration of stun and snare effects by 50%.  You gain some unique demon abilities in addition to your normal abilities. 3 minute cooldown.'
		],
		x: 1,
		y: 6
	}
	]
},
{
	n: 'Destruction',
	color: '#4D80FF',
	role: 8,
	mastery: {
		description: 'Calls down demonic fire to burn and demolish enemies.',
		spells: [
			{id:17962,name:'Conflagrate',icon:'spell_fire_fireball'},
			{id:84739,name:'Cataclysm',icon:'spell_fire_meteorstorm'}
		],
		rating: [
			{id:77220,name:'Fiery Apocalypse',description:'<!--sp77220:0-->Increases all fire damage you deal by 10.8%.  Each point of Mastery increases fire damage by an additional 1.35%.<!--sp77220-->'}
		]
	},
	icon: 'spell_shadow_rainoffire',
	t: [
	{
		i: 10938,
		n: 'Bane',
		m: 3,
		s: [17788,17789,17790],
		d: [
			'Reduces the casting time of your Shadow Bolt, Chaos Bolt and Immolate spells by 0 sec.',
			'Reduces the casting time of your Shadow Bolt, Chaos Bolt and Immolate spells by 0 sec.',
			'Reduces the casting time of your Shadow Bolt, Chaos Bolt and Immolate spells by 0 sec.'
		],
		x: 0,
		y: 0
	},
	{
		i: 10936,
		n: 'Shadow and Flame',
		m: 3,
		s: [17793,17796,17801],
		d: [
			'Increases the damage done by your Shadow Bolt and Incinerate spells by 4%, and your Shadow Bolt and Incinerate have a 33% chance to cause the Shadow and Flame effect to the target.<br /><br />The Shadow and Flame effect causes the target to be vulnerable to spell damage, increasing spell critical strike chance against that target by 5% for 30 sec.',
			'Increases the damage done by your Shadow Bolt and Incinerate spells by 8%, and your Shadow Bolt and Incinerate have a 66% chance to cause the Shadow and Flame effect to the target.<br /><br />The Shadow and Flame effect causes the target to be vulnerable to spell damage, increasing spell critical strike chance against that target by 5% for 30 sec.',
			'Increases the damage done by your Shadow Bolt and Incinerate spells by 12%, and your Shadow Bolt and Incinerate have a 100% chance to cause the Shadow and Flame effect to the target.<br /><br />The Shadow and Flame effect causes the target to be vulnerable to spell damage, increasing spell critical strike chance against that target by 5% for 30 sec.'
		],
		x: 1,
		y: 0
	},
	{
		i: 10960,
		n: 'Improved Immolate',
		m: 2,
		s: [17815,17833],
		d: [
			'Increases the damage done by your Immolate spell by 10%.',
			'Increases the damage done by your Immolate spell by 20%.'
		],
		x: 2,
		y: 0
	},
	{
		i: 11197,
		n: 'Aftermath',
		m: 2,
		s: [85113,85114],
		d: [
			'Your Rain of Fire has a 6% chance to Stun targets for 2 sec., and your Conflagrate has a 50% chance to daze the target for 5 sec.',
			'Your Rain of Fire has a 12% chance to Stun targets for 2 sec., and your Conflagrate has a 100% chance to daze the target for 5 sec.'
		],
		x: 0,
		y: 1
	},
	{
		i: 11181,
		n: 'Emberstorm',
		m: 2,
		s: [17954,17955],
		d: [
			'Reduces the cast time of your Soul Fire by 0 sec and your Incinerate by 0.12 sec.',
			'Reduces the cast time of your Soul Fire by 1 sec and your Incinerate by 0.25 sec.'
		],
		x: 1,
		y: 1
	},
	{
		i: 11196,
		n: 'Improved Searing Pain',
		m: 2,
		s: [17927,17929],
		d: [
			'Increases the critical strike chance of your Searing Pain spell by 20% on targets at or below 25% health.',
			'Increases the critical strike chance of your Searing Pain spell by 40% on targets at or below 25% health.'
		],
		x: 2,
		y: 1
	},
	{
		i: 10940,
		n: 'Improved Soul Fire',
		m: 2,
		s: [18119,18120],
		d: [
			'Increases your Fire and Shadow damage done by 4% for 15 sec after you deal damage with Soul Fire.',
			'Increases your Fire and Shadow damage done by 8% for 15 sec after you deal damage with Soul Fire.'
		],
		x: 0,
		y: 2
	},
	{
		i: 10978,
		n: 'Backdraft',
		m: 3,
		s: [47258,47259,47260],
		d: [
			'When you cast Conflagrate, the cast time of your next three Shadow Bolt, Incinerate and Chaos Bolt spells is reduced by 10%. Lasts 15 sec.',
			'When you cast Conflagrate, the cast time for your next three Shadow Bolt, Incinerate and Chaos Bolt spells is reduced by 20%. Lasts 15 sec.',
			'When you cast Conflagrate, the cast time for your next three Shadow Bolt, Incinerate and Chaos Bolt spells is reduced by 30%. Lasts 15 sec.'
		],
		x: 1,
		y: 2
	},
	{
		i: 10948,
		n: 'Shadowburn',
		m: 1,
		s: [17877],
		d: [
			'Instantly blasts the target for <!--pts2-->650 to 724<!----> Shadow damage.  If the target dies within 5 sec of Shadowburn, and yields experience or honor, the caster gains 3 Soul Shards. Only usable on enemies that have less than 20% health.'
		],
		t: ['<table width="100%"><tr><td>15% of base mana</td><th>40 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>15 sec cooldown</th></tr></table><!--?17877:20:85:85:308:0:1000-->'],
		x: 2,
		y: 2
	},
	{
		i: 11182,
		n: 'Burning Embers',
		m: 2,
		s: [91986,85112],
		d: [
			'Your Soulfire and your Imp\'s Firebolt cause a Burning Ember damage-over-time effect on the target equal to 15% of the damage done lasting 7 sec.<br /><br />The Burning Ember effect deals up to (($SP * 0.425 + <!--pts2:1--> 142<!---->) / 7) fire damage every 1 sec for 7 sec.',
			'Your Soulfire and your Imp\'s Firebolt cause a Burning Ember damage-over-time effect on the target equal to 30% of the damage done lasting 7 sec.<br /><br />The Burning Ember effect deals up to (($SP * 0.85 + <!--pts2:1--> 141<!---->) / 7) fire damage every 1 sec for 7 sec.'
		],
		x: 0,
		y: 3
	},
	{
		i: 10970,
		n: 'Soul Leech',
		m: 2,
		s: [30293,30295],
		d: [
			'Your Shadowburn, Soul Fire and Chaos Bolt instantly restore 2% of your total health and mana when they deal damage and also grant Replenishment.<br /><br />Replenishment - Grants up to 10 party or raid members mana regeneration equal to 1% of their maximum mana per 10 sec. Lasts for 15 sec.',
			'Your Shadowburn, Soul Fire and Chaos Bolt instantly restore 4% of your total health and mana when they deal damage and also grant Replenishment.<br /><br />Replenishment - Grants up to 10 party or raid members mana regeneration equal to 1% of their maximum mana per 10 sec. Lasts for 15 sec.'
		],
		x: 1,
		y: 3
	},
	{
		i: 10958,
		n: 'Backlash',
		m: 3,
		s: [34935,34938,34939],
		d: [
			'Gives you a 8% chance when hit by a physical attack to reduce the cast time of your next Shadow Bolt or Incinerate spell by 100%.  This effect lasts 8 sec and will not occur more than once every 8 seconds.',
			'Gives you a 16% chance when hit by a physical attack to reduce the cast time of your next Shadow Bolt or Incinerate spell by 100%.  This effect lasts 8 sec and will not occur more than once every 8 seconds.',
			'Gives you a 25% chance when hit by a physical attack to reduce the cast time of your next Shadow Bolt or Incinerate spell by 100%.  This effect lasts 8 sec and will not occur more than once every 8 seconds.'
		],
		x: 2,
		y: 3
	},
	{
		i: 12120,
		n: 'Nether Ward',
		m: 1,
		s: [91713],
		d: [
			'Transforms your Shadow Ward into Nether Ward. You must be within Demon Armor or Fel Armor in order for the transformation effect to occur.<br /><br /><span style="color: #FFFFFF">Nether Ward</span><br />Absorbs (<!--pts1:2-->3551<!----> + ($SP * 0.807)) spell damage.  Lasts 30 sec. 30 sec cooldown.'
		],
		x: 3,
		y: 3
	},
	{
		i: 10984,
		n: 'Fire and Brimstone',
		m: 3,
		s: [47266,47267,47268],
		d: [
			'Increases the damage done by your Incinerate and Chaos Bolt spells to targets afflicted by your Immolate by 2%, and the critical strike chance of your Conflagrate spell is increased by 5%.',
			'Increases the damage done by your Incinerate and Chaos Bolt spells to targets afflicted by your Immolate by 4%, and the critical strike chance of your Conflagrate spell is increased by 10%.',
			'Increases the damage done by your Incinerate and Chaos Bolt spells to targets afflicted by your Immolate by 6%, and the critical strike chance of your Conflagrate spell is increased by 15%.'
		],
		x: 1,
		y: 4
	},
	{
		i: 10980,
		n: 'Shadowfury',
		m: 1,
		s: [30283],
		d: [
			'Shadowfury is unleashed, causing <!--pts1-->688 to 818<!----> Shadow damage and stunning all enemies within 8 yds for 3 sec.'
		],
		t: ['<table width="100%"><tr><td>27% of base mana</td><th>30 yd range</th></tr></table><table width="100%"><tr><td>Instant</td><th>20 sec cooldown</th></tr></table><!--?30283:30:85:85:311:0:1000-->'],
		x: 2,
		y: 4
	},
	{
		i: 10964,
		n: 'Nether Protection',
		m: 2,
		s: [30299,30301],
		d: [
			'When you absorb damage through Shadow Ward, Nether Ward or other effects, you gain Nether Protection, reducing all damage by that spell school by 15% for 12 sec.',
			'When you absorb damage through Shadow Ward, Nether Ward or other effects, you gain Nether Protection, reducing all damage by that spell school by 30% for 12 sec.'
		],
		x: 3,
		y: 4,
		r: [12,1]
	},
	{
		i: 10982,
		n: 'Empowered Imp',
		m: 2,
		s: [47220,47221],
		d: [
			'Your Imp\'s Firebolt has a 2% chance to cause your next Soulfire spell to be instant cast within 8 sec.',
			'Your Imp\'s Firebolt has a 4% chance to cause your next Soulfire spell to be instant cast within 8 sec.'
		],
		x: 0,
		y: 5,
		r: [9,2]
	},
	{
		i: 10962,
		n: 'Bane of Havoc',
		m: 1,
		s: [80240],
		d: [
			'Banes the target for 5 min, causing 15% of all damage done by the Warlock to other targets to also be dealt to the baned target. <br /><br />Only one target can have Bane of Havoc at a time, and only one Bane per Warlock can be active on any one target.'
		],
		t: ['<table width="100%"><tr><td>10% of base mana</td><th>40 yd range</th></tr></table>Instant'],
		x: 2,
		y: 5
	},
	{
		i: 10986,
		n: 'Chaos Bolt',
		m: 1,
		s: [50796],
		d: [
			'Sends a bolt of chaotic fire at the enemy, dealing <!--pts1-->1311 to 1665<!----> Fire damage. Chaos Bolt cannot be resisted, and pierces through all absorption effects.'
		],
		t: ['<table width="100%"><tr><td>7% of base mana</td><th>40 yd range</th></tr></table><table width="100%"><tr><td><!--cast-->2.5 sec cast</td><th>12 sec cooldown</th></tr></table><!--?50796:40:85:85:268:0:1000-->'],
		x: 1,
		y: 6,
		r: [13,3]
	}
	]
}
]);