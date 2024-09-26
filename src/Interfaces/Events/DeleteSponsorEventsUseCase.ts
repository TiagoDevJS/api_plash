export interface DeleteSponsorEventsUseCaseInterface {
    execute(eventID:number,sponsorID:number):Promise<boolean>
}