import uuid from 'uuid-random';

import Resource from './resource'
import ResourceQuantity from './resourceQuantity'

export default class Player {

    id: string
    name: string
    primaryResource: Resource

    assets: ResourceQuantity[]

    constructor() {
        this.id = uuid()
        this.assets = new Array<ResourceQuantity>()
    }

    public CreateAssetLedger(resources: Resource[]): void {
        this.assets.push(new ResourceQuantity(this.primaryResource))
        for (let resource of resources) {
            if (resource.id != this.primaryResource.id)
                this.assets.push(new ResourceQuantity(resource))
        }

    }

}