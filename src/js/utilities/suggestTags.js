// src/js/utilities/suggestTags.js

const tagDictionary = {
    Education: /\b(school|education|learning|study|teach(ing)?)\b/i,
    Work: /\b(work|job|career|employment)\b/i,
    Health: /\b(health(care)?|wellness|medicine)\b/i,
    Travel: /\b(travel|tourism|vacation)\b/i,
    Technology: /\b(technology|computer|internet|web development)\b/i,
    Sports: /\b(sports|football|basketball|hockey|soccer)\b/i,

}

export function suggestTags(title) {
    const suggestTags = [];

    for (const [tag, regex] of Object.entries(tagDictionary)) {
        if (regex.test(title)) {
            suggestTags.push(tag);
        }
    }

    return suggestTags;
}