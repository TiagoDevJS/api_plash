import { container } from "tsyringe";
import { UserRepository } from "../Repositories/User";
import { CategoriesRepository } from "../Repositories/Categories";
import { GetCategoriesUseCase } from "../UseCases/Categories/getCategoriesUseCase";
import { ArticlesRepository } from "../Repositories/Articles";
import { GetArticlesUseCase } from "../UseCases/Articles/getArticlesUseCase";
import { PostArticleUseCase } from "../UseCases/Articles/postArticlesUseCase";
import { CloudStorageReposytori } from "../Repositories/CloudStorage";
import { UploadUseCase } from "../UseCases/Upload";
import { UpdateArticleUseCase } from "../UseCases/Articles/updateArticlesUseCase";
import { DeleteArticleUseCase } from "../UseCases/Articles/deleteArticlesUseCase";
import { UpdateCategoriesUseCase } from "../UseCases/Categories/updateCategoriesUseCase";
import { PostCategoriesUseCase } from "../UseCases/Categories/postCategoriesUSeCase";
import { BannerUseCaseGet } from "../UseCases/Banners/getBannersUseCase";
import { BannerRepository } from "../Repositories/Banners";
import { CreateMagazineUseCase } from "../UseCases/Magazines/createMagazineUsecase";
import { MagazineUseCaseGET } from "../UseCases/Magazines/getMagazinesUseCase";
import { MagazineRepository } from "../Repositories/Magazines";
import { MagazineUseCaseUpdate } from "../UseCases/Magazines/updateMagazineUseCase";
import { MagazineUseCaseDelete } from "../UseCases/Magazines/deleteMagazineUseCase";
import { EmployeeRepository } from "../Repositories/Employees";
import { EmployeeUSeCaseCreate } from "../UseCases/Employees/createEmployeeUseCase";
import { EmployeUseCaseGet } from "../UseCases/Employees/getEmployeeUseCase";
import { EmployeeUseCaseUpdate } from "../UseCases/Employees/updateEmployeeUseCase";
import { EmployeeUSeCaseDelete } from "../UseCases/Employees/deleteEmployeeUseCase";
import { SponsorsRepository } from "../Repositories/Sponsors";
import { SponsorUseCaseCreate } from "../UseCases/Sponsors/createSponsorsUseCase";
import { SponsorsUseCaseUpdate } from "../UseCases/Sponsors/updateSponsorsUseCase";
import { SponsorsUseCaseGet } from "../UseCases/Sponsors/getSponsorosUseCase";
import { MagazineUseCaseRemoveEmployee } from "../UseCases/Magazines/deleteEmployeeMagazineUseCase";
import { AdminRepository } from "../Repositories/Admin";
import { AdminCreateUseCase } from "../UseCases/Admin/createAdminUseCase";

import { EventsUpdateUseCase } from "../UseCases/Events/updateEventUseCase";


container.register<UserRepository>("UserRepository", {
  useValue: new UserRepository(),
})


//Categories Instancias
container.registerSingleton<CategoriesRepository>("CategoriesReposytory", CategoriesRepository);
container.registerSingleton<GetCategoriesUseCase>("GetCategoriesUseCase", GetCategoriesUseCase);
container.registerSingleton<UpdateCategoriesUseCase>("UpdateCategoriesUseCase", UpdateCategoriesUseCase);
container.registerSingleton<PostCategoriesUseCase>("PostCategoriesUseCase", PostCategoriesUseCase);

//Articles instancia 
container.registerSingleton<ArticlesRepository>("GetArticlesRepository", ArticlesRepository);
container.registerSingleton<GetArticlesUseCase>("GetArticlesUSeCase", GetArticlesUseCase);
container.registerSingleton<PostArticleUseCase>("PostArticlesUSeCase", PostArticleUseCase);
container.registerSingleton<UpdateArticleUseCase>("UpdateArticleUseCase", UpdateArticleUseCase);
container.registerSingleton<DeleteArticleUseCase>("DeleteArticleUseCase", DeleteArticleUseCase);


//Upload Instancias
container.registerSingleton<CloudStorageReposytori>("CloudStorageReposytori", CloudStorageReposytori);
container.registerSingleton<UploadUseCase>("UploadUseCase", UploadUseCase);

//Banner instancias 

container.registerSingleton<BannerRepository>("BannerRepository", BannerRepository);
container.registerSingleton<BannerUseCaseGet>("BannerUseCaseGet", BannerUseCaseGet);

//Magazines Instancias
container.registerSingleton<MagazineRepository>("MagazineRepository", MagazineRepository);
container.registerSingleton<CreateMagazineUseCase>("CreateMagazineUseCase", CreateMagazineUseCase);
container.registerSingleton<MagazineUseCaseGET>("MagazineUseCaseGET", MagazineUseCaseGET);
container.registerSingleton<MagazineUseCaseUpdate>("MagazineUseCaseUpdate", MagazineUseCaseUpdate);
container.registerSingleton<MagazineUseCaseDelete>("MagazineUseCaseDelete", MagazineUseCaseDelete);
container.registerSingleton<MagazineUseCaseRemoveEmployee>("MagazineUseCaseRemoveEmployee", MagazineUseCaseRemoveEmployee);

//Events Instajcia

//Loggers



container.registerSingleton<EmployeeRepository>("EmployeeRepository", EmployeeRepository);
container.registerSingleton<EmployeeUSeCaseCreate>("EmployeeUSeCaseCreate", EmployeeUSeCaseCreate);
container.registerSingleton<EmployeUseCaseGet>("EmployeUseCaseGet", EmployeUseCaseGet);
container.registerSingleton<EmployeeUseCaseUpdate>("EmployeeUseCaseUpdate", EmployeeUseCaseUpdate);
container.registerSingleton<EmployeeUSeCaseDelete>("EmployeeUSeCaseDelete", EmployeeUSeCaseDelete);


//Sponsors Instancia 
container.registerSingleton<SponsorsRepository>("SponsorsRepository", SponsorsRepository);
container.registerSingleton<SponsorUseCaseCreate>("SponsorUseCaseCreate", SponsorUseCaseCreate);
container.registerSingleton<SponsorsUseCaseUpdate>("SponsorsUseCaseUpdate", SponsorsUseCaseUpdate);
container.registerSingleton<SponsorsUseCaseGet>("SponsorsUseCaseGet", SponsorsUseCaseGet);

//Admin Instancia
container.registerSingleton<AdminRepository>("AdminRepository", AdminRepository);
container.registerSingleton<AdminCreateUseCase>("AdminCreateUseCase", AdminCreateUseCase);

// Orders 

