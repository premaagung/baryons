import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
 
export const appRouter = router({
    authCallback: publicProcedure.query(async () => {
      const { getUser } = getKindeServerSession()
      const user = await getUser()
  
      if (!user?.id || !user.email)
        throw new TRPCError({ code: 'UNAUTHORIZED' })
  
        // If the user in database
        // const dbUser = await db

        return { success: true } 
    })
});
export type AppRouter = typeof appRouter;