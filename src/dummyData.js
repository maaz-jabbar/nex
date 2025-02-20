export const userId = -1;

export const myUser = {
  id: userId,
  imageLink:
    'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
  name: 'Max Parker',
  email: 'janetsmith@nexsa.com',
  phone: '+1 (202) 555 0142 ',
  storyAvailable: true,
};

export const contacts = [
  {
    id: 1,
    imageLink:
      'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
    name: 'John Doe',
    email: 'janetsmith@nexsa.com',
    phone: '+1 (202) 555 0142 ',
    storyAvailable: true,
  },
  {
    id: 2,
    imageLink:
      'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg',
    name: 'Emily Clark',
    email: 'janetsmith@nexsa.com',
    phone: '+1 (202) 555 0142 ',
    storyAvailable: false,
  },
  {
    id: 3,
    imageLink:
      'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
    name: 'Janet S',
    email: 'janetsmith@nexsa.com',
    phone: '+1 (202) 555 0142 ',
    storyAvailable: true,
  },
  {
    id: 4,
    imageLink:
      'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
    name: 'Marty M',
    email: 'janetsmith@nexsa.com',
    phone: '+1 (202) 555 0142 ',
    storyAvailable: true,
  },
  {
    id: 5,
    imageLink:
      'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
    name: 'John D',
    email: 'janetsmith@nexsa.com',
    phone: '+1 (202) 555 0142 ',
    storyAvailable: true,
  },
  {
    id: 6,
    imageLink:
      'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg',
    name: 'Emily',
    email: 'janetsmith@nexsa.com',
    phone: '+1 (202) 555 0142 ',
    storyAvailable: false,
  },
  {
    id: 7,
    imageLink:
      'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
    name: 'Janet S',
    email: 'janetsmith@nexsa.com',
    phone: '+1 (202) 555 0142 ',
    storyAvailable: true,
  },
  {
    id: 8,
    imageLink:
      'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
    name: 'Marty M',
    email: 'janetsmith@nexsa.com',
    phone: '+1 (202) 555 0142 ',
    storyAvailable: true,
  },
];

export const chats = [
  {
    id: 1,
    user: {
      id: 1,
      imageLink:
        'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      name: 'Marty M',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: true,
    },
    lastMessage: {
      senderId: 1,
      text: 'Hi there, how are you?',
      time: 'Just Now',
      isRead: true,
    },
    isTyping: false,
    unreadCount: 2,
  },
  {
    id: 1,
    user: {
      id: 1,
      imageLink:
        'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
      name: 'John Doe',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: true,
    },
    lastMessage: {
      senderId: -1,
      text: 'Hey.',
      time: '23:10',
      isRead: false,
    },
    isTyping: false,
    unreadCount: 5,
  },
  {
    id: 1,
    user: {
      id: 6,
      imageLink:
        'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg',
      name: 'Emily',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: false,
    },
    lastMessage: {
      senderId: -1,
      text: 'Hi there, how are you?',
      time: '23:10',
      isRead: true,
    },
    isTyping: false,
    unreadCount: 5,
  },
  {
    id: 1,
    user: {
      id: 7,
      imageLink:
        'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
      name: 'Janet S',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: true,
    },
    lastMessage: {
      senderId: 7,
      text: 'Thanks! Please let me know if you have any questions.',
      time: '23:10',
      isRead: true,
    },
    isTyping: true,
    unreadCount: 1,
  },
  {
    id: 1,
    user: {
      id: 1,
      imageLink:
        'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      name: 'Marty M',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: true,
    },
    lastMessage: {
      senderId: 1,
      text: 'Hi there, how are you?',
      time: 'Just Now',
      isRead: true,
    },
    isTyping: false,
    unreadCount: 2,
  },
  {
    id: 1,
    user: {
      id: 1,
      imageLink:
        'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
      name: 'John Doe',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: true,
    },
    lastMessage: {
      senderId: -1,
      text: 'Hey.',
      time: '23:10',
      isRead: false,
    },
    isTyping: false,
    unreadCount: 5,
  },
  {
    id: 1,
    user: {
      id: 6,
      imageLink:
        'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg',
      name: 'Emily',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: false,
    },
    lastMessage: {
      senderId: -1,
      text: 'Hi there, how are you?',
      time: '23:10',
      isRead: true,
    },
    isTyping: false,
    unreadCount: 5,
  },
  {
    id: 1,
    user: {
      id: 7,
      imageLink:
        'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
      name: 'Janet S',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: true,
    },
    lastMessage: {
      senderId: 7,
      text: 'Thanks! Please let me know if you have any questions.',
      time: '23:10',
      isRead: true,
    },
    isTyping: true,
    unreadCount: 1,
  },
  {
    id: 1,
    user: {
      id: 1,
      imageLink:
        'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      name: 'Marty M',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: true,
    },
    lastMessage: {
      senderId: 1,
      text: 'Hi there, how are you?',
      time: 'Just Now',
      isRead: true,
    },
    isTyping: false,
    unreadCount: 2,
  },
  {
    id: 1,
    user: {
      id: 1,
      imageLink:
        'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
      name: 'John Doe',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: true,
    },
    lastMessage: {
      senderId: -1,
      text: 'Hey.',
      time: '23:10',
      isRead: false,
    },
    isTyping: false,
    unreadCount: 5,
  },
  {
    id: 1,
    user: {
      id: 6,
      imageLink:
        'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg',
      name: 'Emily',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: false,
    },
    lastMessage: {
      senderId: -1,
      text: 'Hi there, how are you?',
      time: '23:10',
      isRead: true,
    },
    isTyping: false,
    unreadCount: 5,
  },
  {
    id: 1,
    user: {
      id: 7,
      imageLink:
        'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
      name: 'Janet S',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: true,
    },
    lastMessage: {
      senderId: 7,
      text: 'Thanks! Please let me know if you have any questions.',
      time: '23:10',
      isRead: true,
    },
    isTyping: true,
    unreadCount: 1,
  },
];

