import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";

actor {
  type Destination = {
    #thailand;
    #europe;
    #usa;
    #asia;
  };

  type Difficulty = {
    #easy;
    #moderate;
    #challenging;
    #expert;
  };

  type ItineraryDay = {
    day : Nat;
    title : Text;
    description : Text;
  };

  type Tour = {
    id : Nat;
    name : Text;
    shortDescription : Text;
    fullDescription : Text;
    destination : Destination;
    duration : Nat;
    route : Text;
    priceUSD : Nat;
    difficulty : Difficulty;
    highlights : [Text];
    itinerary : [ItineraryDay];
    maxGroupSize : Nat;
    isActive : Bool;
    isFeatured : Bool;
    tourDates : [Text];
  };

  type Testimonial = {
    id : Nat;
    name : Text;
    country : Text;
    rating : Nat;
    text : Text;
    tourName : Text;
    date : Text;
  };

  type Inquiry = {
    id : Nat;
    firstName : Text;
    lastName : Text;
    email : Text;
    phone : Text;
    chatId : Text;
    message : Text;
    tourInterest : ?Text;
    submittedAt : Text;
  };

  type InquiryInput = {
    firstName : Text;
    lastName : Text;
    email : Text;
    phone : Text;
    chatId : Text;
    message : Text;
    tourInterest : ?Text;
  };

  let tours = List.fromArray<Tour>([
    {
      id = 1;
      name = "Northern Thailand Loop";
      shortDescription = "Explore the scenic roads and mountain passes of Northern Thailand.";
      fullDescription = "This scenic two-week tour takes you through Chiang Mai and Chiang Rai, past beautiful rice fields, and along the famous Mae Hong Son loop.";
      destination = #thailand;
      duration = 14;
      route = "Chiang Mai > Chiang Rai > Pai > Mae Hong Son";
      priceUSD = 3200;
      difficulty = #moderate;
      highlights = ["Mountain roads", "Chiang Rai temples", "Mae Hong Son loop"];
      itinerary = [{
        day = 1;
        title = "Arrival in Chiang Mai";
        description = "Explore Chiang Mai old town and meet the tour group.";
      }];
      maxGroupSize = 12;
      isActive = true;
      isFeatured = true;
      tourDates = ["2025-01-15", "2025-03-10", "2025-11-05"];
    },
    {
      id = 2;
      name = "Golden Triangle Adventure";
      shortDescription = "Ride along the Mekong river and discover the wild side of Thailand.";
      fullDescription = "A thrilling adventure covering the famous Golden Triangle area, known for its history and stunning views.";
      destination = #thailand;
      duration = 10;
      route = "Chiang Rai > Golden Triangle > Mae Sai";
      priceUSD = 2500;
      difficulty = #challenging;
      highlights = ["Mekong river rides", "Hill tribe villages", "Golden Triangle views"];
      itinerary = [];
      maxGroupSize = 10;
      isActive = true;
      isFeatured = true;
      tourDates = ["2025-04-20", "2025-12-10"];
    },
    {
      id = 3;
      name = "Alps Circuit";
      shortDescription = "Ride through Switzerland, Italy, Austria, and Germany across the stunning Alps.";
      fullDescription = "Experience breathtaking mountain passes, beautiful lakes, and charming villages, with daily rides through Europe’s best landscapes.";
      destination = #europe;
      duration = 15;
      route = "Swiss Alps > Italy > Austria > Germany";
      priceUSD = 4100;
      difficulty = #expert;
      highlights = ["Alpine roads", "European culture"];
      itinerary = [];
      maxGroupSize = 8;
      isActive = true;
      isFeatured = true;
      tourDates = ["2025-06-15", "2025-08-20"];
    },
    {
      id = 4;
      name = "Balkans Route";
      shortDescription = "Discover the hidden gems of Southeast Europe on two wheels.";
      fullDescription = "Set off on a cross-country journey through Croatia, Montenegro, Serbia, and Bulgaria and enjoy the diverse cultures and amazing scenery.";
      destination = #europe;
      duration = 12;
      route = "Croatia > Montenegro > Serbia > Bulgaria";
      priceUSD = 3400;
      difficulty = #moderate;
      highlights = ["Coastal rides", "Mountain passes"];
      itinerary = [];
      maxGroupSize = 10;
      isActive = true;
      isFeatured = false;
      tourDates = ["2025-05-10", "2025-09-15"];
    },
    {
      id = 5;
      name = "Pacific Coast Highway Ride";
      shortDescription = "Cruise the iconic Highway 1 from Los Angeles to San Francisco.";
      fullDescription = "Experience the most scenic coastal highway in the USA, with stops in beautiful California towns and breathtaking cliff-side views.";
      destination = #usa;
      duration = 7;
      route = "Los Angeles > Santa Barbara > San Francisco";
      priceUSD = 2200;
      difficulty = #easy;
      highlights = ["Scenic coastal highways", "California towns"];
      itinerary = [];
      maxGroupSize = 14;
      isActive = true;
      isFeatured = true;
      tourDates = ["2025-03-20", "2025-09-05"];
    },
    {
      id = 6;
      name = "Indochina Explorer";
      shortDescription = "Travel through Vietnam, Cambodia, and Laos on motorcycles.";
      fullDescription = "A once-in-a-lifetime ride exploring vibrant cities, rice paddies, and jungle roads across Southeast Asia.";
      destination = #asia;
      duration = 18;
      route = "Vietnam > Cambodia > Laos";
      priceUSD = 3700;
      difficulty = #challenging;
      highlights = ["Jungle roads", "Cultural experiences"];
      itinerary = [];
      maxGroupSize = 10;
      isActive = true;
      isFeatured = false;
      tourDates = ["2025-02-20", "2025-10-10"];
    },
  ]);

  let testimonials = List.fromArray<Testimonial>([
    {
      id = 1;
      name = "John Davis";
      country = "USA";
      rating = 5;
      text = "The northern Thailand loop was the trip of a lifetime! Great guides and scenic routes.";
      tourName = "Northern Thailand Loop";
      date = "2024-03-05";
    },
    {
      id = 2;
      name = "Anna Bühler";
      country = "Switzerland";
      rating = 5;
      text = "Loved the Alps circuit, challenging roads and stunning scenery. Highly recommend it.";
      tourName = "Alps Circuit";
      date = "2024-07-18";
    },
    {
      id = 3;
      name = "Peter Schmidt";
      country = "Germany";
      rating = 4;
      text = "Fun adventure in the Balkans, beautiful routes and good company.";
      tourName = "Balkans Route";
      date = "2023-09-10";
    },
    {
      id = 4;
      name = "Linda McKay";
      country = "Australia";
      rating = 5;
      text = "The Pacific Coast Highway tour was well-organized, and the views were spectacular!";
      tourName = "Pacific Coast Highway Ride";
      date = "2024-05-22";
    },
    {
      id = 5;
      name = "Matthew Smith";
      country = "UK";
      rating = 5;
      text = "Great experience on the Golden Triangle ride. Professional team and amazing food.";
      tourName = "Golden Triangle Adventure";
      date = "2024-11-15";
    },
    {
      id = 6;
      name = "Jessica Williams";
      country = "Canada";
      rating = 5;
      text = "Asia explorer route was incredible, best memories ever!";
      tourName = "Indochina Explorer";
      date = "2024-04-10";
    },
  ]);

  var nextInquiryId = 1;
  let inquiries = Map.empty<Nat, Inquiry>();

  public query ({ caller }) func getTours() : async [Tour] {
    tours.toArray();
  };

  public query ({ caller }) func getToursByDestination(destination : Destination) : async [Tour] {
    let filtered = tours.filter(
      func(tour) {
        tour.destination == destination;
      }
    );
    filtered.toArray();
  };

  public query ({ caller }) func getTour(id : Nat) : async Tour {
    let filtered = tours.filter(
      func(tour) {
        tour.id == id;
      }
    );
    switch (filtered.toArray().size()) {
      case (0) { Runtime.trap("Tour not found") };
      case (_) { filtered.toArray()[0] };
    };
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.toArray();
  };

  public query ({ caller }) func getFeaturedTours() : async [Tour] {
    let filtered = tours.filter(
      func(tour) {
        tour.isFeatured;
      }
    );
    filtered.toArray();
  };

  public shared ({ caller }) func submitInquiry(input : InquiryInput) : async Nat {
    let inquiryId = nextInquiryId;
    nextInquiryId += 1;

    let inquiry : Inquiry = {
      id = inquiryId;
      firstName = input.firstName;
      lastName = input.lastName;
      email = input.email;
      phone = input.phone;
      chatId = input.chatId;
      message = input.message;
      tourInterest = input.tourInterest;
      submittedAt = Time.now().toText();
    };

    inquiries.add(inquiryId, inquiry);
    inquiryId;
  };

  public query ({ caller }) func getInquiries() : async [Inquiry] {
    switch (inquiries.get(nextInquiryId)) {
      case (null) { ([] : [Inquiry]) };
      case (?_) {
        let inquiryList = List.empty<Inquiry>();
        let iter = inquiries.entries();
        for ((_, inquiry) in iter) {
          inquiryList.add(inquiry);
        };
        inquiryList.toArray();
      };
    };
  };
};
