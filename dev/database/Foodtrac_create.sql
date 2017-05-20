-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-05-19 23:34:38.298

-- tables
-- Table: Brand
CREATE TABLE Brand (
    id int NOT NULL,
    owner_id int NOT NULL,
    Truck_id int NOT NULL,
    name varchar(30) NOT NULL,
    description text NOT NULL,
    FoodGenre_id int NOT NULL,
    rewards_trigger int NOT NULL,
    default_coupon int NOT NULL,
    CONSTRAINT Brand_pk PRIMARY KEY (id)
);

-- Table: BrandComment
CREATE TABLE BrandComment (
    id int NOT NULL,
    text int NOT NULL,
    Brand_id int NOT NULL,
    Users_id int NOT NULL,
    CONSTRAINT BrandComment_pk PRIMARY KEY (id)
);

-- Table: BrandImages
CREATE TABLE BrandImages (
    id int NOT NULL,
    Brand_id int NOT NULL,
    Images_id int NOT NULL,
    CONSTRAINT BrandImages_pk PRIMARY KEY (id)
);

-- Table: BrandReviews
CREATE TABLE BrandReviews (
    id int NOT NULL,
    text text NOT NULL,
    score int NOT NULL,
    Users_id int NOT NULL,
    Brand_id int NOT NULL,
    CONSTRAINT BrandReviews_pk PRIMARY KEY (id)
);

-- Table: BrandReviewsImages
CREATE TABLE BrandReviewsImages (
    id int NOT NULL,
    BrandReviews_id int NOT NULL,
    Images_id int NOT NULL,
    CONSTRAINT BrandReviewsImages_pk PRIMARY KEY (id)
);

-- Table: Coupons
CREATE TABLE Coupons (
    id int NOT NULL,
    menu_item_free bool NOT NULL,
    menu_item_discount int NOT NULL,
    order_discount int NOT NULL,
    MenuItems_id int NULL,
    CONSTRAINT Coupons_pk PRIMARY KEY (id)
);

-- Table: EventComment
CREATE TABLE EventComment (
    id int NOT NULL,
    Users_id int NOT NULL,
    Events_id int NOT NULL,
    CONSTRAINT EventComment_pk PRIMARY KEY (id)
);

-- Table: Events
CREATE TABLE Events (
    id int NOT NULL,
    event_owner_id int NOT NULL,
    start timestamp NOT NULL,
    end timestamp NOT NULL,
    Locations_id int NOT NULL,
    name varchar(30) NOT NULL,
    description text NOT NULL,
    CONSTRAINT Events_pk PRIMARY KEY (id)
);

-- Table: FoodGenre
CREATE TABLE FoodGenre (
    id int NOT NULL,
    name varchar(20) NOT NULL,
    CONSTRAINT FoodGenre_pk PRIMARY KEY (id)
);

-- Table: Images
CREATE TABLE Images (
    id int NOT NULL,
    url varchar(30) NOT NULL,
    Users_id int NOT NULL,
    CONSTRAINT Images_pk PRIMARY KEY (id)
);

-- Table: LocationComments
CREATE TABLE LocationComments (
    id int NOT NULL,
    text text NOT NULL,
    user_id int NOT NULL,
    location_id int NOT NULL,
    CONSTRAINT LocationComments_pk PRIMARY KEY (id)
);

-- Table: LocationTimeline
CREATE TABLE LocationTimeline (
    id int NOT NULL,
    start timestamp NOT NULL,
    end timestamp NOT NULL,
    truck_id int NOT NULL,
    location_id int NOT NULL,
    checked_in bool NOT NULL,
    CONSTRAINT LocationTimeline_pk PRIMARY KEY (id)
);

-- Table: LocationVotes
CREATE TABLE LocationVotes (
    id int NOT NULL,
    Locations_id int NOT NULL,
    Brand_id int NOT NULL,
    Users_id int NOT NULL,
    CONSTRAINT LocationVotes_pk PRIMARY KEY (id)
);

-- Table: Locations
CREATE TABLE Locations (
    id int NOT NULL,
    name varchar(30) NOT NULL,
    address varchar(100) NOT NULL,
    lat decimal(9,6) NOT NULL,
    lng decimal(9,6) NOT NULL,
    CONSTRAINT Locations_pk PRIMARY KEY (id)
);

-- Table: MenuItems
CREATE TABLE MenuItems (
    id int NOT NULL,
    Brand_id int NOT NULL,
    name varchar(30) NOT NULL,
    price decimal(6,2) NOT NULL,
    calories int NOT NULL,
    CONSTRAINT MenuItems_pk PRIMARY KEY (id)
);

