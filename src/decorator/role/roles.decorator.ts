/**
 * @AllowRole decorator
 *
 * use to describe allowed role for specific controller or handler
 *
 */

// Nest Pacakges
import { Reflector } from '@nestjs/core';

// Thrid-party Packages
import { $Enums } from '@prisma/client';

export const AllowRole = Reflector.createDecorator<$Enums.UserRole[]>();
