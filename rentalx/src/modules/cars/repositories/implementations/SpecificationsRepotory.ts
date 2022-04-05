import { Specification } from '../../model/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepotory,
} from '../ISpecificationsRepotory';

class SpecificationsRepotory implements ISpecificationsRepotory {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepotory;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepotory {
    if (!SpecificationsRepotory.INSTANCE) {
      SpecificationsRepotory.INSTANCE = new SpecificationsRepotory();
    }

    return SpecificationsRepotory.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  list() {
    return this.specifications;
  }

  findByName(name: string) {
    const specification = this.specifications.find(
      specification => specification.name === name,
    );

    return specification;
  }
}

export { SpecificationsRepotory };
