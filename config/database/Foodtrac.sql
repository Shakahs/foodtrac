-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-06-08 08:32:15.428

-- tables
-- Table: BrandAttendees
CREATE TABLE BrandAttendees (
    id int NOT NULL AUTO_INCREMENT,
    event_id int NOT NULL,
    brand_id int NOT NULL,
    UNIQUE INDEX BrandAttendees_Unique (event_id,brand_id),
    CONSTRAINT BrandAttendees_pk PRIMARY KEY (id)
);

CREATE INDEX BrandAttendees_Events ON BrandAttendees (event_id);

CREATE INDEX BrandAttendees_Brands ON BrandAttendees (brand_id);

-- Table: BrandImages
CREATE TABLE BrandImages (
    id int NOT NULL AUTO_INCREMENT,
    brand_id int NOT NULL,
    image_id int NOT NULL,
    CONSTRAINT BrandImages_pk PRIMARY KEY (id)
);

CREATE INDEX BrandImages_Brand ON BrandImages (brand_id);

CREATE INDEX BrandImages_Images ON BrandImages (image_id);

-- Table: BrandReviews
CREATE TABLE BrandReviews (
    id int NOT NULL AUTO_INCREMENT,
    text text NOT NULL,
    score int NOT NULL,
    user_id int NOT NULL,
    brand_id int NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title varchar(20) NULL,
    CONSTRAINT BrandReviews_pk PRIMARY KEY (id)
);

CREATE INDEX BrandComments_Brand ON BrandReviews (brand_id);

CREATE INDEX BrandComments_Users ON BrandReviews (user_id);

-- Table: BrandReviewsImages
CREATE TABLE BrandReviewsImages (
    id int NOT NULL AUTO_INCREMENT,
    brand_review_id int NOT NULL,
    image_id int NOT NULL,
    CONSTRAINT BrandReviewsImages_pk PRIMARY KEY (id)
);

CREATE INDEX BrandReviewsImages_BrandReviews ON BrandReviewsImages (brand_review_id);

CREATE INDEX BrandReviewsImages_Images ON BrandReviewsImages (image_id);

-- Table: Brands
CREATE TABLE Brands (
    id int NOT NULL AUTO_INCREMENT,
    owner_id int NOT NULL,
    name varchar(30) NOT NULL,
    description text NOT NULL,
    food_genre_id int NOT NULL,
    rewards_trigger int NULL DEFAULT NULL,
    default_coupon_id int NULL DEFAULT NULL,
    cover_image_id int NULL,
    CONSTRAINT Brands_pk PRIMARY KEY (id)
);

CREATE INDEX Brand_Coupons ON Brands (default_coupon_id);

CREATE INDEX Brand_FoodGenre ON Brands (food_genre_id);

CREATE INDEX Users_Brand ON Brands (owner_id);

-- Table: Comments
CREATE TABLE Comments (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    text text NOT NULL,
    brand_id int NULL,
    event_id int NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT Comments_pk PRIMARY KEY (id)
);

CREATE INDEX Comment_Brands ON Comments (brand_id);

CREATE INDEX Comment_Users ON Comments (user_id);

CREATE TRIGGER `test_before_insert` BEFORE INSERT ON `Comments`
FOR EACH ROW
BEGIN
    IF coalesce(NEW.brand_id, NEW.event_id) is null THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'No brand or event id';
    END IF;
END;

-- Table: Coupons
CREATE TABLE Coupons (
    id int NOT NULL AUTO_INCREMENT,
    percent_discount int NULL,
    flat_discount int NULL,
    CONSTRAINT Coupons_pk PRIMARY KEY (id)
);

-- Table: Events
CREATE TABLE Events (
    id int NOT NULL AUTO_INCREMENT,
    owner_id int NOT NULL,
    start timestamp NOT NULL,
    end timestamp NOT NULL DEFAULT 0,
    location_id int NOT NULL,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    CONSTRAINT Events_pk PRIMARY KEY (id)
);

CREATE INDEX Events_Locations ON Events (location_id);

CREATE INDEX Events_Users ON Events (owner_id);

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

CREATE INDEX Images_Users ON Images (user_id);

-- Table: LocationComments
CREATE TABLE LocationComments (
    id int NOT NULL AUTO_INCREMENT,
    text text NOT NULL,
    user_id int NOT NULL,
    location_id int NOT NULL,
    CONSTRAINT LocationComments_pk PRIMARY KEY (id)
);

CREATE INDEX Locations_LocationComments ON LocationComments (location_id);

