import { Repository } from 'typeorm';
import { myDataSource } from '../../../../database/data-source';
import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepotory,
} from '../ISpecificationsRepotory';

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
