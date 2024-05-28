const fevents = [
  {
    id: 1,
    name: "Concert in the Park",
    date: "2024-05-28",
    time: "18:00",
    creator: "judefabiano99@gmail.com",
    location: "Central Park, New York",
    coordinates: { lat: 40.785091, lng: -73.968285 },
    description:
      "Join us for an evening of live music in the park. Experience the enchanting melodies of local bands while enjoying the serene atmosphere of Central Park.",
    imageUrl: "https://source.unsplash.com/random/400x300?concert",
    attendees: [
      {
        id: 1,
        name: "John Doe",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        id: 2,
        name: "Jane Smith",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      {
        id: 3,
        name: "Alex Johnson",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      {
        id: 4,
        name: "Alex Johnson",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
      },
    ],
    tags: ["music", "outdoor", "community"],
    tickets: 300,
    ticketsSold: 250,
    ticketRanges: [
      {
        id: 1,
        type: "regular",
        price: 1200,
      },
      {
        id: 1,
        type: "VIP",
        price: 1700,
      },
      {
        id: 1,
        type: "VVIP",
        price: 2500,
      },
    ],
  },
  {
    id: 2,
    name: "Art Exhibition",
    date: "2024-05-28",
    time: "10:00",
    creator: "judefabiano99@gmail.com",
    location: "Modern Art Museum, San Francisco",
    coordinates: { lat: 37.785834, lng: -122.400621 },
    description:
      "Immerse yourself in a diverse collection of contemporary artworks by emerging and established local artists. This exhibition showcases creativity in various forms, from paintings to sculptures.",
    imageUrl: "https://source.unsplash.com/random/400x300?art",
    attendees: [
      {
        id: 4,
        name: "Emily Davis",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      {
        id: 5,
        name: "Michael Brown",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    ],
    tags: ["art", "exhibition", "culture"],
    tickets: 300,
    ticketsSold: 250,
    ticketRanges: [
      {
        id: 1,
        type: "regular",
        price: 1200,
      },
      {
        id: 1,
        type: "VIP",
        price: 1700,
      },
      {
        id: 1,
        type: "VVIP",
        price: 2500,
      },
    ],
  },
  {
    id: 3,
    name: "Food Festival",
    date: "2024-05-29",
    time: "12:00",
    creator: "judefabiano99@gmail.com",
    location: "Downtown, Los Angeles",
    coordinates: { lat: 34.040713, lng: -118.246769 },
    description:
      "Embark on a culinary journey around the world at the Downtown Food Festival. Indulge in a wide array of dishes, from street food delights to gourmet creations, all in one vibrant location.",
    imageUrl: "https://source.unsplash.com/random/400x300?food",
    attendees: [
      {
        id: 7,
        name: "Sarah Martinez",
        image: "https://randomuser.me/api/portraits/women/7.jpg",
      },
      {
        id: 8,
        name: "David Taylor",
        image: "https://randomuser.me/api/portraits/men/8.jpg",
      },
      {
        id: 9,
        name: "Laura Anderson",
        image: "https://randomuser.me/api/portraits/women/9.jpg",
      },
    ],
    tags: ["food", "festival", "community"],
    tickets: 300,
    ticketsSold: 250,
    ticketRanges: [
      {
        id: 1,
        type: "regular",
        price: 1200,
      },
      {
        id: 1,
        type: "VIP",
        price: 1700,
      },
      {
        id: 1,
        type: "VVIP",
        price: 2500,
      },
    ],
  },
  {
    id: 4,
    name: "Tech Conference",
    date: "2024-05-28",
    time: "09:00",
    creator: "fabiano@gmail.com",
    location: "Convention Center, Seattle",
    coordinates: { lat: 47.611436, lng: -122.330456 },
    description:
      "Connect with industry leaders and innovators at the Tech Conference in Seattle. Explore the latest trends in technology, attend insightful sessions, and network with like-minded professionals.",
    imageUrl: "https://source.unsplash.com/random/400x300?tech",
    attendees: [
      {
        id: 10,
        name: "Daniel Thomas",
        image: "https://randomuser.me/api/portraits/men/10.jpg",
      },
      {
        id: 11,
        name: "Anna White",
        image: "https://randomuser.me/api/portraits/women/11.jpg",
      },
      {
        id: 12,
        name: "James Harris",
        image: "https://randomuser.me/api/portraits/men/12.jpg",
      },
    ],
    tags: ["technology", "conference", "networking"],
    tickets: 300,
    ticketsSold: 250,
    ticketRanges: [
      {
        id: 1,
        type: "regular",
        price: 1200,
      },
      {
        id: 1,
        type: "VIP",
        price: 1700,
      },
      {
        id: 1,
        type: "VVIP",
        price: 2500,
      },
    ],
  },
  {
    id: 5,
    name: "Yoga Workshop",
    date: "2024-05-30",
    time: "08:00",
    creator: "fabiano@gmail.com",
    location: "Beachfront, Miami",
    coordinates: { lat: 25.790654, lng: -80.130045 },
    description:
      "Refresh your mind and body with a rejuvenating yoga session by the tranquil sea. Join us for a morning of relaxation and wellness at the Beachfront Yoga Workshop.",
    imageUrl: "https://source.unsplash.com/random/400x300?yoga",
    attendees: [
      {
        id: 13,
        name: "Sophia Lee",
        image: "https://randomuser.me/api/portraits/women/13.jpg",
      },
      {
        id: 14,
        name: "Jackson Walker",
        image: "https://randomuser.me/api/portraits/men/14.jpg",
      },
      {
        id: 15,
        name: "Mia Scott",
        image: "https://randomuser.me/api/portraits/women/15.jpg",
      },
    ],
    tags: ["yoga", "wellness", "beach"],
    tickets: 300,
    ticketsSold: 250,
    ticketRanges: [
      {
        id: 1,
        type: "regular",
        price: 1200,
      },
      {
        id: 1,
        type: "VIP",
        price: 1700,
      },
      {
        id: 1,
        type: "VVIP",
        price: 2500,
      },
    ],
  },
  {
    id: 6,
    name: "Book Fair",
    date: "2024-05-30",
    time: "11:00",
    creator: "fabiano@gmail.com",
    location: "City Library, Boston",
    coordinates: { lat: 42.360082, lng: -71.05888 },
    description:
      "Discover literary treasures and meet your favorite authors at the City Library Book Fair. Explore a wide selection of books, from bestsellers to hidden gems.",
    imageUrl: "https://source.unsplash.com/random/400x300?books",
    attendees: [
      {
        id: 16,
        name: "Lucas Young",
        image: "https://randomuser.me/api/portraits/men/16.jpg",
      },
      {
        id: 17,
        name: "Ava King",
        image: "https://randomuser.me/api/portraits/women/17.jpg",
      },
      {
        id: 18,
        name: "Olivia Adams",
        image: "https://randomuser.me/api/portraits/women/18.jpg",
      },
    ],
    tags: ["books", "fair", "community"],
    tickets: 300,
    ticketsSold: 250,
    ticketRanges: [
      {
        id: 1,
        type: "regular",
        price: 1200,
      },
      {
        id: 1,
        type: "VIP",
        price: 1700,
      },
      {
        id: 1,
        type: "VVIP",
        price: 2500,
      },
    ],
  },
  {
    id: 7,
    name: "Charity Run",
    date: "2024-05-29",
    time: "07:00",
    location: "Riverside Park, Chicago",
    coordinates: { lat: 42.360082, lng: -71.05888 },
    creator: "fabianojude@gmail.com",
    description:
      "Run for a cause at the Riverside Park Charity Run. Lace up your shoes and join us in raising funds for local charities and making a positive impact in our community.",
    imageUrl: "https://source.unsplash.com/random/400x300?run",
    attendees: [
      {
        id: 19,
        name: "William Green",
        image: "https://randomuser.me/api/portraits/men/19.jpg",
      },
      {
        id: 20,
        name: "Emma Hall",
        image: "https://randomuser.me/api/portraits/women/20.jpg",
      },
      {
        id: 21,
        name: "Ella Clark",
        image: "https://randomuser.me/api/portraits/women/21.jpg",
      },
    ],
    tags: ["charity", "run", "community"],
    tickets: 300,
    ticketsSold: 250,
    ticketRanges: [
      {
        id: 1,
        type: "regular",
        price: 1200,
      },
      {
        id: 1,
        type: "VIP",
        price: 1700,
      },
      {
        id: 1,
        type: "VVIP",
        price: 2500,
      },
    ],
  },
  {
    id: 8,
    name: "Film Screening",
    date: "2024-05-30",
    time: "19:00",
    location: "Outdoor Cinema, Austin",
    creator: "fabianosmith@gmail.com",
    description:
      "Experience the magic of cinema under the stars at the Outdoor Cinema Film Screening. Gather with friends and family for an unforgettable night of entertainment.",
    imageUrl: "https://source.unsplash.com/random/400x300?film",
    attendees: [
      {
        id: 22,
        name: "Benjamin Lewis",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: 23,
        name: "Amelia Robinson",
        image: "https://randomuser.me/api/portraits/women/23.jpg",
      },
      {
        id: 24,
        name: "Chloe Walker",
        image: "https://randomuser.me/api/portraits/women/24.jpg",
      },
    ],
    tags: ["film", "screening", "entertainment"],
    tickets: 300,
    ticketsSold: 250,
    ticketRanges: [
      {
        id: 1,
        type: "regular",
        price: 1200,
      },
      {
        id: 1,
        type: "VIP",
        price: 1700,
      },
      {
        id: 1,
        type: "VVIP",
        price: 2500,
      },
    ],
  },
  {
    id: 9,
    name: "Farmers Market",
    date: "2024-05-31",
    time: "09:00",
    creator: "fabiano@gmail.com",
    location: "Town Square, Portland",
    description:
      "Support local farmers and artisans at the Town Square Farmers Market. Shop for fresh produce, artisanal goods, and enjoy a vibrant community atmosphere.",
    imageUrl: "https://source.unsplash.com/random/400x300?market",
    attendees: [
      {
        id: 25,
        name: "Henry Perez",
        image: "https://randomuser.me/api/portraits/men/25.jpg",
      },
      {
        id: 26,
        name: "Evelyn Lee",
        image: "https://randomuser.me/api/portraits/women/26.jpg",
      },
      {
        id: 27,
        name: "Grace Hernandez",
        image: "https://randomuser.me/api/portraits/women/27.jpg",
      },
    ],
    tags: ["farmers market", "local", "community"],
    tickets: 400,
    ticketsSold: 150,
    ticketRanges: [
      {
        id: 1,
        type: "regular",
        price: 1200,
      },
      {
        id: 1,
        type: "VIP",
        price: 1700,
      },
      {
        id: 1,
        type: "VVIP",
        price: 2500,
      },
    ],
  },
  {
    id: 10,
    name: "Theater Play",
    date: "2024-06-01",
    time: "20:00",
    location: "Grand Theater, Atlanta",
    coordinates: { lat: 42.360082, lng: -71.05888 },
    creator: "fabiano@gmail.com",
    description:
      "Immerse yourself in the world of theater with a captivating live performance at the Grand Theater. Experience the magic of storytelling brought to life on stage.",
    imageUrl: "https://source.unsplash.com/random/400x300?theater",
    attendees: [
      {
        id: 28,
        name: "Matthew Scott",
        image: "https://randomuser.me/api/portraits/men/28.jpg",
      },
      {
        id: 29,
        name: "Sofia King",
        image: "https://randomuser.me/api/portraits/women/29.jpg",
      },
      {
        id: 30,
        name: "Isabella Wright",
        image: "https://randomuser.me/api/portraits/women/30.jpg",
      },
    ],
    tags: ["theater", "play", "arts"],
    tickets: 500,
    ticketsSold: 200,
    ticketRanges: [
      {
        id: 1,
        type: "regular",
        price: 1200,
      },
      {
        id: 1,
        type: "VIP",
        price: 1700,
      },
      {
        id: 1,
        type: "VVIP",
        price: 5000,
      },
    ],
  },
];

export default fevents;
