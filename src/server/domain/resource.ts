import uuid from 'uuid-random';


export default class Resource {

    id: string
    name: string

    constructor(resourceName: string) {
        this.id = uuid()
        this.name = resourceName
    }
}