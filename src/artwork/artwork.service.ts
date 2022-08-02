/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ArtworkEntity } from './artwork.entity';
import { ArtworkDto } from './artwork.dto';

@Injectable()
export class ArtworkService {
    constructor(
        @InjectRepository(ArtworkEntity)
        private readonly artworkRepository: Repository<ArtworkEntity>
    ){}

    async findAll(): Promise<ArtworkEntity[]> {
        return await this.artworkRepository.find({ relations: ["images"] });
    }

    async findOne(id: string): Promise<ArtworkEntity> {
        const artwork: ArtworkEntity = await this.artworkRepository.findOne({where: {id}, relations: ["images"] } );
        if (!artwork)
          throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
    
        return artwork;
    }
    
    async create(artworkDto: ArtworkDto): Promise<ArtworkEntity> {
        const artwork: ArtworkEntity = new ArtworkEntity();
        artwork.name = artworkDto.name;
        artwork.description = artworkDto.description;
        artwork.mainImage = artworkDto.mainImage;
        artwork.type = artworkDto.type;
        artwork.year = artworkDto.year;
        
        return await this.artworkRepository.save(artwork);
    }

    async update(id: string, artworkDto: ArtworkDto): Promise<ArtworkEntity> {
        const artwork: ArtworkEntity = await this.artworkRepository.findOne({where:{id}});
        if (!artwork)
          throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
       
          artwork.name = artworkDto.name;
          artwork.description = artworkDto.description;
          artwork.mainImage = artworkDto.mainImage;
          artwork.type = artworkDto.type;
          artwork.year = artworkDto.year;
     
        return await this.artworkRepository.save(artwork);
    }

    async delete(id: string) {
        const artwork: ArtworkEntity = await this.artworkRepository.findOne({where:{id}});
        if (!artwork)
          throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.artworkRepository.remove(artwork);
    }
}
