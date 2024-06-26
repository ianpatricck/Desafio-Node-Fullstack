import { randomUUID } from "crypto";

export class EventEntity {
  id: string;
  name: string;
  date: string;
  time: string;
  email: string;
  phone: string;
  type_id: string;
  place_id: string;

  constructor(event?: Partial<EventEntity>) {
    this.id = event?.id;
    this.name = event?.name;
    this.date = event?.date;
    this.email = event?.email;
    this.phone = event?.phone;
    this.type_id = event?.type_id;
    this.place_id = event?.place_id;
  }
}

export const defaultEventEntity: EventEntity = {
  id: '208aa018-eed3-435a-ba86-0741f045eaad',
  name: 'Evento agendado',
  date: '10/02/2025',
  time: '20:30h',
  email: 'teste@mail.com',
  phone: '(99) 99999-9999',
  type_id: '0b636dce-9ac4-4411-9180-54e5a16763bb',
  place_id: '702b52a0-4348-47f8-bf09-e5b5cd9c50fd',
};

export const eventEntityList: EventEntity[] = [
  defaultEventEntity,
  new EventEntity({ id: randomUUID(), ...defaultEventEntity }),
  new EventEntity({ id: randomUUID(), ...defaultEventEntity }),
  new EventEntity({ id: randomUUID(), ...defaultEventEntity }),
  new EventEntity({ id: randomUUID(), ...defaultEventEntity }),
];

export const eventEmptyEntityList: EventEntity[] = []; 

export const updatedEventEntity: EventEntity = {
  name: "Evento atualizado",
  ...defaultEventEntity
};

