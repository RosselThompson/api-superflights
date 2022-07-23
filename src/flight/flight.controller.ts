import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { PassengerService } from '../passenger/passenger.service';
import { HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Flight')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new flight' })
  create(@Body() flightDTO: FlightDTO) {
    return this.flightService.create(flightDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get the list of all flights' })
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get flight by id' })
  findById(@Param('id') id: string) {
    return this.flightService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update flight by id' })
  update(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
    return this.flightService.update(id, flightDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete flight by id' })
  delete(@Param('id') id: string) {
    return this.flightService.delete(id);
  }

  @Post(':flightId/passenger/:passengerId')
  @ApiOperation({ summary: 'Add passenger into a flight' })
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
