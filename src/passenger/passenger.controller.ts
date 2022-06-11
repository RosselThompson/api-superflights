import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@ApiTags('Passenger')
@Controller('api/v1/passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() passengerDTO: PassengerDTO) {
    return this.passengerService.create(passengerDTO);
  }

  @Get()
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.passengerService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() passengerDTO: PassengerDTO) {
    return this.passengerService.update(id, passengerDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.passengerService.delete(id);
  }
}
