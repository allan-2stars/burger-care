import React from 'react';

import classes from './Spinner.module.css';

const spinner = () => {
  return (
    <div className={classes.ldsEllipsis}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default spinner;
