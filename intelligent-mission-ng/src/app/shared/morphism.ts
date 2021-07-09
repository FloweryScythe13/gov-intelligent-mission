export class Morphism {
    source: string;
    target: string;
    sourceName: string;
    targetName: string;

    constructor(d : any) {
        this.source = d.from;
        this.target = d.to;
        // this.sourceName = d.sourceName;
        // this.targetName = d.targetName;
    }
}