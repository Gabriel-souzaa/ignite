import { Specification } from '../entities';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepotory {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
}

export { ISpecificationsRepotory, ICreateSpecificationDTO };
