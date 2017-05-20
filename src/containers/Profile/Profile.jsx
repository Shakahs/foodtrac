import React, {Component} from 'react';
import BrandHeader from './BrandHeader.jsx';
import TrucksList from './TrucksList.jsx';
import MenuList from './MenuList.jsx';
import ReviewsList from './ReviewsList.jsx';
import CommentsList from './CommentsList.jsx';

class Profile extends Component {

  render() {
    return (
      <div>
        <BrandHeader />
        <TrucksList />
        <MenuList />
        <ReviewsList />
        <CommentsList/>
      </div>
    );
  };
}

export default Profile;