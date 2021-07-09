export class AnalysisResult {
    nodeType: string;
    nodeName: string;
    baseScore: Number;
    tacticalOpeningsScore: Number;
    eventOpeningsScore: Number;
    leadingToStrategicObjectives: Array<String>;
    leadingToTacticalOpenings: Array<String>;
    leadingToEvents: Array<String>;

    public constructor(data?: any) {
        this.nodeType = data.NodeType;
        this.nodeName = data.NodeName;
        this.baseScore = data.BaseScore;
        this.tacticalOpeningsScore = data.TacticalOpeningsScore;
        this.eventOpeningsScore = data.EventOpeningsScore;
        this.leadingToStrategicObjectives = data.LeadingToStrategicObjectives;
        this.leadingToTacticalOpenings = data.LeadingToTacticalOpenings;
        this.leadingToEvents = data.LeadingToEvents;
    }
}


export class WebAnalysis {
    nodeType: string;
    analysisResults: AnalysisResult[];

}

export class WebAnalysisResult {
    actionAnalysis: WebAnalysis;
    eventAnalysis: WebAnalysis;
}