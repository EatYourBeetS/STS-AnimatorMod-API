/// <reference path="data.js" />

function GetCost() 
{ 
    return parseInt($('#CardCost').val()) || 0; 
}

function GetUpgrade() 
{ 
    return parseInt($('#CardUpgrade').val()) || 0; 
}

function GetEffectAmount()
{ 
    return parseFloat($('#EffectAmount').val() || 0).toFixed(3);
}

function GetRarity() 
{ 
    return parseInt($('#CardRarity').val()) + 1;
    // var index = parseInt($('#CardRarity').val());
    // if (index >= 0)
    // {
    //     return cardRarities[index];
    // }
}

function GetRarityName() 
{ 
    return cardRarities[GetRarity() - 1].text;
}

function GetEffectTypeIndex()
{ 
    return parseInt($('#EffectType').val());
}

function GetEffectType()
{ 
    var index = GetEffectTypeIndex();
    if (index >= 0)
    {
        return effectTypes[index];
    }
}

function GetEffectModifierIndex1()
{
    return parseInt($('#EffectModifier1').val());
}

function GetEffectModifier1()
{ 
    var index = GetEffectModifierIndex1();
    if (index >= 0)
    {
        return effectModifiers1[index];
    }
}

function GetEffectModifierIndex2()
{
    return parseInt($('#EffectModifier2').val());
}

function GetEffectModifier2()
{ 
    var index = GetEffectModifierIndex2();
    if (index >= 0)
    {
        return effectModifiers2[index];
    }
}

function GetCardModifiers()
{ 
    var result = [];
    var items = $('#CardModifiers').val();
    for (var i = 0; i < items.length; i++)
    {
        result.push(cardModifiers[parseInt(items[i])]);
    }

    return result;
}

function SetDropdownOptions(id, items)
{
    var select = document.getElementById(id);
    for (var i = 0; i < items.length; i++)
    {
        select.options.add(new Option(items[i].text, i));
    }
}

function Setup()
{
    SetDropdownOptions("EffectType", effectTypes);
    SetDropdownOptions("EffectModifier1", effectModifiers1);
    SetDropdownOptions("EffectModifier2", effectModifiers2);
    SetDropdownOptions("CardModifiers", cardModifiers);
    SetDropdownOptions("CardRarity", cardRarities);
}

function Round(number)
{
    return Number(parseFloat(number).toFixed(3));
}

function AddFormula()
{
    var res = $('#EffectFormulaTemplate').clone().insertBefore('#Total');
    res.removeAttr('id');
    res.removeAttr("hidden");
    res.attr("name", "EffectFormula");
    res.attr("data-effectType", GetEffectTypeIndex());
    res.attr("data-effectAmount", GetEffectAmount());
    res.attr("data-effectModifier1", GetEffectModifierIndex1());
    res.attr("data-effectModifier2", GetEffectModifierIndex2());
    CalculateTotal();
}

function RefreshFormula(element)
{
    var copy = {};
    
    Object.assign(copy, effectTypes[element.attr("data-effectType")]);
    
    var mod2Index = element.attr("data-effectModifier2");
    if (mod2Index >= 0)
    {
        var mod2 = effectModifiers2[mod2Index];
        copy.text = mod2.text + " " + copy.text;
        copy.formula = mod2.formula.replace("$", copy.formula);
    }
    
    var mod1Index = element.attr("data-effectModifier1");
    if (mod1Index >= 0)
    {
        var mod1 = effectModifiers1[mod1Index];
        copy.text = mod1.text + " " + copy.text;
        copy.formula = mod1.formula.replace("$", copy.formula);
    }
      
    var X = parseFloat(element.attr("data-effectAmount"));
    var Cost = GetCost();
    var Rarity = GetRarity();
    var result = Round(eval(copy.formula));

    element.attr("data-text", copy.text.replace('X', Round(X)));
    element.find("input").val(copy.text.replace('X', Round(X)) + " (" + copy.formula + " = " + result + ")");

    return result;
}

function Export()
{
    var total = CalculateTotal();

    var text = "[" + GetCost() + "-Cost " + GetRarityName();
    var upgrade = GetUpgrade();
    if (upgrade > 0)
    {
        text += " (+" + upgrade + ")";
    }
    text += "]\n";

    var cardModifiers = GetCardModifiers();
    for (var i = 0; i < cardModifiers.length; i++)
    {
        text += cardModifiers[i].text + ". ";
    }

    $('[name="EffectFormula"]').each(function (index, item)
    {
        text += item.getAttribute("data-text") + " ";
    });

    text += "\n[" + total + " / " + CalculateMaxThreshold() + "]";

    $("#Export").parent().removeAttr("hidden");
    $("#Export").val(text);
}

function CalculateTotal()
{
    var Total = 0;
    $('[name="EffectFormula"]').each(function (index, item)
    {
        Total += RefreshFormula($(item));
    });

    var Cost = GetCost();
    var Rarity = GetRarity();

    var cardModifiers = GetCardModifiers();
    for (var i = 0; i < cardModifiers.length; i++)
    {
        Total = eval(cardModifiers[i].formula);
    }

    $("#Total").val("Total: " + Round(Total) + " (Max Expected: " + CalculateMaxThreshold() + ")");

    return Round(Total);
}

function CalculateMaxThreshold()
{
    var cost = GetCost();
    var rarity = GetRarity();
    var maxThreshold = cost;
    if (rarity == 1) // Common
    {
        maxThreshold = (cost == 0 ? 0.5 : cost == 1 ? 1.35 : (cost * 0.94));
    }
    else if (rarity == 2) // Uncommon
    {
        maxThreshold = (cost == 0 ? 0.6 : cost == 1 ? 1.45 : (cost * 1.02));
    }
    else if (rarity == 3) // Rare
    {
        maxThreshold = (cost == 0 ? 0.9 : cost == 1 ? 1.7 : (cost * 1.06));
    }

    var upgrade = GetUpgrade() || 0;
    if (upgrade > 0)
    {
        maxThreshold *= (1 + (upgrade * 0.25));
    }

    return Round(maxThreshold);
}