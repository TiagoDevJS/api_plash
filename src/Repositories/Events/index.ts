import { EventsOutputtDTO } from "../../DTO/Events/outputDTO";
import { Events } from "../../Entities/events";
import { EventsRepositoryInteface } from "../../Interfaces/Events/EventsRepositoryInterface";
import prisma from "../../Frameworks/server/prisma";
import logger from "../../adapters/winstomLogger";
import { singleton } from "tsyringe/dist/decorators";
import { BadRequestError } from "../../handleError/errors";
import { QueryEvents } from "../../DTO/Events/inputDTO";
import { skip } from "node:test";
import { Prisma } from "@prisma/client";
@singleton()
export class EventsRepository implements EventsRepositoryInteface {
  private prisma = prisma;
  constructor() {
    this.prisma = prisma;
  }
  async create(input: Events): Promise<string | null> {
    try {
      const data = {
        name: input.getName,
        email: input.getEmail,
        descript: input.getDescription,
        organizer: input.getOrganizer,
        phone: input.getPhone,
        date_event_initial: input.getEventInit,
        date_event_end: input.getEventEnd,
        banner: input.getBanner,
        cover: input.getCover,
        //Conecta os patrocinadores a oevento
        sponsors: {
          connect: input.getSponsors.map((sponsor) => ({ id: sponsor.id })),
        },
      };

      const event = await this.prisma?.eventsofMonth.create({
        data,
      });
      logger.info(`Evento criado com sucesso!`);
      return `Evento ${event?.name} criado com sucesso`;
    } catch (error) {
      logger.error(`Erro ao criar o evento : ${error}`);
      throw new BadRequestError(`Erro ao criar evento!`);
    }
  }
  async update(id: number, input: Events): Promise<string | null> {
    try {
      const sponsors = input.getSponsors
        ? input.getSponsors.map((sponsor) => ({ id: sponsor.id }))
        : undefined;
      const data = {
        name: input.getName,
        email: input.getEmail,
        descript: input.getDescription,
        organizer: input.getOrganizer,
        phone: input.getPhone,
        date_event_initial: input.getEventInit,
        date_event_end: input.getEventEnd,
        banner: input.getBanner,
        cover: input.getCover,
        //Conecta os patrocinadores a oevento
        sponsors: {
          connect: sponsors,
        },
      };
      await this.prisma?.eventsofMonth.update({
        where: {
          id,
        },
        data,
      });
      return `Evento Atualizado com sucesso!`;
    } catch (error) {
      logger.error(`Erro ao atualizar evento! :${error}`);
      throw new BadRequestError(`Erro ao atualizar o evento`);
    }
  }
  async delete(id: number): Promise<boolean> {
    try {
      const deleteEvent = await this.prisma?.eventsofMonth.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      logger.error(`Erro ao buscar evento ${error}`);
      throw new BadRequestError(`Erro interno ao deletar evento !`);
    }
  }
  async findAll(query: QueryEvents): Promise<EventsOutputtDTO[]> {
    try {
      const filter = {
        take: query.take,
        skip: query.skip,
        where: {
          name: {
            contains: query.name,
            mode: Prisma.QueryMode.insensitive,
          },
          email: {
            contains: query.email,
            mode: Prisma.QueryMode.insensitive,
          },
          organizer: {
            contains: query.organizer,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        include: {
          sponsors: {
            select: {
              id: true,

              url: true,
              cover: true,
            },
          },
        },
      };
      const events = await this.prisma?.eventsofMonth.findMany({
        take: filter.take,
        skip: filter.skip,
        where: filter.where,
        include:{
          sponsors:true
        }
      });
      return events as EventsOutputtDTO[];
    } catch (error) {
      logger.error(`Erro a buscar lista de eventos : ${error}`);
      throw new BadRequestError(`Erro a buscar lista de eventos`);
    }
  }
  async findID(id: number): Promise<EventsOutputtDTO | null> {
    try {
      const existEvent = await this.prisma?.eventsofMonth.findUnique({
        where: {
          id,
        },
        include:{
          sponsors:true
        }
      });
      return existEvent ? existEvent : null;
    } catch (error) {
      logger.error(`Erro ao buscar evento ${error}`);
      throw new BadRequestError(`Erro interno ao buscar eventos !`);
    }
  }
  async removeSponsorEvent(
    eventID: number,
    sponsorID: number
  ): Promise<boolean> {
    try {
     await prisma?.eventsofMonth.update({
        where: {
          id: Number(eventID),
        },
        data: {
          sponsors: {
            disconnect: {
              id: Number(sponsorID),
            },
          },
        },
      });
      return true;
    } catch (error) {
      logger.error(`Erro ao remover patrocinador do evento!`);
      throw new BadRequestError(`Erro ao remover o patrocinador do evento !`);
    }
  }
}
