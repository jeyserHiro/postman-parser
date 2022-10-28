import parseCollection from "./parseCollection.js";

export function findItemOrGroup(itemGroup, match) {
    if (!itemGroup || !itemGroup.items) {
        return;
    }
    let matched;

    // lookup match on own children
    itemGroup.items.each(function (itemOrGroup) {
        if (itemOrGroup.id === match || itemOrGroup.name === match) {
            matched = itemOrGroup;
            return false; // exit the loop
        }
    });

    // if there is no match on own children, start lookup on grand children
    !matched && itemGroup.items.each(function (itemOrGroup) {
        matched = findItemOrGroup(itemOrGroup, match);
        if (matched) {
            return false;
        } // exit the loop
    });

    return matched;
}

function main() {
    const myCollection = parseCollection('postman-parser.json')
    let id
    myCollection.items.each((item) => {
        id = item.id

    })
    let name = 'Testing'
    let foundNode = findItemOrGroup(myCollection, id)
    console.debug("foundNode-", foundNode)
    foundNode = findItemOrGroup(myCollection, name)
    console.debug("foundNode-", foundNode)
}

// main()
