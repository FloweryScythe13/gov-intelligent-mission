import { Morphism } from './morphism';
import { MorphicNode } from './morphicNode';

export class VisNode {
    
    // Public Fields
    
    public id: string;
    public name: string;
    public type: NodeType;
    public title: string;
    // public cid:number;
    // public color:string;

    // Private Mutators
    public setId(other: string): void {
        this.id = other;
    }

    public setName(other: string): void {
        this.name = other;
    }

    public setType(other: NodeType): void {
        this.type = other;
    }


    public setTitle(other : string): void {
        this.title = other;
    }

    // Ctors
    constructor(node: MorphicNode){
        if (node){
            this.setId(node.id);
            this.setName(node.name);
            //this.setType(node.type);
            // this.setTitle(
            //     // '<u>' + 'Person' + '</u>'
            //     // + '<br>' + 
            //     '<b>' + 'Name: ' + '</b>' + `${node.emailName}`
            //     + '<br>' + '<b>' + 'Email Address : ' + '</b>' + `${node.emailAddress}`
            //     + '<br>' + '<b>' + 'Total Emails: ' + '</b>' + `${node.emailsSent + node.emailsReceived}`
            //     + '<br>' + '<b>' + 'Sent : ' + '</b>' + `${node.emailsSent}`
            //     + '<br>' + '<b>' + `Received : ` + '</b>' + `${node.emailsReceived}`
            // + '<br><i>' + '(Double click to view)' + '</i>'
            // );  
        }
    }

}

export class VisEdge {
    
    // Class Fields
    public from: string;
    public to: string;
    // public title: string;
    //public ype: number;

    
    // Private Mutators
    private setFrom(other : string): void {
        this.from = other;
    }

    private setTo(other: string): void {
        this.to = other;
    }
    
    // private setType(other: number): void {
    //     this.valuevalue = other;
    // }
    
    // Public Mutators
    // public setTitle(other : string): void {
    //     this.title = other;
    // }
    
    // Ctors
    constructor(morphism : Morphism){
        // this.setFrom(morphism.sourceId);
        // this.setTo(morphism.targetId);
        // this.setTitle(interaction.emailCount 
            // + ' emails sent' 
            // + '<br><i>' 
            // + '(Double click to view)'
            // + '</i>'
            // );
        //this.setValue(morphism.emailCount);
    }
}

export enum NodeType {
    action = 0,
    event = 1
}