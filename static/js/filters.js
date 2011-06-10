var fi_type = null;
var fi_weights = null;
var fi_weightsFactor;
var fi_nExtraCols;
var fi_gemScores;
var fi_upgradeId;
var fi_filters = {
    items: [{
        id: 9999,
        name: "sepgeneral"
    }, {
        id: 166,
        name: "addedinexpansion",
        type: "expansion"
    }, {
        id: 82,
        name: "addedinpatch",
        type: "patch"
    }, {
        id: 2,
        name: "bindonpickup",
        type: "yn"
    }, {
        id: 3,
        name: "bindonequip",
        type: "yn"
    }, {
        id: 4,
        name: "bindonuse",
        type: "yn"
    }, {
        id: 133,
        name: "bindtoaccount",
        type: "yn"
    }, {
        id: 152,
        name: "classspecific",
        type: "classs"
    }, {
        id: 107,
        name: "effecttext",
        type: "str"
    }, {
        id: 81,
        name: "fitsgemslot",
        type: "gem"
    }, {
        id: 132,
        name: "glyphtype",
        type: "glyphtype"
    }, {
        id: 80,
        name: "hassockets",
        type: "gem"
    }, {
        id: 146,
        name: "heroicitem",
        type: "yn"
    }, {
        id: 142,
        name: "icon",
        type: "str"
    }, {
        id: 151,
        name: "id",
        type: "num",
        before: "name",
        noweights: 1
    }, {
        id: 100,
        name: "nsockets",
        type: "num",
        noweights: 1
    }, {
        id: 153,
        name: "racespecific",
        type: "race"
    }, {
        id: 124,
        name: "randomenchants",
        type: "str"
    }, {
        id: 125,
        name: "reqarenartng",
        type: "num",
        noweights: 1
    }, {
        id: 111,
        name: "reqskillrank",
        type: "num",
        noweights: 1
    }, {
        id: 99,
        name: "requiresprof",
        type: "profession"
    }, {
        id: 66,
        name: "requiresprofspec",
        type: "profession"
    }, {
        id: 17,
        name: "requiresrepwith",
        type: "faction-any+none"
    }, {
        id: 169,
        name: "requiresevent",
        type: "event-any+none"
    }, {
        id: 160,
        name: "relatedevent",
        type: "event-any+none"
    }, {
        id: 168,
        name: "teachesspell",
        type: "yn"
    }, {
        id: 15,
        name: "unique",
        type: "yn"
    }, {
        id: 83,
        name: "uniqueequipped",
        type: "yn"
    }, {
        id: 9999,
        name: "sepbasestats"
    }, {
        id: 21,
        name: "agi",
        type: "num"
    }, {
        id: 23,
        name: "int",
        type: "num"
    }, {
        id: 22,
        name: "sta",
        type: "num"
    }, {
        id: 24,
        name: "spi",
        type: "num"
    }, {
        id: 20,
        name: "str",
        type: "num"
    }, {
        id: 115,
        name: "health",
        type: "num"
    }, {
        id: 60,
        name: "healthrgn",
        type: "num"
    }, {
        id: 116,
        name: "mana",
        type: "num"
    }, {
        id: 170,
        name: "mastrtng",
        type: "num"
    }, {
        id: 9999,
        name: "sepdefensivestats"
    }, {
        id: 41,
        name: "armor",
        type: "num"
    }, {
        id: 45,
        name: "dodgertng",
        type: "num"
    }, {
        id: 46,
        name: "parryrtng",
        type: "num"
    }, {
        id: 79,
        name: "resirtng",
        type: "num"
    }, {
        id: 9999,
        name: "sepoffensivestats"
    }, {
        id: 77,
        name: "atkpwr",
        type: "num"
    }, {
        id: 96,
        name: "critstrkrtng",
        type: "num"
    }, {
        id: 117,
        name: "exprtng",
        type: "num"
    }, {
        id: 103,
        name: "hastertng",
        type: "num"
    }, {
        id: 119,
        name: "hitrtng",
        type: "num"
    }, {
        id: 94,
        name: "splpen",
        type: "num"
    }, {
        id: 123,
        name: "splpwr",
        type: "num"
    }, {
        id: 9999,
        name: "sepweaponstats"
    }, {
        id: 32,
        name: "dps",
        type: "num"
    }, {
        id: 35,
        name: "damagetype",
        type: "resistance"
    }, {
        id: 33,
        name: "dmgmin1",
        type: "num"
    }, {
        id: 34,
        name: "dmgmax1",
        type: "num"
    }, {
        id: 36,
        name: "speed",
        type: "num"
    }, {
        id: 134,
        name: "mledps",
        type: "num"
    }, {
        id: 135,
        name: "mledmgmin",
        type: "num"
    }, {
        id: 136,
        name: "mledmgmax",
        type: "num"
    }, {
        id: 137,
        name: "mlespeed",
        type: "num"
    }, {
        id: 138,
        name: "rgddps",
        type: "num"
    }, {
        id: 139,
        name: "rgddmgmin",
        type: "num"
    }, {
        id: 140,
        name: "rgddmgmax",
        type: "num"
    }, {
        id: 141,
        name: "rgdspeed",
        type: "num"
    }, {
        id: 9999,
        name: "sepresistances"
    }, {
        id: 25,
        name: "arcres",
        type: "num"
    }, {
        id: 26,
        name: "firres",
        type: "num"
    }, {
        id: 28,
        name: "frores",
        type: "num"
    }, {
        id: 30,
        name: "holres",
        type: "num"
    }, {
        id: 27,
        name: "natres",
        type: "num"
    }, {
        id: 29,
        name: "shares",
        type: "num"
    }, {
        id: 9999,
        name: "sepsource"
    }, {
        id: 86,
        name: "craftedprof",
        type: "profession"
    }, {
        id: 16,
        name: "dropsin",
        type: "zone"
    }, {
        id: 105,
        name: "dropsinnormal",
        type: "heroicdungeon-any"
    }, {
        id: 106,
        name: "dropsinheroic",
        type: "heroicdungeon-any"
    }, {
        id: 147,
        name: "dropsinnormal10",
        type: "multimoderaid-any"
    }, {
        id: 148,
        name: "dropsinnormal25",
        type: "multimoderaid-any"
    }, {
        id: 149,
        name: "dropsinheroic10",
        type: "heroicraid-any"
    }, {
        id: 150,
        name: "dropsinheroic25",
        type: "heroicraid-any"
    }, {
        id: 68,
        name: "otdisenchanting",
        type: "yn"
    }, {
        id: 69,
        name: "otfishing",
        type: "yn"
    }, {
        id: 70,
        name: "otherbgathering",
        type: "yn"
    }, {
        id: 71,
        name: "otitemopening",
        type: "yn"
    }, {
        id: 72,
        name: "otlooting",
        type: "yn"
    }, {
        id: 143,
        name: "otmilling",
        type: "yn"
    }, {
        id: 73,
        name: "otmining",
        type: "yn"
    }, {
        id: 74,
        name: "otobjectopening",
        type: "yn"
    }, {
        id: 75,
        name: "otpickpocketing",
        type: "yn"
    }, {
        id: 88,
        name: "otprospecting",
        type: "yn"
    }, {
        id: 93,
        name: "otpvp",
        type: "pvp"
    }, {
        id: 171,
        name: "otredemption",
        type: "yn"
    }, {
        id: 76,
        name: "otskinning",
        type: "yn"
    }, {
        id: 158,
        name: "purchasablewithcurrency",
        type: "currency-any"
    }, {
        id: 118,
        name: "purchasablewithitem",
        type: "itemcurrency-any"
    }, {
        id: 18,
        name: "rewardedbyfactionquest",
        type: "side"
    }, {
        id: 126,
        name: "rewardedbyquestin",
        type: "zone-any"
    }, {
        id: 172,
        name: "rewardedbyachievement",
        type: "achievementtype"
    }, {
        id: 92,
        name: "soldbyvendor",
        type: "yn"
    }, {
        id: 129,
        name: "soldbynpc",
        type: "str-small"
    }, {
        id: 128,
        name: "sepsource",
        type: "itemsource"
    }, {
        id: 9999,
        name: "sepmisc"
    }, {
        id: 109,
        name: "armorbonus",
        type: "num"
    }, {
        id: 161,
        name: "availabletoplayers",
        type: "yn"
    }, {
        id: 90,
        name: "avgbuyout",
        type: "num",
        noweights: 1
    }, {
        id: 65,
        name: "avgmoney",
        type: "num",
        noweights: 1
    }, {
        id: 9,
        name: "conjureditem",
        type: "yn"
    }, {
        id: 62,
        name: "cooldown",
        type: "num",
        noweights: 1
    }, {
        id: 162,
        name: "deprecated",
        type: "yn"
    }, {
        id: 8,
        name: "disenchantable",
        type: "yn"
    }, {
        id: 163,
        name: "disenchantsinto",
        type: "disenchanting"
    }, {
        id: 59,
        name: "dura",
        type: "num",
        noweights: 1
    }, {
        id: 104,
        name: "flavortext",
        type: "str"
    }, {
        id: 7,
        name: "hasflavortext",
        type: "yn"
    }, {
        id: 10,
        name: "locked",
        type: "yn"
    }, {
        id: 159,
        name: "millable",
        type: "yn"
    }, {
        id: 85,
        name: "objectivequest",
        type: "side"
    }, {
        id: 11,
        name: "openable",
        type: "yn"
    }, {
        id: 12,
        name: "partofset",
        type: "yn"
    }, {
        id: 98,
        name: "partyloot",
        type: "yn"
    }, {
        id: 89,
        name: "prospectable",
        type: "yn"
    }, {
        id: 5,
        name: "questitem",
        type: "yn"
    }, {
        id: 13,
        name: "randomlyenchanted",
        type: "yn"
    }, {
        id: 14,
        name: "readable",
        type: "yn"
    }, {
        id: 87,
        name: "reagentforability",
        type: "profession"
    }, {
        id: 154,
        name: "refundable",
        type: "yn"
    }, {
        id: 64,
        name: "sellprice",
        type: "num",
        noweights: 1
    }, {
        id: 157,
        name: "smartloot",
        type: "yn"
    }, {
        id: 6,
        name: "startsquest",
        type: "side"
    }, {
        id: 91,
        name: "tool",
        type: "totemcategory"
    }, {
        id: 155,
        name: "usableinarenas",
        type: "yn"
    }, {
        id: 156,
        name: "usablewhenshapeshifted",
        type: "yn"
    }, {
        id: 9999,
        name: "sepcommunity"
    }, {
        id: 130,
        name: "hascomments",
        type: "yn"
    }, {
        id: 113,
        name: "hasscreenshots",
        type: "yn"
    }, {
        id: 167,
        name: "hasvideos",
        type: "yn"
    }, {
        id: 9999,
        name: "sepstaffonly",
        staffonly: true
    }, {
        id: 176,
        name: "flags",
        type: "flags",
        staffonly: true
    }, {
        id: 177,
        name: "flags2",
        type: "flags",
        staffonly: true
    }],
    itemsets: [{
        id: 9999,
        name: "sepgeneral"
    }, {
        id: 11,
        name: "addedinpatch",
        type: "patch"
    }, {
        id: 3,
        name: "pieces",
        type: "num"
    }, {
        id: 4,
        name: "bonustext",
        type: "str"
    }, {
        id: 5,
        name: "heroic",
        type: "yn"
    }, {
        id: 6,
        name: "relatedevent",
        type: "event-any+none"
    }, {
        id: 2,
        name: "id",
        type: "num"
    }, {
        id: 9999,
        name: "sepcommunity"
    }, {
        id: 8,
        name: "hascomments",
        type: "yn"
    }, {
        id: 9,
        name: "hasscreenshots",
        type: "yn"
    }, {
        id: 10,
        name: "hasvideos",
        type: "yn"
    }],
    npcs: [{
        id: 9999,
        name: "sepgeneral"
    }, {
        id: 39,
        name: "addedinexpansion",
        type: "expansion"
    }, {
        id: 13,
        name: "addedinpatch",
        type: "patch"
    }, {
        id: 5,
        name: "canrepair",
        type: "yn"
    }, {
        id: 8,
        name: "endsquest",
        type: "side"
    }, {
        id: 3,
        name: "faction",
        type: "faction"
    }, {
        id: 6,
        name: "foundin",
        type: "zone"
    }, {
        id: 1,
        name: "health",
        type: "num"
    }, {
        id: 37,
        name: "id",
        type: "num"
    }, {
        id: 32,
        name: "instanceboss",
        type: "yn"
    }, {
        id: 2,
        name: "mana",
        type: "num"
    }, {
        id: 38,
        name: "relatedevent",
        type: "event-any+none"
    }, {
        id: 7,
        name: "startsquest",
        type: "side"
    }, {
        id: 34,
        name: "usemodel",
        type: "str-small"
    }, {
        id: 35,
        name: "useskin",
        type: "str"
    }, {
        id: 9999,
        name: "seploot"
    }, {
        id: 12,
        name: "averagemoneydropped",
        type: "num"
    }, {
        id: 43,
        name: "decreasesrepwith",
        type: "faction"
    }, {
        id: 42,
        name: "increasesrepwith",
        type: "faction"
    }, {
        id: 15,
        name: "gatherable",
        type: "yn"
    }, {
        id: 44,
        name: "salvageable",
        type: "yn"
    }, {
        id: 9,
        name: "lootable",
        type: "yn"
    }, {
        id: 16,
        name: "minable",
        type: "yn"
    }, {
        id: 11,
        name: "pickpocketable",
        type: "yn"
    }, {
        id: 10,
        name: "skinnable",
        type: "yn"
    }, {
        id: 9999,
        name: "sepgossipoptions"
    }, {
        id: 18,
        name: "auctioneer",
        type: "yn"
    }, {
        id: 19,
        name: "banker",
        type: "yn"
    }, {
        id: 20,
        name: "battlemaster",
        type: "yn"
    }, {
        id: 21,
        name: "flightmaster",
        type: "yn"
    }, {
        id: 22,
        name: "guildmaster",
        type: "yn"
    }, {
        id: 23,
        name: "innkeeper",
        type: "yn"
    }, {
        id: 24,
        name: "talentunlearner",
        type: "yn"
    }, {
        id: 25,
        name: "tabardvendor",
        type: "yn"
    }, {
        id: 27,
        name: "stablemaster",
        type: "yn"
    }, {
        id: 28,
        name: "trainer",
        type: "yn"
    }, {
        id: 29,
        name: "vendor",
        type: "yn"
    }, {
        id: 9999,
        name: "sepcommunity"
    }, {
        id: 33,
        name: "hascomments",
        type: "yn"
    }, {
        id: 31,
        name: "hasscreenshots",
        type: "yn"
    }, {
        id: 40,
        name: "hasvideos",
        type: "yn"
    }, {
        id: 9999,
        name: "sepstaffonly",
        staffonly: true
    }, {
        id: 41,
        name: "haslocation",
        type: "yn",
        staffonly: true
    }],
    objects: [{
        id: 9999,
        name: "sepgeneral"
    }, {
        id: 17,
        name: "addedinexpansion",
        type: "expansion"
    }, {
        id: 6,
        name: "addedinpatch",
        type: "patch"
    }, {
        id: 3,
        name: "endsquest",
        type: "side"
    }, {
        id: 1,
        name: "foundin",
        type: "zone"
    }, {
        id: 15,
        name: "id",
        type: "num"
    }, {
        id: 16,
        name: "relatedevent",
        type: "event-any+none"
    }, {
        id: 7,
        name: "requiredskilllevel",
        type: "num"
    }, {
        id: 2,
        name: "startsquest",
        type: "side"
    }, {
        id: 9999,
        name: "seploot"
    }, {
        id: 5,
        name: "averagemoneycontained",
        type: "num"
    }, {
        id: 4,
        name: "openable",
        type: "yn"
    }, {
        id: 9999,
        name: "sepcommunity"
    }, {
        id: 13,
        name: "hascomments",
        type: "yn"
    }, {
        id: 11,
        name: "hasscreenshots",
        type: "yn"
    }, {
        id: 18,
        name: "hasvideos",
        type: "yn"
    }],
    quests: [{
        id: 9999,
        name: "sepgeneral"
    }, {
        id: 35,
        name: "addedinexpansion",
        type: "expansion"
    }, {
        id: 8,
        name: "addedinpatch",
        type: "patch"
    }, {
        id: 34,
        name: "availabletoplayers",
        type: "yn"
    }, {
        id: 37,
        name: "classspecific",
        type: "classs"
    }, {
        id: 27,
        name: "daily",
        type: "yn"
    }, {
        id: 21,
        name: "endsat",
        type: "questend"
    }, {
        id: 30,
        name: "id",
        type: "num"
    }, {
        id: 44,
        name: "countsforloremaster_stc",
        type: "yn"
    }, {
        id: 9,
        name: "objectiveearnrepwith",
        type: "faction-any+none"
    }, {
        id: 38,
        name: "racespecific",
        type: "race"
    }, {
        id: 33,
        name: "relatedevent",
        type: "event-any+none"
    }, {
        id: 29,
        name: "repeatable",
        type: "yn"
    }, {
        id: 5,
        name: "sharable",
        type: "yn"
    }, {
        id: 19,
        name: "startsfrom",
        type: "queststart"
    }, {
        id: 11,
        name: "suggestedplayers",
        type: "num"
    }, {
        id: 6,
        name: "timer",
        type: "num"
    }, {
        id: 28,
        name: "weekly",
        type: "yn"
    }, {
        id: 9999,
        name: "sepstaffonly",
        staffonly: true
    }, {
        id: 42,
        name: "flags",
        type: "flags",
        staffonly: true
    }, {
        id: 9999,
        name: "sepgainsrewards"
    }, {
        id: 10,
        name: "decreasesrepwith",
        type: "faction"
    }, {
        id: 2,
        name: "experiencegained",
        type: "num"
    }, {
        id: 1,
        name: "increasesrepwith",
        type: "faction"
    }, {
        id: 43,
        name: "currencyrewarded",
        type: "currency"
    }, {
        id: 23,
        name: "itemchoices",
        type: "num"
    }, {
        id: 22,
        name: "itemrewards",
        type: "num"
    }, {
        id: 3,
        name: "moneyrewarded",
        type: "num"
    }, {
        id: 4,
        name: "spellrewarded",
        type: "yn"
    }, {
        id: 45,
        name: "titlerewarded",
        type: "yn"
    }, {
        id: 9999,
        name: "sepseries"
    }, {
        id: 7,
        name: "firstquestseries",
        type: "yn"
    }, {
        id: 15,
        name: "lastquestseries",
        type: "yn"
    }, {
        id: 16,
        name: "partseries",
        type: "yn"
    }, {
        id: 9999,
        name: "sepcommunity"
    }, {
        id: 25,
        name: "hascomments",
        type: "yn"
    }, {
        id: 18,
        name: "hasscreenshots",
        type: "yn"
    }, {
        id: 36,
        name: "hasvideos",
        type: "yn"
    }, {
        id: 9999,
        name: "sepmisc"
    }, {
        id: 24,
        name: "lacksstartend",
        type: "yn"
    }],
    spells: [{
        id: 9999,
        name: "sepgeneral"
    }, {
        id: 16,
        name: "addedinexpansion",
        type: "expansion"
    }, {
        id: 21,
        name: "addedinpatch",
        type: "patch"
    }, {
        id: 2,
        name: "prcntbasemanarequired",
        type: "num"
    }, {
        id: 15,
        name: "icon",
        type: "str"
    }, {
        id: 10,
        name: "firstrank",
        type: "yn"
    }, {
        id: 20,
        name: "hasreagents",
        type: "yn"
    }, {
        id: 24,
        name: "researchproject",
        type: "yn"
    }, {
        id: 14,
        name: "id",
        type: "num"
    }, {
        id: 12,
        name: "lastrank",
        type: "yn"
    }, {
        id: 1,
        name: "manaenergyragecost",
        type: "num"
    }, {
        id: 13,
        name: "rankno",
        type: "num"
    }, {
        id: 22,
        name: "proficiencytype",
        type: "proficiencytype"
    }, {
        id: 19,
        name: "scaling",
        type: "yn"
    }, {
        id: 23,
        name: "specializationtype",
        type: "specializetype"
    }, {
        id: 25,
        name: "rewardsskillups",
        type: "num"
    }, {
        id: 3,
        name: "requiresnearbyobject",
        type: "yn"
    }, {
        id: 5,
        name: "requiresprofspec",
        type: "yn"
    }, {
        id: 9,
        name: "source",
        type: "spellsource"
    }, {
        id: 4,
        name: "trainingcost",
        type: "num"
    }, {
        id: 9999,
        name: "sepcommunity"
    }, {
        id: 11,
        name: "hascomments",
        type: "yn"
    }, {
        id: 8,
        name: "hasscreenshots",
        type: "yn"
    }, {
        id: 17,
        name: "hasvideos",
        type: "yn"
    }],
    achievements: [{
        id: 9999,
        name: "sepgeneral"
    }, {
        id: 12,
        name: "addedinexpansion",
        type: "expansion"
    }, {
        id: 17,
        name: "addedinpatch",
        type: "patch"
    }, {
        id: 2,
        name: "givesreward",
        type: "yn"
    }, {
        id: 10,
        name: "icon",
        type: "str"
    }, {
        id: 9,
        name: "id",
        type: "num"
    }, {
        id: 4,
        name: "location",
        type: "zone"
    }, {
        id: 11,
        name: "relatedevent",
        type: "event-any+none"
    }, {
        id: 3,
        name: "rewardtext",
        type: "str"
    }, {
        id: 9999,
        name: "sepseries"
    }, {
        id: 5,
        name: "firstseries",
        type: "yn"
    }, {
        id: 6,
        name: "lastseries",
        type: "yn"
    }, {
        id: 7,
        name: "partseries",
        type: "yn"
    }, {
        id: 9999,
        name: "sepcommunity"
    }, {
        id: 14,
        name: "hascomments",
        type: "yn"
    }, {
        id: 15,
        name: "hasscreenshots",
        type: "yn"
    }, {
        id: 16,
        name: "hasvideos",
        type: "yn"
    }],
    profiles: [{
        id: 1,
        name: "sepgeneral"
    }, {
        id: 2,
        name: "gearscore",
        type: "num"
    }, {
        id: 3,
        name: "achievementpoints",
        type: "num"
    }, {
        id: 21,
        name: "wearingitem",
        type: "str-small"
    }, {
        id: 23,
        name: "completedachievement",
        type: "str-small"
    }, {
        id: 24,
        name: "sepprofession"
    }, {
        id: 25,
        name: "alchemy",
        type: "str-small"
    }, {
        id: 26,
        name: "blacksmithing",
        type: "str-small"
    }, {
        id: 27,
        name: "enchanting",
        type: "str-small"
    }, {
        id: 28,
        name: "engineering",
        type: "str-small"
    }, {
        id: 29,
        name: "herbalism",
        type: "str-small"
    }, {
        id: 30,
        name: "inscription",
        type: "str-small"
    }, {
        id: 31,
        name: "jewelcrafting",
        type: "str-small"
    }, {
        id: 32,
        name: "leatherworking",
        type: "str-small"
    }, {
        id: 33,
        name: "mining",
        type: "str-small"
    }, {
        id: 34,
        name: "skinning",
        type: "str-small"
    }, {
        id: 35,
        name: "tailoring",
        type: "str-small"
    }, {
        id: 4,
        name: "septalent"
    }, {
        id: 5,
        name: "talenttree1",
        type: "num"
    }, {
        id: 6,
        name: "talenttree2",
        type: "num"
    }, {
        id: 7,
        name: "talenttree3",
        type: "num"
    }, {
        id: 8,
        name: "sepguild"
    }, {
        id: 36,
        name: "hasguild",
        type: "yn"
    }, {
        id: 9,
        name: "guildname",
        type: "str"
    }, {
        id: 10,
        name: "guildrank",
        type: "num"
    }, {
        id: 11,
        name: "separenateam"
    }, {
        id: 12,
        name: "teamname2v2",
        type: "str"
    }, {
        id: 13,
        name: "teamrtng2v2",
        type: "num"
    }, {
        id: 14,
        name: "teamcontrib2v2",
        type: "num"
    }, {
        id: 15,
        name: "teamname3v3",
        type: "str"
    }, {
        id: 16,
        name: "teamrtng3v3",
        type: "num"
    }, {
        id: 17,
        name: "teamcontrib3v3",
        type: "num"
    }, {
        id: 18,
        name: "teamname5v5",
        type: "str"
    }, {
        id: 19,
        name: "teamrtng5v5",
        type: "num"
    }, {
        id: 20,
        name: "teamcontrib5v5",
        type: "num"
    }]
};
if ($WH.isset("g_ptr") && g_ptr) {
    g_getPatchVersion.V.push("4.1.0")
}
var fi_patches = $WH.array_filter(g_getPatchVersion.V, function (a) {
    return a.match(/[0-9\.]+/)
}).sort().reverse();

