export class ModelAccomplissement {
  constructor(
    public typeAccomplissement: string, 
    public nom: string,
    public dateRealisation: string,
    public technologie: string,
    public description: string,
    public id?: number 
  ) {}
}
