import React from "react";
import "./SearchBox.css";
import PropTypes from "prop-types";
import { BsSearch, BsXCircle } from "react-icons/bs";


export default function SearchBox({ value, onChange }) {
    return (
        <div className="searchBoxWrap">
            <span className="searchIcon" aria-hidden="true">
                <BsSearch size={14} />
            </span>
            <input
                className="searchBox"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Buscar chat o contacto..."
                aria-label="Buscar chat o contacto"
            />
            {value ? (
                <button
                    type="button"
                    className="searchClearBtn"
                    onClick={() => onChange("")}
                    aria-label="Limpiar búsqueda"
                >
                    <BsXCircle size={16} />
                </button>
            ) : null}
        </div>
    );
}

SearchBox.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};