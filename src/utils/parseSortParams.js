const sortOrderList = ['asc', 'desc'];

export const parseSortParams = ({ sortBy, sortOrder, sortByList }) => {
  const parsedSortBy = sortByList.includes(sortBy) ? sortBy : '_id';
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};