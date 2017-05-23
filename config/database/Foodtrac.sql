-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-05-23 00:52:56.557

-- tables
-- Table: BrandComments
CREATE TABLE BrandComments (
    id int NOT NULL AUTO_INCREMENT,
    text int NOT NULL,
    brand_id int NOT NULL,
    users_id int NOT NULL,
    CONSTRAINT BrandComments_pk PRIMARY KEY (id)
);

-- Table: BrandImages
CREATE TABLE BrandImages (
    id int NOT NULL AUTO_INCREMENT,
    brand_id int NOT NULL,
    image_id int NOT NULL,
    CONSTRAINT BrandImages_pk PRIMARY KEY (id)
);

-- Table: BrandReviews
CREATE TABLE BrandReviews (
    id int NOT NULL AUTO_INCREMENT,
    text text NOT NULL,
    score int NOT NULL,
    user_id int NOT NULL,
    brand_id int NOT NULL,
    CONSTRAINT BrandReviews_pk PRIMARY KEY (id)
);

-- Table: BrandReviewsImages
CREATE TABLE BrandReviewsImages (
    id int NOT NULL AUTO_INCREMENT,
    brand_review_id int NOT NULL,
    image_id int NOT NULL,
    CONSTRAINT BrandReviewsImages_pk PRIMARY KEY (id)
);

-- Table: Brands
CREATE TABLE Brands (
    id int NOT NULL AUTO_INCREMENT,
    owner_id int NOT NULL,
    name varchar(30) NOT NULL,
    description text NOT NULL,
    food_genre_id int NOT NULL,
    rewards_trigger int NULL,
    default_coupon_id int NULL,
    CONSTRAINT Brands_pk PRIMARY KEY (id)
);

-- Table: Coupons
CREATE TABLE Coupons (
    id int NOT NULL AUTO_INCREMENT,
    menu_item_free bool NOT NULL,
    menu_item_discount int NOT NULL,
    order_discount int NOT NULL,
    menu_item_id int NULL,
    CONSTRAINT Coupons_pk PRIMARY KEY (id)
);

-- Table: EventComments
CREATE TABLE EventComments (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    event_id int NOT NULL,
    CONSTRAINT EventComments_pk PRIMARY KEY (id)
);

-- Table: Events
CREATE TABLE Events (
    id int NOT NULL AUTO_INCREMENT,
    event_owner_id int NOT NULL,
    start timestamp NOT NULL,
    end timestamp NOT NULL,
    location_id int NOT NULL,
    name varchar(30) NOT NULL,
    description text NOT NULL,
    CONSTRAINT Events_pk PRIMARY KEY (id)
);

-- Table: FoodGenres
CREATE TABLE FoodGenres (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(20) NOT NULL,
    UNIQUE INDEX FoodGenres_name_unique_index (name),
    CONSTRAINT FoodGenres_pk PRIMARY KEY (id)
);

-- Table: Images
CREATE TABLE Images (
    id int NOT NULL AUTO_INCREMENT,
    url varchar(30) NOT NULL,
    user_id int NOT NULL,
    CONSTRAINT Images_pk PRIMARY KEY (id)
);

-- Table: LocationComments
CREATE TABLE LocationComments (
    id int NOT NULL AUTO_INCREMENT,
    text text NOT NULL,
    user_id int NOT NULL,
    location_id int NOT NULL,
    CONSTRAINT LocationComments_pk PRIMARY KEY (id)
);

-- Table: LocationTimelines
CREATE TABLE LocationTimelines (
    id int NOT NULL AUTO_INCREMENT,
    start timestamp NOT NULL,
    end timestamp NOT NULL,
    truck_id int NOT NULL,
    location_id int NOT NULL,
    checked_in bool NOT NULL,
    CONSTRAINT LocationTimelines_pk PRIMARY KEY (id)
);

-- Table: LocationVotes
CREATE TABLE LocationVotes (
    id int NOT NULL AUTO_INCREMENT,
    location_id int NOT NULL,
    brand_id int NOT NULL,
    user_id int NOT NULL,
    CONSTRAINT LocationVotes_pk PRIMARY KEY (id)
);

-- Table: Locations
CREATE TABLE Locations (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    address varchar(100) NOT NULL,
    lat decimal(9,6) NOT NULL,
    lng decimal(9,6) NOT NULL,
    CONSTRAINT Locations_pk PRIMARY KEY (id)
);

-- Table: MenuItems
CREATE TABLE MenuItems (
    id int NOT NULL AUTO_INCREMENT,
    brand_id int NOT NULL,
    name varchar(30) NOT NULL,
    price decimal(6,2) NOT NULL,
    calories int NOT NULL,
    CONSTRAINT MenuItems_pk PRIMARY KEY (id)
);