-- Table: Notifications
CREATE TABLE Notifications (
    id int NOT NULL,
    text varchar(100) NOT NULL,
    Users_id int NOT NULL,
    Brand_id int NOT NULL,
    CONSTRAINT Notifications_pk PRIMARY KEY (id)
);

-- Table: OrderItems
CREATE TABLE OrderItems (
    id int NOT NULL,
    Orders_id int NOT NULL,
    MenuItems_id int NOT NULL,
    CONSTRAINT OrderItems_pk PRIMARY KEY (id)
);

-- Table: Orders
CREATE TABLE Orders (
    id int NOT NULL,
    Users_id int NOT NULL,
    Truck_id int NOT NULL,
    date timestamp NOT NULL,
    user_coupon_id int NOT NULL,
    ready bool NOT NULL,
    CONSTRAINT Orders_pk PRIMARY KEY (id)
);

-- Table: Truck
CREATE TABLE Truck (
    id int NOT NULL,
    name varchar(20) NULL,
    brand_id int NOT NULL,
    CONSTRAINT Truck_pk PRIMARY KEY (id)
);

-- Table: TruckAttendees
CREATE TABLE TruckAttendees (
    id int NOT NULL,
    Truck_id int NOT NULL,
    Events_id int NOT NULL,
    CONSTRAINT TruckAttendees_pk PRIMARY KEY (id)
);

-- Table: Upvote
CREATE TABLE Upvote (
    id int NOT NULL,
    Brand_id int NOT NULL,
    Users_id int NOT NULL,
    date timestamp NOT NULL,
    CONSTRAINT Upvote_pk PRIMARY KEY (id)
);

-- Table: UserAttendees
CREATE TABLE UserAttendees (
    id int NOT NULL,
    Events_id int NOT NULL,
    Users_id int NOT NULL,
    CONSTRAINT UserAttendees_pk PRIMARY KEY (id)
);

-- Table: UserCoupons
CREATE TABLE UserCoupons (
    id int NOT NULL,
    redeemed bool NOT NULL,
    Coupons_id int NOT NULL,
    UserRewards_id int NOT NULL,
    CONSTRAINT UserCoupons_pk PRIMARY KEY (id)
);

-- Table: UserFollows
CREATE TABLE UserFollows (
    id int NOT NULL,
    Users_id int NOT NULL,
    Brand_id int NOT NULL,
    favorite bool NULL,
    CONSTRAINT UserFollows_pk PRIMARY KEY (id)
);

-- Table: UserRewards
CREATE TABLE UserRewards (
    id int NOT NULL,
    Brand_id int NOT NULL,
    Users_id int NOT NULL,
    count int NOT NULL,
    CONSTRAINT UserRewards_pk PRIMARY KEY (id)
);

