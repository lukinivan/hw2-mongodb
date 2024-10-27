const sortOrderList = ['asc', 'desc'];

export const parseSortParamsDecorator = (sortByList) => {
  const func = (req, res, next) => {
    const { sortBy, sortOrder } = req.query;
    const parsedSortBy = sortByList.includes(sortBy) ? sortBy : '_id';
    const parsedSortOrder = sortOrderList.includes(sortOrder)
      ? sortOrder
      : sortOrderList[0];

    req.query = {
      ...req.query,
      sortBy: parsedSortBy,
      sortOrder: parsedSortOrder,
    };

    next();
  };

  return func;
};