-- Table: Notifications
CREATE TABLE Notifications (
    id int NOT NULL AUTO_INCREMENT,
    text varchar(100) NOT NULL,
    user_id int NOT NULL,
    brand_id int NOT NULL,
    CONSTRAINT Notifications_pk PRIMARY KEY (id)
);

-- Table: OrderItems
CREATE TABLE OrderItems (
    id int NOT NULL AUTO_INCREMENT,
    order_id int NOT NULL,
    menu_item_id int NOT NULL,
    CONSTRAINT OrderItems_pk PRIMARY KEY (id)
);

-- Table: Orders
CREATE TABLE Orders (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    truck_id int NOT NULL,
    date timestamp NOT NULL,
    user_coupon_id int NOT NULL,
    ready bool NOT NULL,
    CONSTRAINT Orders_pk PRIMARY KEY (id)
);

-- Table: TruckAttendees
CREATE TABLE TruckAttendees (
    id int NOT NULL AUTO_INCREMENT,
    truck_id int NOT NULL,
    event_id int NOT NULL,
    CONSTRAINT TruckAttendees_pk PRIMARY KEY (id)
);

-- Table: Trucks
CREATE TABLE Trucks (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(20) NULL,
    brand_id int NOT NULL,
    CONSTRAINT Trucks_pk PRIMARY KEY (id)
);

-- Table: Upvotes
CREATE TABLE Upvotes (
    id int NOT NULL AUTO_INCREMENT,
    brand_id int NOT NULL,
    user_id int NOT NULL,
    date timestamp NOT NULL,
    CONSTRAINT Upvotes_pk PRIMARY KEY (id)
);

-- Table: UserAttendees
CREATE TABLE UserAttendees (
    id int NOT NULL AUTO_INCREMENT,
    event_id int NOT NULL,
    user_id int NOT NULL,
    CONSTRAINT UserAttendees_pk PRIMARY KEY (id)
);

-- Table: UserCoupons
CREATE TABLE UserCoupons (
    id int NOT NULL AUTO_INCREMENT,
    redeemed bool NOT NULL,
    coupon_id int NOT NULL,
    user_reward_id int NOT NULL,
    CONSTRAINT UserCoupons_pk PRIMARY KEY (id)
);

-- Table: UserFollows
CREATE TABLE UserFollows (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    brand_id int NOT NULL,
    favorite bool NULL DEFAULT false,
    CONSTRAINT UserFollows_pk PRIMARY KEY (id)
);

-- Table: UserRewards
CREATE TABLE UserRewards (
    id int NOT NULL AUTO_INCREMENT,
    brand_id int NOT NULL,
    user_id int NOT NULL,
    count int NOT NULL,
    CONSTRAINT UserRewards_pk PRIMARY KEY (id)
);

-- Table: Users
CREATE TABLE Users (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(100) NOT NULL,
    is_truck_owner bool NOT NULL,
    auth0_id varchar(30) NOT NULL,
    UNIQUE INDEX Users_email_unique_index (email),
    UNIQUE INDEX Users_auth0id_unique_index (auth0_id),
    CONSTRAINT id PRIMARY KEY (id)
);

-- foreign keys
-- Reference: BrandComment_Brand (table: BrandComments)
ALTER TABLE BrandComments ADD CONSTRAINT BrandComment_Brand FOREIGN KEY BrandComment_Brand (brand_id)
    REFERENCES Brands (id);

-- Reference: BrandComment_Users (table: BrandComments)
ALTER TABLE BrandComments ADD CONSTRAINT BrandComment_Users FOREIGN KEY BrandComment_Users (users_id)
    REFERENCES Users (id);

-- Reference: BrandComments_Brand (table: BrandReviews)
ALTER TABLE BrandReviews ADD CONSTRAINT BrandComments_Brand FOREIGN KEY BrandComments_Brand (brand_id)
    REFERENCES Brands (id);

-- Reference: BrandComments_Users (table: BrandReviews)
ALTER TABLE BrandReviews ADD CONSTRAINT BrandComments_Users FOREIGN KEY BrandComments_Users (user_id)
    REFERENCES Users (id);

-- Reference: BrandImages_Brand (table: BrandImages)
ALTER TABLE BrandImages ADD CONSTRAINT BrandImages_Brand FOREIGN KEY BrandImages_Brand (brand_id)
    REFERENCES Brands (id);

-- Reference: BrandImages_Images (table: BrandImages)
ALTER TABLE BrandImages ADD CONSTRAINT BrandImages_Images FOREIGN KEY BrandImages_Images (image_id)
    REFERENCES Images (id);