function fi_submit(e) {
    var c = 0;
    var a = e.elements;
    for (var b = 0; b < a.length; ++b) {
        switch (a[b].nodeName) {
        case "INPUT":
            switch (a[b].type) {
            case "text":
                if ($WH.trim(a[b].value).length > 0) {
                    ++c
                }
                break;
            case "checkbox":
                if (a[b].value == "ja" && a[b].checked) {
                    ++c
                }
                break;
            case "radio":
                if (a[b].name != "ma" && a[b].checked && a[b].value) {
                    ++c
                }
                break
            }
            break;
        case "SELECT":
            if (a[b].name != "cr[]" && a[b].name != "gm" && a[b].selectedIndex != -1 && a[b].options[a[b].selectedIndex].value) {
                ++c
            }
            break
        }
    }
    var d = $WH.g_getGets();
    if (c == 0 && !d.filter) {
        alert(LANG.message_fillsomecriteria);
        return false
    }
    return true
}
function fi_initWeightedListview() {
    this._scoreMode = (fi_upgradeId ? 2 : 0);
    if (this.sort[0] == -this.columns.length) {
        this.applySort()
    }
    if (fi_upgradeId && this._minScore) {
        this._maxScore = this._minScore
    }
}
function fi_filterUpgradeListview(c, b) {
    var a = 25;
    if (!fi_upgradeId) {
        return b < a
    }
    if (this._upgradeRow == null) {
        this._upgradeRow = a - 1
    }
    if (c.id == fi_upgradeId) {
        if (b < a) {
            this._upgradeRow++
        }
        return true
    }
    return b < this._upgradeRow
}
function fi_addUpgradeIndicator() {
    if (fi_upgradeId) {
        for (var a = 0; a < this.data.length; ++a) {
            var b = this.data[a];
            if (b.id == fi_upgradeId) {
                this.createIndicator($WH.sprintf(LANG.lvnote_upgradesfor, b.id, (7 - parseInt(b.name.charAt(0))), b.name.substr(1)), location.href.replace(/;upg=[0-9]+/i, ""));
                break
            }
        }
    }
}
function fi_reset(c) {
    fi_resetCriterion($WH.ge("fi_criteria"));
    fi_resetCriterion($WH.ge("fi_weight"));
    var a = $WH.ge("sdkgnsdkn436");
    if (a) {
        a.parentNode.style.display = "none";
        while (a.firstChild) {
            $WH.de(a.firstChild)
        }
        $WH.ae(a, $WH.ce("option"))
    }
    a = c.elements;
    for (var b = 0; b < a.length; ++b) {
        switch (a[b].nodeName) {
        case "INPUT":
            if (a[b].type == "text") {
                a[b].value = ""
            } else {
                if (a[b].type == "checkbox") {
                    a[b].checked = false
                } else {
                    if (a[b].type == "radio" && a[b].value.length == 0) {
                        a[b].checked = true
                    }
                }
            }
            break;
        case "SELECT":
            a[b].selectedIndex = a[b].multiple ? -1 : 0;
            if (a[b].i) {
                a[b].i = a[b].selectedIndex
            }
            break
        }
    }
    return false
}
function fi_resetCriterion(b) {
    if (b != null) {
        var a;
        while (b.childNodes.length > 1) {
            a = b.childNodes[1];
            while (a.childNodes.length > 1) {
                a.removeChild(a.childNodes[1])
            }
            b.removeChild(a)
        }
        a = b.childNodes[0];
        while (a.childNodes.length > 1) {
            a.removeChild(a.childNodes[1])
        }
        a.firstChild.i = null;
        a.firstChild.selectedIndex = 0;
        if (b.nextSibling.firstChild) {
            b.nextSibling.firstChild.style.display = b.style.display
        }
    }
}
function fi_addCriterion(l, h) {
    var e = $WH.ge(l.id.replace("add", ""));
    if (e.childNodes.length >= 19 || (l.id.indexOf("criteria") > 0 && e.childNodes.length >= 4)) {
        l.style.display = "none"
    }
    var b = e.childNodes[0].lastChild;
    if (b.nodeName != "A") {
        fi_appendRemoveLink(e.childNodes[0])
    } else {
        b.firstChild.nodeValue = LANG.firemove;
        b.onmouseup = fi_removeCriterion
    }
    var j = $WH.ce("div"),
        k = e.childNodes[0].childNodes[0].cloneNode(true);
    k.onchange = k.onkeyup = fi_criterionChange.bind(0, k);
    k.i = null;
    if (h != null) {
        var g = k.getElementsByTagName("option");
        for (var f = 0; f < g.length; ++f) {
            if (g[f].value == h) {
                g[f].selected = true;
                break
            }
        }
    } else {
        k.firstChild.selected = true
    }
    j.appendChild(k);
    fi_appendRemoveLink(j);
    e.appendChild(j);
    return k
}
function fi_removeCriterion() {
    var e, f = this.parentNode,
        h = f.parentNode,
        g = (f.firstChild.name == "wt[]");
    h.removeChild(f);
    if (h.childNodes.length == 1) {
        e = h.firstChild;
        if (e.firstChild.selectedIndex > 0) {
            var b = e.lastChild;
            b.firstChild.nodeValue = LANG.ficlear;
            b.onmouseup = fi_clearCriterion
        } else {
            e.removeChild(e.lastChild);
            e.removeChild(e.lastChild)
        }
    }
    if (h.nextSibling.firstChild) {
        h.nextSibling.firstChild.style.display = ""
    }
    if (g) {
        e = $WH.ge("sdkgnsdkn436");
        e.selectedIndex = 0;
        e.i = 0;
        fi_presetMatch()
    }
}
function fi_clearCriterion() {
    var a = this.parentNode;
    a.firstChild.selectedIndex = 0;
    fi_criterionChange(a.firstChild)
}
function fi_appendRemoveLink(c) {
    c.appendChild($WH.ct(String.fromCharCode(160, 160)));
    var b = $WH.ce("a");
    b.href = "javascript:;";
    b.appendChild($WH.ct(LANG.firemove));
    b.onmouseup = fi_removeCriterion;
    b.onmousedown = b.onclick = $WH.rf;
    c.appendChild(b)
}
function fi_appendClearLink(c) {
    c.appendChild($WH.ct(String.fromCharCode(160, 160)));
    var b = $WH.ce("a");
    b.href = "javascript:;";
    b.appendChild($WH.ct(LANG.ficlear));
    b.onmouseup = fi_clearCriterion;
    b.onmousedown = b.onclick = $WH.rf;
    c.appendChild(b)
}
function fi_Lookup(h, d) {
    var j;
    if (d == null) {
        d = fi_type
    }
    if (fi_Lookup.cache == null) {
        fi_Lookup.cache = {}
    }
    if (fi_Lookup.cache[d] == null) {
        j = {};
        for (var b = 0, a = fi_filters[d].length; b < a; ++b) {
            if (!(g_user.roles & U_GROUP_EMPLOYEE) && fi_filters[d][b].staffonly) {
                continue
            }
            var g = fi_filters[d][b];
            j[g.id] = g;
            j[g.name] = g
        }
        fi_Lookup.cache[d] = j
    } else {
        j = fi_Lookup.cache[d]
    }
    if (h && typeof h == "string") {
        var e = h.charCodeAt(0);
        if (e >= "0".charCodeAt(0) && e <= "9".charCodeAt(0)) {
            h = parseInt(h)
        }
    }
    return j[h]
}
function fi_criterionChange(t, e, c) {
    var A;
    if (t.selectedIndex != t.i) {
        var m = t.options[t.selectedIndex],
            w = t.parentNode;
        if (w.childNodes.length > 1) {
            if (t.selectedIndex > 0 && t.i > 0) {
                var z = fi_Lookup(m.value);
                var y = fi_Lookup(t.options[t.i].value);
                if (z.type == y.type) {
                    return
                }
            }
            while (w.childNodes.length > 1) {
                w.removeChild(w.childNodes[1])
            }
        }
        if (t.selectedIndex > 0) {
            var l = fi_Lookup(m.value);
            var r = l.type.split("-");
            var x = r[0];
            var g = r[1] || "";
            var f;
            if (t.name == "cr[]" && x == "patch") {
                f = true;
                x = "num"
            }
            if (LANG.fidropdowns[x] != null) {
                if (t.name == "cr[]") {
                    var h = LANG.fidropdowns[x];
                    A = $WH.ce("select");
                    A.name = "crs[]";
                    var j = A;
                    if (g.indexOf("any") != -1) {
                        var s = $WH.ce("option");
                        s.value = "-2323";
                        s.appendChild($WH.ct(LANG.fiany));
                        $WH.ae(j, s);
                        if (e != null && e == "-2323") {
                            s.selected = true
                        }
                    }
                    for (var u = 0; u < h.length; ++u) {
                        if (h[u][0] !== null) {
                            var s = $WH.ce("option");
                            s.value = h[u][0];
                            s.appendChild($WH.ct(h[u][1]));
                            $WH.ae(j, s);
                            if (e != null && e == h[u][0]) {
                                s.selected = true
                            }
                        } else {
                            var j = $WH.ce("optgroup");
                            j.label = h[u][1];
                            $WH.ae(A, j)
                        }
                    }
                    if (g.indexOf("none") != -1) {
                        var s = $WH.ce("option");
                        s.value = "-2324";
                        s.appendChild($WH.ct(LANG.finone));
                        $WH.ae(j, s);
                        if (e != null && e == "-2324") {
                            s.selected = true
                        }
                    }
                    w.appendChild($WH.ct(" "));
                    w.appendChild(A)
                }
                var q = (x == "num");
                if (q) {
                    w.appendChild($WH.ct(" "))
                }
                if (f) {
                    A = $WH.ce("select");
                    for (var u = 0; u < fi_patches.length; ++u) {
                        var s = $WH.ce("option"),
                            k = fi_patches[u].split(".");
                        s.value = (k[0] * 1000) + (k[1] * 10) + k[2];
                        s.appendChild($WH.ct(fi_patches[u]));
                        $WH.ae(A, s);
                        if (c != null && c == s.value) {
                            s.selected = true
                        }
                    }
                } else {
                    A = $WH.ce("input");
                    A.type = "text";
                    if (c != null) {
                        A.value = c.toString()
                    } else {
                        A.value = "0"
                    }
                }
                if (t.name == "cr[]") {
                    A.name = "crv[]"
                } else {
                    A.name = "wtv[]";
                    A.onchange = fi_changeWeight.bind(0, A)
                }
                if (q) {
                    A.maxLength = 7;
                    A.style.textAlign = "center";
                    A.style.width = "4.5em"
                } else {
                    A.type = "hidden"
                }
                A.setAttribute("autocomplete", "off");
                w.appendChild(A);
                if (t.name == "wt[]") {
                    fi_sortWeight(A)
                }
            } else {
                if (x == "str") {
                    A = $WH.ce("input");
                    A.name = "crs[]";
                    A.type = "hidden";
                    A.value = "0";
                    w.appendChild(A);
                    A = $WH.ce("input");
                    A.type = "text";
                    if (g.indexOf("small") != -1) {
                        A.maxLength = 7;
                        A.style.textAlign = "center";
                        A.style.width = "4.5em"
                    } else {
                        A.maxLength = 50;
                        A.style.width = "9em"
                    }
                    A.name = "crv[]";
                    if (c != null) {
                        A.value = c
                    }
                    w.appendChild($WH.ct(" "));
                    w.appendChild(A)
                }
            }
        }
        if (w.parentNode.childNodes.length == 1) {
            if (t.selectedIndex > 0) {
                fi_appendClearLink(w)
            }
        } else {
            if (w.parentNode.childNodes.length > 1) {
                fi_appendRemoveLink(w)
            }
        }
        t.i = t.selectedIndex
    }
}
function fi_setCriteria(g, d, j) {
    var e = $WH.ge("fi_criteria");
    var f, h = e.childNodes[0].childNodes[0];
    e = h.getElementsByTagName("option");
    for (f = 0; f < e.length; ++f) {
        if (e[f].value == g[0]) {
            e[f].selected = true;
            if (fi_Lookup(g[0])) {
                g_trackEvent("Filters", fi_type, fi_Lookup(g[0]).name)
            }
            break
        }
    }
    fi_criterionChange(h, d[0], j[0]);
    var b = $WH.ge("fi_addcriteria");
    for (f = 1; f < g.length && f < 5; ++f) {
        fi_criterionChange(fi_addCriterion(b, g[f]), d[f], j[f]);
        if (fi_Lookup(g[f])) {
            g_trackEvent("Filters", fi_type, fi_Lookup(g[f]).name)
        }
    }
}
function fi_setWeights(q, m, d, e) {
    if (d) {
        var k = q[0],
            g = q[1],
            q = {};
        for (var h = 0; h < k.length; ++h) {
            var o = fi_Lookup(k[h]);
            if (o && o.type == "num" && !o.noweights && LANG.traits[o.name]) {
                q[o.name] = g[h]
            }
        }
    }
    var s = $WH.ge("fi_weight");
    if (fi_weights == null) {
        fi_weights = {};
        $WH.cO(fi_weights, q)
    }
    var o = $WH.ge("fi_addweight"),
        l = s.childNodes[0].childNodes[0];
    var h = 0;
    for (var r in q) {
        if (!LANG.traits[r]) {
            continue
        }
        if (h++ > 0) {
            l = fi_addCriterion(o, r)
        }
        var b = l.getElementsByTagName("option");
        for (var f = 0; f < b.length; ++f) {
            if (b[f].value && r == fi_Lookup(b[f].value).name) {
                b[f].selected = true;
                break
            }
        }
        fi_criterionChange(l, 0, q[r])
    }
    fi_weightsFactor = fi_convertWeights(q, true);
    if (!m) {
        if (!fi_presetMatch(q, e)) {
            fi_presetDetails()
        }
    }
}
function fi_changeWeight(b) {
    if ($("#fi_presets select option:selected").val() != -1) {
        var a = $WH.ge("sdkgnsdkn436");
        a.selectedIndex = 0;
        a.i = 0
    }
    fi_sortWeight(b);
    fi_presetMatch()
}
function fi_sortWeight(e) {
    var d, c = $WH.ge("fi_weight"),
        b = Number(e.value);
    e = e.parentNode;
    n = 0;
    for (d = 0; d < c.childNodes.length; ++d) {
        var a = c.childNodes[d];
        if (a.childNodes.length == 5) {
            n++;
            if (a.childNodes[2].nodeName == "INPUT" && b > Number(a.childNodes[2].value)) {
                c.insertBefore(e, a);
                return
            }
        }
    }
    c.insertBefore(e, c.childNodes[n])
}
function fi_convertWeights(c, g) {
    var e = 0,
        a = 0;
    for (var b in c) {
        if (!LANG.traits[b]) {
            continue
        }
        e += Math.abs(c[b]);
        if (Number(c[b]) > a) {
            a = Number(c[b])
        }
    }
    if (g) {
        return e
    }
    var d = {};
    for (var b in c) {
        d[b] = (LANG.traits[b] ? Math.round(1000 * c[b] / e) / 1000 : c[b])
    }
    return d
}
function fi_convertScore(b, a, c) {
    if (a == 1) {
        return parseInt(b * fi_weightsFactor)
    } else {
        if (a == 2) {
            return ((b / c) * 100).toFixed(1) + "%"
        } else {
            return b.toFixed(2)
        }
    }
}
function fi_updateScores() {
    if (++this._scoreMode > 2) {
        this._scoreMode = 0
    }
    for (var b = 0; b < this.data.length; ++b) {
        if (this.data[b].__tr) {
            var a = this.data[b].__tr.lastChild;
            a.firstChild.firstChild.nodeValue = fi_convertScore(this.data[b].score, this._scoreMode, this._maxScore)
        }
    }
}
function fi_presetClass(h, e) {
    if (h.selectedIndex != h.i) {
        var g, k, l = h.options[h.selectedIndex],
            j = h.parentNode,
            m = LANG.presets;
        fi_resetCriterion(s);
        var s = $WH.ge("sdkgnsdkn436");
        s.parentNode.style.display = "none";
        var a = 1000;
        if (h.i) {
            a = $($("#fi_presets select option")[h.i]).attr("value")
        }
        if (!e && (h.form.ub.selectedIndex == 0 || h.form.ub.value == a)) {
            $("select[name=ub] option[value=" + h.value + "]").attr("selected", "selected")
        }
        while (s.firstChild) {
            $WH.de(s.firstChild)
        }
        $WH.ae(s, $WH.ce("option"));
        if (h.selectedIndex > 0) {
            for (k in l._presets) {
                var q = l._presets[k];
                if (m[k] != null) {
                    var r = $WH.ce("optgroup");
                    r.label = m[k]
                } else {
                    r = s
                }
                for (var b in q) {
                    var f = $WH.ce("option");
                    f.value = b;
                    f._weights = q[b];
                    $WH.ae(f, $WH.ct(q[b].name ? q[b].name : m[b]));
                    $WH.ae(r, f)
                }
                if (m[k] != null && r && r.childNodes.length > 0) {
                    $WH.ae(s, r)
                }
            }
            if (s.childNodes.length > 1) {
                s.parentNode.style.display = ""
            }
        }
        fi_presetChange(s);
        h.i = h.selectedIndex
    }
}
function fi_presetChange(d) {
    if (d.selectedIndex != d.i) {
        fi_resetCriterion($WH.ge("fi_weight"));
        var c = d.options[d.selectedIndex];
        if (d.selectedIndex > 0) {
            if (d.form.elements.gm.selectedIndex == 0) {
                d.form.elements.gm.selectedIndex = 3
            }
            fi_resetCriterion($WH.ge("fi_weight"));
            fi_setWeights(c._weights, 1, 0)
        }
        d.i = d.selectedIndex;
        if (g_user.id > 0) {
            var b = $WH.ge("fi_remscale");
            b.style.display = (c._weights && c._weights.name ? "" : "none")
        }
    }
}
function fi_presetDetails() {
    var c = $WH.ge("fi_weight"),
        e = $WH.ge("fi_detail"),
        d = $WH.ge("fi_addweight");
    var b = g_toggleDisplay(c);
    d.style.display = "none";
    if (b) {
        e.firstChild.nodeValue = LANG.fihidedetails;
        if (c.childNodes.length < 19) {
            d.style.display = ""
        }
    } else {
        e.firstChild.nodeValue = LANG.fishowdetails
    }
    return false
}
function fi_presetMatch(m, a) {
    if (!m) {
        m = {};
        var r = $WH.ge("fi_weight");
        for (var f = 0; f < r.childNodes.length; ++f) {
            if (r.childNodes[f].childNodes.length == 5) {
                if (r.childNodes[f].childNodes[0].nodeName == "SELECT" && r.childNodes[f].childNodes[2].nodeName == "INPUT") {
                    var d = r.childNodes[f].childNodes[0].options[r.childNodes[f].childNodes[0].selectedIndex];
                    if (d.value) {
                        m[fi_Lookup(d.value)] = Number(r.childNodes[f].childNodes[2].value)
                    }
                }
            }
        }
    }
    var r = $WH.ge("fi_presets");
    var t = r.getElementsByTagName("select");
    if (t.length != 2) {
        return false
    }
    var b = fi_convertWeights(m);
    for (var f = 0; f < t[0].options.length; ++f) {
        var l = t[0].options[f].value;
        for (var k in t[0].options[f]._presets) {
            for (var q in t[0].options[f]._presets[k]) {
                p = fi_convertWeights(t[0].options[f]._presets[k][q]);
                var h = true;
                for (var o in p) {
                    if (!LANG.traits[o]) {
                        continue
                    }
                    if (!b[o] || p[o] != b[o]) {
                        h = false;
                        break
                    }
                }
                if (h) {
                    t[0].options[f].selected = true;
                    fi_presetClass(t[0], a);
                    for (var e = 0; e < t[1].options.length; ++e) {
                        if (q == t[1].options[e].value) {
                            t[1].options[e].selected = true;
                            fi_presetChange(t[1]);
                            break
                        }
                    }
                    return true
                }
            }
        }
    }
    return false
}
function fi_presetSave() {
    if (!g_user.id) {
        return
    }
    var d = $("#sdkgnsdkn436 option:selected").get(0),
        b = "",
        c = ((d._weights ? d._weights.id : 0) | 0),
        f = {
            id: c,
            name: b
        },
        j = $WH.ge("fi_weight"),
        e = 0;
    for (i = 0; i < j.childNodes.length; ++i) {
        var g = fi_Lookup($("[name=wt[]]", j.childNodes[i]).val()),
            h = $("[name=wtv[]]", j.childNodes[i]).val();
        if (g && h != 0) {
            f[g.name] = h;
            ++e
        }
    }
    if (e < 1 || (!(d._weights && d._weights.id) && g_user.weightscales && g_user.weightscales.length >= 5)) {
        return alert(LANG.message_weightscalesaveerror)
    }
    if (b = prompt(LANG.prompt_nameweightscale, $(d).text())) {
        var a = wowheadUrl + "/account=weightscales&save" + (c ? "&id=" + c : "") + "&name=" + $WH.urlencode(b) + "&scale=";
        f.name = b;
        e = 0;
        for (var g in f) {
            if (!LANG.traits[g]) {
                continue
            }
            if (e++ > 0) {
                a += ","
            }
            a += g + ":" + f[g]
        }
        new Ajax(a, {
            onSuccess: function (u, m) {
                var r = parseInt(u.responseText);
                if (r > 0) {
                    if (g_user.weightscales == null) {
                        g_user.weightscales = []
                    }
                    if (f.id) {
                        g_user.weightscales = $WH.array_filter(g_user.weightscales, function (o) {
                            return o.id != f.id
                        })
                    }
                    f.id = r;
                    g_user.weightscales.push(f);
                    var q = $("#fi_presets select").get(0),
                        v = $("option[value=-1]", q).get(0);
                    if (!v) {
                        v = $WH.ce("option");
                        v.value = -1;
                        $WH.ae(v, $WH.ct(LANG.ficustom));
                        $WH.aef(q, v);
                        $WH.aef(q, $("option", q).get(1))
                    }
                    v._presets = {
                        custom: {}
                    };
                    for (var l = 0, k = g_user.weightscales.length; l < k; ++l) {
                        v._presets.custom[g_user.weightscales[l].id] = g_user.weightscales[l]
                    }
                    v.selected = true;
                    v.parentNode.onchange();
                    var t = $("#sdkgnsdkn436 option[value=" + f.id + "]").get(0);
                    if (t) {
                        t.text = f.name;
                        t.selected = true;
                        t.parentNode.onchange()
                    }
                    alert(LANG.message_saveok)
                } else {
                    alert(LANG.message_weightscalesaveerror)
                }
            }
        })
    }
}
function fi_presetDelete() {
    if (!g_user.id) {
        return
    }
    var d = $("#fi_presets select").get(0),
        f = $("option:selected", d).get(0);
    if (f.value == -1) {
        var e = $("#sdkgnsdkn436 option:selected").get(0);
        if (e.value && confirm(LANG.confirm_deleteweightscale)) {
            new Ajax(wowheadUrl + "/account=weightscales&delete&id=" + e.value);
            g_user.weightscales = $WH.array_filter(g_user.weightscales, function (c) {
                return c.id != e.value
            });
            if (g_user.weightscales.length) {
                f._presets = {
                    custom: {}
                };
                for (var b = 0, a = g_user.weightscales.length; b < a; ++b) {
                    f._presets.custom[g_user.weightscales[b].id] = g_user.weightscales[b]
                }
            } else {
                $WH.de(f)
            }
            $WH.de(e);
            $("#fi_presets select").change()
        }
    }
}
function fi_scoreSockets(r) {
    if (fi_gemScores != null) {
        var g = 0,
            d = 0,
            a = 0;
        var b = [],
            v = [];
        var k = [],
            h = [];
        var o = {},
            m = {};
        var l = false;
        for (var f = 1; f <= 3; ++f) {
            var c = r["socket" + f],
                u = (c == 1 ? 1 : 0);
            if (c) {
                if (fi_gemScores[c]) {
                    for (var e = 0; e < fi_gemScores[c].length; ++e) {
                        var q = fi_gemScores[c][e];
                        if (q.socketLevel <= r.level && (q.uniqEquip == 0 || $WH.in_array(k, q.id) < 0)) {
                            g += q.score;
                            b.push(q.id);
                            o[f - 1] = 1;
                            if (q.uniqEquip == 1) {
                                k.push(q.id)
                            }
                            break
                        }
                    }
                } else {
                    l = true
                }
                if (fi_gemScores[u]) {
                    for (var e = 0; e < fi_gemScores[u].length; ++e) {
                        var q = fi_gemScores[u][e];
                        if (q.socketLevel <= r.level && (q.uniqEquip == 0 || $WH.in_array(h, q.id) < 0)) {
                            d += q.score;
                            v.push(q.id);
                            m[f - 1] = (q.colors & c);
                            if (q.uniqEquip == 1) {
                                h.push(q.id)
                            }
                            break
                        }
                    }
                }
            }
        }
        if (r.socketbonusstat && fi_weights && fi_weightsFactor != 0) {
            for (var f in fi_weights) {
                if (r.socketbonusstat[f]) {
                    a += r.socketbonusstat[f] * fi_weights[f] / fi_weightsFactor
                }
            }
        }
        r.scoreBest = d;
        r.scoreMatch = g + a;
        r.scoreSocket = a;
        if (r.scoreMatch >= r.scoreBest && !l) {
            r.matchSockets = o;
            r.gemGain = r.scoreMatch;
            r.gems = b
        } else {
            r.matchSockets = m;
            r.gemGain = r.scoreBest;
            r.gems = v
        }
        r.score += r.gemGain
    }
    if (r.score > this._maxScore || !this._maxScore) {
        this._maxScore = r.score
    }
    if (fi_upgradeId && r.id == fi_upgradeId) {
        this._minScore = r.score;
        r.upgraded = 1
    }
}
function fi_dropdownSync(a) {
    if (a.selectedIndex >= 0) {
        a.className = a.options[a.selectedIndex].className
    }
}
function fi_init(a) {
    fi_type = a;
    fi_initCriterion($WH.ge("fi_criteria"), "cr[]", a);
    if (a == "items") {
        var c = $WH.ge("fi_presets");
        if (c) {
            fi_initPresets($WH.ge("fi_presets"));
            fi_initCriterion($WH.ge("fi_weight"), "wt[]", a)
        }
    }
    var b = $WH.ge("ma-0");
    if (b.getAttribute("checked")) {
        b.checked = true
    }
    $(document).ready(function () {
        if (!location.hash.length) {
            $("#fi form input:first").focus()
        }
    })
}
function fi_initCriterion(h, a, j) {
    var b = h.firstChild;
    var m = $WH.ce("select");
    m.name = a;
    m.onchange = m.onkeyup = fi_criterionChange.bind(0, m);
    $WH.ae(m, $WH.ce("option"));
    var l = null;
    var k = LANG["fi" + j];
    for (var f = 0, g = fi_filters[j].length; f < g; ++f) {
        if (!(g_user.roles & U_GROUP_EMPLOYEE) && fi_filters[j][f].staffonly) {
            continue
        }
        var c = fi_filters[j][f];
        if (!c.type) {
            if (l && l.childNodes.length > 0) {
                $WH.ae(m, l)
            }
            l = $WH.ce("optgroup");
            l.label = (LANG.traits[c.name] ? LANG.traits[c.name] : k[c.name])
        } else {
            if (a != "wt[]" || (c.type == "num" && !c.noweights)) {
                var d = $WH.ce("option");
                d.value = c.id;
                var e = LANG.traits[c.name] ? LANG.traits[c.name][0] : k[c.name];
                if (c.indent) {
                    e = "- " + e
                }
                $WH.ae(d, $WH.ct(e));
                $WH.ae(l, d)
            }
        }
    }
    if (l && l.childNodes.length > 0) {
        $WH.ae(m, l)
    }
    $WH.ae(b, m)
}
function fi_initPresets(h) {
    var e, q = $WH.ce("select");
    q.onchange = q.onkeyup = fi_presetClass.bind(0, q, 0);
    $WH.ae(q, $WH.ce("option"));
    if (g_user.weightscales != null && g_user.weightscales.length) {
        var d = $WH.ce("option");
        d.value = -1;
        d._presets = {
            custom: {}
        };
        $WH.ae(d, $WH.ct(LANG.ficustom));
        $WH.ae(q, d);
        for (var f = 0, g = g_user.weightscales.length; f < g; ++f) {
            d._presets.custom[g_user.weightscales[f].id] = g_user.weightscales[f]
        }
    }
    var m = [];
    for (var j in wt_presets) {
        m.push(j)
    }
    m.sort(function (o, c) {
        return $WH.strcmp(g_chr_classes[o], g_chr_classes[c])
    });
    for (var f = 0, g = m.length; f < g; ++f) {
        var j = m[f],
            d = $WH.ce("option");
        d.value = j;
        d._presets = wt_presets[j];
        $WH.ae(d, $WH.ct(g_chr_classes[j]));
        $WH.ae(q, d)
    }
    $WH.ae(h, q);
    var l = $WH.ce("span");
    l.style.display = "none";
    var q = $WH.ce("select");
    q.id = "sdkgnsdkn436";
    q.onchange = q.onkeyup = fi_presetChange.bind(0, q);
    $WH.ae(q, $WH.ce("option"));
    $WH.ae(l, $WH.ct(" "));
    $WH.ae(l, q);
    $WH.ae(h, l);
    $WH.ae(h, $WH.ct(String.fromCharCode(160, 160)));
    var k = $WH.ce("a");
    k.href = "javascript:;";
    k.id = "fi_detail";
    k.appendChild($WH.ct(LANG.fishowdetails));
    k.onclick = fi_presetDetails;
    k.onmousedown = $WH.rf;
    $WH.ae(h, k);
    if (g_user.id > 0) {
        $WH.ae(h, $WH.ct(String.fromCharCode(160, 160)));
        k = $WH.ce("a");
        k.href = "javascript:;";
        k.className = "icon-save";
        k.appendChild($WH.ct(LANG.fisavescale));
        k.onclick = fi_presetSave;
        k.onmousedown = $WH.rf;
        $WH.ae(h, k);
        $WH.ae(h, $WH.ct(String.fromCharCode(160, 160)));
        k = $WH.ce("a");
        k.href = "javascript:;";
        k.id = "fi_remscale";
        k.className = "icon-delete";
        k.style.display = "none";
        k.appendChild($WH.ct(LANG.fideletescale));
        k.onclick = fi_presetDelete;
        k.onmousedown = $WH.rf;
        $WH.ae(h, k)
    }
    var b = $WH.ge("gnjndfgkjdfg35");
    if (b) {
        g_addTooltip(b, LANG.tooltip_statweighting, (($WH.isset("g_thottbot") && g_thottbot) ? "w" : "q"))
    }
}
function fi_getExtraCols(f, e, l, m) {
    if (!f.length) {
        return
    }
    var g = [],
        j = LANG.fiitems;
    var c = 10;
    if (fi_weightsFactor) {
        c--
    }
    if (e) {
        c--
    }
    if (l) {
        c--
    }
    if (m) {
        c--
    }
    for (var d = 0; d < f.length && d < c; ++d) {
        var k = fi_Lookup(f[d]);
        if (k && k.name && k.type == "num") {
            var h = {
                id: k.name,
                value: k.name,
                name: (LANG.traits[k.name] ? LANG.traits[k.name][2] : j[k.name]),
                tooltip: (LANG.traits[k.name] ? LANG.traits[k.name][0] : j[k.name]),
                before: (k.before ? k.before : "source")
            };
            g.push(h)
        }
    }
    if (fi_weightsFactor) {
        if (e) {
            g.push({
                id: "gems",
                name: LANG.gems,
                getValue: function (a) {
                    return a.gems.length
                },
                compute: function (r, t) {
                    if (!r.nsockets || !r.gems) {
                        return
                    }
                    var b = [];
                    for (var o = 0; o < r.nsockets; o++) {
                        b.push(r["socket" + (o + 1)])
                    }
                    var a = "",
                        o = 0;
                    for (var q in r.socketbonusstat) {
                        if (LANG.traits[q]) {
                            if (o++ > 0) {
                                a += ", "
                            }
                            a += "+" + r.socketbonusstat[q] + " " + LANG.traits[q][2]
                        }
                    }
                    Listview.funcBox.createSocketedIcons(b, t, r.gems, r.matchSockets, a)
                },
                sortFunc: function (q, o, r) {
                    return $WH.strcmp((q.gems ? q.gems.length : 0), (o.gems ? o.gems.length : 0))
                }
            })
        }
        if (l) {
            g.push({
                id: "reforge",
                name: LANG.reforge,
                getValue: function (a) {
                    return a.reforge.amount
                },
                compute: function (a, b) {
                    if (a.reforge.amount) {
                        $(b).append('<span class="q10">-' + a.reforge.amount + " " + LANG.traits[a.reforge.s1][2] + "</span>").append("<br />").append('<span class="q2">+' + a.reforge.amount + " " + LANG.traits[a.reforge.s2][2] + "</span>")
                    }
                },
                sortFunc: function (q, o, r) {
                    return $WH.strcmp(q.reforge.amount, o.reforge.amount)
                }
            })
        }
        g.push({
            id: "score",
            name: LANG.score,
            width: "7%",
            value: "score",
            compute: function (o, q) {
                var b = $WH.ce("a");
                b.href = "javascript:;";
                b.onclick = fi_updateScores.bind(this);
                b.className = (o.gemGain > 0 ? "q2" : (($WH.isset("g_thottbot") && g_thottbot) ? "w" : "q1"));
                $WH.ae(b, $WH.ct(fi_convertScore(o.score, this._scoreMode, this._maxScore)));
                $WH.ae(q, b)
            }
        })
    }
    if (m) {
        g.push(Listview.extraCols.cost)
    }
    fi_nExtraCols = g.length;
    return g
}
function fi_getReputationCols(factions) {
    var res = [];
    for (var i = 0, len = factions.length; i < len; ++i) {
        var name = factions[i][1];
        if (name.length > 15) {
            var words = factions[i][1].split(" ");
            for (var j = 0, len2 = words.length; j < len2; ++j) {
                if (words[j].length > 3) {
                    name = (words[j].length > 15 ? words[j].substring(0, 12) + "..." : words[j]);
                    break
                }
            }
        }
        var col = {
            id: "faction-" + factions[i][0],
            name: name,
            tooltip: factions[i][1],
            type: "num",
            before: "category"
        };
        eval("col.getValue = function(quest) { return Listview.funcBox.getQuestReputation(" + factions[i][0] + ", quest) }");
        eval("col.compute = function(quest, td) { return Listview.funcBox.getQuestReputation(" + factions[i][0] + ", quest) }");
        eval("col.sortFunc = function(a, b, col) { var _ = Listview.funcBox.getQuestReputation; return $WH.strcmp(_(" + factions[i][0] + ", a), _(" + factions[i][0] + ", b)) }");
        res.push(col)
    }
    return res
}
function fi_setFilterParams(b, a) {
    return fi_mergeFilterParams(null, b, a)
}
function fi_mergeFilterParams(d, f, a) {
    var b = fi_filterParamToJson(d);
    var c = fi_filterParamToJson(f);
    if (a && a.match("filter=")) {
        menuJson = fi_filterParamToJson($WH.g_parseQueryString(a.replace(/^.*?filter=/, "filter=")).filter);
        c = fi_removeMenuCriteria(c, menuJson)
    }
    var e = $.extend(c, b);
    return fi_filterJsonToParam(e)
}
function fi_removeMenuCriteria(b, d) {
    if (d.cr && b.cr && b.crs && b.crv) {
        var c = d.cr.split(":"),
            a = {
                cr: b.cr.split(":"),
                crs: b.crs.split(":"),
                crv: b.crv.split(":")
            };
        $.each(c, function (e, f) {
            var g = $.inArray(f, a.cr);
            if (g != -1) {
                a.cr.splice(g, 1);
                a.crs.splice(g, 1);
                a.crv.splice(g, 1)
            }
        });
        b.cr = a.cr.join(":");
        b.crs = a.crs.join(":");
        b.crv = a.crv.join(":")
    }
    return b
}
function fi_filterParamToJson(a) {
    var b = {};
    if (a) {
        var c = a.split(";");
        $.each(c, function (d, e) {
            $WH.g_splitQueryParam(e, b)
        })
    }
    return b
}
function fi_filterJsonToParam(b) {
    var c = "";
    var a = 0;
    $.each(b, function (d, e) {
        if (e !== "") {
            if (a++ > 0) {
                c += ";"
            }
            c += d + "=" + e
        }
    });
    return c
};