CREATE INDEX Users_LocationComments ON LocationComments (user_id);

-- Table: LocationTimelines
CREATE TABLE LocationTimelines (
    id int NOT NULL AUTO_INCREMENT,
    start timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end timestamp NOT NULL DEFAULT 0,
    truck_id int NOT NULL,
    location_id int NOT NULL,
    checked_in tinyint NOT NULL DEFAULT false,
    CONSTRAINT LocationTimelines_pk PRIMARY KEY (id)
);

CREATE INDEX Locations_LocationTimelines ON LocationTimelines (location_id);

CREATE INDEX Truck_LocationTimelines ON LocationTimelines (truck_id);

-- Table: LocationVotes
CREATE TABLE LocationVotes (
    id int NOT NULL AUTO_INCREMENT,
    location_id int NOT NULL,
    brand_id int NOT NULL,
    user_id int NOT NULL,
    CONSTRAINT LocationVotes_pk PRIMARY KEY (id)
);

CREATE INDEX LocationVotes_Brand ON LocationVotes (brand_id);

CREATE INDEX LocationVotes_Locations ON LocationVotes (location_id);

CREATE INDEX LocationVotes_Users ON LocationVotes (user_id);

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
    price int NOT NULL,
    calories int NOT NULL,
    description varchar(45) NOT NULL,
    food_type_id int NULL,
    CONSTRAINT MenuItems_pk PRIMARY KEY (id)
);

CREATE INDEX Menu_Brand ON MenuItems (brand_id);

-- Table: OrderItems
CREATE TABLE OrderItems (
    id int NOT NULL AUTO_INCREMENT,
    order_id int NOT NULL,
    menu_item_id int NOT NULL,
    CONSTRAINT OrderItems_pk PRIMARY KEY (id)
);

CREATE INDEX OrderItems_MenuItems ON OrderItems (menu_item_id);

CREATE INDEX OrderItems_Orders ON OrderItems (order_id);

-- Table: Orders
CREATE TABLE Orders (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    truck_id int NOT NULL,
    date timestamp NOT NULL,
    user_coupon_id int NULL,
    ready tinyint NOT NULL,
    name varchar(45) NULL,
    CONSTRAINT Orders_pk PRIMARY KEY (id)
);

CREATE INDEX Orders_Truck ON Orders (truck_id);

CREATE INDEX Orders_UserCoupons ON Orders (user_coupon_id);

CREATE INDEX Orders_Users ON Orders (user_id);

-- Table: Trucks
CREATE TABLE Trucks (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(20) NULL DEFAULT NULL,
    brand_id int NOT NULL,
    `order` tinyint NULL,
    CONSTRAINT Trucks_pk PRIMARY KEY (id)
);

CREATE INDEX Brand_Truck ON Trucks (brand_id);

-- Table: Upvotes
CREATE TABLE Upvotes (
    id int NOT NULL AUTO_INCREMENT,
    brand_id int NOT NULL,
    user_id int NOT NULL,
    date timestamp NOT NULL,
    timeline_id int NULL,
    CONSTRAINT Upvotes_pk PRIMARY KEY (id)
);

CREATE INDEX Upvote_Brand ON Upvotes (brand_id);

CREATE INDEX Upvote_Users ON Upvotes (user_id);

CREATE INDEX Upvote_Timeline_idx ON Upvotes (timeline_id);

-- Table: UserAttendees
CREATE TABLE UserAttendees (
    id int NOT NULL AUTO_INCREMENT,
    event_id int NOT NULL,
    user_id int NOT NULL,
    UNIQUE INDEX UserAttendees_Unique (event_id,user_id),
    CONSTRAINT UserAttendees_pk PRIMARY KEY (id)
);

CREATE INDEX UserAttendees_Events ON UserAttendees (event_id);

CREATE INDEX UserAttendees_Users ON UserAttendees (user_id);

-- Table: UserCoupons
CREATE TABLE UserCoupons (
    id int NOT NULL AUTO_INCREMENT,
    redeemed tinyint NOT NULL,
    coupon_id int NOT NULL,
    user_reward_id int NOT NULL,
    CONSTRAINT UserCoupons_pk PRIMARY KEY (id)
);

CREATE INDEX UserCoupons_Coupons ON UserCoupons (coupon_id);

CREATE INDEX UserCoupons_UserRewards ON UserCoupons (user_reward_id);

-- Table: UserFollows
CREATE TABLE UserFollows (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    brand_id int NOT NULL,
    favorite tinyint NULL DEFAULT false,
    CONSTRAINT UserFollows_pk PRIMARY KEY (id)
);

