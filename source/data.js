var cardRarities =
[
    {
        text: "Common",
        formula: "Cost * 1.35"
    },
    {
        text: "Uncommon",
        formula: "Cost * 1.55"
    },
    {
        text: "Rare",
        formula: "Cost * 1.9"
    }
]

var cardModifiers =
[
    {
        text: "Exhaust",
        formula: "(Total) * (1 - (Rarity * 0.1))"
    },
    {
        text: "Ethereal",
        formula: "(Total) * 0.9"
    },
    {
        text: "Retain",
        formula: "(Total) * 1.2"
    },
    {
        text: "Innate",
        formula: "(Total) * 1.1"
    },
    {
        text: "Haste",
        formula: "(Total) + 0.3"
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
        formula: "($) * (1 - (0.1 * (Cost + 1)))"
    },
    {
        text: "On Exhaust:",
        formula: "($) * 0.5"
    },
    {
        text: "On Discard:",
        formula: "($) * 0.8"
    }
];

var effectTypes = 
[
    {
        text: "Deal X damage.",
        formula: "X * 0.111"
    },
    {
        text: "Deal X damage (AoE).",
        formula: "X * 0.143"
    },
    {
        text: "Gain X Block.",
        formula: "X * 0.125"
    },
    {
        text: "Draw X card(s).",
        formula: "X * 0.35"
    },
    {
        text: "Draw X card(s) next turn.",
        formula: "X * 0.24"
    },
    {
        text: "Gain X Energy.",
        formula: "X * 0.96"
    },
    {
        text: "Gain X Energy next turn.",
        formula: "X * 0.55"
    },
    {
        text: "Motivate X.",
        formula: "X * 0.8"
    },
    {
        text: "Cycle X card(s).",
        formula: "X * 0.25"
    },
    {
        text: "Exhaust X card(s).",
        formula: "X * 0.25"
    },
    {
        text: "Exhaust X random card(s).",
        formula: "X * 0.15"
    },
    {
        text: "Discard X card(s).",
        formula: "-0.05 * X"
    },
    {
        text: "Discard X card(s).",
        formula: "-0.12 * X"
    },
    {
        text: "Apply X Weak.",
        formula: "X * 0.3"
    },
    {
        text: "Apply X Weak (AoE).",
        formula: "X * 0.5"
    },
    {
        text: "Apply X Vulnerable.",
        formula: "X * 0.3"
    },
    {
        text: "Apply X Vulnerable (AoE).",
        formula: "X * 0.5"
    },
    {
        text: "Apply X Poison.",
        formula: "X * 0.2"
    },
    {
        text: "Apply X Poison (AoE).",
        formula: "X * 0.35"
    },
	{
        text: "Apply X Burning.",
        formula: "X * 0.28"
    },
    {
        text: "Apply X Burning (AoE).",
        formula: "X * 0.42"
    },
	{
        text: "Take X Damage.",
        formula: "-0.125 * X"
    },
    {
        text: "Special Effect (X).",
        formula: "X * 1.0"
    },
	{
        text: "Gain X Force.",
        formula: "X * X * 0.2"
    },
	{
        text: "Gain X Agility.",
        formula: "X * X * 0.25"
    },
	{
        text: "Gain X Intellect.",
        formula: "X * X * 0.28"
    },
	{
        text: "Boost X Force.",
        formula: "X * X * 0.32"
    },
	{
        text: "Boost X Agility.",
        formula: "X * X * 0.37"
    },
	{
        text: "Boost X Intellect.",
        formula: "X * X * 0.40"
    },
	{
        text: "Take X Damage.",
        formula: "-0.125 * X"
    }
];