import classnames from "classnames/bind";

import styles from "./Row.module.scss";

const cx = classnames.bind(styles);

const Row = ({ children, justifyContent }) => {
  const rowClasses = cx({
    row: true,
    [`justify-conetnt-${justifyContent}`]: justifyContent,
  });
  return <div className={rowClasses}>{children}</div>;
};
export default Row;
