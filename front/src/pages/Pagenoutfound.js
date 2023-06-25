

import React from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import Container from "../components/Container";
import Meta from '../components/Meta';

const Pagenoutfound = () => {
  return (
    <>
    <Meta title={"404"} />

<BreadCrumb title="Page Not Found" />
<Container class1="blog-wrapper home-wrapper-2 py-5">
     <div style={styles.container}>
  <h1 style={styles.heading}>404 - Page Not Found</h1>
  <p style={styles.text}>
    Oops! The page you are looking for does not exist.
  </p>
  <p style={styles.text}>
    Go back to the <Link to="/">home page</Link>.
  </p>
</div>
    </Container>
    </>
   
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    marginBottom: '10px',
  },
};

export default Pagenoutfound;
