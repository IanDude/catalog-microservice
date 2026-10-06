import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { getTypeOrmConfig } from '../../config/typeorm.config';
import { ShowsEntity } from '../entities/show.entity';
import { randomUUID } from 'crypto';

async function seedShows(configService: ConfigService) {
  const dataSource = new DataSource(getTypeOrmConfig(configService));
  await dataSource.initialize();

  const showsRepository = dataSource.getRepository(ShowsEntity);

  //Generate Shows
  const show1 = showsRepository.create({
    uuid: randomUUID(),
    title: 'Show 1',
    synopsis: 'Synopsis of Show 1',
    tagline: 'Show 1 tagline',
  });
  await showsRepository.save(show1);
  const show2 = showsRepository.create({
    uuid: randomUUID(),
    title: 'Show 2',
    synopsis: 'Synopsis of Show 2',
    tagline: 'Show 2 tagline',
  });
  await showsRepository.save(show2);
  const show3 = showsRepository.create({
    uuid: randomUUID(),
    title: 'Show 3',
    synopsis: 'Synopsis of Show 3',
    tagline: 'Show 3 tagline',
  });
  await showsRepository.save(show3);
  const show4 = showsRepository.create({
    uuid: randomUUID(),
    title: 'Show 4',
    synopsis: 'Synopsis of Show 4',
    tagline: 'Show 4 tagline',
  });
  await showsRepository.save(show4);
  const show5 = showsRepository.create({
    uuid: randomUUID(),
    title: 'Show 5',
    synopsis: 'Synopsis of Show 5',
    tagline: 'Show 5 tagline',
  });
  await showsRepository.save(show5);
}

const configService = new ConfigService();
seedShows(configService)
  .then(() => {
    console.log('Shows seeded successfully');
  })
  .catch((err) => {
    console.error('Failed to seed shows', err);
  });
