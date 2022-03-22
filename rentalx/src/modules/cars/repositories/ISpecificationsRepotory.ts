interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepotory {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: string);
}

export { ISpecificationsRepotory, ICreateSpecificationDTO };
