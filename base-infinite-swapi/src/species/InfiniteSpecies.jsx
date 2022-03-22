import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetching } = useInfiniteQuery(
    "sw-species",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined, }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  // TODO: get data for InfiniteScroll via React Query
  return (
  <>
  {isFetching && <div>Loading...</div>}
  <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
    {data.pages.map((pageData) => {
      return pageData.results.map((species) => {
        return <Species key={species.name} name={species.name}/>
      })
    })}
  </InfiniteScroll>
  </>);
}
