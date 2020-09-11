// reduce query object
export function reduceQuery(query) {
  // pagination
  delete query.pagination.pageSizeOptions
  delete query.pagination.showQuickJumper
  delete query.pagination.showSizeChanger
  // filters
  if (!query.filters) delete query.filters
  // sorter
  if (!query.sorter) delete query.sorter

  return query
}