-- Reference: BrandReviewsImages_BrandReviews (table: BrandReviewsImages)
ALTER TABLE BrandReviewsImages ADD CONSTRAINT BrandReviewsImages_BrandReviews FOREIGN KEY BrandReviewsImages_BrandReviews (brand_review_id)
    REFERENCES BrandReviews (id);

-- Reference: BrandReviewsImages_Images (table: BrandReviewsImages)
ALTER TABLE BrandReviewsImages ADD CONSTRAINT BrandReviewsImages_Images FOREIGN KEY BrandReviewsImages_Images (image_id)
    REFERENCES Images (id);

-- Reference: Brand_Coupons (table: Brands)
ALTER TABLE Brands ADD CONSTRAINT Brand_Coupons FOREIGN KEY Brand_Coupons (default_coupon_id)
    REFERENCES Coupons (id);

-- Reference: Brand_FoodGenre (table: Brands)
ALTER TABLE Brands ADD CONSTRAINT Brand_FoodGenre FOREIGN KEY Brand_FoodGenre (food_genre_id)
    REFERENCES FoodGenres (id);

-- Reference: Brand_Truck (table: Trucks)
ALTER TABLE Trucks ADD CONSTRAINT Brand_Truck FOREIGN KEY Brand_Truck (brand_id)
    REFERENCES Brands (id);

-- Reference: Coupons_MenuItems (table: Coupons)
ALTER TABLE Coupons ADD CONSTRAINT Coupons_MenuItems FOREIGN KEY Coupons_MenuItems (menu_item_id)
    REFERENCES MenuItems (id);

-- Reference: EventComment_Events (table: EventComments)
ALTER TABLE EventComments ADD CONSTRAINT EventComment_Events FOREIGN KEY EventComment_Events (event_id)
    REFERENCES Events (id);

-- Reference: EventComment_Users (table: EventComments)
ALTER TABLE EventComments ADD CONSTRAINT EventComment_Users FOREIGN KEY EventComment_Users (user_id)
    REFERENCES Users (id);

-- Reference: Events_Locations (table: Events)
ALTER TABLE Events ADD CONSTRAINT Events_Locations FOREIGN KEY Events_Locations (location_id)
    REFERENCES Locations (id);

-- Reference: Events_Users (table: Events)
ALTER TABLE Events ADD CONSTRAINT Events_Users FOREIGN KEY Events_Users (event_owner_id)
    REFERENCES Users (id);

-- Reference: Images_Users (table: Images)
ALTER TABLE Images ADD CONSTRAINT Images_Users FOREIGN KEY Images_Users (user_id)
    REFERENCES Users (id);

-- Reference: LocationVotes_Brand (table: LocationVotes)
ALTER TABLE LocationVotes ADD CONSTRAINT LocationVotes_Brand FOREIGN KEY LocationVotes_Brand (brand_id)
    REFERENCES Brands (id);

-- Reference: LocationVotes_Locations (table: LocationVotes)
ALTER TABLE LocationVotes ADD CONSTRAINT LocationVotes_Locations FOREIGN KEY LocationVotes_Locations (location_id)
    REFERENCES Locations (id);

-- Reference: LocationVotes_Users (table: LocationVotes)
ALTER TABLE LocationVotes ADD CONSTRAINT LocationVotes_Users FOREIGN KEY LocationVotes_Users (user_id)
    REFERENCES Users (id);

-- Reference: Locations_LocationComments (table: LocationComments)
ALTER TABLE LocationComments ADD CONSTRAINT Locations_LocationComments FOREIGN KEY Locations_LocationComments (location_id)
    REFERENCES Locations (id);

-- Reference: Locations_LocationTimelines (table: LocationTimelines)
ALTER TABLE LocationTimelines ADD CONSTRAINT Locations_LocationTimelines FOREIGN KEY Locations_LocationTimelines (location_id)
    REFERENCES Locations (id);

-- Reference: Menu_Brand (table: MenuItems)
ALTER TABLE MenuItems ADD CONSTRAINT Menu_Brand FOREIGN KEY Menu_Brand (brand_id)
    REFERENCES Brands (id);

-- Reference: Notifications_Brand (table: Notifications)
ALTER TABLE Notifications ADD CONSTRAINT Notifications_Brand FOREIGN KEY Notifications_Brand (brand_id)
    REFERENCES Brands (id);

-- Reference: Notifications_Users (table: Notifications)
ALTER TABLE Notifications ADD CONSTRAINT Notifications_Users FOREIGN KEY Notifications_Users (user_id)
    REFERENCES Users (id);

-- Reference: OrderItems_MenuItems (table: OrderItems)
ALTER TABLE OrderItems ADD CONSTRAINT OrderItems_MenuItems FOREIGN KEY OrderItems_MenuItems (menu_item_id)
    REFERENCES MenuItems (id);

