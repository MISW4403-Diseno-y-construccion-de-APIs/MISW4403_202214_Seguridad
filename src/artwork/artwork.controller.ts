/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ArtworkDto } from './artwork.dto';
import { ArtworkService } from './artwork.service';

@Controller('artworks')
@UseInterceptors(BusinessErrorsInterceptor)
export class ArtworkController {
    constructor(private readonly artworkService: ArtworkService) {}

  @Get()
  async findAll() {
    return await this.artworkService.findAll();
  }

  @Get(':artworkId') 
  async findOne(@Param('artworkId') artworkId: string) {
    return await this.artworkService.findOne(artworkId);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() artworkDto: ArtworkDto) {
    return await this.artworkService.create(artworkDto);
  }

  @Put(':artworkId')
  async update(@Param('artworkId') artworkId: string, @Body() artworkDto: ArtworkDto) {
    return await this.artworkService.update(artworkId, artworkDto);
  }

  @Delete(':artworkId')
  @HttpCode(204)
  async delete(@Param('artworkId') artworkId: string) {
    return await this.artworkService.delete(artworkId);
  }

}
