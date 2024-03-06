

const damageRelationship = (firstType, secondType, typesLenght) => {
    const damageFromFirstType = firstType.double_damage_from.map(type => type.name);
    const damageFromSecondType = typesLenght > 1 ? secondType.double_damage_from.map(type => type.name) : [];
    const halfDamageFromFirstType = firstType.half_damage_from.map(type => type.name);
    const halfDamageFromSecondType = typesLenght > 1 ? secondType.half_damage_from.map(type => type.name) : [];
    const noDamageFromFirstType = firstType.no_damage_from.map(type => type.name);
    const noDamageFromSecondType = typesLenght > 1 ? secondType.no_damage_from.map(type => type.name) : [];

    let twoTimesDamage = [];
    let fourTimesDamage = [];
    let doubleHalfDamage = [];
    let halfDamage = [];
    let noDamage = noDamageFromFirstType.concat(noDamageFromSecondType);

    damageFromFirstType.forEach(type => {
        if(damageFromSecondType.includes(type)) {
            fourTimesDamage.push(type);
        }
        if(!halfDamageFromSecondType.includes(type) && !noDamageFromSecondType.includes(type) && !fourTimesDamage.includes(type)){
            twoTimesDamage.push(type);
        }
    })

    damageFromSecondType.forEach(type => {
        if(!halfDamageFromFirstType.includes(type) && !noDamageFromFirstType.includes(type) && !fourTimesDamage.includes(type) && !twoTimesDamage.includes(type)) {
            twoTimesDamage.push(type);
        }
    })

    halfDamageFromFirstType.forEach(type => {
        if(halfDamageFromSecondType.includes(type)) {
            doubleHalfDamage.push(type);
        }
        if(!damageFromSecondType.includes(type) && !noDamageFromSecondType.includes(type) && !doubleHalfDamage.includes(type)){
            halfDamage.push(type);
        }
    })

    halfDamageFromSecondType.forEach(type => {
        if(!damageFromFirstType.includes(type) && !noDamageFromFirstType.includes(type) && !doubleHalfDamage.includes(type) && !halfDamage.includes(type)) {
            halfDamage.push(type);
        }
    })

    return typesLenght > 1 ?  {fourX: fourTimesDamage, twoX: twoTimesDamage, doubleHalfDamage: doubleHalfDamage, halfDamage: halfDamage, noDamage: noDamage} : {twoX: damageFromFirstType, halfDamage: halfDamageFromFirstType, noDamage: noDamageFromFirstType, fourX: [], doubleHalfDamage: []};
}

export default damageRelationship;