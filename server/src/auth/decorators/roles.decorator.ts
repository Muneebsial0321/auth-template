import { SetMetadata } from '@nestjs/common';
import { User_Role } from 'generated/prisma';

export const Roles = (...roles: User_Role[]) => SetMetadata('roles', roles);

// docs
// @Roles(User_Role.ADMIN)
// @UseGuards(RolesGuard)
// @Get('admin-only')
// asyncadminOnlyRoute() {
//   return 'This route is protected and only accessible by admins';
// }