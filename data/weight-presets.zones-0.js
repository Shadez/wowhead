var wt_presets = {
	1: {
		pve: {
			arms: {__icon:'ability_warrior_savageblow',str:100,hitrtng:90,exprtng:85,critstrkrtng:80,mastrtng:70,hastertng:50},
			fury: {__icon:'ability_warrior_innerrage',str:100,exprtng:90,hitrtng:90,critstrkrtng:80,mastrtng:70,hastertng:50},
			prot: {__icon:'ability_warrior_defensivestance',sta:100,mastrtng:90,parryrtng:85,dodgertng:80,exprtng:70,hitrtng:65,str:60,critstrkrtng:50}
		}
	},
	2: {
		pve: {
			holy: {__icon:'spell_holy_holybolt',int:100,hastertng:80,spi:50,mastrtng:50,splpwr:50,critstrkrtng:25},
			prot: {__icon:'ability_paladin_shieldofthetemplar',sta:100,mastrtng:90,dodgertng:80,parryrtng:80,hitrtng:70,exprtng:60,str:50},
			retrib: {__icon:'spell_holy_auraoflight',str:100,mledps:100,atkpwr:45,hitrtng:35,exprtng:22,hastertng:18,critstrkrtng:16,mastrtng:9}
		}
	},
	3: {
		pve: {
			beast: {__icon:'ability_hunter_bestialdiscipline',agi:100,rgddps:100,hitrtng:80,critstrkrtng:60,mastrtng:40,hastertng:20},
			marks: {__icon:'ability_hunter_focusedaim',agi:100,rgddps:100,hitrtng:80,critstrkrtng:60,hastertng:60,mastrtng:40},
			surv: {__icon:'ability_hunter_camouflage',agi:100,rgddps:100,hitrtng:80,critstrkrtng:60,hastertng:40,mastrtng:20}
		}
	},
	4: {
		pve: {
			assas: {__icon:'ability_rogue_eviscerate',mledps:100,agi:100,hitrtng:67,mastrtng:50,hastertng:46,exprtng:42,critstrkrtng:35},
			combat: {__icon:'ability_backstab',mledps:100,agi:100,hitrtng:70,exprtng:59,hastertng:56,critstrkrtng:35,mastrtng:33},
			subtle: {__icon:'ability_stealth',mledps:100,agi:100,hitrtng:40,hastertng:37,exprtng:33,critstrkrtng:31,mastrtng:20}
		}
	},
	5: {
		pve: {
			disc: {__icon:'spell_holy_powerwordshield',int:100,spi:80,splpwr:19,critstrkrtng:11,hastertng:10,mastrtng:6},
			holy: {__icon:'spell_holy_guardianspirit',int:100,spi:95,hastertng:85,mastrtng:80,critstrkrtng:30},
			shadow: {__icon:'spell_shadow_shadowwordpain',int:100,splpwr:79,hastertng:50,critstrkrtng:40,mastrtng:38,spi:37,hitrtng:37}
		}
	},
	6: {
		pve: {
			blood: {__icon:'spell_deathknight_bloodpresence',mledps:500,mastrtng:100,sta:100,agi:69,dodgertng:50,parryrtng:43,exprtng:38,str:31,critstrkrtng:22,armor:18,hastertng:16,hitrtng:16,armorbonus:11},
			frostdps: {__icon:'spell_deathknight_frostpresence',str:100,mledps:100,hitrtng:43,exprtng:41,hastertng:37,mastrtng:35,atkpwr:32,critstrkrtng:26},
			unholy: {__icon:'spell_deathknight_unholypresence',str:100,mledps:100,hitrtng:25,hastertng:25,atkpwr:23,exprtng:21,critstrkrtng:20,mastrtng:8}
		}
	},
	7: {
		pve: {
			elem: {__icon:'spell_nature_lightning',hitrtng:100,splpwr:80,int:80,mastrtng:75,hastertng:75,critstrkrtng:40},
			enhance: {__icon:'spell_nature_lightningshield',mledps:124,agi:100,hitrtng:60,exprtng:48,mastrtng:44,str:42,atkpwr:40,int:36,splpwr:36,critstrkrtng:28,hastertng:16},
			resto: {__icon:'spell_nature_magicimmunity',int:100,splpwr:83,spi:75,hastertng:67,critstrkrtng:58,mastrtng:42,sta:8}
		}
	},
	8: {
		pve: {
			arcane: {__icon:'spell_holy_magicalsentry',splpwr:100,int:100,hitrtng:80,hastertng:50,critstrkrtng:45,mastrtng:40},
			fire: {__icon:'spell_fire_firebolt02',int:100,hitrtng:82,splpwr:68,critstrkrtng:52,mastrtng:37,hastertng:35},
			frost: {__icon:'spell_frost_frostbolt02',int:100,splpwr:100,hitrtng:80,mastrtng:70,hastertng:50,critstrkrtng:45}
		}
	},
	9: {
		pve: {
			afflic: {__icon:'spell_shadow_deathcoil',int:100,splpwr:81,hitrtng:52,hastertng:43,critstrkrtng:32,mastrtng:30,sta:1},
			demo: {__icon:'spell_shadow_metamorphosis',int:100,splpwr:79,hitrtng:63,hastertng:40,critstrkrtng:35,mastrtng:31,sta:1},
			destro: {__icon:'spell_shadow_rainoffire',int:100,splpwr:77,hitrtng:64,hastertng:36,critstrkrtng:34,mastrtng:29,sta:1}
		}
	},
	11: {
		pve: {
			balance: {__icon:'spell_nature_starfall',int:100,splpwr:100,spi:90,hastertng:90,hitrtng:90,mastrtng:80,critstrkrtng:70},
			feraldps: {__icon:'ability_racial_bearform',dps:151,agi:100,str:78,atkpwr:37,mastrtng:35,hastertng:32,exprtng:29,hitrtng:28,critstrkrtng:28},
			feraltank: {__icon:'ability_racial_bearform',sta:100,armor:75,agi:48,dodgertng:41,armorbonus:21,mastrtng:16,critstrkrtng:13,str:10,exprtng:10,health:7,atkpwr:5,hitrtng:5,hastertng:1},
			resto: {__icon:'spell_nature_healingtouch',int:100,splpwr:95,spi:90,mastrtng:80,hastertng:70,critstrkrtng:60}
		}
	}
};
Mapper.multiLevelZones = {
	206: ['206-1', '206-2', '206-3'],
	209: ['209-1', '209-2', '209-3', '209-4', '209-5', '209-6', '209-7'],
	616: ['616-1', '616_1', '616_2'],
	719: ['719-1', '719-2', '719-3'],
	721: ['721-1', '721-2', '721-3', '721-4'],
	796: ['796-1', '796-2', '796-3', '796-4'],
	1196: ['1196-1', '1196-2'],
	1337: ['1337-1', '1337-2'],
	1581: ['1581-1', '1581-2'],
	1583: ['1583-1', '1583-2', '1583-3', '1583-4', '1583-5', '1583-6', '1583-7'],
	1584: ['1584-1', '1584-2'],
	1637: ['1637-0', '1637-1'],
	1977: ['1977_1', '1977_2'],
	2017: ['2017-1', '2017-2'],
	2057: ['2057-1', '2057-2', '2057-3', '2057-4'],
	2100: ['2100-1', '2100-2'],
	2557: ['2557-1', '2557-2', '2557-3', '2557-4', '2557-5', '2557-6'],
	2677: ['2677-1', '2677-2', '2677-3', '2677-4'],
	3428: ['3428-1', '3428-2', '3428-3'],
	3456: ['3456-1', '3456-2', '3456-3', '3456-4', '3456-5', '3456-6'],
	3457: ['3457-1', '3457-10', '3457-11', '3457-12', '3457-13', '3457-14', '3457-15', '3457-16', '3457-17', '3457-2', '3457-3', '3457-4', '3457-5', '3457-6', '3457-7', '3457-8', '3457-9'],
	3477: ['3477-1', '3477-2', '3477-3'],
	3715: ['3715-1', '3715-2'],
	3790: ['3790-1', '3790-2'],
	3791: ['3791-1', '3791-2'],
	3848: ['3848-1', '3848-2', '3848-3'],
	3849: ['3849-1', '3849-2'],
	4100: ['4100-1', '4100-2'],
	4131: ['4131-1', '4131-2'],
	4196: ['4196-1', '4196-2'],
	4228: ['4228-1', '4228-2', '4228-3', '4228-4'],
	4272: ['4272-1', '4272-2'],
	4273: ['4273-0', '4273-1', '4273-2', '4273-3', '4273-4', '4273-5'],
	4277: ['4277-1', '4277-2', '4277-3'],
	4395: ['4395-1', '4395-2'],
	4416: ['4416-1', '4416-2'],
	4494: ['4494-1', '4494-2'],
	4714: ['4714-1', '4714_1', '4714_2', '4714_3'],
	4720: ['4720_1', '4720_2', '4720_3'],
	4722: ['4722-1', '4722-2'],
	4723: ['4723-1', '4723-2'],
	4812: ['4812-1', '4812-2', '4812-3', '4812-4', '4812-5', '4812-6', '4812-7', '4812-8'],
	4922: ['4922_1', '4922_2'],
	4926: ['4926-1', '4926-2'],
	4945: ['4945-1', '4945-2', '4945-3'],
	5004: ['5004-1', '5004-2'],
	5034: ['5034_1', '5034_2'],
	5094: ['5094-1', '5094-2'],
	5334: ['5334-1', '5334-2', '5334-3']
};

