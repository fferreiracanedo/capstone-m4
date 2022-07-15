import appDataSource from "../../data-source";
import { IUpdateCompanie } from "../../interfaces/companies";
import { Companie } from "../../entities/companies.entity";


const updateCompanieService = async ({ id, name }: IUpdateCompanie) => {
  const companieRepository = appDataSource.getRepository(Companie);

  const companies = await companieRepository.find();

  const companie = companies.find((user: any) => user.id === id);

  await companieRepository.update(companie!.id, {
    name: name,
  });

  return true;
};

export default updateCompanieService;
