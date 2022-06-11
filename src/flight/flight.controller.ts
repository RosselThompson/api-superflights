import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  HttpException,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { PassengerService } from '../passenger/passenger.service';
import { HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Flight')
@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post()
  create(@Body() flightDTO: FlightDTO) {
    return this.flightService.create(flightDTO);
  }

  @Get()
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.flightService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
    return this.flightService.update(id, flightDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.flightService.delete(id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.passengerService.findById(passengerId);
    if (!passenger)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);

    return this.flightService.addPassenger(flightId, passengerId);
  }
}
