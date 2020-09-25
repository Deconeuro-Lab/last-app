import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

function TestMenu() {
  return (
    <div className='TestMenu d-flex flex-column align-items-center'>
      <a className='btn btn-outline-primary m-2'>Version A</a>
      <a className='btn btn-outline-primary m-2'>Version B</a>
    </div>
  );
}

export default TestMenu;
