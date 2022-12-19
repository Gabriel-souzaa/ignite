import { Repository } from 'typeorm';
import { myDataSource } from '../../../../database/data-source';
import { Specification } from '../../entities';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepotory,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepotory {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = myDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = await this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();

    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: {
        name,
      },
    });

    return specification;
  }
}

export { SpecificationsRepository };