CREATE INDEX UserFollows_Brand ON UserFollows (brand_id);

CREATE INDEX UserFollows_Users ON UserFollows (user_id);

-- Table: UserPushInfo
CREATE TABLE UserPushInfo (
    id int NOT NULL AUTO_INCREMENT,
    subscription text NOT NULL,
    user_id int NOT NULL,
    UNIQUE INDEX UserPushInfo_ak_1 (user_id),
    CONSTRAINT UserPushInfo_pk PRIMARY KEY (id)
);

CREATE INDEX UserPushInfo_Users ON UserPushInfo (user_id);

-- Table: UserRewards
CREATE TABLE UserRewards (
    id int NOT NULL AUTO_INCREMENT,
    brand_id int NOT NULL,
    user_id int NOT NULL,
    count int NOT NULL,
    CONSTRAINT UserRewards_pk PRIMARY KEY (id)
);

CREATE INDEX UserRewards_Brand ON UserRewards (brand_id);

CREATE INDEX UserRewards_Users ON UserRewards (user_id);

-- Table: Users
CREATE TABLE Users (
    id int NOT NULL AUTO_INCREMENT,
    auth0_id varchar(30) NOT NULL,
    is_truck_owner tinyint NOT NULL DEFAULT 0,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    UNIQUE INDEX Users_auth0id_unique_index (auth0_id),
    CONSTRAINT Users_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: BrandAttendees_Brands (table: BrandAttendees)
ALTER TABLE BrandAttendees ADD CONSTRAINT BrandAttendees_Brands FOREIGN KEY BrandAttendees_Brands (brand_id)
    REFERENCES Brands (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT;

-- Reference: BrandAttendees_Events (table: BrandAttendees)
ALTER TABLE BrandAttendees ADD CONSTRAINT BrandAttendees_Events FOREIGN KEY BrandAttendees_Events (event_id)
    REFERENCES Events (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT;

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

-- Reference: Brands_Images (table: Brands)
ALTER TABLE Brands ADD CONSTRAINT Brands_Images FOREIGN KEY Brands_Images (cover_image_id)
    REFERENCES Images (id);

-- Reference: Comment_Brand (table: Comments)
ALTER TABLE Comments ADD CONSTRAINT Comment_Brand FOREIGN KEY Comment_Brand (brand_id)
    REFERENCES Brands (id);

-- Reference: Comment_Users (table: Comments)
ALTER TABLE Comments ADD CONSTRAINT Comment_Users FOREIGN KEY Comment_Users (user_id)
    REFERENCES Users (id);

-- Reference: Comments_Events (table: Comments)
ALTER TABLE Comments ADD CONSTRAINT Comments_Events FOREIGN KEY Comments_Events (event_id)
    REFERENCES Events (id);

-- Reference: Events_Locations (table: Events)
ALTER TABLE Events ADD CONSTRAINT Events_Locations FOREIGN KEY Events_Locations (location_id)
    REFERENCES Locations (id);

-- Reference: Events_Users (table: Events)
ALTER TABLE Events ADD CONSTRAINT Events_Users FOREIGN KEY Events_Users (owner_id)
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
    REFERENCES Locations (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT;

-- Reference: Menu_Brand (table: MenuItems)
ALTER TABLE MenuItems ADD CONSTRAINT Menu_Brand FOREIGN KEY Menu_Brand (brand_id)
    REFERENCES Brands (id);

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

-- Reference: Truck_LocationTimelines (table: LocationTimelines)
ALTER TABLE LocationTimelines ADD CONSTRAINT Truck_LocationTimelines FOREIGN KEY Truck_LocationTimelines (truck_id)
    REFERENCES Trucks (id);

-- Reference: Upvote_Brand (table: Upvotes)
ALTER TABLE Upvotes ADD CONSTRAINT Upvote_Brand FOREIGN KEY Upvote_Brand (brand_id)
    REFERENCES Brands (id);

-- Reference: Upvote_Timeline (table: Upvotes)
ALTER TABLE Upvotes ADD CONSTRAINT Upvote_Timeline FOREIGN KEY Upvote_Timeline (timeline_id)
    REFERENCES LocationTimelines (id);

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

-- Reference: UserPushInfo_Users (table: UserPushInfo)
ALTER TABLE UserPushInfo ADD CONSTRAINT UserPushInfo_Users FOREIGN KEY UserPushInfo_Users (user_id)
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