export const positions = [
  {
    id: 1,
    name: 'Department store sales',
  },
  {
    id: 2,
    name: 'Boutique Sales',
  },
  {
    id: 3,
    name: 'Other',
  },
];

export const brands = [
  {id: 1, name: 'Nike'},
  {id: 2, name: 'Louis Vuitton'},
  {id: 3, name: 'Chanel'},
  {id: 4, name: 'Hermes'},
  {id: 5, name: 'Gucci'},
  {id: 6, name: 'Dior'},
  {id: 7, name: 'Adidas'},
  {id: 8, name: 'Rolex'},
  {id: 9, name: 'Zara'},
  {id: 10, name: 'H&M'},
  {id: 11, name: 'Cartier'},
  {id: 12, name: 'Uniqlo'},
  {id: 13, name: 'Prada'},
  {id: 14, name: 'Tiffany & Co.'},
  {id: 15, name: 'Coach'},
  {id: 16, name: 'Burberry'},
  {id: 17, name: 'Sephora'},
  {id: 18, name: 'Lululemon'},
  {id: 19, name: 'Moncler'},
  {id: 20, name: 'Patek Philippe'},
  {id: 21, name: 'Zalando'},
  {id: 22, name: 'Chow Tai Fook'},
  {id: 23, name: 'Swarovski'},
  {id: 24, name: 'Polo Ralph Lauren'},
  {id: 25, name: 'Tom Ford'},
  {id: 26, name: 'The North Face'},
  {id: 27, name: "Levi's"},
  {id: 28, name: "Victoria's Secret"},
  {id: 29, name: 'Next'},
  {id: 30, name: 'New Balance'},
  {id: 31, name: 'Michael Kors'},
  {id: 32, name: 'Skechers'},
  {id: 33, name: 'TJ Maxx'},
  {id: 34, name: 'Under Armour'},
  {id: 35, name: 'Nordstrom'},
  {id: 36, name: 'C&A'},
  {id: 37, name: 'Chopard'},
  {id: 38, name: 'Dolce & Gabbana'},
  {id: 39, name: 'Christian Louboutin'},
  {id: 40, name: 'Omega'},
  {id: 41, name: 'Foot Locker Inc.'},
  {id: 42, name: 'Ray Ban'},
  {id: 43, name: "Macy's"},
  {id: 44, name: 'Asics'},
  {id: 45, name: 'Vera Wang'},
  {id: 46, name: 'Puma'},
  {id: 47, name: 'Steve Madden'},
  {id: 48, name: 'Brunello Cucinelli'},
  {id: 49, name: 'American Eagle Outfitters'},
  {id: 50, name: 'Armani'},
];

