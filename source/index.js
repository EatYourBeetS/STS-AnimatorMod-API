/// <reference path="data.js" />

function SetDropdownOptions(id, items)
{
    var select = document.getElementById(id);
    if (select == null)
    {
        select = document.getElementsByName(id)[0];
    }

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
    $("#CardModifiers").select2({ containerCssClass: "shadow-xs-inset" });
}

function Round(number)
{
    return Number(parseFloat(number).toFixed(3));
}

function AddFormula(refresh)
{
    var res = $('#EffectTemplate').clone().insertBefore("#TemplateRoot");
    res.find('.advancedDropdown').select2({ containerCssClass: "shadow-xs-inset", sorter: d => d.sort((a, b) => a.text < b.text ? -1 : a.text > b.text ? 1 : 0)});
    res.removeAttr('id');
    res.removeAttr("hidden");
    res.attr("name", "EffectFormula");

    if (refresh)
    {
        RefreshAll();
    }

    return res;
}

function RefreshAll()
{
    var card = UpdateCard();

    card.Details = "[" + card.Cost + "-Cost " + card.RarityName;
    if (card.Upgrade > 0)
    {
        card.Details += " (+" + card.Upgrade + ")";
    }
    card.Details += " {" + card.Value + " / " + card.MaxValue + "}]\n";

    for (var i = 0; i < card.Modifiers.length; i++)
    {
        card.Details += card.Modifiers[i].text + ". ";
    }

    for (var i = 0; i < card.Effects.length; i++)
    {
        card.Details += card.Effects[i].Details + " ";
    }

    var total = $("#Total");
    total.val("Total: " + Round(card.Value) + " (Max Expected: " + card.MaxValue + ")");
    total.removeClass("border-danger")
    total.removeClass("border-success")

    if (card.Value > 0)
    {
        if (card.Value > card.MaxValue || card.Value < (card.MaxValue / 2))
        {
            total.addClass("border-danger");
        }
        else
        {
            total.addClass("border-success");
        }
    }

    $("#Summary").val(card.Details);

    Export(card);
}

function Import()
{   
    var obj;
    try
    {
        var json = $("#CardJsonData").val();
        if (json == null || json.length == 0)
        {
            return;
        }

        obj = JSON.parse(json);
    }
    catch (ex)
    {
        alert("Invalid Json");
        return;
    }
    
    canRefresh = false;

    $('#CardCost').val(obj.C);
    $('#CardUpgrade').val(obj.U);
    $('#CardRarity').val(obj.R);
    $('#CardModifiers').val(obj.M).trigger('change');
    $('[name="EffectFormula"]').remove();
    
    for (var i = 0; i < obj.E.length; i++)
    {
        var effect = obj.E[i];
        var div = AddFormula(false);
        div.find("[name=EffectAmount").val(effect.X);
        div.find("[name=EffectType").val(effect.T).trigger('change');
        div.find("[name=EffectModifier1").val(effect.M1);
        div.find("[name=EffectModifier2").val(effect.M2);
    }
    
    canRefresh = true;
    RefreshAll();
}

function Export(card)
{
    var obj = {};

    obj.C = card.Cost;
    obj.R = card.Rarity - 1;
    obj.U = card.Upgrade;
    obj.M = card.Modifiers.map(m => cardModifiers.indexOf(m));
    obj.E = [];
    for (var i = 0; i < card.Effects.length; i++)
    {
        var effect = card.Effects[i];
        obj.E.push(
        {
            X: effect.Amount,
            M1: effect.Mod1_Index,
            M2: effect.Mod2_Index,
            T: effect.Type_Index
        });
    }
    
    return $("#CardJsonData").val(JSON.stringify(obj));
}

