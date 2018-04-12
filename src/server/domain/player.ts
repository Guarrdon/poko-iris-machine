import uuid from 'uuid-random';

import Resource from './resource'
import ResourceQuantity from './resourceQuantity'
import * as Errors from '../errors/errors'

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

    public AdjustAssetBalance(resourceId: string, amount: number): void {
        const asset = this.assets.find(x => x.resource.id == resourceId)
        if (asset == null)
            throw new Errors.ResourceDoesNotExist(resourceId)

        asset.quantity += amount
        if (asset.quantity < 0)
            throw new Errors.ResourceCanNotGoNegative()

        if (asset.resource.id == this.primaryResource.id && asset.quantity < 1)
            asset.quantity = 1
    }
    public AdjustPrimaryAssetBalance(amount: number): void {
        this.AdjustAssetBalance(this.primaryResource.id, amount)
    }

    public GetAssetQuantity(resourceId: string): number {
        const asset = this.assets.find(x => x.resource.id == resourceId)
        if (asset == null)
            throw new Errors.ResourceDoesNotExist(resourceId)

        return asset.quantity
    }
    public GetPrimaryAssetQuantity(): number {
        const asset = this.assets.find(x => x.resource.id == this.primaryResource.id)
        if (asset == null)
            throw new Errors.ResourceDoesNotExist(this.primaryResource.id)

        return asset.quantity
    }

}