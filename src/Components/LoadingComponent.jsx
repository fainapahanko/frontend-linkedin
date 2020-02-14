import React from 'react';
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux';

const mapStateToProps = state => state 

const LoadingComponent = (props) => {
    return (
        <>
          <Loader
            color="#007ACC"
            height={40}
            width={40}
            type="TailSpin"
            className="loader-profile-page"
          />
      </>
    )
}

export default connect(mapStateToProps)(LoadingComponent)