import { NodeType } from './vis';

export class MorphicNode {
    id: string;
    name: string;
    type: string;

    constructor(data?: any) {
        if (data) {
            this.id = data.id;
            this.name = data.label;
            this.type = data.group
        }
        
    }
}