Mapper.zonePhased = {
	616: true,
	1977: true,
	4714: true,
	4720: true,
	4922: true,
	5034: true
};

var g_zone_areas = {
	1637: ['Orgrimmar','Cleft of Shadow'],
	4273: ['The Grand Approach ','The Antechamber of Ulduar','The Inner Sanctum of Ulduar','The Prison of Yogg-Saron','The Spark of Imagination','The Mind\'s Eye'],
	4100: ['The Road to Stratholme','Stratholme City'],
	4075: ['Sunwell Plateau','Shrine of the Eclipse'],
	3715: ['The Steamvault','The Cooling Pools'],
	3849: ['The Mechanar','Calculation Chamber'],
	3848: ['Stasis Block: Trion','Stasis Block: Maximus','Containment Core'],
	5094: ['The Broken Hall','Vault of the Shadowflame'],
	3791: ['Veil Sethekk','Halls of Mourning'],
	721: ['The Hall of Gears','The Dormitory','Launch Bay','Tinkers\' Court'],
	1337: ['Hall of the Keepers','Khaz\'Goroth\'s Seat'],
	2557: ['Gordok Commons','Capital Gardens','Court of the Highborne','Prison of Immol\'Thar','Warpwood Quarter','The Shrine of Eldretharr'],
	1584: ['Detention Block','Shadowforge City'],
	1583: ['Tazz\'Alaor','Skitterweb Tunnels','Hordemar City','Hall of Blackhand','Dragonspire Hall','The Rookery','Blackrock Stadium'],
	3790: ['Halls of the Hereafter','Bridge of Souls'],
	2100: ['Caverns of Maraudon','Zaetar\'s Grave'],
	5004: ['Abyssal Halls','Throne of Neptulon'],
	4131: ['Grand Magister\'s Asylum','Observation Grounds'],
	3428: ['The Hive Undergrounds','The Temple Gates','Vault of C\'Thun'],
	2017: ['Crusader\'s Square','The Gauntlet'],
	209: ['The Courtyard','Dining Hall','The Vacant Den','Lower Observatory','Upper Observatory','Lord Godfrey\'s Chamber','The Wall Walk'],
	4926: ['Chamber of Incineration','Twilight Forge'],
	2677: ['Dragonmaw Garrison','Halls of Strife','Crimson Laboratories','Nefarian\'s Lair'],
	1581: ['The Deadmines','Ironclad Cove'],
	5334: ['The Twilight Enclave','Throne of the Apocalypse','The Twilight Caverns'],
	4945: ['The Vault of Lights','Tomb of the Earthrager','The Four Seats'],
	796: ['Graveyard','Library','Armory','Cathedral'],
	2057: ['The Reliquary','Chamber of Summoning','The Headmaster\'s Study','Barov Family Vault'],
	3457: ['Servant\'s Quarters','Upper Livery Stables','The Banquet Hall','The Guest Chambers','Opera Hall Balcony','Master\'s Terrace','Lower Broken Stair','Upper Broken Stair','The Menagerie','Guardian\'s Library','The Repository','Upper Library','The Celestial Watch','Gamesman\'s Hall','Medivh\'s Chambers','The Power Station','Netherspace'],
	719: ['The Pool of Ask\'Ar','Moonshrine Sanctum','The Forgotten Pool'],
	4722: ['The Argent Coliseum','The Icy Depths'],
	4272: ['Unyielding Garrison','Walk of the Makers'],
	4812: ['The Lower Citadel','The Rampart of Skulls','Deathbringer\'s Rise','The Frost Queen\'s Lair','The Upper Reaches','Royal Quarters','The Frozen Throne','Frostmourne'],
	4228: ['Band of Variance','Band of Acceleration','Band of Transmutation','Band of Alignment'],
	4277: ['The Brood Pit','Hadronox\'s Lair','The Gilded Gate'],
	1196: ['Lower Pinnacle','Upper Pinnacle'],
	4723: ['The Argent Coliseum','The Icy Depths'],
	4395: ['Dalaran City','The Underbelly'],
	4196: ['The Vestibules of Drak\'Tharon','Drak\'Tharon Overlook'],
	3456: ['The Construct Quarter','The Arachnid Quarter','The Military Quarter','The Plague Quarter','The Lower Necropolis','The Upper Necropolis'],
	206: ['Norndir Preperation','Dragonflayer Ascent','Tyr\'s Terrace']
};