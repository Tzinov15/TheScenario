import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Data } from './data.db';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Post()
  postData(@Body() data: Data) {
    return this.appService.postData(data);
  }

  @Put()
  putData(@Body() data: Data) {
    return this.appService.putData(data);
  }

  @Delete(':id')
  deleteData(@Param('id') id: string) {
    return this.appService.deleteData(id);
  }
}
