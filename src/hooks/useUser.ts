import useSWRMutation from "swr/mutation";

const API = "https://wild-lime-newt-wig.cyclic.app/api/v1";

function useGetUser() {
    async function fetcher(url:string, { arg }: { arg: { userId:string }}) {
        return await fetch(`${API}${url}?_id=${arg.userId}`, {
            method: 'GET',

            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }

    const { data, error, trigger, isMutating } = useSWRMutation("/user", fetcher);
    
    return { data, error, trigger, isMutating };
}

export { useGetUser };