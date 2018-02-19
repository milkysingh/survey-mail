import React from 'react';
import { Link } from 'react-router-dom';
import SurveysList from './surveys/SurveysList';
import Landing from './Landing';
import { connect } from 'react-redux';

function Dashboard({ auth }) {
  console.log(auth);
  return (
    <div>
      { auth && 
        <div>
          <SurveysList />
          <div className="fixed-action-btn">
            <Link to={'/surveys/new'} className="btn-floating btn-large red">
              <i className="large material-icons">add</i>
            </Link>
          </div>
        </div>
      }
      {
        !auth &&
        <div>
          <Landing />
        </div>
      }
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);