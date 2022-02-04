let button = document.querySelector('.btn');

let derivation = document.querySelector('.derivation')


button.onclick = function() {

    let str = document.querySelector('.default').value;

    let choice = document.querySelector('select').value;

    let strPub = {
        "а": ["ы", "е", "у", "ой", "е"],
        "(ш/ж/к/ч)а": ["%и", "%е", "%у", "%ой", "%е"],
        "б/в/м/г/д/ж/к/н/п/ф/ч/ц/щ/р/х": ["%а", "%у", "%а", "%ом", "%е"],
        "з/м/л/т": ["%а", "%у", "%", "%ом", "%е"],
        "и": ["ей", "ям", "%", "ями", "ях"],
        "ый": ["ого", "ому", "%", "ым", "ом"],
        "й": ["я", "ю", "я", "ем", "е"],
        "о": ["а", "у", "%", "ом", "е"],
        "с/ш": ["%а", "%у", "%", "%ом", "%е"],
        "ь": ["я", "ю", "я", "ем", "е"],
        "уль": ["ули", "уле", "улю", "улей", "уле"],
        "(ч/ш/д/т)ь": ["%и", "%и", "%ь", "%ью", "%и"],
        "я": ["и", "е", "ю", "ей", "е"],
    };
    let cases = {
        "р": 0,
        "д": 1,
        "в": 2,
        "т": 3,
        "п": 4
    };
    let exs = { 
        "ц": 2,
        "ок": 2
    };
    let lastIndex;
    let reformedStr;
    let forLong;
    let splitted;
    let groupped;
    let forPseudo;

    for(let i in strPub){

        if (str == '') {
            alert('Строка пуста');
            derivation.value = ''
            return false
        }
        else {
            if(i.length > 1 && str.slice(-i.length) == i) {
                lastIndex = i;
                reformedStr = str.slice(0, -lastIndex.length);
                break;
            }
            else if (/[\(\)]+/g.test(i)) {
                i.replace(/\(([^\(\)]+)\)([^\(\)]+)?/g, function(a, b, c){
                    splitted = b.split("/");
                    for (let o = 0; o < splitted.length; o++) {
                        groupped = splitted[o] + c;
                        strPub[groupped] = strPub[i];
                        if (str.slice(-groupped.length) == groupped) {
                            for (let x = 0, eachSplited = strPub[groupped];x < eachSplited.length; x++) {
                                eachSplited[x] = eachSplited[x].replace("%", splitted[o]);
                            }
                            reformedStr = str.slice(0, -groupped.length);
                            forPseudo = groupped;
                        }
                    }
                })
            }
            else {
                if (lastIndex == 'ы' || lastIndex == 'и') {
                    alert('слово должно быть в едиственном числе');
                    document.querySelector('.default').value = '';
                    return false
                }
                lastIndex = str.slice(-1);
                reformedStr = str.slice(0, -(forPseudo || lastIndex).length);
            }
            if (/\//.test(i) && !(/[\(\)]+/g.test(i)) && new RegExp(lastIndex).test(i)) {
                forLong = i;
            }
            for (let n in exs) {
                if (str.slice(-n.length) == n)reformedStr = str.slice(0, -exs[n]);
            }
        }
    }
    derivation.value = reformedStr + strPub[(forPseudo || forLong || lastIndex)][cases[choice]].replace("%", lastIndex)
}





