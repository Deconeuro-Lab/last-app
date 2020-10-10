import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/TestDashboard/ControlPanel.css'

function ControlPanel(props) {

  // from props...
  // determine what text to display in the Prompt
  // determine if timer is needed
  // determine PASS FAIL btn behavior
  // determine modal content when help-button is pressed

  return (
    <div className="ControlPanel">
      <button type="button" id="btn-fail" className="btn btn-test btn-danger btn-control-passfail" disabled>Fail</button>

      <section className="ControlPanel-Center">
        <p className="ControlPanel-Timer">
          <span id="stopwatch-sec">0</span>:<span id="stopwatch-milisec">00</span>
        </p>
        <p className="ControlPanel-Prompt">Ask <i>[patient-name]</i> to name the <span id="highlighted-object">highlighted
            object</span>. Then start the timer.
        </p>
        <p className="ControlPanel-Prompt">Stop the timer when an answer is provided.</p>
        <button type="button" className="btn btn-test btn-primary btn-control btn-control-stopwatch">Start</button>

        <a href="#" className="mt-3" id="help-button">?</a>
      </section>

      <button type="button" id="btn-pass" className="btn btn-test btn-success btn-control-passfail" disabled>Pass</button>
    </div>
  );
}

export default ControlPanel;
