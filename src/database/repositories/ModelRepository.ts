import { Column, Table, createRepo } from "jimny";

@Table("models")
class Model {
  @Column({ primary: true })
  public id: number;
  @Column()
  public name: string;
}

const ModelsRepo = createRepo(Model);

export default ModelsRepo;
