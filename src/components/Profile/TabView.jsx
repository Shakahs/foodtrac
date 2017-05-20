import React from 'react';
import MenuList from './MenuList';
import Trucks from './Trucks';
import EventsList from './EventsList';
import ReviewsList from './ReviewsList';

const TabView = () => (
  <div>
    <MenuList />
    <Trucks />
    <EventsList />
    <ReviewsList />
  </div>
);

export default TabView;
