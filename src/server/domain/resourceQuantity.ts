import Resource from './resource';


export default class ResourceQuantity {

    resource: Resource;
    quantity: number;
    
    constructor(resource:Resource) { 
        this.resource = resource
        this.quantity = 0
    }
    
}