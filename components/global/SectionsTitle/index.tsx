import React from "react";
import classes from "./style.module.scss";
type Props = { title: string; hasColor: string };

const SectionsTitle = ({ title, hasColor }: Props) => {

  return (
    <h2 className={classes.sectionTitle}>
      {title} {hasColor && <span>{hasColor}</span>}
    </h2>
  );
};

export default SectionsTitle;
