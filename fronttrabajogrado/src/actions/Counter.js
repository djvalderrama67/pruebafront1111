export const UPDATE_TOTAL_COUNT = 'UPDATE_TOTAL_COUNT';

export const updateTotalCount = (total) => {
    return {
        type: UPDATE_TOTAL_COUNT,
        payload: total,
    };
}