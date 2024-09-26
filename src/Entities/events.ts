import { EventsInputDTO } from "../DTO/Events/inputDTO";
export type Sponsors = {
    id:number
}
export class Events {
    private name!: string;
    private organizer!: string;
    private email!: string;
    private phone!: string;
    private date_event_initial!: string;
    private date_event_end!: string;
    private descript!: string;
    private banner!: string;
    private cover!: string;
    private sponsors!:Sponsors[]
    constructor(props:EventsInputDTO){
        Object.assign(this, props)
    }
    static create (props:EventsInputDTO): Events {
        return new Events(props)
    }
    get getOrganizer ():string{
        return this.organizer
    }
    get getEmail ():string{
        return this.email
    }
    get getPhone ():string{
        return this.phone
    }
    get getName ():string{
        return this.name
    }
    get getEventInit ():string{
        return this.date_event_initial
    }
    get getEventEnd ():string{
        return this.date_event_end
    }
    get getDescription ():string{
        return this.descript
    }
    get getBanner ():string{
        return this.banner
    }
    get getCover ():string{
        return this.cover
    }
    get getSponsors ():Sponsors[]{
        return this.sponsors
    }

}