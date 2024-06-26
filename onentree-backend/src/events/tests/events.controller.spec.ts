import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from '../events.controller';
import { EventsService } from '../events.service';
import { defaultEventEntity, eventEntityList, updatedEventEntity } from './events.mocks';
import { CreateEventDto } from '../dto/CreateEventDto';
import { UpdateEventDto } from '../dto/UpdateEventDto';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{
        provide: EventsService,
        useValue: {
          findAll: jest.fn().mockResolvedValue(eventEntityList),
          create: jest.fn().mockResolvedValue(defaultEventEntity),
          findOne: jest.fn().mockResolvedValue(defaultEventEntity),
          update: jest.fn().mockResolvedValue(updatedEventEntity),
          delete: jest.fn().mockResolvedValue(defaultEventEntity)
        }
      }]
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("findAll", () => {

    it ("should return a event list", async () => {
      const result = await controller.findAll();
      expect(result).toBe(eventEntityList);
    });

  });

  describe('create', ()=> {

    it ('should create a new event', async () => {

      const createEventDto: CreateEventDto = {
        name: 'Evento agendado',
        date: '10/02/2025',
        time: '20:30h',
        email: 'teste@mail.com',
        phone: '(99) 99999-9999',
        type_id: '0b636dce-9ac4-4411-9180-54e5a16763bb',
        place_id: '702b52a0-4348-47f8-bf09-e5b5cd9c50fd', 
      };

      const result = await controller.create(createEventDto);
      expect(result).toEqual(defaultEventEntity);

    });

  });

  describe('findOne', () => {

    it ('should get a event', async () => {

      const result = await controller.findOne('208aa018-eed3-435a-ba86-0741f045eaad');
      expect(result).toEqual(defaultEventEntity);
      expect(service.findOne).toHaveBeenCalledWith('208aa018-eed3-435a-ba86-0741f045eaad');

    });

    it ('shouldn\'t get a event', () => {
      const result = controller.findOne('208aa018-eed3-435a-bb82-0741f045eaad');
      expect(result).not.toBe(defaultEventEntity);
    });

  });

  describe('update', () => {

    it ('should update a event', async () => {

      const updateEventDto: UpdateEventDto = {
        name: 'Evento atualizado',
        date: '10/02/2025',
        time: '20:30h',
        email: 'teste@mail.com',
        phone: '(99) 99999-9999',
        type_id: '0b636dce-9ac4-4411-9180-54e5a16763bb',
        place_id: '702b52a0-4348-47f8-bf09-e5b5cd9c50fd', 
      };

      const result = await controller.update('208aa018-eed3-435a-ba86-0741f045eaad', updateEventDto);

      expect(result).toBe(updatedEventEntity);
      expect(service.update).toHaveBeenCalledWith('208aa018-eed3-435a-ba86-0741f045eaad', updateEventDto);

    });

  });

  describe('delete', () => {

    it ('should delete a event', async () => {

      const result = await controller.delete('208aa018-eed3-435a-bb82-0741f045eaad');

      expect(result).toBe(defaultEventEntity);
      expect(service.delete).toHaveBeenCalledWith('208aa018-eed3-435a-bb82-0741f045eaad');
    });

  });


});
