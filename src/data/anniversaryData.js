// Anniversary statistics and section content
// Update the stats with your actual data!

export const anniversaryData = [
  {
    id: 1,
    title: "Our Year 3 In Review!",
    stat: null,
    statLabel: "February 11, 2025",
    description: "Starting our third year together ✨",
    audioTrack: "track1.mp3",
    backgroundColor: "#FF6B9D",
    imageUrl: null,
    images: [],
    tapToReveal: [
      { label: "First Message", value: '"Are we calling 3:"', type: "text" },
      { label: "Date & Time", value: "February 11, 2025 at 1:33 AM", type: "text" }
    ]
  },
  {
    id: 2,
    title: "Our Messaging!",
    stat: 13152,
    statLabel: "total messages",
    description: "U can't stop the texting me :p",
    audioTrack: "track2.mp3",
    backgroundColor: "#C44569",
    imageUrl: null,
    images: [],
    tapToReveal: [
      { label: "Elisa's Messages", value: 6605, type: "number" },
      { label: "Darian's Messages", value: 6547, type: "number" },
      { label: "Most Common Word", value: "love (449 times)", type: "text" },
      { label: "Busiest Month", value: "August 2025 (1,547 messages)", type: "text" },
      { label: "Busiest Day", value: "December 12, 2025 (295 messages)", type: "text" },
      { label: "Longest Streak", value: "6 days (Aug 28 - Sep 2)", type: "text" }
    ]
  },
  {
    id: 3,
    title: "Adventures Together",
    stat: null,
    statLabel: "places we've been",
    description: "Tap to reveal our journey 🗺️",
    audioTrack: "track3.mp3",
    backgroundColor: "#F8B500",
    imageUrl: null,
    images: [],
    mapData: {
      center: [45.0, -100.0], // Center of North America to show all locations
      zoom: 3,
      locations: [
        {
          id: 1,
          name: "Home",
          coords: [49.8951, -97.1384],
          date: "Always",
          description: "Winnipeg - where our story continues every day"
        },
        {
          id: 2,
          name: "Vancouver, BC",
          coords: [49.2827, -123.1207],
          date: "Year 3",
          description: "Beautiful Vancouver - Going to on the Cruise"
        },
        {
          id: 3,
          name: "Hoonah, Alaska",
          coords: [58.1100, -135.4436],
          date: "Year 3",
          description: "Alaska cruise First stop"
        },
        {
          id: 4,
          name: "Ketchikan, Alaska",
          coords: [55.3422, -131.6461],
          date: "Year 3",
          description: "And Yukon!"
        },
        {
          id: 5,
          name: "Juneau, Alaska",
          coords: [58.3019, -134.4197],
          date: "Year 3",
          description: "Waterfall was amazing, walking there was fun lol"
        },
        {
          id: 6,
          name: "Varadero, Cuba",
          coords: [23.1478, -81.2461],
          date: "Year 3",
          description: "We went at the right time! Loved sleeping half the time there with you :p"
        },
        {
          id: 7,
          name: "Havana, Cuba",
          coords: [23.1136, -82.3666],
          date: "Year 3",
          description: "No electrcity? No problem! "
        },
        {
          id: 8,
          name: "Matanzas, Cuba", 
          coords: [23.0418, -81.5775],
          date: "Year 3",
          description: "U did great driving the boat! Im happy we got to go scuba diving!"
        }
      ]
    },
    tapToReveal: [
      { label: "Total Places", value: 9, type: "number" },
      { label: "Countries Visited", value: 3, type: "number" },
      { label: "Furthest from Home", value: "Cuba (2,100 miles)", type: "text" },
      { label: "Most Memorable", value: "Alaska cruise together", type: "text" }
    ]
  },
  {
    id: 4,
    title: "Movie Nights Together",
    stat: 21,
    statLabel: "movies watched",
    description: "Im happy you love watching movies, and even more happy that we get to watch them together!",
    audioTrack: "track4.mp3",
    backgroundColor: "#9B59B6",
    imageUrl: null,
    images: [],
    movieData: {
      totalMovies: 21,
      totalMinutes: 2310,
      totalHours: 38.5,
      genres: ["Action", "Adventure", "Comedy", "Animation", "Mystery"],
      favorites: ["Scott Pilgrim vs The World", "Wicked", "Beauty and the Beast"],
      movieList: [
        "Minecraft Movie", "How to Train Your Dragon Live Action", "Predator: Killer of Killers: Kpop Demon Hunters",
        "Superman 2025", "F1", "Fantastic 4: First Steps", "Naked Gun", "Weapons", "Nobody 2",
        "Death on the Nile", "One Battle After Another", "Next", "Scott Pilgrim vs The World",
        "Wicked", "Beauty and the Beast", "Sore: A Wife From the Future", 
        "The SpongeBob Movie: Search for the SquarePants", "Eternity", "Murder on the Orient Express",
        "Zootopia 2", "Stand by Me"
      ]
    },
    tapToReveal: [
      { label: "Hours of Movies", value: "38.5 hours together", type: "text" },
      { label: "Number of Movies", value: 21, type: "number" },
      { label: "Our Genres", value: "Action & Adventure", type: "text" },
      { label: "Most Watched", value: "Hamilton", type: "text" }
    ]
  },
  {
    id: 5,
    title: "Some Cool Extra Facts",
    stat: 449,
    statLabel: "times we said 'love'",
    description: "",
    audioTrack: "track5.mp3",
    backgroundColor: "#6C5CE7",
    imageUrl: null,
    images: [],
    tapToReveal: [
      { label: "Times 'Chapuna' Was Said", value: 91, type: "number" },
      { label: "Our Favorite Expression", value: "oop (226 times)", type: "text" },
      { label: "Most Used Emoji", value: "😭 (used 384 times)", type: "text" },
      { label: "Most Popular Time to Text", value: "12 PM - 1 PM", type: "text" }
    ]
  },
  {
    id: 6,
    title: "Here's to Forever",
    stat: null,
    statLabel: "I love you more than words can say, thank you for being a part of my life and spending so much time with me!",
    description: "And this is just the beginning...",
    audioTrack: "track6.mp3",
    backgroundColor: "#FF7675",
    imageUrl: null,
    images: [],
    tapToReveal: [
      { label: "Years Together", value: 3, type: "number" },
      { label: "Years to Come", value: "∞", type: "text" },
      { label: "My Promise", value: "To love you just as much every day", type: "text" },
      { label: "Our Future", value: "Teeth and Quails LOL, and to be with each other always", type: "text" }
    ]
  },
];

export const anniversaryMeta = {
  title: "Our Third Year Together",
  startDate: "February 11, 2025",
  endDate: "February 9, 2026",
  subtitle: "A journey through our year",
};