-- Table: Users
CREATE TABLE Users (
    id int NOT NULL,
    email varchar(30) NOT NULL,
    is_truck_owner bool NOT NULL,
    auth0_id varchar(30) NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- foreign keys
-- Reference: BrandComment_Brand (table: BrandComment)
ALTER TABLE BrandComment ADD CONSTRAINT BrandComment_Brand FOREIGN KEY BrandComment_Brand (Brand_id)
    REFERENCES Brand (id);

-- Reference: BrandComment_Users (table: BrandComment)
ALTER TABLE BrandComment ADD CONSTRAINT BrandComment_Users FOREIGN KEY BrandComment_Users (Users_id)
    REFERENCES Users (id);

-- Reference: BrandComments_Brand (table: BrandReviews)
ALTER TABLE BrandReviews ADD CONSTRAINT BrandComments_Brand FOREIGN KEY BrandComments_Brand (Brand_id)
    REFERENCES Brand (id);

-- Reference: BrandComments_Users (table: BrandReviews)
ALTER TABLE BrandReviews ADD CONSTRAINT BrandComments_Users FOREIGN KEY BrandComments_Users (Users_id)
    REFERENCES Users (id);

-- Reference: BrandImages_Brand (table: BrandImages)
ALTER TABLE BrandImages ADD CONSTRAINT BrandImages_Brand FOREIGN KEY BrandImages_Brand (Brand_id)
    REFERENCES Brand (id);

-- Reference: BrandImages_Images (table: BrandImages)
ALTER TABLE BrandImages ADD CONSTRAINT BrandImages_Images FOREIGN KEY BrandImages_Images (Images_id)
    REFERENCES Images (id);

-- Reference: BrandReviewsImages_BrandReviews (table: BrandReviewsImages)
ALTER TABLE BrandReviewsImages ADD CONSTRAINT BrandReviewsImages_BrandReviews FOREIGN KEY BrandReviewsImages_BrandReviews (BrandReviews_id)
    REFERENCES BrandReviews (id);

-- Reference: BrandReviewsImages_Images (table: BrandReviewsImages)
ALTER TABLE BrandReviewsImages ADD CONSTRAINT BrandReviewsImages_Images FOREIGN KEY BrandReviewsImages_Images (Images_id)
    REFERENCES Images (id);

-- Reference: Brand_Coupons (table: Brand)
ALTER TABLE Brand ADD CONSTRAINT Brand_Coupons FOREIGN KEY Brand_Coupons (default_coupon)
    REFERENCES Coupons (id);

-- Reference: Brand_FoodGenre (table: Brand)
ALTER TABLE Brand ADD CONSTRAINT Brand_FoodGenre FOREIGN KEY Brand_FoodGenre (FoodGenre_id)
    REFERENCES FoodGenre (id);

-- Reference: Brand_Truck (table: Truck)
ALTER TABLE Truck ADD CONSTRAINT Brand_Truck FOREIGN KEY Brand_Truck (brand_id)
    REFERENCES Brand (id);

-- Reference: Coupons_MenuItems (table: Coupons)
ALTER TABLE Coupons ADD CONSTRAINT Coupons_MenuItems FOREIGN KEY Coupons_MenuItems (MenuItems_id)
    REFERENCES MenuItems (id);

-- Reference: EventComment_Events (table: EventComment)
ALTER TABLE EventComment ADD CONSTRAINT EventComment_Events FOREIGN KEY EventComment_Events (Events_id)
    REFERENCES Events (id);

-- Reference: EventComment_Users (table: EventComment)
ALTER TABLE EventComment ADD CONSTRAINT EventComment_Users FOREIGN KEY EventComment_Users (Users_id)
    REFERENCES Users (id);

-- Reference: Events_Locations (table: Events)
ALTER TABLE Events ADD CONSTRAINT Events_Locations FOREIGN KEY Events_Locations (Locations_id)
    REFERENCES Locations (id);

-- Reference: Events_Users (table: Events)
ALTER TABLE Events ADD CONSTRAINT Events_Users FOREIGN KEY Events_Users (event_owner_id)
    REFERENCES Users (id);

-- Reference: Images_Users (table: Images)
ALTER TABLE Images ADD CONSTRAINT Images_Users FOREIGN KEY Images_Users (Users_id)
    REFERENCES Users (id);

-- Reference: LocationVotes_Brand (table: LocationVotes)
ALTER TABLE LocationVotes ADD CONSTRAINT LocationVotes_Brand FOREIGN KEY LocationVotes_Brand (Brand_id)
    REFERENCES Brand (id);

-- Reference: LocationVotes_Locations (table: LocationVotes)
ALTER TABLE LocationVotes ADD CONSTRAINT LocationVotes_Locations FOREIGN KEY LocationVotes_Locations (Locations_id)
    REFERENCES Locations (id);

-- Reference: LocationVotes_Users (table: LocationVotes)
ALTER TABLE LocationVotes ADD CONSTRAINT LocationVotes_Users FOREIGN KEY LocationVotes_Users (Users_id)
    REFERENCES Users (id);

-- Reference: Locations_LocationComments (table: LocationComments)
ALTER TABLE LocationComments ADD CONSTRAINT Locations_LocationComments FOREIGN KEY Locations_LocationComments (location_id)
    REFERENCES Locations (id);

-- Reference: Locations_LocationTimeline (table: LocationTimeline)
ALTER TABLE LocationTimeline ADD CONSTRAINT Locations_LocationTimeline FOREIGN KEY Locations_LocationTimeline (location_id)
    REFERENCES Locations (id);

-- Reference: Menu_Brand (table: MenuItems)
ALTER TABLE MenuItems ADD CONSTRAINT Menu_Brand FOREIGN KEY Menu_Brand (Brand_id)
    REFERENCES Brand (id);

-- Reference: Notifications_Brand (table: Notifications)
ALTER TABLE Notifications ADD CONSTRAINT Notifications_Brand FOREIGN KEY Notifications_Brand (Brand_id)
    REFERENCES Brand (id);

-- Reference: Notifications_Users (table: Notifications)
ALTER TABLE Notifications ADD CONSTRAINT Notifications_Users FOREIGN KEY Notifications_Users (Users_id)
    REFERENCES Users (id);

-- Reference: OrderItems_MenuItems (table: OrderItems)
ALTER TABLE OrderItems ADD CONSTRAINT OrderItems_MenuItems FOREIGN KEY OrderItems_MenuItems (MenuItems_id)
    REFERENCES MenuItems (id);

-- Reference: OrderItems_Orders (table: OrderItems)
ALTER TABLE OrderItems ADD CONSTRAINT OrderItems_Orders FOREIGN KEY OrderItems_Orders (Orders_id)
    REFERENCES Orders (id);

-- Reference: Orders_Truck (table: Orders)
ALTER TABLE Orders ADD CONSTRAINT Orders_Truck FOREIGN KEY Orders_Truck (Truck_id)
    REFERENCES Truck (id);

-- Reference: Orders_UserCoupons (table: Orders)
ALTER TABLE Orders ADD CONSTRAINT Orders_UserCoupons FOREIGN KEY Orders_UserCoupons (user_coupon_id)
    REFERENCES UserCoupons (id);

-- Reference: Orders_Users (table: Orders)
ALTER TABLE Orders ADD CONSTRAINT Orders_Users FOREIGN KEY Orders_Users (Users_id)
    REFERENCES Users (id);

-- Reference: TruckAttendees_Events (table: TruckAttendees)
ALTER TABLE TruckAttendees ADD CONSTRAINT TruckAttendees_Events FOREIGN KEY TruckAttendees_Events (Events_id)
    REFERENCES Events (id);

-- Reference: TruckAttendees_Truck (table: TruckAttendees)
ALTER TABLE TruckAttendees ADD CONSTRAINT TruckAttendees_Truck FOREIGN KEY TruckAttendees_Truck (Truck_id)
    REFERENCES Truck (id);

-- Reference: Truck_LocationTimeline (table: LocationTimeline)
ALTER TABLE LocationTimeline ADD CONSTRAINT Truck_LocationTimeline FOREIGN KEY Truck_LocationTimeline (truck_id)
    REFERENCES Truck (id);

-- Reference: Upvote_Brand (table: Upvote)
ALTER TABLE Upvote ADD CONSTRAINT Upvote_Brand FOREIGN KEY Upvote_Brand (Brand_id)
    REFERENCES Brand (id);

-- Reference: Upvote_Users (table: Upvote)
ALTER TABLE Upvote ADD CONSTRAINT Upvote_Users FOREIGN KEY Upvote_Users (Users_id)
    REFERENCES Users (id);

-- Reference: UserAttendees_Events (table: UserAttendees)
ALTER TABLE UserAttendees ADD CONSTRAINT UserAttendees_Events FOREIGN KEY UserAttendees_Events (Events_id)
    REFERENCES Events (id);

-- Reference: UserAttendees_Users (table: UserAttendees)
ALTER TABLE UserAttendees ADD CONSTRAINT UserAttendees_Users FOREIGN KEY UserAttendees_Users (Users_id)
    REFERENCES Users (id);

-- Reference: UserCoupons_Coupons (table: UserCoupons)
ALTER TABLE UserCoupons ADD CONSTRAINT UserCoupons_Coupons FOREIGN KEY UserCoupons_Coupons (Coupons_id)
    REFERENCES Coupons (id);

-- Reference: UserCoupons_UserRewards (table: UserCoupons)
ALTER TABLE UserCoupons ADD CONSTRAINT UserCoupons_UserRewards FOREIGN KEY UserCoupons_UserRewards (UserRewards_id)
    REFERENCES UserRewards (id);

-- Reference: UserFollows_Brand (table: UserFollows)
ALTER TABLE UserFollows ADD CONSTRAINT UserFollows_Brand FOREIGN KEY UserFollows_Brand (Brand_id)
    REFERENCES Brand (id);

-- Reference: UserFollows_Users (table: UserFollows)
ALTER TABLE UserFollows ADD CONSTRAINT UserFollows_Users FOREIGN KEY UserFollows_Users (Users_id)
    REFERENCES Users (id);

-- Reference: UserRewards_Brand (table: UserRewards)
ALTER TABLE UserRewards ADD CONSTRAINT UserRewards_Brand FOREIGN KEY UserRewards_Brand (Brand_id)
    REFERENCES Brand (id);

-- Reference: UserRewards_Users (table: UserRewards)
ALTER TABLE UserRewards ADD CONSTRAINT UserRewards_Users FOREIGN KEY UserRewards_Users (Users_id)
    REFERENCES Users (id);

-- Reference: Users_Brand (table: Brand)
ALTER TABLE Brand ADD CONSTRAINT Users_Brand FOREIGN KEY Users_Brand (owner_id)
    REFERENCES Users (id);

-- Reference: Users_LocationComments (table: LocationComments)
ALTER TABLE LocationComments ADD CONSTRAINT Users_LocationComments FOREIGN KEY Users_LocationComments (user_id)
    REFERENCES Users (id);

-- End of file.

