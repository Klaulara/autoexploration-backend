import type { Request, Response, NextFunction } from "express";
declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export { authMiddleware };
//# sourceMappingURL=authMiddleware.d.ts.map