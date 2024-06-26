import { Test, TestingModule } from '@nestjs/testing';
import { PlacesController } from '../places.controller';
import { PlacesService } from '../places.service';
import { CreatePlaceDto } from '../dto/CreatePlaceDto';
import { UpdatePlaceDto } from '../dto/UpdatePlaceDto';
import { defaultPlaceEntity, placeEntityList, updatedPlaceEntity } from './places.mocks';

describe('PlacesController', () => {
  let controller: PlacesController;
  let service: PlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesController],
      providers: [{
        provide: PlacesService,
        useValue: {
          findAll: jest.fn().mockResolvedValue(placeEntityList),
          findOne: jest.fn().mockResolvedValue(placeEntityList[0]),
          create: jest.fn().mockResolvedValue(defaultPlaceEntity),
          update: jest.fn().mockResolvedValue(updatedPlaceEntity),
          delete: jest.fn().mockResolvedValue(defaultPlaceEntity)
        }
      }]
    }).compile();

    controller = module.get<PlacesController>(PlacesController);
    service = module.get<PlacesService>(PlacesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });


  describe('findAll', () => {
    it ('should return a place list entity', async () => {

      const result = await controller.findAll();

      expect(result).toEqual(placeEntityList);
      expect(typeof result).toEqual('object');
      expect(service.findAll).toHaveBeenCalledTimes(1);

    });
  });

  describe('create', ()=> {

    it ('should create a new place', async () => {

      const createPlaceDto: CreatePlaceDto = {
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

      const result = await controller.create(createPlaceDto);
      expect(result).toEqual(defaultPlaceEntity);

    });

  });

  describe('findOne', () => {

    it ('should get a place', async () => {

      const result = await controller.findOne('ebedb0cc-7ded-4ed8-86b3-21c1149eb20f');
      expect(result).toEqual(defaultPlaceEntity);

    });

  });

  describe('update', () => {

    it ('should update a place', async () => {

      const updatePlaceDto: UpdatePlaceDto = {
        name: 'Lugar atualizado',
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

      const result = await controller.update('ebedb0cc-7ded-4ed8-86b3-21c1149eb20f', updatePlaceDto);

      expect(result).toBe(updatedPlaceEntity);
      expect(service.update).toHaveBeenCalledWith('ebedb0cc-7ded-4ed8-86b3-21c1149eb20f', updatePlaceDto);

    });

  });

  describe('delete', () => {

    it ('should delete a place', async () => {

      const result = await controller.delete('ebedb0cc-7ded-4ed8-86b3-21c1149eb20f');

      expect(result).toBe(defaultPlaceEntity);
    });

  });

});
