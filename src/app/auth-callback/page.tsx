import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { useEffect } from "react";

const Page = async () => {
    const router = useRouter()
    
    const SearchParams = useSearchParams()
    const origin = SearchParams.get('origin') 
    
    const {data, isLoading, error} = trpc.authCallback.useQuery(undefined);

    useEffect(() => {
        if (error?.data?.code === 'UNAUTHORIZED') {
            router.push("/sign-in")
        } else if (!isLoading) {
            router.push(
            data !== undefined && data.success && origin ? 
            `${origin}` 
            : "/dashboard");
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isLoading])

    onerror:(err:any) => {
        if(err?.data?.code === 'UNAUTHORIZED') {
            router.push("/sign-in")
        }
    }
    retry: true
    retryDelay: 500
}
export default Page;