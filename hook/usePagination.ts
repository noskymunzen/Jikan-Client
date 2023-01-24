import { useMemo } from "react";

const usePagination = (total: number, current: number) => {

    const lowerPage = useMemo(() => {
        if (total === 0) {
            return 0;
        }
        if (total < 6) {
            return 1;
        }
        if (current === total) {
            return current - 4;
        }
        if (current + 4 >= total) {
            return total - 4;
        }
        return current;
    }, [total, current]);

    const upperPage = useMemo(() => {
        if (total === 0) {
            return 0;
        }
        if (total < 6) {
            return total;
        }
        if (current === total || current + 4 >= total) {
            return total;
        }
        return current + 4;
    }, [total, current]);

    const pageRange = useMemo(() => {
        if (upperPage === 0) {
            return [];
        }
        if (upperPage < 6) {
            return Array.from(Array(upperPage).keys()).map((index) => index + 1);
        }
        return Array.from(Array(5).keys()).map((index) => index + lowerPage);
    }, [lowerPage, upperPage]);

    return [pageRange]
}

export default usePagination;