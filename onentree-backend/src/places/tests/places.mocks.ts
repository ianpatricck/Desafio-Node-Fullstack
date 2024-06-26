import { randomUUID } from "crypto";

export class PlaceEntity {
  id: string;
  name: string;
  nickname?: string;
  type_id: string;
  cnpj: string;
  city: string;
  cep: string;
  complement?: string;
  state: string;
  address: string;
  email: string;
  phone: string;
  inputs: string;
  turnstiles: string;

  constructor(place?: Partial<PlaceEntity>) {
    this.id = place?.id;
    this.name = place?.name;
    this.nickname = place?.nickname;
    this.type_id = place?.type_id;
    this.cnpj = place?.cnpj;
    this.city = place?.city;
    this.cep = place?.cep;
    this.complement = place?.complement;
    this.state = place?.state;
    this.address = place?.address;
    this.email = place?.email;
    this.phone = place?.phone;
    this.inputs = place?.inputs;
    this.turnstiles = place?.turnstiles;
  }
}

export const defaultPlaceEntity: PlaceEntity = {
  id: 'ebedb0cc-7ded-4ed8-86b3-21c1149eb20f',
  name: 'Algum lugar',
  nickname: 'Lugar',
  type_id: '79b14775-18ef-44ae-94fc-4f9dba698af2',
  cnpj: '312321322312',
  city: 'Cidade',
  cep: '23123121212',
  complement: '',
  state: 'SP',
  address: 'Endereço padrão',
  email: 'teste@mail.com',
  phone: '(99) 99999-9999',
  inputs: 'a, b, c',
  turnstiles: 'a, b',
};

export const placeEntityList: PlaceEntity[] = [
  defaultPlaceEntity,
  new PlaceEntity({ id: randomUUID(), ...defaultPlaceEntity }),
  new PlaceEntity({ id: randomUUID(), ...defaultPlaceEntity }),
  new PlaceEntity({ id: randomUUID(), ...defaultPlaceEntity }),
  new PlaceEntity({ id: randomUUID(), ...defaultPlaceEntity }),
];

export const updatedPlaceEntity: PlaceEntity = {
  name: 'Lugar atualizado',
  ...defaultPlaceEntity
};

