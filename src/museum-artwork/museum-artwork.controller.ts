/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ArtworkDto } from '../artwork/artwork.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { MuseumArtworkService } from './museum-artwork.service';

@Controller('museums')
@UseInterceptors(BusinessErrorsInterceptor)
export class MuseumArtworkController {
    constructor(private readonly museumArtworkService: MuseumArtworkService){}

    @Post(':museumId/artworks/:artworkId')
    @HttpCode(201)
    async addArtworkMuseum(@Param('museumId') museumId: string, @Param('artworkId') artworkId: string){
        return await this.museumArtworkService.addArtworkMuseum(museumId, artworkId);
    }

    @Get(':museumId/artworks/:artworkId')
    async findArtworkByMuseumIdArtworkId(@Param('museumId') museumId: string, @Param('artworkId') artworkId: string){
        return await this.museumArtworkService.findArtworkByMuseumIdArtworkId(museumId, artworkId);
    }

    @Get(':museumId/artworks')
    async findArtworksByMuseumId(@Param('museumId') museumId: string){
        return await this.museumArtworkService.findArtworksByMuseumId(museumId);
    }

    @Put(':museumId/artworks')
    async associateArtworksMuseum(@Body() artworksDto: ArtworkDto[], @Param('museumId') museumId: string){
        return await this.museumArtworkService.associateArtworksMuseum(museumId, artworksDto);
    }
    
    @Delete(':museumId/artworks/:artworkId')
    async deleteArtworkMuseum(@Param('museumId') museumId: string, @Param('artworkId') artworkId: string){
        return await this.museumArtworkService.deleteArtworkMuseum(museumId, artworkId);
    }
}
