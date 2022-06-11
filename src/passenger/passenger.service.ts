import { Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { PassengerDTO } from './dto/passenger.dto';
import { IPassenger } from '../common/interfaces/passenger.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from '../common/models/models';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}

  async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
    return await this.model.create(passengerDTO);
  }

  async findAll(): Promise<IPassenger[]> {
    return await this.model.find();
  }

  async findById(id: string): Promise<IPassenger> {
    return this.model.findById(id);
  }

  async update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger> {
    return this.model.findByIdAndUpdate(id, passengerDTO, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Passenger deleted',
    };
  }
}
