import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/TestDashboard/ViewPanel.css'

function ViewPanel(props) {

  // from props...
  // get test version???
  // get image src to display
  // if no img src, display LAST placeholder 

  return (
    <div className="ViewPanel">
      <img className="ViewPanelImage" src="img/test-phone.jpg" alt="test" />
    </div>
  );
}

export default ViewPanel;