export const productFor = [
  {
    id: 1,
    name: 'Women',
  },
  {
    id: 2,
    name: 'Men',
  },
  {
    id: 3,
    name: 'Children',
  },
];

export const productType = [
  {
    id: 1,
    name: 'Shoes',
  },
  {
    id: 2,
    name: 'Apparel/Rtw',
  },
  {
    id: 3,
    name: 'Jewelry',
  },
  {
    id: 3,
    name: 'Handbags/Accessories',
  },
];

export const broadcasts = [
  {
    id: 1,
    name: 'New Arrivals',
    lastMessage: {
      senderId: 1,
      text: 'just checking in to see if you had a chance to review the proposal lorem ipsum dolor just checking in to see if you had a chance to review the proposal lorem ipsum dolor',
      time: new Date(),
    },
    users: [
      {
        id: 1,
        imageLink:
          'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
        name: 'John Doe',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 2,
        imageLink:
          'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg',
        name: 'Emily Clark',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: false,
      },
      {
        id: 3,
        imageLink:
          'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
        name: 'Janet S',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 4,
        imageLink:
          'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
        name: 'Marty M',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 5,
        imageLink:
          'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
        name: 'John D',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 6,
        imageLink:
          'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg',
        name: 'Emily',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: false,
      },
      {
        id: 7,
        imageLink:
          'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
        name: 'Janet S',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 8,
        imageLink:
          'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
        name: 'Marty M',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Final Meeting Call',
    lastMessage: {
      senderId: 1,
      text: 'just checking in to see if you had a chance to review the proposal lorem ipsum dolor just checking in to see if you had a chance to review the proposal lorem ipsum dolor',
      time: new Date(),
    },
    users: [
      {
        id: 4,
        imageLink:
          'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
        name: 'Marty M',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 5,
        imageLink:
          'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
        name: 'John D',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 6,
        imageLink:
          'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg',
        name: 'Emily',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: false,
      },
      {
        id: 7,
        imageLink:
          'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
        name: 'Janet S',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 8,
        imageLink:
          'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
        name: 'Marty M',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
    ],
  },
  {
    id: 3,
    name: 'Deal Closing Request',
    lastMessage: {
      senderId: 1,
      text: 'just checking in to see if you had a chance to review the proposal lorem ipsum dolor just checking in to see if you had a chance to review the proposal lorem ipsum dolor',
      time: new Date(),
    },
    users: [
      {
        id: 7,
        imageLink:
          'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
        name: 'Janet S',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 8,
        imageLink:
          'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
        name: 'Marty M',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 1,
        imageLink:
          'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
        name: 'John Doe',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 2,
        imageLink:
          'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg',
        name: 'Emily Clark',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: false,
      },
      {
        id: 3,
        imageLink:
          'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
        name: 'Janet S',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 4,
        imageLink:
          'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
        name: 'Marty M',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 5,
        imageLink:
          'https://images.inc.com/uploaded_files/image/1024x576/getty_481292845_77896.jpg',
        name: 'John D',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 6,
        imageLink:
          'https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg',
        name: 'Emily',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: false,
      },
      {
        id: 7,
        imageLink:
          'https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=eaVcXTz5',
        name: 'Janet S',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
      {
        id: 8,
        imageLink:
          'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
        name: 'Marty M',
        email: 'janetsmith@nexsa.com',
        phone: '+1 (202) 555 0142 ',
        storyAvailable: true,
      },
    ],
  },
];

export const chat = [
  {
    text: 'Hello',
    time: 'Just Now',
    isRead: true,
    sender: myUser,
  },
  {
    text: "What's up?",
    time: 'Just Now',
    isRead: true,
    sender: myUser,
  },
  {
    text: '???',
    time: 'Just Now',
    isRead: true,
    sender: myUser,
  },
  {
    text: 'Hi there, how are you?',
    time: 'Just Now',
    isRead: true,
    sender: {
      id: 1,
      imageLink:
        'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      name: 'Marty M',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: true,
    },
  },

  {
    text: 'I am good, how about you?',
    time: 'Just Now',
    isRead: true,
    sender: {
      id: 1,
      imageLink:
        'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      name: 'Marty M',
      email: 'janetsmith@nexsa.com',
      phone: '+1 (202) 555 0142 ',
      storyAvailable: true,
    },
  },
];

export const galleries = [
  {
    image:
      'https://img.freepik.com/free-vector/black-friday-sale-hanging-tag-red-background_1017-28715.jpg?t=st=1739873415~exp=1739877015~hmac=9d9404424e8be868709c03911ecf083df8ff3914ec0b880d970cdf252d63e11d&w=1380',
    name: 'Black Friday',
    description: 'Shirts, Shoes, Pants, Mobile, Laptops, Tablets and more',
    products: [
      {
        price: '',
        isSale: false,
        image:
          'https://audaces.com/wp-content/uploads/2022/12/fashion-product-mix-pyramid.jpg',
      },
      {
        price: '',
        isSale: false,
        image:
          'https://thumbs.dreamstime.com/b/men-shirt-display-mannequin-clothes-shop-trendy-cotton-summer-collection-fashion-product-samples-clothing-store-selling-177634234.jpg',
      },
      {
        price: '',
        isSale: false,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT250xpq9WTX9xckOgCMXYn2J_Iy7QlZj7gcA&s',
      },
    ],
  },
  {
    image:
      'https://blog.contactpigeon.com/wp-content/uploads/2022/10/cyber-monday-statistics.jpg',
    name: 'Cyber Monday',
    description: 'Shirts, Shoes, Pants, Mobile, Laptops, Tablets and more',
    products: [
      {
        price: '',
        isSale: false,
        image:
          'https://audaces.com/wp-content/uploads/2022/12/fashion-product-mix-pyramid.jpg',
      },
      {
        price: '',
        isSale: false,
        image:
          'https://thumbs.dreamstime.com/b/men-shirt-display-mannequin-clothes-shop-trendy-cotton-summer-collection-fashion-product-samples-clothing-store-selling-177634234.jpg',
      },
      {
        price: '',
        isSale: false,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT250xpq9WTX9xckOgCMXYn2J_Iy7QlZj7gcA&s',
      },
      {
        price: '',
        isSale: false,
        image:
          'https://audaces.com/wp-content/uploads/2022/12/fashion-product-mix-pyramid.jpg',
      },
      {
        price: '',
        isSale: false,
        image:
          'https://thumbs.dreamstime.com/b/men-shirt-display-mannequin-clothes-shop-trendy-cotton-summer-collection-fashion-product-samples-clothing-store-selling-177634234.jpg',
      },
      {
        price: '',
        isSale: false,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT250xpq9WTX9xckOgCMXYn2J_Iy7QlZj7gcA&s',
      },
    ],
  },
  {
    image:
      'https://i.pinimg.com/736x/94/fc/cc/94fcccf4104388229d653f9886713bdc.jpg',
    name: 'Green Monday',
    description: 'Shirts, Shoes, Pants, Mobile, Laptops, Tablets and more',
    products: [],
  },
  {
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/026/304/994/small_2x/outdoor-christmas-decorations-and-a-beautifully-decorated-christmas-tree-ai-generated-photo.jpg',
    name: 'Christmas Day',
    description: 'Shirts, Shoes, Pants, Mobile, Laptops, Tablets and more',
    products: [
      {
        price: '',
        isSale: false,
        image:
          'https://audaces.com/wp-content/uploads/2022/12/fashion-product-mix-pyramid.jpg',
      },
      {
        price: '299',
        isSale: true,
        image:
          'https://thumbs.dreamstime.com/b/men-shirt-display-mannequin-clothes-shop-trendy-cotton-summer-collection-fashion-product-samples-clothing-store-selling-177634234.jpg',
      },
      {
        price: '',
        isSale: true,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT250xpq9WTX9xckOgCMXYn2J_Iy7QlZj7gcA&s',
      },
    ],
  },
];
