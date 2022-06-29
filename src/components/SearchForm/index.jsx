import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';

SearchForm.propTypes = {
    onSubmit: PropTypes.func,
};

SearchForm.defaultProps = {
    onSubmit: null,
};

function SearchForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchTerm(value);

        if (!onSubmit) return;

        // SET -- 100 -- CLEAR, SET -- 300 --> SUBMIT
        // SET -- 300 --> SUBMIT
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        };

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            };
            onSubmit(formValues);
        }, 1000);
    }

    return (
        <form>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
        </form>
    );
}

export default SearchForm;