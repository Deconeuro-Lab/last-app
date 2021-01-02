import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewPanel.css';

import { GenericSubtest, NamingSubtest } from '../../types/LASTDataFormat';

interface Props {
  subtest: GenericSubtest | NamingSubtest;
  testCategory: string;
  testVersion: 'A' | 'B';
}

const ViewPanel: React.FC<Props> = ({ subtest, testCategory, testVersion }) => {
  let viewElement: JSX.Element;

  // TODO: modularize this better
  if (testCategory === 'naming') {
    viewElement = (
      <img
        className="ViewPanel-Image fade-in"
        // @ts-ignore
        src={require(`../../img/version${testVersion}/${testCategory}/${subtest.jpg}`)}
        // @ts-ignore
        alt={subtest.item}
        draggable="false"
      />
    );
  } else if (testCategory === 'picID') {
    viewElement = (
      <img
        className="ViewPanel-Image fade-in"
        src={require(`../../img/version${testVersion}/${testCategory}/test.png`)}
        alt="test"
        draggable="false"
      />
    );
  } else {
    // placeholder if no image
    // viewElement = <p>"{subtest}"</p>;
    viewElement = <p>Déconeuro™ Lab</p>;
  }

  // on mount and on orientation change, format test image height

  return (
    <div className={'ViewPanel ' + (testCategory === 'naming' ? 'ViewPanel-Dark' : 'ViewPanel-Light')}>
      {viewElement}
    </div>
  );
};

export default ViewPanel;
