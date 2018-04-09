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
    }
    
}