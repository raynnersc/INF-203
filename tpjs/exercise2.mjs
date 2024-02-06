"use strict";

export function wordc(s) {
    let result = {};
    let words = s.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (result[words[i]] === undefined) {
            result[words[i]] = 1;
        } else {
            result[words[i]]++;
        }
    }
    return result;
}

export class WList {
    constructor(s) {
        this.counts = wordc(s);
    }

    getWords() {
        return Object.keys(this.counts).sort();
    }

    maxCountWord() {
        return Object.keys(this.counts).sort((a, b) => this.counts[b] - this.counts[a])[0];
    }

    minCountWord() {
        return Object.keys(this.counts).sort((a, b) => this.counts[a] - this.counts[b])[0];
    }

    getCount(word) {
        return this.counts[word] || 0;
    }

    applyWordFunc(func) {
        const words = this.getWords();
        const results = [];

        for (const word of words) {
            results.push(func(word));
        }

        return results;
    }
}