function UpdateCard()
{
    var card = {};

    card.Cost = parseInt($('#CardCost').val()) || 0;
    card.Upgrade = parseInt($('#CardUpgrade').val()) || 0;
    card.Rarity = parseInt($('#CardRarity').val()) + 1;
    card.RarityName = cardRarities[card.Rarity - 1].text;
    card.Effects = [];
    card.Modifiers = [];
    card.Value = 0;

    var items = $('#CardModifiers').val();
    for (var i = 0; i < items.length; i++)
    {
        card.Modifiers.push(cardModifiers[parseInt(items[i])]);
    }

    var cost = card.Cost;
    if (card.Rarity == 1) // Common
    {
        card.MaxValue = (cost == 0 ? 0.56 : cost == 1 ? 1.35 : (cost * 0.94));
    }
    else if (card.Rarity  == 2) // Uncommon
    {
        card.MaxValue = (cost == 0 ? 0.66 : cost == 1 ? 1.45 : (cost * 1.02));
    }
    else if (card.Rarity  == 3) // Rare
    {
        card.MaxValue = (cost == 0 ? 0.86 : cost == 1 ? 1.7 : (cost * 1.06));
    }

    card.MaxValue = Round(card.Upgrade <= 0 ? card.MaxValue : (card.MaxValue * (1 + (card.Upgrade * (cost == 0 ? 0.45 : 0.25)))));

    $('[name="EffectFormula"]').each(function (_, item)
    {
        var effect = UpdateEffect($(item), card);
        card.Effects.push(effect);
        card.Value += effect.Value;
    });

    for (var i = 0; i < card.Modifiers.length; i++)
    {
        card.Value = eval(card.Modifiers[i].formula);
    }

    card.Value = Round(card.Value);

    return card;
}

function UpdateEffect(div, card)
{
    var effect = {};
    var copy = {};

    var typeInput = div.find("[name=EffectType]");
    var mod1Input = div.find("[name=EffectModifier1]");
    var mod2Input = div.find("[name=EffectModifier2]");
    var amountInput = div.find("[name=EffectAmount");

    effect.Amount = Round(parseFloat(amountInput.val() || 0));
    effect.Type_Index = parseInt(typeInput.val());
    effect.Mod1_Index = parseInt(mod1Input.val());
    effect.Mod2_Index = parseInt(mod2Input.val());

    effect.Type = effect.Type_Index >= 0 ? effectTypes[effect.Type_Index] : null;
    effect.Mod1 = effect.Mod1_Index >= 0 ? effectModifiers1[effect.Mod1_Index] : null;
    effect.Mod2 = effect.Mod2_Index >= 0 ? effectModifiers2[effect.Mod2_Index] : null;
    
    Object.assign(copy, effect.Type);  

    if ('disable_x' in copy)
    {
        amountInput.attr("disabled", "disabled");
        amountInput.val(effect.Amount = 1);
    }
    else
    {
        amountInput.removeAttr("disabled");
    }

    if ('disable_mod' in copy)
    {
        effect.Mod1_Index = -1;
        mod1Input.attr("disabled", "disabled");
        mod1Input.val(effect.Mod1 = null);

        effect.Mod2_Index = -1;
        mod2Input.attr("disabled", "disabled");
        mod2Input.val(effect.Mod2 = null);
    }
    else
    {
        mod1Input.removeAttr("disabled");
        mod2Input.removeAttr("disabled");
    }

    if (effect.Mod2 != null)
    {
        copy.text = effect.Mod2.text + " " + copy.text;
        copy.formula = effect.Mod2.formula.replace("$", copy.formula);
    }
    
    if (effect.Mod1 != null)
    {
        copy.text = effect.Mod1.text + " " + copy.text;
        copy.formula = effect.Mod1.formula.replace("$", copy.formula);
    }
      
    // 'X' and 'card' are referenced in eval()
    var X = effect.Amount;
    effect.Value = Round(eval(copy.formula));
    // -

    effect.Text = copy.text.replace('X', Round(X));
    effect.Details = effect.Text + " {" + effect.Value + "}.";

    return effect;
}
