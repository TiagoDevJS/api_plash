import { Router } from 'express';
import adminRoutes from './adminRoutes';
import userRoutes from './userRoutes';
import employeeRoutes from './employeeRoutes';
import publicRoutes from './publicRoutes';
import categoriesPublicRoutes from "./publiccategoriesRoutes"
import authRoutes from './authRoutes';
import serverRoutes from  "./serverRoutes"
import uploadRoutes from "./uploadRoutes"
import adminArticlesRoutes from './admin/adminArticleRoutes'
import adminCategoriesRoutes from './admin/adminCategoriesRoutes'
import adminBannersRoutes from './admin/adminBannersRoute'
import adminMagazinesRoutes from "./admin/adminMagazinesRoutes"
import adminEmployeesRoutes from "./admin/adminEmployeeRoutes"
import adminSponsorsRoutes from "./admin/adminSponsorsRoutes"
import adminPagarmeRoutes from "./admin/adminGetwayPagarmeRoutes"
import adminEventsRoutes from "./admin/adminEventsRoutes"
import adminOrdersRoutes from "./admin/adminOrdersRoutes"
import adminDvlsRoutes from "./admin/adminDvlRoutes"

const router = Router();

router.use('/admin', adminRoutes);
router.use('/admin/upload', uploadRoutes);
router.use('/admin/articles', adminArticlesRoutes);
router.use('/admin/categories', adminCategoriesRoutes);
router.use('/admin/banners', adminBannersRoutes);
router.use('/admin/magazines', adminMagazinesRoutes);
router.use('/admin/employees', adminEmployeesRoutes);
router.use('/admin/sponsors', adminSponsorsRoutes);
router.use('/admin/pagarme', adminPagarmeRoutes);
router.use('/admin/events', adminEventsRoutes);
router.use('/admin/orders', adminOrdersRoutes);
router.use('/admin/dvls', adminDvlsRoutes);





router.use('/user', userRoutes);
router.use('/employee', employeeRoutes);
router.use('/public', publicRoutes);
router.use('/public/categories', categoriesPublicRoutes);
router.use('/auth', authRoutes);
router.use('/server', serverRoutes);

export default router;