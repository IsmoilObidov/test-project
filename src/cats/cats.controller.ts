import {
  Controller,
  Get,
  Req,
  Body,
  Post,
  Res,
  HttpStatus,
  Param,
  HttpException,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { CreateCatDto } from './DTOs/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  findAll(@Res() res: Response, @Req() request: Request) {
    // Extracting only the necessary properties to avoid circular references
    const { method, url, headers, query, params, body } = request;

    const requestSummary = {
      method,
      url,
      headers,
      query,
      params,
      body,
    };

    res.status(HttpStatus.OK).json(requestSummary.query.operator);
  }

  @Get(':id')
  @UsePipes(new ParseIntPipe)
  findOne(@Param('id') id: number): Cat {
    try {
      return this.catsService.findOne(id);
    } catch (err) {
      console.log(err);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }
}

@Controller({ host: 'youtube.com.localhost' })
export class ExportFromYoutubeController {
  @Get()
  index(@Req() request: Request): string {
    return 'demo';
  }
}
