var cardRarities =
[
    {
        text: "Common",
        formula: ""
    },
    {
        text: "Uncommon",
        formula: ""
    },
    {
        text: "Rare",
        formula: ""
    }
]

var cardModifiers =
[
    {
        text: "Exhaust",
        formula: "(card.Value) * (1 - (card.Rarity * 0.1))"
    },
    {
        text: "Ethereal",
        formula: "(card.Value) * 0.9"
    },
    {
        text: "Retain",
        formula: "(card.Value) * 1.2"
    },
    {
        text: "Innate",
        formula: "(card.Value) * 1.1"
    },
    {
        text: "Haste",
        formula: "(card.Value) + 0.3"
    },
    {
        text: "Autoplay",
        formula: "(card.Value) * (1 - (card.Cost * 0.11))"
    }
]

var effectModifiers1 =
[
    {
        text: "Limited.",
        formula: "($) * 0.8"
    },
    {
        text: "Semi-Limited.",
        formula: "($) * 0.9"
    },
    {
        text: "Starter.",
        formula: "($) * 0.8"
    }
];

var effectModifiers2 =
[
    {
        text: "On Synergy:",
        formula: "($) * (1 - (0.1 * (card.Cost + 1)))"
    },
    {
        text: "On Exhaust:",
        formula: "($) * 0.5"
    },
    {
        text: "On Discard:",
        formula: "($) * 0.8"
    },
    {
        text: "In Stance:",
        formula: "($) * 0.5"
    },
    {
        text: "Not In Stance:",
        formula: "($) * 0.8"
    }
];

var effectTypes =
[
    {
        text: "Deal X damage",
        formula: "X * 0.111"
    },
    {
        text: "Deal X damage (AoE)",
        formula: "X * 0.143"
    },
    {
        text: "Gain X Block",
        formula: "X * 0.125"
    },
    {
        text: "Draw X card(s)",
        formula: "X * 0.35"
    },
    {
        text: "Draw X card(s) next turn",
        formula: "X * 0.24"
    },
    {
        text: "Gain X Energy",
        formula: "X * 0.89"
    },
    {
        text: "Gain X Energy next turn",
        formula: "X * 0.55"
    },
    {
        text: "Motivate X",
        formula: "X * 0.8"
    },
    {
        text: "Cycle X card(s)",
        formula: "X * 0.25"
    },
    {
        text: "Exhaust X card(s)",
        formula: "X * 0.25"
    },
    {
        text: "Exhaust X random card(s)",
        formula: "X * 0.15"
    },
    {
        text: "Discard X card(s)",
        formula: "-0.05 * X"
    },
    {
        text: "Discard X random card(s)",
        formula: "-0.12 * X"
    },
    {
        text: "Apply X Weak",
        formula: "X * 0.3"
    },
    {
        text: "Apply X Weak (AoE)",
        formula: "X * 0.5"
    },
    {
        text: "Apply X Vulnerable",
        formula: "X * 0.3"
    },
    {
        text: "Apply X Vulnerable (AoE)",
        formula: "X * 0.5"
    },
    {
        text: "Apply X Poison",
        formula: "X * 0.2"
    },
    {
        text: "Apply X Poison (AoE)",
        formula: "X * 0.35"
    },
    {
        text: "Apply X Burning",
        formula: "X * 0.28"
    },
    {
        text: "Apply X Burning (AoE)",
        formula: "X * 0.42"
    },
    {
        text: "Take X Damage",
        formula: "-0.125 * X"
    },
    {
        text: "Scry X",
        formula: "X * 0.22"
    },
    {
        text: "Lose X HP",
        formula: "-0.22 * X"
    },
    {
        text: "Special",
        formula: "X"
    },
    {
        text: "Gain X Temp. HP",
        formula: "X * 0.16"
    },
    {
        text: "Heal X HP [*]",
        formula: "X * 0.2"
    },
    {
        text: "Gain X Metallicize [*]",
        formula: "X * 0.4"
    },
    {
        text: "Gain X Plated Armor [*]",
        formula: "X * 0.3"
    },
    {
        text: "X Force Scaling",
        formula: "0.15 * (X ** 1.4)"
    },
    {
        text: "X Agility Scaling",
        formula: "0.15 * (X ** 1.4)"
    },
    {
        text: "X Intellect Scaling",
        formula: "0.15 * (X ** 1.4)"
    },
    {
        text: "Gain X Force",
        formula: "X * X * 0.2"
    },
    {
        text: "Gain X Agility",
        formula: "X * X * 0.25"
    },
    {
        text: "Gain X Intellect",
        formula: "X * X * 0.28"
    },
    {
        text: "Boost X Force",
        formula: "(X * X * 0.2) + 0.12"
    },
    {
        text: "Boost X Agility",
        formula: "(X * X * 0.25) + 0.12"
    },
    {
        text: "Boost X Intellect",
        formula: "(X * X * 0.28) + 0.12"
    },
    {
        text: "Enter Force Stance [*]",
        formula: "0.51",
        disable_x: true
    },
    {
        text: "Enter Agility Stance [*]",
        formula: "0.58",
        disable_x: true
    },
    {
        text: "Enter Intellect Stance [*]",
        formula: "0.64",
        disable_x: true
    },
    {
        text: "Lose no Force next turn",
        formula: "0.12",
        disable_x: true
    },
    {
        text: "Lose no Agility next turn",
        formula: "0.13",
        disable_x: true
    },
    {
        text: "Lose no Intellect next turn",
        formula: "0.14",
        disable_x: true
    },
    {
        text: "Channel X Frost",
        formula: "X * 0.55"
    },
    {
        text: "Channel X Lightning",
        formula: "X * 0.45"
    },
    {
        text: "Channel X Fire",
        formula: "X * 0.5"
    },
    {
        text: "Channel X Earth",
        formula: "X * 0.6"
    },
    {
        text: "Channel X Aether",
        formula: "X * 0.9"
    },
    {
        text: "Channel X Plasma",
        formula: "X * 1.5"
    },
    {
        text: "Channel X Dark",
        formula: "X * 0.58"
    },
    {
        text: "Add X Status to Hand",
        formula: "-0.08 * X"
    },
    {
        text: "Add X Status to Draw pile",
        formula: "-0.33 * X"
    },
    {
        text: "Add X Status to Discard pile",
        formula: "-0.22 * X"
    },
    {
        text: "Add X Curse(s) to Hand",
        formula: "-0.12 * X"
    },
    {
        text: "Add X Curse(s) to Draw pile",
        formula: "-0.38 * X"
    },
    {
        text: "Add X Curse(s) to Discard pile",
        formula: "-0.27 * X"
    },
    {
        text: "Gain X Orb Slot(s) [*]",
        formula: "X * 0.49"
    },
    {
        text: "Skip the enemy turn [*]",
        formula: "5.3",
        disable_x: true
    },
    {
        text: "Gain X Intangible [*]",
        formula: "X * 4.2"
    },
    {
        text: "Retain X card(s)",
        formula: "X * 0.21"
    },
    {
        text: "Gain X Throwing-Knives",
        formula: "X * 0.27"
    },
    {
        text: "Gain X Blur",
        formula: "X * 0.66"
    },
    {
        text: "Permanently Upgrade Itself",
        formula: "(card.Upgrade + 1) * 0.28",
        disable_mod: true,
        disable_x: true
    }
];