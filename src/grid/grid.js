import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import utils from "./utils";
import "./style.css";

const getRoundWidth = width => Math.floor(width) * 0.9;

const wrapComponents = (components, collCount, selectedChar) => {
  const items = [];

  components.forEach(item => {
    if (
      selectedChar !== "#" &&
      item.props.name.toUpperCase().startsWith(selectedChar)
    ) {
      items.push(
        <div
          className="grid-cell"
          style={{ minWidth: `${getRoundWidth(100 / collCount)}%` }}
        >
          {item}
        </div>
      );
    } else if (selectedChar === "#") {
      items.push(
        <div
          className="grid-cell"
          style={{ minWidth: `${getRoundWidth(100 / collCount)}%` }}
        >
          {item}
        </div>
      );
    }
  });

  return items;
};

const alphabet = (list = [], selected = "#", action) => {
  const callback = value => () => action(value);

  return (
    <div>
      <div className="alphabet">
        <span
          className={classnames(
            { selected: selected === "#" },
            "alphabet-item"
          )}
          onClick={callback("#")}
        >
          {"#"}
        </span>
        {list.map(item => (
          <span
            className={classnames(
              { selected: selected.toUpperCase().startsWith(item) },
              "alphabet-item"
            )}
            onClick={callback(item)}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const getAlphabet = (elements = []) => {
  const chars = new Set();

  elements.forEach(item => {
    if (item.props && item.props.name) {
      chars.add(item.props.name[0].toUpperCase());
    }
  });

  return utils.sortByAlphabet([...chars]);
};

const search = (selected = "#", action, searchPlaceholder) => {
  const callback = () => e => {
    const eventValue = (e.target.value && e.target.value.toUpperCase()) || "#";
    action(eventValue);
  };

  return (
    <input
      className={classnames({ selected: selected.length > 1 }, "search")}
      onChange={callback()}
      placeholder={searchPlaceholder}
    />
  );
};

export const GridLayout = ({
  collNumber,
  children,
  withSelect,
  withSearch,
  searchPlaceholder,
  css
}) => {
  const [selectedChar, select] = useState("#");

  return (
    <div>
      {withSelect && alphabet(getAlphabet(children), selectedChar, select)}
      {withSearch && search(selectedChar, select, searchPlaceholder)}
      <div className="grid-layout" style={{ ...css }}>
        {Array.isArray(children)
          ? wrapComponents(children, collNumber, selectedChar)
          : children}
      </div>
    </div>
  );
};

GridLayout.propTypes = {
  collNumber: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  withSelect: PropTypes.bool,
  withSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  css: PropTypes.object
};

GridLayout.defaultProps = {
  collNumber: 2,
  children: <div />,
  withSelect: false,
  withSearch: false,
  searchPlaceholder: "search",
  css: {}
};