-- Reference: OrderItems_Orders (table: OrderItems)
ALTER TABLE OrderItems ADD CONSTRAINT OrderItems_Orders FOREIGN KEY OrderItems_Orders (order_id)
    REFERENCES Orders (id);

-- Reference: Orders_Truck (table: Orders)
ALTER TABLE Orders ADD CONSTRAINT Orders_Truck FOREIGN KEY Orders_Truck (truck_id)
    REFERENCES Trucks (id);

-- Reference: Orders_UserCoupons (table: Orders)
ALTER TABLE Orders ADD CONSTRAINT Orders_UserCoupons FOREIGN KEY Orders_UserCoupons (user_coupon_id)
    REFERENCES UserCoupons (id);

-- Reference: Orders_Users (table: Orders)
ALTER TABLE Orders ADD CONSTRAINT Orders_Users FOREIGN KEY Orders_Users (user_id)
    REFERENCES Users (id);

-- Reference: TruckAttendees_Events (table: TruckAttendees)
ALTER TABLE TruckAttendees ADD CONSTRAINT TruckAttendees_Events FOREIGN KEY TruckAttendees_Events (event_id)
    REFERENCES Events (id);

-- Reference: TruckAttendees_Truck (table: TruckAttendees)
ALTER TABLE TruckAttendees ADD CONSTRAINT TruckAttendees_Truck FOREIGN KEY TruckAttendees_Truck (truck_id)
    REFERENCES Trucks (id);

-- Reference: Truck_LocationTimelines (table: LocationTimelines)
ALTER TABLE LocationTimelines ADD CONSTRAINT Truck_LocationTimelines FOREIGN KEY Truck_LocationTimelines (truck_id)
    REFERENCES Trucks (id);

-- Reference: Upvote_Brand (table: Upvotes)
ALTER TABLE Upvotes ADD CONSTRAINT Upvote_Brand FOREIGN KEY Upvote_Brand (brand_id)
    REFERENCES Brands (id);

-- Reference: Upvote_Users (table: Upvotes)
ALTER TABLE Upvotes ADD CONSTRAINT Upvote_Users FOREIGN KEY Upvote_Users (user_id)
    REFERENCES Users (id);

-- Reference: UserAttendees_Events (table: UserAttendees)
ALTER TABLE UserAttendees ADD CONSTRAINT UserAttendees_Events FOREIGN KEY UserAttendees_Events (event_id)
    REFERENCES Events (id);

-- Reference: UserAttendees_Users (table: UserAttendees)
ALTER TABLE UserAttendees ADD CONSTRAINT UserAttendees_Users FOREIGN KEY UserAttendees_Users (user_id)
    REFERENCES Users (id);

-- Reference: UserCoupons_Coupons (table: UserCoupons)
ALTER TABLE UserCoupons ADD CONSTRAINT UserCoupons_Coupons FOREIGN KEY UserCoupons_Coupons (coupon_id)
    REFERENCES Coupons (id);

-- Reference: UserCoupons_UserRewards (table: UserCoupons)
ALTER TABLE UserCoupons ADD CONSTRAINT UserCoupons_UserRewards FOREIGN KEY UserCoupons_UserRewards (user_reward_id)
    REFERENCES UserRewards (id);

-- Reference: UserFollows_Brand (table: UserFollows)
ALTER TABLE UserFollows ADD CONSTRAINT UserFollows_Brand FOREIGN KEY UserFollows_Brand (brand_id)
    REFERENCES Brands (id);

-- Reference: UserFollows_Users (table: UserFollows)
ALTER TABLE UserFollows ADD CONSTRAINT UserFollows_Users FOREIGN KEY UserFollows_Users (user_id)
    REFERENCES Users (id);

-- Reference: UserRewards_Brand (table: UserRewards)
ALTER TABLE UserRewards ADD CONSTRAINT UserRewards_Brand FOREIGN KEY UserRewards_Brand (brand_id)
    REFERENCES Brands (id);

-- Reference: UserRewards_Users (table: UserRewards)
ALTER TABLE UserRewards ADD CONSTRAINT UserRewards_Users FOREIGN KEY UserRewards_Users (user_id)
    REFERENCES Users (id);

-- Reference: Users_Brand (table: Brands)
ALTER TABLE Brands ADD CONSTRAINT Users_Brand FOREIGN KEY Users_Brand (owner_id)
    REFERENCES Users (id);

-- Reference: Users_LocationComments (table: LocationComments)
ALTER TABLE LocationComments ADD CONSTRAINT Users_LocationComments FOREIGN KEY Users_LocationComments (user_id)
    REFERENCES Users (id);

-- End of file.

