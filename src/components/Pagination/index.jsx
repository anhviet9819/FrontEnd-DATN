import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,
};

function Pagination(props) {
    const { pagination, onPageChange } = props;
    const { _page, _size, _totalRows } = pagination;
    const totalPages = Math.ceil(_totalRows / _size);
    // 51 / 10 = 5.1 --> 6

    function handlePageChange(newPage) {
        if (onPageChange) {
            onPageChange(newPage);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ color: 'blue' }}
                disabled={_page <= 0}
                onClick={() => handlePageChange(_page - 1)}
            >
                Trang trước
            </Button>

            <Button style={{ color: 'blue' }}
                disabled={_page >= totalPages - 1}
                onClick={() => handlePageChange(_page + 1)}
            >
                Trang sau
            </Button>
        </div>
    );
}

export default Pagination;