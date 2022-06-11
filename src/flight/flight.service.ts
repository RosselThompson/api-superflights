import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FLIGHT } from 'src/common/models/models';
import { IFlight } from '../common/interfaces/flight.interface';
import { Model } from 'mongoose';
import { FlightDTO } from './dto/flight.dto';
import { IWeather } from '../common/interfaces/weather.interface';
import { weatherAPI, createURL } from '../common/services/weatherApi';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  async getWeather(cityName: string): Promise<IWeather> {
    const request = createURL('/current.json', cityName);
    const { data } = await weatherAPI.get(request);
    return data;
  }

  assign(
    { _id, pilot, airplane, destinationCity, flightDate, passengers }: IFlight,
    weather: IWeather,
  ): IFlight {
    return Object.assign({
      _id,
      pilot,
      airplane,
      destinationCity,
      flightDate,
      passengers,
      weather,
    });
  }

  async create(flightDTO: FlightDTO): Promise<IFlight> {
    const newFlight = new this.model(flightDTO);
    return await newFlight.save();
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async findById(id: string): Promise<IFlight> {
    const flight = await this.model.findById(id).populate('passengers');
    const weather = await this.getWeather(flight.destinationCity);
    // return await this.model.findById(id).populate('passengers');
    return this.assign(flight, weather);
  }

  async update(id: string, flightDTO: FlightDTO): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Flight Deleted',
    };
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passengers');
  }
}
