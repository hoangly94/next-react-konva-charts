export const paginationReducer = {
    setPagination: (state, { payload }) => {
        state.pagination = {
            isLoading: false,
            count: payload.count,
            page: payload.page,
            pageCount: payload.pageCount,
            total: payload.total
        }
    },
    clickPagination: (state, { payload }) => {
        state.isLoading = true;
        state.pagination.page = payload;
    },
}

export const paginationState = {
    isLoading: false,
    page: 1,
    total: 0
}